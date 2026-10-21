import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FlyingParticle({ particle }) {
  if (!particle) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={particle.id}
        initial={{
          position: 'fixed',
          left: particle.startX - 24,
          top: particle.startY - 24,
          width: 48,
          height: 48,
          opacity: 1,
          scale: 1,
          zIndex: 9999,
          pointerEvents: 'none',
        }}
        animate={{
          left: 'calc(50% + 100px)', // Coordinates targeting the bottom nav bag icon
          top: 'calc(100vh - 65px)',
          width: 22,
          height: 22,
          scale: 0.35,
          opacity: 0.8,
        }}
        exit={{
          opacity: 0,
          scale: 0,
        }}
        transition={{
          duration: 0.55,
          ease: [0.2, 0.8, 0.2, 1],
        }}
        className="rounded-full overflow-hidden shadow-xl ring-2 ring-[#C26747] bg-[#1A3326]"
      >
        <img
          src={particle.image}
          alt="Adding to bag"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </AnimatePresence>
  );
}
