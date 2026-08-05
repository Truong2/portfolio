import { ExternalLink, Mail, Phone } from "lucide-react";

import { TrackedAnchor } from "@/components/tracked-anchor";
import { personalInfo } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {personalInfo.name}. Built with Next.js &amp;
          Three.js.
        </p>
        <div className="flex items-center gap-4">
          <TrackedAnchor
            event="social_link_click_email"
            href={`mailto:${personalInfo.email}`}
            aria-label="Send email"
            className="hover:text-foreground"
          >
            <Mail className="size-4" />
          </TrackedAnchor>
          <TrackedAnchor
            event="social_link_click_phone"
            href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
            aria-label="Call phone number"
            className="hover:text-foreground"
          >
            <Phone className="size-4" />
          </TrackedAnchor>
          <TrackedAnchor
            event="social_link_click_linkedin"
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="hover:text-foreground"
          >
            <ExternalLink className="size-4" />
          </TrackedAnchor>
        </div>
      </div>
    </footer>
  );
}
