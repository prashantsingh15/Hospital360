import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

interface LogoProps {
  className?: string;
  /** Render without the wordmark (icon only) */
  markOnly?: boolean;
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid size-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-emerald shadow-glow",
        className
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-5 text-white"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
      <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-surface bg-emerald" />
    </span>
  );
}

export function Logo({ className, markOnly = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <LogoMark />
      {markOnly ? null : (
        <span className="font-display text-xl font-bold tracking-tight text-foreground">
          Hospital<span className="text-primary">360</span>
        </span>
      )}
    </Link>
  );
}
