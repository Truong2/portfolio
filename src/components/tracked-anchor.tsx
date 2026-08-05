"use client";

import * as React from "react";
import { track } from "@vercel/analytics";

interface TrackedAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  event: string;
}

/**
 * Thin client boundary: fires a Vercel Analytics custom event on click,
 * then behaves like a normal <a>. Kept separate so sections that render
 * these links (HeroSection, Footer, ContactSection) can stay Server
 * Components.
 */
export const TrackedAnchor = React.forwardRef<HTMLAnchorElement, TrackedAnchorProps>(
  ({ event, onClick, ...props }, ref) => {
    return (
      <a
        ref={ref}
        onClick={(e) => {
          track(event);
          onClick?.(e);
        }}
        {...props}
      />
    );
  },
);
TrackedAnchor.displayName = "TrackedAnchor";
