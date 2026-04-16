import { useEffect, useState } from 'react';
import axios from 'axios';

type User = { _id: string; name?: string; email: string; phone?: string; createdAt?: string };

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    axios
      .get('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUsers((res.data as User[]) || []);
        setLoading(false);
      })
      .catch(() => {     
        setUsers([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-gray-600">Loading users...</div>;
  }

  return (
    <section>
      <h2 className="text-xl font-semibold text-red-600 mb-4">Users</h2>
      <div className="overflow-auto rounded-xl border border-red-100 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-red-50 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t border-red-100">
                <td className="px-4 py-3">{user.name || '—'}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.phone || '—'}</td>
                <td className="px-4 py-3">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
