import React, { useState, useEffect } from 'react';
import { ArrowUp, Clock, Globe } from 'lucide-react';

export default function Footer() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0C0C0C] text-white py-16 md:py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Top layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start border-b border-white/10 pb-16">
          
          {/* Logo & Vision stamp */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-2xl font-sans font-black tracking-tight flex items-center gap-3 text-white">
              <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
              PRECIOUS OGUNLEYE.
            </h3>
            <p className="text-white/60 text-xs font-sans leading-relaxed max-w-sm font-light">
              Designing premium visual architectures, unified brand frameworks, and editorial assets with uncompromising attention to grid alignments and negative space.
            </p>
          </div>

          {/* Social columns */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-white/40">
              Social Channels
            </h4>
            <div className="flex flex-col gap-2 text-xs font-sans">
              <a href="#" onClick={(e) => e.preventDefault()} className="text-white/60 hover:text-white transition-all">
                Instagram / @precious.curated
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-white/60 hover:text-white transition-all">
                LinkedIn / in/precious-ogunleye
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-white/60 hover:text-white transition-all">
                Behance / precious-ogunleye
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-white/60 hover:text-white transition-all">
                Dribbble / precious-design
              </a>
            </div>
          </div>

          {/* live information widget */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-white/40">
              Operations Center
            </h4>
            <div className="space-y-3 font-mono text-[10px] text-white/60 leading-relaxed">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-white/30" />
                <span>
                  TIME: {formatTime(currentTime)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-white/30" />
                <span>
                  DATE: {formatDate(currentTime)} (GMT-7)
                </span>
              </div>
              <p className="text-white/40 italic pl-5">
                Always active globally.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom credits and buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-[10px] uppercase tracking-wider text-white/40 font-mono text-center sm:text-left">
            <span>© {currentTime.getFullYear()} PRECIOUS OGUNLEYE. ALL RIGHTS PROTECTED.</span>
            <span className="block mt-1 sm:inline sm:mt-0 sm:ml-4">CRAFTED WITH ARCHITECTURAL HONESTY</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2.5 border border-white/20 hover:border-white text-[10px] uppercase tracking-widest font-bold px-5 py-3 transition-colors bg-white/5 hover:bg-white hover:text-[#0C0C0C] rounded-full group text-white"
          >
            Scroll to Top
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
export { Footer };
