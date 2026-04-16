import express from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';

import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import Submission from '../models/Submission.js';
import JuryApplication from '../models/JuryApplication.js';
import JuryMember from '../models/JuryMember.js';
import Payment from '../models/Payment.js';
import JuryScore from '../models/JuryScore.js';
import { JUDGING_CRITERIA, calculateOverallScore, getSubmissionScoreSummary } from '../utils/judging.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../uploads');
const MAX_UPLOAD_FILE_SIZE_MB = 100;
const MAX_UPLOAD_FILE_SIZE_BYTES = MAX_UPLOAD_FILE_SIZE_MB * 1024 * 1024;
const MAX_UPLOAD_FILES = 15;
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '_');
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_UPLOAD_FILE_SIZE_BYTES, files: MAX_UPLOAD_FILES },
});

let sharpProcessor;
async function getSharpProcessor() {
  if (sharpProcessor !== undefined) return sharpProcessor;
  try {
    const sharpModule = await import('sharp');
    sharpProcessor = sharpModule?.default || sharpModule;
  } catch (_error) {
    sharpProcessor = null;
  }
  return sharpProcessor;
}

async function optimizeUploadedImage(file) {
  const originalResponse = {
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
    fullUrl: `/api/uploads/${file.filename}`,
  };

  if (!String(file.mimetype || '').startsWith('image/')) {
    return originalResponse;
  }

  const sharp = await getSharpProcessor();
  if (!sharp) return originalResponse;

  try {
    const parsedStored = path.parse(file.filename);
    const parsedOriginal = path.parse(file.originalname || file.filename);
    const optimizedFilename = `${parsedStored.name}-optimized.webp`;
    const optimizedPath = path.join(uploadsDir, optimizedFilename);

    await sharp(file.path)
      .rotate()
      .resize({ width: 2600, height: 2600, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 90, nearLossless: true, effort: 6 })
      .toFile(optimizedPath);

    const optimizedStats = await fs.promises.stat(optimizedPath);
    const originalSize = Number(file.size || 0);
    const optimizedSize = Number(optimizedStats.size || 0);

    if (optimizedSize > 0 && optimizedSize < originalSize * 0.98) {
      await fs.promises.unlink(file.path).catch(() => undefined);
      return {
        name: `${parsedOriginal.name}.webp`,
        type: 'image/webp',
        size: optimizedSize,
        fullUrl: `/api/uploads/${optimizedFilename}`,
      };
    }

    await fs.promises.unlink(optimizedPath).catch(() => undefined);
    return originalResponse;
  } catch (_error) {
    return originalResponse;
  }
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Authorization token missing' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    // @ts-ignore
    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

async function requireJury(req, res, next) {
  try {
    // @ts-ignore
    const user = await User.findById(req.userId).select('_id role');
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role !== 'jury') return res.status(403).json({ message: 'Jury access required' });
    return next();
  } catch (error) {
    return res.status(500).json({ message: 'Failed to verify jury access' });
  }
}

function normalizeJuryScorePayload(payload = {}) {
  const normalized = {};
  for (const criterion of JUDGING_CRITERIA) {
    normalized[criterion.key] = Number(payload[criterion.key]);
  }
  return normalized;
}

function validateJuryScores(scores) {
  for (const criterion of JUDGING_CRITERIA) {
    const value = Number(scores?.[criterion.key]);
    if (!Number.isFinite(value) || value < 0 || value > 10) {
      return `${criterion.label} score must be between 0 and 10`;
    }
  }
  return null;
}

function groupScoresBySubmissionId(scoreDocs) {
  return scoreDocs.reduce((acc, scoreDoc) => {
    const key = String(scoreDoc.submissionId);
    if (!acc[key]) acc[key] = [];
    acc[key].push(scoreDoc);
    return acc;
  }, {});
}


// POST /api/users/signup
router.post('/signup', async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, phone, password: hashed, role: 'user', mustChangePassword: false });
    await user.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(400).json({ message: 'User not found' });
    if (!user.password) return res.status(400).json({ message: 'Use Google login' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role || 'user' }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role || 'user' },
      role: user.role || 'user',
      mustChangePassword: Boolean(user.mustChangePassword),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/users/admin-login
router.post('/admin-login', async (req, res) => {
  const { email, password } = req.body || {};
  const adminEmail = process.env.ADMIN_EMAIL || 'kuldeep@admin.com';
  const adminPassword = process.env.ADMIN_PASSWORD || '90iojkNM@123';
  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: 'Invalid admin credentials' });
  }
  const token = jwt.sign({ id: 'admin', email, role: 'admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  return res.json({ token, user: { id: 'admin', name: 'Admin', email }, isAdmin: true });
});

// GET /api/users/me
router.get('/me', requireAuth, async (req, res) => {
  try {
    // @ts-ignore
    const user = await User.findById(req.userId).select('_id name email phone role mustChangePassword');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role || 'user',
      mustChangePassword: Boolean(user.mustChangePassword),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch user' });
  }
});

// PATCH /api/users/change-password
router.patch('/change-password', requireAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body || {};
    if (!newPassword || String(newPassword).length < 8) {
      return res.status(400).json({ message: 'New password must be at least 8 characters' });
    }

    // @ts-ignore
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.password) return res.status(400).json({ message: 'Password login is not available for this user' });

    if (!user.mustChangePassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: 'Current password is required' });
      }
      const isCurrentValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentValid) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
    }

    user.password = await bcrypt.hash(String(newPassword), 10);
    user.mustChangePassword = false;
    await user.save();

    return res.json({ message: 'Password updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update password' });
  }
});

// GET /api/users/jury-members
router.get('/jury-members', async (_req, res) => {
  try {
    const juryMembers = await JuryMember.find()
      .select('image name email designation bio specialization assignedProductNames assignedProducts linkedin order createdAt')
      .sort({ order: -1, createdAt: -1 });
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

// PATCH /api/users/phone
router.patch('/phone', requireAuth, async (req, res) => {
  try {
    const { phone } = req.body || {};
    // @ts-ignore
    const user = await User.findByIdAndUpdate(req.userId, { phone }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ id: user._id, name: user.name, email: user.email, phone: user.phone });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update phone' });
  }
});

// GET /api/users/jury/assigned-designs
router.get('/jury/assigned-designs', requireAuth, requireJury, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const juryMember = await JuryMember.findOne({ userId }).select('_id assignedProductNames name email');
    if (!juryMember) {
      return res.status(404).json({ message: 'Jury member profile not found' });
    }

    const assignedProductNames = Array.isArray(juryMember.assignedProductNames)
      ? juryMember.assignedProductNames.filter(Boolean)
      : [];

    const assignmentFilter = {
      $or: [
        { assignedJuryMemberIds: juryMember._id },
        ...(assignedProductNames.length > 0 ? [{ product: { $in: assignedProductNames } }] : []),
      ],
    };

    const submissions = await Submission.find(assignmentFilter).sort({ createdAt: -1 });
    const submissionIds = submissions.map((submission) => submission._id);
    const allScoreDocs = submissionIds.length
      ? await JuryScore.find({ submissionId: { $in: submissionIds } })
      : [];
    const myScoreDocs = allScoreDocs.filter((scoreDoc) => String(scoreDoc.juryMemberId) === String(juryMember._id));

    const allScoresBySubmissionId = groupScoresBySubmissionId(allScoreDocs);
    const myScoreBySubmissionId = myScoreDocs.reduce((acc, scoreDoc) => {
      acc[String(scoreDoc.submissionId)] = scoreDoc;
      return acc;
    }, {});

    const result = submissions.map((submission) => {
      const submissionId = String(submission._id);
      const summary = getSubmissionScoreSummary(submission, allScoresBySubmissionId[submissionId] || []);
      const myScore = myScoreBySubmissionId[submissionId];

      return {
        ...submission.toObject(),
        scoreSummary: summary,
        myEvaluation: myScore
          ? {
              id: myScore._id,
              scores: myScore.scores,
              finalRemarks: myScore.finalRemarks,
              overallScore: myScore.overallScore,
              overallPercentage: Number((Number(myScore.overallScore || 0) * 10).toFixed(2)),
              updatedAt: myScore.updatedAt,
            }
          : null,
      };
    });

    return res.json({
      juryMember: {
        id: juryMember._id,
        name: juryMember.name,
        email: juryMember.email,
        assignedProductNames,
      },
      designs: result,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch assigned designs' });
  }
});

// GET /api/users/jury/assigned-designs/:submissionId
router.get('/jury/assigned-designs/:submissionId', requireAuth, requireJury, async (req, res) => {
  try {
    const { submissionId } = req.params;
    // @ts-ignore
    const userId = req.userId;

    const juryMember = await JuryMember.findOne({ userId }).select('_id assignedProductNames name email');
    if (!juryMember) return res.status(404).json({ message: 'Jury member profile not found' });

    const submission = await Submission.findById(submissionId);
    if (!submission) return res.status(404).json({ message: 'Design not found' });

    const isDirectlyAssigned = Array.isArray(submission.assignedJuryMemberIds)
      && submission.assignedJuryMemberIds.some((id) => String(id) === String(juryMember._id));
    const isProductAssigned = Array.isArray(juryMember.assignedProductNames)
      && juryMember.assignedProductNames.includes(String(submission.product || '').trim());

    if (!isDirectlyAssigned && !isProductAssigned) {
      return res.status(403).json({ message: 'This design is not assigned to you' });
    }

    const scoreDocs = await JuryScore.find({ submissionId: submission._id });
    const myScore = scoreDocs.find((scoreDoc) => String(scoreDoc.juryMemberId) === String(juryMember._id));
    const scoreSummary = getSubmissionScoreSummary(submission, scoreDocs);

    return res.json({
      juryMember: {
        id: juryMember._id,
        name: juryMember.name,
        email: juryMember.email,
      },
      design: submission,
      scoreSummary,
      myEvaluation: myScore
        ? {
            id: myScore._id,
            scores: myScore.scores,
            finalRemarks: myScore.finalRemarks,
            overallScore: myScore.overallScore,
            overallPercentage: Number((Number(myScore.overallScore || 0) * 10).toFixed(2)),
            updatedAt: myScore.updatedAt,
          }
        : null,
      criteria: JUDGING_CRITERIA,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch design details' });
  }
});

// POST /api/users/jury/assigned-designs/:submissionId/evaluate
router.post('/jury/assigned-designs/:submissionId/evaluate', requireAuth, requireJury, async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { scores: inputScores = {}, finalRemarks = '' } = req.body || {};
    // @ts-ignore
    const userId = req.userId;

    const juryMember = await JuryMember.findOne({ userId }).select('_id assignedProductNames');
    if (!juryMember) return res.status(404).json({ message: 'Jury member profile not found' });

    const submission = await Submission.findById(submissionId);
    if (!submission) return res.status(404).json({ message: 'Design not found' });

    const isDirectlyAssigned = Array.isArray(submission.assignedJuryMemberIds)
      && submission.assignedJuryMemberIds.some((id) => String(id) === String(juryMember._id));
    const isProductAssigned = Array.isArray(juryMember.assignedProductNames)
      && juryMember.assignedProductNames.includes(String(submission.product || '').trim());

    if (!isDirectlyAssigned && !isProductAssigned) {
      return res.status(403).json({ message: 'This design is not assigned to you' });
    }

    const normalizedScores = normalizeJuryScorePayload(inputScores);
    const validationError = validateJuryScores(normalizedScores);
    if (validationError) return res.status(400).json({ message: validationError });

    const overallScore = calculateOverallScore(normalizedScores);

    const savedScore = await JuryScore.findOneAndUpdate(
      { submissionId: submission._id, juryMemberId: juryMember._id },
      {
        submissionId: submission._id,
        juryMemberId: juryMember._id,
        juryUserId: userId,
        scores: normalizedScores,
        finalRemarks: String(finalRemarks || '').trim(),
        overallScore,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const allScores = await JuryScore.find({ submissionId: submission._id });
    const scoreSummary = getSubmissionScoreSummary(submission, allScores);

    return res.json({
      message: 'Score submitted successfully',
      evaluation: {
        id: savedScore._id,
        scores: savedScore.scores,
        finalRemarks: savedScore.finalRemarks,
        overallScore: savedScore.overallScore,
        overallPercentage: Number((Number(savedScore.overallScore || 0) * 10).toFixed(2)),
        updatedAt: savedScore.updatedAt,
      },
      scoreSummary,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to submit score' });
  }
});

// POST /api/users/submissions
router.post('/submissions', requireAuth, async (req, res) => {
  try {
    const payload = req.body || {};
    const normalizedMaterials = Array.isArray(payload.materials)
      ? payload.materials.map((item) => String(item || '').trim()).filter(Boolean)
      : [];
    const normalizedFinishes = Array.isArray(payload.finishes)
      ? payload.finishes.map((item) => String(item || '').trim()).filter(Boolean)
      : [];
    // @ts-ignore
    const userId = req.userId;
    const normalizedProduct = String(payload.product || '').trim();
    const matchingJuryMembers = normalizedProduct
      ? await JuryMember.find({ assignedProductNames: normalizedProduct }).select('_id')
      : [];

    const submission = await Submission.create({
      userId,
      userEmail: payload?.profile?.email,
      profile: payload.profile,
      category: payload.category,
      subcategory: payload.subcategory,
      product: payload.product,
      productName: payload.productName,
      materials: normalizedMaterials,
      finishes: normalizedFinishes,
      dimensionsInches: payload.dimensionsInches,
      dimensionsCm: payload.dimensionsCm,
      specificDimensions: payload.specificDimensions,
      materialUsed: payload.materialUsed,
      finishType: payload.finishType,
      dimensions: payload.dimensions,
      description: payload.description,
      agreeTnc: Boolean(payload.agreeTnc),
      notAiGenerated: Boolean(payload.notAiGenerated),
      feasibleProduct: Boolean(payload.feasibleProduct),
      technicalDrawingPresent: Boolean(payload.technicalDrawingPresent),
      files: payload.files || [],
      assignedJuryMemberIds: matchingJuryMembers.map((member) => member._id),
      submittedAt: payload.submittedAt ? new Date(payload.submittedAt) : new Date(),
    });
    return res.status(201).json(submission);
  } catch (error) {
    console.error('Submission save failed:', error);
    return res.status(500).json({ message: 'Failed to save submission' });
  }
});

// GET /api/users/submissions
router.get('/submissions', requireAuth, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const user = await User.findById(userId).select('email');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const email = String(user.email || '').trim();
    const filters = [{ userId }];
    if (email) {
      filters.push({ userEmail: email });
      filters.push({ 'profile.email': email });
    }

    const submissions = await Submission.find({ $or: filters })
      .sort({ submittedAt: -1, createdAt: -1 });

    return res.json({ submissions });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch submissions' });
  }
});

// POST /api/users/upload
router.post('/upload', requireAuth, upload.array('files', MAX_UPLOAD_FILES), async (req, res) => {
  try {
    const files = await Promise.all((req.files || []).map((file) => optimizeUploadedImage(file)));
    return res.json({ files });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to upload files' });
  }
});

router.use((err, _req, res, next) => {
  if (err) {
    console.error('Upload error:', err);
  }
  if (err && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ message: `File too large. Max size is ${MAX_UPLOAD_FILE_SIZE_MB}MB per file.` });
  }
  if (err && err.code === 'LIMIT_FILE_COUNT') {
    return res.status(413).json({ message: `Too many files. Maximum ${MAX_UPLOAD_FILES} files allowed per submission.` });
  }
  if (err) {
    return res.status(400).json({ message: 'Upload failed. Please try again.' });
  }
  return next();
});

// POST /api/users/jury-application
router.post('/jury-application', requireAuth, async (req, res) => {
  try {
    const payload = req.body || {};
    // @ts-ignore
    const userId = req.userId;
    const application = await JuryApplication.create({
      userId,
      name: payload.name,
      email: payload.email,
      organization: payload.organization,
      expertise: payload.expertise,
      linkedin: payload.linkedin,
      description: payload.description,
      submittedAt: payload.submittedAt ? new Date(payload.submittedAt) : new Date(),
    });
    return res.status(201).json(application);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to save application' });
  }
});

// POST /api/users/payment
router.post('/payment', requireAuth, async (req, res) => {
  try {
    const payload = req.body || {};
    // @ts-ignore
    const userId = req.userId;
    const payment = await Payment.create({
      userId,
      userEmail: payload.userEmail,
      amount: payload.amount,
      currency: payload.currency || 'INR',
      orderId: payload.orderId,
      paymentId: payload.paymentId,
      status: payload.status || 'paid',
    });
    return res.status(201).json(payment);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to record payment' });
  }
});

// Google OAuth endpoints (to be used with passport)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), (req, res) => {
  // Successful authentication, issue JWT and redirect or respond
  const user = req.user;
  const token = jwt.sign({ id: user._id, email: user.email, role: 'user' }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  // For API: res.json({ token, user });
  // For web: redirect with token
  res.redirect(`${process.env.FRONTEND_URL || ''}/login?token=${token}`);
});

export default router;