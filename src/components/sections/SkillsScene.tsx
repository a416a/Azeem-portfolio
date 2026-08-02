import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export const SkillsScene: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const rings = [
    {
      radius: 140,
      duration: 40,
      skills: ['Data Science', 'Machine Learning', 'Healthcare & Genomics AI', 'Artificial Intelligence']
    },
    {
      radius: 250,
      duration: 55,
      reverse: true,
      skills: ['Python', 'R Programming', 'SQL', 'Data Visualization', 'Predictive Analytics']
    },
    {
      radius: 360,
      duration: 70,
      skills: ['Interactive Dashboards', 'Automation', 'Web Scraping', 'Selenium', 'Playwright', 'Git', 'GitHub']
    }
  ];

  const renderSkillPill = (skill: string) => (
    <div 
      className="skill-pill"
      style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.75rem',
        color: 'var(--ink, #F5E6C8)',
        border: '1px solid var(--accent, #B08D57)',
        backgroundColor: 'rgba(29,27,22,0.85)',
        backdropFilter: 'blur(8px)',
        padding: '8px 16px',
        borderRadius: '20px',
        whiteSpace: 'nowrap',
        boxShadow: '0 0 10px rgba(176,141,87,0.1)',
        transition: 'all 0.3s ease',
        cursor: 'default',
        boxSizing: 'border-box'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 20px rgba(176,141,87,0.4)';
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.borderColor = '#c5a36c';
        e.currentTarget.style.zIndex = '10';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 10px rgba(176,141,87,0.1)';
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.borderColor = 'var(--accent, #B08D57)';
        e.currentTarget.style.zIndex = '1';
      }}
    >
      {skill}
    </div>
  );

  return (
    <section id="skills" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyItems: 'center', padding: '6rem 2rem', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1040px', width: '100%', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: 'var(--accent, #B08D57)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            03 / Skills
          </span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--ink, #F5E6C8)', marginTop: '0.5rem' }}>
            Expertise
          </h2>
        </div>

        <motion.div 
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          style={{ position: 'relative', width: '100%', minHeight: isMobile ? 'auto' : '800px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {!isMobile ? (
            <div style={{ position: 'relative', width: '2px', height: '2px' }}>
              
              {/* Central Core */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(176,141,87,0.4) 0%, transparent 70%)',
                  boxShadow: '0 0 40px rgba(176,141,87,0.2)',
                  zIndex: 0
                }}
              />
              <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent, #B08D57)',
                  boxShadow: '0 0 15px var(--accent, #B08D57)',
                  zIndex: 2
              }} />

              {/* Orbital Rings */}
              {rings.map((ring, i) => (
                <div key={i} style={{ position: 'absolute', top: 0, left: 0 }}>
                  <div 
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: `${ring.radius * 2}px`,
                      height: `${ring.radius * 2}px`,
                      borderRadius: '50%',
                      border: '1px dashed rgba(176,141,87,0.1)',
                      pointerEvents: 'none',
                    }}
                  />
                  
                  <motion.div
                    animate={{ rotate: ring.reverse ? -360 : 360 }}
                    transition={{ repeat: Infinity, duration: ring.duration, ease: "linear" }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: 0,
                      height: 0,
                    }}
                  >
                    {ring.skills.map((skill, j) => {
                      const angle = (j / ring.skills.length) * Math.PI * 2;
                      const x = Math.cos(angle) * ring.radius;
                      const y = Math.sin(angle) * ring.radius;
                      
                      return (
                        <div 
                          key={skill}
                          style={{
                            position: 'absolute',
                            left: x,
                            top: y,
                            transform: 'translate(-50%, -50%)',
                          }}
                        >
                          {/* Counter-rotate to keep text upright */}
                          <motion.div
                            animate={{ rotate: ring.reverse ? 360 : -360 }}
                            transition={{ repeat: Infinity, duration: ring.duration, ease: "linear" }}
                          >
                            {renderSkillPill(skill)}
                          </motion.div>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>
              ))}
            </div>
          ) : (
            /* Mobile Grid */
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              {rings.flatMap(r => r.skills).map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {renderSkillPill(skill)}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
};
