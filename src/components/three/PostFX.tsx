import React from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

interface PostFXProps {
  scrollProgress: number;
}

const PostFX: React.FC<PostFXProps> = ({ scrollProgress }) => {
  const bloomIntensity = 0.3 + (scrollProgress * 0.1);

  return (
    <EffectComposer enableNormalPass={false}>
      <Bloom 
        luminanceThreshold={0.8}
        luminanceSmoothing={0.1}
        intensity={bloomIntensity}
      />
      <Vignette 
        eskil={false} 
        offset={0.3} 
        darkness={0.6} 
      />
    </EffectComposer>
  );
};

export default PostFX;
