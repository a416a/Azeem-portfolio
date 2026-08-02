import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export const CinematicLoader: React.FC<CinematicLoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 100);
    const timer2 = setTimeout(() => setPhase(2), 1500);
    const timer3 = setTimeout(() => {
      setPhase(3);
    }, 3000);
    const timer4 = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#090909',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
          }}
        >
          {/* Phase 1: Text */}
          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: phase >= 1 ? 1 : 0, letterSpacing: '0.2em' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.8rem',
              color: 'var(--accent, #B08D57)',
              marginBottom: '24px',
            }}
          >
            ENTERING UNIVERSE
          </motion.div>

          {/* Phase 2: Progress Line */}
          <div style={{ width: '200px', height: '1px', backgroundColor: 'rgba(176,141,87,0.2)' }}>
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: phase >= 2 ? '100%' : '0%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              style={{
                height: '100%',
                backgroundColor: 'var(--accent, #B08D57)',
                boxShadow: '0 0 10px rgba(176,141,87,0.5)',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
