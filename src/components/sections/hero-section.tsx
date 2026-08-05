import { Button } from "@/components/ui/button";
import { Hero3DCanvasLoader } from "@/components/three/hero-3d-canvas-loader";
import { TrackedAnchor } from "@/components/tracked-anchor";
import { personalInfo, summary } from "@/data/profile";

/**
 * All copy here is real server-rendered HTML — it does not depend on the
 * 3D canvas mounting. Search engines and users with JS/WebGL disabled
 * still get the full message; the canvas is a progressive enhancement.
 */
export function HeroSection() {
  return (
    <section
      id="hero"
      className="flex min-h-[90vh] w-full flex-col items-center justify-center gap-10 px-6 py-20 lg:flex-row lg:gap-16 lg:px-16"
    >
      <div className="flex max-w-xl flex-col items-center gap-6 text-center lg:items-start lg:text-left">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          {personalInfo.title}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {personalInfo.name}
        </h1>
        <h2 className="text-lg text-muted-foreground">{summary}</h2>
        <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          <Button asChild size="lg">
            <TrackedAnchor event="hero_cta_click_view_work" href="#experience">
              View Work
            </TrackedAnchor>
          </Button>
          <Button asChild variant="outline" size="lg">
            <TrackedAnchor event="hero_cta_click_contact" href="#contact">
              Contact
            </TrackedAnchor>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <TrackedAnchor event="cv_download_click" href={personalInfo.resumeUrl} download>
              Download CV
            </TrackedAnchor>
          </Button>
        </div>
      </div>

      <div className="flex w-full max-w-md justify-center">
        <Hero3DCanvasLoader />
      </div>
    </section>
  );
}
