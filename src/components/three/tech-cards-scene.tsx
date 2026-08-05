"use client";

import * as React from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox, Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import { heroHighlightTech } from "@/data/profile";

const RADIUS = 3.2;
const CARD_WIDTH = 1.6;
const CARD_HEIGHT = 0.9;
const AUTO_ROTATE_SPEED = 0.12; // rad/s — slow, ambient idle motion

interface TechCardProps {
  label: string;
  angle: number;
  color: string;
}

function TechCard({ label, angle, color }: TechCardProps) {
  const x = Math.sin(angle) * RADIUS;
  const z = Math.cos(angle) * RADIUS;

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
      <group position={[x, 0, z]} rotation={[0, angle, 0]}>
        <RoundedBox args={[CARD_WIDTH, CARD_HEIGHT, 0.08]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color={color} roughness={0.35} metalness={0.1} />
        </RoundedBox>
        <Text
          position={[0, 0, 0.05]}
          fontSize={0.2}
          maxWidth={CARD_WIDTH - 0.3}
          textAlign="center"
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

/** Alternates between the theme's primary/accent colors for visual rhythm. */
function colorForIndex(i: number) {
  return i % 2 === 0 ? "#6366f1" : "#22b8cf";
}

interface TechCardsSceneProps {
  /** When true, skip continuous auto-rotation (still allows manual drag). */
  reducedMotion: boolean;
}

function RotatingGroup({ reducedMotion }: TechCardsSceneProps) {
  const groupRef = React.useRef<THREE.Group>(null);
  const { invalidate } = useThree();

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += AUTO_ROTATE_SPEED * delta;
    invalidate();
  });

  return (
    <group ref={groupRef}>
      {heroHighlightTech.map((label, i) => (
        <TechCard
          key={label}
          label={label}
          angle={(i / heroHighlightTech.length) * Math.PI * 2}
          color={colorForIndex(i)}
        />
      ))}
    </group>
  );
}

export function TechCardsScene({ reducedMotion }: TechCardsSceneProps) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.1} />
      <directionalLight position={[-4, -2, -4]} intensity={0.3} />
      <RotatingGroup reducedMotion={reducedMotion} />
      <OrbitControls
        enablePan={false}
        enableZoom={!reducedMotion}
        minDistance={5}
        maxDistance={9}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.7}
        autoRotate={false}
        makeDefault
      />
    </>
  );
}
