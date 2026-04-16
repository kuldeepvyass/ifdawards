import mongoose from 'mongoose';

const scoreRangeValidation = {
  validator(value) {
    return typeof value === 'number' && value >= 0 && value <= 10;
  },
  message: 'Score must be between 0 and 10',
};

const juryScoreSchema = new mongoose.Schema(
  {
    submissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission', required: true },
    juryMemberId: { type: mongoose.Schema.Types.ObjectId, ref: 'JuryMember', required: true },
    juryUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    scores: {
      designAesthetics: { type: Number, required: true, validate: scoreRangeValidation },
      functionalityUx: { type: Number, required: true, validate: scoreRangeValidation },
      innovationDifferentiation: { type: Number, required: true, validate: scoreRangeValidation },
      exportReadiness: { type: Number, required: true, validate: scoreRangeValidation },
      sustainabilityMaterials: { type: Number, required: true, validate: scoreRangeValidation },
      marketRelevance: { type: Number, required: true, validate: scoreRangeValidation },
    },
    finalRemarks: { type: String, default: '' },
    overallScore: { type: Number, required: true, min: 0, max: 10 },
  },
  { timestamps: true }
);

juryScoreSchema.index({ submissionId: 1, juryMemberId: 1 }, { unique: true });
juryScoreSchema.index({ submissionId: 1 });
juryScoreSchema.index({ juryMemberId: 1 });

const JuryScore = mongoose.model('JuryScore', juryScoreSchema);

export default JuryScore;
