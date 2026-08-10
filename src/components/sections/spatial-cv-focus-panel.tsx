"use client";

import type { ComponentType } from "react";
import {
  Activity,
  ArrowLeft,
  Blocks,
  Braces,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  UsersRound,
} from "lucide-react";

import { type CvView, useSpatialCv } from "@/components/spatial-cv-context";
import { education, experience, personalInfo, skillCategories, summary } from "@/data/profile";

const viewMeta: Record<Exclude<CvView, "overview">, { label: string; icon: ComponentType<{ className?: string }> }> = {
  profile: { label: "Profile", icon: UsersRound },
  experience: { label: "Experience", icon: Activity },
  projects: { label: "Projects", icon: Braces },
  skills: { label: "Skills", icon: Blocks },
  education: { label: "Education", icon: GraduationCap },
  contact: { label: "Contact", icon: Mail },
};

const selectedProjects = experience
  .flatMap((entry) => entry.projects.map((project) => ({ ...project, company: entry.company })))
  .filter((project) => /AML|Taxi Admin|MARINER25|SANO|METAME|DX Modules/i.test(project.name))
  .slice(0, 6);

function ProfileContent() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="spatial-focus-card p-5 sm:p-6">
        <p className="spatial-focus-kicker">Professional summary</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">{personalInfo.name}</h3>
        <p className="mt-1 text-sm font-medium text-cyan-300">{personalInfo.title}</p>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300/80">{summary}</p>
      </div>
      <div className="spatial-focus-card p-5 sm:p-6">
        <p className="spatial-focus-kicker">Core focus</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {["Frontend architecture", "Complex enterprise workflows", "Realtime product interfaces", "GIS / map systems", "Design systems", "Cross-team delivery"].map((item) => (
            <div key={item} className="rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-slate-200">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExperienceContent() {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
      <div className="spatial-focus-card p-5 sm:p-6">
        <p className="spatial-focus-kicker">Career timeline</p>
        <div className="relative mt-5 space-y-5 before:absolute before:bottom-2 before:left-[5px] before:top-2 before:w-px before:bg-gradient-to-b before:from-violet-400 before:via-cyan-400/60 before:to-transparent">
          {experience.map((entry) => (
            <div key={entry.id} className="relative pl-7">
              <span className="absolute left-0 top-1 size-[11px] rounded-full border-2 border-cyan-300 bg-[#07101f] shadow-[0_0_16px_rgba(34,211,238,.65)]" />
              <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-cyan-300/80">{entry.period}</p>
              <h4 className="mt-1 text-sm font-semibold text-white">{entry.role}</h4>
              <p className="mt-0.5 text-xs text-violet-300">{entry.company}</p>
              {entry.location && <p className="mt-1 text-xs text-slate-400">{entry.location}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="spatial-focus-card p-5 sm:p-6">
          <p className="spatial-focus-kicker">Current role</p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">Frontend Developer <span className="font-normal text-violet-300">| EKOTEK Technology JSC</span></h3>
          <p className="mt-4 text-sm leading-6 text-slate-300/80">Building enterprise products across banking, mobility, healthcare, e-commerce, and Web3, with ownership across architecture, complex workflows, API integration, code review, and frontend team support.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["React", "Next.js", "Nuxt 3", "Vue 3", "TypeScript", "React Query", "Zod", "Socket.IO", "OpenLayers"].map((tech) => <span key={tech} className="spatial-tech-chip">{tech}</span>)}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {[
            ["Banking / AML", "AML screening, risk assessment, transaction monitoring and backoffice workflows."],
            ["Mobility", "Taxi administration, booking flows, realtime status and operational tooling."],
            ["Healthcare", "Wearable-data dashboards, analytics and wellness administration."],
            ["GIS / Maritime", "Map-heavy monitoring, vessel tracking, spatial layers and realtime alerts."],
            ["Web3", "Wallet onboarding, NFT/token flows and realtime transaction tracking."],
            ["Enterprise DX", "Reusable design systems and shared frontend modules for business platforms."],
          ].map(([title, description]) => (
            <div key={title} className="spatial-focus-card p-4">
              <p className="text-sm font-semibold text-white">{title}</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsContent() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {selectedProjects.map((project) => (
        <article key={project.name} className="spatial-focus-card flex min-h-52 flex-col p-5">
          <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-cyan-300/75">{project.company}</p>
          <h3 className="mt-3 text-base font-semibold leading-6 text-white">{project.name}</h3>
          <p className="mt-3 line-clamp-4 text-xs leading-5 text-slate-400">{project.description}</p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
            {project.techStack.slice(0, 5).map((tech) => <span key={tech} className="spatial-tech-chip">{tech}</span>)}
          </div>
        </article>
      ))}
    </div>
  );
}

function SkillsContent() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {skillCategories.map((category) => (
        <div key={category.id} className="spatial-focus-card p-5">
          <p className="spatial-focus-kicker">{category.label}</p>
          <div className="mt-4 flex flex-wrap gap-2">{category.skills.map((skill) => <span key={skill} className="spatial-tech-chip">{skill}</span>)}</div>
        </div>
      ))}
    </div>
  );
}

function EducationContent() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
      {education.map((item) => (
        <div key={item.id} className="spatial-focus-card p-6">
          <p className="spatial-focus-kicker">Academic background</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">{item.school}</h3>
          <p className="mt-2 text-sm text-violet-300">{item.degree} · {item.field}</p>
          <p className="mt-4 text-sm text-slate-400">{item.period}</p>
          {item.detail && <p className="mt-1 text-sm font-medium text-cyan-300">{item.detail}</p>}
        </div>
      ))}
      <div className="spatial-focus-card p-6">
        <p className="spatial-focus-kicker">Engineering perspective</p>
        <p className="mt-4 text-sm leading-7 text-slate-300/80">Electronics and Telecommunication training combined with frontend product work across realtime, spatial, enterprise, and Web3 systems.</p>
      </div>
    </div>
  );
}

function ContactContent() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="spatial-focus-card p-6">
        <p className="spatial-focus-kicker">Let&apos;s connect</p>
        <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">Open to frontend product roles and complex enterprise projects.</h3>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={`mailto:${personalInfo.email}`} className="rounded-xl border border-cyan-300/25 bg-cyan-300/8 px-4 py-3 text-sm font-medium text-cyan-200 transition hover:bg-cyan-300/12">{personalInfo.email}</a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-violet-300/25 bg-violet-300/8 px-4 py-3 text-sm font-medium text-violet-200 transition hover:bg-violet-300/12">LinkedIn <ExternalLink className="size-4" /></a>
        </div>
      </div>
      <div className="spatial-focus-card space-y-4 p-6">
        <div className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 text-cyan-300" /><div><p className="text-xs uppercase tracking-[0.12em] text-slate-500">Location</p><p className="mt-1 text-sm text-slate-200">{personalInfo.location}</p></div></div>
        <div><p className="text-xs uppercase tracking-[0.12em] text-slate-500">Phone</p><a href={`tel:${personalInfo.phone.replace(/\s/g, "")}`} className="mt-1 block text-sm text-slate-200">{personalInfo.phone}</a></div>
        <a href={personalInfo.resumeUrl} download className="inline-flex text-sm font-medium text-cyan-300 hover:text-cyan-200">Download CV →</a>
      </div>
    </div>
  );
}

function renderContent(view: Exclude<CvView, "overview">) {
  if (view === "profile") return <ProfileContent />;
  if (view === "experience") return <ExperienceContent />;
  if (view === "projects") return <ProjectsContent />;
  if (view === "skills") return <SkillsContent />;
  if (view === "education") return <EducationContent />;
  return <ContactContent />;
}

export function SpatialCvFocusPanel() {
  const { activeView, focusView } = useSpatialCv();
  if (activeView === "overview") return null;

  const view = activeView as Exclude<CvView, "overview">;
  const meta = viewMeta[view];
  const Icon = meta.icon;

  return (
    <div key={view} className="spatial-focus-enter absolute inset-3 z-20 overflow-y-auto rounded-2xl border border-cyan-300/15 bg-[#050a17]/94 p-4 shadow-[0_32px_120px_rgba(3,8,30,.72)] backdrop-blur-2xl sm:inset-5 sm:p-6 lg:p-7">
      <div className="sticky top-0 z-10 mb-5 flex items-start justify-between gap-4 rounded-xl border border-white/8 bg-[#071020]/90 p-3 backdrop-blur-xl sm:p-4">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/8 text-cyan-300"><Icon className="size-5" /></span>
          <div className="min-w-0">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-violet-300">Focused CV section</p>
            <h2 className="mt-1 truncate text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">{meta.label}</h2>
          </div>
        </div>
        <button type="button" onClick={() => focusView("overview")} className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3 text-xs font-medium text-slate-300 transition hover:border-cyan-300/25 hover:text-white sm:px-4">
          <ArrowLeft className="size-4" /> <span className="hidden sm:inline">Back to Overview</span>
        </button>
      </div>
      {renderContent(view)}
    </div>
  );
}
