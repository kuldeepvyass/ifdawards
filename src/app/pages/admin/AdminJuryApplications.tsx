import { useEffect, useState } from 'react';
import axios from 'axios';

type JuryApplication = {
  _id: string;
  name?: string;
  email?: string;
  organization?: string;
  expertise?: string;
  linkedin?: string;
  description?: string;
  createdAt?: string;
};

export default function AdminJuryApplications() {
  const [applications, setApplications] = useState<JuryApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    axios
      .get('/api/admin/jury-applications', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setApplications(res.data || []))
      .catch(() => setApplications([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-gray-600">Loading jury applications...</div>;
  }

  return (
    <section>
      <h2 className="text-xl font-semibold text-red-600 mb-4">Jury Applications</h2>
      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app._id} className="rounded-xl border border-red-100 bg-white p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{app.name || '—'}</h3>
                <p className="text-sm text-gray-600">{app.email || '—'}</p>
              </div>
              <div className="text-sm text-gray-500">
                {app.createdAt ? new Date(app.createdAt).toLocaleString() : '—'}
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-700">
              <div className="text-xs uppercase text-gray-500">Organization</div>
              <p className="mt-1">{app.organization || '—'}</p>
            </div>
            <div className="mt-3 text-sm text-gray-700">
              <div className="text-xs uppercase text-gray-500">Expertise</div>
              <p className="mt-1">{app.expertise || '—'}</p>
            </div>
            <div className="mt-3 text-sm text-gray-700">
              <div className="text-xs uppercase text-gray-500">LinkedIn</div>
              <a className="text-red-600 hover:underline" href={app.linkedin} target="_blank" rel="noreferrer">
                {app.linkedin || '—'}
              </a>
            </div>
            <div className="mt-3 text-sm text-gray-700">
              <div className="text-xs uppercase text-gray-500">Description</div>
              <p className="mt-1">{app.description || '—'}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
