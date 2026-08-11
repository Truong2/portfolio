"use client";

import * as React from "react";
import { Html, OrbitControls, RoundedBox, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { BOOK_SPREADS, useSpatialCv } from "@/components/spatial-cv-context";
import { education, experience, personalInfo, skillCategories, summary } from "@/data/profile";

const selectedProjects = experience.flatMap((entry) => entry.projects.map((project) => ({ ...project, company: entry.company }))).filter((project) => /AML|Taxi Admin|MARINER25|SANO|METAME|DX Modules/i.test(project.name));

function PageSurface({ side, children }: { side: "left" | "right"; children: React.ReactNode }) {
  const x = side === "left" ? -2.06 : 2.06;
  return (
    <group position={[x, 0.08, 0.12]} rotation={[0, side === "left" ? 0.025 : -0.025, 0]}>
      <RoundedBox args={[3.92, 4.9, 0.08]} radius={0.08} smoothness={4}>
        <meshStandardMaterial color="#081226" roughness={0.52} metalness={0.08} emissive="#07152a" emissiveIntensity={0.28} />
      </RoundedBox>
      <Html transform occlude={false} position={[0, 0, 0.06]} distanceFactor={5.8} style={{ width: 520, height: 650, pointerEvents: "auto" }}>
        <div className="h-[650px] w-[520px] overflow-hidden rounded-[18px] border border-cyan-300/10 bg-[#07101f]/96 p-7 text-slate-100 shadow-[inset_0_0_50px_rgba(34,211,238,.035)]">
          {children}
        </div>
      </Html>
    </group>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-300">{children}</p>;
}

function CoverContent() {
  return (
    <Html transform position={[0, 0.1, 0.25]} distanceFactor={6.4} style={{ width: 520, pointerEvents: "none" }}>
      <div className="w-[520px] text-center text-white">
        <p className="text-[10px] font-mono uppercase tracking-[0.45em] text-cyan-300/80">Curriculum Vitae</p>
        <h2 className="mt-8 text-4xl font-semibold tracking-[-0.045em]">{personalInfo.name}</h2>
        <p className="mt-3 text-lg font-medium text-violet-300">{personalInfo.title}</p>
        <p className="mx-auto mt-8 max-w-[420px] text-sm leading-7 text-slate-300/80">{summary}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2 text-[11px] text-cyan-100/80">
          {["React", "Next.js", "Vue 3", "Nuxt 3", "TypeScript", "OpenLayers"].map((item) => <span key={item} className="rounded-full border border-cyan-300/15 bg-cyan-300/5 px-3 py-1.5">{item}</span>)}
        </div>
      </div>
    </Html>
  );
}

function ProfileSpread() {
  return <>
    <PageSurface side="left"><Kicker>01 · Profile</Kicker><h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">Professional profile</h2><p className="mt-5 text-sm leading-7 text-slate-300/80">{summary}</p><div className="mt-7 grid gap-3">{["Frontend architecture", "Complex enterprise workflows", "Reusable UI systems", "Realtime product interfaces"].map((item) => <div key={item} className="rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm">{item}</div>)}</div></PageSurface>
    <PageSurface side="right"><Kicker>Core focus</Kicker><div className="mt-5 grid gap-4">{[["Enterprise", "Banking, commerce, healthcare and mobility products."],["Spatial", "GIS and map-heavy monitoring workflows with OpenLayers."],["Realtime", "Socket.IO / WebRTC driven status, alerts and collaboration."],["Web3", "Wallet onboarding, token/NFT flows and transaction tracking."]].map(([title, text]) => <div key={title} className="rounded-2xl border border-violet-300/10 bg-violet-300/[0.035] p-5"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></div>)}</div></PageSurface>
  </>;
}

function ExperienceRolesSpread() {
  return <>
    <PageSurface side="left"><Kicker>02 · Experience</Kicker><h2 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.05em]">Roles, products, and <span className="text-violet-300">delivery ownership.</span></h2><p className="mt-5 text-sm leading-7 text-slate-400">Career progression across enterprise product teams and specialist frontend delivery.</p></PageSurface>
    <PageSurface side="right"><Kicker>Professional journey</Kicker><div className="mt-5 space-y-5">{experience.map((entry, index) => <div key={entry.id} className="grid grid-cols-[34px_1fr] gap-3 border-b border-white/8 pb-5 last:border-0"><span className="font-mono text-xs text-cyan-300">0{index + 1}</span><div><div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold">{entry.role}</h3><p className="mt-1 text-sm text-violet-300">{entry.company}</p></div><span className="text-right text-[11px] text-slate-500">{entry.period}</span></div><p className="mt-3 text-xs leading-5 text-slate-400">{entry.projects.slice(0,3).map((project) => project.name).join(" · ")}</p></div></div>)}</div></PageSurface>
  </>;
}

function ExperienceDeliverySpread() {
  const projects = experience[0]?.projects.slice(0, 4) ?? [];
  return <>
    <PageSurface side="left"><Kicker>Experience · Delivery</Kicker><h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Selected delivery work</h2><div className="mt-5 space-y-4">{projects.slice(0,2).map((project) => <div key={project.name} className="rounded-2xl border border-white/8 bg-white/[0.025] p-4"><h3 className="text-sm font-semibold">{project.name}</h3><p className="mt-2 text-xs leading-5 text-slate-400">{project.description}</p><div className="mt-3 flex flex-wrap gap-1.5">{project.techStack.slice(0,5).map((tech) => <span key={tech} className="rounded-full border border-cyan-300/15 px-2 py-1 text-[9px] text-cyan-200">{tech}</span>)}</div></div>)}</div></PageSurface>
    <PageSurface side="right"><Kicker>Ownership highlights</Kicker><div className="mt-5 space-y-4">{projects.slice(2,4).map((project) => <div key={project.name} className="rounded-2xl border border-violet-300/10 bg-violet-300/[0.035] p-4"><h3 className="text-sm font-semibold">{project.name}</h3><ul className="mt-3 space-y-2 text-xs leading-5 text-slate-400">{project.highlights.slice(0,3).map((highlight) => <li key={highlight} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-300" />{highlight}</li>)}</ul></div>)}</div></PageSurface>
  </>;
}

function ProjectsSpread({ second = false }: { second?: boolean }) {
  const projects = second ? selectedProjects.slice(3,6) : selectedProjects.slice(0,3);
  return <>
    <PageSurface side="left"><Kicker>03 · Projects</Kicker><h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">{second ? "Spatial, realtime & Web3." : "Enterprise product systems."}</h2><p className="mt-5 text-sm leading-7 text-slate-400">Selected CV-backed projects, responsibilities and stack.</p></PageSurface>
    <PageSurface side="right"><div className="space-y-3">{projects.map((project) => <div key={project.name} className="rounded-xl border border-white/8 bg-white/[0.025] p-4"><p className="text-[9px] font-mono uppercase tracking-[0.14em] text-cyan-300/75">{project.company}</p><h3 className="mt-2 text-sm font-semibold">{project.name}</h3><p className="mt-2 text-[11px] leading-5 text-slate-400">{project.description}</p><div className="mt-2 flex flex-wrap gap-1">{project.techStack.slice(0,4).map((tech) => <span key={tech} className="text-[9px] text-violet-300">#{tech.replaceAll(" ", "")}</span>)}</div></div>)}</div></PageSurface>
  </>;
}

function SkillsSpread() {
  return <>
    <PageSurface side="left"><Kicker>04 · Skills</Kicker><h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">Frontend stack & engineering toolkit.</h2><p className="mt-5 text-sm leading-7 text-slate-400">Grouped by the same categories used in the CV.</p></PageSurface>
    <PageSurface side="right"><div className="grid grid-cols-2 gap-3">{skillCategories.map((category) => <div key={category.id} className="rounded-xl border border-white/8 bg-white/[0.025] p-3"><p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-cyan-300">{category.label}</p><p className="mt-2 text-[11px] leading-5 text-slate-400">{category.skills.join(" · ")}</p></div>)}</div></PageSurface>
  </>;
}

function EducationSpread() {
  const item = education[0];
  return <><PageSurface side="left"><Kicker>05 · Education</Kicker><h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">Engineering foundation.</h2><p className="mt-5 text-sm leading-7 text-slate-400">Electronics and Telecommunication training combined with software product delivery.</p></PageSurface><PageSurface side="right"><div className="mt-12 rounded-2xl border border-cyan-300/12 bg-cyan-300/[0.035] p-6"><h3 className="text-2xl font-semibold">{item?.school}</h3><p className="mt-3 text-violet-300">{item?.degree} · {item?.field}</p><p className="mt-5 text-sm text-slate-400">{item?.period}</p><p className="mt-2 text-lg font-semibold text-cyan-300">{item?.detail}</p></div></PageSurface></>;
}

function ContactSpread() {
  return <><PageSurface side="left"><Kicker>06 · Contact</Kicker><h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">Let&apos;s build something useful.</h2><p className="mt-5 text-sm leading-7 text-slate-400">Open to frontend product roles and complex enterprise projects.</p></PageSurface><PageSurface side="right"><div className="mt-10 space-y-4">{[["Email",personalInfo.email],["Phone",personalInfo.phone],["Location",personalInfo.location]].map(([label,value]) => <div key={label} className="rounded-xl border border-white/8 bg-white/[0.025] p-4"><p className="text-[10px] uppercase tracking-[0.14em] text-cyan-300">{label}</p><p className="mt-2 text-sm">{value}</p></div>)}<a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="block rounded-xl border border-violet-300/15 bg-violet-300/[0.04] p-4 text-sm text-violet-200">LinkedIn profile ↗</a></div></PageSurface></>;
}

function SpreadContent({ index }: { index: number }) {
  if (index === 1) return <ProfileSpread />;
  if (index === 2) return <ExperienceRolesSpread />;
  if (index === 3) return <ExperienceDeliverySpread />;
  if (index === 4) return <ProjectsSpread />;
  if (index === 5) return <ProjectsSpread second />;
  if (index === 6) return <SkillsSpread />;
  if (index === 7) return <EducationSpread />;
  return <ContactSpread />;
}

function TurningSheet({ currentSpread, direction, reducedMotion }: { currentSpread: number; direction: -1 | 0 | 1; reducedMotion: boolean }) {
  const ref = React.useRef<THREE.Group>(null);
  const progress = React.useRef(1);
  const previousSpread = React.useRef(currentSpread);

  useFrame((_, delta) => {
    if (previousSpread.current !== currentSpread) {
      previousSpread.current = currentSpread;
      progress.current = reducedMotion ? 1 : 0;
    }
    progress.current = Math.min(1, progress.current + delta * 1.55);
    const group = ref.current;
    if (!group) return;
    const p = 1 - Math.pow(1 - progress.current, 3);
    const dir = direction || 1;
    group.visible = p < 0.995;
    group.rotation.y = dir > 0 ? -Math.PI * p : Math.PI * p;
    group.rotation.z = Math.sin(p * Math.PI) * 0.035 * dir;
  });

  if (currentSpread === 0) return null;
  return (
    <group ref={ref} position={[direction >= 0 ? 0.08 : -0.08, 0.08, 0.22]}>
      <mesh position={[direction >= 0 ? 1.98 : -1.98, 0, 0]}>
        <planeGeometry args={[3.88, 4.84, 18, 1]} />
        <meshStandardMaterial color="#0b1830" side={THREE.DoubleSide} roughness={0.5} metalness={0.06} emissive="#142451" emissiveIntensity={0.18} />
      </mesh>
    </group>
  );
}

function BookModel({ reducedMotion }: { reducedMotion: boolean }) {
  const { currentSpread, direction, nextSpread, previousSpread } = useSpatialCv();
  const open = currentSpread > 0;
  const root = React.useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!root.current) return;
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, open ? -0.08 : -0.04, 4.5, delta);
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, open ? 0 : -0.24, 4.5, delta);
    root.current.position.y = THREE.MathUtils.damp(root.current.position.y, open ? -0.1 : -0.2, 4.5, delta);
  });

  return (
    <group ref={root} scale={open ? 0.84 : 1}>
      {!open ? (
        <group onClick={nextSpread}>
          <RoundedBox args={[4.15, 5.3, 0.42]} radius={0.13} smoothness={5}>
            <meshPhysicalMaterial color="#09152d" roughness={0.26} metalness={0.42} clearcoat={1} emissive="#18265d" emissiveIntensity={0.2} />
          </RoundedBox>
          <mesh position={[-1.9, 0, 0.23]}><boxGeometry args={[0.22, 5, 0.08]} /><meshStandardMaterial color="#082a4d" emissive="#22d3ee" emissiveIntensity={0.3} /></mesh>
          <CoverContent />
          <Text position={[0, -2.15, 0.24]} fontSize={0.08} color="#7dd3fc">CLICK THE COVER TO OPEN</Text>
        </group>
      ) : (
        <group>
          <RoundedBox args={[8.35, 5.25, 0.3]} radius={0.1} smoothness={5} position={[0, -0.02, -0.12]}><meshStandardMaterial color="#071126" roughness={0.34} metalness={0.2} /></RoundedBox>
          <mesh position={[0, 0.04, 0.02]}><boxGeometry args={[0.15, 4.95, 0.18]} /><meshStandardMaterial color="#0b3154" emissive="#22d3ee" emissiveIntensity={0.18} /></mesh>
          <SpreadContent index={currentSpread} />
          <TurningSheet currentSpread={currentSpread} direction={direction} reducedMotion={reducedMotion} />
          <mesh position={[-4.18, 0, 0.2]} onClick={previousSpread}><planeGeometry args={[0.55, 4.6]} /><meshBasicMaterial transparent opacity={0} /></mesh>
          <mesh position={[4.18, 0, 0.2]} onClick={nextSpread}><planeGeometry args={[0.55, 4.6]} /><meshBasicMaterial transparent opacity={0} /></mesh>
        </group>
      )}
    </group>
  );
}

function HolographicBase() {
  return <group position={[0, -2.95, 0]}>{[2.2, 3.05, 3.9].map((radius, index) => <mesh key={radius} rotation={[Math.PI / 2, 0, index * 0.18]}><torusGeometry args={[radius, 0.012, 8, 128]} /><meshBasicMaterial color={index % 2 ? "#8b5cf6" : "#22d3ee"} transparent opacity={0.36 - index * 0.07} /></mesh>)}<pointLight position={[0, 0.4, 0]} intensity={6} color="#22d3ee" distance={8} /></group>;
}

export function SpatialCvScene({ reducedMotion, lightMode }: { reducedMotion: boolean; lightMode: boolean }) {
  const { currentSpread } = useSpatialCv();
  const open = currentSpread > 0;
  const background = lightMode ? "#eaf2ff" : "#030711";
  return <>
    <color attach="background" args={[background]} />
    <fog attach="fog" args={[background, 11, 20]} />
    <ambientLight intensity={lightMode ? 1.8 : 0.72} />
    <directionalLight position={[4, 7, 7]} intensity={lightMode ? 3.5 : 2.8} color={lightMode ? "#ffffff" : "#d8e4ff"} />
    <directionalLight position={[-5, -1, 3]} intensity={1.5} color="#22d3ee" />
    <HolographicBase />
    <BookModel reducedMotion={reducedMotion} />
    <OrbitControls makeDefault enablePan={false} enableZoom enableRotate={!open} minDistance={open ? 7.1 : 4.8} maxDistance={open ? 12 : 12.5} rotateSpeed={0.45} zoomSpeed={0.7} target={[0, -0.1, 0]} />
  </>;
}
