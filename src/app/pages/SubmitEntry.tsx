import { Button } from "@/app/components/ui/button";
import { FileText, Upload, CreditCard, CheckCircle, AlertCircle, ArrowRight, Users, Award, Trophy, Zap, Globe, Sparkles } from "lucide-react";
import { Footer } from "@/app/components/shared/Footer";
import { Link } from "react-router-dom";

export function SubmitEntry() {
  const isLoggedIn = Boolean(localStorage.getItem('token') || sessionStorage.getItem('token'));
  const submitLink = isLoggedIn ? '/submit-form' : '/login?redirect=/submit-form';
  const submissionRequirements = [
    {
      title: "Product Details",
      icon: FileText,
      items: [
        "Product / Collection name",
        "Category selected",
        "Intended use (Residential / Commercial / Outdoor, etc.)",
        "Dimensions (L × W × H)",
        "Materials used (wood type, metal, fabric, stone, etc.)"
      ]
    },
    {
      title: "Design & Function Overview",
      icon: CheckCircle,
      items: [
        "Short design description (100–150 words)",
        "Key features / innovation (if any)",
        "Functionality & user benefits"
      ]
    },
    {
      title: "Manufacturing Readiness",
      icon: CheckCircle,
      items: [
        "Construction details / joinery / engineering highlights",
        "Scalability notes (repeatability, consistency, QC readiness)",
        "Finish specification (type, look, durability intent)"
      ]
    },
    {
      title: "Export Readiness Inputs",
      icon: Upload,
      items: [
        "Durability intent / usage conditions",
        "Packaging readiness (flat-pack / knock-down / fully assembled)",
        "Shipping suitability and protection considerations",
        "Compliance mindset (materials, safety, sustainability expectations)"
      ]
    },
    {
      title: "Visuals (Mandatory)",
      icon: Upload,
      items: [
        "Upload clear images such as:",
        "Front / side / 3/4 angle views",
        "Close-ups of detailing and finish",
        "Lifestyle image (optional but recommended)",
        "Recommended: 4–8 images per entry."
      ]
    },
    {
      title: "Optional Supporting Material",
      icon: FileText,
      items: [
        "You may also include:",
        "Product drawings or technical sheets",
        "Assembly instructions (if applicable)",
        "Packaging photos or pack test notes",
        "Short video walkthrough (optional)"
      ]
    }
  ];

  const timelineData = [
    {
      phase: "Foundation & Preparation",
      period: "Jan – March 2026",
      icon: Users,
      description: "Finalising award categories, jury onboarding, partner alignment, and submission framework.",
      color: "bg-red-600"
    },
    {
      phase: "Launch & Promotion",
      period: "April 2026",
      icon: Globe,
      description: "Official IFDA launch, marketing rollout, outreach to brands, studios, and manufacturers.",
      color: "bg-red-600"
    },
    {
      phase: "Design Workshops",
      period: "April – July 2026",
      icon: Zap,
      description: "Curated workshops to support participants with design thinking, export readiness, product detailing, materials & finishes, and commercial viability—helping teams strengthen their entries for global markets.",
      color: "bg-red-600"
    },
    {
      phase: "Submission Window",
      period: "May – July 2026",
      icon: Upload,
      description: "Entries open for submissions across categories. Participants submit product details, images, and documentation.",
      color: "bg-red-600"
    },
    {
      phase: "Judging",
      period: "August 2026",
      icon: CheckCircle,
      description: "Independent jury evaluation based on IFDA's defined criteria and export-readiness benchmarks.",
      color: "bg-red-600"
    },
    {
      phase: "Award Ceremony",
      period: "September 2026",
      icon: Trophy,
      description: "Winners announced and recognised through the official IFDA awards ceremony and showcase.",
      color: "bg-red-600"
    },
    {
      phase: "Post-Event Activities",
      period: "October 2026",
      icon: Award,
      description: "Winner promotions, industry outreach, features across IFDA platforms, and collaboration opportunities.",
      color: "bg-red-600"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Fixed floating button - always visible, links to Login */}
      <Link
        to={submitLink}
        className="fixed top-38 right-8 z-50 flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-white shadow-xl ring-2 ring-red-400/50 transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-2xl hover:ring-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        aria-label="Login to Submit"
      >
        <Sparkles className="h-5 w-5" />
        <span className="font-semibold">Submit Entry</span>
      </Link>

      <main className="pt-32">
        {/* Hero Section */}
        {/* <section className="py-20 px-4 bg-gradient-to-br from-red-50 to-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl mb-6 text-red-600 font-bold">Submit Your Entry</h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Join iFDA and showcase your furniture designs to a global audience.
              Submit your innovative products for evaluation and recognition.
            </p>
          </div>
        </section> */}
      

        {/* Timeline Section */}
        <section className="py-14 px-4 bg-gradient-to-b from-gray-50 via-white to-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl mb-4 text-red-600 font-bold">iFDA 2026 Timeline</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                A clear, structured roadmap to guide participants through every stage of iFDA 2026.
              </p>
            </div>

            {/* Horizontal Roadmap (compact + scrollable) */}
            <div className="relative max-w-6xl mx-auto">
              <div className="relative overflow-x-auto pb-4 [scrollbar-width:thin]">
                <div className="relative flex w-max snap-x snap-mandatory items-start gap-6 px-2 pr-6">
                  {/* connector line (scrolls with content) */}
                  <div className="pointer-events-none absolute left-2 right-6 top-6 h-px bg-gradient-to-r from-red-600 via-red-400 to-red-600/10" />

                  {timelineData.map((item, index) => (
                    <div key={index} className="relative snap-start">
                      {/* marker */}
                      <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-red-200">
                        <div className={`absolute inset-0 ${item.color} opacity-10 rounded-2xl`} />
                        <item.icon className="relative h-5 w-5 text-red-600" />
                      </div>

                      {/* card */}
                      <div className="mt-4 w-[280px] sm:w-[340px] rounded-2xl border border-red-100 bg-white/80 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                            {item.phase}
                          </h3>
                          <span className="flex-shrink-0 inline-flex items-center rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                            {item.period}
                          </span>
                        </div>

                        <p className="mt-3 text-sm text-gray-700 leading-relaxed">{item.description}</p>

                        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-600">
                            {index + 1}
                          </span>
                         
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-2 text-center text-sm text-gray-500">
                Scroll horizontally to view the full roadmap
              </p>
            </div>
          </div>
        </section>

           {/* Submission Fee */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-xl mx-auto text-center">
              <div className="bg-red-50 rounded-lg p-8 border border-red-200 mb-8">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl text-red-600 font-bold">Submission Fee</h2>
                    <p className="text-lg text-gray-700">Each submission costs INR 5,000 per entry</p>
                  </div>
                </div>
                
              </div>

              <Link to={submitLink}>
                <Button
                  size="lg"
                  className="bg-red-600 text-white hover:bg-red-700 px-8 py-3 text-lg"
                >
                  Start Submission Process
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Submission Requirements */}
        <section className="py-20 px-4 bg-red-50" id="requiremts">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6 text-red-600">Submission Requirements</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                To ensure a smooth evaluation, please keep your entry complete and clear.
                Each entry should include the following information and materials.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {submissionRequirements.map((requirement, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <requirement.icon className="h-5 w-5 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{requirement.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {requirement.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <span className="text-red-600 font-medium flex-shrink-0">•</span>
                        <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="bg-red-50 rounded-lg p-8 border border-red-200">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Important Notes</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>All submissions must be original and owned by the participant</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Payment must be completed before submission deadline</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>High-quality visuals are crucial for proper evaluation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Late submissions will not be accepted</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 bg-red-600 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl mb-6">Ready to Submit?</h2>
            <p className="text-lg leading-relaxed mb-8 max-w-4xl mx-auto">
              Take the first step towards showcasing your furniture designs to a global audience.
              Our streamlined submission process makes it easy to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to={submitLink}>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg"
                >
                  Submit Your Entry Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-white hover:text-red-600 px-8 py-3 text-lg"
                onClick={() => { document.getElementById('requiremts')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                Review Requirements
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}