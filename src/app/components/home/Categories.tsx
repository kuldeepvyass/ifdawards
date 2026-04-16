import { Sofa, Home, Lamp, Sparkles, ArrowRight, Trees, Briefcase } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Link } from "react-router-dom";
import { BrandName } from "@/app/components/shared/BrandName";

export function Categories() {
  const categories = [
    {
      icon: Sofa,
      title: "Furniture",
      description: "Residential, hospitality, and workspace furniture solutions",
      href: "/categories#furniture",
    },
    {
      icon: Home,
      title: "Home Decoratives & Accessories",
      description: "Décor objects, accents, and lifestyle accessories",
      href: "/categories#home-decor",
    },
    {
      icon: Lamp,
      title: "Lamps & Lighting",
      description: "Ambient, task, and statement lighting designs",
      href: "/categories#lamps",
    },
    {
      icon: Sparkles,
      title: "Home Textiles",
      description: "Soft furnishings, rugs, and textile innovations",
      href: "/categories#home-textiles",
    },
  ];

  return (
    <section id="categories" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6 text-red-600">Award Categories</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-2">
            <BrandName /> covers the complete furniture and lifestyle ecosystem across:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-10">
          {categories.map((category) => (
            <Link key={category.title} to={category.href}>
              <div
                className="bg-gray-50 border-2 border-gray-200 p-6 rounded-lg hover:border-red-600 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform">
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl mb-2 text-gray-900">{category.title}</h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/categories">
            <Button size="lg" className="bg-red-600 text-white hover:bg-red-700">
              Explore All Categories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
