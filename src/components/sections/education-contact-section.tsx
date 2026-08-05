import { Mail, Phone, ExternalLink, Download, GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { TrackedAnchor } from "@/components/tracked-anchor";
import { education, personalInfo } from "@/data/profile";

function EducationCard() {
  const entry = education[0];
  if (!entry) return null;

  return (
    <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-5">
      <GraduationCap className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
      <div>
        <h3 className="font-semibold text-card-foreground">{entry.school}</h3>
        <p className="text-sm text-muted-foreground">
          {entry.degree}, {entry.field}
        </p>
        <p className="text-sm text-muted-foreground">
          {entry.period}
          {entry.detail ? ` · ${entry.detail}` : ""}
        </p>
      </div>
    </div>
  );
}

/**
 * Per Q2: no backend/contact form — direct mailto:/tel:/LinkedIn links only.
 * Per Q4: real Download CV button, linking to the actual uploaded resume.
 */
function ContactLinks() {
  return (
    <div className="flex flex-col gap-3">
      <Button asChild size="lg" className="justify-start">
        <TrackedAnchor event="social_link_click_email" href={`mailto:${personalInfo.email}`}>
          <Mail className="size-4" />
          {personalInfo.email}
        </TrackedAnchor>
      </Button>
      <Button asChild variant="outline" size="lg" className="justify-start">
        <TrackedAnchor
          event="social_link_click_phone"
          href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
        >
          <Phone className="size-4" />
          {personalInfo.phone}
        </TrackedAnchor>
      </Button>
      <Button asChild variant="outline" size="lg" className="justify-start">
        <TrackedAnchor
          event="social_link_click_linkedin"
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink className="size-4" />
          LinkedIn Profile
        </TrackedAnchor>
      </Button>
      <Button asChild variant="ghost" size="lg" className="justify-start">
        <TrackedAnchor event="cv_download_click" href={personalInfo.resumeUrl} download>
          <Download className="size-4" />
          Download CV (PDF)
        </TrackedAnchor>
      </Button>
    </div>
  );
}

export function EducationContactSection() {
  return (
    <section id="contact" className="mx-auto w-full max-w-3xl px-6 py-24">
      <RevealOnScroll>
        <h2 className="text-sm font-medium uppercase tracking-widest text-accent">
          Education &amp; Contact
        </h2>
        <p className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl">
          Let&apos;s work together.
        </p>
      </RevealOnScroll>

      <div className="mt-10 grid gap-10 sm:grid-cols-2">
        <RevealOnScroll>
          <EducationCard />
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <ContactLinks />
        </RevealOnScroll>
      </div>
    </section>
  );
}
