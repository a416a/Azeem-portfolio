import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Glass effect on scroll
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
      
      // Active section highlighting
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        if (currentScrollY >= sectionTop - 150 && currentScrollY < sectionTop + sectionHeight - 150) {
          setActiveSection(section.getAttribute('id') || '');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 900,
          transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
          transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
          backgroundColor: isScrolled ? 'rgba(5,7,10,0.6)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--line, rgba(176,141,87,0.28))' : '1px solid transparent',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo */}
          <a href="#root" data-cursor="pointer" onClick={(e) => scrollToSection(e, '#root')} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--ink, #F5E6C8)', fontWeight: 600 }}>M</span>
            <span style={{ width: '4px', height: '4px', backgroundColor: 'var(--accent, #B08D57)', borderRadius: '50%', margin: '0 4px', boxShadow: '0 0 8px var(--accent, #B08D57)' }}></span>
            <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--ink, #F5E6C8)', fontWeight: 600 }}>Azeem</span>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: 'none' }} className="desktop-nav">
            <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    data-cursor="pointer"
                    onClick={(e) => scrollToSection(e, link.href)}
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.82rem',
                      color: activeSection === link.href.substring(1) ? 'var(--accent, #B08D57)' : 'var(--ink-dim, #c9b790)',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent, #B08D57)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = activeSection === link.href.substring(1) ? 'var(--accent, #B08D57)' : 'var(--ink-dim, #c9b790)')}
                  >
                    {activeSection === link.href.substring(1) && (
                      <span style={{ position: 'absolute', left: '-12px', width: '4px', height: '4px', backgroundColor: 'var(--accent, #B08D57)', borderRadius: '50%', boxShadow: '0 0 6px var(--accent, #B08D57)' }} />
                    )}
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Hamburger */}
          <button 
            className="mobile-toggle"
            data-cursor="pointer"
            onClick={() => setMobileMenuOpen(true)}
            style={{ display: 'flex', flexDirection: 'column', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', zIndex: 1000 }}
          >
            <span style={{ width: '24px', height: '1px', backgroundColor: 'var(--accent, #B08D57)' }} />
            <span style={{ width: '24px', height: '1px', backgroundColor: 'var(--accent, #B08D57)' }} />
            <span style={{ width: '24px', height: '1px', backgroundColor: 'var(--accent, #B08D57)' }} />
          </button>
        </div>
        
        <style>{`
          @media (min-width: 768px) {
            .desktop-nav { display: block !important; }
            .mobile-toggle { display: none !important; }
          }
        `}</style>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              backgroundColor: 'rgba(5,7,10,0.95)',
              backdropFilter: 'blur(20px)',
              zIndex: 950,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <button 
              onClick={() => setMobileMenuOpen(false)}
              style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: 'var(--accent, #B08D57)', fontSize: '2rem', fontFamily: 'Inter, sans-serif' }}
            >
              X
            </button>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '2rem', listStyle: 'none', padding: 0, textAlign: 'center' }}>
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontStyle: 'italic',
                      fontSize: '2rem',
                      color: 'var(--ink, #F5E6C8)',
                      textDecoration: 'none',
                    }}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
