import { IFDA } from "../components/shared/BrandIFDA";
import { Button } from "@/app/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion";
import { HelpCircle, MessageCircle, Award, FileText, Users, Package } from "lucide-react";
import { Footer } from "@/app/components/shared/Footer";

export function FAQ() {
  const faqs = [
    {
      question: "What is the submission fee?",
      answer: "Each submission costs INR 5,000 per entry. If you submit multiple entries, the fee applies to each entry separately.",
      icon: FileText
    },
    {
      question: "Can I submit more than one entry?",
      answer: "Yes. You may submit multiple entries across different categories.",
      icon: Package
    },
    {
      question: "Can I submit a full collection instead of a single product?",
      answer: `No. IFDA only accepts individual products, not complete collections.`,
      icon: Package
    },
    {
      question: "Do I need to be an exporter to participate?",
      answer: "No. You don't need to be an exporter today — but your design should be export-ready in intent and execution.",
      icon: Users
    },
    {
      question: "Are concept designs allowed?",
      answer: `<IFDA /> is focused on production-ready and manufacturable designs. If your concept has strong engineering and real-world feasibility, it may still be considered under the appropriate category.`,
      icon: HelpCircle
    },
    {
      question: "What if I choose the wrong category?",
      answer: `Don't worry — <IFDA /> may reassign the category if needed to ensure fair evaluation.`,
      icon: HelpCircle
    },
    {
      question: `What does 'export-ready' mean in <IFDA /> terms?`,
      answer: "Export-ready designs are those that are: Durable and consistent in performance, Suitable for scalable manufacturing, Ready for packaging and logistics, Aligned with global buyer expectations.",
      icon: Award
    },
    {
      question: "What images should I upload?",
      answer: "Upload clear, high-quality images showing: Overall product form, Key angles, Close-ups of detailing and finish, Optional lifestyle setting.",
      icon: FileText
    },
    {
      question: "Will my design be shared publicly?",
      answer: `<IFDA /> may showcase shortlisted and winning designs through its official platforms with due credits. If any entry requires confidentiality, participants may mention it during submission.`,
      icon: MessageCircle
    },
    {
      question: "How are winners selected?",
      answer: "Entries are evaluated through a structured scoring framework by an independent jury panel, based on design excellence, functionality, innovation, export readiness, sustainability, and market relevance.",
      icon: Award
    },
    {
      question: "What do winners receive?",
      answer: `Winners receive: <IFDA /> Winner recognition and trophy, Winner badge for catalogs, packaging, and marketing, Showcase across <IFDA /> platforms and industry visibility.`,
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen">
      <main className="pt-32">
        {/* Hero Section */}
        {/* <section className="py-20 px-4 bg-gradient-to-br from-red-50 to-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl mb-6 text-red-600 font-bold">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Find answers to common questions about <IFDA /> participation, submission process, and evaluation criteria.
            </p>
          </div>
        </section> */}

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <HelpCircle className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-4xl md:text-5xl text-red-600">FAQ</h2>
              </div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Everything you need to know about participating in <IFDA /> and submitting your furniture designs.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left hover:text-red-600 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <faq.icon className="h-4 w-4 text-red-600" />
                      </div>
                      <span className="font-extrabold text-gray-900">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed pb-6 pl-11">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-20 px-4 bg-red-50">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Still Have Questions?</h3>
              </div>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Can't find the answer you're looking for? Our team is here to help you with any questions about <IFDA /> participation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={() => { window.location.href = 'mailto:contact@ifda.co'; }}
                >
                  Contact Us
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50"
                  onClick={() => { window.location.href = '/eligibility'; }}
                >
                  Check Eligibility
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
              <p className="text-lg text-gray-700">Explore more about <IFDA /> and begin your submission journey.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-red-50 rounded-lg border border-red-100">
                <Users className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Eligibility</h4>
                <p className="text-gray-700 text-sm mb-4">Check if your designs qualify for <IFDA /></p>
                <a href="/eligibility">
                  <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-50">
                    Learn More
                  </Button>
                </a>
              </div>

              <div className="text-center p-6 bg-red-50 rounded-lg border border-red-100">
                <FileText className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Submit Entry</h4>
                <p className="text-gray-700 text-sm mb-4">Start your submission process</p>
                <a href="/submit-entry">
                  <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-50">
                    Submit Now
                  </Button>
                </a>
              </div>

              <div className="text-center p-6 bg-red-50 rounded-lg border border-red-100">
                <Award className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Core Team</h4>
                <p className="text-gray-700 text-sm mb-4">Meet the <IFDA /> leadership team</p>
                <a href="/core-team">
                  <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-50">
                    Meet Team
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}