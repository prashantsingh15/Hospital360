"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CalendarCheck,
  CheckCircle2,
  HeartPulse,
  Phone,
  Sparkles,
  Star,
} from "lucide-react";
import { doctors, getDepartmentBySlug } from "@/data";
import { site } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { InitialsAvatar } from "@/components/shared/initials-avatar";
import { Magnetic } from "@/components/shared/magnetic";

const easeOut = [0.21, 0.47, 0.32, 0.98] as const;

function Entrance({
  delay,
  children,
  className,
}: {
  delay: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Premium flat illustration of the Hospital360 campus — pure SVG, no assets. */
function HospitalIllustration() {
  const towerWindows = [
    { col: 1, row: 0, lit: true },
    { col: 3, row: 1, lit: true },
    { col: 0, row: 2, lit: true },
    { col: 2, row: 3, lit: true },
  ];
  const isLit = (col: number, row: number) =>
    towerWindows.some((w) => w.col === col && w.row === row);

  return (
    <svg
      viewBox="0 0 640 480"
      role="img"
      aria-label="Hospital360 hospital illustration"
      className="h-auto w-full rounded-3xl"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EFF6FF" />
          <stop offset="100%" stopColor="#DBEAFE" />
        </linearGradient>
        <linearGradient id="hero-tower" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EFF6FF" />
        </linearGradient>
      </defs>

      {/* sky */}
      <rect width="640" height="480" rx="24" fill="url(#hero-sky)" />
      <circle cx="528" cy="88" r="52" fill="#FFFFFF" opacity="0.35" />
      <circle cx="528" cy="88" r="34" fill="#FFFFFF" opacity="0.9" />
      <g fill="#FFFFFF">
        <ellipse cx="150" cy="88" rx="46" ry="15" opacity="0.85" />
        <ellipse cx="188" cy="78" rx="32" ry="12" opacity="0.7" />
        <ellipse cx="410" cy="150" rx="38" ry="12" opacity="0.5" />
      </g>
      {/* floating plus marks */}
      <g fill="#0F6FFF" opacity="0.14">
        <path d="M86 176h6v16h16v6h-16v16h-6v-16H70v-6h16z" />
        <path d="M560 190h5v13h13v5h-13v13h-5v-13h-13v-5h13z" />
      </g>

      {/* ground */}
      <rect x="0" y="408" width="640" height="72" fill="#D1FAE5" opacity="0.55" />
      <ellipse cx="320" cy="426" rx="210" ry="12" fill="#0F6FFF" opacity="0.08" />

      {/* left wing */}
      <rect x="88" y="252" width="120" height="168" rx="16" fill="#FFFFFF" stroke="#BFDBFE" strokeWidth="1.5" />
      <rect x="128" y="236" width="40" height="16" rx="8" fill="#10B981" />
      {[0, 1].map((col) =>
        [0, 1, 2].map((row) => (
          <rect
            key={`lw-${col}-${row}`}
            x={108 + col * 46}
            y={278 + row * 40}
            width="28"
            height="22"
            rx="5"
            fill="#DBEAFE"
          />
        ))
      )}

      {/* right wing */}
      <rect x="432" y="224" width="120" height="196" rx="16" fill="#FFFFFF" stroke="#BFDBFE" strokeWidth="1.5" />
      <rect x="472" y="208" width="40" height="16" rx="8" fill="#0F6FFF" opacity="0.85" />
      {[0, 1].map((col) =>
        [0, 1, 2, 3].map((row) => (
          <rect
            key={`rw-${col}-${row}`}
            x={452 + col * 46}
            y={250 + row * 40}
            width="28"
            height="22"
            rx="5"
            fill="#DBEAFE"
          />
        ))
      )}

      {/* main tower */}
      <rect x="208" y="140" width="224" height="280" rx="20" fill="url(#hero-tower)" stroke="#BFDBFE" strokeWidth="1.5" />
      {/* cross tile */}
      <rect x="272" y="84" width="96" height="96" rx="24" fill="#0F6FFF" />
      <rect x="310" y="104" width="20" height="56" rx="7" fill="#FFFFFF" />
      <rect x="292" y="122" width="56" height="20" rx="7" fill="#FFFFFF" />
      {/* window grid */}
      {[0, 1, 2, 3].map((col) =>
        [0, 1, 2, 3].map((row) => (
          <rect
            key={`tw-${col}-${row}`}
            x={228 + col * 52}
            y={196 + row * 38}
            width="28"
            height="22"
            rx="5"
            fill={isLit(col, row) ? "#0F6FFF" : "#DBEAFE"}
            opacity={isLit(col, row) ? 0.85 : 1}
          />
        ))
      )}
      {/* entrance */}
      <rect x="282" y="350" width="76" height="12" rx="6" fill="#0F6FFF" />
      <rect x="294" y="362" width="52" height="58" rx="8" fill="#0F6FFF" opacity="0.9" />
      <rect x="318" y="362" width="4" height="58" fill="#EFF6FF" opacity="0.6" />

      {/* trees */}
      <g>
        <rect x="60" y="394" width="8" height="24" rx="3" fill="#0F6FFF" opacity="0.35" />
        <circle cx="64" cy="380" r="20" fill="#10B981" />
        <circle cx="78" cy="388" r="13" fill="#10B981" opacity="0.7" />
      </g>
      <g>
        <rect x="572" y="394" width="8" height="24" rx="3" fill="#0F6FFF" opacity="0.35" />
        <circle cx="576" cy="378" r="21" fill="#10B981" />
        <circle cx="560" cy="388" r="13" fill="#10B981" opacity="0.7" />
      </g>
      {/* bushes */}
      <ellipse cx="240" cy="416" rx="26" ry="10" fill="#10B981" opacity="0.45" />
      <ellipse cx="404" cy="416" rx="26" ry="10" fill="#10B981" opacity="0.45" />

      {/* walkway */}
      <rect x="308" y="420" width="24" height="60" fill="#DBEAFE" opacity="0.9" />
    </svg>
  );
}

export function Hero() {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const orbPrimaryY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const orbEmeraldY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const leadDoctor = doctors[0];
  const leadDepartment =
    getDepartmentBySlug(leadDoctor.department)?.name ?? "Cardiology";
  const leadSurname = leadDoctor.name.split(" ").slice(-1)[0];

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-20 sm:pt-32"
    >
      {/* backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]"
      />
      <motion.div
        aria-hidden
        style={{ y: orbPrimaryY }}
        className="absolute -top-24 -left-24 size-[30rem] rounded-full bg-primary/10 blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ y: orbEmeraldY }}
        className="absolute -right-24 -bottom-32 size-[30rem] rounded-full bg-emerald/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"
      />

      <Container className="relative grid items-center gap-12 lg:grid-cols-2">
        {/* copy — headline block renders statically so it paints instantly (LCP) */}
        <div>
          <Badge variant="glass">
            <Sparkles aria-hidden />
            NABH Accredited · 24×7 Emergency Care
          </Badge>

          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
            World-Class Healthcare,{" "}
            <span className="text-gradient">Delivered with Compassion.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
            250+ senior specialists, robotic surgery and a 24×7 emergency team
            — advanced treatment across 40+ specialities, always one
            appointment away.
          </p>

          <Entrance delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Button size="lg" asChild>
                  <Link href="/appointment">
                    <CalendarCheck aria-hidden />
                    Book Appointment
                  </Link>
                </Button>
              </Magnetic>
              <Button size="lg" variant="emerald" asChild>
                <a href={site.emergencyHref}>
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-white" />
                  </span>
                  <Phone aria-hidden />
                  Emergency 24×7
                </a>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <a href={site.phoneHref}>
                  <Phone aria-hidden />
                  Call {site.phone}
                </a>
              </Button>
            </div>
          </Entrance>

          <Entrance delay={0.16}>
            <div className="flex items-center gap-4 pt-8">
              <div className="flex -space-x-3">
                {doctors.slice(0, 4).map((doctor) => (
                  <InitialsAvatar
                    key={doctor.id}
                    name={doctor.name}
                    className="size-10 text-xs ring-2 ring-background"
                  />
                ))}
              </div>
              <div>
                <div className="flex gap-0.5" role="img" aria-label="Rated 4.9 out of 5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="size-3.5 fill-amber-400 text-amber-400"
                      aria-hidden
                    />
                  ))}
                </div>
                <p className="mt-1 text-sm text-muted">
                  Trusted by{" "}
                  <strong className="text-foreground">1M+ patients</strong>{" "}
                  across India
                </p>
              </div>
            </div>
          </Entrance>
        </div>

        {/* visual — visible on first paint; parallax only (no entrance fade, for LCP) */}
        <div className="relative mt-8 lg:mt-0">
          <motion.div style={{ y: visualY }}>
            <div className="rounded-[2rem] border border-border bg-surface p-3 shadow-lifted">
              <HospitalIllustration />
            </div>

            {/* floating glass cards */}
            <div
              className="absolute -left-3 top-8 flex animate-float items-center gap-3 rounded-2xl border border-border p-3.5 shadow-lifted glass sm:-left-6"
              style={{ animationDelay: "0s" }}
            >
              <CheckCircle2 className="size-5 shrink-0 text-emerald" aria-hidden />
              <div>
                <p className="text-sm font-semibold">Appointment Confirmed</p>
                <p className="text-xs text-muted">Today · 10:30 AM</p>
              </div>
            </div>

            <div
              className="absolute -right-3 bottom-10 flex animate-float items-center gap-3 rounded-2xl border border-border p-3.5 shadow-lifted glass sm:-right-6"
              style={{ animationDelay: "1.4s" }}
            >
              <InitialsAvatar name={leadDoctor.name} className="size-9 text-xs" />
              <div>
                <p className="flex items-center gap-1.5 text-sm font-semibold">
                  Dr. {leadSurname} online now
                  <span className="size-1.5 rounded-full bg-emerald" aria-hidden />
                </p>
                <p className="text-xs text-muted">{leadDepartment}</p>
              </div>
            </div>

            <div
              className="absolute -top-5 right-8 hidden animate-float items-center gap-2.5 rounded-2xl border border-border p-3.5 shadow-lifted glass sm:flex"
              style={{ animationDelay: "2.6s" }}
            >
              <HeartPulse className="size-5 shrink-0 text-primary" aria-hidden />
              <p className="text-sm font-semibold">24×7 ICU Monitoring</p>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* scroll indicator */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-muted">
        <span className="relative flex size-6 justify-center rounded-full border-2 border-current">
          <motion.span
            className="absolute top-1 size-1 rounded-full bg-current"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <span className="text-[11px] tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  );
}
