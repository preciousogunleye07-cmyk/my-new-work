import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Target, Brush, Settings, Rocket, Calendar, Layers, PenTool, Eye, CheckCircle2, ZoomIn, ZoomOut } from 'lucide-react';
import { Project } from '../types';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const [zoom, setZoom] = useState(150);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  const isRekay = project.id === 'rekay-artist';
  const isGreatMan = project.id === 'great-man-artist';
  const isWood = project.id === 'wood-ecommerce';
  const isBark = project.id === 'bark-ecommerce';
  const isBlackRising = project.id === 'black-rising';

  const accentText = (isGreatMan || isBlackRising) ? 'text-orange-500' : isWood ? 'text-emerald-500' : isBark ? 'text-amber-500' : 'text-pink-500';
  const accentBg = (isGreatMan || isBlackRising) ? 'bg-orange-500' : isWood ? 'bg-emerald-500' : isBark ? 'bg-amber-500' : 'bg-pink-500';
  const accentBorder = (isGreatMan || isBlackRising) ? 'border-orange-500/20' : isWood ? 'border-emerald-500/20' : isBark ? 'border-amber-500/20' : 'border-pink-500/20';
  const accentBgLight = (isGreatMan || isBlackRising) ? 'bg-orange-500/10' : isWood ? 'bg-emerald-500/10' : isBark ? 'bg-amber-500/10' : 'bg-pink-500/10';
  const accentShadow = (isGreatMan || isBlackRising) ? 'shadow-[0_0_50px_rgba(249,115,22,0.15)]' : isWood ? 'shadow-[0_0_50px_rgba(16,185,129,0.15)]' : isBark ? 'shadow-[0_0_50px_rgba(245,158,11,0.15)]' : 'shadow-[0_0_50px_rgba(236,72,153,0.15)]';
  const accentHoverBg = (isGreatMan || isBlackRising) ? 'hover:bg-orange-500' : isWood ? 'hover:bg-emerald-500' : isBark ? 'hover:bg-amber-500' : 'hover:bg-pink-500';
  const accentBtnShadow = (isGreatMan || isBlackRising) 
    ? 'shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] bg-orange-500 hover:bg-orange-600' 
    : isWood
    ? 'shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] bg-emerald-500 hover:bg-emerald-600'
    : isBark
    ? 'shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] bg-amber-500 hover:bg-amber-600'
    : 'shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] bg-pink-500 hover:bg-pink-600';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
          id="modal-backdrop"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", duration: 0.6, bounce: 0.15 }}
          className={`relative bg-[#0E0E0E] border border-white/10 rounded-3xl w-full max-w-5xl h-[85vh] md:h-[80vh] overflow-hidden flex flex-col z-10 ${accentShadow}`}
          id="modal-window"
        >
          {/* Top Sticky Header */}
          <div className="p-6 md:px-8 border-b border-white/5 flex items-center justify-between bg-black/40 backdrop-blur-md z-20">
            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-1 rounded-full text-[8px] md:text-[9px] uppercase tracking-widest font-bold border ${accentBgLight} ${accentText} ${accentBorder}`}>
                Case Study Detailed Review
              </span>
              <span className="text-white/40 text-xs hidden sm:inline">|</span>
              <span className="text-stone-400 text-xs hidden sm:inline font-mono">ID: {project.id}</span>
            </div>
            
            <button
              onClick={onClose}
              className={`p-2 rounded-full bg-white/5 text-stone-400 hover:text-white transition-all duration-300 group cursor-pointer ${accentHoverBg}`}
              aria-label="Close Case Study"
              id="close-modal-button"
            >
              <X className="w-4 h-4 transition-transform group-hover:rotate-90" />
            </button>
          </div>

          {/* Modal Main Scrollable Content */}
          <div className="flex-grow overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8">
              
              {/* Left Column: Media & Meta Info */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-0">
                {/* Embedded High-Quality Media Preview */}
                {(project.videoUrl || project.imageUrl) && (
                  <div className="relative aspect-[4/3] rounded-2xl border border-white/10 bg-black/60 shadow-lg group overflow-hidden">
                    {/* Floating Zoom Controls (Image Only) */}
                    {!project.videoUrl && (
                      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black/75 backdrop-blur-md border border-white/15 px-2.5 py-1.5 rounded-full shadow-lg">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setZoom(prev => Math.max(100, prev - 25));
                          }}
                          className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-all active:scale-95 cursor-pointer"
                          title="Zoom Out"
                        >
                          <ZoomOut className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[10px] font-mono font-bold text-white/90 px-1 min-w-[36px] text-center">
                          {zoom}%
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setZoom(prev => Math.min(300, prev + 25));
                          }}
                          className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-all active:scale-95 cursor-pointer"
                          title="Zoom In"
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>
                        <div className="w-[1px] h-3.5 bg-white/15 mx-1" />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setZoom(150);
                          }}
                          className="text-[9px] font-bold text-stone-400 hover:text-white hover:bg-white/10 px-2 py-1 rounded-full transition-all active:scale-95 cursor-pointer"
                          title="Reset Zoom"
                        >
                          Reset
                        </button>
                      </div>
                    )}

                    {project.videoUrl ? (
                      <video
                        src={project.videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 overflow-auto p-4 custom-scrollbar">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          style={{
                            width: `${zoom}%`,
                            minWidth: `${zoom}%`,
                            height: 'auto',
                            maxWidth: 'none',
                          }}
                          className="object-contain mx-auto transition-all duration-200"
                        />
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between pointer-events-none z-10">
                      <span className="text-[9px] font-mono tracking-widest text-stone-400 uppercase flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full animate-ping ${accentBg}`} />
                        {project.videoUrl ? 'Live Video Preview' : 'Interactive Concept Design (Scroll/Pan)'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Case Study Meta Data Card */}
                <div className="bg-white/2 border border-white/5 rounded-2xl p-5 space-y-4">
                  <h4 className="text-stone-400 text-[10px] uppercase tracking-widest font-bold font-mono">
                    Project Overview
                  </h4>
                  
                  <div className="space-y-3 divide-y divide-white/5 text-sm">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-stone-500 text-xs">Client</span>
                      <span className="text-white font-medium">{project.client}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 pt-2">
                      <span className="text-stone-500 text-xs">Role</span>
                      <span className="text-white font-medium">Lead UI/UX & Visual Designer</span>
                    </div>
                    <div className="flex justify-between items-center py-2 pt-2">
                      <span className="text-stone-500 text-xs">Timeline</span>
                      <span className="text-white font-medium flex items-center gap-1">
                        <Calendar className={`w-3.5 h-3.5 ${accentText}`} />
                        {isRekay ? "3 Weeks" : "2 Weeks"}
                      </span>
                    </div>
                    <div className="flex justify-between items-start py-2 pt-2">
                      <span className="text-stone-500 text-xs mt-0.5">Tools</span>
                      <span className="text-white font-medium text-right max-w-[180px]">
                        {isRekay ? "Figma, Framer, Adobe Creative Suite" : "Figma, After Effects, Webflow"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Interactive highlight metrics if available */}
                {project.metrics && (
                  <div className="grid grid-cols-2 gap-4">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="bg-white/2 border border-white/5 rounded-2xl p-4 text-center">
                        <div className={`text-2xl font-serif font-bold mb-1 ${accentText}`}>
                          {metric.value}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-stone-400">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Case Study Narrative (Rich Text) */}
              <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-4">
                
                {/* Header Title */}
                <div>
                  <h1 className="text-2xl md:text-4xl font-sans font-black tracking-tight text-white mb-3">
                    {isRekay && "Case Study: Rekay – Purpose-Driven Personal Branding & Portfolio Design"}
                    {isGreatMan && "Case Study: Great Man – Sonic Authority & Monolithic Brand System"}
                    {isWood && "Case Study: Wood – Minimalist & Sustainable Furniture E-Commerce"}
                    {isBark && "Case Study: Bark – High-Conversion Pet E-Commerce Platform"}
                    {isBlackRising && "Case Study: Black Rising – Digital Platform for Educational Empowerment"}
                    {!isRekay && !isGreatMan && !isWood && !isBark && !isBlackRising && `Case Study: ${project.title}`}
                  </h1>
                  <p className={`text-xs font-mono uppercase tracking-widest font-bold ${accentText}`}>
                    {project.badge}
                  </p>
                </div>

                {isRekay ? (
                  <>
                    {/* The Objective Section */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-pink-500">
                        <Target className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">The Objective</h3>
                      </div>
                      <p className="text-stone-300 text-sm leading-relaxed font-sans font-light">
                        The goal was to design a premium, high-impact digital portfolio that encapsulates a multi-disciplinary creative professional. The client required a platform that balanced his spiritual convictions with his extensive expertise in media execution, creative leadership, and luxury real estate storytelling. The interface needed to feel visionary and modern, yet highly structured and easy to navigate.
                      </p>
                    </div>

                    {/* Visual Direction & Aesthetics Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-pink-500">
                        <Brush className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">Visual Direction & Aesthetics</h3>
                      </div>
                      <p className="text-stone-300 text-sm leading-relaxed font-sans font-light">
                        The design language pairs ethereal, atmospheric elements with sharp, high-contrast modernism to reflect a brand that is both deeply grounded and creatively elevated.
                      </p>
                      
                      <div className="grid grid-cols-1 gap-4 mt-2">
                        <div className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-pink-500 uppercase tracking-widest block">Color Palette</span>
                          <p className="text-stone-300 text-xs font-light leading-relaxed">
                            A sophisticated dark mode foundation utilizing deep blacks and charcoals to create a cinematic feel. This is sharply contrasted by a vibrant, energetic pink (magenta) accent color, which guides the user's eye to primary interactions, active states, and Call-to-Actions (CTAs).
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-pink-500 uppercase tracking-widest block">Typography</span>
                          <p className="text-stone-300 text-xs font-light leading-relaxed">
                            Bold, clean sans-serif typography was selected for its high legibility and contemporary edge. The oversized, interwoven typography in the hero section ("REKAY") establishes immediate, undeniable brand presence, while clean paragraph formatting ensures the narrative copy remains digestible.
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-pink-500 uppercase tracking-widest block">Imagery</span>
                          <p className="text-stone-300 text-xs font-light leading-relaxed">
                            A blend of dreamy, colorful cloudscapes in the hero section transitions into moody, professional black-and-white photography in the content sections, creating a dynamic visual rhythm as the user scrolls.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Key Features & UI Solutions Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-pink-500">
                        <Settings className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">Key Features & UI Solutions</h3>
                      </div>
                      
                      <div className="space-y-5">
                        <div className="relative pl-6 border-l-2 border-pink-500/30">
                          <span className="absolute left-[-5px] top-0.5 w-2 h-2 rounded-full bg-pink-500" />
                          <h4 className="text-sm font-semibold text-white mb-1">1. The Immersive Hero Experience (Image 1)</h4>
                          <p className="text-stone-400 text-xs leading-relaxed font-light">
                            To immediately communicate the client's multifaceted identity, the hero section utilizes an expansive, atmospheric background paired with interactive, floating tags (<em>Christian Creative</em>, <em>Media Executive</em>, <em>Creative Community Builder</em>, <em>Kingdom Influencer</em>). This engaging UI pattern allows users to digest the client's diverse roles instantly without feeling overwhelmed by heavy text.
                          </p>
                        </div>

                        <div className="relative pl-6 border-l-2 border-pink-500/30">
                          <span className="absolute left-[-5px] top-0.5 w-2 h-2 rounded-full bg-pink-500" />
                          <h4 className="text-sm font-semibold text-white mb-1">2. Narrative-Driven "About" Section (Image 2)</h4>
                          <p className="text-stone-400 text-xs leading-relaxed font-light">
                            Transitioning from the colorful hero into a stark, high-contrast dark theme, this section commands focus. The layout pairs a desaturated portrait with crisp, prominent typography to tell the client's story. The minimalist approach ensures the core message—shaping culture through media—takes center stage.
                          </p>
                        </div>

                        <div className="relative pl-6 border-l-2 border-pink-500/30">
                          <span className="absolute left-[-5px] top-0.5 w-2 h-2 rounded-full bg-pink-500" />
                          <h4 className="text-sm font-semibold text-white mb-1">3. Structured Service Cards (Image 3)</h4>
                          <p className="text-stone-400 text-xs leading-relaxed font-light">
                            To organize the client's core competencies (<em>Creative Leadership</em>, <em>Media & Communication</em>, <em>Real Estate Media</em>), I implemented a clean, grid-based card system. The use of a vibrant pink active/hover state for the middle card provides excellent visual feedback, while minimalist custom iconography keeps the cognitive load light and the aesthetic premium.
                          </p>
                        </div>

                        <div className="relative pl-6 border-l-2 border-pink-500/30">
                          <span className="absolute left-[-5px] top-0.5 w-2 h-2 rounded-full bg-pink-500" />
                          <h4 className="text-sm font-semibold text-white mb-1">4. Portfolio Gallery & Conversion (Images 4 & 5)</h4>
                          <p className="text-stone-400 text-xs leading-relaxed font-light">
                            The portfolio section relies on a clean, masonry-style image presentation to showcase high-impact aerial cinema and luxury real estate media. The user journey concludes with a bold, typography-led footer and a striking pink CTA button ("CONTACT"), minimizing friction for potential collaborators ready to start their next project.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* The Impact Section */}
                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-pink-500">
                        <Rocket className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">The Impact</h3>
                      </div>
                      <p className="text-stone-300 text-sm leading-relaxed font-sans font-light">
                        The final product is a responsive, highly visual digital home that accurately positions Rekay as an industry leader at the intersection of faith, storytelling, and innovation. The interface not only showcases past work but actively sets a premium tone for future creative partnerships.
                      </p>
                    </div>
                  </>
                ) : isGreatMan ? (
                  <>
                    {/* The Objective Section */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-orange-500">
                        <Target className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">The Objective</h3>
                      </div>
                      <p className="text-stone-300 text-sm leading-relaxed font-sans font-light">
                        The goal was to design and deploy an uncompromising, high-impact digital presence that projects the unique creative presence and sonic authority of Great Man. The platform needed to synthesize complex musical narratives, raw art direction, and tactile typographic layouts, balancing brand authority with visual consistency.
                      </p>
                    </div>

                    {/* Visual Direction & Aesthetics Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-orange-500">
                        <Brush className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">Visual Direction & Aesthetics</h3>
                      </div>
                      <p className="text-stone-300 text-sm leading-relaxed font-sans font-light">
                        We constructed a brutalist yet meticulously balanced visual system. High-contrast negative spaces, raw charcoal tones, and vibrant orange guidework align to direct user attention.
                      </p>
                      
                      <div className="grid grid-cols-1 gap-4 mt-2">
                        <div className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block">Color Foundation</span>
                          <p className="text-stone-300 text-xs font-light leading-relaxed">
                            Deep industrial dark-mode hues form a museum-like backdrop. Warm atmospheric lighting contrasts are punctuated by raw, high-intensity orange accents, signifying active interactive elements.
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block">Monolithic Typography</span>
                          <p className="text-stone-300 text-xs font-light leading-relaxed">
                            Oversized, tight-set sans-serif headings command the page hierarchy, paired with high-legibility monospaced data tags to present administrative details cleanly.
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block">Cinetic Media Layouts</span>
                          <p className="text-stone-300 text-xs font-light leading-relaxed">
                            Streamlined masonry grids host dark, cinematic drone clips and rich aerial textures. Video previews loop seamlessly, reinforcing the grand scale of the client's work.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Key Features & UI Solutions Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-orange-500">
                        <Settings className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">Key Features & UI Solutions</h3>
                      </div>
                      
                      <div className="space-y-5">
                        <div className="relative pl-6 border-l-2 border-orange-500/30">
                          <span className="absolute left-[-5px] top-0.5 w-2 h-2 rounded-full bg-orange-500" />
                          <h4 className="text-sm font-semibold text-white mb-1">1. The Monolithic Entrance (Image 1)</h4>
                          <p className="text-stone-400 text-xs leading-relaxed font-light">
                            To immediately hook visitors, the entrance utilizes high-density headlines, ambient slow-motion video backdrops, and raw, structured metadata. This setup communicates instant artistic authority.
                          </p>
                        </div>

                        <div className="relative pl-6 border-l-2 border-orange-500/30">
                          <span className="absolute left-[-5px] top-0.5 w-2 h-2 rounded-full bg-orange-500" />
                          <h4 className="text-sm font-semibold text-white mb-1">2. Tactical Bento Showcases (Image 2)</h4>
                          <p className="text-stone-400 text-xs leading-relaxed font-light">
                            Interactive bento-grid modules break down core competencies (Unified Brand Architecture, Presentation Systems, Asset Guides) with ultra-clean borders, reducing visual friction to a minimum.
                          </p>
                        </div>

                        <div className="relative pl-6 border-l-2 border-orange-500/30">
                          <span className="absolute left-[-5px] top-0.5 w-2 h-2 rounded-full bg-orange-500" />
                          <h4 className="text-sm font-semibold text-white mb-1">3. Editorial Asset Guidelines (Image 3)</h4>
                          <p className="text-stone-400 text-xs leading-relaxed font-light">
                            Presents client deliverables as a clean, interactive checklist. This provides prospective partners with concrete breakdowns of design scope, reducing the conversion barrier.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* The Impact Section */}
                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-orange-500">
                        <Rocket className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">The Impact</h3>
                      </div>
                      <p className="text-stone-300 text-sm leading-relaxed font-sans font-light">
                        The final platform elevates Great Man's digital positioning. The streamlined visual identity translates effortlessly across all platforms, establishing premium art direction and driving a massive +340% increase in audience engagement and brand authority.
                      </p>
                    </div>
                  </>
                ) : isWood ? (
                  <>
                    {/* Wood Case Study */}
                    {/* The Objective Section */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-emerald-500">
                        <Target className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">The Objective</h3>
                      </div>
                      <p className="text-stone-300 text-sm leading-relaxed font-sans font-light">
                        Wood is a premium, eco-conscious e-commerce landing page designed to bring the warmth of natural living into modern spaces. The design prioritizes organic aesthetics, seamless navigation, and a strong emphasis on sustainability to cultivate trust and drive high-intent purchases.
                      </p>
                    </div>

                    {/* Visual Direction & Aesthetics Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-emerald-500">
                        <Brush className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">Visual Direction & Aesthetics</h3>
                      </div>
                      <p className="text-stone-300 text-sm leading-relaxed font-sans font-light">
                        We constructed a highly polished, minimalist digital experience rooted in nature and high craftsmanship. Every element was selected to evoke timelessness and reliability.
                      </p>
                      
                      <div className="grid grid-cols-1 gap-4 mt-2">
                        <div className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest block">Color Palette</span>
                          <p className="text-stone-300 text-xs font-light leading-relaxed">
                            Built on a soothing, earthy foundation. A desaturated sage green serves as the primary brand identifier, representing nature, growth, and sustainability. This is balanced by warm, off-white background tones and charcoal typography to ensure optimal contrast without looking harsh.
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest block">Typography Pairing</span>
                          <p className="text-stone-300 text-xs font-light leading-relaxed">
                            A bold, humanist serif font for headers to evoke craftsmanship and timelessness, paired with a highly legible, clean sans-serif for the body copy.
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest block">Organic Graphic Accents</span>
                          <p className="text-stone-300 text-xs font-light leading-relaxed">
                            Subtle, flowing line patterns in the background mimic natural wood grains, giving the interface a unique, tactile brand identity.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Key Features & UI Solutions Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-emerald-500">
                        <Settings className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">Role & Focus</h3>
                      </div>
                      
                      <div className="space-y-5">
                        <div className="relative pl-6 border-l-2 border-emerald-500/30">
                          <span className="absolute left-[-5px] top-0.5 w-2 h-2 rounded-full bg-emerald-500" />
                          <h4 className="text-sm font-semibold text-white mb-1">Minimalist UI</h4>
                          <p className="text-stone-400 text-xs leading-relaxed font-light">
                            Reducing secondary clutter to center the product spotlight, utilizing elegant negative space to allow furniture visuals to breathe.
                          </p>
                        </div>

                        <div className="relative pl-6 border-l-2 border-emerald-500/30">
                          <span className="absolute left-[-5px] top-0.5 w-2 h-2 rounded-full bg-emerald-500" />
                          <h4 className="text-sm font-semibold text-white mb-1">Editorial Layouts</h4>
                          <p className="text-stone-400 text-xs leading-relaxed font-light">
                            Constructed asymmetrical, lookbook-inspired masonry showcases that elevate simple furniture into collectible architectural art.
                          </p>
                        </div>

                        <div className="relative pl-6 border-l-2 border-emerald-500/30">
                          <span className="absolute left-[-5px] top-0.5 w-2 h-2 rounded-full bg-emerald-500" />
                          <h4 className="text-sm font-semibold text-white mb-1">Trust-Building UX</h4>
                          <p className="text-stone-400 text-xs leading-relaxed font-light">
                            Clear communication of sustainable material provenance, transparent certified sourcing paths, and customer feedback blocks.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* The Impact Section */}
                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-emerald-500">
                        <Rocket className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">The Impact</h3>
                      </div>
                      <p className="text-stone-300 text-sm leading-relaxed font-sans font-light">
                        By integrating deep organic branding elements directly into the UI, the platform has cultivated immense brand trust, leading to a massive +180% increase in sustainable trust scores and unmatched high-intent checkout rates.
                      </p>
                    </div>
                  </>
                ) : isBark ? (
                  <>
                    {/* Bark Case Study */}
                    {/* The Objective Section */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-amber-500">
                        <Target className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">The Objective</h3>
                      </div>
                      <p className="text-stone-300 text-sm leading-relaxed font-sans font-light">
                        Bark is a vibrant, modern, and conversion-focused e-commerce web application designed to simplify the shopping experience for pet parents. The platform combines bright, engaging visuals with high-performance UX patterns—such as quick-view modals and clear social proof—to maximize sales velocity and reduce cart abandonment.
                      </p>
                    </div>

                    {/* Visual Direction & Aesthetics Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-amber-500">
                        <Brush className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">Visual Direction & Aesthetics</h3>
                      </div>
                      <p className="text-stone-300 text-sm leading-relaxed font-sans font-light">
                        We designed a welcoming and visually hyper-charged digital layout centered on high emotional resonance and maximum user response.
                      </p>
                      
                      <div className="grid grid-cols-1 gap-4 mt-2">
                        <div className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block">Joyful Color Foundation</span>
                          <p className="text-stone-300 text-xs font-light leading-relaxed">
                            An energetic, warm honey-yellow serves as the primary accent color. Honey-yellow is psychologically associated with joy, warmth, and energy, making it the perfect match for a premium pet brand. High-contrast dark charcoal elements ensure high readability and fast scannability.
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block">High-Fidelity Imagery</span>
                          <p className="text-stone-300 text-xs font-light leading-relaxed">
                            Emotional, high-fidelity hero photographs of pets interacting with products help build an instant connection, establishing strong trust with pet parents.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Key Features & UI Solutions Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-amber-500">
                        <Settings className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">Key UI/UX Highlights</h3>
                      </div>
                      
                      <div className="space-y-5">
                        <div className="relative pl-6 border-l-2 border-amber-500/30">
                          <span className="absolute left-[-5px] top-0.5 w-2 h-2 rounded-full bg-amber-500" />
                          <h4 className="text-sm font-semibold text-white mb-1">Urgency-Driven Promo Banner</h4>
                          <p className="text-stone-400 text-xs leading-relaxed font-light">
                            The hero area features a bold, high-contrast banner with an active countdown timer ("Get 50% off Today"). This immediate visual cue leverages loss aversion to drive fast purchase decisions.
                          </p>
                        </div>

                        <div className="relative pl-6 border-l-2 border-amber-500/30">
                          <span className="absolute left-[-5px] top-0.5 w-2 h-2 rounded-full bg-amber-500" />
                          <h4 className="text-sm font-semibold text-white mb-1">High-Density Product Grid</h4>
                          <p className="text-stone-400 text-xs leading-relaxed font-light">
                            A highly clean, card-based catalog showcasing the "Most Popular Products." Each card contains a clear image, straightforward pricing, and a quick-add feature to minimize friction in the buying loop.
                          </p>
                        </div>

                        <div className="relative pl-6 border-l-2 border-amber-500/30">
                          <span className="absolute left-[-5px] top-0.5 w-2 h-2 rounded-full bg-amber-500" />
                          <h4 className="text-sm font-semibold text-white mb-1">Frictionless Quick View Modal</h4>
                          <p className="text-stone-400 text-xs leading-relaxed font-light">
                            Instead of forcing users to load a brand new page for every item, a slide-over product detail modal allows them to view ratings, read verified customer reviews, select variants, and add to cart without losing their place in the catalog.
                          </p>
                        </div>

                        <div className="relative pl-6 border-l-2 border-amber-500/30">
                          <span className="absolute left-[-5px] top-0.5 w-2 h-2 rounded-full bg-amber-500" />
                          <h4 className="text-sm font-semibold text-white mb-1">Streamlined OAuth Sign-In</h4>
                          <p className="text-stone-400 text-xs leading-relaxed font-light">
                            The minimalist "Sign In" overlay offers single-click social login options (Google, Email) to reduce drop-off rates during checkout initiation.
                          </p>
                        </div>

                        <div className="relative pl-6 border-l-2 border-amber-500/30">
                          <span className="absolute left-[-5px] top-0.5 w-2 h-2 rounded-full bg-amber-500" />
                          <h4 className="text-sm font-semibold text-white mb-1">Embedded Social Proof</h4>
                          <p className="text-stone-400 text-xs leading-relaxed font-light">
                            A dedicated customer testimonial section featuring real user faces and 5-star ratings directly builds authority and reassures first-time buyers.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* The Impact Section */}
                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-amber-500">
                        <Rocket className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">The Impact</h3>
                      </div>
                      <p className="text-stone-300 text-sm leading-relaxed font-sans font-light">
                        By prioritizing conversion rate optimization (CRO) and high-density, social-proof-infused layouts, Bark achieves an incredible +32% increase in sales conversion rates and cuts cart abandonment rates by -25%.
                      </p>
                    </div>
                  </>
                ) : isBlackRising ? (
                  <>
                    {/* Black Rising Case Study */}
                    {/* The Objective Section */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-orange-500">
                        <Target className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">The Objective</h3>
                      </div>
                      <p className="text-stone-300 text-sm leading-relaxed font-sans font-light">
                        The goal of this project was to design a compelling, high-conversion landing page for Black Rising, an organization dedicated to "Empowering Black Excellence". The platform needed to clearly communicate their mission of providing Black youth, especially Nigerians, with access to education, careers, and mentorship. The design had to build immediate trust, showcase measurable impact, and seamlessly guide users toward getting involved as students, mentors, or donors.
                      </p>
                    </div>

                    {/* Visual Direction & Aesthetics Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-orange-500">
                        <Brush className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">Visual Direction & UI Design System</h3>
                      </div>
                      <p className="text-stone-300 text-sm leading-relaxed font-sans font-light">
                        We developed a premium, empowering digital identity system celebrating cultural legacy while maintaining modern, clean readability.
                      </p>
                      
                      <div className="grid grid-cols-1 gap-4 mt-2">
                        <div className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block">Color Palette</span>
                          <p className="text-stone-300 text-xs font-light leading-relaxed">
                            A deep, modern dark mode foundation drastically reduces eye strain and establishes a premium aesthetic. Strategic, high-contrast orange accents guide users to primary actions like "Join the Movement" and "Donate to Support Scholarships".
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block">Typography & Imagery</span>
                          <p className="text-stone-300 text-xs font-light leading-relaxed">
                            Clean, highly legible sans-serif typography ensures effortless scannability of the organization's story. The hero features a culturally resonant African geometric pattern coupled with a warm, aspirational hero image.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Key UX Features & Architecture Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-orange-500">
                        <Settings className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">Key UX Features & Architecture</h3>
                      </div>
                      
                      <div className="space-y-5">
                        <div className="relative pl-6 border-l-2 border-orange-500/30">
                          <span className="absolute left-[-5px] top-0.5 w-2 h-2 rounded-full bg-orange-500" />
                          <h4 className="text-sm font-semibold text-white mb-1">Impact-Driven Hero & Statistics</h4>
                          <p className="text-stone-400 text-xs leading-relaxed font-light">
                            Isolates credibility-proving milestones in a clean grid showing <strong>500+ Students Supported</strong>, <strong>50+ Mentors Active</strong>, <strong>N50M+ Scholarships Awarded</strong>, and <strong>15 Countries Reached</strong>.
                          </p>
                        </div>

                        <div className="relative pl-6 border-l-2 border-orange-500/30">
                          <span className="absolute left-[-5px] top-0.5 w-2 h-2 rounded-full bg-orange-500" />
                          <h4 className="text-sm font-semibold text-white mb-1">Bento-Style Offerings Grid</h4>
                          <p className="text-stone-400 text-xs leading-relaxed font-light">
                            Breaks services down into digestible, interactive cards: Scholarships (covering full tuition, living allowances, and academic materials), Academic Support, and Community Building.
                          </p>
                        </div>

                        <div className="relative pl-6 border-l-2 border-orange-500/30">
                          <span className="absolute left-[-5px] top-0.5 w-2 h-2 rounded-full bg-orange-500" />
                          <h4 className="text-sm font-semibold text-white mb-1">Social Proof via Impact Stories</h4>
                          <p className="text-stone-400 text-xs leading-relaxed font-light">
                            Features a high-trust slider showcasing actual beneficiary faces, quotes, and star ratings, validating organizational transparency and creating deep emotional connections.
                          </p>
                        </div>

                        <div className="relative pl-6 border-l-2 border-orange-500/30">
                          <span className="absolute left-[-5px] top-0.5 w-2 h-2 rounded-full bg-orange-500" />
                          <h4 className="text-sm font-semibold text-white mb-1">Frictionless "Get Involved" Funnel</h4>
                          <p className="text-stone-400 text-xs leading-relaxed font-light">
                            Segmented conversion paths targeting specific user types with highly prominent action triggers: "Volunteer as a Mentor", "Donate to Support Scholarships", and "Partner with Us".
                          </p>
                        </div>

                        <div className="relative pl-6 border-l-2 border-orange-500/30">
                          <span className="absolute left-[-5px] top-0.5 w-2 h-2 rounded-full bg-orange-500" />
                          <h4 className="text-sm font-semibold text-white mb-1">Support Desk & FAQ</h4>
                          <p className="text-stone-400 text-xs leading-relaxed font-light">
                            Combines a direct message form with a simplified FAQ system addressing critical questions (program costs, eligibility requirements) to eliminate application drop-offs.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* The Impact Section */}
                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-orange-500">
                        <Rocket className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">The Impact</h3>
                      </div>
                      <p className="text-stone-300 text-sm leading-relaxed font-sans font-light">
                        The final platform successfully balances high-impact emotional storytelling with data visualization. Black Rising is now perfectly positioned to scale its mission and efficiently equip the next generation of young African leaders with critical global skills.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* General / Fallback Project Case Study */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-pink-500">
                        <Target className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">The Objective</h3>
                      </div>
                      <p className="text-stone-300 text-sm leading-relaxed font-sans font-light">
                        {project.challenge || "The goal was to design and deploy an elegant, modern visual layout that represents the unique creative presence of Great Man. The client needed a platform that immediately projects sonic authority and premium visual consistency."}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-pink-500">
                        <Brush className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">The Design System & Aesthetics</h3>
                      </div>
                      <p className="text-stone-300 text-sm leading-relaxed font-sans font-light">
                        {project.solution || "We constructed an uncompromising brand ecosystem centered on bold, monolithic typography and atmospheric transitions. High-contrast negative spaces were balanced with raw, dark industrial visuals to command attention instantly."}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-pink-500">
                        <Layers className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">Deliverables Included</h3>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-300 text-xs font-light">
                        {project.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 bg-white/2 border border-white/5 p-3 rounded-xl">
                            <CheckCircle2 className="w-4 h-4 text-pink-500 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-pink-500">
                        <Rocket className="w-5 h-5" />
                        <h3 className="text-lg font-bold font-sans tracking-tight text-white">The Impact</h3>
                      </div>
                      <p className="text-stone-300 text-sm leading-relaxed font-sans font-light">
                        The final platform elevates Great Man's digital positioning. The streamlined visual identity translates effortlessly across all platforms, establishing premium art direction and driving a massive +340% increase in audience engagement and brand authority.
                      </p>
                    </div>
                  </>
                )}

              </div>
            </div>
          </div>

          {/* Bottom Sticky Action Footer */}
          <div className="p-4 border-t border-white/5 bg-black/40 backdrop-blur-md flex flex-col sm:flex-row gap-4 items-center justify-between z-20">
            <div className="text-[10px] text-white/40 font-mono text-center sm:text-left">
              * Design designed & optimized for responsive rendering & cinema showcases.
            </div>
            <button
              onClick={() => {
                onClose();
                const contactEl = document.getElementById('contact');
                if (contactEl) {
                  contactEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-full text-xs uppercase tracking-widest text-white font-bold transition-all duration-300 cursor-pointer ${accentBtnShadow}`}
            >
              Consult with Lead Designer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
