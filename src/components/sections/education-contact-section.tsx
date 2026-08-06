import {
  ArrowUpRight,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { TrackedAnchor } from "@/components/tracked-anchor";
import { education, personalInfo } from "@/data/profile";

interface ContactActionProps {
  event: string;
  href: string;
  icon: LucideIcon;
  label: string;
  value: string;
  external?: boolean;
  download?: boolean;
}

function EducationCard() {
  const entry = education[0];
  if (!entry) return null;

  return (
    <div className="glass-panel relative overflow-hidden rounded-2xl p-5 sm:p-6">
      <div className="surface-grid pointer-events-none absolute inset-0 opacity-35" />
      <div className="relative flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
          <GraduationCap className="size-5" aria-hidden="true" />
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Education credential
          </p>
          <h3 className="mt-2 font-semibold leading-snug text-card-foreground">{entry.school}</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {entry.degree}, {entry.field}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="rounded-full border border-border/70 bg-background/50 px-3 py-1">
              {entry.period}
            </span>
            {entry.detail ? (
              <span className="rounded-full border border-border/70 bg-background/50 px-3 py-1">
                {entry.detail}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactAction({
  event,
  href,
  icon: Icon,
  label,
  value,
  external,
  download,
}: ContactActionProps) {
  return (
    <TrackedAnchor
      event={event}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download}
      className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-card/55 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-card/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-background/65 text-accent transition-colors duration-300 group-hover:border-accent/35 group-hover:bg-accent/10">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
        <span className="mt-1 block truncate text-sm font-medium text-foreground">{value}</span>
      </span>
      <ArrowUpRight
        className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        aria-hidden="true"
      />
    </TrackedAnchor>
  );
}

function ContactPortalVisual() {
  const nodes = [
    { icon: Mail, className: "left-[8%] top-[22%]", label: "Email" },
    { icon: ExternalLink, className: "right-[7%] top-[27%]", label: "LinkedIn" },
    { icon: Download, className: "bottom-[13%] left-[18%]", label: "CV" },
    { icon: Phone, className: "bottom-[11%] right-[18%]", label: "Phone" },
  ] as const;

  return (
    <div className="glass-panel relative min-h-[430px] overflow-hidden rounded-[2rem]" aria-hidden="true">
      <div className="surface-grid absolute inset-0 opacity-45" />
      <div className="ambient-glow absolute inset-0 m-auto size-72 rounded-full bg-accent/15 blur-3xl" />

      <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/18" />
      <div className="absolute left-1/2 top-1/2 size-60 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border border-dashed border-primary/30 [animation-duration:20s]" />
      <div className="absolute left-1/2 top-1/2 size-44 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border border-dashed border-accent/30 [animation-direction:reverse] [animation-duration:15s]" />

      <div className="absolute left-1/2 top-1/2 flex size-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-foreground/10 bg-background/85 shadow-[0_0_80px_rgba(59,232,255,0.16)] backdrop-blur-xl">
        <Sparkles className="size-6 text-accent" />
        <strong className="mt-3 text-base tracking-tight text-foreground">Open channel</strong>
        <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
          Hanoi / GMT+7
        </span>
      </div>

      {nodes.map((node, index) => {
        const Icon = node.icon;
        return (
          <div
            key={node.label}
            className={`absolute ${node.className} flex animate-pulse items-center gap-2 rounded-full border border-border/70 bg-background/75 px-3 py-2 text-xs font-medium text-foreground shadow-lg backdrop-blur-md`}
            style={{ animationDelay: `${index * 0.4}s` }}
          >
            <Icon className="size-3.5 text-accent" />
            {node.label}
          </div>
        );
      })}

      <div className="absolute inset-x-6 bottom-6 flex items-center justify-between rounded-xl border border-border/60 bg-background/55 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.17em] text-muted-foreground backdrop-blur-md">
        <span>Available for product teams</span>
        <span className="flex items-center gap-2 text-emerald-500 dark:text-emerald-300">
          <span className="size-1.5 rounded-full bg-current shadow-[0_0_10px_currentColor]" />
          Online
        </span>
      </div>
    </div>
  );
}

export function EducationContactSection() {
  const phoneHref = personalInfo.phone.replace(/\s+/g, "");

  return (
    <section id="contact" className="section-shell scroll-mt-20 pb-28 sm:pb-32">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border/70 bg-card/35 p-6 sm:p-10 lg:p-14">
        <div className="surface-grid pointer-events-none absolute inset-0 opacity-35" />
        <div className="absolute -left-24 top-1/3 size-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-24 top-0 size-72 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <RevealOnScroll>
              <p className="section-kicker">Education and contact</p>
              <h2 className="section-title mt-4">
                Let us build something <span className="text-gradient">useful, clear, and fast.</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
                I am open to frontend roles and product collaborations where architecture,
                interaction quality, and real business outcomes matter equally.
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 text-accent" aria-hidden="true" />
                {personalInfo.location}
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.06} className="mt-8">
              <EducationCard />
            </RevealOnScroll>

            <RevealOnScroll delay={0.1} className="mt-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <ContactAction
                  event="social_link_click_email"
                  href={`mailto:${personalInfo.email}`}
                  icon={Mail}
                  label="Email"
                  value={personalInfo.email}
                />
                <ContactAction
                  event="social_link_click_phone"
                  href={`tel:${phoneHref}`}
                  icon={Phone}
                  label="Phone"
                  value={personalInfo.phone}
                />
                <ContactAction
                  event="social_link_click_linkedin"
                  href={personalInfo.linkedin}
                  icon={ExternalLink}
                  label="Network"
                  value="LinkedIn profile"
                  external
                />
                <ContactAction
                  event="cv_download_click"
                  href={personalInfo.resumeUrl}
                  icon={Download}
                  label="Resume"
                  value="Download CV (PDF)"
                  download
                />
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.12}>
            <ContactPortalVisual />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
