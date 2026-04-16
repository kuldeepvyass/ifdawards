import { useState } from 'react';
import axios from 'axios';
import { ArrowRight, Lock, ShieldCheck, Sparkles } from 'lucide-react';

// Razorpay script loader
function loadRazorpayScript(src: string) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function PaymentStep({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handlePayment() {
    setError('');
    setLoading(true);
    try {
      const sdkLoaded = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!sdkLoaded) {
        setError('Razorpay SDK failed to load. Please try again.');
        return;
      }

      const orderRes = await axios.post('/api/payments/create-order', {
        amount: 500000,
        currency: 'INR',
      });

      const { orderId, amount, currency, keyId } = orderRes.data as {
        orderId: string;
        amount: number;
        currency: string;
        keyId: string;
      };

      const options = {
        key: keyId,
        amount,
        currency,
        name: 'IFDA Awards',
        description: 'Submission Fee',
        image: '/assets/images/logo.png',
        order_id: orderId,
        handler: async function (response: any) {
          const token = localStorage.getItem('token') || sessionStorage.getItem('token');
          const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
          const draftRaw = localStorage.getItem('draftSubmission');
          if (draftRaw) {
            const draft = JSON.parse(draftRaw);
            if (!headers) {
              setError('Your session expired. Please log in again and resubmit.');
              return;
            }

            try {
              const submissionRes = await axios.post('/api/users/submissions', draft, { headers });
              localStorage.removeItem('draftSubmission');
              window.dispatchEvent(new CustomEvent('submission:created', { detail: submissionRes.data }));
              localStorage.setItem('lastSubmissionAt', String(Date.now()));
            } catch (_error) {
              setError('Payment succeeded, but submission could not be saved. Please contact support.');
              return;
            }
          }
          if (headers) {
            try {
              const userRaw = localStorage.getItem('user');
              const userEmail = userRaw ? JSON.parse(userRaw).email : undefined;
              await axios.post('/api/users/payment', {
                amount,
                currency,
                orderId,
                paymentId: response?.razorpay_payment_id,
                status: 'paid',
                userEmail,
              }, { headers });
            } catch (error) {
              // ignore server payment errors
            }
          }
          onSuccess();
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#e11d48',
        },
      };
      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError('Unable to start payment. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="mt-35 max-w-2xl mx-auto rounded-3xl border border-red-100 bg-gradient-to-br from-white via-red-50/40 to-white p-8 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-700">
          <Sparkles className="h-3.5 w-3.5" />
          Final Step
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
          <ShieldCheck className="h-3.5 w-3.5" />
          Secure Razorpay Checkout
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-red-100 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-900">Complete Your Submission</h2>
        <p className="mt-2 text-sm text-gray-600">Your design details are ready. Complete payment to lock your entry and proceed to confirmation.</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-red-100 bg-red-50/50 p-4">
            <div className="text-xs uppercase tracking-wide text-gray-500">Submission Fee</div>
            <div className="mt-1 text-2xl font-bold text-red-700">₹5,000</div>
            <div className="mt-1 text-xs text-gray-600">Per design entry</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-4">
            <div className="text-xs uppercase tracking-wide text-gray-500">Payment Method</div>
            <div className="mt-1 text-base font-semibold text-gray-800">Razorpay</div>
            <div className="mt-1 text-xs text-gray-600">UPI, Cards, NetBanking & Wallets</div>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-red-100 bg-white p-4 text-xs text-gray-600">
          <div className="flex items-start gap-2">
            <Lock className="mt-0.5 h-3.5 w-3.5 text-red-600" />
            <p>Payment is securely processed on Razorpay. IFDA does not store your card or UPI credentials.</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-gray-500">By continuing, you agree to IFDA submission and payment terms.</div>
        <button
          onClick={handlePayment}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Starting Payment...' : 'Proceed to Razorpay'}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
