import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type User = {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: 'user' | 'jury';
  mustChangePassword?: boolean;
};

type Submission = {
  _id?: string;
  profile: {
    name: string;
    email: string;
    phone: string;
    orgName: string;
    orgType: string;
  };
  category: string;
  subcategory: string;
  product?: string;
  productName?: string;
  materials?: string[];
  finishes?: string[];
  dimensionsInches?: string;
  dimensionsCm?: string;
  specificDimensions?: string;
  materialUsed?: string;
  finishType?: string;
  dimensions?: string;
  description: string;
  agreeTnc?: boolean;
  notAiGenerated?: boolean;
  feasibleProduct?: boolean;
  technicalDrawingPresent?: boolean;
  files: { name: string; type: string; size: number; previewUrl?: string; fullUrl?: string }[];
  submittedAt: string;
};

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [profileInfo, setProfileInfo] = useState<Submission['profile'] | null>(null);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);
  const [selectedFile, setSelectedFile] = useState<{ url: string; type: string; name: string; kind: 'image' | 'video' | 'pdf' | 'file' } | null>(null);

  useEffect(() => {
    const userRaw = localStorage.getItem('user');
    const profileRaw = localStorage.getItem('profileInfo');
    if (userRaw) setUser(JSON.parse(userRaw));
    if (profileRaw) setProfileInfo(JSON.parse(profileRaw));
    let cancelled = false;

    async function loadProfileData(showLoader = true) {
      const token = localStorage.getItem('token');
      if (!token) {
        if (!cancelled) setLoadingSubmissions(false);
        return;
      }

      if (showLoader && !cancelled) {
        setLoadingSubmissions(true);
      }

      try {
        const [meRes, submissionsRes] = await Promise.all([
          axios.get('/api/users/me', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/users/submissions', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        if (cancelled) return;

        const data = meRes.data as User;
        if (data.role === 'jury' && data.mustChangePassword) {
          navigate('/jury/change-password');
          return;
        }

        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));

        const submitted = ((submissionsRes.data as { submissions?: Submission[] })?.submissions || []);
        setSubmissions(submitted);

        if (submitted.length > 0 && submitted[0]?.profile) {
          setProfileInfo(submitted[0].profile);
          localStorage.setItem('profileInfo', JSON.stringify(submitted[0].profile));
        }
      } catch (_error) {
        // silent fail
      } finally {
        if (!cancelled) setLoadingSubmissions(false);
      }
    }

    void loadProfileData(true);

    function handleSubmissionCreated() {
      void loadProfileData(false);
    }

    function handleFocus() {
      void loadProfileData(false);
    }

    function handleStorage(e: StorageEvent) {
      if (e.key === 'lastSubmissionAt') {
        void loadProfileData(false);
      }
    }

    window.addEventListener('submission:created', handleSubmissionCreated as EventListener);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('storage', handleStorage);

    return () => {
      cancelled = true;
      window.removeEventListener('submission:created', handleSubmissionCreated as EventListener);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('storage', handleStorage);
    };
  }, [navigate]);

  const isLoggedIn = Boolean(localStorage.getItem('token'));

  function getFileKind(file: Submission['files'][number]) {
    const type = file.type || '';
    const name = (file.name || '').toLowerCase();
    if (type.startsWith('image/')) return 'image';
    if (type.startsWith('video/')) return 'video';
    if (name.match(/\.(jpg|jpeg|png|gif|webp|bmp|svg)$/)) return 'image';
    if (name.match(/\.(mp4|mov|webm|mkv|avi)$/)) return 'video';
    if (type === 'application/pdf' || name.endsWith('.pdf')) return 'pdf';
    return 'file';
  }

  function formatList(items?: string[], fallback?: string) {
    const normalized = (items || []).map((item) => String(item || '').trim()).filter(Boolean);
    if (normalized.length > 0) return normalized.join(', ');
    return fallback || '—';
  }

  function formatDimensions(submission: Submission) {
    const parts = [
      submission.dimensionsInches ? `Inches: ${submission.dimensionsInches}` : '',
      submission.dimensionsCm ? `Centimeters: ${submission.dimensionsCm}` : '',
      submission.specificDimensions ? `Specific: ${submission.specificDimensions}` : '',
    ].filter(Boolean);
    if (parts.length > 0) return parts.join(' | ');
    return submission.dimensions || '—';
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('user');
    localStorage.removeItem('submissions');
    localStorage.removeItem('profileInfo');
    window.location.href = '/login';
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl bg-white shadow-xl p-8 text-center border border-red-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Please log in</h2>
          <p className="text-gray-600 mb-6">Log in to view your profile and submissions.</p>
          <Link to="/login" className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-white font-semibold hover:bg-red-700">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 rounded-2xl bg-white border border-red-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
            <p className="text-gray-600">Manage your details and view submissions.</p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-lg border border-red-200 px-4 py-2 text-red-700 font-semibold hover:bg-red-50"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 rounded-2xl bg-white border border-red-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">User Details</h2>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <div className="text-xs uppercase text-gray-500">Name</div>
                <div className="font-medium">{profileInfo?.name || user?.name || '—'}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-gray-500">Email</div>
                <div className="font-medium">{profileInfo?.email || user?.email || '—'}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-gray-500">Phone</div>
                <div className="font-medium">{profileInfo?.phone || user?.phone || '—'}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-gray-500">Organisation</div>
                <div className="font-medium">{profileInfo?.orgName || '—'}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-gray-500">Organisation Type</div>
                <div className="font-medium">{profileInfo?.orgType || '—'}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 rounded-2xl bg-white border border-red-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {user?.role === 'jury' ? 'Jury Workspace' : 'Submitted Designs'}
              </h2>
              {user?.role !== 'jury' && (
                <Link to="/submit-form" className="text-sm font-semibold text-red-600 hover:text-red-700">
                  Submit New Design
                </Link>
              )}
            </div>

            {user?.role === 'jury' ? (
              <div className="space-y-4">
                <div className="rounded-lg border border-red-100 bg-red-50/40 p-4 text-sm text-gray-700">
                  View all your assigned designs, open design details, and evaluate each design with the 6 scoring parameters.
                </div>
                <Link
                  to="/jury/assigned-designs"
                  className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                >
                  See Your Assigned Designs
                </Link>
              </div>
            ) : loadingSubmissions ? (
              <div className="rounded-lg border border-dashed border-red-200 bg-red-50/40 p-6 text-center text-gray-600">
                Loading submissions...
              </div>
            ) : submissions.length === 0 ? (
              <div className="rounded-lg border border-dashed border-red-200 bg-red-50/40 p-6 text-center text-gray-600">
                No submissions found yet.
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission, index) => (
                  <div key={submission._id || `${submission.submittedAt}-${index}`} className="rounded-xl border border-red-100 bg-white p-4 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                      <div>
                        <div className="text-xs uppercase text-gray-500">Category</div>
                        <div className="font-medium">{submission.category}</div>
                      </div>
                      <div>
                        <div className="text-xs uppercase text-gray-500">Subcategory</div>
                        <div className="font-medium">{submission.subcategory}</div>
                      </div>
                      <div>
                        <div className="text-xs uppercase text-gray-500">Product</div>
                        <div className="font-medium">{submission.product || '—'}</div>
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-700">
                      <div className="text-xs uppercase text-gray-500">Product Name</div>
                      <div className="mt-1 rounded-lg border border-gray-100 bg-gray-50 p-3 text-gray-700">
                        {submission.productName || '—'}
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                      <div>
                        <div className="text-xs uppercase text-gray-500">Materials Used</div>
                        <div className="mt-1 rounded-lg border border-gray-100 bg-gray-50 p-3 text-gray-700">
                          {formatList(submission.materials, submission.materialUsed)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs uppercase text-gray-500">Finishes</div>
                        <div className="mt-1 rounded-lg border border-gray-100 bg-gray-50 p-3 text-gray-700">
                          {formatList(submission.finishes, submission.finishType)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs uppercase text-gray-500">Dimensions</div>
                        <div className="mt-1 rounded-lg border border-gray-100 bg-gray-50 p-3 text-gray-700">
                          {formatDimensions(submission)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs uppercase text-gray-500">Design Description</div>
                        <div className="mt-1 rounded-lg border border-gray-100 bg-gray-50 p-3 text-gray-700">
                          {submission.description || '—'}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-xs uppercase text-gray-500">Design Files</div>
                      <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {(submission.files || [])
                          .filter((file) => file.previewUrl || file.fullUrl)
                          .map((file, fileIndex) => {
                            const fileUrl = file.fullUrl || file.previewUrl || '';
                            const kind = getFileKind(file);
                            return (
                              <button
                                key={`${file.name}-${fileIndex}`}
                                type="button"
                                onClick={() => setSelectedFile(fileUrl ? { url: fileUrl, type: file.type, name: file.name, kind } : null)}
                                className="group overflow-hidden rounded-lg border border-red-100 bg-white shadow-sm"
                              >
                                {kind === 'image' ? (
                                  <img
                                    src={fileUrl}
                                    alt={file.name}
                                    className="h-24 w-full object-cover transition-transform duration-200 group-hover:scale-105"
                                  />
                                ) : (
                                  <div className="flex h-24 w-full items-center justify-center bg-gray-100 text-xs font-semibold text-gray-600">
                                    {kind === 'video' ? 'Video File' : kind === 'pdf' ? 'PDF Document' : 'File'}
                                  </div>
                                )}
                              </button>
                            );
                          })}
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-gray-500">
                      Submitted on {new Date(submission.submittedAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative max-w-4xl w-full">
            <button
              type="button"
              onClick={() => setSelectedFile(null)}
              className="absolute -top-10 right-0 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-white"
            >
              Close
            </button>
            <div className="overflow-hidden rounded-xl bg-white">
              {selectedFile.kind === 'image' ? (
                <img src={selectedFile.url} alt={selectedFile.name} className="w-full max-h-[80vh] object-contain" />
              ) : selectedFile.kind === 'video' ? (
                <video src={selectedFile.url} className="w-full max-h-[80vh]" controls />
              ) : selectedFile.kind === 'pdf' ? (
                <iframe
                  src={selectedFile.url}
                  title={selectedFile.name}
                  className="w-full h-[80vh]"
                />
              ) : (
                <div className="p-6 text-sm text-gray-600">
                  Unsupported file type.
                </div>
              )}
            </div>
            <div className="mt-3 text-right">
              <a
                href={selectedFile.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
              >
                Open in new tab
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
