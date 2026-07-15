import React, { useState } from 'react';
import { motion } from 'motion/react';
import { portfolioProjects } from '../data';
import CaseStudyModal from './CaseStudyModal';
import { Project } from '../types';

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="py-24 md:py-32 bg-[#0C0C0C] border-b border-white/5 text-[#FAF6F0] relative overflow-hidden">
      {/* Decorative background light */}
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-white/2 blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 pt-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400 block mb-3"
          >
            Curated Projects
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-5xl font-sans font-black tracking-tight text-white"
          >
            PORTFOLIO.
          </motion.h2>
        </div>

        {/* Dynamic Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
          {portfolioProjects.map((project, idx) => {
            return (
              <motion.div
                key={project.id}
                initial={{ filter: 'blur(10px)', opacity: 0, y: 30 }}
                whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.15 }}
                onClick={() => setSelectedProject(project)}
                className={`portfolio-item group flex flex-col p-5 rounded-3xl border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/15 transition-all duration-300 cursor-pointer ${
                  project.id === 'great-man-artist' || project.id === 'black-rising'
                    ? 'hover:shadow-[0_0_30px_rgba(249,115,22,0.06)]'
                    : project.id === 'wood-ecommerce'
                    ? 'hover:shadow-[0_0_30px_rgba(16,185,129,0.06)]'
                    : project.id === 'bark-ecommerce'
                    ? 'hover:shadow-[0_0_30px_rgba(245,158,11,0.06)]'
                    : 'hover:shadow-[0_0_30px_rgba(236,72,153,0.05)]'
                }`}
                id={`portfolio-project-${project.id}`}
              >
                {/* Real high-quality media preview */}
                <div className="relative overflow-hidden aspect-[4/3] mb-6 border border-white/10 rounded-2xl flex-shrink-0 bg-[#121212]">
                  <div className="w-full h-full relative group/video">
                    {project.videoUrl ? (
                      <video
                        src={project.videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/video:scale-105"
                      />
                    ) : (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/video:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/10 group-hover/video:bg-black/0 transition-colors duration-300 pointer-events-none" />
                  </div>
                </div>

                {/* Descriptions block */}
                <div className="flex flex-col flex-grow px-1 text-left">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-2">
                    {project.category.replace('-', ' ')}
                  </span>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className={`text-lg font-sans font-semibold text-white transition-colors duration-300 ${
                      project.id === 'great-man-artist' || project.id === 'black-rising'
                        ? 'group-hover:text-orange-500'
                        : project.id === 'wood-ecommerce'
                        ? 'group-hover:text-emerald-500'
                        : project.id === 'bark-ecommerce'
                        ? 'group-hover:text-amber-500'
                        : 'group-hover:text-pink-500'
                    }`}>
                      {project.title}
                    </h3>
                    <div className={`text-[9px] uppercase tracking-wider bg-white/5 px-2.5 py-1 rounded-full text-stone-400 border border-transparent transition-all duration-300 ${
                      project.id === 'great-man-artist' || project.id === 'black-rising'
                        ? 'group-hover:bg-orange-500/10 group-hover:text-orange-500 group-hover:border-orange-500/10'
                        : project.id === 'wood-ecommerce'
                        ? 'group-hover:bg-emerald-500/10 group-hover:text-emerald-500 group-hover:border-emerald-500/10'
                        : project.id === 'bark-ecommerce'
                        ? 'group-hover:bg-amber-500/10 group-hover:text-amber-500 group-hover:border-amber-500/10'
                        : 'group-hover:bg-pink-500/10 group-hover:text-pink-500 group-hover:border-pink-500/10'
                    }`}>
                      Case Study
                    </div>
                  </div>
                  <p className="text-xs text-white/70 font-sans font-light leading-relaxed mb-4">
                    {project.tagline}
                  </p>
 
                  <div className={`mb-5 flex items-center gap-1.5 text-[10px] font-bold transition-colors uppercase tracking-widest font-sans ${
                    project.id === 'great-man-artist' || project.id === 'black-rising'
                      ? 'text-orange-500/80 group-hover:text-orange-500'
                      : project.id === 'wood-ecommerce'
                      ? 'text-emerald-500/80 group-hover:text-emerald-500'
                      : project.id === 'bark-ecommerce'
                      ? 'text-amber-500/80 group-hover:text-amber-500'
                      : 'text-pink-500/80 group-hover:text-pink-500'
                  }`}>
                    <span>Review Case Study</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </div>
                  
                  {/* Small info labels */}
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-wider text-stone-400">
                    <div>
                      <span className="text-stone-600 mr-1.5">Client:</span>
                      <span className="text-white font-medium">{project.client}</span>
                    </div>
                    <div>
                      <span className="text-stone-600 mr-1.5">Year:</span>
                      <span className="text-white font-medium">{project.year}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Case Study Detailed Modal Overlay */}
      <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
export { Portfolio };
