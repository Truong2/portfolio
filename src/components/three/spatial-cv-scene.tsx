"use client";

import * as React from "react";
import { Float, OrbitControls, RoundedBox, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";

import { type CvView, useSpatialCv } from "@/components/spatial-cv-context";

interface ViewPreset {
  position: [number, number, number];
  target: [number, number, number];
}

const VIEW_PRESETS: Record<CvView, ViewPreset> = {
  overview: { position: [0.75, 0.35, 9.7], target: [0, 0.05, 0] },
  profile: { position: [0.25, 1.7, 4.8], target: [0, 1.35, 0.1] },
  experience: { position: [-0.7, 0.5, 4.35], target: [-0.45, 0.45, 0.1] },
  projects: { position: [-0.55, -1.05, 4.25], target: [-0.4, -1.05, 0.1] },
  skills: { position: [0.8, 0.15, 4.3], target: [0.55, 0.2, 0.1] },
  education: { position: [0.8, -0.85, 4.25], target: [0.55, -0.85, 0.1] },
  contact: { position: [0.15, -1.75, 4.45], target: [0, -1.7, 0.1] },
};

const HOTSPOTS: Array<{
  view: Exclude<CvView, "overview">;
  position: [number, number, number];
  size: [number, number];
}> = [
  { view: "profile", position: [0, 1.35, 0.31], size: [3.15, 1.15] },
  { view: "experience", position: [-0.78, 0.35, 0.31], size: [1.45, 0.78] },
  { view: "skills", position: [0.82, 0.35, 0.31], size: [1.45, 0.78] },
  { view: "projects", position: [-0.78, -0.62, 0.31], size: [1.45, 0.78] },
  { view: "education", position: [0.82, -0.62, 0.31], size: [1.45, 0.78] },
  { view: "contact", position: [0, -1.52, 0.31], size: [3.15, 0.55] },
];

function CameraDirector({ reducedMotion }: { reducedMotion: boolean }) {
  const { activeView } = useSpatialCv();
  const camera = useThree((state) => state.camera);
  const controlsRef = React.useRef<OrbitControlsImpl>(null);
  const previousView = React.useRef<CvView | null>(null);
  const flying = React.useRef(true);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!controls) return;

    if (previousView.current !== activeView) {
      previousView.current = activeView;
      flying.current = true;
    }

    if (!flying.current) return;

    const preset = VIEW_PRESETS[activeView];
    const targetPosition = new THREE.Vector3(...preset.position);
    const targetLookAt = new THREE.Vector3(...preset.target);
    const strength = reducedMotion ? 18 : 5.2;
    const damping = 1 - Math.exp(-delta * strength);

    camera.position.lerp(targetPosition, damping);
    controls.target.lerp(targetLookAt, damping);
    controls.update();

    if (camera.position.distanceTo(targetPosition) < 0.025 && controls.target.distanceTo(targetLookAt) < 0.025) {
      camera.position.copy(targetPosition);
      controls.target.copy(targetLookAt);
      controls.update();
      flying.current = false;
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={false}
      enableZoom
      enableRotate
      minDistance={3.7}
      maxDistance={12.5}
      minPolarAngle={Math.PI * 0.22}
      maxPolarAngle={Math.PI * 0.76}
      rotateSpeed={0.5}
      zoomSpeed={0.72}
      dampingFactor={0.075}
      enableDamping
      target={[0, 0.05, 0]}
    />
  );
}

function HolographicBase({ lightMode }: { lightMode: boolean }) {
  return (
    <group position={[0, -2.35, 0]}>
      {[1.3, 1.75, 2.2].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, index * 0.18]}>
          <torusGeometry args={[radius, index === 1 ? 0.018 : 0.01, 10, 128]} />
          <meshBasicMaterial color={index % 2 ? "#8b5cf6" : "#22d3ee"} transparent opacity={lightMode ? 0.24 : 0.56 - index * 0.1} />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.025, 0]}>
        <circleGeometry args={[1.08, 96]} />
        <meshBasicMaterial color="#1d4ed8" transparent opacity={lightMode ? 0.05 : 0.12} />
      </mesh>
      <pointLight position={[0, 0.4, 0]} intensity={lightMode ? 2.5 : 7} color="#22d3ee" distance={6} />
    </group>
  );
}

function CoverSection({ title, subtitle, position, accent }: { title: string; subtitle: string; position: [number, number, number]; accent: string }) {
  return (
    <group position={position}>
      <RoundedBox args={[1.36, 0.62, 0.025]} radius={0.05} smoothness={3}>
        <meshBasicMaterial color="#071326" transparent opacity={0.78} />
      </RoundedBox>
      <Text position={[-0.56, 0.12, 0.026]} anchorX="left" fontSize={0.085} color={accent} letterSpacing={0.06}>{title}</Text>
      <Text position={[-0.56, -0.1, 0.026]} anchorX="left" fontSize={0.055} color="#91a0bd" maxWidth={1.15}>{subtitle}</Text>
    </group>
  );
}

function CvBook({ reducedMotion, lightMode }: { reducedMotion: boolean; lightMode: boolean }) {
  const { activeView, focusView } = useSpatialCv();
  const groupRef = React.useRef<THREE.Group>(null);
  const [hoveredView, setHoveredView] = React.useState<CvView | null>(null);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const overview = activeView === "overview";
    const targetY = overview ? -0.2 : 0;
    const targetX = overview ? -0.045 : 0;
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetY, reducedMotion ? 18 : 4.2, delta);
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetX, reducedMotion ? 18 : 4.2, delta);
  });

  const content = (
    <group ref={groupRef} rotation={[-0.045, -0.2, -0.025]}>
      <RoundedBox args={[3.75, 4.95, 0.32]} radius={0.12} smoothness={5}>
        <meshPhysicalMaterial
          color={lightMode ? "#dce8fb" : "#0c1630"}
          roughness={0.2}
          metalness={0.52}
          clearcoat={1}
          clearcoatRoughness={0.08}
          emissive={lightMode ? "#3154a8" : "#18265d"}
          emissiveIntensity={lightMode ? 0.08 : 0.24}
        />
      </RoundedBox>

      <mesh position={[-1.7, 0, 0.18]}>
        <boxGeometry args={[0.2, 4.62, 0.08]} />
        <meshStandardMaterial color={lightMode ? "#a5c9ed" : "#0a2445"} emissive="#22d3ee" emissiveIntensity={lightMode ? 0.08 : 0.35} />
      </mesh>

      <Text position={[-1.45, 2.04, 0.19]} anchorX="left" fontSize={0.1} color="#8fbaf7" letterSpacing={0.09}>CURRICULUM VITAE</Text>
      <Text position={[-1.45, 1.56, 0.19]} anchorX="left" fontSize={0.34} color={lightMode ? "#13213c" : "#f7f9ff"} maxWidth={3.0}>NGUYEN VAN TRUONG</Text>
      <Text position={[-1.45, 1.16, 0.19]} anchorX="left" fontSize={0.16} color="#8b5cf6">Frontend Developer</Text>
      <Text position={[-1.45, 0.82, 0.19]} anchorX="left" fontSize={0.072} color={lightMode ? "#52647c" : "#a9b6cf"} maxWidth={2.9} lineHeight={1.5}>
        3+ years building enterprise web applications{"\n"}across banking, mobility, health, GIS and Web3.
      </Text>

      <CoverSection title="EXPERIENCE" subtitle="Enterprise delivery · architecture" position={[-0.78, 0.28, 0.2]} accent="#a78bfa" />
      <CoverSection title="SKILLS" subtitle="React · Next · Vue · Nuxt" position={[0.82, 0.28, 0.2]} accent="#22d3ee" />
      <CoverSection title="PROJECTS" subtitle="AML · Taxi · Maritime · Web3" position={[-0.78, -0.68, 0.2]} accent="#22d3ee" />
      <CoverSection title="EDUCATION" subtitle="HUST · Engineering" position={[0.82, -0.68, 0.2]} accent="#a78bfa" />

      <RoundedBox args={[3.02, 0.46, 0.025]} radius={0.05} smoothness={3} position={[0, -1.63, 0.2]}>
        <meshBasicMaterial color="#08162b" transparent opacity={0.82} />
      </RoundedBox>
      <Text position={[-1.36, -1.63, 0.226]} anchorX="left" fontSize={0.07} color="#93a4c4">Hanoi · truong8dt@gmail.com · LinkedIn · Download CV</Text>

      {HOTSPOTS.map((spot) => {
        const hovered = hoveredView === spot.view;
        const active = activeView === spot.view;
        return (
          <mesh
            key={spot.view}
            position={spot.position}
            onClick={(event) => {
              event.stopPropagation();
              focusView(spot.view);
            }}
            onPointerOver={(event) => {
              event.stopPropagation();
              setHoveredView(spot.view);
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              setHoveredView(null);
              document.body.style.cursor = "auto";
            }}
          >
            <planeGeometry args={spot.size} />
            <meshBasicMaterial color="#22d3ee" transparent opacity={active ? 0.055 : hovered ? 0.035 : 0} depthWrite={false} />
          </mesh>
        );
      })}

      <pointLight position={[-2.2, 1.4, 1.6]} color="#22d3ee" intensity={lightMode ? 2 : 4.5} distance={7} />
      <pointLight position={[2.1, -0.6, 1.7]} color="#8b5cf6" intensity={lightMode ? 2 : 5} distance={7} />
    </group>
  );

  if (reducedMotion || activeView !== "overview") return content;
  return <Float speed={0.75} rotationIntensity={0.03} floatIntensity={0.14}>{content}</Float>;
}

function Stars({ lightMode }: { lightMode: boolean }) {
  const positions = React.useMemo(() => {
    const points = new Float32Array(120 * 3);
    for (let index = 0; index < 120; index += 1) {
      const angle = index * 2.399963;
      const radius = 4.8 + (index % 15) * 0.24;
      points[index * 3] = Math.cos(angle) * radius;
      points[index * 3 + 1] = ((index % 27) - 13) * 0.24;
      points[index * 3 + 2] = Math.sin(angle) * radius - 1.8;
    }
    return points;
  }, []);

  return (
    <points>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial color={lightMode ? "#7180a5" : "#7089ff"} size={0.022} transparent opacity={lightMode ? 0.18 : 0.42} sizeAttenuation />
    </points>
  );
}

export function SpatialCvScene({ reducedMotion, lightMode }: { reducedMotion: boolean; lightMode: boolean }) {
  const background = lightMode ? "#eaf2ff" : "#030711";

  return (
    <>
      <color attach="background" args={[background]} />
      <fog attach="fog" args={[background, 10, 17]} />
      <ambientLight intensity={lightMode ? 1.65 : 0.72} />
      <directionalLight position={[4, 7, 7]} intensity={lightMode ? 3.4 : 2.5} color={lightMode ? "#ffffff" : "#d8e4ff"} />
      <directionalLight position={[-5, -1, 3]} intensity={1.4} color="#22d3ee" />
      <Stars lightMode={lightMode} />
      <HolographicBase lightMode={lightMode} />
      <CvBook reducedMotion={reducedMotion} lightMode={lightMode} />
      <CameraDirector reducedMotion={reducedMotion} />
    </>
  );
}
