import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import SpaceUniverse from './components/three/SpaceUniverse';
import { CinematicLoader } from './components/loading/CinematicLoader';
import { CustomCursor } from './components/layout/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { HeroScene } from './components/sections/HeroScene';
import { AboutScene } from './components/sections/AboutScene';
import { ProjectsScene } from './components/sections/ProjectsScene';
import { SkillsScene } from './components/sections/SkillsScene';
import { ExperienceScene } from './components/sections/ExperienceScene';
import { ServicesScene } from './components/sections/ServicesScene';
import { ContactScene } from './components/sections/ContactScene';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, [handleScrollProgress]);

  const handleLoaderComplete = useCallback(() => {
    setShowLoader(false);
    setIsLoaded(true);
  }, []);

  return (
    <>
      <CustomCursor />

      <AnimatePresence>
        {showLoader && (
          <CinematicLoader onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      <SpaceUniverse scrollProgress={scrollProgress} />

      <Navbar />

      <main className="relative z-[1]">
        <HeroScene isLoaded={isLoaded} />
        <AboutScene />
        <ProjectsScene />
        <SkillsScene />
        <ExperienceScene />
        <ServicesScene />
        <ContactScene />
      </main>
    </>
  );
}

export default App;
