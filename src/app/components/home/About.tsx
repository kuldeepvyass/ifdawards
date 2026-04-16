import { IFDA } from "../shared/BrandIFDA";
import { Globe, Package, Award } from "lucide-react";

export function About() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-6 text-red-600">Designs Ready for the World</h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6">
            <IFDA /> is created to strengthen India's presence in global furniture markets by recognising work that 
            meets international expectations across design quality, user experience, durability, and scalable production.
          </p>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Whether it is a new product, a complete collection, or a category defining innovation, <IFDA /> is where 
            India's most export ready furniture designs earn the recognition they deserve.
          </p>
        </div>

        {/* Visual highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 bg-red-50 rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full mb-4">
              <Globe className="h-8 w-8" />
            </div>
            <h3 className="text-xl mb-2 text-red-600">Global Standards</h3>
            <p className="text-gray-600">Designs evaluated against international market expectations</p>
          </div>
          <div className="text-center p-6 bg-red-50 rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full mb-4">
              <Package className="h-8 w-8" />
            </div>
            <h3 className="text-xl mb-2 text-red-600">Production Ready</h3>
            <p className="text-gray-600">Focus on manufacturability and scalable production</p>
          </div>
          <div className="text-center p-6 bg-red-50 rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full mb-4">
              <Award className="h-8 w-8" />
            </div>
            <h3 className="text-xl mb-2 text-red-600">Export Excellence</h3>
            <p className="text-gray-600">Recognition for designs built for global markets</p>
          </div>
        </div>
      </div>
    </section>
  );
}
