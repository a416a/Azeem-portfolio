import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NebulaProps {
  scrollProgress: number;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  uniform float opacity;
  
  varying vec2 vUv;
  
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    vec2 uv = vUv * 3.0;
    
    float noise1 = snoise(uv + time * 0.05);
    float noise2 = snoise(uv * 2.0 - time * 0.03);
    float noise3 = snoise(uv * 4.0 + time * 0.02);
    
    float finalNoise = (noise1 + noise2 * 0.5 + noise3 * 0.25) * 0.5 + 0.5;
    
    vec3 finalColor = mix(color1, color2, finalNoise);
    finalColor = mix(finalColor, color3, smoothstep(0.4, 0.8, noise1));
    
    float dist = distance(vUv, vec2(0.5));
    float alpha = smoothstep(0.5, 0.1, dist) * opacity * finalNoise;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

const Nebula: React.FC<NebulaProps> = ({ scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const uniforms1 = useMemo(() => ({
    time: { value: 0 },
    color1: { value: new THREE.Color('#1a0a2e') },
    color2: { value: new THREE.Color('#3A2F1F') },
    color3: { value: new THREE.Color('#0a0a1a') },
    opacity: { value: 0.12 }
  }), []);
  
  const uniforms2 = useMemo(() => ({
    time: { value: 100 },
    color1: { value: new THREE.Color('#0a0a1a') },
    color2: { value: new THREE.Color('#1a0a2e') },
    color3: { value: new THREE.Color('#3A2F1F') },
    opacity: { value: 0.1 }
  }), []);

  useFrame((state) => {
    uniforms1.time.value = state.clock.elapsedTime;
    uniforms2.time.value = state.clock.elapsedTime * 0.8;
    
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
    
    uniforms1.opacity.value = 0.12 - (scrollProgress * 0.05);
    uniforms2.opacity.value = 0.1 - (scrollProgress * 0.04);
  });

  return (
    <group ref={groupRef} position={[0, 0, -15]}>
      <mesh position={[-5, 2, 0]}>
        <planeGeometry args={[30, 30]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms1}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[6, -4, -5]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[40, 40]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms2}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export default Nebula;
