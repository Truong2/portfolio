"use client";

import * as React from "react";
import { Float, OrbitControls, RoundedBox, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { heroHighlightTech } from "@/data/profile";

const INNER_RADIUS = 2.45;
const OUTER_RADIUS = 3.65;
const CARD_WIDTH = 1.45;
const CARD_HEIGHT = 0.78;
const CARD_COLORS = ["#6f5cf5", "#13bfe8", "#8874ff", "#2aa9df"];

interface TechCardProps {
  label: string;
  angle: number;
  radius: number;
  y: number;
  color: string;
  lightMode: boolean;
}

function TechCard({ label, angle, radius, y, color, lightMode }: TechCardProps) {
  const groupRef = React.useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetScale = hovered ? 1.08 : 1;
    groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 8, delta);
    groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, targetScale, 8, delta);
    groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, targetScale, 8, delta);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.36}>
      <group
        ref={groupRef}
        position={[x, y, z]}
        rotation={[0, angle, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <RoundedBox args={[CARD_WIDTH, CARD_HEIGHT, 0.1]} radius={0.1} smoothness={5}>
          <meshPhysicalMaterial
            color={color}
            roughness={lightMode ? 0.28 : 0.2}
            metalness={0.12}
            transmission={lightMode ? 0.08 : 0.2}
            transparent
            opacity={0.94}
            clearcoat={0.85}
            clearcoatRoughness={0.18}
            emissive={color}
            emissiveIntensity={hovered ? 0.38 : lightMode ? 0.08 : 0.14}
          />
        </RoundedBox>
        <Text
          position={[0, 0, 0.065]}
          fontSize={0.18}
          maxWidth={CARD_WIDTH - 0.2}
          textAlign="center"
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

function DeveloperCore({ reducedMotion, lightMode }: { reducedMotion: boolean; lightMode: boolean }) {
  const coreRef = React.useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (reducedMotion || !coreRef.current) return;
    coreRef.current.rotation.y += delta * 0.08;
    coreRef.current.rotation.z += delta * 0.035;
  });

  return (
    <group ref={coreRef}>
      <mesh>
        <icosahedronGeometry args={[1.22, 4]} />
        <meshPhysicalMaterial
          color={lightMode ? "#d7e5ff" : "#11182b"}
          roughness={0.1}
          metalness={0.16}
          transmission={lightMode ? 0.32 : 0.54}
          thickness={1.1}
          transparent
          opacity={0.92}
          clearcoat={1}
          clearcoatRoughness={0.08}
          emissive={lightMode ? "#6178e8" : "#20175b"}
          emissiveIntensity={lightMode ? 0.14 : 0.32}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.62, 0.018, 12, 120]} />
        <meshBasicMaterial color="#28d7f4" transparent opacity={0.62} />
      </mesh>
      <mesh rotation={[0.42, 0.1, 0.65]}>
        <torusGeometry args={[1.82, 0.012, 12, 120]} />
        <meshBasicMaterial color="#8067ff" transparent opacity={0.5} />
      </mesh>
      <Text
        position={[0, 0.08, 1.26]}
        fontSize={0.48}
        color={lightMode ? "#152448" : "#ffffff"}
        anchorX="center"
        anchorY="middle"
      >
        NVT
      </Text>
      <Text
        position={[0, -0.38, 1.24]}
        fontSize={0.105}
        color={lightMode ? "#53627f" : "#aab4d0"}
        anchorX="center"
        anchorY="middle"
      >
        FRONTEND SYSTEMS
      </Text>
      <pointLight color="#6f63ff" intensity={lightMode ? 4 : 7} distance={8} decay={2} />
    </group>
  );
}

interface OrbitLayerProps {
  labels: string[];
  radius: number;
  y: number;
  speed: number;
  reducedMotion: boolean;
  lightMode: boolean;
  offset?: number;
}

function OrbitLayer({
  labels,
  radius,
  y,
  speed,
  reducedMotion,
  lightMode,
  offset = 0,
}: OrbitLayerProps) {
  const groupRef = React.useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * speed;
  });

  return (
    <group ref={groupRef} rotation={[0.08, offset, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, y, 0]}>
        <torusGeometry args={[radius, 0.008, 8, 160]} />
        <meshBasicMaterial color={lightMode ? "#526aab" : "#7c8bb7"} transparent opacity={0.24} />
      </mesh>
      {labels.map((label, index) => (
        <TechCard
          key={label}
          label={label}
          angle={(index / labels.length) * Math.PI * 2}
          radius={radius}
          y={y + Math.sin(index * 1.7) * 0.18}
          color={CARD_COLORS[index % CARD_COLORS.length] ?? CARD_COLORS[0]}
          lightMode={lightMode}
        />
      ))}
    </group>
  );
}

function AmbientParticles({ lightMode }: { lightMode: boolean }) {
  const positions = React.useMemo(() => {
    const points = new Float32Array(150 * 3);
    for (let index = 0; index < 150; index += 1) {
      const angle = index * 2.399963;
      const radius = 4.6 + (index % 9) * 0.22;
      points[index * 3] = Math.cos(angle) * radius;
      points[index * 3 + 1] = ((index % 17) - 8) * 0.22;
      points[index * 3 + 2] = Math.sin(angle) * radius;
    }
    return points;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={lightMode ? "#536ea8" : "#89a7ff"}
        size={0.025}
        transparent
        opacity={lightMode ? 0.32 : 0.46}
        sizeAttenuation
      />
    </points>
  );
}

interface TechCardsSceneProps {
  reducedMotion: boolean;
  lightMode: boolean;
}

export function TechCardsScene({ reducedMotion, lightMode }: TechCardsSceneProps) {
  const compactScene = useThree((state) => state.size.width < 640);
  const innerTech = heroHighlightTech.slice(0, compactScene ? 4 : 6);
  const outerTech = compactScene ? heroHighlightTech.slice(4, 8) : heroHighlightTech.slice(6, 12);
  const background = lightMode ? "#edf4ff" : "#070a14";

  return (
    <>
      <color attach="background" args={[background]} />
      <fog attach="fog" args={[background, 8, 15]} />
      <ambientLight intensity={lightMode ? 1.25 : 0.78} />
      <directionalLight
        position={[5, 7, 4]}
        intensity={lightMode ? 2.8 : 2.2}
        color={lightMode ? "#ffffff" : "#d8e1ff"}
      />
      <directionalLight position={[-4, -2, -3]} intensity={1.1} color="#3be8ff" />
      <pointLight position={[0, 3, 4]} intensity={lightMode ? 2.4 : 3.2} color="#7c5cff" />

      <AmbientParticles lightMode={lightMode} />
      <DeveloperCore reducedMotion={reducedMotion} lightMode={lightMode} />
      <OrbitLayer
        labels={innerTech}
        radius={INNER_RADIUS}
        y={0.02}
        speed={0.13}
        reducedMotion={reducedMotion}
        lightMode={lightMode}
      />
      <OrbitLayer
        labels={outerTech}
        radius={OUTER_RADIUS}
        y={-0.14}
        speed={-0.075}
        reducedMotion={reducedMotion}
        lightMode={lightMode}
        offset={Math.PI / 6}
      />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom
        enableRotate
        minDistance={6.4}
        maxDistance={10.5}
        minPolarAngle={Math.PI * 0.28}
        maxPolarAngle={Math.PI * 0.72}
        rotateSpeed={0.65}
        zoomSpeed={0.7}
        dampingFactor={0.08}
        enableDamping
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.35}
        target={[0, 0, 0]}
      />
    </>
  );
}
