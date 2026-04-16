import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [analytics, setAnalytics] = useState({ totalVisitors: 0, todayVisitors: 0 });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!token || !isAdmin) {
      navigate('/login?redirect=/admin/users');
      return;
    }
    axios
      .get('/api/admin/analytics', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setAnalytics((res.data as { totalVisitors: number; todayVisitors: number }) || { totalVisitors: 0, todayVisitors: 0 }))
      .catch(() => undefined);
  }, [navigate]);

  const navItems = [
    { label: 'Users', href: '/admin/users' },
    { label: 'Submissions', href: '/admin/submissions' },
    { label: 'Jury Members', href: '/admin/jury-members' },
    { label: 'Jury Applications', href: '/admin/jury-applications' },
    { label: 'Payments', href: '/admin/payments' },
    { label: 'Judge Scores', href: '/admin/judge-scores' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-2">Manage users, submissions, jury members, jury applications, judge scores, and payments.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl bg-white border border-red-100 p-5">
            <p className="text-sm text-gray-500">Total Visitors</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{analytics.totalVisitors}</p>
          </div>
          <div className="rounded-xl bg-white border border-red-100 p-5">
            <p className="text-sm text-gray-500">Today’s Visitors</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{analytics.todayVisitors}</p>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`rounded-full px-5 py-2 text-sm font-semibold border transition-colors ${
                location.pathname === item.href
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white text-red-600 border-red-200 hover:bg-red-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Outlet />
      </div>
    </div>
  );
}
