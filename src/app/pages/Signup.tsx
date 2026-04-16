// ...existing code...

import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { countryCodeOptions } from '@/app/constants/countryCodes';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const normalizedPhone = `${countryCode}${phone.trim()}`;
      await axios.post('/api/users/signup', { name, email, phone: normalizedPhone, password });
      toast.success('Signup successful! Please login.');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      let msg = 'Signup failed';
      if (typeof err === 'object' && err && 'response' in err) {
        // @ts-ignore
        msg = err.response?.data?.message || msg;
      }
      toast.error(msg);
    }
  }

  function handleGoogle() {
    window.location.href = '/api/users/google';
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-100 to-white">
      <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white p-10 border-t-8 border-red-600">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-red-600 tracking-tight">Sign Up for IFDA</h2>
        <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-2 border border-red-200 rounded-lg py-3 mb-5 hover:bg-red-50 transition font-semibold text-red-700">
          <img src="/assets/images/google.svg" alt="Google" className="w-5 h-5" />
          <span>Sign up with Google</span>
        </button>
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-red-200" />
          <span className="mx-2 text-red-400 text-xs font-semibold uppercase">or</span>
          <div className="flex-1 h-px bg-red-200" />
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" className="w-full mb-4 px-4 py-3 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 text-base" required />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full mb-4 px-4 py-3 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 text-base" required />
          <div className="mb-4 grid grid-cols-12 gap-2">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="col-span-5 border border-red-200 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-red-200 text-sm"
              required
            >
              {countryCodeOptions.map((option) => (
                <option key={option.code} value={option.code}>{option.label}</option>
              ))}
            </select>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="Phone Number"
              className="col-span-7 px-4 py-3 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 text-base"
              required
            />
          </div>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full mb-6 px-4 py-3 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 text-base" required />
          {/* error/success handled by toast */}
          <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-red-700 transition">Sign Up</button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">Already have an account? <a href="/login" className="text-red-600 hover:underline font-semibold">Login</a></p>
      </div>
    </div>
  );
}
