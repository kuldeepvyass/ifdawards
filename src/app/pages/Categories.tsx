import { IFDA } from "../components/shared/BrandIFDA";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "@/app/components/shared/Footer";
import { Sofa, Lightbulb, Home, Sparkles } from "lucide-react";

export function Categories() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const offset = 100; // account for fixed header
        const top = rect.top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }, [location]);

  const categories = [
    {
      name: "Furniture (Domestic & Commercial)",
      icon: Sofa,
      color: "from-red-500 to-red-600",
      subcategories: [
        {
          title: "Indoor",
          items: [
            {
              type: "Living Room",
              products: [
                "Lounge chairs",
                "Center tables",
                "Accent tables",
                "Consoles",
                "TV consoles",
                "Working desks"
              ]
            },
            {
              type: "Dining",
              products: [
                "Dining tables",
                "Chairs",
                "Benches"
              ]
            },
            {
              type: "Bedroom",
              products: [
                "Beds",
                "Bedside tables",
                "Tall chests",
                "Sideboards",
                "Drawer units"
              ]
            },
            {
              type: "Kitchen & Bathroom",
              products: [
                "Chairs",
                "Storage units",
                "Washbasin cabinets"
              ]
            }
          ]
        },
        {
          title: "Commercial",
          items: [
            {
              type: "Restaurant & Hospitality",
              products: [
                "Dining furniture",
                "Seating",
                "Bar counters",
                "Bar trolleys",
                "Wine racks"
              ]
            }
          ]
        }
      ]
    },
    {
      name: "Home Decoratives & Accessories",
      icon: Sparkles,
      color: "from-blue-500 to-blue-600",
      products: [
        "Mirrors",
        "Wall Decors",
        "Table Tops",
        "Candle Holders",
        "Kitchenware",
        "Separators"
      ]
    },
    {
      name: "Lamps & Lighting",
      icon: Lightbulb,
      color: "from-yellow-500 to-yellow-600",
      products: [
        "Floor Lamps",
        "Ceiling Lamps",
        "Table Lamps",
        "Outdoor Lamps"
      ]
    },
    {
      name: "Home Textiles",
      icon: Home,
      color: "from-purple-500 to-purple-600",
      subcategories: [
        {
          title: "By Room",
          items: [
            {
              type: "Living Room",
              products: [
                "Rugs",
                "Cushion covers",
                "Bolsters",
                "Window curtains",
                "Door curtains"
              ]
            },
            {
              type: "Dining",
              products: [
                "Table linens",
                "Runners",
                "Table mats",
                "Napkins",
                "pot holders",
                "trivet"
              ]
            },
            {
              type: "Bedroom",
              products: [
                "Bed linens",
                "Spreads",
                "Pillow covers",
                "pillow fillers",
                "Comforters",
                "Cushions",
                "Mattresses"
              ]
            },
            {
              type: "Kitchen and Bathroom",
              products: [
                "Aprons",
                "Wiping towels",
                "Napkin holder",
                "Pot holder",
                "Mittens",
                "Towels",
                "Bath curtains",
                "Kitchen curtains"
              ]
            },
            {
              type: "Decorative Textile",
              products: [
                "wall decor",
                "Soft toys"
              ]
            }
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <main className="pt-32">
        {/* Hero Section */}
        {/* <section className="py-20 px-4 bg-gradient-to-br from-red-50 to-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl mb-6 text-red-600 font-bold">Award Categories</h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Explore all the furniture and home design categories recognized by <IFDA />. 
              Find where your product fits and submit your entry across domestic, commercial, 
              decorative, and textile categories.
            </p>
          </div>
        </section> */}

        {/* Main Categories Grid */}
        {/* <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                const isLarge = category.name === "Furniture (Domestic & Commercial)";

                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${category.color} rounded-xl p-8 text-white ${isLarge ? 'md:col-span-2' : ''}`}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <h2 className="text-3xl font-bold">{category.name}</h2>
                    </div>

                    {category.subcategories ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {category.subcategories.map((subcat, subcatIndex) => (
                          <div key={subcatIndex}>
                            <h3 className="text-xl font-semibold mb-4 text-white/90">{subcat.title}</h3>
                            <div className="space-y-4">
                              {subcat.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                                  <h4 className="font-semibold text-white mb-2">{item.type}</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {item.products.map((product, prodIndex) => (
                                      <span
                                        key={prodIndex}
                                        className="bg-white/20 text-white text-sm px-3 py-1 rounded-full"
                                      >
                                        {product}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {category.products?.map((product, prodIndex) => (
                          <div
                            key={prodIndex}
                            className="bg-white/20 rounded-lg p-3 text-center font-medium hover:bg-white/30 transition-colors cursor-pointer"
                          >
                            {product}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section> */}

        {/* Category Details Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6 text-red-600 font-bold">Detailed Category Breakdown</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Below is a comprehensive breakdown of all categories and subcategories.
              </p>
            </div>

            <div className="space-y-8">
              {/* Furniture Category - Detailed */}
              <div id="furniture" className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6">
                  <h3 className="text-2xl font-bold">Furniture</h3>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Indoor Section */}
                    <div>
                      <h4 className="text-xl font-bold text-red-600 mb-6">Indoor Furniture</h4>
                      <div className="space-y-6">
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3">Living Room</h5>
                          <div className="flex flex-wrap gap-2">
                            {[
  
                              "Lounge chairs",
                              "Center tables",
                              "Accent tables",
                              "Consoles",
                              "TV consoles",
                    
                              "Working desks",
                        
                            ].map((item, idx) => (
                              <span
                                key={idx}
                                className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3">Dining</h5>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "Dining tables",
                              "Chairs",
                              "Benches",
                            
                            ].map((item, idx) => (
                              <span
                                key={idx}
                                className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3">Bedroom</h5>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "Beds",
                              "Bedside tables",
                              "Tall chests",
                              "Sideboards",
                              "Drawer units",
                            ].map((item, idx) => (
                              <span
                                key={idx}
                                className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3">Kitchen & Bathroom</h5>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "Chairs",
                       
                              "Storage units",
                             
                              "Washbasin cabinets",
                            ].map((item, idx) => (
                              <span
                                key={idx}
                                className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Commercial Section */}
                    <div>
                      <h4 className="text-xl font-bold text-red-600 mb-6">Commercial Furniture</h4>
                      <div className="space-y-6">
                       
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3">Restaurant & Hospitality</h5>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "Dining furniture",
                              "Seating",
                              "Bar counters",
                              "Bar trolleys",
                              "Wine racks",
                            ].map((item, idx) => (
                              <span
                                key={idx}
                                className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Home Decoratives */}
              <div id="home-decor" className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6">
                  <h3 className="text-2xl font-bold">Home Decoratives & Accessories</h3>
                </div>
                <div className="p-8">
              
                  <div className="flex flex-wrap gap-2">
                    {["Mirrors", "Wall Decors", "Table Tops", "Candle Holders", "Kitchenware", "Separators"].map((item, idx) => (
                      <span key={idx} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lamps & Lighting */}
              <div id="lamps" className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6">
                  <h3 className="text-2xl font-bold">Lamps & Lighting</h3>
                </div>
                <div className="p-8">
                  
                  <div className="flex flex-wrap gap-2">
                    {["Floor Lamps", "Ceiling Lamps", "Table Lamps", "Outdoor Lamps"].map((item, idx) => (
                      <span key={idx} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Home Textiles */}
              <div id="home-textiles" className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6">
                  <h3 className="text-2xl font-bold">Home Textiles</h3>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Living Room</h5>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Rugs",
                          "Cushion covers",
                          "Bolsters",
                          "Window curtains",
                          "Door curtains",
                        ].map((item, idx) => (
                          <span
                            key={idx}
                            className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Dining</h5>
                      <div className="flex flex-wrap gap-2">
                        {[
                       
                          "Table linens",
                          "Runners",
                          "Table mats",
                          "Napkins", 
                          "pot holders",
                          "trivet"
                        ].map((item, idx) => (
                          <span
                            key={idx}
                            className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Bedroom</h5>
                      <div className="flex flex-wrap gap-2">
                        {[
                           "Bed linens",
                          "Spreads",
                          "Pillow covers",
                          "pillow fillers",
                          "Comforters",
                          "Cushions",
                          "Mattresses",
                        ].map((item, idx) => (
                          <span
                            key={idx}
                            className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Kitchen and Bathroom</h5>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Aprons",
                          "Wiping towels",
                          "Napkin holder",
                          "Pot holder",
                          "Mittens",
                          "Towels",
                          "Bath curtains",
                          "Kitchen curtains"
                        ].map((item, idx) => (
                          <span
                            key={idx}
                            className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Decorative Textile</h5>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "wall decor",
                          "Soft toys",
                        ].map((item, idx) => (
                          <span
                            key={idx}
                            className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-red-600 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl mb-6 font-bold">Found Your Category?</h2>
            <p className="text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
              Submit your export-ready design and showcase your work to global buyers, retailers, and industry experts.
            </p>
            <a href="/submit-entry">
              <button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
                Submit Your Entry Now
              </button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}