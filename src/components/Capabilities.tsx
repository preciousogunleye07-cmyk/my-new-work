import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Layers, Cpu, Compass } from 'lucide-react';

export function Capabilities() {
  const list = [
    {
      icon: Sparkles,
      title: 'Brand Identity',
      desc: 'Formulating unforgettable visual frameworks, bespoke wordmarks, and modular assets across physical and digital spaces.',
      tags: ['Corporate Systems', 'Packaging', 'Styleguides']
    },
    {
      icon: Layers,
      title: 'Editorial & Print',
      desc: 'Crafting high-culture lookbooks, annual reviews, and posters featuring strict grid layouts and tactile typographic contrasts.',
      tags: ['Book Design', 'Posters', 'Typography']
    },
    {
      icon: Cpu,
      title: 'UI/UX Architecture',
      desc: 'Engineering high-contrast web and mobile layouts with clean information flows, real-time charts, and minimal styling.',
      tags: ['Web3 Dashboards', 'Design Systems', 'Prototypes']
    }
  ];

  return (
    <section id="capabilities" className="min-h-screen flex flex-col justify-center py-24 md:py-32 bg-[#050505] text-[#FAF6F0] relative overflow-hidden">
      {/* Decorative background lights */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-white/2 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-white/1 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full space-y-16 relative z-10">
        <div className="max-w-2xl space-y-4">
          <motion.div
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-[9px] uppercase tracking-[0.22em] font-bold"
          >
            <Compass className="w-3.5 h-3.5" />
            Core Offerings
          </motion.div>
          
          <motion.h2
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-4xl sm:text-6xl font-serif font-light tracking-tight text-white leading-tight"
          >
            Capabilities designed <br />
            <span className="italic font-light opacity-90">to capture retention.</span>
          </motion.h2>

          <motion.p
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-white/60 text-sm sm:text-base font-light max-w-xl leading-relaxed"
          >
            I merge clean Swiss typography rules with the premium "Liquid Glass" styling aesthetics to formulate high-impact digital products and tactile print assets.
          </motion.p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
                whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.15 }}
                className="liquid-glass group p-8 rounded-3xl flex flex-col justify-between space-y-12 border border-white/5 hover:border-white/20 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,255,255,0.02)] min-h-[320px]"
              >
                <div className="space-y-6">
                  {/* Icon with subtle pulse animation on hover */}
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/30">
                    <Icon className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-serif font-medium text-white tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[9px] uppercase tracking-wider bg-white/5 text-white/70 px-2.5 py-1 rounded-full border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
