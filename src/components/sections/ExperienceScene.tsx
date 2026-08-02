import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const TimelineItem: React.FC<{
  year: string;
  title: string;
  subtitle: string;
  isLeft: boolean;
  isMobile: boolean;
}> = ({ year, title, subtitle, isLeft, isMobile }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div 
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: isMobile ? 'flex-start' : (isLeft ? 'flex-end' : 'flex-start'),
        width: '100%',
        position: 'relative',
        marginBottom: '4rem',
        paddingLeft: isMobile ? '3rem' : '0',
      }}
    >
      {/* Timeline Node */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          position: 'absolute',
          left: isMobile ? '0' : '50%',
          top: '20px',
          transform: 'translateX(-50%)',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: isInView ? 'var(--accent, #B08D57)' : 'var(--panel, #1d1b16)',
          border: '2px solid var(--accent, #B08D57)',
          boxShadow: isInView ? '0 0 15px var(--accent, #B08D57)' : 'none',
          zIndex: 2,
          transition: 'all 0.5s ease'
        }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isMobile ? 30 : (isLeft ? -50 : 50) }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isMobile ? 30 : (isLeft ? -50 : 50) }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          width: isMobile ? '100%' : '45%',
          backgroundColor: 'var(--panel, rgba(29,27,22,0.55))',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--line, rgba(176,141,87,0.28))',
          borderRadius: '12px',
          padding: '2rem',
          textAlign: isMobile ? 'left' : (isLeft ? 'right' : 'left'),
        }}
      >
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', color: 'var(--ink-dim, #c9b790)', marginBottom: '0.5rem' }}>
          {year}
        </div>
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '1.2rem', fontWeight: 600, color: 'var(--ink, #F5E6C8)', marginBottom: '0.5rem' }}>
          {title}
        </h3>
        <p style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'italic', fontSize: '0.88rem', color: 'var(--ink-dim, #c9b790)', lineHeight: 1.5 }}>
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
};

export const ExperienceScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far we've scrolled into the container
      const start = rect.top - viewportHeight * 0.8;
      const end = rect.height;
      
      let progress = 0;
      if (start < 0) {
        progress = Math.min(1, Math.abs(start) / end);
      }
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const education = [
    { year: '2021', title: 'Matriculation (Science)', subtitle: 'Al Majeed High School' },
    { year: '2023', title: 'FSc Pre-Medical', subtitle: 'Vision College' },
    { year: '2024 - Present', title: 'BS Computer Science', subtitle: 'Government College University Faisalabad (GCUF)' }
  ];

  const certifications = [
    'Crash Course on Python (Google)',
    'Python Automation and Web Scraping (Packt)',
    'Exploratory Data Analysis with R (Johns Hopkins University)',
    'Data Scientist Specialization (Johns Hopkins University)',
    'Statistics & Machine Learning (continuing)',
    'Data Science for Health Science (University of Michigan)',
    'Genomics Data Science (Johns Hopkins University)'
  ];

  return (
    <section id="experience" style={{ minHeight: '100vh', padding: '8rem 2rem' }}>
      <div style={{ maxWidth: '1040px', width: '100%', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '5rem', textAlign: 'center' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: 'var(--accent, #B08D57)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            04 / Education
          </span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--ink, #F5E6C8)', marginTop: '0.5rem' }}>
            Academic background
          </h2>
        </div>

        <div ref={containerRef} style={{ position: 'relative', marginBottom: '6rem' }}>
          
          {/* Vertical Line */}
          <div 
            style={{
              position: 'absolute',
              left: isMobile ? '0' : '50%',
              top: 0,
              bottom: 0,
              width: '1px',
              backgroundColor: 'rgba(176,141,87,0.1)',
              transform: 'translateX(-50%)',
              zIndex: 0
            }}
          >
            <motion.div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                backgroundColor: 'var(--accent, #B08D57)',
                height: `${scrollProgress * 100}%`,
                boxShadow: '0 0 10px var(--accent, #B08D57)'
              }}
            />
          </div>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
            {education.map((item, i) => (
              <TimelineItem 
                key={i}
                year={item.year}
                title={item.title}
                subtitle={item.subtitle}
                isLeft={i % 2 === 0}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundColor: 'var(--panel, rgba(29,27,22,0.55))',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--line, rgba(176,141,87,0.28))',
            borderRadius: '12px',
            padding: '3rem',
          }}
        >
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '1.4rem', color: 'var(--ink, #F5E6C8)', marginBottom: '2rem', textAlign: 'center' }}>
            Certifications
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {certifications.map((cert, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ color: 'var(--accent, #B08D57)', fontSize: '1.2rem', lineHeight: 1 }}>&gt;</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', color: 'var(--ink-dim, #c9b790)', lineHeight: 1.5 }}>
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
