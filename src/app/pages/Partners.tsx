import { Button } from "@/app/components/ui/button";
import { Footer } from "@/app/components/shared/Footer";
import { Users, Award, Mail, Phone, Newspaper, Globe, Target, CheckCircle } from "lucide-react";
import FfscLogo from "../../assets/images/parter logo ffsc.png";

export function Partners() {
  const partners = [
    {
      name: "FFSC – Furniture & Fittings Skill Council",
      website: "https://ffsc.in",
      bioParagraphs: [
        "FFSC, a Sector Skill Council under NSDC, strengthens iFDA by bringing structured skill development and nationally recognized certification frameworks to the furniture ecosystem.",
        "As a partner, FFSC supports iFDA through workforce standardization, certified training pathways, and alignment with government-backed skilling initiatives—enhancing professionalism, credibility, and long-term industry capability.",
      ],
      image: FfscLogo,
    },
    // {
    //   name: "IDEC – India Design Export Council",
    //   website: "https://example.com",
    //   bioParagraphs: [
    //     "IDEC partners with iFDA to amplify export readiness and support buyer-seller engagement across global markets.",
    //     "Through trade facilitation and industry alignment, IDEC helps Indian design-led brands grow international reach and visibility.",
    //   ],
    //   image: "https://static.thenounproject.com/png/3918329-200.png",
    // },
    // {
    //   name: "FMAI – Furniture Manufacturers Association of India",
    //   website: "https://example.com",
    //   bioParagraphs: [
    //     "FMAI supports iFDA by mobilizing manufacturer participation and driving capacity-building initiatives.",
    //     "The association strengthens industry alignment with quality, compliance, and export readiness expectations.",
    //   ],
    //   image: "https://static.thenounproject.com/png/3918329-200.png",
    // },
    // {
    //   name: "DesignCraft Collective",
    //   website: "https://example.com",
    //   bioParagraphs: [
    //     "DesignCraft Collective collaborates with iFDA to build design capability and mentor emerging talent.",
    //     "The network supports product innovation aligned to global benchmarks and market relevance.",
    //   ],
    //   image: "https://static.thenounproject.com/png/3918329-200.png",
    // },
  ];

  const partnerBenefits = [
    "Official recognition as an IFDA Partner",
    "Visibility across IFDA platforms, event communication, and promotions",
    "Co-branding opportunities on selected initiatives",
    "Priority access to IFDA workshops and industry interactions",
    "Participation in strengthening India's design-led export ecosystem"
  ];

  const mediaPartnerBenefits = [
    "Official recognition as an IFDA Media Partner",
    "Co-branding across IFDA website, communication, and event promotions",
    "Access to shortlisted designs and winner stories",
    "Opportunities for exclusive interviews with jury members and winners",
    "Priority coverage opportunities during key IFDA milestones"
  ];

  const partnerContributions = [
    "Industry outreach & member engagement",
    "Promotion across official channels",
    "Nomination and participation support",
    "Co-hosting design workshops & knowledge sessions",
    "Facilitating industry connections and ecosystem building"
  ];

  return (
    <div className="min-h-screen">
      <main className="pt-32">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-red-50 to-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl mb-6 text-red-600 font-bold">IFDA Partners</h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              IFDA is built in collaboration with industry bodies, associations, and ecosystem leaders who are committed to strengthening India's furniture and lifestyle design capabilities for global markets.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
              Our partners play a key role in enabling outreach, credibility, participation, and industry alignment—helping IFDA become a platform that benefits the entire furniture ecosystem.
            </p>
          </div>
        </section>

        {/* Partner Organisations */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
        

            <div className="space-y-12">
              {partners.map((partner, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                      <div>
                        <img
                          src={partner.image}
                          alt={partner.name}
                          className="w-32 h-32 object-contain rounded-full mb-4 mx-auto lg:mx-0 bg-white"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center lg:text-left">{partner.name}</h3>
                    </div>
                    <div className="lg:col-span-2">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Partner Overview</h4>
                     
                      <div className="space-y-4">
                        {partner.bioParagraphs.map((paragraph, paragraphIndex) => (
                          <p key={paragraphIndex} className="text-gray-700 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                       <div className="mb-4">
                        <a href={partner.website} target="_blank" rel="noreferrer" className="text-sm text-red-600 hover:text-red-700">
                          {partner.website}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Partner With IFDA */}
        <section className="py-20 px-4 bg-red-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6 text-red-600 font-bold">Why Partner With IFDA</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Partnering with IFDA helps organisations:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Export-Ready Development</h3>
                <p className="text-gray-700">Support export-ready product development and design excellence</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Industry Recognition</h3>
                <p className="text-gray-700">Enable member brands to gain industry recognition and visibility</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ecosystem Strengthening</h3>
                <p className="text-gray-700">Strengthen the ecosystem through design education and workshops</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Global Market Promotion</h3>
                <p className="text-gray-700">Promote India's capability in global furniture and lifestyle markets</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 md:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Independent Credibility</h3>
                <p className="text-gray-700">Align with a platform driven by structured evaluation and independent jury credibility</p>
              </div>
            </div>
          </div>
        </section>

        {/* How Partners Contribute */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6 text-red-600 font-bold">How Partners Contribute</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                IFDA partners may support through:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnerContributions.map((contribution, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{contribution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Benefits */}
        <section className="py-20 px-4 bg-red-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6 text-red-600 font-bold">Partner Benefits</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Partners receive:
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {partnerBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Become an IFDA Partner */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl mb-6 text-red-600 font-bold">Become an IFDA Partner</h2>
              <p className="text-lg text-gray-700 mb-8">
                If your organisation supports furniture design excellence, export readiness, and industry growth, we would love to collaborate.
              </p>

              <div className="bg-red-50 rounded-lg p-8 border border-red-200 mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Mail className="h-6 w-6 text-red-600" />
                  <span className="text-lg font-semibold text-gray-900">Write to us at:</span>
                </div>
                <p className="text-red-600 font-medium text-lg mb-2">team@ifdawards.com</p>
                <p className="text-gray-700">Subject: IFDA Partnership Inquiry</p>
              </div>

              <Button onClick={() => window.location.href = 'mailto:team@ifdawards.com'} className="bg-red-600 text-white hover:bg-red-700 px-8 py-3 text-lg">
                <Mail className="mr-2 h-5 w-5" />
                Contact Us for Partnership
              </Button>
            </div>
          </div>
        </section>

        {/* Media & Press Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6 text-red-600 font-bold">IFDA Media & Press</h2>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                IFDA (Indian Furniture Design Awards) is India's platform to recognise export-ready furniture and lifestyle design excellence—built on global benchmarks of design quality, manufacturability, durability, sustainability, and market relevance.
              </p>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
                We collaborate with leading media publications, trade platforms, and digital communities to showcase outstanding work from India's furniture ecosystem and amplify stories that deserve global attention.
              </p>
            </div>
          </div>
        </section>

        {/* Media Partners */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6 text-red-600 font-bold">Media Partners</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
                Our media partners help strengthen IFDA's reach across:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <Newspaper className="h-8 w-8 text-gray-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Coverage Areas</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-medium">•</span>
                    <span>Furniture manufacturing and exports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-medium">•</span>
                    <span>Design and innovation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-medium">•</span>
                    <span>Architecture and interiors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-medium">•</span>
                    <span>Home, lifestyle, and decor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-medium">•</span>
                    <span>Global sourcing and buyer ecosystems</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <Globe className="h-8 w-8 text-gray-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Coming Soon</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Official Media Partner logos will appear here as partnerships are established.
                </p>
                <div className="bg-white rounded-lg p-4 border-2 border-dashed border-gray-300">
                  <p className="text-gray-500 text-center">Media Partner logos will appear here</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why IFDA Matters to Media */}
        <section className="py-20 px-4 bg-red-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6 text-red-600 font-bold">Why IFDA Matters to Media</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
                IFDA is more than an awards platform—it is a growing movement to position India as a hub for globally relevant, production-ready design.
              </p>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Media collaboration with IFDA enables:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Newspaper className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Curated Stories</h3>
                <p className="text-gray-700">Access to high-quality, curated design stories</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Export Innovation</h3>
                <p className="text-gray-700">Coverage of export-ready innovation from India</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Emerging Trends</h3>
                <p className="text-gray-700">Visibility into emerging design trends, materials, and product thinking</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 md:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Industry Credibility</h3>
                <p className="text-gray-700">Strong industry credibility through an independent jury-led evaluation process</p>
              </div>
            </div>
          </div>
        </section>

        {/* What Media Partners Receive */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6 text-red-600 font-bold">What Media Partners Receive</h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mediaPartnerBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Press Enquiries */}
        <section className="py-20 px-4 bg-red-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6 text-red-600 font-bold">Press Enquiries</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                For media partnerships, interviews, or press requests, please reach out:
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg p-8 border border-gray-200 text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Mail className="h-6 w-6 text-red-600" />
                    <span className="text-lg font-semibold text-gray-900">Email:</span>
                  </div>
                  <p className="text-red-600 font-medium">team@ifdawards.com</p>
                </div>

                <div className="bg-white rounded-lg p-8 border border-gray-200 text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Phone className="h-6 w-6 text-red-600" />
                    <span className="text-lg font-semibold text-gray-900">Phone:</span>
                  </div>
                  <p className="text-red-600 font-medium">+91 8003349703</p>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-gray-700 mb-4">Subject: IFDA Media Partnership / Press Enquiry</p>
                <Button onClick={() => window.location.href = 'mailto:team@ifdawards.com'} className="bg-red-600 text-white hover:bg-red-700 px-8 py-3 text-lg">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Press Team
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Download Media Kit */}
        {/* <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl mb-6 text-red-600 font-bold">Download Media Kit</h2>
              <p className="text-lg text-gray-700 mb-8">
                Download the IFDA Media Kit for official logos, brand guidelines, and press-ready information.
              </p>

              <Button className="bg-red-600 text-white hover:bg-red-700 px-8 py-3 text-lg">
                <Download className="mr-2 h-5 w-5" />
                Download Media Kit
              </Button>
            </div>
          </div>
        </section> */}
      </main>

      <Footer />
    </div>
  );
}