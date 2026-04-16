import { FolderOpen, Upload, Search, Users, Award } from "lucide-react";
import { BrandName, withBrandName } from "@/app/components/shared/BrandName";

export function Process() {
  const steps = [
    {
      icon: FolderOpen,
      number: "1",
      title: "Choose a Category",
      description: "Select the most relevant category for your product or collection.",
    },
    {
      icon: Upload,
      number: "2",
      title: "Submit Your Entry",
      description: "Share product details, images, materials, and export readiness information.",
    },
    {
      icon: Search,
      number: "3",
      title: "Screening & Review",
      description: "Entries are screened for completeness and category fit.",
    },
    {
      icon: Users,
      number: "4",
      title: "Global Jury Evaluation",
      description: "Independent jury evaluates submissions based on defined iFDA criteria.",
    },
    {
      icon: Award,
      number: "5",
      title: "Winners & Recognition",
      description: "Winners are announced and showcased through iFDA channels and events.",
    },
  ];

  return (
    <section id="process" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6 text-red-600">
            How <BrandName /> Works
          </h2>
        </div>

        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-red-200" style={{ width: '80%', margin: '0 auto' }}></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="relative inline-flex items-center justify-center w-20 h-20 bg-red-600 text-white rounded-full mb-4 z-10">
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-10 h-10 bg-white border-4 border-red-600 rounded-full flex items-center justify-center text-red-600 z-20">
                  {step.number}
                </div>
                <h3 className="text-lg mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-sm">{withBrandName(step.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
