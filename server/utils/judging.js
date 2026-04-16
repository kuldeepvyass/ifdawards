export const JUDGING_CRITERIA = [
  {
    key: 'designAesthetics',
    label: 'Design Aesthetics',
    weight: 0.2,
  },
  {
    key: 'functionalityUx',
    label: 'Functionality & User Experience',
    weight: 0.2,
  },
  {
    key: 'innovationDifferentiation',
    label: 'Innovation & Differentiation',
    weight: 0.2,
  },
  {
    key: 'exportReadiness',
    label: 'Export Readiness (Durability, Packaging, Compliance Mindset)',
    weight: 0.2,
  },
  {
    key: 'sustainabilityMaterials',
    label: 'Sustainability & Responsible Materials',
    weight: 0.1,
  },
  {
    key: 'marketRelevance',
    label: 'Market Relevance',
    weight: 0.1,
  },
];

export function calculateOverallScore(scores) {
  return Number(
    JUDGING_CRITERIA.reduce((sum, criterion) => {
      const value = Number(scores?.[criterion.key] ?? 0);
      return sum + (Number.isFinite(value) ? value : 0) * criterion.weight;
    }, 0).toFixed(3)
  );
}

function calculateCriteriaAverages(scoreDocs) {
  const totalJudges = scoreDocs.length;
  if (!totalJudges) {
    return JUDGING_CRITERIA.reduce((acc, criterion) => {
      acc[criterion.key] = 0;
      return acc;
    }, {});
  }

  return JUDGING_CRITERIA.reduce((acc, criterion) => {
    const avg = scoreDocs.reduce((sum, scoreDoc) => sum + Number(scoreDoc?.scores?.[criterion.key] || 0), 0) / totalJudges;
    acc[criterion.key] = Number(avg.toFixed(3));
    return acc;
  }, {});
}

export function getSubmissionScoreSummary(submission, scoreDocs) {
  const judgesCount = scoreDocs.length;
  const averageOverallScore = judgesCount
    ? Number((scoreDocs.reduce((sum, scoreDoc) => sum + Number(scoreDoc.overallScore || 0), 0) / judgesCount).toFixed(3))
    : 0;

  return {
    submissionId: String(submission?._id || ''),
    category: submission?.category || '',
    product: submission?.product || '',
    judgesCount,
    averageOverallScore,
    averageOverallPercentage: Number((averageOverallScore * 10).toFixed(2)),
    criteriaAverages: calculateCriteriaAverages(scoreDocs),
  };
}

export function computeWinners(scoredSubmissions) {
  const valid = scoredSubmissions.filter((item) => Number(item?.scoreSummary?.judgesCount || 0) > 0);

  const byProduct = valid.reduce((acc, item) => {
    const product = String(item?.submission?.product || 'Unknown Product');
    if (!acc[product]) acc[product] = [];
    acc[product].push(item);
    return acc;
  }, {});

  const byCategory = valid.reduce((acc, item) => {
    const category = String(item?.submission?.category || 'Unknown Category');
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  const pickBest = (items) => {
    const sorted = [...items].sort((a, b) => {
      const scoreDiff = (b.scoreSummary?.averageOverallScore || 0) - (a.scoreSummary?.averageOverallScore || 0);
      if (scoreDiff !== 0) return scoreDiff;
      return new Date(a?.submission?.createdAt || 0).getTime() - new Date(b?.submission?.createdAt || 0).getTime();
    });
    return sorted[0] || null;
  };

  const productWinners = Object.entries(byProduct)
    .map(([product, items]) => {
      const winner = pickBest(items);
      if (!winner) return null;
      return {
        product,
        category: winner?.submission?.category || '',
        submissionId: String(winner?.submission?._id || ''),
        winnerName: winner?.submission?.profile?.name || winner?.submission?.userEmail || 'Unknown',
        winnerEmail: winner?.submission?.profile?.email || winner?.submission?.userEmail || 'Unknown',
        averageOverallScore: winner?.scoreSummary?.averageOverallScore || 0,
        averageOverallPercentage: winner?.scoreSummary?.averageOverallPercentage || 0,
      };
    })
    .filter(Boolean)
    .sort((a, b) => String(a.product).localeCompare(String(b.product)));

  const categoryWinners = Object.entries(byCategory)
    .map(([category, items]) => {
      const winner = pickBest(items);
      if (!winner) return null;
      return {
        category,
        product: winner?.submission?.product || '',
        submissionId: String(winner?.submission?._id || ''),
        winnerName: winner?.submission?.profile?.name || winner?.submission?.userEmail || 'Unknown',
        winnerEmail: winner?.submission?.profile?.email || winner?.submission?.userEmail || 'Unknown',
        averageOverallScore: winner?.scoreSummary?.averageOverallScore || 0,
        averageOverallPercentage: winner?.scoreSummary?.averageOverallPercentage || 0,
      };
    })
    .filter(Boolean)
    .sort((a, b) => String(a.category).localeCompare(String(b.category)));

  return {
    totalScoredSubmissions: valid.length,
    productWinners,
    categoryWinners,
  };
}
