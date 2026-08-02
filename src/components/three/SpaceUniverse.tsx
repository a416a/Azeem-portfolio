import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import StarField from './StarField';
import Nebula from './Nebula';
import FloatingGeometry from './FloatingGeometry';
import ParticleSystem from './ParticleSystem';
import CinematicCamera from './CinematicCamera';
import PostFX from './PostFX';

interface SpaceUniverseProps {
  scrollProgress: number;
}

const SpaceUniverse: React.FC<SpaceUniverseProps> = ({ scrollProgress }) => {
  // Plain ref (not React state) — this value is only read inside the
  // per-frame render loop, so updating it must not trigger a React
  // re-render of the whole scene on every mousemove event.
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position from -1 to 1
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#090909]">
      <Canvas
        camera={{ fov: 60, near: 0.1, far: 1000, position: [0, 0, 8] }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={['#090909', 18, 95]} />
        <CinematicCamera scrollProgress={scrollProgress} mousePosition={mousePosition} />
        
        <ambientLight intensity={0.08} />
        <directionalLight position={[10, 10, 5]} intensity={0.18} color="#F5E6C8" />
        <pointLight position={[0, 0, 3 - scrollProgress * 24]} intensity={0.25} color="#B08D57" distance={42} />
        
        <StarField scrollProgress={scrollProgress} />
        <Nebula scrollProgress={scrollProgress} />
        <FloatingGeometry scrollProgress={scrollProgress} />
        <ParticleSystem scrollProgress={scrollProgress} />
        
        <PostFX scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};

export default SpaceUniverse;
