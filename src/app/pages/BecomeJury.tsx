import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

export default function BecomeJury() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const hasNotified = useRef(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [expertise, setExpertise] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false);
      if (!hasNotified.current) {
        toast.error('Please login to continue');
        hasNotified.current = true;
      }
      navigate('/login?redirect=/become-jury', { replace: true });
      return;
    }
    setIsLoggedIn(true);
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const application = {
      name,
      email,
      organization,
      expertise,
      linkedin,
      description,
      submittedAt: new Date().toISOString(),
    };
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    try {
      await axios.post('/api/users/jury-application', application, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem('juryApplication', JSON.stringify(application));
      toast.success('Your details are saved. We will get back to you on your mail.');
      setTimeout(() => navigate('/'), 1200);
    } catch (error) {
      toast.error('Unable to submit. Please try again.');
    }
  }

  if (isLoggedIn === false) return null;

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl bg-white border border-red-100 shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Become a Jury</h1>
          <p className="text-gray-600 mb-6">
            Please fill in your details. Our team will review your application and contact you by email.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Organization</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                required
                className="w-full px-4 py-3 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200"
                placeholder="Your current organization"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expertise</label>
              <input
                type="text"
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
                required
                className="w-full px-4 py-3 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200"
                placeholder="Design, craftsmanship, sustainability, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                required
                className="w-full px-4 py-3 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200"
                placeholder="https://www.linkedin.com/in/your-profile"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
                className="w-full px-4 py-3 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200"
                placeholder="Tell us about your experience and why you want to be a jury member."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-red-700 transition"
            >
              Submit Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
