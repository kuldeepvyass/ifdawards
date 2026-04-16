import { BrandName } from "@/app/components/shared/BrandName";

export function EvaluationCriteria() {
  const criteria = [
    { title: "Design Aesthetics", percentage: 20 },
    { title: "Functionality & User Experience", percentage: 20 },
    { title: "Innovation & Differentiation", percentage: 20 },
    { title: "Export Readiness", subtitle: "(durability, packaging, compliance mindset)", percentage: 20 },
    { title: "Sustainability & Responsible Materials", percentage: 10 },
    { title: "Market Relevance", percentage: 10 },
  ];

  return (
    <section id="criteria" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6 text-red-600">How Designs Are Judged</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            <BrandName /> recognises designs that demonstrate excellence across:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {criteria.map((criterion, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-red-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg text-gray-900 mb-1">{criterion.title}</h3>
                  {criterion.subtitle && (
                    <p className="text-sm text-gray-600">{criterion.subtitle}</p>
                  )}
                </div>
                <div className="text-3xl text-red-600 ml-4">
                  {criterion.percentage}%
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full transition-all"
                  style={{ width: `${criterion.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
