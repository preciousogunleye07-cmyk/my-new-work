import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onScrollToElement: (elementId: string) => void;
  onOpenToast: (text: string, type: 'success' | 'info') => void;
}

export default function Header({ onScrollToElement, onOpenToast }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle transparent to blurred white transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Active section highlights
      const sections = ['work', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onScrollToElement(id);
  };

  return (
    <>
      <header
        className={`fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-40 transition-all duration-500 px-4 md:px-8 rounded-full ${
          isScrolled ? 'py-2.5 bg-black/60 backdrop-blur-md border border-white/10 shadow-lg' : 'py-3.5 bg-transparent border border-transparent'
        }`}
      >
        <div className="w-full flex justify-between items-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-base font-serif font-bold tracking-wider text-white flex items-center gap-2.5 transition-transform hover:scale-102"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            PRECIOUS.
          </a>

          {/* Desktop Nav Actions */}
          <nav className="hidden md:flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] font-bold text-white/80">
            <a
              href="#work"
              onClick={(e) => navigateTo(e, 'work')}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeSection === 'work'
                  ? 'bg-white/10 text-white'
                  : 'hover:bg-white/5 hover:text-white text-white/60'
              }`}
            >
              Portfolio
            </a>
          </nav>

          {/* CTA Link Desktop */}
          <div className="hidden md:block">
            <button
              onClick={() => onScrollToElement('contact')}
              className="bg-white hover:bg-white/90 text-stone-950 transition-all duration-300 text-[9px] uppercase tracking-[0.2em] font-bold px-5 py-2 rounded-full shadow-sm hover:shadow-md"
            >
              Book Consultation
            </button>
          </div>

          {/* Mobile Menu Open Switch */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-white hover:text-white/80 p-1.5 hover:bg-white/5 rounded-full transition-colors"
            aria-label="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#0C0C0C]/98 backdrop-blur-md z-50 flex flex-col justify-center items-center gap-8 text-3xl font-serif font-light tracking-wide uppercase text-white"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-white/60 hover:text-white p-2 transition-colors cursor-pointer"
              aria-label="Close Menu"
            >
              <X className="w-8 h-8" />
            </button>
            
            <a
              href="#work"
              className="hover:text-white/60 transition-colors text-white cursor-pointer"
              onClick={(e) => navigateTo(e, 'work')}
            >
              Portfolio
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToElement('contact');
              }}
              className="border border-white text-[11px] uppercase tracking-[0.2em] font-bold px-8 py-3.5 mt-4 hover:bg-white hover:text-stone-900 transition-all text-white cursor-pointer"
            >
              Book Consultation
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export { Header };
