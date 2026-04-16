import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Submission from '../models/Submission.js';
import JuryApplication from '../models/JuryApplication.js';
import JuryMember from '../models/JuryMember.js';
import Payment from '../models/Payment.js';
import VisitorStat from '../models/VisitorStat.js';
import JuryScore from '../models/JuryScore.js';
import { JUDGING_CRITERIA, computeWinners, getSubmissionScoreSummary } from '../utils/judging.js';

const router = express.Router();

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Authorization token missing' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

async function getScoredSubmissionsWithSummary(submissionFilter = {}) {
  const submissions = await Submission.find(submissionFilter).sort({ createdAt: -1 });
  const submissionIds = submissions.map((submission) => submission._id);
  const scoreDocs = submissionIds.length
    ? await JuryScore.find({ submissionId: { $in: submissionIds } })
        .populate('juryMemberId', 'name email')
        .sort({ updatedAt: -1 })
    : [];

  const scoresBySubmissionId = scoreDocs.reduce((acc, scoreDoc) => {
    const key = String(scoreDoc.submissionId);
    if (!acc[key]) acc[key] = [];
    acc[key].push(scoreDoc);
    return acc;
  }, {});

  return submissions.map((submission) => {
    const submissionScores = scoresBySubmissionId[String(submission._id)] || [];
    return {
      submission,
      scoreSummary: getSubmissionScoreSummary(submission, submissionScores),
      scoreDocs: submissionScores,
    };
  });
}

router.get('/users', requireAdmin, async (req, res) => {
  const users = await User.find().select('_id name email phone createdAt');
  return res.json(users);
});

router.get('/submissions', requireAdmin, async (req, res) => {
  const { userId } = req.query;
  const filter = userId ? { userId } : {};
  const submissions = await Submission.find(filter).sort({ createdAt: -1 });
  return res.json(submissions);
});

router.get('/jury-applications', requireAdmin, async (req, res) => {
  const applications = await JuryApplication.find().sort({ createdAt: -1 });
  return res.json(applications);
});

router.get('/payments', requireAdmin, async (req, res) => {
  const payments = await Payment.find().sort({ createdAt: -1 });
  const totalAmount = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const byUser = payments.reduce((acc, p) => {
    const key = p.userEmail || 'Unknown';
    acc[key] = (acc[key] || 0) + (p.amount || 0);
    return acc;
  }, {});
  return res.json({ payments, totalAmount, byUser });
});

router.get('/analytics', requireAdmin, async (req, res) => {
  const stat = await VisitorStat.findOne().sort({ updatedAt: -1 });
  return res.json({ totalVisitors: stat?.totalCount || 0, todayVisitors: stat?.todayCount || 0 });
});

router.get('/jury-members', requireAdmin, async (req, res) => {
  try {
    const juryMembers = await JuryMember.find().sort({ order: -1, createdAt: -1 });
    const normalized = juryMembers.map((member) => {
      const legacyAssigned = Array.isArray(member.assignedProducts)
        ? member.assignedProducts.map((item) => item?.product).filter(Boolean)
        : [];
      const assignedProductNames = Array.isArray(member.assignedProductNames)
        ? member.assignedProductNames
        : legacyAssigned;
      return {
        ...member.toObject(),
        assignedProductNames,
      };
    });
    return res.json(normalized);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch jury members' });
  }
});

router.post('/jury-members', requireAdmin, async (req, res) => {
  try {
    const {
      image,
      name,
      email,
      designation,
      bio,
      specialization,
      linkedin = '',
      assignedProductNames = [],
    } = req.body || {};

    if (!image || !name || !email || !designation || !bio || !specialization) {
      return res.status(400).json({ message: 'Please provide all required jury member details' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const existingJuryMember = await JuryMember.findOne({ email: normalizedEmail });
    if (existingJuryMember) {
      return res.status(400).json({ message: 'Jury member with this email already exists' });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'A user with this email already exists' });
    }

    const defaultPassword = process.env.JURY_DEFAULT_PASSWORD || 'Jury@123';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    const juryUser = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: 'jury',
      mustChangePassword: true,
    });

    try {
      const normalizedAssignedProducts = Array.from(
        new Set(
          (Array.isArray(assignedProductNames) ? assignedProductNames : [])
            .map((productName) => String(productName || '').trim())
            .filter(Boolean)
        )
      );

      // Get the max order to set new member's order higher
      const maxOrderMember = await JuryMember.findOne().sort({ order: -1 });
      const newOrder = (maxOrderMember?.order || 0) + 1;

      const juryMember = await JuryMember.create({
        userId: juryUser._id,
        image,
        name,
        email: normalizedEmail,
        designation,
        bio,
        specialization,
        linkedin,
        order: newOrder,
        assignedProductNames: normalizedAssignedProducts,
      });

      return res.status(201).json({
        juryMember,
        defaultPassword,
      });
    } catch (innerError) {
      await User.findByIdAndDelete(juryUser._id);
      throw innerError;
    }
  } catch (error) {
    console.error('Create jury member error:', error);
    const message = error instanceof Error ? error.message : 'Failed to create jury member';
    return res.status(500).json({ message: `Failed to create jury member: ${message}` });
  }
});

router.patch('/jury-members/reorder', requireAdmin, async (req, res) => {
  try {
    const { orders } = req.body || {}; // orders should be an array of { _id, order }
    
    if (!Array.isArray(orders)) {
      return res.status(400).json({ message: 'Invalid orders format: Expected an array of {_id, order} objects' });
    }

    if (orders.length === 0) {
      return res.status(400).json({ message: 'Orders array cannot be empty' });
    }

    // Validate each order object
    for (const orderItem of orders) {
      if (!orderItem._id || typeof orderItem.order !== 'number') {
        return res.status(400).json({ message: 'Invalid order item: Each item must have _id (string) and order (number)' });
      }
    }

    // Update each jury member's order
    const updatePromises = orders.map(({ _id, order }) =>
      JuryMember.findByIdAndUpdate(_id, { order }, { new: true })
        .then((member) => {
          if (!member) {
            throw new Error(`Jury member with ID ${_id} not found`);
          }
          return member;
        })
    );

    const results = await Promise.allSettled(updatePromises);

    // Check if any updates failed
    const failures = results.filter((r) => r.status === 'rejected');
    if (failures.length > 0) {
      const firstError = failures[0].status === 'rejected' ? failures[0].reason : 'Unknown error';
      return res.status(400).json({ message: `Failed to update jury member: ${firstError}` });
    }

    // Return the updated list
    const juryMembers = await JuryMember.find().sort({ order: -1, createdAt: -1 });
    const normalized = juryMembers.map((member) => {
      const legacyAssigned = Array.isArray(member.assignedProducts)
        ? member.assignedProducts.map((item) => item?.product).filter(Boolean)
        : [];
      const assignedProductNames = Array.isArray(member.assignedProductNames)
        ? member.assignedProductNames
        : legacyAssigned;
      return {
        ...member.toObject(),
        assignedProductNames,
      };
    });

    return res.json(normalized);
  } catch (error) {
    console.error('Reorder error:', error);
    return res.status(500).json({ message: `Failed to reorder jury members: ${error instanceof Error ? error.message : 'Unknown error'}` });
  }
});

router.patch('/jury-members/:juryMemberId', requireAdmin, async (req, res) => {
  try {
    const { juryMemberId } = req.params;
    const {
      name,
      designation,
      bio,
      specialization,
      linkedin = '',
      image,
      assignedProductNames = [],
    } = req.body || {};

    if (!juryMemberId || juryMemberId.length !== 24) {
      return res.status(400).json({ message: 'Invalid jury member ID format' });
    }

    const juryMember = await JuryMember.findById(juryMemberId);
    if (!juryMember) {
      return res.status(404).json({ message: 'Jury member not found' });
    }

    // Update fields
    if (name) juryMember.name = name;
    if (designation) juryMember.designation = designation;
    if (bio) juryMember.bio = bio;
    if (specialization) juryMember.specialization = specialization;
    juryMember.linkedin = linkedin;
    if (image) juryMember.image = image;

    juryMember.assignedProductNames = Array.from(
      new Set(
        (Array.isArray(assignedProductNames) ? assignedProductNames : [])
          .map((productName) => String(productName || '').trim())
          .filter(Boolean)
      )
    );

    await juryMember.save();

    return res.json({
      ...juryMember.toObject(),
      assignedProductNames: juryMember.assignedProductNames || [],
    });
  } catch (error) {
    console.error('Update jury member error:', error);
    const message = error instanceof Error ? error.message : 'Failed to update jury member';
    return res.status(500).json({ message: `Failed to update jury member: ${message}` });
  }
});

router.patch('/jury-members/:juryMemberId/products', requireAdmin, async (req, res) => {
  try {
    const { juryMemberId } = req.params;
    const { assignedProductNames = [] } = req.body || {};

    if (!juryMemberId || juryMemberId.length !== 24) {
      return res.status(400).json({ message: 'Invalid jury member ID format' });
    }

    const juryMember = await JuryMember.findById(juryMemberId);
    if (!juryMember) {
      return res.status(404).json({ message: 'Jury member not found' });
    }

    if (!Array.isArray(assignedProductNames)) {
      return res.status(400).json({ message: 'Invalid product data: Expected an array of product names' });
    }

    juryMember.assignedProductNames = Array.from(
      new Set(
        (assignedProductNames)
          .map((productName) => String(productName || '').trim())
          .filter(Boolean)
      )
    );

    await juryMember.save();
    return res.json({
      ...juryMember.toObject(),
      assignedProductNames: juryMember.assignedProductNames || [],
    });
  } catch (error) {
    console.error('Save product assignments error:', error);
    const message = error instanceof Error ? error.message : 'Failed to save product assignments';
    return res.status(500).json({ message: `Failed to save product assignments: ${message}` });
  }
});

router.delete('/jury-members/:juryMemberId', requireAdmin, async (req, res) => {
  try {
    const { juryMemberId } = req.params;

    if (!juryMemberId || juryMemberId.length !== 24) {
      return res.status(400).json({ message: 'Invalid jury member ID format' });
    }

    const juryMember = await JuryMember.findById(juryMemberId);
    if (!juryMember) {
      return res.status(404).json({ message: 'Jury member not found' });
    }

    await JuryMember.findByIdAndDelete(juryMemberId);
    await JuryScore.deleteMany({ juryMemberId: juryMember._id });
    if (juryMember.userId) {
      await User.findByIdAndDelete(juryMember.userId);
    }

    return res.json({ message: 'Jury member deleted successfully' });
  } catch (error) {
    console.error('Delete jury member error:', error);
    const message = error instanceof Error ? error.message : 'Failed to delete jury member';
    return res.status(500).json({ message: `Failed to delete jury member: ${message}` });
  }
});

router.get('/judging/design-scores', requireAdmin, async (req, res) => {
  try {
    const scoredSubmissions = await getScoredSubmissionsWithSummary();
    const designs = scoredSubmissions.map((item) => ({
      _id: item.submission._id,
      product: item.submission.product,
      category: item.submission.category,
      subcategory: item.submission.subcategory,
      profile: item.submission.profile,
      userEmail: item.submission.userEmail,
      createdAt: item.submission.createdAt,
      updatedAt: item.submission.updatedAt,
      scoreSummary: item.scoreSummary,
    }));

    return res.json({
      criteria: JUDGING_CRITERIA,
      designs,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch judge scores' });
  }
});

router.get('/judging/design-scores/:submissionId', requireAdmin, async (req, res) => {
  try {
    const { submissionId } = req.params;
    const submission = await Submission.findById(submissionId);
    if (!submission) return res.status(404).json({ message: 'Design not found' });

    const scoreDocs = await JuryScore.find({ submissionId: submission._id })
      .populate('juryMemberId', 'name email')
      .sort({ updatedAt: -1 });

    const scoreSummary = getSubmissionScoreSummary(submission, scoreDocs);

    return res.json({
      criteria: JUDGING_CRITERIA,
      design: submission,
      scoreSummary,
      judgeScores: scoreDocs.map((scoreDoc) => ({
        id: scoreDoc._id,
        juryMember: {
          id: scoreDoc?.juryMemberId?._id || null,
          name: scoreDoc?.juryMemberId?.name || 'Unknown Jury',
          email: scoreDoc?.juryMemberId?.email || 'Unknown',
        },
        scores: scoreDoc.scores,
        finalRemarks: scoreDoc.finalRemarks,
        overallScore: scoreDoc.overallScore,
        overallPercentage: Number((Number(scoreDoc.overallScore || 0) * 10).toFixed(2)),
        updatedAt: scoreDoc.updatedAt,
      })),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch design score details' });
  }
});

router.get('/judging/winners', requireAdmin, async (req, res) => {
  try {
    const scoredSubmissions = await getScoredSubmissionsWithSummary();
    const winners = computeWinners(scoredSubmissions);
    return res.json({
      criteria: JUDGING_CRITERIA,
      ...winners,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to compute winners' });
  }
});

export default router;
