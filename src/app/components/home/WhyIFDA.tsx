import { CheckCircle } from "lucide-react";
import { IFDA } from "../shared/BrandIFDA";
export function WhyIFDA() {
  const criteria = [
    "World-class design language and detailing",
    "Strong functionality and ergonomics",
    "Manufacturing feasibility at scale",
    "Export readiness and durability",
    "Sustainability and responsible material choices",
    "Market relevance and buyer confidence",
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-6 text-red-600">Why iFDA Matters</h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
            Export markets demand more than good-looking products. They demand consistent quality, strong engineering, 
            packaging readiness, and commercial viability all backed by responsible materials and processes.
          </p>
          <p className="text-xl text-gray-800 mb-8">
            <IFDA /> exists to highlight and reward designs that demonstrate:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {criteria.map((criterion, index) => (
            <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg">
              <CheckCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">{criterion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
