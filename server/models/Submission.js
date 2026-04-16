import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  userEmail: { type: String, required: false },
  profile: {
    name: String,
    email: String,
    phone: String,
    orgName: String,
    orgType: String,
  },
  category: String,
  subcategory: String,
  product: String,
  productName: String,
  materials: [{ type: String }],
  finishes: [{ type: String }],
  dimensionsInches: String,
  dimensionsCm: String,
  specificDimensions: String,
  materialUsed: String,
  finishType: String,
  dimensions: String,
  description: String,
  agreeTnc: { type: Boolean, default: false },
  notAiGenerated: { type: Boolean, default: false },
  feasibleProduct: { type: Boolean, default: false },
  technicalDrawingPresent: { type: Boolean, default: false },
  files: [{ type: mongoose.Schema.Types.Mixed }],
  assignedJuryMemberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JuryMember' }],
  submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;
