"use client";

import * as React from "react";
import { Float, OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function CrystalCore({ reducedMotion, lightMode }: { reducedMotion: boolean; lightMode: boolean }) {
  const groupRef = React.useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.14;
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, -0.08, 3, delta);
  });

  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.35}>
      <group ref={groupRef} position={[0, 0.65, 0]}>
        <mesh>
          <icosahedronGeometry args={[1.72, 2]} />
          <meshPhysicalMaterial
            color={lightMode ? "#c9dcff" : "#111936"}
            roughness={0.08}
            metalness={0.2}
            transmission={lightMode ? 0.3 : 0.48}
            thickness={1.6}
            transparent
            opacity={0.96}
            clearcoat={1}
            clearcoatRoughness={0.05}
            emissive={lightMode ? "#526cdb" : "#241164"}
            emissiveIntensity={lightMode ? 0.18 : 0.55}
            flatShading
          />
        </mesh>
        <mesh scale={1.012}>
          <icosahedronGeometry args={[1.72, 2]} />
          <meshBasicMaterial color="#7f67ff" wireframe transparent opacity={0.68} />
        </mesh>
        <mesh scale={0.72}>
          <icosahedronGeometry args={[1.72, 1]} />
          <meshPhysicalMaterial color="#38dfff" roughness={0.1} emissive="#3be8ff" emissiveIntensity={1.8} transparent opacity={0.78} />
        </mesh>
        <pointLight color="#7c5cff" intensity={8} distance={9} decay={2} />
        <pointLight color="#3be8ff" position={[0, -1.2, 0]} intensity={6} distance={8} decay={2} />
      </group>
    </Float>
  );
}

function Pedestal() {
  return (
    <group position={[0, -1.55, 0]}>
      <mesh receiveShadow>
        <cylinderGeometry args={[2.35, 2.65, 0.22, 96]} />
        <meshPhysicalMaterial color="#0a1023" roughness={0.28} metalness={0.72} clearcoat={0.9} />
      </mesh>
      <mesh position={[0, 0.17, 0]}>
        <torusGeometry args={[2.06, 0.055, 18, 160]} />
        <meshBasicMaterial color="#7c5cff" transparent opacity={0.95} />
      </mesh>
      <mesh position={[0, 0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.1, 1.18, 128]} />
        <meshBasicMaterial color="#3be8ff" transparent opacity={0.75} side={THREE.DoubleSide} />
      </mesh>
      {[0.72, 1.45, 2.65].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, index * 0.18]} position={[0, 0.25 + index * 0.01, 0]}>
          <torusGeometry args={[radius, index === 2 ? 0.018 : 0.012, 12, 160]} />
          <meshBasicMaterial color={index % 2 === 0 ? "#3be8ff" : "#7c5cff"} transparent opacity={0.38} />
        </mesh>
      ))}
    </group>
  );
}

function Satellites({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = React.useRef<THREE.Group>(null);
  const compact = useThree((state) => state.size.width < 640);
  const count = compact ? 5 : 9;

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y -= delta * 0.12;
  });

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      {Array.from({ length: count }).map((_, index) => {
        const angle = (index / count) * Math.PI * 2;
        const radius = 3.15 + (index % 2) * 0.45;
        return (
          <Float key={index} speed={1 + index * 0.04} rotationIntensity={0.2} floatIntensity={0.25}>
            <mesh position={[Math.sin(angle) * radius, Math.sin(index * 1.7) * 0.5, Math.cos(angle) * radius]}>
              <sphereGeometry args={[0.08 + (index % 3) * 0.025, 18, 18]} />
              <meshStandardMaterial color={index % 2 === 0 ? "#3be8ff" : "#8067ff"} emissive={index % 2 === 0 ? "#3be8ff" : "#8067ff"} emissiveIntensity={1.1} />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function ParticleField({ lightMode }: { lightMode: boolean }) {
  const positions = React.useMemo(() => {
    const points = new Float32Array(180 * 3);
    for (let index = 0; index < 180; index += 1) {
      const angle = index * 2.399963;
      const radius = 4.5 + (index % 11) * 0.25;
      points[index * 3] = Math.cos(angle) * radius;
      points[index * 3 + 1] = ((index % 23) - 11) * 0.24;
      points[index * 3 + 2] = Math.sin(angle) * radius;
    }
    return points;
  }, []);

  return (
    <points>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial color={lightMode ? "#526a9d" : "#718cff"} size={0.025} transparent opacity={lightMode ? 0.25 : 0.48} sizeAttenuation />
    </points>
  );
}

export function TechCardsScene({ reducedMotion, lightMode }: { reducedMotion: boolean; lightMode: boolean }) {
  const background = lightMode ? "#eaf2ff" : "#050711";

  return (
    <>
      <color attach="background" args={[background]} />
      <fog attach="fog" args={[background, 9, 16]} />
      <ambientLight intensity={lightMode ? 1.35 : 0.55} />
      <directionalLight position={[5, 7, 4]} intensity={lightMode ? 3 : 2.4} color={lightMode ? "#ffffff" : "#dce5ff"} />
      <directionalLight position={[-4, 0, -3]} intensity={1.5} color="#3be8ff" />
      <spotLight position={[0, 6, 2]} angle={0.45} penumbra={0.8} intensity={5} color="#8067ff" />
      <ParticleField lightMode={lightMode} />
      <CrystalCore reducedMotion={reducedMotion} lightMode={lightMode} />
      <Pedestal />
      <Satellites reducedMotion={reducedMotion} />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom
        enableRotate
        minDistance={6.4}
        maxDistance={10.2}
        minPolarAngle={Math.PI * 0.27}
        maxPolarAngle={Math.PI * 0.68}
        rotateSpeed={0.62}
        zoomSpeed={0.72}
        dampingFactor={0.075}
        enableDamping
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.25}
        target={[0, -0.15, 0]}
      />
    </>
  );
}
