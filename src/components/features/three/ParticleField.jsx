import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Particles component that renders the actual points
const Particles = ({ count = 2000 }) => {
  const points = useRef(null);
  
  // Generate random positions for the particles
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    
    return positions;
  }, [count]);
  
  // Animation loop
  useFrame((state) => {
    if (!points.current) return;
    
    // Rotate the particles based on mouse position
    points.current.rotation.x = state.mouse.y * 0.2;
    points.current.rotation.y = state.mouse.x * 0.2;
    
    // Slow continuous rotation
    points.current.rotation.x += 0.002;
    points.current.rotation.y += 0.001;
  });
  
  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// Main component that wraps the Canvas and Particles
const ParticleField = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <Particles />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false} 
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default ParticleField;