import { Hero } from "@/app/components/home/Hero";
import { About } from "@/app/components/home/About";
import { WhyIFDA } from "@/app/components/home/WhyIFDA";
import { Differentiators } from "@/app/components/home/Differentiators";
import { Categories } from "@/app/components/home/Categories";
import { WhoCanApply } from "@/app/components/home/WhoCanApply";
import { Process } from "@/app/components/home/Process";
import { EvaluationCriteria } from "@/app/components/home/EvaluationCriteria";
import { WinnerBenefits } from "@/app/components/home/WinnerBenefits";
import { CallToAction } from "@/app/components/home/CallToAction";
import { LinkedInFeed } from "@/app/components/home/LinkedInFeed";
import { Footer } from "@/app/components/shared/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <WhyIFDA />
      <Differentiators />
      <Categories />
      <WhoCanApply />
      <Process />
      <EvaluationCriteria />
      <WinnerBenefits />
      <CallToAction />
      {/* <LinkedInFeed /> */}
      <Footer />
      <a
        href="https://wa.me/918003349703"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1da851] shadow-[0_10px_25px_rgba(0,0,0,0.2)] transition-all duration-200 hover:scale-105 flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden="true">
          <path d="M20.52 3.48A11.85 11.85 0 0 0 12.06 0C5.43 0 .03 5.4.03 12.03c0 2.12.55 4.2 1.6 6.04L0 24l6.09-1.6a12 12 0 0 0 5.94 1.53h.01c6.63 0 12.03-5.4 12.03-12.03 0-3.21-1.25-6.22-3.55-8.42zM12.04 21.9h-.01a9.91 9.91 0 0 1-5.05-1.39l-.36-.21-3.61.95.96-3.52-.24-.36a9.9 9.9 0 0 1-1.52-5.32C2.21 6.58 6.57 2.22 12.03 2.22a9.8 9.8 0 0 1 6.96 2.89 9.75 9.75 0 0 1 2.88 6.94c0 5.46-4.36 9.85-9.83 9.85zm5.4-7.37c-.3-.15-1.78-.88-2.05-.98-.27-.1-.46-.15-.66.15-.2.3-.76.98-.93 1.18-.17.2-.34.22-.64.07-.3-.15-1.24-.46-2.37-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.12.3-.32.45-.48.15-.17.2-.3.3-.49.1-.2.05-.37-.03-.52-.08-.15-.66-1.6-.9-2.18-.24-.58-.48-.5-.66-.5h-.56c-.2 0-.52.08-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.06 2.89 1.2 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.5 1.69.64.71.23 1.35.2 1.86.12.57-.08 1.78-.73 2.03-1.44.25-.71.25-1.32.17-1.45-.08-.14-.27-.21-.57-.36z" />
        </svg>
      </a>
    </div>
  );
}