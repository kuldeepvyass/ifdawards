import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  userEmail: { type: String, required: false },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  orderId: { type: String },
  paymentId: { type: String },
  status: { type: String, default: 'paid' },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
