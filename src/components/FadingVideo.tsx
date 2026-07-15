import React, { useEffect, useRef } from 'react';

export const FadingVideo = ({ src, className, style }: { src: string | string[], className?: string, style?: React.CSSProperties }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    
    v.style.opacity = '0';
    v.style.transition = 'opacity 0.6s ease-in-out';
    
    const handleLoaded = () => {
      v.style.opacity = '1';
    };
    
    v.addEventListener('loadeddata', handleLoaded);
    
    // Trigger loaded check if already complete
    if (v.readyState >= 2) {
      handleLoaded();
    }
    
    let rAFId: number;
    let currentScrollY = window.scrollY;
    let interpolatedTime = v.currentTime;

    const updateLoop = () => {
      if (!v) return;

      const targetScrollY = window.scrollY;
      const height = window.innerHeight || 800;
      
      // Smoothly interpolate scroll value for parallax & effects
      currentScrollY += (targetScrollY - currentScrollY) * 0.15;
      if (Math.abs(targetScrollY - currentScrollY) < 0.1) {
        currentScrollY = targetScrollY;
      }

      // Parallax translation
      const yOffset = currentScrollY * 0.35;
      // Calculate opacity fade out as user scrolls down
      const opacity = Math.max(0, 1 - (currentScrollY / height) * 1.2);

      v.style.transform = `translate3d(0, ${yOffset}px, 0) scale(1.05)`;
      v.style.opacity = `${opacity * 0.95}`;

      // Video playback scrubbing & direction logic
      if (v.duration && !isNaN(v.duration)) {
        if (!v.paused) {
          v.pause();
        }

        // Ratio goes from 0 (top) to 1 (scrolled down)
        const ratio = Math.min(Math.max(currentScrollY / height, 0), 1);
        
        // Reverse playback mapping:
        // 0 scroll (at the top) = end of the video
        // scrolling down (away) scrubs the video backwards towards the start (0)
        const targetTime = (1 - ratio) * v.duration;
        
        // Smoothly interpolate the video current time to prevent laggy seeks
        interpolatedTime += (targetTime - interpolatedTime) * 0.12;
        
        if (Math.abs(v.currentTime - interpolatedTime) > 0.02) {
          v.currentTime = Math.min(Math.max(interpolatedTime, 0), v.duration - 0.05);
        }
      }

      rAFId = requestAnimationFrame(updateLoop);
    };

    rAFId = requestAnimationFrame(updateLoop);
    
    return () => {
      if (v) {
        v.removeEventListener('loadeddata', handleLoaded);
      }
      cancelAnimationFrame(rAFId);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      src={Array.isArray(src) ? src[0] : src}
      className={className}
      style={{
        ...style,
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
      autoPlay
      muted
      playsInline
      preload="auto"
    />
  );
};


