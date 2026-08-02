import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface StarFieldProps {
  scrollProgress: number;
}

const generateStars = (count: number, radius: number, depth: number) => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * Math.sqrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    
    positions[i * 3] = r * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(theta);
    positions[i * 3 + 2] = 12 - Math.random() * depth;
  }
  return positions;
};

const StarField: React.FC<StarFieldProps> = ({ scrollProgress }) => {
  const layer1Ref = useRef<THREE.Points>(null);
  const layer2Ref = useRef<THREE.Points>(null);
  const layer3Ref = useRef<THREE.Points>(null);

  const layer1Positions = useMemo(() => generateStars(3200, 95, 120), []);
  const layer2Positions = useMemo(() => generateStars(1700, 62, 90), []);
  const layer3Positions = useMemo(() => generateStars(700, 34, 64), []);

  useFrame((_, delta) => {
    if (layer1Ref.current) {
      layer1Ref.current.rotation.y -= delta * 0.005;
      layer1Ref.current.rotation.x -= delta * 0.002;
      layer1Ref.current.position.z = scrollProgress * 10;
    }
    if (layer2Ref.current) {
      layer2Ref.current.rotation.y -= delta * 0.01;
      layer2Ref.current.rotation.x -= delta * 0.005;
      layer2Ref.current.position.z = scrollProgress * 20;
    }
    if (layer3Ref.current) {
      layer3Ref.current.rotation.y -= delta * 0.015;
      layer3Ref.current.rotation.z -= delta * 0.005;
      layer3Ref.current.position.z = scrollProgress * 34;
    }
  });

  return (
    <group>
      <Points ref={layer1Ref} positions={layer1Positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#f5e6c8"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
      <Points ref={layer2Ref} positions={layer2Positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#e3c288"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.3}
        />
      </Points>
      <Points ref={layer3Ref} positions={layer3Positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#B08D57"
          size={0.1}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
};

export default StarField;
