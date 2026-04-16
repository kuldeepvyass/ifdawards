import mongoose from 'mongoose';

const juryApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  name: String,
  email: String,
  organization: String,
  expertise: String,
  linkedin: String,
  description: String,
  submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const JuryApplication = mongoose.model('JuryApplication', juryApplicationSchema);

export default JuryApplication;
