"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Fades/slides content in once, the first time it enters the viewport.
 *
 * This must always render the same element on the server and during the
 * client's first render. Branching on `prefers-reduced-motion` here made the
 * server return a motion element while some clients returned a plain div,
 * leaving the server's `opacity: 0` styles in place after hydration.
 */
export function RevealOnScroll({ children, className, delay = 0 }: RevealOnScrollProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
