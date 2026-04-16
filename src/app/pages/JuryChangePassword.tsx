import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

export default function JuryChangePassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login?redirect=/jury/change-password');
      return;
    }

    axios
      .get('/api/users/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        const user = res.data as { role?: string; mustChangePassword?: boolean };
        if (user.role !== 'jury') {
          navigate('/profile');
          setLoading(false);
          return;
        }

        if (!user.mustChangePassword) {
          navigate('/jury/assigned-designs');
          setLoading(false);
          return;
        }

        setLoading(false);
      })
      .catch(() => {
        navigate('/login?redirect=/jury/change-password');
        setLoading(false);
      })
    ;
  }, [navigate]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login?redirect=/jury/change-password');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirmation do not match.');
      return;
    }

    setSaving(true);
    try {
      await axios.patch(
        '/api/users/change-password',
        { newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const meRes = await axios.get('/api/users/me', { headers: { Authorization: `Bearer ${token}` } });
      localStorage.setItem('user', JSON.stringify(meRes.data));
      toast.success('Password changed successfully.');
      navigate('/jury/assigned-designs');
    } catch (error) {
      let message = 'Failed to change password';
      if (typeof error === 'object' && error && 'response' in error) {
        // @ts-expect-error axios response shape
        message = error.response?.data?.message || message;
      }
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-32 px-4 bg-gradient-to-br from-red-50 via-white to-gray-50 flex items-center justify-center">
        <div className="rounded-xl border border-red-100 bg-white px-6 py-4 text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-4 bg-gradient-to-br from-red-50 via-white to-gray-50">
      <div className="max-w-xl mx-auto rounded-2xl border border-red-100 bg-white p-6 shadow-sm border-t-4 border-t-red-600">
        <h1 className="text-2xl font-bold text-red-600">Change Password</h1>
        <p className="mt-2 text-sm text-gray-600">
          For security reasons, first-time jury login requires password reset before continuing.
        </p>

        <div className="mt-4 rounded-lg border border-red-100 bg-red-50/50 p-3 text-xs text-gray-700">
          Use a strong password with at least 8 characters.
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              className="w-full rounded-lg border border-red-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              className="w-full rounded-lg border border-red-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-200"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-red-600 py-2.5 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {saving ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
