import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn, hashSeed } from "@/lib/utils";

/**
 * Brand-consistent generated artwork used in place of photography.
 * Pure CSS/SVG — zero network cost. To use real photos later, replace
 * usages with next/image; the surrounding markup can stay untouched.
 */

interface PlaceholderImageProps extends React.ComponentProps<"div"> {
  /** Stable seed (id, slug, index) — picks an artwork variant */
  seed?: string | number;
  label?: string;
  icon?: LucideIcon;
  /** Hide the label chip (e.g. for small thumbs) */
  minimal?: boolean;
}

const palettes = [
  { from: "#0F6FFF", to: "#60A5FA", glow: "rgba(15,111,255,0.35)" },
  { from: "#0B5CE0", to: "#10B981", glow: "rgba(16,185,129,0.30)" },
  { from: "#1E40AF", to: "#0F6FFF", glow: "rgba(77,163,255,0.35)" },
  { from: "#059669", to: "#34D399", glow: "rgba(16,185,129,0.30)" },
  { from: "#0F6FFF", to: "#93C5FD", glow: "rgba(147,197,253,0.35)" },
];

export function PlaceholderImage({
  seed = 0,
  label,
  icon: Icon,
  minimal = false,
  className,
  style,
  ...props
}: PlaceholderImageProps) {
  const index =
    (typeof seed === "string" ? hashSeed(seed) : seed) % palettes.length;
  const palette = palettes[index];
  const IconOrNull = Icon ?? null;

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative isolate overflow-hidden bg-dark",
        className
      )}
      style={{
        backgroundImage: `radial-gradient(120% 120% at 15% 10%, ${palette.glow} 0%, transparent 55%), linear-gradient(135deg, ${palette.from} 0%, ${palette.to} 100%)`,
        ...style,
      }}
      {...props}
    >
      {/* soft grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* glow orbs */}
      <div
        aria-hidden
        className="absolute -top-1/4 -right-1/4 size-3/4 rounded-full bg-white/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-1/3 -left-1/4 size-2/3 rounded-full bg-dark/20 blur-3xl"
      />

      {IconOrNull ? (
        <IconOrNull
          aria-hidden
          className="absolute top-1/2 left-1/2 size-1/3 -translate-x-1/2 -translate-y-1/2 text-white/25"
          strokeWidth={1}
        />
      ) : null}

      {!minimal && label ? (
        <span className="glass absolute bottom-3 left-3 rounded-full border border-white/25 px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
          {label}
        </span>
      ) : null}
    </div>
  );
}
