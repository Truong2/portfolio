import { ExternalLink, Mail, Phone } from "lucide-react";

import { TrackedAnchor } from "@/components/tracked-anchor";
import { personalInfo } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/25">
      <div className="mx-auto flex max-w-[96rem] flex-col gap-6 px-5 py-8 text-sm text-muted-foreground sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 font-mono text-[10px] font-bold tracking-[0.14em] text-accent">
            NVT
          </span>
          <p>
            &copy; {new Date().getFullYear()} {personalInfo.name}. Built with Next.js and Three.js.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <TrackedAnchor
            event="social_link_click_email"
            href={`mailto:${personalInfo.email}`}
            aria-label="Send email"
            className="flex size-10 items-center justify-center rounded-xl border border-border/70 bg-background/55 transition hover:border-accent/35 hover:text-accent"
          >
            <Mail className="size-4" />
          </TrackedAnchor>
          <TrackedAnchor
            event="social_link_click_phone"
            href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
            aria-label="Call phone number"
            className="flex size-10 items-center justify-center rounded-xl border border-border/70 bg-background/55 transition hover:border-accent/35 hover:text-accent"
          >
            <Phone className="size-4" />
          </TrackedAnchor>
          <TrackedAnchor
            event="social_link_click_linkedin"
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="flex size-10 items-center justify-center rounded-xl border border-border/70 bg-background/55 transition hover:border-accent/35 hover:text-accent"
          >
            <ExternalLink className="size-4" />
          </TrackedAnchor>
        </div>
      </div>
    </footer>
  );
}
