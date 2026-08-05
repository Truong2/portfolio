import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  label: string;
  className?: string;
}

/**
 * Plain neutral badge — categories are distinguished by heading/grouping
 * text, not by badge color, so this stays legible for colorblind users
 * without relying on hue alone.
 */
export function SkillBadge({ label, className }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground",
        className,
      )}
    >
      {label}
    </span>
  );
}
