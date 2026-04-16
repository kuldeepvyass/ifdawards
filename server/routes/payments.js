import express from 'express';
import Razorpay from 'razorpay';

const router = express.Router();

router.post('/create-order', async (req, res) => {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return res.status(500).json({ message: 'Razorpay keys are not configured' });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const amount = Number(req.body?.amount || 500000);
    const currency = req.body?.currency || 'INR';

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: `ifda_${Date.now()}`,
    });

    return res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Unable to create order' });
  }
});

export default router;
