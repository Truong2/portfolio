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
const TOTAL_PAPER_LAYERS = 14;

const selectedProjects = experience
  .flatMap((entry) => entry.projects.map((project) => ({ ...project, company: entry.company })))
  .filter((project) => /AML|Taxi Admin|MARINER25|SANO|METAME|DX Modules/i.test(project.name));

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-300">{children}</p>;
}

function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RoundedBox args={[PAGE_WIDTH, PAGE_HEIGHT, 0.085]} radius={0.055} smoothness={4}>
        <meshPhysicalMaterial color="#081326" roughness={0.54} metalness={0.025} clearcoat={0.34} clearcoatRoughness={0.38} emissive="#071326" emissiveIntensity={0.2} />
      </RoundedBox>
      <Html transform occlude={false} position={[0, 0, 0.058]} distanceFactor={5.75} style={{ width: 500, height: 640, pointerEvents: "auto" }}>
        <div className="relative h-[640px] w-[500px] overflow-hidden px-8 py-8 text-slate-100">
          <div className="pointer-events-none absolute inset-3 rounded-[16px] border border-cyan-200/[0.065]" />
          <div className="pointer-events-none absolute left-6 top-6 h-px w-16 bg-gradient-to-r from-cyan-300/45 to-transparent" />
          <div className="pointer-events-none absolute bottom-6 right-6 h-px w-16 bg-gradient-to-l from-violet-300/40 to-transparent" />
          <div className="relative z-10 h-full">{children}</div>
        </div>
      </Html>
    </>
  );
}

function CoverContent() {
  return (
    <Html transform position={[0, 0.02, 0.215]} distanceFactor={6.05} style={{ width: 510, height: 650, pointerEvents: "none" }}>
      <div className="relative h-[650px] w-[510px] overflow-hidden px-11 py-11 text-white">
        <div className="absolute inset-4 rounded-[18px] border border-cyan-200/[0.11]" />
        <div className="absolute left-8 top-8 h-10 w-10 border-l border-t border-cyan-300/45" />
        <div className="absolute bottom-8 right-8 h-10 w-10 border-b border-r border-cyan-300/35" />
        <div className="relative z-10 flex h-full flex-col items-center text-center">
          <p className="mt-5 text-[8px] font-mono uppercase tracking-[0.34em] text-slate-400">Welcome to my</p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.42em] text-gradient">Portfolio</p>
          <div className="mt-5 h-px w-16 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />

          <div className="mt-14">
            <h2 className="text-[42px] font-semibold leading-none tracking-[-0.055em] text-white">{personalInfo.name}</h2>
            <p className="mt-5 text-base font-medium text-violet-300">&lt; {personalInfo.title} /&gt;</p>
          </div>

          <p className="mt-8 max-w-[370px] text-[11px] leading-6 text-slate-400">3+ years building enterprise frontend products across banking, commerce, healthcare, mobility, GIS and Web3.</p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["React", "TS", "Next.js", "Vue", "Nuxt"].map((item) => <span key={item} className="flex min-w-10 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] px-2.5 py-2 text-[9px] font-semibold text-cyan-100/85 shadow-[inset_0_1px_0_rgba(255,255,255,.035)]">{item}</span>)}
          </div>

          <p className="mt-auto text-[7px] font-mono uppercase tracking-[0.18em] text-slate-500">Frontend systems · spatial interfaces · product delivery</p>
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
  const x = side === "left" ? -HALF_PAGE - 0.055 : HALF_PAGE + 0.085;
  const direction = side === "left" ? -1 : 1;
  const visibleLayers = Math.max(2, Math.min(TOTAL_PAPER_LAYERS, layers));
  return (
    <group>
      {Array.from({ length: visibleLayers }, (_, index) => (
        <mesh key={`${side}-${index}`} position={[x + direction * index * 0.006, 0, -0.145 + index * 0.024]} rotation={[0, side === "left" ? 0.012 : -0.012, direction * index * 0.001]}>
          <boxGeometry args={[PAGE_WIDTH - 0.11 - index * 0.005, PAGE_HEIGHT - 0.12 - index * 0.003, 0.019]} />
          <meshStandardMaterial color={index % 2 === 0 ? "#e3ebf4" : "#cfdbe8"} roughness={0.82} emissive={side === "right" && index > visibleLayers - 4 ? "#5847c9" : "#000000"} emissiveIntensity={side === "right" && index > visibleLayers - 4 ? 0.07 : 0} />
        </mesh>
      ))}
    </group>
  );
}

function Hardcover({ position }: { position: [number, number, number] }) {
  return <RoundedBox args={[PAGE_WIDTH + 0.22, PAGE_HEIGHT + 0.24, 0.36]} radius={0.12} smoothness={5} position={position}><meshPhysicalMaterial color="#071127" roughness={0.3} metalness={0.38} clearcoat={0.96} clearcoatRoughness={0.13} emissive="#15265b" emissiveIntensity={0.17} /></RoundedBox>;
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

    progress.current = Math.min(1, progress.current + delta * 1.45);
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
      const curlAngle = baseAngle + (dir > 0 ? -1 : 1) * curveStrength * 0.56 * (u - 0.42);
      const curlLift = Math.sin(u * Math.PI) * curveStrength * 0.58;
      const edgeLift = Math.pow(u, 1.55) * curveStrength * 0.28;
      const x = Math.cos(curlAngle) * startX;
      const z = -Math.sin(curlAngle) * startX + curlLift + edgeLift;
      const y = baseY + Math.sin(u * Math.PI) * curveStrength * 0.075;
      position.setXYZ(index, x, y, z);
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();

    content.rotation.y = baseAngle * 0.94;
    content.rotation.z = Math.sin(eased * Math.PI) * 0.025 * dir;
    content.position.z = 0.33 + curveStrength * 0.2;
  });

  return (
    <>
      <mesh ref={meshRef} geometry={geometry} position={[0, 0.02, 0.3]} castShadow>
        <meshPhysicalMaterial color="#e2e9f1" side={THREE.DoubleSide} roughness={0.7} metalness={0.01} clearcoat={0.15} emissive="#735bd8" emissiveIntensity={0.035} />
      </mesh>
      <group ref={contentRef} position={[0, 0.02, 0.33]}>
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
  const leftLayers = Math.max(2, currentSpread + 2);
  const rightLayers = Math.max(2, TOTAL_PAPER_LAYERS - currentSpread);

  useFrame((_, delta) => {
    const root = rootRef.current;
    const frontCover = frontCoverRef.current;
    if (!root || !frontCover) return;
    const speed = reducedMotion ? 18 : 4.6;
    root.position.x = THREE.MathUtils.damp(root.position.x, open ? 0 : -HALF_PAGE + 0.16, speed, delta);
    root.position.y = THREE.MathUtils.damp(root.position.y, open ? -0.14 : -0.16, speed, delta);
    root.rotation.x = THREE.MathUtils.damp(root.rotation.x, open ? -0.08 : -0.075, speed, delta);
    root.rotation.y = THREE.MathUtils.damp(root.rotation.y, open ? -0.015 : -0.48, speed, delta);
    root.rotation.z = THREE.MathUtils.damp(root.rotation.z, open ? 0 : -0.018, speed, delta);
    const targetScale = open ? 0.82 : 0.79;
    root.scale.x = THREE.MathUtils.damp(root.scale.x, targetScale, speed, delta);
    root.scale.y = THREE.MathUtils.damp(root.scale.y, targetScale, speed, delta);
    root.scale.z = THREE.MathUtils.damp(root.scale.z, targetScale, speed, delta);
    frontCover.rotation.y = THREE.MathUtils.damp(frontCover.rotation.y, open ? -Math.PI : 0, reducedMotion ? 20 : 4.0, delta);
  });

  return (
    <group ref={rootRef} position={[-HALF_PAGE + 0.16, -0.16, 0]} rotation={[-0.075, -0.48, -0.018]} scale={0.79}>
      <Hardcover position={[HALF_PAGE + 0.11, 0, -0.28]} />
      {open && <Hardcover position={[-HALF_PAGE - 0.08, 0, -0.28]} />}
      {open && <PaperStack side="left" layers={leftLayers} />}
      <PaperStack side="right" layers={rightLayers} />

      {!open && (
        <mesh position={[HALF_PAGE + 0.22, 0, -0.035]} rotation={[0, -0.01, 0]}>
          <boxGeometry args={[PAGE_WIDTH - 0.16, PAGE_HEIGHT - 0.13, 0.045]} />
          <meshPhysicalMaterial color="#1c1750" roughness={0.5} metalness={0.08} emissive="#6d28d9" emissiveIntensity={0.22} transparent opacity={0.92} />
        </mesh>
      )}

      {open && <group position={[-HALF_PAGE - 0.035, 0, 0.19]} rotation={[0, 0.072, 0.012]}><PageFrame><SpreadPageContent index={currentSpread} side="left" /></PageFrame></group>}
      {open && <group position={[HALF_PAGE + 0.035, 0, 0.19]} rotation={[0, -0.072, -0.012]}><PageFrame><SpreadPageContent index={currentSpread} side="right" /></PageFrame></group>}

      <group ref={frontCoverRef} position={[0, 0, 0.2]}>
        <group position={[HALF_PAGE, 0, 0]} onClick={() => { if (!open) nextSpread(); }}>
          <RoundedBox args={[PAGE_WIDTH + 0.24, PAGE_HEIGHT + 0.26, 0.38]} radius={0.125} smoothness={5}>
            <meshPhysicalMaterial color="#07122b" roughness={0.24} metalness={0.48} clearcoat={1} clearcoatRoughness={0.08} emissive="#162963" emissiveIntensity={0.22} />
          </RoundedBox>
          {!open && <CoverContent />}
        </group>
      </group>

      <mesh position={[0, 0, -0.025]}><boxGeometry args={[0.22, PAGE_HEIGHT + 0.12, 0.5]} /><meshPhysicalMaterial color="#061d3b" roughness={0.3} metalness={0.5} clearcoat={0.85} emissive="#22d3ee" emissiveIntensity={0.2} /></mesh>
      {!open && <Text position={[0.02, 0, 0.24]} rotation={[0, 0, Math.PI / 2]} fontSize={0.085} color="#67e8f9" letterSpacing={0.12}>PORTFOLIO · NVT</Text>}

      {open && <mesh position={[0, 0, 0.24]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.075, 0.12, PAGE_HEIGHT - 0.22, 18]} /><meshStandardMaterial color="#050b17" emissive="#152756" emissiveIntensity={0.14} /></mesh>}
      {open && <CurvedTurningPage currentSpread={currentSpread} direction={direction} reducedMotion={reducedMotion} />}
      {open && <mesh position={[-PAGE_WIDTH - 0.08, 0, 0.4]} onClick={previousSpread}><planeGeometry args={[0.5, PAGE_HEIGHT - 0.45]} /><meshBasicMaterial transparent opacity={0} /></mesh>}
      {open && <mesh position={[PAGE_WIDTH + 0.08, 0, 0.4]} onClick={nextSpread}><planeGeometry args={[0.5, PAGE_HEIGHT - 0.45]} /><meshBasicMaterial transparent opacity={0} /></mesh>}

      <mesh position={[-0.06, -PAGE_HEIGHT / 2 - 0.27, -0.08]} rotation={[0, 0, 0.08]}><boxGeometry args={[0.08, 0.78, 0.026]} /><meshStandardMaterial color="#7c3aed" emissive="#8b5cf6" emissiveIntensity={0.4} /></mesh>
    </group>
  );
}

function HolographicStage({ lightMode }: { lightMode: boolean }) {
  return (
    <group position={[0, -3.05, -0.36]}>
      <gridHelper args={[12, 24, lightMode ? "#7da4c8" : "#123455", lightMode ? "#bed1e5" : "#081a2e"]} position={[0, -0.05, 0]} />
      {[1.85, 2.55, 3.35, 4.25].map((radius, index) => <mesh key={radius} rotation={[Math.PI / 2, 0, index * 0.14]}><torusGeometry args={[radius, index === 1 ? 0.018 : 0.009, 8, 144]} /><meshBasicMaterial color={index % 2 ? "#8b5cf6" : "#22d3ee"} transparent opacity={lightMode ? 0.11 : 0.36 - index * 0.055} /></mesh>)}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.025, 0]}><circleGeometry args={[1.48, 96]} /><meshBasicMaterial color="#102c54" transparent opacity={lightMode ? 0.035 : 0.085} /></mesh>
      <pointLight position={[0, 0.65, 0]} intensity={lightMode ? 2.5 : 5.8} color="#22d3ee" distance={7} />
      <pointLight position={[2.8, 0.3, 0.8]} intensity={lightMode ? 1.6 : 3.8} color="#8b5cf6" distance={7} />
    </group>
  );
}

export function SpatialCvScene({ reducedMotion, lightMode }: { reducedMotion: boolean; lightMode: boolean }) {
  const { currentSpread } = useSpatialCv();
  const open = currentSpread > 0;
  const background = lightMode ? "#eaf2ff" : "#020711";

  return (
    <>
      <color attach="background" args={[background]} />
      <fog attach="fog" args={[background, 13, 24]} />
      {!lightMode && <Stars radius={20} depth={14} count={190} factor={1.55} saturation={0} fade speed={0.16} />}
      <ambientLight intensity={lightMode ? 1.55 : 0.56} />
      <directionalLight position={[5, 7, 8]} intensity={lightMode ? 3.1 : 2.55} color={lightMode ? "#ffffff" : "#dce8ff"} />
      <directionalLight position={[-6, 0, 4]} intensity={lightMode ? 0.9 : 1.45} color="#22d3ee" />
      <directionalLight position={[5, 0.5, 2]} intensity={lightMode ? 0.7 : 1.25} color="#8b5cf6" />
      <HolographicStage lightMode={lightMode} />
      <BookModel reducedMotion={reducedMotion} />
      <OrbitControls makeDefault enablePan={false} enableZoom enableRotate={!open} minDistance={open ? 9.2 : 7.8} maxDistance={open ? 15.5 : 15} minPolarAngle={Math.PI * 0.3} maxPolarAngle={Math.PI * 0.68} rotateSpeed={0.38} zoomSpeed={0.58} dampingFactor={0.08} enableDamping target={[0, -0.16, 0]} />
    </>
  );
}
