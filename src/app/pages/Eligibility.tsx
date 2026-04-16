import { Button } from "@/app/components/ui/button";
import { CheckCircle, Users, Package, Target, AlertTriangle, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/app/components/shared/Footer";

export function Eligibility() {
  const participants = [
    "Furniture manufacturers and exporters",
    "Brands and product development teams",
    "Designers and design studios",
    "OEM/ODM suppliers",
    "Startups and independent product creators"
  ];

  const eligibleProducts = [
    "A single product",
    "A complete collection",
    "A newly launched design or an export-ready design currently in production"
  ];

  const criteria = [
    "Strong design language and detailing",
    "Functionality and user relevance",
    "Manufacturing feasibility and consistency",
    "Export readiness (durability, packaging, compliance mindset)",
    "Responsible material and process choices"
  ];

  const importantNotes = [
    "One participant may submit multiple entries across categories.",
    "The same entry should be submitted in only one category (choose the best fit).",
    "Designs must be original and owned/authorised for submission by the participant.",
    "IFDA reserves the right to reassign categories if required for fairness."
  ];

  return (
    <div className="min-h-screen">
      <main className="pt-32">
        {/* Hero Section */}
        {/* <section className="py-20 px-4 bg-gradient-to-br from-red-50 to-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl mb-6 text-red-600 font-bold">Eligibility</h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              IFDA is open to individuals and organisations creating furniture and lifestyle products that are designed to perform in global markets.
            </p>
          </div>
        </section> */}

        {/* Who Can Participate */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-red-600" />
                  </div>
                  <h2 className="text-4xl md:text-5xl text-red-600">Who Can Participate</h2>
                </div>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Entries are welcome from a diverse range of creators and organisations in the furniture and lifestyle industry.
                </p>
                <div className="space-y-4">
                  {participants.map((participant, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{participant}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-red-50 rounded-lg p-8">
                <div className="text-center">
                  <Users className="h-24 w-24 text-red-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Inclusive Participation</h3>
                  <p className="text-gray-700">
                    Whether you're a large manufacturer, a design studio, or an independent creator,
                    IFDA welcomes innovative minds shaping the future of furniture design.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Eligible Products */}
        <section className="py-20 px-4 bg-red-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="bg-white rounded-lg p-8">
                <div className="text-center">
                  <Package className="h-24 w-24 text-red-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Submissions</h3>
                  <p className="text-gray-700">
                    Submit individual pieces, complete collections, or innovative designs
                    ready for global markets.
                  </p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Package className="h-6 w-6 text-red-600" />
                  </div>
                  <h2 className="text-4xl md:text-5xl text-red-600">Eligible Products</h2>
                </div>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  You can submit various types of furniture and lifestyle products that demonstrate export-ready design excellence.
                </p>
                <div className="space-y-4">
                  {eligibleProducts.map((product, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{product}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What IFDA Looks For */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-4xl md:text-5xl text-red-600">What IFDA Looks For</h2>
              </div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Your submission should demonstrate excellence across multiple dimensions of design and market readiness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {criteria.map((item, index) => (
                <div key={index} className="bg-red-50 rounded-lg p-6 border border-red-100">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-gray-800 font-medium">{item}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="py-20 px-4 bg-red-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-4xl md:text-5xl text-red-600">Important Notes</h2>
              </div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Please review these guidelines carefully before submitting your entries.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <div className="flex items-start gap-4 mb-6">
                  <FileText className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <div className="space-y-4">
                    {importantNotes.map((note, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-red-600 font-bold flex-shrink-0">{index + 1}.</span>
                        <span className="text-gray-700">{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 bg-red-600 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl mb-6">Ready to Participate?</h2>
            <p className="text-lg leading-relaxed mb-8 max-w-4xl mx-auto">
              If your furniture or lifestyle products meet these eligibility criteria and demonstrate
              global market readiness, we encourage you to submit your entries for IFDA recognition.
            </p>
            <Link to="/submit-entry">
              <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
                Submit Your Entry
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}