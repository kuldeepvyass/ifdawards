import { useEffect, useState } from 'react';
import axios from 'axios';

type Payment = {
  _id: string;
  userEmail?: string;
  amount?: number;
  currency?: string;
  orderId?: string;
  paymentId?: string;
  status?: string;
  createdAt?: string;
};

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [byUser, setByUser] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    axios
      .get('/api/admin/payments', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setPayments(res.data?.payments || []);
        setTotalAmount(res.data?.totalAmount || 0);
        setByUser(res.data?.byUser || {});
      })
      .catch(() => setPayments([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-gray-600">Loading payments...</div>;
  }

  return (
    <section>
      <h2 className="text-xl font-semibold text-red-600 mb-4">Payments</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="rounded-xl border border-red-100 bg-white p-4">
          <p className="text-sm text-gray-500">Total Payments</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">₹{Math.round(totalAmount / 100)}</p>
        </div>
        {Object.entries(byUser).map(([email, amount]) => (
          <div key={email} className="rounded-xl border border-red-100 bg-white p-4">
            <p className="text-sm text-gray-500">{email}</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">₹{Math.round(amount / 100)}</p>
          </div>
        ))}
      </div>
      <div className="overflow-auto rounded-xl border border-red-100 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-red-50 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Payment ID</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="border-t border-red-100">
                <td className="px-4 py-3">{payment.userEmail || '—'}</td>
                <td className="px-4 py-3">₹{Math.round((payment.amount || 0) / 100)}</td>
                <td className="px-4 py-3">{payment.orderId || '—'}</td>
                <td className="px-4 py-3">{payment.paymentId || '—'}</td>
                <td className="px-4 py-3">{payment.status || 'paid'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
