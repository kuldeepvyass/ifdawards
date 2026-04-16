import { Globe, Users, Shield, TrendingUp } from "lucide-react";

export function Differentiators() {
  const features = [
    {
      icon: Globe,
      title: "Export-Ready Focus",
      description: "iFDA is built specifically for designs that are ready for global retail and contract markets.",
    },
    {
      icon: Users,
      title: "Global Jury Panel",
      description: "Entries are evaluated by experienced professionals from international design and sourcing ecosystems.",
    },
    {
      icon: Shield,
      title: "Structured & Transparent Process",
      description: "A clear category framework, defined evaluation criteria, and jury-led selection ensure credibility and fairness.",
    },
    {
      icon: TrendingUp,
      title: "Industry Relevance",
      description: "iFDA bridges the gap between design excellence and commercial export success.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-red-600 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6">What Makes iFDA Different</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white text-red-600 rounded-lg mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl mb-3">{feature.title}</h3>
              <p className="text-white/90 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
