import { Footer } from "@/app/components/shared/Footer";
import { ArrowLeft, Zap, Calendar, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-red-50 via-white to-red-50">
          <div className="max-w-4xl mx-auto text-center">
            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full mb-6">
              <Zap className="h-4 w-4" />
              <span className="font-semibold">Coming Soon</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900">
              Submission Portal
              <span className="block text-red-600">Launching Soon</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              We're finalizing our submission platform to bring you the best experience for showcasing your export-ready furniture designs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <div className="flex items-center justify-center gap-3 bg-white rounded-lg p-6 border border-red-200 shadow-sm">
                <Calendar className="h-6 w-6 text-red-600" />
                <div className="text-left">
                  <p className="text-sm text-gray-600">Submission Opens</p>
                  <p className="text-lg font-bold text-gray-900">April 2026</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 bg-white rounded-lg p-6 border border-red-200 shadow-sm">
                <Mail className="h-6 w-6 text-red-600" />
                <div className="text-left">
                  <p className="text-sm text-gray-600">Questions?</p>
                  <p className="text-lg font-bold text-red-600">team@ifdawards.com</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              What to Expect
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-red-600">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Easy Submission</h3>
                <p className="text-gray-600">
                  A streamlined process to submit your product details, images, and documentation
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-red-600">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Real-Time Updates</h3>
                <p className="text-gray-600">
                  Track your submission status and receive updates on the evaluation process
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-red-600">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Secure & Safe</h3>
                <p className="text-gray-600">
                  Your product information is protected with industry-standard security measures
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Submission Window Opens in April 2026
              </h2>

              <div className="space-y-4 text-gray-700 mb-8">
                <p>
                  We're working hard to build a world-class submission platform that meets the needs of India's finest furniture designers and manufacturers.
                </p>

                <p>
                  The submission portal will open in <strong>April 2026</strong>, allowing participants to:
                </p>

                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-1">✓</span>
                    <span>Submit product details and documentation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-1">✓</span>
                    <span>Upload high-quality product images</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-1">✓</span>
                    <span>Complete payment (INR 5,000 per entry)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-1">✓</span>
                    <span>Receive confirmation and submission ID</span>
                  </li>
                </ul>

                <p className="pt-4">
                  <strong>Submission Deadline:</strong> June 30, 2026
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">Want to be Notified?</h3>
                <p className="text-gray-700 mb-4">
                  Send us an email at <a href="mailto:team@ifdawards.com" className="text-red-600 hover:text-red-700 font-semibold">team@ifdawards.com</a> with "Submission Notification" as the subject, and we'll send you updates when the portal launches.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-red-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay Tuned!</h2>
            <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
              We're excited to launch the submission platform and see exceptional furniture designs from across India.
            </p>
          </div>
        </section>
      </main>

      {/* Go Back to Home Button */}
      <section className="py-12 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <Link to="/">
            <button className="flex items-center gap-2 bg-red-600 text-white hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors">
              <ArrowLeft className="h-5 w-5" />
              Go Back to Home Page
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}