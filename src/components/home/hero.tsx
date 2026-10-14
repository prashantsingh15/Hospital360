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
            <div className="group relative overflow-hidden rounded-[2rem] border border-border bg-surface p-2 shadow-lifted sm:p-3">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[1.5rem] bg-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/gallery/atrium.jpg"
                  alt="Hospital360 State-of-the-art Medical Center"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent pointer-events-none"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1 text-[11px] font-semibold backdrop-blur-md">
                      Hospital360 Main Campus
                    </span>
                    <p className="mt-1 text-xs text-white/85 drop-shadow">
                      500+ Beds · Level 1 Trauma Center
                    </p>
                  </div>
                </div>
              </div>
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
