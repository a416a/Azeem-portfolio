import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(undefined);
  
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const mouse = useRef({ x: 0, y: 0 });
  const outer = useRef({ x: 0, y: 0 });
  const inner = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }
    
    // Hide default cursor globally
    document.body.style.cursor = 'none';
    
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="pointer"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    
    const render = () => {
      // Lerp outer cursor
      outer.current.x += (mouse.current.x - outer.current.x) * 0.35;
      outer.current.y += (mouse.current.y - outer.current.y) * 0.35;
      
      // Lerp inner cursor
      inner.current.x += (mouse.current.x - inner.current.x) * 0.55;
      inner.current.y += (mouse.current.y - inner.current.y) * 0.55;
      
      if (outerRef.current && innerRef.current) {
        outerRef.current.style.transform = `translate3d(${outer.current.x}px, ${outer.current.y}px, 0)`;
        innerRef.current.style.transform = `translate3d(${inner.current.x}px, ${inner.current.y}px, 0)`;
      }
      
      requestRef.current = requestAnimationFrame(render);
    };
    
    requestRef.current = requestAnimationFrame(render);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: '1px solid var(--accent, #B08D57)',
          opacity: isHovering ? 0.8 : 0.5,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          marginLeft: '-12px',
          marginTop: '-12px',
          transition: 'width 0.3s ease, height 0.3s ease, opacity 0.3s ease',
          ...(isHovering ? { width: '48px', height: '48px', marginLeft: '-24px', marginTop: '-24px' } : {})
        }}
      />
      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent, #B08D57)',
          pointerEvents: 'none',
          zIndex: 9999,
          marginLeft: '-3px',
          marginTop: '-3px',
        }}
      />
    </>
  );
};
