"use client";

import * as React from "react";
import { Html, OrbitControls, RoundedBox, Stars, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { BOOK_SPREADS, useSpatialCv } from "@/components/spatial-cv-context";
import { education, experience, personalInfo, skillCategories, summary } from "@/data/profile";

const PAGE_WIDTH = 4.04;
const PAGE_HEIGHT = 5.18;
const HALF_PAGE = PAGE_WIDTH / 2;
const TOTAL_PAPER_LAYERS = 12;

const selectedProjects = experience
  .flatMap((entry) => entry.projects.map((project) => ({ ...project, company: entry.company })))
  .filter((project) => /AML|Taxi Admin|MARINER25|SANO|METAME|DX Modules/i.test(project.name));

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-300">{children}</p>;
}

function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RoundedBox args={[PAGE_WIDTH, PAGE_HEIGHT, 0.075]} radius={0.055} smoothness={4}>
        <meshPhysicalMaterial color="#091427" roughness={0.58} metalness={0.03} clearcoat={0.28} clearcoatRoughness={0.42} emissive="#071326" emissiveIntensity={0.2} />
      </RoundedBox>
      <Html transform occlude={false} position={[0, 0, 0.052]} distanceFactor={5.75} style={{ width: 500, height: 640, pointerEvents: "auto" }}>
        <div className="relative h-[640px] w-[500px] overflow-hidden px-8 py-8 text-slate-100">
          <div className="pointer-events-none absolute inset-3 rounded-[16px] border border-cyan-200/[0.07]" />
          <div className="pointer-events-none absolute left-6 top-6 h-px w-16 bg-gradient-to-r from-cyan-300/50 to-transparent" />
          <div className="pointer-events-none absolute bottom-6 right-6 h-px w-16 bg-gradient-to-l from-violet-300/45 to-transparent" />
          <div className="relative z-10 h-full">{children}</div>
        </div>
      </Html>
    </>
  );
}

function CoverContent() {
  return (
    <Html transform position={[0, 0, 0.215]} distanceFactor={6.05} style={{ width: 510, height: 650, pointerEvents: "none" }}>
      <div className="relative h-[650px] w-[510px] overflow-hidden px-10 py-10 text-left text-white">
        <div className="absolute inset-3 rounded-[20px] border border-cyan-200/10" />
        <div className="absolute left-7 top-7 h-12 w-12 border-l border-t border-cyan-300/35" />
        <div className="absolute bottom-7 right-7 h-12 w-12 border-b border-r border-violet-300/35" />
        <div className="relative z-10 flex h-full flex-col">
          <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-cyan-300/75">Welcome to my</p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.38em] text-gradient">Portfolio</p>
          <div className="mt-12 h-px w-20 bg-gradient-to-r from-cyan-300 via-violet-300 to-transparent" />
          <h2 className="mt-8 max-w-[430px] text-5xl font-semibold leading-[0.96] tracking-[-0.055em]">{personalInfo.name}</h2>
          <p className="mt-4 text-lg font-medium text-violet-300">&lt; {personalInfo.title} /&gt;</p>
          <p className="mt-6 max-w-[420px] text-xs leading-6 text-slate-300/72">{summary}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["React", "Next.js", "Vue", "Nuxt", "TypeScript", "OpenLayers"].map((item) => <span key={item} className="rounded-lg border border-cyan-300/14 bg-cyan-300/[0.045] px-2.5 py-1.5 text-[9px] font-medium text-cyan-100/85">{item}</span>)}
          </div>
          <p className="mt-auto text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400">Frontend systems · enterprise products · spatial interfaces</p>
        </div>
      </div>
    </Html>
  );
}

function ProfilePage({ side }: { side: "left" | "right" }) {
  if (side === "left") return <><Kicker>01 · Profile</Kicker><h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.05em]">Professional profile.</h2><p className="mt-6 text-sm leading-7 text-slate-300/80">{summary}</p><div className="mt-8 grid grid-cols-2 gap-3">{["Frontend architecture", "Enterprise workflows", "Reusable UI systems", "Realtime interfaces"].map((item) => <div key={item} className="rounded-xl border border-white/8 bg-white/[0.025] px-3 py-3 text-xs leading-5 text-slate-300">{item}</div>)}</div></>;
  return <><Kicker>Core focus</Kicker><h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">Products that need clarity under complexity.</h3><div className="mt-7 space-y-4">{[["Enterprise", "Banking, commerce, healthcare and mobility products."], ["Spatial", "GIS and map-heavy monitoring workflows with OpenLayers."], ["Realtime", "Socket.IO / WebRTC status, alerts and collaboration."], ["Web3", "Wallet onboarding, token/NFT flows and transaction tracking."]].map(([title, text]) => <div key={title} className="border-l border-cyan-300/25 pl-4"><h4 className="text-sm font-semibold text-white">{title}</h4><p className="mt-1.5 text-xs leading-5 text-slate-400">{text}</p></div>)}</div></>;
}

function ExperienceRolesPage({ side }: { side: "left" | "right" }) {
  if (side === "left") return <><Kicker>02 · Experience</Kicker><h2 className="mt-4 text-[38px] font-semibold leading-[1.02] tracking-[-0.055em]">Roles, products, and <span className="text-violet-300">delivery ownership.</span></h2><p className="mt-6 text-sm leading-7 text-slate-400">CV-backed experience across financial operations, mobility, healthcare, commerce, GIS intelligence, enterprise platforms and Web3.</p><div className="mt-9 grid grid-cols-2 gap-3">{["Architecture", "Complex workflows", "API integration", "Code review", "Team support", "Design systems"].map((item) => <div key={item} className="rounded-xl border border-white/7 bg-white/[0.02] px-3 py-3 text-xs text-slate-300">{item}</div>)}</div></>;
  return <><Kicker>Experience timeline</Kicker><div className="relative mt-6 space-y-6 before:absolute before:bottom-3 before:left-[7px] before:top-3 before:w-px before:bg-gradient-to-b before:from-cyan-300 before:via-violet-300/55 before:to-transparent">{experience.map((entry) => <div key={entry.id} className="relative pl-8"><span className="absolute left-0 top-1 size-[15px] rounded-full border-2 border-cyan-200 bg-[#091427] shadow-[0_0_18px_rgba(34,211,238,.55)]" /><p className="text-[9px] font-mono uppercase tracking-[0.12em] text-cyan-300/75">{entry.period}</p><h3 className="mt-1.5 text-base font-semibold text-white">{entry.role}</h3><p className="mt-0.5 text-xs text-violet-300">{entry.company}</p><p className="mt-2 text-[11px] leading-5 text-slate-400">{entry.projects.slice(0, 3).map((project) => project.name).join(" · ")}</p></div>)}</div></>;
}

function ExperienceDeliveryPage({ side }: { side: "left" | "right" }) {
  const projects = experience[0]?.projects.slice(0, 4) ?? [];
  const pageProjects = side === "left" ? projects.slice(0, 2) : projects.slice(2, 4);
  return <><Kicker>{side === "left" ? "Experience · Products" : "Experience · Ownership"}</Kicker><h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em]">{side === "left" ? "Selected delivery work." : "Delivery highlights."}</h2><div className="mt-6 space-y-4">{pageProjects.map((project) => <article key={project.name} className="rounded-2xl border border-white/8 bg-white/[0.022] p-4"><h3 className="text-sm font-semibold leading-5 text-white">{project.name}</h3><p className="mt-2 text-[11px] leading-5 text-slate-400">{project.description}</p>{side === "left" ? <div className="mt-3 flex flex-wrap gap-1.5">{project.techStack.slice(0, 5).map((tech) => <span key={tech} className="rounded-full border border-cyan-300/15 px-2 py-1 text-[9px] text-cyan-200">{tech}</span>)}</div> : <ul className="mt-3 space-y-2">{project.highlights.slice(0, 3).map((highlight) => <li key={highlight} className="flex gap-2 text-[10px] leading-4 text-slate-400"><span className="mt-1.5 size-1 shrink-0 rounded-full bg-violet-300" />{highlight}</li>)}</ul>}</article>)}</div></>;
}

function ProjectsPage({ side, second }: { side: "left" | "right"; second: boolean }) {
  const projects = second ? selectedProjects.slice(3, 6) : selectedProjects.slice(0, 3);
  if (side === "left") return <><Kicker>03 · Projects</Kicker><h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.055em]">{second ? "Spatial, realtime & Web3." : "Enterprise product systems."}</h2><p className="mt-6 text-sm leading-7 text-slate-400">Selected CV-backed work with product context, frontend responsibility and implementation stack.</p><div className="mt-8 h-px w-20 bg-gradient-to-r from-cyan-300 to-violet-300" /><p className="mt-5 text-[11px] leading-5 text-slate-500">Use the page edge or navigation controls to continue through the portfolio.</p></>;
  return <div className="space-y-3">{projects.map((project) => <article key={project.name} className="rounded-xl border border-white/8 bg-white/[0.02] p-4"><p className="text-[8px] font-mono uppercase tracking-[0.14em] text-cyan-300/70">{project.company}</p><h3 className="mt-2 text-sm font-semibold leading-5 text-white">{project.name}</h3><p className="mt-2 text-[10px] leading-[1.15rem] text-slate-400">{project.description}</p><div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">{project.techStack.slice(0, 4).map((tech) => <span key={tech} className="text-[8px] text-violet-300">#{tech.replaceAll(" ", "")}</span>)}</div></article>)}</div>;
}

function SkillsPage({ side }: { side: "left" | "right" }) {
  if (side === "left") return <><Kicker>04 · Skills</Kicker><h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.055em]">Frontend stack & engineering toolkit.</h2><p className="mt-6 text-sm leading-7 text-slate-400">Modern frontend architecture backed by realtime, GIS, Web3 and delivery tooling.</p><div className="mt-8 flex flex-wrap gap-2">{["React", "Next.js", "Vue 3", "Nuxt 3", "TypeScript", "React Query", "Zustand", "Zod", "OpenLayers", "Socket.IO"].map((skill) => <span key={skill} className="rounded-lg border border-cyan-300/13 bg-cyan-300/[0.035] px-3 py-2 text-[10px] text-cyan-100">{skill}</span>)}</div></>;
  return <div className="grid grid-cols-2 gap-3">{skillCategories.map((category) => <div key={category.id} className="rounded-xl border border-white/8 bg-white/[0.02] p-3"><p className="text-[9px] font-semibold uppercase tracking-[0.09em] text-cyan-300">{category.label}</p><p className="mt-2 text-[10px] leading-4 text-slate-400">{category.skills.join(" · ")}</p></div>)}</div>;
}

function EducationPage({ side }: { side: "left" | "right" }) {
  const item = education[0];
  if (side === "left") return <><Kicker>05 · Education</Kicker><h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em]">Engineering foundation.</h2><p className="mt-6 text-sm leading-7 text-slate-400">Electronics and Telecommunication training combined with frontend product work across realtime, spatial and enterprise systems.</p></>;
  return <div className="mt-12 rounded-2xl border border-cyan-300/12 bg-cyan-300/[0.025] p-6"><p className="text-[9px] font-mono uppercase tracking-[0.16em] text-cyan-300">Academic background</p><h3 className="mt-4 text-2xl font-semibold leading-tight text-white">{item?.school}</h3><p className="mt-4 text-sm text-violet-300">{item?.degree} · {item?.field}</p><p className="mt-6 text-xs text-slate-400">{item?.period}</p><p className="mt-2 text-xl font-semibold text-cyan-300">{item?.detail}</p></div>;
}

function ContactPage({ side }: { side: "left" | "right" }) {
  if (side === "left") return <><Kicker>06 · Contact</Kicker><h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.055em]">Let&apos;s build something useful.</h2><p className="mt-6 text-sm leading-7 text-slate-400">Open to frontend product roles and complex enterprise projects.</p><div className="mt-9 h-px w-20 bg-gradient-to-r from-cyan-300 to-violet-300" /></>;
  return <div className="mt-8 space-y-4">{[["Email", personalInfo.email], ["Phone", personalInfo.phone], ["Location", personalInfo.location]].map(([label, value]) => <div key={label} className="border-b border-white/8 pb-4"><p className="text-[9px] uppercase tracking-[0.15em] text-cyan-300">{label}</p><p className="mt-2 text-sm text-slate-200">{value}</p></div>)}<a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="mt-4 block rounded-xl border border-violet-300/15 bg-violet-300/[0.035] p-4 text-sm text-violet-200">LinkedIn profile ↗</a><a href={personalInfo.resumeUrl} download className="block rounded-xl border border-cyan-300/15 bg-cyan-300/[0.035] p-4 text-sm text-cyan-200">Download CV ↓</a></div>;
}

function SpreadPageContent({ index, side }: { index: number; side: "left" | "right" }) {
  if (index === 1) return <ProfilePage side={side} />;
  if (index === 2) return <ExperienceRolesPage side={side} />;
  if (index === 3) return <ExperienceDeliveryPage side={side} />;
  if (index === 4) return <ProjectsPage side={side} second={false} />;
  if (index === 5) return <ProjectsPage side={side} second />;
  if (index === 6) return <SkillsPage side={side} />;
  if (index === 7) return <EducationPage side={side} />;
  return <ContactPage side={side} />;
}

function PaperStack({ side, layers }: { side: "left" | "right"; layers: number }) {
  const x = side === "left" ? -HALF_PAGE : HALF_PAGE;
  const direction = side === "left" ? -1 : 1;
  const visibleLayers = Math.max(1, Math.min(TOTAL_PAPER_LAYERS, layers));
  return (
    <group>
      {Array.from({ length: visibleLayers }, (_, index) => (
        <mesh key={`${side}-${index}`} position={[x + direction * index * 0.004, 0, -0.12 + index * 0.018]} rotation={[0, side === "left" ? 0.006 : -0.006, direction * index * 0.0007]}>
          <boxGeometry args={[PAGE_WIDTH - 0.08 - index * 0.006, PAGE_HEIGHT - 0.1 - index * 0.004, 0.016]} />
          <meshStandardMaterial color={index % 2 === 0 ? "#d9e3ee" : "#cbd8e5"} roughness={0.88} />
        </mesh>
      ))}
    </group>
  );
}

function Hardcover({ position }: { position: [number, number, number] }) {
  return <RoundedBox args={[PAGE_WIDTH + 0.2, PAGE_HEIGHT + 0.22, 0.34]} radius={0.12} smoothness={5} position={position}><meshPhysicalMaterial color="#08132b" roughness={0.26} metalness={0.42} clearcoat={0.95} clearcoatRoughness={0.12} emissive="#17265a" emissiveIntensity={0.18} /></RoundedBox>;
}

function TurningPageContent({ index, direction }: { index: number; direction: -1 | 0 | 1 }) {
  const spread = BOOK_SPREADS[index];
  if (!spread || index === 0) return null;
  return (
    <Html transform occlude={false} position={[PAGE_WIDTH * 0.48, 0, 0.04]} distanceFactor={5.9} style={{ width: 420, height: 540, pointerEvents: "none" }}>
      <div className={`h-[540px] w-[420px] overflow-hidden px-7 py-7 text-slate-950 ${direction < 0 ? "origin-left" : "origin-right"}`}>
        <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-cyan-700">Turning to</p>
        <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.04em] text-slate-900">{spread.label}</h3>
        <div className="mt-5 h-px w-16 bg-gradient-to-r from-cyan-600 to-violet-600" />
        <p className="mt-5 text-xs leading-5 text-slate-600">{direction >= 0 ? "Continue forward through the CV." : "Return to the previous chapter."}</p>
      </div>
    </Html>
  );
}

function CurvedTurningPage({ currentSpread, direction, reducedMotion }: { currentSpread: number; direction: -1 | 0 | 1; reducedMotion: boolean }) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const contentRef = React.useRef<THREE.Group>(null);
  const previousSpread = React.useRef(currentSpread);
  const progress = React.useRef(1);
  const geometry = React.useMemo(() => {
    const value = new THREE.PlaneGeometry(PAGE_WIDTH - 0.08, PAGE_HEIGHT - 0.12, 32, 3);
    value.translate((PAGE_WIDTH - 0.08) / 2, 0, 0);
    value.userData.originalPositions = new Float32Array(value.attributes.position.array as Float32Array);
    return value;
  }, []);

  React.useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (previousSpread.current !== currentSpread) {
      previousSpread.current = currentSpread;
      progress.current = reducedMotion ? 1 : 0;
    }

    const mesh = meshRef.current;
    const content = contentRef.current;
    if (!mesh || !content) return;

    progress.current = Math.min(1, progress.current + delta * 1.52);
    const eased = 1 - Math.pow(1 - progress.current, 3);
    const visible = currentSpread > 0 && eased < 0.999;
    mesh.visible = visible;
    content.visible = visible;

    const position = geometry.attributes.position as THREE.BufferAttribute;
    const originals = geometry.userData.originalPositions as Float32Array;
    const dir = direction || 1;
    const width = PAGE_WIDTH - 0.08;
    const curveStrength = Math.sin(eased * Math.PI);
    const baseAngle = (dir > 0 ? -1 : 1) * Math.PI * eased;

    for (let index = 0; index < position.count; index += 1) {
      const baseX = originals[index * 3];
      const baseY = originals[index * 3 + 1];
      const u = Math.max(0, Math.min(1, baseX / width));
      const startX = dir > 0 ? baseX : -baseX;
      const curlAngle = baseAngle + (dir > 0 ? -1 : 1) * curveStrength * 0.42 * (u - 0.45);
      const curlLift = Math.sin(u * Math.PI) * curveStrength * 0.42;
      const edgeLift = Math.pow(u, 1.7) * curveStrength * 0.18;
      const x = Math.cos(curlAngle) * startX;
      const z = -Math.sin(curlAngle) * startX + curlLift + edgeLift;
      const y = baseY + Math.sin(u * Math.PI) * curveStrength * 0.055;
      position.setXYZ(index, x, y, z);
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();

    content.rotation.y = baseAngle * 0.94;
    content.rotation.z = Math.sin(eased * Math.PI) * 0.018 * dir;
    content.position.z = 0.31 + curveStrength * 0.16;
  });

  return (
    <>
      <mesh ref={meshRef} geometry={geometry} position={[0, 0.02, 0.28]} castShadow>
        <meshPhysicalMaterial color="#d7e2ec" side={THREE.DoubleSide} roughness={0.74} metalness={0.02} clearcoat={0.12} emissive="#6d83a4" emissiveIntensity={0.025} />
      </mesh>
      <group ref={contentRef} position={[0, 0.02, 0.31]}>
        <TurningPageContent index={currentSpread} direction={direction} />
      </group>
    </>
  );
}

function BookModel({ reducedMotion }: { reducedMotion: boolean }) {
  const { currentSpread, direction, nextSpread, previousSpread } = useSpatialCv();
  const open = currentSpread > 0;
  const rootRef = React.useRef<THREE.Group>(null);
  const frontCoverRef = React.useRef<THREE.Group>(null);
  const leftLayers = Math.max(1, currentSpread + 1);
  const rightLayers = Math.max(1, TOTAL_PAPER_LAYERS - currentSpread);

  useFrame((_, delta) => {
    const root = rootRef.current;
    const frontCover = frontCoverRef.current;
    if (!root || !frontCover) return;
    const speed = reducedMotion ? 18 : 4.8;
    root.position.x = THREE.MathUtils.damp(root.position.x, open ? 0 : -HALF_PAGE, speed, delta);
    root.position.y = THREE.MathUtils.damp(root.position.y, open ? -0.02 : -0.16, speed, delta);
    root.rotation.x = THREE.MathUtils.damp(root.rotation.x, open ? -0.055 : -0.035, speed, delta);
    root.rotation.y = THREE.MathUtils.damp(root.rotation.y, open ? 0 : -0.13, speed, delta);
    const targetScale = open ? 0.94 : 1.02;
    root.scale.x = THREE.MathUtils.damp(root.scale.x, targetScale, speed, delta);
    root.scale.y = THREE.MathUtils.damp(root.scale.y, targetScale, speed, delta);
    root.scale.z = THREE.MathUtils.damp(root.scale.z, targetScale, speed, delta);
    frontCover.rotation.y = THREE.MathUtils.damp(frontCover.rotation.y, open ? -Math.PI : 0, reducedMotion ? 20 : 4.1, delta);
  });

  return (
    <group ref={rootRef} position={[-HALF_PAGE, -0.16, 0]} rotation={[-0.035, -0.13, -0.015]}>
      <Hardcover position={[HALF_PAGE, 0, -0.24]} />
      {open && <Hardcover position={[-HALF_PAGE, 0, -0.24]} />}
      {open && <PaperStack side="left" layers={leftLayers} />}
      <PaperStack side="right" layers={rightLayers} />

      {open && <group position={[-HALF_PAGE, 0, 0.15]} rotation={[0, 0.018, 0]}><PageFrame><SpreadPageContent index={currentSpread} side="left" /></PageFrame></group>}
      {open && <group position={[HALF_PAGE, 0, 0.15]} rotation={[0, -0.018, 0]}><PageFrame><SpreadPageContent index={currentSpread} side="right" /></PageFrame></group>}

      <group ref={frontCoverRef} position={[0, 0, 0.19]}>
        <group position={[HALF_PAGE, 0, 0]} onClick={() => { if (!open) nextSpread(); }}>
          <RoundedBox args={[PAGE_WIDTH + 0.2, PAGE_HEIGHT + 0.22, 0.34]} radius={0.12} smoothness={5}>
            <meshPhysicalMaterial color="#09162f" roughness={0.2} metalness={0.5} clearcoat={1} clearcoatRoughness={0.08} emissive="#1a2b66" emissiveIntensity={0.25} />
          </RoundedBox>
          {!open && <CoverContent />}
        </group>
      </group>

      <mesh position={[0, 0, -0.02]}><boxGeometry args={[0.18, PAGE_HEIGHT + 0.08, 0.44]} /><meshPhysicalMaterial color="#062746" roughness={0.28} metalness={0.52} clearcoat={0.8} emissive="#22d3ee" emissiveIntensity={0.26} /></mesh>
      {!open && <Text position={[0.02, 0, 0.22]} rotation={[0, 0, Math.PI / 2]} fontSize={0.09} color="#7dd3fc" letterSpacing={0.1}>PORTFOLIO · NVT</Text>}

      {open && <CurvedTurningPage currentSpread={currentSpread} direction={direction} reducedMotion={reducedMotion} />}
      {open && <mesh position={[-PAGE_WIDTH - 0.04, 0, 0.34]} onClick={previousSpread}><planeGeometry args={[0.46, PAGE_HEIGHT - 0.4]} /><meshBasicMaterial transparent opacity={0} /></mesh>}
      {open && <mesh position={[PAGE_WIDTH + 0.04, 0, 0.34]} onClick={nextSpread}><planeGeometry args={[0.46, PAGE_HEIGHT - 0.4]} /><meshBasicMaterial transparent opacity={0} /></mesh>}

      <mesh position={[0, -PAGE_HEIGHT / 2 - 0.28, -0.08]} rotation={[0, 0, 0.04]}><boxGeometry args={[0.08, 0.72, 0.025]} /><meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.28} /></mesh>
    </group>
  );
}

function HolographicStage({ lightMode }: { lightMode: boolean }) {
  return (
    <group position={[0, -3.0, -0.25]}>
      <gridHelper args={[18, 36, lightMode ? "#7da4c8" : "#173f68", lightMode ? "#bed1e5" : "#0b213b"]} position={[0, -0.03, 0]} />
      {[2.25, 3.1, 4.05, 5.05, 6.05].map((radius, index) => <mesh key={radius} rotation={[Math.PI / 2, 0, index * 0.16]}><torusGeometry args={[radius, index === 1 ? 0.018 : 0.009, 8, 160]} /><meshBasicMaterial color={index % 2 ? "#8b5cf6" : "#22d3ee"} transparent opacity={lightMode ? 0.14 : 0.48 - index * 0.06} /></mesh>)}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}><circleGeometry args={[1.32, 96]} /><meshBasicMaterial color="#123a6b" transparent opacity={lightMode ? 0.04 : 0.11} /></mesh>
      <pointLight position={[0, 0.7, 0]} intensity={lightMode ? 3 : 8} color="#22d3ee" distance={9} />
      <pointLight position={[3.2, 0.2, 1]} intensity={lightMode ? 1.8 : 5} color="#8b5cf6" distance={8} />
    </group>
  );
}

export function SpatialCvScene({ reducedMotion, lightMode }: { reducedMotion: boolean; lightMode: boolean }) {
  const { currentSpread } = useSpatialCv();
  const open = currentSpread > 0;
  const background = lightMode ? "#eaf2ff" : "#020611";

  return (
    <>
      <color attach="background" args={[background]} />
      <fog attach="fog" args={[background, 12, 22]} />
      {!lightMode && <Stars radius={18} depth={12} count={280} factor={2.1} saturation={0} fade speed={0.22} />}
      <ambientLight intensity={lightMode ? 1.7 : 0.64} />
      <directionalLight position={[5, 7, 8]} intensity={lightMode ? 3.4 : 3.1} color={lightMode ? "#ffffff" : "#dce8ff"} />
      <directionalLight position={[-6, -1, 4]} intensity={lightMode ? 1.1 : 1.8} color="#22d3ee" />
      <directionalLight position={[5, 0, 2]} intensity={lightMode ? 0.8 : 1.5} color="#8b5cf6" />
      <HolographicStage lightMode={lightMode} />
      <BookModel reducedMotion={reducedMotion} />
      <OrbitControls makeDefault enablePan={false} enableZoom enableRotate={!open} minDistance={open ? 7.8 : 5.2} maxDistance={open ? 13.5 : 12.8} minPolarAngle={Math.PI * 0.28} maxPolarAngle={Math.PI * 0.7} rotateSpeed={0.42} zoomSpeed={0.66} dampingFactor={0.08} enableDamping target={[0, -0.08, 0]} />
    </>
  );
}
