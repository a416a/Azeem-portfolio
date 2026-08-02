import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ServiceCard: React.FC<{ title: string; desc: string }> = ({ title, desc }) => {
  return (
    <div
      data-cursor="pointer"
      style={{
        backgroundColor: 'var(--panel, rgba(29,27,22,0.55))',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--line, rgba(176,141,87,0.28))',
        borderRadius: '12px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        cursor: 'default'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'var(--accent, #B08D57)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(176,141,87,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--line, rgba(176,141,87,0.28))';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <h3 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--ink, #F5E6C8)', marginBottom: '1rem', flexGrow: 0 }}>
        {title}
      </h3>
      <p style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--ink-dim, #c9b790)', lineHeight: 1.6, flexGrow: 1, marginBottom: '2rem' }}>
        {desc}
      </p>
      <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--accent, #B08D57)', opacity: 0.7 }} />
    </div>
  );
};

export const ServicesScene: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const services = [
    { title: 'Machine Learning Models', desc: 'Developing predictive models tailored for specific business and healthcare contexts.' },
    { title: 'Predictive Analytics', desc: 'Harnessing historical data to forecast trends and drive strategic decisions.' },
    { title: 'Interactive Dashboards', desc: 'Building responsive, real-time visualizations for actionable business intelligence.' },
    { title: 'Healthcare & Genomics AI', desc: 'Applying computational techniques to analyze biological data and survival rates.' },
    { title: 'Web Scraping & Automation', desc: 'Designing robust data extraction pipelines using Selenium and Playwright.' },
    { title: 'Data Cleaning & Structuring', desc: 'Transforming messy, high-dimensional data into analysis-ready formats.' },
    { title: 'Statistical Modeling', desc: 'Rigorously testing hypotheses to uncover hidden relationships in complex datasets.' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  return (
    <section id="services" style={{ minHeight: '100vh', padding: '8rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: '1040px', width: '100%' }}>
        
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: 'var(--accent, #B08D57)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            05 / Services
          </span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--ink, #F5E6C8)', marginTop: '0.5rem' }}>
            What I Offer
          </h2>
        </div>

        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="services-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}
        >
          {services.map((service, i) => (
            <motion.div key={i} variants={itemVariants} style={{ display: 'flex', flexDirection: 'column' }}>
              <ServiceCard title={service.title} desc={service.desc} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
