import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TiltCard: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className, style }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    cardRef.current.style.borderColor = 'var(--accent, #B08D57)';
    cardRef.current.style.boxShadow = '0 10px 30px rgba(176,141,87,0.15)';
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    cardRef.current.style.borderColor = 'var(--line, rgba(176,141,87,0.28))';
    cardRef.current.style.boxShadow = 'none';
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      data-cursor="pointer"
      style={{
        transition: 'transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
        ...style
      }}
    >
      {children}
    </div>
  );
};

export const ProjectsScene: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const projects = [
    {
      id: '01',
      title: 'Gene Expression & Breast Cancer Survival Analysis',
      desc: 'Machine learning workflow in R utilizing penalised regression (LASSO & Elastic Net) and Random Survival Forests to identify prognostic gene signatures in 141 patient samples across 29.8K probes.',
      tags: ['R', 'Machine Learning', 'Genomics', 'Survival Analysis']
    },
    {
      id: '02',
      title: 'Interactive Sales Data Dashboard',
      desc: 'Dynamic dashboard providing actionable intelligence through real-time visualizations. Streamlined reporting processes and improved decision-making for executive stakeholders.',
      tags: ['Python', 'Data Visualization', 'Dashboarding', 'Analytics']
    },
    {
      id: '03',
      title: 'Conflict & Mediation Data Analysis',
      desc: 'Comprehensive statistical modeling of Civil Wars Mediation (CWM) datasets involving over 115,000 panel rows to uncover patterns in international conflict resolution.',
      tags: ['Data Engineering', 'Statistical Modeling', 'Research']
    },
    {
      id: '04',
      title: 'Automated Web Extraction System',
      desc: 'Scalable data scraping architecture built with Selenium and Playwright to extract structured information from complex, dynamic web applications.',
      tags: ['Python', 'Selenium', 'Playwright', 'Automation']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <section id="projects" style={{ minHeight: '100vh', padding: '8rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: '1040px', width: '100%' }}>
        
        <div style={{ marginBottom: '4rem' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: 'var(--accent, #B08D57)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            02 / Research & Projects
          </span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--ink, #F5E6C8)', marginTop: '0.5rem' }}>
            Selected work
          </h2>
        </div>

        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <TiltCard 
                style={{
                  backgroundColor: 'var(--panel, rgba(29,27,22,0.55))',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid var(--line, rgba(176,141,87,0.28))',
                  borderRadius: '12px',
                  padding: '2.5rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-dim, #c9b790)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  {project.id}
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '1.15rem', color: 'var(--ink, #F5E6C8)', marginBottom: '1rem', lineHeight: 1.4 }}>
                  {project.title}
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'italic', color: 'var(--ink-dim, #c9b790)', fontSize: '0.92rem', lineHeight: 1.6, flexGrow: 1, marginBottom: '2rem' }}>
                  {project.desc}
                </p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.tags.map(tag => (
                    <span 
                      key={tag}
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.72rem',
                        color: 'var(--accent, #B08D57)',
                        border: '1px solid var(--accent-dim, #3A2F1F)',
                        borderRadius: '4px',
                        padding: '4px 10px',
                        backgroundColor: 'rgba(58, 47, 31, 0.3)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
