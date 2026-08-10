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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  education,
  experience,
  personalInfo,
  skillCategories,
  summary,
  type Project,
} from "@/data/profile";

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
    <div className="grid gap-3 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="spatial-focus-card p-4 sm:p-5">
        <p className="spatial-focus-kicker">Professional summary</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">{personalInfo.name}</h3>
        <p className="mt-1 text-sm font-medium text-cyan-300">{personalInfo.title}</p>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-300/80">{summary}</p>
      </div>
      <div className="spatial-focus-card p-4 sm:p-5">
        <p className="spatial-focus-kicker">Core focus</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
          {["Frontend architecture", "Complex enterprise workflows", "Realtime product interfaces", "GIS / map systems", "Design systems", "Cross-team delivery"].map((item) => (
            <div key={item} className="rounded-lg border border-white/8 bg-white/[0.025] px-3 py-2.5 text-sm text-slate-200">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExperienceProjectDetail({ project }: { project: Project }) {
  return (
    <article className="grid gap-4 border-t border-white/8 py-5 xl:grid-cols-[0.82fr_1.18fr] xl:gap-8">
      <div>
        <h4 className="text-sm font-semibold tracking-tight text-white sm:text-base">{project.name}</h4>
        <p className="mt-2 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => <span key={tech} className="spatial-tech-chip">{tech}</span>)}
        </div>
      </div>
      <div className="space-y-2">
        {project.highlights.map((highlight) => (
          <div key={highlight} className="flex gap-3 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_10px_currentColor]" />
            <span>{highlight}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function ExperienceContent() {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 xl:grid-cols-[0.78fr_1.22fr] xl:items-end">
        <div className="spatial-focus-card p-4 sm:p-5">
          <p className="spatial-focus-kicker">Complete experience</p>
          <h3 className="mt-2 text-2xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-3xl">
            Roles, products, and <span className="text-gradient">delivery ownership.</span>
          </h3>
        </div>
        <div className="spatial-focus-card p-4 sm:p-5">
          <p className="text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
            CV-backed experience across financial operations, mobility, healthcare, commerce, GIS intelligence,
            enterprise platforms, and Web3 integrations. Open a role to inspect the products, stack, and delivery details.
          </p>
        </div>
      </div>

      <div className="spatial-focus-card overflow-hidden">
        <div className="flex items-center gap-3 border-b border-white/8 px-4 py-3 sm:px-5">
          <Activity className="size-4 text-cyan-300" aria-hidden="true" />
          <span className="spatial-focus-kicker">Professional journey</span>
        </div>
        <Accordion type="multiple" defaultValue={[experience[0]?.id ?? ""]}>
          {experience.map((entry, index) => (
            <AccordionItem key={entry.id} value={entry.id} className="border-b border-white/8 last:border-b-0">
              <AccordionTrigger className="px-4 py-4 hover:no-underline sm:px-5 sm:py-5">
                <span className="grid min-w-0 flex-1 gap-2 pr-4 text-left sm:grid-cols-[42px_1fr_auto] sm:items-center sm:gap-5">
                  <span className="font-mono text-[10px] text-cyan-300 sm:text-xs">0{index + 1}</span>
                  <span>
                    <span className="block text-sm font-semibold text-white sm:text-base">{entry.role}</span>
                    <span className="mt-0.5 block text-xs text-violet-300 sm:text-sm">{entry.company}</span>
                  </span>
                  <span className="text-[10px] font-normal text-slate-400 sm:text-right sm:text-xs">
                    {entry.period}
                    {entry.location ? <span className="mt-0.5 block">{entry.location}</span> : null}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-1 sm:px-5 sm:pl-[5.9rem]">
                {entry.projects.map((project) => <ExperienceProjectDetail key={project.name} project={project} />)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

function ProjectsContent() {
  return (
    <div className="grid gap-2.5 md:grid-cols-2 2xl:grid-cols-3">
      {selectedProjects.map((project) => (
        <article key={project.name} className="spatial-focus-card flex min-h-44 flex-col p-4">
          <p className="text-[9px] font-mono uppercase tracking-[0.14em] text-cyan-300/75">{project.company}</p>
          <h3 className="mt-2 text-sm font-semibold leading-5 text-white">{project.name}</h3>
          <p className="mt-2 line-clamp-3 text-[11px] leading-4 text-slate-400">{project.description}</p>
          <div className="mt-auto flex flex-wrap gap-1 pt-3">
            {project.techStack.slice(0, 5).map((tech) => <span key={tech} className="spatial-tech-chip">{tech}</span>)}
          </div>
        </article>
      ))}
    </div>
  );
}

function SkillsContent() {
  return (
    <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {skillCategories.map((category) => (
        <div key={category.id} className="spatial-focus-card p-4">
          <p className="spatial-focus-kicker">{category.label}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">{category.skills.map((skill) => <span key={skill} className="spatial-tech-chip">{skill}</span>)}</div>
        </div>
      ))}
    </div>
  );
}

function EducationContent() {
  return (
    <div className="grid gap-3 xl:grid-cols-[1.15fr_0.85fr]">
      {education.map((item) => (
        <div key={item.id} className="spatial-focus-card p-5">
          <p className="spatial-focus-kicker">Academic background</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{item.school}</h3>
          <p className="mt-2 text-sm text-violet-300">{item.degree} · {item.field}</p>
          <p className="mt-3 text-sm text-slate-400">{item.period}</p>
          {item.detail && <p className="mt-1 text-sm font-medium text-cyan-300">{item.detail}</p>}
        </div>
      ))}
      <div className="spatial-focus-card p-5">
        <p className="spatial-focus-kicker">Engineering perspective</p>
        <p className="mt-3 text-sm leading-6 text-slate-300/80">Electronics and Telecommunication training combined with frontend product work across realtime, spatial, enterprise, and Web3 systems.</p>
      </div>
    </div>
  );
}

function ContactContent() {
  return (
    <div className="grid gap-3 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="spatial-focus-card p-5">
        <p className="spatial-focus-kicker">Let&apos;s connect</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">Open to frontend product roles and complex enterprise projects.</h3>
        <div className="mt-5 flex flex-wrap gap-2">
          <a href={`mailto:${personalInfo.email}`} className="rounded-xl border border-cyan-300/25 bg-cyan-300/8 px-4 py-3 text-sm font-medium text-cyan-200 transition hover:bg-cyan-300/12">{personalInfo.email}</a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-violet-300/25 bg-violet-300/8 px-4 py-3 text-sm font-medium text-violet-200 transition hover:bg-violet-300/12">LinkedIn <ExternalLink className="size-4" /></a>
        </div>
      </div>
      <div className="spatial-focus-card space-y-3 p-5">
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
    <div key={view} className="spatial-focus-enter absolute inset-1 z-20 overflow-y-auto rounded-[1.2rem] border border-cyan-300/15 bg-[#050a17]/94 p-3 shadow-[0_32px_120px_rgba(3,8,30,.72)] backdrop-blur-2xl sm:inset-2 sm:p-4 xl:inset-3 xl:p-5">
      <div className="sticky top-0 z-10 mb-3 flex items-start justify-between gap-3 rounded-xl border border-white/8 bg-[#071020]/92 p-2.5 backdrop-blur-xl sm:p-3">
        <div className="flex min-w-0 items-start gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/8 text-cyan-300"><Icon className="size-4" /></span>
          <div className="min-w-0">
            <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-violet-300">Focused CV section</p>
            <h2 className="mt-0.5 truncate text-lg font-semibold tracking-[-0.03em] text-white sm:text-xl">{meta.label}</h2>
          </div>
        </div>
        <button type="button" onClick={() => focusView("overview")} className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 text-xs font-medium text-slate-300 transition hover:border-cyan-300/25 hover:text-white">
          <ArrowLeft className="size-4" /> <span className="hidden sm:inline">Back to Overview</span>
        </button>
      </div>
      {renderContent(view)}
    </div>
  );
}
