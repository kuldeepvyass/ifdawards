import { Button } from "@/app/components/ui/button";
import { Globe, Users, Award, Target, Heart, Mail } from "lucide-react";
import { Footer } from "@/app/components/shared/Footer";
import { Link } from "react-router-dom";

export function AboutUs() {
  return (
    <div className="min-h-screen">
      <main className="pt-32">
        {/* Hero Section */}
        {/* <section className="py-20 px-4 bg-gradient-to-br from-red-50 to-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl mb-6 text-red-600 font-bold">About iFDA</h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              India's Furniture & Home Décor Export Opportunity
            </p>
          </div>
        </section> */}

        {/* Industry Overview */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl mb-6 text-red-600">India's Furniture & Home Décor Ecosystem</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  India's furniture and home décor ecosystem is rapidly expanding its global footprint.
                  With a combined export value of over USD 5 Billion annually, the industry today serves buyers across 100+ countries, supported by a large network of 9,000+ export-driven companies.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  This growth is being fueled by rising global demand for fresh designs and new product development, reliable quality systems and compliance readiness, stronger sourcing and supply capabilities, and transparent, scalable execution.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full mb-4">
                    <Globe className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl mb-2 text-red-600">Global Reach</h3>
                  <p className="text-gray-600">100+ Countries</p>
                </div>
                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full mb-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl mb-2 text-red-600">Export Companies</h3>
                  <p className="text-gray-600">9,000+</p>
                </div>
                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full mb-4">
                    <Award className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl mb-2 text-red-600">Export Value</h3>
                  <p className="text-gray-600">USD 5B+</p>
                </div>
                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full mb-4">
                    <Target className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl mb-2 text-red-600">Growth Focus</h3>
                  <p className="text-gray-600">Innovation & Quality</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Movement Section */}
        <section className="py-20 px-4 bg-red-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl mb-6 text-red-600">A Movement Built on Design, Quality, and Collaboration</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6">
              Furniture is not just a product. It is a reflection of design thinking, craftsmanship, and lifestyle aspirations.
            </p>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-12">
              Across the world, buyers are demanding more than just "good furniture." They want fresh, trend-led designs, better functionality, sustainable materials, reliable quality, faster product development, and consistent execution.
            </p>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              The Indian furniture industry has the talent and capacity to deliver all of this. What it needs is a stronger ecosystem that supports innovation and growth. That's where IFDA begins.
            </p>
          </div>
        </section>

        {/* Why iFDA */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl mb-6 text-red-600">Why iFDA Was Created</h2>
              <h3 className="text-3xl mb-6 text-gray-800">iFDA Awards — Celebrating Export-Ready Excellence</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  The iFDA Awards are designed to recognize and accelerate the next generation of export-ready manufacturers and products from India.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-lg text-gray-700">600+ fresh export-ready entries</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-lg text-gray-700">Across 50+ categories</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-lg text-gray-700">Covering furniture, home décor, and allied home segments</span>
                  </div>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The awards will serve as a structured platform to highlight innovation, capability, and global readiness—while creating stronger visibility and credibility for participating exporters.
                </p>
              </div>
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  The Indian furniture industry has the potential to grow 10X. But that growth will not come only from higher volumes. It will come from building a future-ready foundation of:
                </p>
                <ul className="space-y-3 text-lg text-gray-700">
                  <li>• Design-led product development</li>
                  <li>• Global market understanding</li>
                  <li>• Strong sourcing and supplier systems</li>
                  <li>• Quality and compliance readiness</li>
                  <li>• Collaboration between buyers and manufacturers</li>
                  <li>• A culture of continuous improvement</li>
                </ul>
                <p className="text-lg text-gray-700 leading-relaxed mt-6">
                  iFDA was created to help the ecosystem build these strengths—together.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 px-4 bg-red-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl mb-6 text-red-600">Our Story</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6">
              iFDA was born from years of working closely with the furniture ecosystem—listening to manufacturers, exporters, sourcing teams, and global buyers.
            </p>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6">
              Over time, one insight became clear: The next phase of industry growth will be driven by design and innovation. Those who create better products, faster, and with stronger reliability—will lead the future.
            </p>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              iFDA exists to bring the ecosystem together so that learning becomes shared, progress becomes structured, and opportunities become bigger for everyone.
            </p>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl mb-6 text-red-600">What We Do</h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                iFDA drives impact through structured initiatives that solve real industry challenges:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-red-50 rounded-lg">
                <h3 className="text-2xl mb-4 text-red-600">1) Design & Product Development Enablement</h3>
                <p className="text-gray-700">
                  We encourage design-led growth by promoting better product thinking, documentation, sampling systems, and market-aligned development.
                </p>
              </div>
              <div className="p-6 bg-red-50 rounded-lg">
                <h3 className="text-2xl mb-4 text-red-600">2) Quality, Compliance & Global Readiness</h3>
                <p className="text-gray-700">
                  We help manufacturers strengthen quality systems and compliance awareness to meet international buyer expectations with confidence.
                </p>
              </div>
              <div className="p-6 bg-red-50 rounded-lg">
                <h3 className="text-2xl mb-4 text-red-600">3) Industry Collaboration</h3>
                <p className="text-gray-700">
                  We build meaningful connections across the ecosystem—manufacturers, sourcing leaders, buyers, and partners—so growth becomes collaborative, not isolated.
                </p>
              </div>
              <div className="p-6 bg-red-50 rounded-lg">
                <h3 className="text-2xl mb-4 text-red-600">4) Engagement Platforms</h3>
                <p className="text-gray-700">
                  Through structured events, workshops, and ecosystem initiatives, IFDA creates opportunities for learning, alignment, and long-term value creation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision, Mission, Belief */}
        <section className="py-20 px-4 bg-red-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full mb-4">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-2xl mb-4 text-red-600">Vision</h3>
                <p className="text-gray-700">
                  To build a future-ready furniture ecosystem where Indian manufacturers are known globally for innovation, design excellence, reliability, and trust.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-2xl mb-4 text-red-600">Mission</h3>
                  Enable manufacturers to build new, globally relevant product ranges, strengthen capability through learning, systems, and best practices.
                  improve ecosystem performance through collaboration and transparency, support industry-wide progress that unlocks 10X growth.
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full mb-4">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-2xl mb-4 text-red-600">Belief</h3>
                <p className="text-gray-700">
                  We believe the industry grows faster when it grows together. iFDA is built for the greater good of the ecosystem—to create shared value, stronger capabilities, and long-term global competitiveness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Team */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl mb-6 text-red-600">Led by Experience. Driven by Purpose.</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
              iFDA is guided by a Core Team of industry leaders from sourcing, product development, quality, compliance, and manufacturing—bringing global perspective and practical execution to build meaningful change.
            </p>
            <Button size="lg" className="bg-red-600 text-white hover:bg-red-700">
              <Link to="/core-team"> Meet the Core Team</Link>
            </Button>
          </div>
        </section>

        {/* Join the Movement */}
        <section className="py-20 px-4 bg-red-600 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl mb-6">Join the iFDA Movement</h2>
            <p className="text-lg leading-relaxed mb-8 max-w-4xl mx-auto">
              If you believe in building a stronger furniture ecosystem through design, innovation, and collaboration—iFDA welcomes you.
            </p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <Mail className="h-6 w-6" />
              <span className="text-lg">Connect with us to collaborate, participate, or contribute to the mission.</span>
            </div>
            <Button onClick={() => window.location.href = 'mailto:team@ifdawards.com'} size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
              Get In Touch
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}