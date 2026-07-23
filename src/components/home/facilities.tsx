import { facilities } from "@/data";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";

export function Facilities() {
  return (
    <Section background="muted" aria-label="Facilities">
      <SectionHeading
        eyebrow="World-Class Facilities"
        title="Designed around patients"
        description="Every corner of the campus — from modular operation theatres to family lounges — is built to make care feel effortless."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {facilities.map((facility, index) => {
          const Icon = facility.icon;
          return (
            <Reveal key={facility.id} delay={index * 0.06}>
              <Card className="h-full p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lifted">
                <span className="grid size-12 place-items-center rounded-2xl bg-emerald/10 text-emerald">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                  {facility.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {facility.description}
                </p>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
