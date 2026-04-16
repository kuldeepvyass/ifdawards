import { useEffect, useState } from 'react';
import axios from 'axios';

type Criterion = {
  key: string;
  label: string;
  weight: number;
};

type DesignSummary = {
  _id: string;
  product?: string;
  category?: string;
  subcategory?: string;
  profile?: { name?: string; email?: string };
  userEmail?: string;
  createdAt?: string;
  scoreSummary?: {
    judgesCount: number;
    averageOverallScore: number;
    averageOverallPercentage: number;
    criteriaAverages: Record<string, number>;
  };
};

type DesignScoreDetails = {
  criteria: Criterion[];
  design: {
    _id: string;
    product?: string;
    category?: string;
    subcategory?: string;
    profile?: { name?: string; email?: string };
    userEmail?: string;
  };
  scoreSummary: {
    judgesCount: number;
    averageOverallScore: number;
    averageOverallPercentage: number;
    criteriaAverages: Record<string, number>;
  };
  judgeScores: {
    id: string;
    juryMember: { name: string; email: string };
    scores: Record<string, number>;
    finalRemarks?: string;
    overallScore: number;
    overallPercentage: number;
    updatedAt: string;
  }[];
};

type WinnersPayload = {
  totalScoredSubmissions: number;
  productWinners: {
    product: string;
    category: string;
    submissionId: string;
    winnerName: string;
    winnerEmail: string;
    averageOverallScore: number;
    averageOverallPercentage: number;
  }[];
  categoryWinners: {
    category: string;
    product: string;
    submissionId: string;
    winnerName: string;
    winnerEmail: string;
    averageOverallScore: number;
    averageOverallPercentage: number;
  }[];
};

export default function AdminJudgeScores() {
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [winnerLoading, setWinnerLoading] = useState(false);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [designs, setDesigns] = useState<DesignSummary[]>([]);
  const [selectedDesignId, setSelectedDesignId] = useState<string>('');
  const [details, setDetails] = useState<DesignScoreDetails | null>(null);
  const [winners, setWinners] = useState<WinnersPayload | null>(null);

  async function loadDesignScores() {
    const token = localStorage.getItem('token');
    if (!token) return;

    setLoading(true);
    try {
      const res = await axios.get('/api/admin/judging/design-scores', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const payload = res.data as { criteria?: Criterion[]; designs?: DesignSummary[] };
      const list = payload.designs || [];
      setCriteria(payload.criteria || []);
      setDesigns(list);
      if (list.length > 0) {
        setSelectedDesignId((current) => current || list[0]._id);
      }
    } catch (_error) {
      setDesigns([]);
    } finally {
      setLoading(false);
    }
  }

  async function loadDesignDetails(designId: string) {
    const token = localStorage.getItem('token');
    if (!token || !designId) return;

    setDetailLoading(true);
    try {
      const res = await axios.get(`/api/admin/judging/design-scores/${designId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const payload = res.data as DesignScoreDetails;
      setDetails(payload);
      setCriteria(payload.criteria || []);
    } catch (_error) {
      setDetails(null);
    } finally {
      setDetailLoading(false);
    }
  }

  async function loadWinners() {
    const token = localStorage.getItem('token');
    if (!token) return;

    setWinnerLoading(true);
    try {
      const res = await axios.get('/api/admin/judging/winners', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWinners(res.data as WinnersPayload);
    } catch (_error) {
      setWinners(null);
    } finally {
      setWinnerLoading(false);
    }
  }

  useEffect(() => {
    loadDesignScores();
  }, []);

  useEffect(() => {
    if (!selectedDesignId) {
      setDetails(null);
      return;
    }
    loadDesignDetails(selectedDesignId);
  }, [selectedDesignId]);

  if (loading) {
    return <div className="text-gray-600">Loading judge scores...</div>;
  }

  return (
    <section>
      <div className="mb-4 rounded-xl border border-red-100 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-red-600">Judge Scores</h2>
            <p className="text-xs text-gray-600 mt-1">Review scorecards by design and generate winners from current judging data.</p>
          </div>
          <button
            type="button"
            onClick={loadWinners}
            disabled={winnerLoading}
            className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {winnerLoading ? 'Preparing winners...' : 'See winners according to current judging'}
          </button>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-red-100 bg-white p-3">
          <p className="text-xs uppercase text-gray-500">Total Designs</p>
          <p className="mt-1 text-xl font-bold text-red-600">{designs.length}</p>
        </div>
        <div className="rounded-xl border border-red-100 bg-white p-3">
          <p className="text-xs uppercase text-gray-500">Scored Designs</p>
          <p className="mt-1 text-xl font-bold text-red-600">{designs.filter((item) => Number(item.scoreSummary?.judgesCount || 0) > 0).length}</p>
        </div>
        <div className="rounded-xl border border-red-100 bg-white p-3">
          <p className="text-xs uppercase text-gray-500">Selected Design</p>
          <p className="mt-1 text-sm font-semibold text-gray-800 truncate">{details?.design?.product || '—'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-xl border border-red-100 bg-white p-4">
          <h3 className="text-sm font-semibold text-gray-800">All Designs</h3>
          <div className="mt-3 max-h-[70vh] overflow-auto space-y-2">
            {designs.map((design) => (
              <button
                key={design._id}
                type="button"
                onClick={() => setSelectedDesignId(design._id)}
                className={`w-full rounded-lg border p-3 text-left ${
                  selectedDesignId === design._id ? 'border-red-500 bg-red-50' : 'border-red-100 hover:bg-red-50/40'
                }`}
              >
                <p className="text-sm font-semibold text-gray-900">{design.product || 'Unnamed Product'}</p>
                <p className="text-xs text-gray-600 mt-1">{design.category || '—'}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {(design.scoreSummary?.averageOverallScore ?? 0).toFixed(2)} / 10 • {design.scoreSummary?.judgesCount || 0} judges
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-red-100 bg-white p-4 lg:col-span-2">
          {detailLoading && <div className="text-gray-600 text-sm">Loading design details...</div>}
          {!detailLoading && !details && (
            <div className="text-gray-600 text-sm">Select a design to view judge scores.</div>
          )}

          {!detailLoading && details && (
            <>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{details.design.product || 'Unnamed Product'}</h3>
                <p className="text-sm text-gray-600">
                  {details.design.category || '—'} {details.design.subcategory ? `• ${details.design.subcategory}` : ''}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Applicant: {details.design.profile?.name || 'Unknown'} ({details.design.profile?.email || details.design.userEmail || '—'})
                </p>
              </div>

              <div className="rounded-lg border border-red-100 bg-red-50/40 p-3 mb-4">
                <p className="text-sm font-semibold text-red-700">
                  Final Overall Score: {details.scoreSummary.averageOverallScore.toFixed(2)} / 10 ({details.scoreSummary.averageOverallPercentage.toFixed(2)}%)
                </p>
                <p className="text-xs text-gray-600 mt-1">Based on {details.scoreSummary.judgesCount} judge(s)</p>
              </div>

              <div className="overflow-auto rounded-lg border border-red-100">
                <table className="min-w-full text-sm">
                  <thead className="bg-red-50 text-gray-700">
                    <tr>
                      <th className="px-3 py-2 text-left">Judge</th>
                      {criteria.map((criterion) => (
                        <th key={criterion.key} className="px-3 py-2 text-left">
                          {criterion.label}
                        </th>
                      ))}
                      <th className="px-3 py-2 text-left">Overall</th>
                      <th className="px-3 py-2 text-left">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.judgeScores.map((row) => (
                      <tr key={row.id} className="border-t border-red-100 align-top">
                        <td className="px-3 py-2">
                          <p className="font-semibold text-gray-900">{row.juryMember.name}</p>
                          <p className="text-xs text-gray-600">{row.juryMember.email}</p>
                        </td>
                        {criteria.map((criterion) => (
                          <td key={`${row.id}-${criterion.key}`} className="px-3 py-2 text-gray-800">
                            {(row.scores?.[criterion.key] ?? 0).toFixed(1)}
                          </td>
                        ))}
                        <td className="px-3 py-2 font-semibold text-red-700">{row.overallScore.toFixed(2)} / 10</td>
                        <td className="px-3 py-2 text-xs text-gray-700 max-w-60">{row.finalRemarks || '—'}</td>
                      </tr>
                    ))}
                    {details.judgeScores.length === 0 && (
                      <tr>
                        <td className="px-3 py-3 text-sm text-gray-600" colSpan={criteria.length + 3}>
                          No scores submitted yet for this design.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {winners && (
        <div className="mt-6 space-y-5">
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-700">
              Winners generated from current judging data ({winners.totalScoredSubmissions} scored designs).
            </p>
          </div>

          <div className="rounded-xl border border-red-100 bg-white p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Category Winners</h3>
            <div className="overflow-auto rounded-lg border border-red-100">
              <table className="min-w-full text-sm">
                <thead className="bg-red-50 text-gray-700">
                  <tr>
                    <th className="px-3 py-2 text-left">Category</th>
                    <th className="px-3 py-2 text-left">Winning Product</th>
                    <th className="px-3 py-2 text-left">Winner Name</th>
                    <th className="px-3 py-2 text-left">Winner Email</th>
                    <th className="px-3 py-2 text-left">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {winners.categoryWinners.map((winner) => (
                    <tr key={`${winner.category}-${winner.submissionId}`} className="border-t border-red-100">
                      <td className="px-3 py-2">{winner.category}</td>
                      <td className="px-3 py-2">{winner.product || '—'}</td>
                      <td className="px-3 py-2">{winner.winnerName}</td>
                      <td className="px-3 py-2">{winner.winnerEmail}</td>
                      <td className="px-3 py-2 font-semibold text-red-700">{winner.averageOverallScore.toFixed(2)} / 10</td>
                    </tr>
                  ))}
                  {winners.categoryWinners.length === 0 && (
                    <tr>
                      <td className="px-3 py-3 text-gray-600" colSpan={5}>No category winners yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl border border-red-100 bg-white p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Product Winners</h3>
            <div className="overflow-auto rounded-lg border border-red-100">
              <table className="min-w-full text-sm">
                <thead className="bg-red-50 text-gray-700">
                  <tr>
                    <th className="px-3 py-2 text-left">Product</th>
                    <th className="px-3 py-2 text-left">Category</th>
                    <th className="px-3 py-2 text-left">Winner Name</th>
                    <th className="px-3 py-2 text-left">Winner Email</th>
                    <th className="px-3 py-2 text-left">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {winners.productWinners.map((winner) => (
                    <tr key={`${winner.product}-${winner.submissionId}`} className="border-t border-red-100">
                      <td className="px-3 py-2">{winner.product}</td>
                      <td className="px-3 py-2">{winner.category || '—'}</td>
                      <td className="px-3 py-2">{winner.winnerName}</td>
                      <td className="px-3 py-2">{winner.winnerEmail}</td>
                      <td className="px-3 py-2 font-semibold text-red-700">{winner.averageOverallScore.toFixed(2)} / 10</td>
                    </tr>
                  ))}
                  {winners.productWinners.length === 0 && (
                    <tr>
                      <td className="px-3 py-3 text-gray-600" colSpan={5}>No product winners yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
