import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolio';

interface HeroSceneProps {
  isLoaded: boolean;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ isLoaded }) => {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const tl = gsap.timeline();

    // 1. Eyebrow fade in
    tl.to(eyebrowRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' })
      
      // 2. Name clip-path reveal
      .fromTo(nameRef.current, 
        { clipPath: 'inset(0 100% 0 0)' }, 
        { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power2.out' }, 
        '-=0.1'
      );

    // 3. Title words stagger (handled by wrapping words in spans in the DOM)
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('.word');
      tl.fromTo(words, 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      );
    }

    // 4. Description fade up
    tl.fromTo(descRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 
      '-=0.2'
    )
    
    // 5. Buttons slide up
    .fromTo(buttonsRef.current?.children || [], 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.3'
    )
    
    // 6. Portrait scale+fade
    .fromTo(portraitRef.current, 
      { scale: 0.92, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.8'
    )
    
    // 7. Scroll indicator pulse starts
    .to(scrollIndicatorRef.current, { opacity: 1, duration: 0.5 });
    
  }, [isLoaded]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!portraitRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xPos = (clientX / innerWidth - 0.5) * -15; // move opposite
    const yPos = (clientY / innerHeight - 0.5) * -15;
    
    gsap.to(portraitRef.current, {
      x: xPos,
      y: yPos,
      duration: 1,
      ease: 'power2.out'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80 && scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.3 });
      } else if (window.scrollY <= 80 && scrollIndicatorRef.current && isLoaded) {
        gsap.to(scrollIndicatorRef.current, { opacity: 1, duration: 0.3 });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaded]);

  const titleText = portfolioData.heroTitle;
  
  return (
    <section 
      id="root" 
      className="hero-section"
      onMouseMove={handleMouseMove}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: '1440px', width: '100%', margin: '0 auto', padding: '0 2rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        
        {/* Left Column */}
        <div className="hero-left" style={{ flex: '1 1 55%', paddingRight: '2rem', zIndex: 2, pointerEvents: 'none' }}>
          
          <div ref={eyebrowRef} style={{ opacity: 0, display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent, #B08D57)', borderRadius: '50%', boxShadow: '0 0 8px var(--accent)', marginRight: '12px' }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--accent, #B08D57)', letterSpacing: '0.1em' }}>
              {portfolioData.eyebrow.toUpperCase()}
            </span>
          </div>

          <h1 
            ref={nameRef}
            style={{ 
              fontFamily: 'Playfair Display, serif', 
              fontSize: 'clamp(2.8rem, 6vw, 5rem)', 
              fontWeight: 600, 
              color: 'var(--ink, #F5E6C8)',
              fontStyle: 'italic',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
              clipPath: 'inset(0 100% 0 0)' // initial state
            }}
          >
            {portfolioData.name}
          </h1>

          <h2 ref={titleRef} style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1rem, 2vw, 1.4rem)', color: 'var(--ink-dim, #c9b790)', fontStyle: 'italic', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
            {titleText.split(' ').map((word, i) => (
              <span key={i} className="word" style={{ opacity: 0, display: 'inline-block' }}>{word}</span>
            ))}
          </h2>

          <p ref={descRef} style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--ink-dim, #c9b790)', maxWidth: '520px', lineHeight: 1.75, opacity: 0 }}>
            {portfolioData.heroDescription}
          </p>

          <div ref={buttonsRef} style={{ display: 'flex', gap: '1rem', marginTop: '32px', pointerEvents: 'auto' }}>
            <a 
              href="#projects"
              data-cursor="pointer"
              style={{
                backgroundColor: 'var(--accent, #B08D57)',
                color: '#090909',
                padding: '0.875rem 1.75rem',
                borderRadius: '4px',
                fontWeight: 500,
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.3s ease',
                display: 'inline-block'
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
              View Research -&gt;
            </a>
            <a 
              href="#contact"
              data-cursor="pointer"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid var(--line, rgba(176,141,87,0.28))',
                color: 'var(--ink, #F5E6C8)',
                padding: '0.875rem 1.75rem',
                borderRadius: '4px',
                fontWeight: 500,
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent, #B08D57)';
                e.currentTarget.style.color = 'var(--accent, #B08D57)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--line, rgba(176,141,87,0.28))';
                e.currentTarget.style.color = 'var(--ink, #F5E6C8)';
              }}
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div className="hero-right" style={{ flex: '1 1 45%', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '150%', height: '150%', background: 'radial-gradient(circle, rgba(176,141,87,0.06) 0%, transparent 60%)', zIndex: -1 }} />
          
          <motion.div 
            ref={portraitRef}
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            style={{ opacity: 0, position: 'relative' }}
          >
            {/* Blackhole portal encircling the portrait */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '86%',
                height: '86%',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            >
              <div style={{
                position: 'absolute',
                inset: '-14%',
                borderRadius: '50%',
                background: 'radial-gradient(circle at center, rgba(176,141,87,0.16) 0%, rgba(176,141,87,0.06) 45%, transparent 72%)',
                filter: 'blur(4px)',
              }} />
              <div className="blackhole-ring" style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, transparent 0%, #B08D57 20%, #F5E6C8 32%, #B08D57 44%, transparent 60%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(circle, transparent 68%, black 72%, black 80%, transparent 84%)',
                maskImage: 'radial-gradient(circle, transparent 68%, black 72%, black 80%, transparent 84%)',
                opacity: 0.5,
              }} />
              <div style={{
                position: 'absolute',
                inset: '10%',
                borderRadius: '50%',
                background: 'radial-gradient(circle at center, #050505 0%, #050505 55%, transparent 82%)',
                opacity: 0.55,
              }} />
            </div>

            <img 
              src="/portrait-nobg.png" 
              alt={portfolioData.name} 
              style={{
                position: 'relative',
                zIndex: 1,
                width: 'min(42vw, 440px)',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '8px',
                filter: 'grayscale(1) contrast(1.32) brightness(0.88) sepia(0.08)',
                mixBlendMode: 'screen',
                opacity: 0.92,
                boxShadow: '0 0 90px rgba(0,0,0,0.42), 0 0 120px rgba(176,141,87,0.12)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 78%, transparent 99%)',
                maskImage: 'linear-gradient(to bottom, black 78%, transparent 99%)',
              }} 
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        style={{
          position: 'fixed',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 10
        }}
      >
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <span style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--accent, #B08D57)', fontSize: '0.7rem', marginBottom: '4px' }}>v</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-dim, #c9b790)', fontSize: '0.65rem', textTransform: 'uppercase' }}>scroll</span>
        </motion.div>
      </div>
      
      <style>{`
        @media (max-width: 900px) {
          .hero-section > div { flex-direction: column-reverse; text-align: center; justify-content: center; padding-top: 100px; }
          .hero-left { padding-right: 0 !important; align-items: center; display: flex; flex-direction: column; }
          .hero-left h1, .hero-left h2, .hero-left p { text-align: center; margin-left: auto; margin-right: auto; }
          .hero-left > div:first-child { justify-content: center; }
          .hero-left > div:last-child { justify-content: center; flex-direction: column; width: 100%; max-width: 300px; }
          .hero-left > div:last-child a { width: 100%; text-align: center; }
          .hero-right { margin-bottom: 3rem; }
          .hero-right img { width: 100% !important; max-width: 240px; }
        }
      `}</style>
    </section>
  );
};
