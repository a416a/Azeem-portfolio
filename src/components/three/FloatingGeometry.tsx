import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ShapeProps {
  position: [number, number, number];
  size: number;
  rotationSpeed: [number, number, number];
  geometryType: 'icosahedron' | 'octahedron' | 'tetrahedron';
  scrollProgress: number;
}

const Shape: React.FC<ShapeProps> = ({ position, size, rotationSpeed, geometryType, scrollProgress }) => {
  const meshRef = useRef<THREE.LineSegments>(null);
  
  const geometry = useMemo(() => {
    let geo;
    if (geometryType === 'icosahedron') geo = new THREE.IcosahedronGeometry(size, 0);
    else if (geometryType === 'octahedron') geo = new THREE.OctahedronGeometry(size, 0);
    else geo = new THREE.TetrahedronGeometry(size, 0);
    
    return new THREE.EdgesGeometry(geo);
  }, [geometryType, size]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed[0] * delta;
      meshRef.current.rotation.y += rotationSpeed[1] * delta;
      meshRef.current.rotation.z += rotationSpeed[2] * delta;
      
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.002;
      meshRef.current.position.z = position[2] + scrollProgress * Math.abs(position[2]) * 0.55;
    }
  });

  return (
    <lineSegments ref={meshRef} geometry={geometry} position={position}>
      <lineBasicMaterial color="#B08D57" transparent opacity={0.08} />
    </lineSegments>
  );
};

interface FloatingGeometryProps {
  scrollProgress: number;
}

const FloatingGeometry: React.FC<FloatingGeometryProps> = ({ scrollProgress }) => {
  const shapes = useMemo(() => [
    { type: 'icosahedron' as const, pos: [-6, 3, -8] as [number, number, number], size: 1.2, speed: [0.1, 0.2, 0.05] as [number, number, number] },
    { type: 'octahedron' as const, pos: [7, -2, -12] as [number, number, number], size: 1.5, speed: [-0.05, 0.1, 0.15] as [number, number, number] },
    { type: 'tetrahedron' as const, pos: [-4, -4, -6] as [number, number, number], size: 0.8, speed: [0.2, -0.1, 0.05] as [number, number, number] },
    { type: 'icosahedron' as const, pos: [5, 5, -15] as [number, number, number], size: 1.0, speed: [0.08, 0.08, -0.1] as [number, number, number] },
    { type: 'octahedron' as const, pos: [2, 1, -4] as [number, number, number], size: 0.4, speed: [0.3, 0.2, 0.1] as [number, number, number] },
  ], []);

  return (
    <group>
      {shapes.map((shape, i) => (
        <Shape 
          key={i}
          position={shape.pos}
          size={shape.size}
          rotationSpeed={shape.speed}
          geometryType={shape.type}
          scrollProgress={scrollProgress}
        />
      ))}
    </group>
  );
};

export default FloatingGeometry;
