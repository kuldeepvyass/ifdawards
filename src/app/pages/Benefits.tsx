import { IFDA } from "../components/shared/BrandIFDA";
import { Footer } from "@/app/components/shared/Footer";
import { CheckCircle, Users, Award, Globe, TrendingUp, Lightbulb } from "lucide-react";

export function Benefits() {
  const manufacturerBenefits = [
    "Export Credibility: Recognition through an independent, jury-led evaluation aligned with global benchmarks",
    "Design Validation: Feedback and benchmarking against international standards of design, functionality, and manufacturability",
    "Global Visibility: Showcase to buyers, sourcing ecosystems, and industry stakeholders",
    `Brand Positioning: <IFDA /> winner and nominee badges for catalogs, packaging, websites, and marketing`,
    "Market Confidence: A strong signal to buyers of durability, consistency, and production readiness",
    "Learning & Growth: Access to design workshops, mentoring, and ecosystem expertise",
    "Industry Recognition: Association with a platform focused on quality, export readiness, and professionalism"
  ];

  const juryBenefits = [
    "Early Access to Innovation: First-hand exposure to export-ready furniture designs, new materials, finishes, and product thinking from across India",
    "Market Intelligence: Deeper understanding of emerging design trends, manufacturing capabilities, and evolving product standards",
    "Supplier Discovery: Opportunity to identify reliable, design-led manufacturers and partners aligned with global retail requirements",
    "Strategic Insights: Ability to influence design direction while strengthening sourcing, quality, and innovation pipelines for their organisations",
    `Professional Recognition: Visibility as an <IFDA /> jury member on a credible, industry-led platform`,
    "Thought Leadership: Platform to share perspectives on global buyer expectations, quality benchmarks, and design maturity",
    "Ecosystem Impact: Contribution to raising overall industry standards while enabling stronger alignment between manufacturers and retailers"
  ];

  const partnerBenefits = [
    "Industry Leadership Positioning: Visibility as a supporter of export-ready design excellence",
    "Brand Alignment: Association with quality, innovation, sustainability, and global relevance",
    "High-Quality Reach: Direct engagement with manufacturers, exporters, designers, and decision-makers",
    `Co-Branding Opportunities: Logo presence across <IFDA /> website, events, communication, and media outreach`,
    "Content & Visibility: Participation in workshops, panels, showcases, and industry features",
    "Ecosystem Impact: Contribution to raising design and manufacturing standards across the industry",
    "Long-Term Value: Strategic association with a platform focused on capability building—not just awards"
  ];

  return (
    <div className="min-h-screen">
      <main className="pt-32">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-red-50 to-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl mb-6 text-red-600 font-bold">Who Benefits from <IFDA /></h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              <IFDA /> creates value for every stakeholder in India's furniture and design ecosystem—from manufacturers building global brands to industry leaders shaping the future of export-ready design.
            </p>
          </div>
        </section>

        {/* Manufacturers & Brands */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl text-red-600 font-bold">Furniture Manufacturers & Brands</h2>
                  <p className="text-lg text-gray-600 mt-2">Move from good products to globally competitive products</p>
                </div>
              </div>

              <p className="text-lg text-gray-700 max-w-3xl mb-8 leading-relaxed">
                <IFDA /> is built to help manufacturers and brands move beyond recognition and towards global readiness and long-term value.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {manufacturerBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 bg-red-50 p-6 rounded-lg border border-red-200">
                    <CheckCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800 leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-red-100 rounded-lg border-2 border-red-600">
                <p className="text-center text-lg font-semibold text-red-700">
                  <IFDA /> helps manufacturers move from "good products" to "globally competitive products."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Jury Members & Retailers */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl text-red-600 font-bold">Jury Members & Retailers</h2>
                  <p className="text-lg text-gray-600 mt-2">A strategic bridge between design, manufacturing, and global expectations</p>
                </div>
              </div>

              <p className="text-lg text-gray-700 max-w-3xl mb-8 leading-relaxed">
                The <IFDA /> jury is not only a decision-making body, but also a strategic bridge between design, manufacturing, and global retail expectations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {juryBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 bg-red-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <CheckCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800 leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-red-50 rounded-lg border-2 border-red-600">
                <p className="text-center text-lg font-semibold text-red-700">
                  <IFDA /> enables jury members to contribute to the industry while simultaneously strengthening their own sourcing, innovation, and quality ecosystems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partners & Sponsors */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl text-red-600 font-bold">Partners & Sponsors</h2>
                  <p className="text-lg text-gray-600 mt-2">Shape the future of Indian furniture exports</p>
                </div>
              </div>

              <p className="text-lg text-gray-700 max-w-3xl mb-8 leading-relaxed">
                <IFDA /> partners and sponsors play a key role in strengthening India's furniture and design ecosystem.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {partnerBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 bg-red-50 p-6 rounded-lg border border-red-200">
                    <CheckCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800 leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-red-100 rounded-lg border-2 border-red-600">
                <p className="text-center text-lg font-semibold text-red-700">
                  Partners don't just support <IFDA /> — they help shape the future of Indian furniture exports.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Summary Section */}
        <section className="py-20 px-4 bg-red-600 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl mb-8 font-bold">One Platform, Multiple Value Streams</h2>
              <p className="text-lg leading-relaxed max-w-4xl mx-auto mb-12">
                <IFDA /> isn't just an awards platform—it's an ecosystem builder. Whether you're a manufacturer seeking global credibility, a retailer hunting for innovation, or a partner strengthening India's design leadership, <IFDA /> creates measurable, long-term value.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/10 rounded-lg p-8 border border-white/20 backdrop-blur-sm">
                  <Globe className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                  <h3 className="text-2xl font-bold mb-3">Global Readiness</h3>
                  <p className="text-white/90">Build export-ready products and brands</p>
                </div>

                <div className="bg-white/10 rounded-lg p-8 border border-white/20 backdrop-blur-sm">
                  <Lightbulb className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                  <h3 className="text-2xl font-bold mb-3">Industry Intelligence</h3>
                  <p className="text-white/90">Access market trends and innovation insights</p>
                </div>

                <div className="bg-white/10 rounded-lg p-8 border border-white/20 backdrop-blur-sm">
                  <Users className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                  <h3 className="text-2xl font-bold mb-3">Ecosystem Growth</h3>
                  <p className="text-white/90">Strengthen connections across the industry</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}