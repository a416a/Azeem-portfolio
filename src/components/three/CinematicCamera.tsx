import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CinematicCameraProps {
  scrollProgress: number;
  mousePosition: React.RefObject<{ x: number; y: number }>;
}

const CinematicCamera: React.FC<CinematicCameraProps> = ({ scrollProgress, mousePosition }) => {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 8));
  const targetLook = useRef(new THREE.Vector3(0, 0, -6));

  useFrame((state, delta) => {
    const easedProgress = THREE.MathUtils.smoothstep(scrollProgress, 0, 1);
    const targetZ = THREE.MathUtils.lerp(8, -28, easedProgress);
    const targetX = Math.sin(easedProgress * Math.PI * 1.15) * 0.75;
    const targetY = Math.sin(easedProgress * Math.PI * 0.85) * -0.35;
    const lookX = Math.sin(easedProgress * Math.PI * 1.1) * 0.35;
    const lookY = Math.cos(easedProgress * Math.PI * 0.75) * 0.12;
    const lookZ = targetZ - 10;

    targetPos.current.set(targetX, targetY, targetZ);
    targetLook.current.set(lookX, lookY, lookZ);

    const time = state.clock.elapsedTime;
    const breathY = Math.sin(time * (Math.PI * 2 / 6)) * 0.03;
    
    const mouseOffsetX = mousePosition.current.x * 0.16;
    const mouseOffsetY = mousePosition.current.y * 0.12;

    const finalPos = new THREE.Vector3(
      targetPos.current.x + mouseOffsetX,
      targetPos.current.y + breathY + mouseOffsetY,
      targetPos.current.z
    );

    camera.position.lerp(finalPos, delta * 1.65);

    const currentLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
    currentLookAt.lerp(targetLook.current, delta * 1.55);
    camera.lookAt(currentLookAt);
    camera.fov = THREE.MathUtils.lerp(camera.fov, 60 + easedProgress * 4, delta * 0.8);
    camera.updateProjectionMatrix();
  });

  return null;
};

export default CinematicCamera;
