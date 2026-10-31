'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURATION ---
// Set the active animation style: 'slide' | 'blur'
const ACTIVE_ANIMATION = 'slide';

const ROLES = [
  'Full-Stack Engineer',
  'Backend Engineer',
  'DevOps & Cloud',
  'Platform Engineer',
];

const VARIANTS = {
  // Option A: Vertical Slide & Fade (Linear / Vercel ticker style)
  slide: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  // Option B: Soft Blur & Fade
  blur: {
    initial: { opacity: 0, filter: 'blur(8px)', scale: 0.96 },
    animate: { opacity: 1, filter: 'blur(0px)', scale: 1 },
    exit: { opacity: 0, filter: 'blur(8px)', scale: 1.04 },
    transition: { duration: 0.45, ease: 'easeInOut' },
  },
};

export default function RoleAnimation({ mode = ACTIVE_ANIMATION }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentVariant = VARIANTS[mode] || VARIANTS.slide;

  return (
    <div
      style={{
        minHeight: '2.4rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={currentVariant.initial}
          animate={currentVariant.animate}
          exit={currentVariant.exit}
          transition={currentVariant.transition}
          style={{
            fontSize: 'clamp(1.05rem, 4vw, 1.35rem)',
            fontWeight: 600,
            color: 'var(--emerald-400)',
            display: 'inline-block',
          }}
        >
          {ROLES[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
