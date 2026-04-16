import { Trophy, Award, Eye, Globe, Star, BadgeCheck } from "lucide-react";
import { IFDA } from "../shared/BrandIFDA";
export function WinnerBenefits() {
  const benefits = [
    {
      icon: Trophy,
      title: "IFDA Winner Recognition & Trophy",
      description: "Official winner trophy and certificate",
    },
    {
      icon: BadgeCheck,
      title: "Winner Badge for Marketing",
      description: "Use on catalogs, website, and packaging",
    },
    {
      icon: Star,
      title: "Featured Showcase on IFDA Platforms",
      description: "Prominent display across IFDA digital properties",
    },
    {
      icon: Globe,
      title: "Global Visibility",
      description: "Exposure to international sourcing and design ecosystems",
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Recognition through IFDA events and outreach programs",
    },
    {
      icon: Eye,
      title: "Export Credibility",
      description: "A trusted signal for global buyers and partners",
    },
  ];

  return (
    <section id="benefits" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-6 text-red-600">What Winners Receive</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Winning at <IFDA /> represents more than a trophy—it is a signal of export credibility.
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Winners receive:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-red-50 p-6 rounded-lg border-2 border-red-100 hover:border-red-600 hover:shadow-lg transition-all"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-lg mb-4">
                <benefit.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg mb-2 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
