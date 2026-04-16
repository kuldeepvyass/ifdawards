import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

type SubmissionFile = { name: string; type: string; size: number; previewUrl?: string; fullUrl?: string };

type Submission = {
  _id: string;
  userId?: string;
  userEmail?: string;
  profile?: { name?: string; email?: string; orgName?: string; orgType?: string };
  category?: string;
  subcategory?: string;
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
  description?: string;
  agreeTnc?: boolean;
  notAiGenerated?: boolean;
  feasibleProduct?: boolean;
  technicalDrawingPresent?: boolean;
  files?: SubmissionFile[];
  createdAt?: string;
};

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<{ url: string; type: string; name: string; kind: 'image' | 'video' | 'pdf' | 'file' } | null>(null);

  function getFileKind(file: SubmissionFile) {
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    axios
      .get('/api/admin/submissions', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setSubmissions((res.data as Submission[]) || []);
        setLoading(false);
      })
      .catch(() => {
        setSubmissions([]);
        setLoading(false);
      });
  }, []);

  const submissionsByUser = useMemo(() => {
    return submissions.reduce<Record<string, number>>((acc, submission) => {
      const key = submission.profile?.email || submission.userEmail || 'Unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }, [submissions]);

  if (loading) {
    return <div className="text-gray-600">Loading submissions...</div>;
  }

  return (
    <section>
      <h2 className="text-xl font-semibold text-red-600 mb-4">Submissions</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {Object.entries(submissionsByUser).map(([email, count]) => (
          <div key={email} className="rounded-xl border border-red-100 bg-white p-4">
            <p className="text-sm text-gray-500">{email}</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">{count} submissions</p>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        {submissions.map((submission) => (
          <div key={submission._id} className="rounded-xl border border-red-100 bg-white p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{submission.profile?.name || submission.userEmail || 'Unknown'}</h3>
                <p className="text-sm text-gray-600">{submission.profile?.email || submission.userEmail || '—'}</p>
              </div>
              <div className="text-sm text-gray-500">
                {submission.createdAt ? new Date(submission.createdAt).toLocaleString() : '—'}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 text-sm text-gray-700">
              <div>
                <div className="text-xs uppercase text-gray-500">Organisation</div>
                <div className="font-medium">{submission.profile?.orgName || '—'}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-gray-500">Category</div>
                <div className="font-medium">{submission.category || '—'}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-gray-500">Subcategory</div>
                <div className="font-medium">{submission.subcategory || '—'}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-gray-500">Product</div>
                <div className="font-medium">{submission.product || '—'}</div>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-700">
              <div className="text-xs uppercase text-gray-500">Product Name</div>
              <p className="mt-1 font-medium">{submission.productName || '—'}</p>
            </div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <div className="text-xs uppercase text-gray-500">Materials Used</div>
                <p className="mt-1">{formatList(submission.materials, submission.materialUsed)}</p>
              </div>
              <div>
                <div className="text-xs uppercase text-gray-500">Finishes</div>
                <p className="mt-1">{formatList(submission.finishes, submission.finishType)}</p>
              </div>
              <div>
                <div className="text-xs uppercase text-gray-500">Dimensions</div>
                <p className="mt-1">{formatDimensions(submission)}</p>
              </div>
              <div>
                <div className="text-xs uppercase text-gray-500">Design Description</div>
                <p className="mt-1">{submission.description || '—'}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs uppercase text-gray-500">Design Files</div>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {submission.files
                  ?.filter((file) => file.previewUrl || file.fullUrl)
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
          </div>
        ))}
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
    </section>
  );
}
