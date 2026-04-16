import mongoose from 'mongoose';

const juryMemberSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    designation: { type: String, required: true },
    bio: { type: String, required: true },
    specialization: { type: String, required: true },
    assignedProductNames: { type: [String], default: [] },
    linkedin: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const JuryMember = mongoose.model('JuryMember', juryMemberSchema);

export default JuryMember;
