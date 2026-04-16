import mongoose from 'mongoose';

const visitorStatSchema = new mongoose.Schema({
  date: { type: String, required: true },
  totalCount: { type: Number, default: 0 },
  todayCount: { type: Number, default: 0 },
}, { timestamps: true });

const VisitorStat = mongoose.model('VisitorStat', visitorStatSchema);

export default VisitorStat;
