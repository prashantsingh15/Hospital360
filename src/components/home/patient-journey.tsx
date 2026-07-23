import { journeySteps } from "@/data";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";

export function PatientJourney() {
  return (
    <Section aria-label="Patient journey">
      <SectionHeading
        eyebrow="Your Journey"
        title="Five steps to better health"
        description="A clear, guided path from your first booking to full recovery — you always know what happens next."
      />
      <div className="relative mt-4">
        <div
          aria-hidden
          className="absolute top-7 right-[10%] left-[10%] hidden h-px bg-border lg:block"
        />
        <div className="grid gap-10 sm:grid-cols-3 lg:grid-cols-5">
          {journeySteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal
                key={step.id}
                delay={index * 0.1}
                className="flex flex-col items-center gap-4 text-center"
              >
                <span className="relative z-10 grid size-14 place-items-center rounded-full bg-primary text-white shadow-glow">
                  <Icon className="size-6" aria-hidden />
                </span>
                <Badge variant="outline">Step {step.step}</Badge>
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
