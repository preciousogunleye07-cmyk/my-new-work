import React, { useState } from 'react';
import Toast from './components/Toast';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { InteractiveForm } from './components/InteractiveForm';
import { Footer } from './components/Footer';
import CursorFollower from './components/CursorFollower';
import { ToastMessage } from './types';

export default function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast Queue manager
  const addToast = (text: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);

    // Self destruct toast after 4000ms
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  };

  // Scroll targeter
  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      addToast(`Unable to target element #${id}`, 'error');
    }
  };

  return (
    <div className="bg-[#0C0C0C] text-[#FAF6F0] font-sans antialiased min-h-screen relative overflow-x-hidden selection:bg-white selection:text-stone-950">
      {/* Custom elegant cursor follower loop */}
      <CursorFollower />

      {/* Dynamic corner alert notices */}
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Menu / Masthead Navigation */}
      <Header onScrollToElement={scrollToElement} onOpenToast={addToast} />

      {/* Immersive Videoplayback Hero space */}
      <Hero onScrollToElement={scrollToElement} onOpenToast={addToast} />

      {/* Grid Collections & filters */}
      <Portfolio />

      {/* Interactive Questionnaire wizard */}
      <InteractiveForm onOpenToast={addToast} />

      {/* Credentials, copyright & ticking Operations Timezone details */}
      <Footer />
    </div>
  );
}
