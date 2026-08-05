import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { summary, personalInfo } from "@/data/profile";

export function AboutSection() {
  return (
    <section id="about" className="mx-auto w-full max-w-3xl px-6 py-24">
      <RevealOnScroll>
        <h2 className="text-sm font-medium uppercase tracking-widest text-accent">About</h2>
        <p className="mt-4 text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
          {summary}
        </p>
        <p className="mt-6 text-muted-foreground">
          Based in {personalInfo.location}. Reach out any time at{" "}
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-foreground underline underline-offset-4 hover:text-primary"
          >
            {personalInfo.email}
          </a>
          .
        </p>
      </RevealOnScroll>
    </section>
  );
}
