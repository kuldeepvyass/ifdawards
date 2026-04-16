import { Button } from "@/app/components/ui/button";
import { ArrowRight, Award, Globe, Trophy, Star, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import videolink from "../../assets/videos/vecteezy_cozy-minimalist-bedroom-interior-with-wooden-furniture-and_52875003.mp4";
import videolink2 from "../../assets/videos/5823583-uhd_3840_2160_24fps.mp4";

export function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={heroRef} className="relative min-h-[100svh] flex items-center overflow-hidden pt-16 bg-black">
      {/* Animated background with parallax */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        {/* Main hero image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/95 via-black/80 to-red-950/95 z-10"></div>
          <video 
            src={videolink2}
            autoPlay 
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-110"
          />
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 z-20">
          {/* Spotlight effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-500/20 rounded-full blur-[150px]"></div>
          
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}></div>
        </div>
      </motion.div>

      {/* Content Container */}
      <div className="relative z-30 w-full px-4 lg:px-8 py-20 lg:py-24">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              {/* Award Badge */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600/20 to-red-500/10 backdrop-blur-xl border border-red-500/30 shadow-2xl shadow-red-500/20">
                  <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-red-300 uppercase tracking-wider">2026 Edition</div>
                    <div className="text-sm text-white">India's Premier Design Awards</div>
                  </div>
                </div>
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white tracking-tight leading-[1.1]">
                    <span className="block mb-3">India Furniture</span>
                    <span className="block relative inline-block">
                      <span className="relative z-10 bg-gradient-to-r from-red-400 via-red-300 to-orange-300 bg-clip-text text-transparent">
                        Design Awards
                      </span>
                      <span className="absolute -bottom-2 left-0 w-full h-4 bg-red-600/30 blur-xl"></span>
                    </span>
                  </h1>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-xl sm:text-2xl lg:text-3xl text-red-100/90 leading-relaxed max-w-2xl"
                >
                  Celebrating Export-Ready Furniture Design Excellence
                </motion.p>
              </div>

              {/* Value Props */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3 max-w-2xl"
              >
                {[
                  "Globally relevant & production-ready designs",
                  "Independent jury of international experts",
                  "Honoring innovation, sustainability & excellence"
                ].map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-400" />
                    </div>
                    <span className="text-white/80 text-base lg:text-lg">{text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Button 
                  size="lg"
                  className="group relative bg-white text-red-600 hover:bg-red-50 text-base lg:text-lg px-8 py-7 rounded-2xl shadow-2xl shadow-white/30 hover:shadow-white/40 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Submit Your Design
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="text-base lg:text-lg px-8 py-7 rounded-2xl border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/60 bg-white/5 backdrop-blur-xl hover:scale-[1.02] transition-all duration-300"
                >
                  Explore Categories
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10"
              >
                <div className="flex items-center gap-2 text-white/60">
                  <Globe className="w-4 h-4 text-red-400" />
                  <span className="text-sm">Global Recognition</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Star className="w-4 h-4 text-red-400 fill-red-400" />
                  <span className="text-sm">Expert Jury Panel</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Sparkles className="w-4 h-4 text-red-400" />
                  <span className="text-sm">Export Excellence</span>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Image Gallery Grid */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative h-[600px]">
                {/* Main Large Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-0 right-0 w-[280px] h-[360px] rounded-3xl overflow-hidden shadow-2xl shadow-red-900/50 border border-white/10"
                >
                  <img
                    src="https://images.unsplash.com/photo-1759238136818-7b00ec9e782a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZnVybml0dXJlJTIwZWRpdG9yaWFsfGVufDF8fHx8MTc2OTI0NzIwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Premium Furniture"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-950/60 via-transparent to-transparent"></div>
                </motion.div>

                {/* Medium Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-40 left-0 w-[240px] h-[280px] rounded-3xl overflow-hidden shadow-2xl shadow-red-900/40 border border-white/10"
                >
                  <img
                    src="https://images.unsplash.com/photo-1764836168197-3aa3a890a0f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaGFpciUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2OTI0NzIwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Modern Chair"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-950/60 via-transparent to-transparent"></div>
                </motion.div>

                {/* Small Accent Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 right-12 w-[200px] h-[220px] rounded-3xl overflow-hidden shadow-2xl shadow-red-900/40 border border-white/10"
                >
                  <img
                    src="https://images.unsplash.com/photo-1760716478137-d861d5b354e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZnVybml0dXJlJTIwc3R1ZGlvfGVufDF8fHx8MTc2OTI0NzIwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Minimalist Studio"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-950/60 via-transparent to-transparent"></div>
                </motion.div>

                {/* Floating Stats Card */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-20 left-8 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 z-10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl text-gray-900">500+</div>
                      <div className="text-xs text-gray-600 uppercase tracking-wider">Designs Submitted</div>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative floating element */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="absolute top-32 left-16 w-16 h-16 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-sm border border-red-400/30 flex items-center justify-center"
                >
                  <Sparkles className="w-7 h-7 text-red-400" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-xs text-white/40 uppercase tracking-widest">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
              >
                <motion.div 
                  className="w-1.5 h-1.5 bg-red-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ambient light effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/30 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px]"
        />
      </div>
    </section>
  );
}

