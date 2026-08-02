import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SmoothCounter: React.FC<{ end: number | string; duration?: number; suffix?: string }> = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const endNum = typeof end === 'string' ? parseFloat(end.replace(/[^0-9.]/g, '')) : end;
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(easeProgress * endNum);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, endNum, duration]);

  // Format specifically for the stats we have
  let displayValue = Math.floor(count).toString();
  if (typeof end === 'string' && end.includes('.')) {
    displayValue = count.toFixed(1);
  }

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

export const AboutScene: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" as const,
        staggerChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem' }}>
      <motion.div 
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          backgroundColor: 'var(--panel, rgba(29,27,22,0.55))',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid var(--line, rgba(176,141,87,0.28))',
          borderRadius: '16px',
          padding: '3.5rem',
          maxWidth: '1040px',
          width: '100%',
          margin: '0 auto',
        }}
        className="about-panel"
      >
        <motion.div variants={itemVariants} style={{ marginBottom: '2rem' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: 'var(--accent, #B08D57)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            01 / About
          </span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--ink, #F5E6C8)', marginTop: '0.5rem' }}>
            From pre-med to data science
          </h2>
        </motion.div>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
          
          {/* Left Column - Text */}
          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'italic', fontSize: '1rem', color: 'var(--ink-dim, #c9b790)', lineHeight: 1.7 }}>
              My journey began in the medical field, giving me a profound appreciation for life sciences and clinical complexities. However, my passion for <strong style={{ color: 'var(--ink, #F5E6C8)', fontWeight: 500 }}>technology and data</strong> led me to pivot towards Data Science.
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'italic', fontSize: '1rem', color: 'var(--ink-dim, #c9b790)', lineHeight: 1.7 }}>
              Today, I blend my scientific background with advanced computational skills to build intelligent solutions. Whether it's developing <strong style={{ color: 'var(--ink, #F5E6C8)', fontWeight: 500 }}>machine learning models for healthcare</strong> or creating interactive dashboards for business intelligence, I thrive at the intersection of data and impactful decision-making.
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'italic', fontSize: '1rem', color: 'var(--ink-dim, #c9b790)', lineHeight: 1.7 }}>
              I specialize in Python and R, with a strong focus on predictive analytics, automation, and extracting actionable insights from complex, high-dimensional datasets.
            </p>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignContent: 'center' }}>
            <div style={{ borderLeft: '2px solid var(--accent, #B08D57)', paddingLeft: '1rem' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent, #B08D57)', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>
                <SmoothCounter end={4} />
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--ink-dim, #c9b790)', fontFamily: 'Inter, sans-serif' }}>Client countries served</div>
            </div>
            
            <div style={{ borderLeft: '2px solid var(--accent, #B08D57)', paddingLeft: '1rem' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent, #B08D57)', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>
                <SmoothCounter end={141} />
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--ink-dim, #c9b790)', fontFamily: 'Inter, sans-serif' }}>Patient samples analyzed</div>
            </div>
            
            <div style={{ borderLeft: '2px solid var(--accent, #B08D57)', paddingLeft: '1rem' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent, #B08D57)', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>
                <SmoothCounter end={"29.8"} suffix="K" />
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--ink-dim, #c9b790)', fontFamily: 'Inter, sans-serif' }}>Gene expression probes</div>
            </div>
            
            <div style={{ borderLeft: '2px solid var(--accent, #B08D57)', paddingLeft: '1rem' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent, #B08D57)', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>
                <SmoothCounter end={115} suffix="K+" />
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--ink-dim, #c9b790)', fontFamily: 'Inter, sans-serif' }}>Rows in conflict-data panel</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .about-panel { padding: 2rem !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
};
