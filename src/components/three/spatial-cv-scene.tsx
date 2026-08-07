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
  overview: { position: [0, 0.5, 10.8], target: [0, 0.2, 0] },
  profile: { position: [0, 0.65, 5.2], target: [0, 0.45, 0] },
  experience: { position: [4.9, 1.35, 5.5], target: [3.15, 1.0, 0] },
  projects: { position: [4.4, -2.35, 5.4], target: [2.9, -1.65, 0] },
  skills: { position: [-4.9, 1.35, 5.5], target: [-3.15, 1.0, 0] },
  education: { position: [-4.4, -2.35, 5.4], target: [-2.9, -1.65, 0] },
  contact: { position: [0, -3.35, 5.1], target: [0, -2.45, 0] },
};

const PANELS: Array<{
  view: CvView;
  title: string;
  eyebrow: string;
  detail: string;
  position: [number, number, number];
  size: [number, number];
  accent: string;
}> = [
  {
    view: "skills",
    title: "SKILLS",
    eyebrow: "Architecture & stack",
    detail: "React · Next.js · Vue · Nuxt\nTypeScript · Realtime · GIS",
    position: [-3.15, 1.05, 0],
    size: [2.5, 1.55],
    accent: "#3be8ff",
  },
  {
    view: "experience",
    title: "EXPERIENCE",
    eyebrow: "3+ years · enterprise",
    detail: "Banking · Mobility · Health\nGIS · Web3 · E-commerce",
    position: [3.15, 1.05, 0],
    size: [2.7, 1.55],
    accent: "#8b5cf6",
  },
  {
    view: "education",
    title: "EDUCATION",
    eyebrow: "HUST · 2019—2024",
    detail: "Electronics & Telecommunication\nEngineer · CPA 3.28/4.0",
    position: [-2.9, -1.65, 0],
    size: [2.55, 1.45],
    accent: "#60a5fa",
  },
  {
    view: "projects",
    title: "PROJECTS",
    eyebrow: "Selected delivery",
    detail: "AML · Taxi Admin · MARINER25\nSANO · METAME · DX Platform",
    position: [2.9, -1.65, 0],
    size: [2.75, 1.45],
    accent: "#22d3ee",
  },
  {
    view: "contact",
    title: "CONTACT",
    eyebrow: "Hanoi, Vietnam",
    detail: "truong8dt@gmail.com\nLinkedIn · Resume",
    position: [0, -2.75, 0.1],
    size: [2.65, 1.25],
    accent: "#a78bfa",
  },
];

function CameraDirector() {
  const { activeView } = useSpatialCv();
  const camera = useThree((state) => state.camera);
  const controlsRef = React.useRef<OrbitControlsImpl>(null);
  const flyingRef = React.useRef(true);
  const previousViewRef = React.useRef<CvView>(activeView);

  React.useEffect(() => {
    if (previousViewRef.current !== activeView) {
      previousViewRef.current = activeView;
      flyingRef.current = true;
    }
  }, [activeView]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!controls || !flyingRef.current) return;

    const preset = VIEW_PRESETS[activeView];
    const targetPosition = new THREE.Vector3(...preset.position);
    const targetLookAt = new THREE.Vector3(...preset.target);
    const damping = 1 - Math.exp(-delta * 4.6);

    camera.position.lerp(targetPosition, damping);
    controls.target.lerp(targetLookAt, damping);
    controls.update();

    if (camera.position.distanceTo(targetPosition) < 0.035 && controls.target.distanceTo(targetLookAt) < 0.035) {
      camera.position.copy(targetPosition);
      controls.target.copy(targetLookAt);
      controls.update();
      flyingRef.current = false;
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={false}
      enableZoom
      enableRotate
      minDistance={3.8}
      maxDistance={13.5}
      minPolarAngle={Math.PI * 0.2}
      maxPolarAngle={Math.PI * 0.78}
      rotateSpeed={0.56}
      zoomSpeed={0.74}
      dampingFactor={0.08}
      enableDamping
      target={[0, 0.2, 0]}
    />
  );
}

function Connector({ from, to, color }: { from: [number, number, number]; to: [number, number, number]; color: string }) {
  const midpoint = new THREE.Vector3().addVectors(new THREE.Vector3(...from), new THREE.Vector3(...to)).multiplyScalar(0.5);
  const length = new THREE.Vector3(...from).distanceTo(new THREE.Vector3(...to));
  const direction = new THREE.Vector3().subVectors(new THREE.Vector3(...to), new THREE.Vector3(...from)).normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), direction);

  return (
    <mesh position={midpoint} quaternion={quaternion}>
      <cylinderGeometry args={[0.008, 0.008, length, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
}

function ProfileCard({ active }: { active: boolean }) {
  const { focusView } = useSpatialCv();
  const [hovered, setHovered] = React.useState(false);
  const accent = "#7c5cff";

  return (
    <Float speed={1.15} rotationIntensity={0.06} floatIntensity={0.13}>
      <group
        position={[0, 0.45, 0.22]}
        onClick={() => focusView("profile")}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <RoundedBox args={[3.05, 2.35, 0.16]} radius={0.13} smoothness={5}>
          <meshPhysicalMaterial
            color={active ? "#161d3f" : "#0d132b"}
            roughness={0.2}
            metalness={0.38}
            clearcoat={1}
            emissive={accent}
            emissiveIntensity={active ? 0.28 : hovered ? 0.2 : 0.08}
          />
        </RoundedBox>
        <mesh position={[0, 0.95, 0.11]}>
          <planeGeometry args={[2.65, 0.025]} />
          <meshBasicMaterial color="#3be8ff" transparent opacity={0.7} />
        </mesh>
        <Text position={[-1.27, 0.68, 0.12]} anchorX="left" fontSize={0.14} color="#3be8ff" letterSpacing={0.08}>
          FRONTEND DEVELOPER
        </Text>
        <Text position={[-1.27, 0.25, 0.12]} anchorX="left" fontSize={0.29} color="#f6f7ff" maxWidth={2.45}>
          NGUYEN VAN TRUONG
        </Text>
        <Text position={[-1.27, -0.15, 0.12]} anchorX="left" fontSize={0.105} color="#a8b2cf" maxWidth={2.45} lineHeight={1.45}>
          React · Next.js · Vue · Nuxt · TypeScript{"\n"}Enterprise UI · Realtime · GIS · Web3
        </Text>
        <Text position={[-1.27, -0.76, 0.12]} anchorX="left" fontSize={0.09} color="#7c88a8">
          SELECT TO FOCUS · DRAG TO ORBIT
        </Text>
      </group>
    </Float>
  );
}

function CvPanel({ panel, active }: { panel: (typeof PANELS)[number]; active: boolean }) {
  const { focusView } = useSpatialCv();
  const [hovered, setHovered] = React.useState(false);
  const [width, height] = panel.size;

  return (
    <Float speed={0.95} rotationIntensity={0.045} floatIntensity={0.1}>
      <group
        position={panel.position}
        scale={active ? 1.08 : hovered ? 1.035 : 1}
        onClick={(event) => {
          event.stopPropagation();
          focusView(panel.view);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <RoundedBox args={[width, height, 0.12]} radius={0.11} smoothness={5}>
          <meshPhysicalMaterial
            color={active ? "#141c3d" : "#0a1024"}
            roughness={0.28}
            metalness={0.25}
            clearcoat={0.9}
            emissive={panel.accent}
            emissiveIntensity={active ? 0.3 : hovered ? 0.17 : 0.04}
          />
        </RoundedBox>
        <mesh position={[-width / 2 + 0.09, 0, 0.09]}>
          <boxGeometry args={[0.035, height * 0.72, 0.035]} />
          <meshBasicMaterial color={panel.accent} />
        </mesh>
        <Text position={[-width / 2 + 0.25, height / 2 - 0.34, 0.1]} anchorX="left" fontSize={0.09} color={panel.accent} letterSpacing={0.08}>
          {panel.eyebrow.toUpperCase()}
        </Text>
        <Text position={[-width / 2 + 0.25, 0.08, 0.1]} anchorX="left" fontSize={0.23} color="#f7f8ff">
          {panel.title}
        </Text>
        <Text position={[-width / 2 + 0.25, -0.38, 0.1]} anchorX="left" fontSize={0.085} color="#9da9c7" maxWidth={width - 0.48} lineHeight={1.45}>
          {panel.detail}
        </Text>
        <Text position={[width / 2 - 0.25, -height / 2 + 0.19, 0.1]} anchorX="right" fontSize={0.07} color={active ? panel.accent : "#64708e"}>
          {active ? "FOCUSED" : "SELECT →"}
        </Text>
      </group>
    </Float>
  );
}

function Stars({ lightMode }: { lightMode: boolean }) {
  const positions = React.useMemo(() => {
    const points = new Float32Array(130 * 3);
    for (let index = 0; index < 130; index += 1) {
      const angle = index * 2.399963;
      const radius = 5.3 + (index % 17) * 0.19;
      points[index * 3] = Math.cos(angle) * radius;
      points[index * 3 + 1] = ((index % 29) - 14) * 0.24;
      points[index * 3 + 2] = Math.sin(angle) * radius - 1.5;
    }
    return points;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={lightMode ? "#7180a5" : "#7089ff"} size={0.022} transparent opacity={lightMode ? 0.22 : 0.5} sizeAttenuation />
    </points>
  );
}

export function SpatialCvScene({ reducedMotion, lightMode }: { reducedMotion: boolean; lightMode: boolean }) {
  const { activeView, focusView } = useSpatialCv();
  const background = lightMode ? "#eaf2ff" : "#040610";

  return (
    <>
      <color attach="background" args={[background]} />
      <fog attach="fog" args={[background, 10, 18]} />
      <ambientLight intensity={lightMode ? 1.6 : 0.72} />
      <directionalLight position={[4, 7, 7]} intensity={lightMode ? 3.2 : 2.4} color={lightMode ? "#ffffff" : "#d8e4ff"} />
      <pointLight position={[-3.5, 1.4, 2.4]} color="#3be8ff" intensity={4.5} distance={9} />
      <pointLight position={[3.5, 1.4, 2.4]} color="#8b5cf6" intensity={5.2} distance={9} />
      <Stars lightMode={lightMode} />

      <group rotation={reducedMotion ? [0, 0, 0] : [-0.035, 0, 0]}>
        {PANELS.map((panel) => (
          <Connector key={`connector-${panel.view}`} from={[0, 0.35, 0]} to={panel.position} color={panel.accent} />
        ))}
        <ProfileCard active={activeView === "profile"} />
        {PANELS.map((panel) => (
          <CvPanel key={panel.view} panel={panel} active={activeView === panel.view} />
        ))}
      </group>

      {activeView !== "overview" && (
        <group position={[0, 3.1, 0]} onClick={() => focusView("overview")}>
          <RoundedBox args={[1.35, 0.42, 0.08]} radius={0.1} smoothness={4}>
            <meshBasicMaterial color="#101934" transparent opacity={0.88} />
          </RoundedBox>
          <Text position={[0, 0, 0.055]} fontSize={0.09} color="#c8d3f4">← OVERVIEW</Text>
        </group>
      )}

      <CameraDirector />
    </>
  );
}
