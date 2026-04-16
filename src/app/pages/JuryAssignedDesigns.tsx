import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

type DesignFile = {
  name: string;
  type: string;
  size: number;
  previewUrl?: string;
  fullUrl?: string;
};

type Design = {
  _id: string;
  category?: string;
  subcategory?: string;
  product?: string;
  productName?: string;
  materials?: string[];
  finishes?: string[];
  dimensionsInches?: string;
  dimensionsCm?: string;
  specificDimensions?: string;
  userEmail?: string;
  profile?: { name?: string; email?: string; phone?: string; orgName?: string; orgType?: string };
  description?: string;
  materialUsed?: string;
  finishType?: string;
  dimensions?: string;
  files?: DesignFile[];
  createdAt?: string;
  scoreSummary?: {
    judgesCount: number;
    averageOverallScore: number;
    averageOverallPercentage: number;
  };
  myEvaluation?: {
    scores: Record<string, number>;
    finalRemarks: string;
    overallScore: number;
    overallPercentage: number;
    updatedAt: string;
  } | null;
};

type Criterion = {
  key: string;
  label: string;
  weight: number;
};

type EvaluationForm = {
  designAesthetics: number;
  functionalityUx: number;
  innovationDifferentiation: number;
  exportReadiness: number;
  sustainabilityMaterials: number;
  marketRelevance: number;
  finalRemarks: string;
};

const initialEvaluation: EvaluationForm = {
  designAesthetics: 0,
  functionalityUx: 0,
  innovationDifferentiation: 0,
  exportReadiness: 0,
  sustainabilityMaterials: 0,
  marketRelevance: 0,
  finalRemarks: '',
};

function getFileKind(file: DesignFile) {
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

function formatDimensions(design: Design) {
  const parts = [
    design.dimensionsInches ? `Inches: ${design.dimensionsInches}` : '',
    design.dimensionsCm ? `Centimeters: ${design.dimensionsCm}` : '',
    design.specificDimensions ? `Specific: ${design.specificDimensions}` : '',
  ].filter(Boolean);
  if (parts.length > 0) return parts.join(' | ');
  return design.dimensions || '—';
}

export default function JuryAssignedDesigns() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [designs, setDesigns] = useState<Design[]>([]);
  const [selectedDesignId, setSelectedDesignId] = useState<string>('');
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [showEvaluate, setShowEvaluate] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationForm>(initialEvaluation);
  const [selectedFile, setSelectedFile] = useState<{ url: string; kind: 'image' | 'video' | 'pdf' | 'file'; name: string } | null>(null);

  const selectedDesign = useMemo(
    () => designs.find((design) => design._id === selectedDesignId) || null,
    [designs, selectedDesignId]
  );

  async function fetchAssignedDesigns() {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login?redirect=/jury/assigned-designs');
      return;
    }

    setLoading(true);
    try {
      const meRes = await axios.get('/api/users/me', { headers: { Authorization: `Bearer ${token}` } });
      const me = meRes.data as { role?: string; mustChangePassword?: boolean };
      if (me.role !== 'jury') {
        navigate('/profile');
        return;
      }
      if (me.mustChangePassword) {
        navigate('/jury/change-password');
        return;
      }

      const res = await axios.get('/api/users/jury/assigned-designs', { headers: { Authorization: `Bearer ${token}` } });
      const payload = res.data as { designs?: Design[] };
      const list = payload.designs || [];
      setDesigns(list);
      if (list.length > 0) {
        setSelectedDesignId((current) => current || list[0]._id);
      }
    } catch (error) {
      setDesigns([]);
      toast.error('Failed to load assigned designs');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAssignedDesigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selectedDesign) {
      setShowEvaluate(false);
      return;
    }

    if (selectedDesign.myEvaluation) {
      setEvaluation({
        designAesthetics: Number(selectedDesign.myEvaluation.scores?.designAesthetics ?? 0),
        functionalityUx: Number(selectedDesign.myEvaluation.scores?.functionalityUx ?? 0),
        innovationDifferentiation: Number(selectedDesign.myEvaluation.scores?.innovationDifferentiation ?? 0),
        exportReadiness: Number(selectedDesign.myEvaluation.scores?.exportReadiness ?? 0),
        sustainabilityMaterials: Number(selectedDesign.myEvaluation.scores?.sustainabilityMaterials ?? 0),
        marketRelevance: Number(selectedDesign.myEvaluation.scores?.marketRelevance ?? 0),
        finalRemarks: selectedDesign.myEvaluation.finalRemarks || '',
      });
      setShowEvaluate(false);
    } else {
      setEvaluation(initialEvaluation);
      setShowEvaluate(false);
    }
  }, [selectedDesign]);

  async function openEvaluateSection() {
    const token = localStorage.getItem('token');
    if (!token || !selectedDesignId) return;

    try {
      const res = await axios.get(`/api/users/jury/assigned-designs/${selectedDesignId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const payload = res.data as {
        criteria?: Criterion[];
        myEvaluation?: Design['myEvaluation'];
      };

      setCriteria(payload.criteria || []);
      if (payload.myEvaluation) {
        setEvaluation({
          designAesthetics: Number(payload.myEvaluation.scores?.designAesthetics ?? 0),
          functionalityUx: Number(payload.myEvaluation.scores?.functionalityUx ?? 0),
          innovationDifferentiation: Number(payload.myEvaluation.scores?.innovationDifferentiation ?? 0),
          exportReadiness: Number(payload.myEvaluation.scores?.exportReadiness ?? 0),
          sustainabilityMaterials: Number(payload.myEvaluation.scores?.sustainabilityMaterials ?? 0),
          marketRelevance: Number(payload.myEvaluation.scores?.marketRelevance ?? 0),
          finalRemarks: payload.myEvaluation.finalRemarks || '',
        });
      }
      setShowEvaluate(true);
    } catch (_error) {
      toast.error('Failed to open evaluation form');
    }
  }

  async function submitEvaluation() {
    const token = localStorage.getItem('token');
    if (!token || !selectedDesignId) return;

    setSaving(true);
    try {
      await axios.post(
        `/api/users/jury/assigned-designs/${selectedDesignId}/evaluate`,
        {
          scores: {
            designAesthetics: evaluation.designAesthetics,
            functionalityUx: evaluation.functionalityUx,
            innovationDifferentiation: evaluation.innovationDifferentiation,
            exportReadiness: evaluation.exportReadiness,
            sustainabilityMaterials: evaluation.sustainabilityMaterials,
            marketRelevance: evaluation.marketRelevance,
          },
          finalRemarks: evaluation.finalRemarks,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Score submitted successfully');
      setShowEvaluate(false);
      await fetchAssignedDesigns();
    } catch (error) {
      let message = 'Failed to submit score';
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
        <div className="rounded-xl border border-red-100 bg-white px-6 py-4 text-gray-700">Loading assigned designs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-4 pb-12 bg-gradient-to-br from-red-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto mb-5 rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-bold text-red-600">Jury Evaluation Workspace</h1>
        <p className="text-sm text-gray-600 mt-1">Review assigned designs, score all 6 criteria, and submit your final remarks.</p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <aside className="rounded-2xl border border-red-100 bg-white p-4 shadow-sm lg:col-span-1">
          <h2 className="text-lg font-semibold text-red-600">Assigned Designs</h2>
          <p className="text-xs text-gray-500 mt-1">Select a design to view details and evaluate.</p>
          <div className="mt-4 space-y-3 max-h-[65vh] overflow-auto pr-1">
            {designs.length === 0 && (
              <div className="rounded-lg border border-dashed border-red-200 bg-red-50/40 p-4 text-sm text-gray-600">
                No assigned designs found.
              </div>
            )}
            {designs.map((design) => (
              <button
                key={design._id}
                type="button"
                onClick={() => setSelectedDesignId(design._id)}
                className={`w-full rounded-xl border p-3 text-left transition ${
                  selectedDesignId === design._id
                    ? 'border-red-500 bg-red-50'
                    : 'border-red-100 bg-white hover:border-red-200 hover:bg-red-50/40'
                }`}
              >
                <p className="text-sm font-semibold text-gray-900">{design.productName || design.product || 'Unnamed Product'}</p>
                <p className="text-xs text-gray-600 mt-1">{design.category || 'Uncategorized'}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {design.scoreSummary?.judgesCount
                    ? `Current overall: ${design.scoreSummary.averageOverallScore.toFixed(2)} / 10`
                    : 'Not scored yet'}
                </p>
                {design.myEvaluation && (
                  <p className="text-xs text-red-700 mt-1 font-medium">You have evaluated this design.</p>
                )}
              </button>
            ))}
          </div>
        </aside>

        <section className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm lg:col-span-2">
          {!selectedDesign ? (
            <div className="text-sm text-gray-600">Select a design from the left panel.</div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{selectedDesign.productName || selectedDesign.product || 'Unnamed Product'}</h1>
                  <p className="text-sm text-red-700 mt-1">{selectedDesign.category || '—'} {selectedDesign.subcategory ? `• ${selectedDesign.subcategory}` : ''}</p>
                </div>
                <button
                  type="button"
                  onClick={openEvaluateSection}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Evaluate Design
                </button>
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <p className="text-xs uppercase text-gray-500">Designer Name</p>
                  <p className="font-medium">{selectedDesign.profile?.name || '—'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-500">Designer Email</p>
                  <p className="font-medium">{selectedDesign.profile?.email || selectedDesign.userEmail || '—'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-500">Organisation</p>
                  <p className="font-medium">{selectedDesign.profile?.orgName || '—'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-500">Product Category</p>
                  <p className="font-medium">{selectedDesign.product || '—'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-500">Submitted On</p>
                  <p className="font-medium">{selectedDesign.createdAt ? new Date(selectedDesign.createdAt).toLocaleString() : '—'}</p>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase text-gray-500">Materials Used</p>
                  <p className="mt-1 rounded-lg border border-gray-100 bg-gray-50 p-3">{formatList(selectedDesign.materials, selectedDesign.materialUsed)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-500">Finishes</p>
                  <p className="mt-1 rounded-lg border border-gray-100 bg-gray-50 p-3">{formatList(selectedDesign.finishes, selectedDesign.finishType)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-500">Dimensions</p>
                  <p className="mt-1 rounded-lg border border-gray-100 bg-gray-50 p-3">{formatDimensions(selectedDesign)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-500">Description</p>
                  <p className="mt-1 rounded-lg border border-gray-100 bg-gray-50 p-3">{selectedDesign.description || '—'}</p>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-xs uppercase text-gray-500">Design Files</p>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(selectedDesign.files || [])
                    .filter((file) => file.previewUrl || file.fullUrl)
                    .map((file, index) => {
                      const url = file.fullUrl || file.previewUrl || '';
                      const kind = getFileKind(file);
                      return (
                        <button
                          key={`${file.name}-${index}`}
                          type="button"
                          onClick={() => setSelectedFile(url ? { url, kind, name: file.name } : null)}
                          className="group overflow-hidden rounded-lg border border-red-100 bg-white shadow-sm"
                        >
                          {kind === 'image' ? (
                            <img src={url} alt={file.name} className="h-24 w-full object-cover transition-transform duration-200 group-hover:scale-105" />
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

              {selectedDesign.myEvaluation && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50/60 p-4">
                  <p className="text-sm font-semibold text-red-700">Your latest evaluation</p>
                  <p className="text-xs text-gray-700 mt-1">
                    Overall score: {selectedDesign.myEvaluation.overallScore.toFixed(2)} / 10 ({selectedDesign.myEvaluation.overallPercentage.toFixed(2)}%)
                  </p>
                  <p className="text-xs text-gray-700 mt-1">
                    Last updated: {new Date(selectedDesign.myEvaluation.updatedAt).toLocaleString()}
                  </p>
                </div>
              )}

              {showEvaluate && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50/40 p-4">
                  <h3 className="text-lg font-semibold text-gray-900">Evaluate Design</h3>
                  <p className="text-xs text-gray-600 mt-1">Set each criterion score from 0 to 10.</p>

                  <div className="mt-4 space-y-4">
                    {(criteria.length
                      ? criteria
                      : [
                          { key: 'designAesthetics', label: 'Design Aesthetics', weight: 0.2 },
                          { key: 'functionalityUx', label: 'Functionality & User Experience', weight: 0.2 },
                          { key: 'innovationDifferentiation', label: 'Innovation & Differentiation', weight: 0.2 },
                          { key: 'exportReadiness', label: 'Export Readiness (Durability, Packaging, Compliance Mindset)', weight: 0.2 },
                          { key: 'sustainabilityMaterials', label: 'Sustainability & Responsible Materials', weight: 0.1 },
                          { key: 'marketRelevance', label: 'Market Relevance', weight: 0.1 },
                        ]).map((criterion) => {
                      const value = Number(evaluation[criterion.key as keyof EvaluationForm] || 0);
                      return (
                        <div key={criterion.key} className="rounded-lg border border-red-100 bg-white p-3">
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span className="font-medium text-gray-800">{criterion.label}</span>
                            <span className="text-red-700 font-semibold">Weight {Math.round(criterion.weight * 100)}%</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500">0</span>
                            <input
                              type="range"
                              min={0}
                              max={10}
                              step={0.5}
                              value={value}
                              onChange={(e) =>
                                setEvaluation((current) => ({
                                  ...current,
                                  [criterion.key]: Number(e.target.value),
                                }))
                              }
                              className="w-full accent-red-600"
                            />
                            <span className="w-12 text-right text-sm font-semibold text-gray-900">{value.toFixed(1)}</span>
                          </div>
                        </div>
                      );
                    })}

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-800">Final Remarks</label>
                      <textarea
                        rows={4}
                        value={evaluation.finalRemarks}
                        onChange={(e) => setEvaluation((current) => ({ ...current, finalRemarks: e.target.value }))}
                        className="w-full rounded-lg border border-red-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                        placeholder="Add your final remarks..."
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={submitEvaluation}
                        disabled={saving}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                      >
                        {saving ? 'Submitting...' : 'Submit Score'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowEvaluate(false)}
                        className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
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
                <iframe src={selectedFile.url} title={selectedFile.name} className="w-full h-[80vh]" />
              ) : (
                <div className="p-6 text-sm text-gray-600">Unsupported file type.</div>
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
