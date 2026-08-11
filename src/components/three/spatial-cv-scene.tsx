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
const PAPER_LAYERS = 14;

const selectedProjects = experience
  .flatMap((entry) => entry.projects.map((project) => ({ ...project, company: entry.company })))
  .filter((project) => /AML|Taxi Admin|MARINER25|SANO|METAME|DX Modules/i.test(project.name));

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-cyan-300">{children}</p>;
}

function PageSurface({ side }: { side: "left" | "right" }) {
  const geometry = React.useMemo(() => {
    const geo = new THREE.PlaneGeometry(PAGE_WIDTH, PAGE_HEIGHT, 36, 6);
    const position = geo.attributes.position as THREE.BufferAttribute;

    for (let index = 0; index < position.count; index += 1) {
      const x = position.getX(index);
      const y = position.getY(index);
      const u = (x + PAGE_WIDTH / 2) / PAGE_WIDTH;
      const gutter = side === "left" ? 1 - u : u;
      const outer = side === "left" ? u : 1 - u;
      const vertical = Math.abs(y) / (PAGE_HEIGHT / 2);

      const z = -0.16 * Math.pow(gutter, 2.1)
        + 0.11 * Math.pow(outer, 2.5)
        + 0.02 * Math.sin(u * Math.PI);
      const yLift = 0.2 * Math.pow(outer, 2.1) * (0.35 + 0.65 * vertical);

      position.setXYZ(index, x, y + yLift, z);
    }

    position.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, [side]);

  React.useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        color="#07101f"
        roughness={0.93}
        metalness={0}
        emissive="#020611"
        emissiveIntensity={0.025}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function PageFrame({ side, children }: { side: "left" | "right"; children: React.ReactNode }) {
  return (
    <>
      <PageSurface side={side} />
      <Html
        transform
        occlude={false}
        position={[0, 0.01, 0.09]}
        distanceFactor={3.62}
        style={{ width: 500, height: 640, pointerEvents: "auto" }}
      >
        <div className="relative h-[640px] w-[500px] overflow-hidden px-8 py-8 text-slate-100">
          <div className="pointer-events-none absolute left-6 top-6 h-px w-14 bg-gradient-to-r from-cyan-300/45 to-transparent" />
          <div className="pointer-events-none absolute bottom-6 right-6 h-px w-14 bg-gradient-to-l from-violet-300/40 to-transparent" />
          <div className="relative z-10 h-full">{children}</div>
        </div>
      </Html>
    </>
  );
}

const coverTech = [
  { label: "⚛", className: "text-cyan-300" },
  { label: "TS", className: "text-blue-300" },
  { label: "JS", className: "text-yellow-300" },
  { label: "〰", className: "text-cyan-200" },
  { label: "S", className: "text-pink-300" },
];

function CoverContent() {
  return (
    <Html
      transform
      position={[0, 0.02, 0.225]}
      distanceFactor={3.82}
      style={{ width: 510, height: 650, pointerEvents: "none" }}
    >
      <div className="relative h-[650px] w-[510px] overflow-hidden px-11 py-11 text-white">
        <div className="absolute inset-4 rounded-[18px] border border-cyan-200/[0.1]" />
        <div className="absolute left-8 top-8 h-10 w-10 border-l border-t border-cyan-300/42" />
        <div className="absolute bottom-8 right-8 h-10 w-10 border-b border-r border-cyan-300/32" />
        <div className="relative z-10 flex h-full flex-col items-center text-center">
          <p className="mt-6 text-[8px] font-mono uppercase tracking-[0.34em] text-slate-400">Welcome to my</p>
          <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.42em] text-gradient">Portfolio</p>
          <div className="mt-5 h-px w-16 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />

          <div className="mt-16">
            <h2 className="text-[32px] font-semibold leading-none tracking-[-0.05em] text-white">{personalInfo.name}</h2>
            <p className="mt-5 text-[14px] font-medium text-violet-300">&lt; {personalInfo.title} /&gt;</p>
          </div>

          <p className="mt-8 max-w-[330px] text-[9px] leading-[1.15rem] text-slate-400">
            Detail-oriented frontend developer building responsive, user-centered enterprise products across banking, commerce, healthcare, mobility, GIS and Web3.
          </p>

          <div className="mt-8 flex gap-2.5">
            {coverTech.map((item) => (
              <div key={item.label} className={`flex size-9 items-center justify-center rounded-lg border border-white/[0.07] bg-[#07101e]/80 text-[10px] font-bold ${item.className}`}>
                {item.label}
              </div>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-3 text-[7px] font-mono uppercase tracking-[0.16em] text-slate-500">
            <span>Let&apos;s build something</span><span className="text-cyan-300">great together</span>
          </div>
        </div>
      </div>
    </Html>
  );
}

const coreStrengths = [
  "Frontend architecture",
  "Reusable component systems",
  "Complex business workflows",
  "Cross-functional collaboration",
  "Code review & mentoring",
];

function ExperiencePage({ side }: { side: "left" | "right" }) {
  if (side === "left") {
    return (
      <>
        <div className="flex items-start justify-between">
          <div>
            <Kicker>02 · Chapter</Kicker>
            <h2 className="mt-3 text-[36px] font-semibold leading-none tracking-[-0.055em]">Experience</h2>
            <p className="mt-2 text-[12px] text-violet-300">My professional journey and impact</p>
          </div>
          <div className="mt-5 flex size-9 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-300/[0.05] text-lg">▣</div>
        </div>

        <p className="mt-6 max-w-[405px] text-[10px] leading-[1.1rem] text-slate-400">
          3+ years building enterprise frontend applications with React, Next.js, Vue and TypeScript across product teams and client engagements.
        </p>

        <div className="mt-6 rounded-xl border border-cyan-300/[0.08] bg-cyan-300/[0.018] p-4">
          <Kicker>Professional summary</Kicker>
          <ul className="mt-3 space-y-2">
            {["3+ years in frontend development", "Enterprise product delivery", "Strong focus on performance & UX", "Agile mindset and team collaboration"].map((item) => (
              <li key={item} className="flex gap-2 text-[9px] text-slate-400"><span className="text-cyan-300">›</span>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 rounded-xl border border-cyan-300/[0.08] bg-cyan-300/[0.018] p-4">
          <Kicker>Core strengths</Kicker>
          <ul className="mt-3 grid gap-2">
            {coreStrengths.map((item) => (
              <li key={item} className="flex gap-2 text-[9px] text-slate-400"><span className="text-violet-300">›</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Kicker>Experience timeline</Kicker>
        <span className="rounded-md border border-cyan-300/10 px-2 py-1 text-[7px] uppercase tracking-[0.12em] text-cyan-300">Key highlights</span>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_100px] gap-4">
        <div className="relative space-y-5 before:absolute before:bottom-3 before:left-[6px] before:top-3 before:w-px before:bg-gradient-to-b before:from-cyan-300 before:via-violet-300/55 before:to-transparent">
          {experience.map((entry) => (
            <div key={entry.id} className="relative pl-7">
              <span className="absolute left-0 top-1 size-[12px] rounded-full border-2 border-cyan-200 bg-[#091427] shadow-[0_0_16px_rgba(34,211,238,.5)]" />
              <p className="text-[7px] font-mono uppercase tracking-[0.1em] text-violet-300">{entry.period}</p>
              <h3 className="mt-1 text-[11px] font-semibold text-white">{entry.role}</h3>
              <p className="text-[8px] text-slate-400">{entry.company}</p>
              <p className="mt-1.5 text-[7px] leading-3 text-slate-500">{entry.projects.slice(0, 2).map((project) => project.name).join(" · ")}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {[["3+", "Years experience"], ["FE", "Lead ownership"], ["Multi", "Domain delivery"]].map(([value, label]) => (
            <div key={label} className="rounded-xl border border-cyan-300/[0.08] bg-cyan-300/[0.018] p-3">
              <p className="text-[15px] font-semibold text-cyan-200">{value}</p>
              <p className="mt-1 text-[7px] leading-3 text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ProfilePage({ side }: { side: "left" | "right" }) {
  if (side === "left") {
    return <><Kicker>01 · Profile</Kicker><h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Professional profile.</h2><p className="mt-6 text-sm leading-7 text-slate-300/80">{summary}</p></>;
  }
  return <><Kicker>Core focus</Kicker><div className="mt-6 space-y-4">{["Frontend architecture", "Enterprise workflows", "Reusable UI systems", "Realtime interfaces"].map((item) => <div key={item} className="rounded-xl border border-white/8 bg-white/[0.02] p-4 text-xs text-slate-300">{item}</div>)}</div></>;
}

function DeliveryPage({ side }: { side: "left" | "right" }) {
  const projects = experience[0]?.projects.slice(0, 4) ?? [];
  const pageProjects = side === "left" ? projects.slice(0, 2) : projects.slice(2, 4);
  return <><Kicker>{side === "left" ? "Experience · Featured roles" : "Experience · Tech stack"}</Kicker><h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em]">{side === "left" ? "Selected delivery work." : "Ownership & implementation."}</h2><div className="mt-6 space-y-4">{pageProjects.map((project) => <article key={project.name} className="rounded-2xl border border-white/8 bg-white/[0.022] p-4"><h3 className="text-sm font-semibold text-white">{project.name}</h3><p className="mt-2 text-[11px] leading-5 text-slate-400">{project.description}</p><div className="mt-3 flex flex-wrap gap-1.5">{project.techStack.slice(0, 5).map((tech) => <span key={tech} className="rounded-full border border-cyan-300/15 px-2 py-1 text-[9px] text-cyan-200">{tech}</span>)}</div></article>)}</div></>;
}

function ProjectsPage({ side, second }: { side: "left" | "right"; second: boolean }) {
  const projects = second ? selectedProjects.slice(3, 6) : selectedProjects.slice(0, 3);
  if (side === "left") return <><Kicker>03 · Projects</Kicker><h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em]">{second ? "Spatial, realtime & Web3." : "Enterprise product systems."}</h2><p className="mt-6 text-sm leading-7 text-slate-400">Selected CV-backed work with product context and implementation stack.</p></>;
  return <div className="space-y-3">{projects.map((project) => <article key={project.name} className="rounded-xl border border-white/8 bg-white/[0.02] p-4"><p className="text-[8px] text-cyan-300/70">{project.company}</p><h3 className="mt-2 text-sm font-semibold text-white">{project.name}</h3><p className="mt-2 text-[10px] leading-4 text-slate-400">{project.description}</p></article>)}</div>;
}

function SkillsPage({ side }: { side: "left" | "right" }) {
  if (side === "left") return <><Kicker>04 · Skills</Kicker><h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em]">Frontend stack & engineering toolkit.</h2><p className="mt-6 text-sm leading-7 text-slate-400">Modern frontend architecture backed by realtime, GIS, Web3 and delivery tooling.</p></>;
  return <div className="grid grid-cols-2 gap-3">{skillCategories.map((category) => <div key={category.id} className="rounded-xl border border-white/8 bg-white/[0.02] p-3"><p className="text-[9px] font-semibold uppercase text-cyan-300">{category.label}</p><p className="mt-2 text-[10px] leading-4 text-slate-400">{category.skills.join(" · ")}</p></div>)}</div>;
}

function EducationPage({ side }: { side: "left" | "right" }) {
  const item = education[0];
  if (side === "left") return <><Kicker>05 · Education</Kicker><h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em]">Engineering foundation.</h2></>;
  return <div className="mt-12 rounded-2xl border border-cyan-300/12 bg-cyan-300/[0.025] p-6"><p className="text-[9px] uppercase text-cyan-300">Academic background</p><h3 className="mt-4 text-2xl font-semibold text-white">{item?.school}</h3><p className="mt-4 text-sm text-violet-300">{item?.degree} · {item?.field}</p><p className="mt-6 text-xs text-slate-400">{item?.period}</p><p className="mt-2 text-xl font-semibold text-cyan-300">{item?.detail}</p></div>;
}

function ContactPage({ side }: { side: "left" | "right" }) {
  if (side === "left") return <><Kicker>06 · Contact</Kicker><h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em]">Let&apos;s build something useful.</h2></>;
  return <div className="mt-8 space-y-4">{[["Email", personalInfo.email], ["Phone", personalInfo.phone], ["Location", personalInfo.location]].map(([label, value]) => <div key={label} className="border-b border-white/8 pb-4"><p className="text-[9px] uppercase text-cyan-300">{label}</p><p className="mt-2 text-sm text-slate-200">{value}</p></div>)}</div>;
}

function SpreadContent({ index, side }: { index: number; side: "left" | "right" }) {
  if (index === 1) return <ProfilePage side={side} />;
  if (index === 2) return <ExperiencePage side={side} />;
  if (index === 3) return <DeliveryPage side={side} />;
  if (index === 4) return <ProjectsPage side={side} second={false} />;
  if (index === 5) return <ProjectsPage side={side} second />;
  if (index === 6) return <SkillsPage side={side} />;
  if (index === 7) return <EducationPage side={side} />;
  return <ContactPage side={side} />;
}

function PaperStack({ side, layers }: { side: "left" | "right"; layers: number }) {
  const x = side === "left" ? -HALF_PAGE : HALF_PAGE;
  const direction = side === "left" ? -1 : 1;
  const visible = Math.max(2, Math.min(PAPER_LAYERS, layers));

  return (
    <group>
      {Array.from({ length: visible }, (_, index) => (
        <mesh key={`${side}-${index}`} position={[x + direction * index * 0.006, 0, -0.3 + index * 0.013]} rotation={[0, side === "left" ? 0.01 : -0.01, 0]}>
          <boxGeometry args={[PAGE_WIDTH - 0.1 - index * 0.008, PAGE_HEIGHT - 0.13 - index * 0.004, 0.011]} />
          <meshStandardMaterial color={index % 4 === 0 ? "#15152e" : "#0c1423"} roughness={0.92} emissive={index % 4 === 0 ? "#321f65" : "#050914"} emissiveIntensity={index % 4 === 0 ? 0.07 : 0.01} />
        </mesh>
      ))}
    </group>
  );
}

function Hardcover({ position }: { position: [number, number, number] }) {
  return (
    <RoundedBox args={[PAGE_WIDTH + 0.27, PAGE_HEIGHT + 0.29, 0.42]} radius={0.135} smoothness={5} position={position}>
      <meshPhysicalMaterial color="#07122b" roughness={0.78} metalness={0.04} clearcoat={0.18} clearcoatRoughness={0.5} emissive="#091026" emissiveIntensity={0.02} />
    </RoundedBox>
  );
}

function CurledOuterPage() {
  const geometry = React.useMemo(() => {
    const width = 0.45;
    const geo = new THREE.PlaneGeometry(width, PAGE_HEIGHT - 0.26, 20, 5);
    geo.translate(width / 2, 0, 0);
    const position = geo.attributes.position as THREE.BufferAttribute;

    for (let index = 0; index < position.count; index += 1) {
      const x = position.getX(index);
      const y = position.getY(index);
      const u = Math.max(0, Math.min(1, x / width));
      position.setXYZ(
        index,
        x - 0.25 * u * u,
        y + 0.28 * u * u,
        Math.pow(u, 1.35) * 0.95 + Math.sin(u * Math.PI) * 0.12,
      );
    }

    position.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, []);

  React.useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh geometry={geometry} position={[3.58, 0.02, 0.32]} rotation={[0, -0.04, -0.01]} castShadow>
      <meshPhysicalMaterial color="#111831" roughness={0.68} metalness={0} emissive="#6d28d9" emissiveIntensity={0.06} transparent opacity={0.68} side={THREE.DoubleSide} />
    </mesh>
  );
}

function TurningPage({ currentSpread, direction, reducedMotion }: { currentSpread: number; direction: -1 | 0 | 1; reducedMotion: boolean }) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const previous = React.useRef(currentSpread);
  const progress = React.useRef(1);

  const geometry = React.useMemo(() => {
    const geo = new THREE.PlaneGeometry(PAGE_WIDTH - 0.08, PAGE_HEIGHT - 0.12, 40, 4);
    geo.translate((PAGE_WIDTH - 0.08) / 2, 0, 0);
    geo.userData.original = new Float32Array(geo.attributes.position.array as Float32Array);
    return geo;
  }, []);

  React.useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (previous.current !== currentSpread) {
      previous.current = currentSpread;
      progress.current = reducedMotion ? 1 : 0;
    }

    const mesh = meshRef.current;
    if (!mesh) return;

    progress.current = Math.min(1, progress.current + delta * 1.45);
    const eased = 1 - Math.pow(1 - progress.current, 3);
    mesh.visible = currentSpread > 0 && eased < 0.999;

    const position = geometry.attributes.position as THREE.BufferAttribute;
    const original = geometry.userData.original as Float32Array;
    const dir = direction || 1;
    const width = PAGE_WIDTH - 0.08;
    const strength = Math.sin(eased * Math.PI);
    const baseAngle = (dir > 0 ? -1 : 1) * Math.PI * eased;

    for (let index = 0; index < position.count; index += 1) {
      const baseX = original[index * 3];
      const baseY = original[index * 3 + 1];
      const u = Math.max(0, Math.min(1, baseX / width));
      const startX = dir > 0 ? baseX : -baseX;
      const angle = baseAngle + (dir > 0 ? -1 : 1) * strength * 0.72 * (u - 0.42);
      position.setXYZ(index, Math.cos(angle) * startX, baseY + Math.sin(u * Math.PI) * strength * 0.08, -Math.sin(angle) * startX + Math.sin(u * Math.PI) * strength * 0.7);
    }

    position.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0.02, 0.34]} castShadow>
      <meshPhysicalMaterial color="#dce5ef" side={THREE.DoubleSide} roughness={0.75} clearcoat={0.08} emissive="#57428c" emissiveIntensity={0.02} />
    </mesh>
  );
}

function BookModel({ reducedMotion }: { reducedMotion: boolean }) {
  const { currentSpread, direction, nextSpread, previousSpread } = useSpatialCv();
  const open = currentSpread > 0;
  const rootRef = React.useRef<THREE.Group>(null);
  const frontCoverRef = React.useRef<THREE.Group>(null);
  const leftLayers = Math.max(3, currentSpread + 3);
  const rightLayers = Math.max(3, PAPER_LAYERS - currentSpread);

  useFrame((_, delta) => {
    const root = rootRef.current;
    const cover = frontCoverRef.current;
    if (!root || !cover) return;

    const speed = reducedMotion ? 18 : 4.5;
    root.position.x = THREE.MathUtils.damp(root.position.x, open ? 0 : -HALF_PAGE + 0.24, speed, delta);
    root.position.y = THREE.MathUtils.damp(root.position.y, open ? 0.42 : 0.14, speed, delta);
    root.rotation.x = THREE.MathUtils.damp(root.rotation.x, open ? -0.16 : -0.07, speed, delta);
    root.rotation.y = THREE.MathUtils.damp(root.rotation.y, open ? 0 : -0.5, speed, delta);
    root.rotation.z = THREE.MathUtils.damp(root.rotation.z, open ? 0 : -0.018, speed, delta);

    root.scale.x = THREE.MathUtils.damp(root.scale.x, open ? 1.08 : 0.98, speed, delta);
    root.scale.y = THREE.MathUtils.damp(root.scale.y, open ? 0.96 : 0.98, speed, delta);
    root.scale.z = THREE.MathUtils.damp(root.scale.z, open ? 1.0 : 0.98, speed, delta);
    cover.rotation.y = THREE.MathUtils.damp(cover.rotation.y, open ? -Math.PI : 0, reducedMotion ? 20 : 4, delta);
  });

  return (
    <group ref={rootRef} position={[-HALF_PAGE + 0.24, 0.14, 0]} rotation={[-0.07, -0.5, -0.018]} scale={[0.98, 0.98, 0.98]}>
      <Hardcover position={[HALF_PAGE + 0.16, 0, -0.3]} />
      {open && <Hardcover position={[-HALF_PAGE - 0.11, 0, -0.3]} />}
      {open && <PaperStack side="left" layers={leftLayers} />}
      <PaperStack side="right" layers={rightLayers} />

      {!open && <mesh position={[HALF_PAGE + 0.3, 0, -0.05]}><boxGeometry args={[PAGE_WIDTH - 0.12, PAGE_HEIGHT - 0.08, 0.055]} /><meshStandardMaterial color="#25195b" roughness={0.8} emissive="#6d28d9" emissiveIntensity={0.07} /></mesh>}
      {!open && <mesh position={[HALF_PAGE + 0.4, 0, -0.1]}><boxGeometry args={[PAGE_WIDTH - 0.18, PAGE_HEIGHT - 0.15, 0.04]} /><meshStandardMaterial color="#11344f" roughness={0.82} emissive="#22d3ee" emissiveIntensity={0.015} /></mesh>}

      {open && <group position={[-HALF_PAGE - 0.045, 0, 0.22]} rotation={[0, 0.13, 0.012]}><PageFrame side="left"><SpreadContent index={currentSpread} side="left" /></PageFrame></group>}
      {open && <group position={[HALF_PAGE + 0.045, 0, 0.22]} rotation={[0, -0.13, -0.012]}><PageFrame side="right"><SpreadContent index={currentSpread} side="right" /></PageFrame></group>}
      {open && <CurledOuterPage />}

      <group ref={frontCoverRef} position={[0, 0, 0.21]}>
        <group position={[HALF_PAGE, 0, 0]} onClick={() => { if (!open) nextSpread(); }}>
          <RoundedBox args={[PAGE_WIDTH + 0.27, PAGE_HEIGHT + 0.29, 0.42]} radius={0.135} smoothness={5}>
            <meshPhysicalMaterial color="#07122b" roughness={0.82} metalness={0.03} clearcoat={0.12} clearcoatRoughness={0.55} emissive="#080f22" emissiveIntensity={0.018} />
          </RoundedBox>
          {!open && <CoverContent />}
        </group>
      </group>

      <mesh position={[0, 0, -0.025]}><boxGeometry args={[0.25, PAGE_HEIGHT + 0.15, 0.54]} /><meshStandardMaterial color="#071a31" roughness={0.75} emissive="#22d3ee" emissiveIntensity={0.03} /></mesh>
      {!open && <Text position={[0.02, 0, 0.25]} rotation={[0, 0, Math.PI / 2]} fontSize={0.085} color="#67e8f9" letterSpacing={0.12}>PORTFOLIO · NVT</Text>}
      {open && <mesh position={[0, 0, 0.16]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.1, 0.16, PAGE_HEIGHT - 0.2, 24]} /><meshStandardMaterial color="#030813" emissive="#17285b" emissiveIntensity={0.06} /></mesh>}
      {open && <TurningPage currentSpread={currentSpread} direction={direction} reducedMotion={reducedMotion} />}

      {open && <mesh position={[-PAGE_WIDTH - 0.08, 0, 0.42]} onClick={previousSpread}><planeGeometry args={[0.52, PAGE_HEIGHT - 0.4]} /><meshBasicMaterial transparent opacity={0} /></mesh>}
      {open && <mesh position={[PAGE_WIDTH + 0.08, 0, 0.42]} onClick={nextSpread}><planeGeometry args={[0.52, PAGE_HEIGHT - 0.4]} /><meshBasicMaterial transparent opacity={0} /></mesh>}

      <mesh position={[-0.07, -PAGE_HEIGHT / 2 - 0.27, -0.08]} rotation={[0, 0, 0.08]}><boxGeometry args={[0.085, 0.82, 0.028]} /><meshStandardMaterial color="#7c3aed" emissive="#8b5cf6" emissiveIntensity={0.26} /></mesh>
    </group>
  );
}

function Stage({ lightMode }: { lightMode: boolean }) {
  return (
    <group position={[0, -2.45, -0.4]}>
      <gridHelper args={[12, 24, lightMode ? "#7da4c8" : "#102d4b", lightMode ? "#bed1e5" : "#071728"]} position={[0, -0.05, 0]} />
      {[1.72, 2.35, 3.05, 3.82].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, index * 0.14]}>
          <torusGeometry args={[radius, index === 1 ? 0.02 : 0.009, 8, 144]} />
          <meshBasicMaterial color={index % 2 ? "#8b5cf6" : "#22d3ee"} transparent opacity={lightMode ? 0.06 : 0.22 - index * 0.035} />
        </mesh>
      ))}
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
      {!lightMode && <Stars radius={20} depth={14} count={180} factor={1.5} saturation={0} fade speed={0.15} />}
      <ambientLight intensity={lightMode ? 1.25 : 0.28} />
      <directionalLight position={[5, 8, 9]} intensity={lightMode ? 2 : 0.95} color={lightMode ? "#ffffff" : "#dce8ff"} />
      <directionalLight position={[-8, 2, 5]} intensity={lightMode ? 0.5 : 0.25} color="#22d3ee" />
      <directionalLight position={[8, 2, 4]} intensity={lightMode ? 0.45 : 0.22} color="#8b5cf6" />
      <Stage lightMode={lightMode} />
      <BookModel reducedMotion={reducedMotion} />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom
        enableRotate={!open}
        minDistance={open ? 8.8 : 7.6}
        maxDistance={15.5}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.68}
        rotateSpeed={0.36}
        zoomSpeed={0.56}
        dampingFactor={0.08}
        enableDamping
        target={[0, 0.16, 0]}
      />
    </>
  );
}
