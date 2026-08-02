import { useState, useEffect } from 'react';

export function useSmoothCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let rafId: number;
    
    // Convert string to number if needed (handling '15+' -> 15)
    const targetNumber = typeof target === 'string' 
      ? parseInt((target as string).replace(/\D/g, ''), 10) || 0
      : target;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * targetNumber));
      
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCount(targetNumber);
      }
    };
    
    rafId = requestAnimationFrame(step);
    
    return () => cancelAnimationFrame(rafId);
  }, [target, duration]);

  return count;
}
