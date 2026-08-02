import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { portfolioData } from '../../data/portfolio';

export const ContactScene: React.FC = () => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [focused, setFocused] = useState<{ [key: string]: boolean }>({});

  const handleFocus = (name: string) => setFocused(prev => ({ ...prev, [name]: true }));
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
    if (!e.target.value) {
      setFocused(prev => ({ ...prev, [name]: false }));
    }
  };

  const labelStyle = (isFocused: boolean): React.CSSProperties => ({
    position: 'absolute',
    left: 0,
    top: isFocused ? '-20px' : '10px',
    fontSize: isFocused ? '0.75rem' : '0.9rem',
    color: isFocused ? 'var(--accent, #B08D57)' : 'var(--ink-dim, #c9b790)',
    transition: 'all 0.3s ease',
    fontFamily: 'Inter, sans-serif',
    pointerEvents: 'none',
  });

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--line, rgba(176,141,87,0.28))',
    color: 'var(--ink, #F5E6C8)',
    padding: '10px 0',
    fontFamily: 'Inter, sans-serif',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  return (
    <section id="contact" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8rem 2rem' }}>
        <motion.div 
          ref={containerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '800px', width: '100%', margin: '0 auto' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: 'var(--accent, #B08D57)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              06 / Contact
            </span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--ink, #F5E6C8)', marginTop: '0.5rem', marginBottom: '1rem' }}>
              Let's work together.
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--ink-dim, #c9b790)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
              Open to freelance data analytics, automation, and research collaborations - reach out directly.
            </p>
          </div>

          <div 
            style={{
              backgroundColor: 'var(--panel, rgba(29,27,22,0.55))',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--line, rgba(176,141,87,0.28))',
              borderRadius: '16px',
              padding: '3rem',
              marginBottom: '3rem'
            }}
          >
            <form action={`mailto:${portfolioData.contact.email}`} method="post" encType="text/plain" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div style={{ position: 'relative' }}>
                <label style={labelStyle(focused['name'])}>Name</label>
                <input 
                  type="text" 
                  name="name"
                  onFocus={() => handleFocus('name')}
                  onBlur={(e) => handleBlur(e, 'name')}
                  style={inputStyle}
                  onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = 'var(--accent, #B08D57)'}
                  onMouseLeave={(e) => {
                    if (document.activeElement !== e.currentTarget) {
                      e.currentTarget.style.borderBottomColor = 'var(--line, rgba(176,141,87,0.28))';
                    }
                  }}
                  data-cursor="pointer"
                />
              </div>

              <div style={{ position: 'relative' }}>
                <label style={labelStyle(focused['email'])}>Email</label>
                <input 
                  type="email" 
                  name="email"
                  onFocus={() => handleFocus('email')}
                  onBlur={(e) => handleBlur(e, 'email')}
                  style={inputStyle}
                  onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = 'var(--accent, #B08D57)'}
                  onMouseLeave={(e) => {
                    if (document.activeElement !== e.currentTarget) {
                      e.currentTarget.style.borderBottomColor = 'var(--line, rgba(176,141,87,0.28))';
                    }
                  }}
                  data-cursor="pointer"
                />
              </div>

              <div style={{ position: 'relative' }}>
                <label style={labelStyle(focused['message'])}>Message</label>
                <textarea 
                  name="message"
                  rows={4}
                  onFocus={() => handleFocus('message')}
                  onBlur={(e) => handleBlur(e, 'message')}
                  style={{ ...inputStyle, resize: 'none' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = 'var(--accent, #B08D57)'}
                  onMouseLeave={(e) => {
                    if (document.activeElement !== e.currentTarget) {
                      e.currentTarget.style.borderBottomColor = 'var(--line, rgba(176,141,87,0.28))';
                    }
                  }}
                  data-cursor="pointer"
                />
              </div>

              <button 
                type="submit"
                data-cursor="pointer"
                style={{
                  backgroundColor: 'var(--accent, #B08D57)',
                  color: '#090909',
                  padding: '1rem 2rem',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 500,
                  fontFamily: 'Inter, sans-serif',
                  alignSelf: 'flex-start',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  marginTop: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(176,141,87,0.4)';
                  e.currentTarget.style.backgroundColor = '#c5a36c';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.backgroundColor = 'var(--accent, #B08D57)';
                }}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Links & Social */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href={`mailto:${portfolioData.contact.email}`} data-cursor="pointer" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.86rem', color: 'var(--ink-dim, #c9b790)', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent, #B08D57)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-dim, #c9b790)'}>{portfolioData.contact.email}</a>
              <a href={`tel:${portfolioData.contact.phone.replace(/\s/g, '')}`} data-cursor="pointer" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.86rem', color: 'var(--ink-dim, #c9b790)', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent, #B08D57)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-dim, #c9b790)'}>{portfolioData.contact.phone}</a>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <a 
                href={portfolioData.contact.github} 
                target="_blank" 
                rel="noreferrer"
                data-cursor="pointer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '8px 16px', border: '1px solid var(--line, rgba(176,141,87,0.28))', borderRadius: '20px',
                  color: 'var(--ink, #F5E6C8)', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem',
                  transition: 'all 0.3s ease', backgroundColor: 'rgba(29,27,22,0.4)'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent, #B08D57)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line, rgba(176,141,87,0.28))'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <FiGithub /> GitHub
              </a>
              <a 
                href={portfolioData.contact.linkedin} 
                target="_blank" 
                rel="noreferrer"
                data-cursor="pointer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '8px 16px', border: '1px solid var(--line, rgba(176,141,87,0.28))', borderRadius: '20px',
                  color: 'var(--ink, #F5E6C8)', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem',
                  transition: 'all 0.3s ease', backgroundColor: 'rgba(29,27,22,0.4)'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent, #B08D57)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line, rgba(176,141,87,0.28))'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <FiLinkedin /> LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer style={{ width: '100%', borderTop: '1px solid rgba(176,141,87,0.1)', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--ink-dim, #c9b790)' }}>
          Copyright 2026 {portfolioData.name}
        </div>
        
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          data-cursor="pointer"
          style={{
            background: 'none', border: 'none', 
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--ink-dim, #c9b790)', 
            cursor: 'pointer', transition: 'color 0.3s ease', display: 'flex', alignItems: 'center', gap: '4px'
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent, #B08D57)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-dim, #c9b790)'}
        >
          ^ Back to top
        </button>

        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--ink-dim, #c9b790)' }}>
          Faisalabad, Pakistan
        </div>
      </footer>
    </section>
  );
};
