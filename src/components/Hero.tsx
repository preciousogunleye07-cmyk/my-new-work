import React from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import { FadingVideo } from './FadingVideo';

interface HeroProps {
  onScrollToElement: (elementId: string) => void;
  onOpenToast: (text: string, type: 'success' | 'info') => void;
}

export function Hero({ onScrollToElement }: HeroProps) {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#0C0C0C] text-[#FAF6F0]">
      {/* Immersive Videoplayback absolute backdrop with subtle light overlay */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#0C0C0C]">
        <FadingVideo
          src="https://videotourl.com/videos/1782211447772-2ecdfb68-ce04-4d80-88bb-fa8a55d3df60.mp4"
          className="w-full h-full object-cover pointer-events-none opacity-[0.08] mix-blend-screen"
        />
        {/* Subtle light vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-[#0C0C0C]/30 pointer-events-none" />
      </div>

      {/* Relative content container */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full h-full flex flex-col justify-center z-10 pt-20">
        <div className="max-w-3xl space-y-6 md:space-y-8">
          
          {/* Heading */}
          <motion.h1
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="font-sans font-black tracking-tight text-white text-4xl sm:text-5xl md:text-6xl lg:text-[71px] leading-[1.1] lg:leading-[81.2px]"
          >
            CREATIVE <br />
            <span className="italic font-light text-stone-400 opacity-95">CATALYST.</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="text-xs sm:text-sm md:text-base text-stone-300 max-w-xl font-light leading-relaxed font-sans"
          >
            Formulating cohesive brand architectures, high-impact social layouts, tactile editorial print systems, and digital product designs crafted with absolute alignment.
          </motion.p>

          {/* Call-to-action cluster */}
          <motion.div
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto"
          >
            <button
              onClick={() => onScrollToElement('work')}
              className="group flex items-center justify-center gap-3 bg-white text-stone-950 hover:bg-white/90 font-bold tracking-[0.2em] text-[10px] uppercase px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-sm w-full sm:w-auto cursor-pointer"
            >
              Explore Portfolio
              <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
            </button>
            
            <button
              onClick={() => onScrollToElement('contact')}
              className="flex items-center justify-center gap-3 border border-white/20 hover:border-white bg-white/5 hover:bg-white/10 text-white font-semibold tracking-[0.2em] text-[10px] uppercase px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 w-full sm:w-auto cursor-pointer"
            >
              Discuss Next Project
            </button>
          </motion.div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div 
        onClick={() => onScrollToElement('work')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-60 cursor-pointer hover:opacity-100 transition-opacity text-white"
      >
        <span className="text-[8px] uppercase tracking-[0.25em] font-bold mb-1">Scroll Down</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </section>
  );
}
export default Hero;
