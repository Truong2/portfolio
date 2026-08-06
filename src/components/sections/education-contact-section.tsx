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

interface ContactLinkProps {
  event: string;
  href: string;
  icon: LucideIcon;
  label: string;
  value: string;
  external?: boolean;
  download?: boolean;
}

function ContactLink({ event, href, icon: Icon, label, value, external, download }: ContactLinkProps) {
  return (
    <TrackedAnchor
      event={event}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download}
      className="group flex items-center gap-4 border-t border-border/60 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-background/60 text-accent">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
        <span className="mt-1 block truncate text-sm font-medium text-foreground">{value}</span>
      </span>
      <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
    </TrackedAnchor>
  );
}

export function EducationContactSection() {
  const phoneHref = personalInfo.phone.replace(/\s+/g, "");
  const educationEntry = education[0];

  return (
    <section id="contact" className="section-shell scroll-mt-20 pb-28 sm:pb-32">
      <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/40">
        <div className="surface-grid pointer-events-none absolute inset-0 opacity-25" />
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative grid lg:grid-cols-[1.1fr_0.9fr]">
          <RevealOnScroll className="p-7 sm:p-10 lg:p-14">
            <p className="section-kicker">Contact</p>
            <h2 className="section-title mt-4 max-w-2xl">
              Building a complex product or modernizing an existing interface?
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
              I am open to frontend engineering roles and product collaborations where reliable
              architecture, clear interaction design, and long-term maintainability matter.
            </p>

            <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-accent" aria-hidden="true" />
              {personalInfo.location}
            </div>

            <div className="mt-8 grid gap-x-8 sm:grid-cols-2">
              <ContactLink
                event="social_link_click_email"
                href={`mailto:${personalInfo.email}`}
                icon={Mail}
                label="Email"
                value={personalInfo.email}
              />
              <ContactLink
                event="social_link_click_phone"
                href={`tel:${phoneHref}`}
                icon={Phone}
                label="Phone"
                value={personalInfo.phone}
              />
              <ContactLink
                event="social_link_click_linkedin"
                href={personalInfo.linkedin}
                icon={ExternalLink}
                label="LinkedIn"
                value="View professional profile"
                external
              />
              <ContactLink
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
            <div className="flex size-12 items-center justify-center rounded-2xl border border-border/70 bg-card/60 text-accent">
              <GraduationCap className="size-5" aria-hidden="true" />
            </div>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Education
            </p>
            {educationEntry ? (
              <div className="mt-4">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {educationEntry.school}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {educationEntry.degree}, {educationEntry.field}
                </p>
                <p className="mt-5 text-xs font-medium uppercase tracking-[0.15em] text-accent">
                  {educationEntry.period}
                </p>
                {educationEntry.detail ? (
                  <p className="mt-3 text-sm text-muted-foreground">{educationEntry.detail}</p>
                ) : null}
              </div>
            ) : null}

            <div className="mt-10 border-t border-border/60 pt-6">
              <p className="text-sm leading-7 text-muted-foreground">
                Preferred working context: product teams solving operational, data-heavy, or
                workflow-intensive problems.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
