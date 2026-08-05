import { Button } from "@/components/ui/button";
import { personalInfo, summary } from "@/data/profile";

/**
 * Temporary scaffold placeholder. Real sections (Hero 3D, About, Skills,
 * Experience, Education/Contact) are built in their own fe-kit tasks —
 * see .fe-kit/plan/plan-v2.md. This page only proves the scaffold
 * (fonts, theme, tokens, data layer, Button) is wired correctly end to end.
 */
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-sm uppercase tracking-widest text-muted-foreground">
        Scaffold ready
      </p>
      <h1 className="text-4xl font-semibold tracking-tight">
        {personalInfo.name} — {personalInfo.title}
      </h1>
      <p className="max-w-xl text-muted-foreground">{summary}</p>
      <Button asChild size="lg">
        <a href={`mailto:${personalInfo.email}`}>Get in touch</a>
      </Button>
    </main>
  );
}
