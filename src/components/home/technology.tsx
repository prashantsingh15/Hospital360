import Link from "next/link";
import { technologies } from "@/data";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";

export function Technology() {
  return (
    <Section background="dark" aria-label="Advanced technology">
      <div aria-hidden className="absolute inset-0 bg-dots opacity-25" />
      <div
        aria-hidden
        className="absolute -top-40 -right-40 size-[28rem] rounded-full bg-primary/20 blur-3xl"
      />
      <div className="relative">
        <SectionHeading
          className="[&_h2]:text-white [&_p]:text-white/70"
          eyebrow="Advanced Technology"
          title="Precision medicine, powered by innovation"
          description="Robotic surgery, 3T imaging and AI-assisted diagnostics — technology that lets our doctors see more, cut less and heal faster."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <Reveal key={tech.id} delay={index * 0.06}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10 sm:p-7">
                  <span className="grid size-12 place-items-center rounded-2xl bg-primary/20 text-primary">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">
                    {tech.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {tech.description}
                  </p>
                  <p className="mt-4 font-display text-2xl font-bold text-emerald">
                    {tech.stat}
                  </p>
                </div>
              </Reveal>
            );
          })}
          <Reveal delay={technologies.length * 0.06}>
            <div className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-primary/30 bg-primary/10 p-6 sm:p-7">
              <p className="font-display text-xl font-semibold text-white">
                …and 30+ more advanced systems
              </p>
              <Button variant="white" size="sm" className="w-fit" asChild>
                <Link href="/departments">Explore Centres</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
