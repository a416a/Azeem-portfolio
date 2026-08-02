import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  scrollProgress: number;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ scrollProgress }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 1100;

  const { positions, opacities, speeds } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const ops = new Float32Array(particleCount);
    const spds = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 68;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 68;
      pos[i * 3 + 2] = 14 - Math.random() * 95;

      ops[i] = Math.random() > 0.95 ? 0.8 : Math.random() * 0.3 + 0.1;

      spds[i * 3] = (Math.random() - 0.5) * 0.05;
      spds[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      spds[i * 3 + 2] = Math.random() * 0.02 + 0.01;
    }

    return { positions: pos, opacities: ops, speeds: spds };
  }, []);

  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const vertexShader = `
    attribute float opacity;
    varying float vOpacity;
    void main() {
      vOpacity = opacity;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = (20.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    varying float vOpacity;
    uniform vec3 color;
    void main() {
      float d = distance(gl_PointCoord, vec2(0.5));
      if (d > 0.5) discard;
      float alpha = smoothstep(0.5, 0.1, d) * vOpacity;
      gl_FragColor = vec4(color, alpha);
    }
  `;

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const positionsAttr = pointsRef.current.geometry.attributes.position;
      const array = positionsAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const time = state.clock.elapsedTime;
        array[i * 3] += speeds[i * 3] * delta + Math.sin(time * 0.5 + i) * 0.001;
        array[i * 3 + 1] += speeds[i * 3 + 1] * delta + Math.cos(time * 0.3 + i) * 0.001;
        array[i * 3 + 2] += speeds[i * 3 + 2] * delta;
        
        if (array[i * 3] > 30) array[i * 3] = -30;
        if (array[i * 3] < -30) array[i * 3] = 30;
        if (array[i * 3 + 1] > 30) array[i * 3 + 1] = -30;
        if (array[i * 3 + 1] < -30) array[i * 3 + 1] = 30;
        array[i * 3 + 2] += scrollProgress * delta * 0.16;
        if (array[i * 3 + 2] > 18) array[i * 3 + 2] = -78;
        if (array[i * 3 + 2] < -82) array[i * 3 + 2] = 14;
      }
      positionsAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-opacity"
          args={[opacities, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ color: { value: new THREE.Color('#f5e6c8') } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleSystem;
