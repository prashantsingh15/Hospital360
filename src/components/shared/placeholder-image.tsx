import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn, hashSeed } from "@/lib/utils";

interface PlaceholderImageProps extends React.ComponentProps<"div"> {
  /** Stable seed (id, slug, index) — picks a real photography variant */
  seed?: string | number;
  label?: string;
  icon?: LucideIcon;
  /** Direct image source override */
  src?: string;
  /** Hide the label chip (e.g. for small thumbs) */
  minimal?: boolean;
}

const photoMap: Record<string, string> = {
  // Gallery items (by seed number or string)
  "1": "/images/gallery/atrium.jpg",
  "2": "/images/gallery/operation-theatre.jpg",
  "3": "/images/gallery/robotic-surgery.jpg",
  "4": "/images/gallery/mri-suite.jpg",
  "5": "/images/gallery/nicu.jpg",
  "6": "/images/gallery/patient-room.jpg",
  "7": "/images/gallery/cath-lab.jpg",
  "8": "/images/gallery/rehab-gym.jpg",
  "9": "/images/gallery/chemo-lounge.jpg",
  "10": "/images/gallery/health-camp.jpg",
  "11": "/images/gallery/blood-donation.jpg",
  "12": "/images/gallery/school-health.jpg",

  // Gallery items (by id)
  "gal-01": "/images/gallery/atrium.jpg",
  "gal-02": "/images/gallery/operation-theatre.jpg",
  "gal-03": "/images/gallery/robotic-surgery.jpg",
  "gal-04": "/images/gallery/mri-suite.jpg",
  "gal-05": "/images/gallery/nicu.jpg",
  "gal-06": "/images/gallery/patient-room.jpg",
  "gal-07": "/images/gallery/cath-lab.jpg",
  "gal-08": "/images/gallery/rehab-gym.jpg",
  "gal-09": "/images/gallery/chemo-lounge.jpg",
  "gal-10": "/images/gallery/health-camp.jpg",
  "gal-11": "/images/gallery/blood-donation.jpg",
  "gal-12": "/images/gallery/school-health.jpg",

  // Blog posts (by slug)
  "heart-attack-warning-signs": "/images/blog/cardiology-heart.jpg",
  "knee-replacement-recovery-guide": "/images/blog/orthopedic-knee.jpg",
  "childhood-vaccination-schedule-guide": "/images/blog/pediatric-vaccine.jpg",
  "type-2-diabetes-management-guide": "/images/blog/diabetes-diet.jpg",
  "mental-health-sleep-hygiene-guide": "/images/blog/mental-health-sleep.jpg",
  "cancer-screening-guidelines-by-age": "/images/blog/cancer-screening.jpg",

  // Campus / Pages
  "about-story": "/images/campus/hospital-building.jpg",
  "map": "/images/campus/hospital-reception.jpg",
};

const defaultPhotos = [
  "/images/gallery/atrium.jpg",
  "/images/gallery/operation-theatre.jpg",
  "/images/gallery/mri-suite.jpg",
  "/images/gallery/patient-room.jpg",
  "/images/campus/hospital-building.jpg",
  "/images/campus/hospital-reception.jpg",
];

export function PlaceholderImage({
  seed = 0,
  label,
  icon: Icon,
  src,
  minimal = false,
  className,
  style,
  ...props
}: PlaceholderImageProps) {
  const seedKey = String(seed);
  const resolvedPhoto =
    src ||
    photoMap[seedKey] ||
    defaultPhotos[
      (typeof seed === "string" ? hashSeed(seed) : Number(seed) || 0) %
        defaultPhotos.length
    ];

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative isolate overflow-hidden bg-slate-900",
        className
      )}
      style={style}
      {...props}
    >
      {/* Real photograph */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolvedPhoto}
        alt={label || "Hospital360 photo"}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 will-change-transform"
      />

      {/* Subtle overlay vignette for crisp text contrast */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent pointer-events-none"
      />

      {Icon ? (
        <Icon
          aria-hidden
          className="absolute top-4 right-4 size-6 text-white/70 drop-shadow"
          strokeWidth={1.5}
        />
      ) : null}

      {!minimal && label ? (
        <span className="glass absolute bottom-3 left-3 rounded-full border border-white/25 px-3 py-1 text-[11px] font-semibold tracking-wide text-white drop-shadow">
          {label}
        </span>
      ) : null}
    </div>
  );
}
