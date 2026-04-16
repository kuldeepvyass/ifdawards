import { Button } from "@/app/components/ui/button";
import { ArrowRight, FileText, Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import { BrandName } from "@/app/components/shared/BrandName";

export function CallToAction() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl mb-6">Submit Your Export-Ready Design</h2>
        <p className="text-lg text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
          Join a platform built to celebrate the best of Indian furniture design—ready for global markets 
          and judged by global experts.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/submit-entry">
            <Button size="lg" className="bg-white text-red-600 hover:bg-white/90">
              Submit an Entry
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/categories">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white/10"
            >
              <FileText className="mr-2 h-5 w-5" />
              View Categories
            </Button>
          </Link>
          <Link to="/partners">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white/10"
            >
              <Handshake className="mr-2 h-5 w-5" />
              Partner with <BrandName tone="onRed" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
