import {
  ArrowUpRight,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
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
      className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-background/55 p-4 transition hover:border-accent/35 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
        <span className="mt-1 block truncate text-sm font-medium text-foreground">{value}</span>
      </span>
      <ArrowUpRight className="size-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
    </TrackedAnchor>
  );
}

export function EducationContactSection() {
  const phoneHref = personalInfo.phone.replace(/\s+/g, "");
  const educationEntry = education[0];

  return (
    <section id="contact" className="section-shell scroll-mt-20 pb-28 sm:pb-32">
      <div className="enterprise-panel surface-grid relative overflow-hidden rounded-[2rem]">
        <div className="absolute -left-24 top-10 size-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -right-20 bottom-0 size-80 rounded-full bg-violet-500/12 blur-3xl" />

        <div className="relative grid lg:grid-cols-[1.08fr_0.92fr]">
          <RevealOnScroll className="p-7 sm:p-10 lg:p-14">
            <p className="section-kicker">Professional Profile</p>
            <h2 className="section-title mt-6 max-w-3xl">
              Let&apos;s build a reliable frontend for your next <span className="text-gradient">complex product.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
              Open to frontend engineering roles and product collaborations involving architecture,
              data-heavy workflows, realtime systems, GIS, enterprise operations, or platform modernization.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="tech-chip">
                <MapPin className="size-4 text-accent" aria-hidden="true" />
                {personalInfo.location}
              </span>
              <span className="tech-chip">
                <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_currentColor]" />
                Available for frontend roles
              </span>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
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
                label="LinkedIn"
                value="Professional profile"
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

          <RevealOnScroll delay={0.08} className="border-t border-border/70 bg-background/35 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-14">
            <div className="flex items-center gap-4">
              <div className="flex size-16 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 font-mono text-sm font-bold tracking-[0.16em] text-accent">
                NVT
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{personalInfo.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{personalInfo.title}</p>
              </div>
            </div>

            <div className="mt-10 border-t border-border/70 pt-8">
              <div className="flex size-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                <GraduationCap className="size-5" aria-hidden="true" />
              </div>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Education
              </p>
              {educationEntry ? (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold leading-snug text-foreground">
                    {educationEntry.school}
                  </h4>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {educationEntry.degree}, {educationEntry.field}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="tech-chip">{educationEntry.period}</span>
                    {educationEntry.detail ? <span className="tech-chip">{educationEntry.detail}</span> : null}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-10 rounded-2xl border border-border/70 bg-card/55 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                Preferred product context
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Operational, data-heavy, workflow-intensive, map-based, or platform products where frontend quality directly affects business outcomes.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
