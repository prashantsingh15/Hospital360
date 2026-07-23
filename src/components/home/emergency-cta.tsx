import { PhoneCall, Siren } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";

export function EmergencyCta() {
  return (
    <section
      aria-label="Emergency contact"
      className="relative overflow-hidden bg-dark text-white"
    >
      <div aria-hidden className="absolute inset-0 bg-dots opacity-20" />
      <div
        aria-hidden
        className="absolute -top-24 -right-24 size-72 rounded-full bg-emerald/20 blur-3xl"
      />
      <Container className="relative flex flex-col items-start gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Reveal direction="left">
          <div className="flex items-center gap-5">
            <span className="grid size-14 shrink-0 animate-pulse-ring place-items-center rounded-2xl bg-emerald">
              <Siren className="size-7 text-white" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Medical Emergency?
              </h2>
              <p className="mt-1 text-white/70">
                Our emergency &amp; trauma team responds in minutes — 24×7.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal direction="right" delay={0.1}>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <a
              href={site.emergencyHref}
              className="font-display text-3xl font-bold text-emerald hover:opacity-90 sm:text-4xl"
            >
              {site.emergency}
            </a>
            <Button variant="white" asChild>
              <a href={site.emergencyHref}>
                <PhoneCall aria-hidden />
                Call Ambulance Now
              </a>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
