import { Building2, Palette, Users, Package } from "lucide-react";
import { BrandName } from "@/app/components/shared/BrandName";

export function WhoCanApply() {
  const participants = [
    {
      icon: Building2,
      title: "Furniture and home decor Manufacturers & Exporters",
      description: "Companies producing furniture for domestic and international markets",
    },
    {
      icon: Package,
      title: "Brands & Product Teams",
      description: "Established brands with innovative product lines",
    },
    {
      icon: Palette,
      title: "Designers & Design Studios",
      description: "Independent designers and creative studios",
    },
    {
      icon: Users,
      title: "OEM/ODM Suppliers",
      description: "Original equipment and design manufacturers",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-6 text-red-600">Who Can Participate</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            <BrandName /> welcomes entries from:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {participants.map((participant) => (
            <div
              key={participant.title}
              className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-red-600 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-lg mb-4">
                <participant.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg mb-2 text-gray-900">{participant.title}</h3>
              <p className="text-gray-600 text-sm">{participant.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center bg-red-50 p-8 rounded-lg max-w-3xl mx-auto">
          <p className="text-xl text-gray-800">
            If your product is designed with global markets in mind—<BrandName /> is your platform.
          </p>
        </div>
      </div>
    </section>
  );
}
