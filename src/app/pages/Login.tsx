// ...existing code...

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { countryCodeOptions } from '@/app/constants/countryCodes';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [phoneCountryCode, setPhoneCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneUpdateToken, setPhoneUpdateToken] = useState('');
  const [pendingRedirectTarget, setPendingRedirectTarget] = useState('/profile');
  const [phoneSaving, setPhoneSaving] = useState(false);
  const navigate = useNavigate();

  function getRedirectTarget() {
    const params = new URLSearchParams(window.location.search);
    const redirectParam = params.get('redirect');
    const storedRedirect = sessionStorage.getItem('postLoginRedirect');
    return redirectParam || storedRedirect || '/profile';
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      const target = getRedirectTarget();
      axios
        .get('/api/users/me', { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res.data));
          if (!res.data?.phone) {
            setPhoneUpdateToken(token);
            setPendingRedirectTarget(target);
            setShowPhoneModal(true);
            return;
          }
          sessionStorage.removeItem('postLoginRedirect');
          setTimeout(() => navigate(target), 800);
        })
        .catch(() => {
          // ignore; profile can still fetch later
          sessionStorage.removeItem('postLoginRedirect');
          setTimeout(() => navigate(target), 800);
        });
      toast.success('Google login successful!');
      params.delete('token');
      const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
      window.history.replaceState({}, '', newUrl);
    }
  }, [navigate]);

  async function handleGooglePhoneSave(e: React.FormEvent) {
    e.preventDefault();
    if (!phoneUpdateToken) return;
    const normalizedPhone = `${phoneCountryCode}${phoneNumber.trim()}`;
    setPhoneSaving(true);
    try {
      const updateRes = await axios.patch(
        '/api/users/phone',
        { phone: normalizedPhone },
        { headers: { Authorization: `Bearer ${phoneUpdateToken}` } }
      );
      localStorage.setItem('user', JSON.stringify(updateRes.data));
      setShowPhoneModal(false);
      setPhoneNumber('');
      sessionStorage.removeItem('postLoginRedirect');
      toast.success('Phone number updated successfully');
      navigate(pendingRedirectTarget || '/profile');
    } catch (err) {
      toast.error('Failed to update phone number');
    } finally {
      setPhoneSaving(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      if (email === 'kuldeep@admin.com') {
        const adminRes = await axios.post('/api/users/admin-login', { email, password });
        const adminData = adminRes.data as { token: string; user?: { id: string; name: string; email: string }; isAdmin?: boolean };
        localStorage.setItem('token', adminData.token);
        localStorage.setItem('isAdmin', adminData.isAdmin ? 'true' : 'false');
        if (adminData.user) {
          localStorage.setItem('user', JSON.stringify(adminData.user));
        }
        toast.success('Admin login successful!');
        setTimeout(() => navigate('/admin/users'), 500);
        return;
      }
      const res = await axios.post('/api/users/login', { email, password });
      const data = res.data as {
        token: string;
        role?: 'user' | 'jury';
        mustChangePassword?: boolean;
        user?: { id: string; name: string; email: string; role?: 'user' | 'jury' };
      };
      localStorage.setItem('token', data.token);
      localStorage.removeItem('isAdmin');
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      toast.success('Login successful!');
      const target = getRedirectTarget();
      sessionStorage.removeItem('postLoginRedirect');
      if (data.role === 'jury') {
        setTimeout(() => navigate(data.mustChangePassword ? '/jury/change-password' : '/jury/assigned-designs'), 800);
        return;
      }
      setTimeout(() => navigate(target), 800);
    } catch (err) {
      let msg = 'Login failed';
      if (typeof err === 'object' && err && 'response' in err) {
        // @ts-ignore
        msg = err.response?.data?.message || msg;
      }
      setError(msg);
      toast.error(msg);
    }
  }

  function handleGoogle() {
    const target = getRedirectTarget();
    sessionStorage.setItem('postLoginRedirect', target);
    window.location.href = '/api/users/google';
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-100 to-white">
      <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white p-10 border-t-8 border-red-600">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-red-600 tracking-tight">Login to IFDA</h2>
        <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-2 border border-red-200 rounded-lg py-3 mb-5 hover:bg-red-50 transition font-semibold text-red-700">
          <img src="/assets/images/google.svg" alt="Google" className="w-5 h-5" />
          <span>Continue with Google</span>
        </button>
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-red-200" />
          <span className="mx-2 text-red-400 text-xs font-semibold uppercase">or</span>
          <div className="flex-1 h-px bg-red-200" />
        </div>
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full mb-4 px-4 py-3 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 text-base" required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full mb-6 px-4 py-3 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 text-base" required />
          {/* error handled by toast */}
          <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-red-700 transition">Login</button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">Don't have an account? <a href="/signup" className="text-red-600 hover:underline font-semibold">Sign up</a></p>
      </div>

      {showPhoneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-red-100">
            <h3 className="text-xl font-bold text-gray-900">Add Your Phone Number</h3>
            <p className="mt-2 text-sm text-gray-600">Please add your country code and phone number to complete your profile.</p>
            <form onSubmit={handleGooglePhoneSave} className="mt-5">
              <div className="grid grid-cols-12 gap-2">
                <select
                  value={phoneCountryCode}
                  onChange={(e) => setPhoneCountryCode(e.target.value)}
                  className="col-span-5 border border-red-200 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-red-200 text-sm"
                  required
                >
                  {countryCodeOptions.map((option) => (
                    <option key={option.code} value={option.code}>{option.label}</option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="Phone Number"
                  className="col-span-7 border border-red-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-200 text-base"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={phoneSaving}
                className="mt-4 w-full rounded-lg bg-red-600 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {phoneSaving ? 'Saving...' : 'Save Phone Number'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
