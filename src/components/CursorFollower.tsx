import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Position of the mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for trailing outer ring
  const springConfig = { damping: 30, stiffness: 200, mass: 0.6 };
  const outerX = useSpring(mouseX, springConfig);
  const outerY = useSpring(mouseY, springConfig);

  // Slightly faster/stiffer spring for inner dot
  const dotConfig = { damping: 25, stiffness: 350, mass: 0.2 };
  const innerX = useSpring(mouseX, dotConfig);
  const innerY = useSpring(mouseY, dotConfig);

  useEffect(() => {
    // Only enable custom cursor if it's a device with a fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, [onClick]');
        setIsHovered(!!isInteractive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer elegant tracking ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-stone-900 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovered ? 1.6 : 1,
          backgroundColor: isHovered ? 'rgba(250, 246, 240, 0.1)' : 'rgba(250, 246, 240, 0)',
          borderColor: isHovered ? 'rgb(250, 246, 240)' : 'rgb(28, 25, 23)', // high contrast
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />

      {/* Inner precise dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-stone-900 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: innerX,
          y: innerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 1.5 : isHovered ? 0.5 : 1,
          backgroundColor: isHovered ? 'rgb(250, 246, 240)' : 'rgb(28, 25, 23)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />
    </>
  );
}
