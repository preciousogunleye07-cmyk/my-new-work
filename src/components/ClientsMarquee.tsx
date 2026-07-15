import React from 'react';
import { clientPartners } from '../data';
import { Quote } from 'lucide-react';

export default function ClientsMarquee() {
  const testimonials = [
    {
      quote: "Studio has absolute, uncompromising artistic precision. Every presentation deck, variable graphic, and spatial display they structured for our contemporary galas brought incredible client retention.",
      author: "Julien de Verdi",
      title: "Art Director, Verdi Contemporary Agency"
    },
    {
      quote: "They mapped our complex machine learning schemas into an elite, fluid data ecosystem. Their aesthetic mastery of negative space and crisp typography is genuinely unprecedented.",
      author: "Dr. Eliana Vance",
      title: "VP of Product, Synapse Corp"
    }
  ];

  return (
    <section id="clients" className="py-24 bg-[#F2EAE1] border-b border-[#2B1E17]/10 overflow-hidden">
      <div className="space-y-16">
        
        {/* Section label and summary */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#7C522C] inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#7C522C]" />
            Prestigious Collaborations
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-[#2B1E17]">
            Trusted by Leaders Across Frontiers
          </h2>
        </div>

        {/* CSS Marquee Track */}
        <div className="relative w-full border-y border-[#2B1E17]/10 py-6 bg-[#FAF6F0] overflow-hidden select-none">
          <div className="flex w-max gap-12 animate-[marquee_40s_linear_infinite]">
            {/* Duplicated client arrays to create infinite wrap loop */}
            {[...clientPartners, ...clientPartners, ...clientPartners].map((client, idx) => (
              <div key={idx} className="flex items-center gap-3 flex-shrink-0">
                <span className="text-[#2B1E17] font-serif text-[15px] font-semibold tracking-tight">
                  {client.name}
                </span>
                <span className="text-[#2B1E17]/30 text-xs font-sans">•</span>
                <span className="text-[#2B1E17]/40 font-mono text-[9px] uppercase tracking-wider">
                  {client.sector}
                </span>
                <span className="text-[#7C522C] text-xs font-semibold pl-8">/</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Review panel */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="bg-[#FAF6F0] border border-[#2B1E17]/10 p-8 md:p-10 space-y-6 flex flex-col justify-between hover:border-[#7C522C]/30 transition-colors duration-300 relative group"
              >
                <div className="absolute top-6 right-6 opacity-[0.03] text-[#2B1E17] group-hover:text-[#7C522C] group-hover:opacity-[0.05] transition-all">
                  <Quote className="w-24 h-24" />
                </div>
                
                <p className="font-serif italic text-base md:text-lg text-[#2B1E17]/85 leading-relaxed relative z-10">
                  "{t.quote}"
                </p>

                <div className="space-y-1 relative z-10 pt-4 border-t border-[#2B1E17]/5">
                  <h4 className="text-xs font-sans font-bold tracking-wider text-[#2B1E17]">
                    {t.author}
                  </h4>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-[#2B1E17]/40">
                    {t.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
export { ClientsMarquee };
