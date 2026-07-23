import {
  CalendarCheck,
  HeartHandshake,
  Siren,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data";
import { site } from "@/lib/site";
import { createMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ServiceCard } from "@/components/cards/service-card";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";

export const metadata = createMetadata({
  title: "Services",
  description:
    "From 24×7 emergency response and critical care to telemedicine and home care — every Hospital360 service is designed around you.",
  path: "/services",
});

interface Step {
  title: string;
  description: string;
  icon: LucideIcon;
}

const steps: Step[] = [
  {
    title: "Book",
    description:
      "Choose a speciality, pick a doctor and reserve a slot online or by phone — confirmation arrives instantly.",
    icon: CalendarCheck,
  },
  {
    title: "Consult",
    description:
      "Meet your specialist in person or over secure video, with your complete medical history at their fingertips.",
    icon: Stethoscope,
  },
  {
    title: "Recover",
    description:
      "Follow a clear, personalised care plan with digital reports, reminders and structured follow-ups.",
    icon: HeartHandshake,
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title="Complete care, around the clock"
        description="From 24×7 emergency response to home care — every service designed around you."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => (
            <Reveal
              key={service.id}
              delay={(index % 4) * 0.06}
              className="h-full"
            >
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section background="surface">
        <SectionHeading
          eyebrow="Getting care is simple"
          title="Three steps"
        />
        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={index * 0.06} className="h-full">
                <Card className="h-full p-6 sm:p-8">
                  <Badge className="mb-5">Step {index + 1}</Badge>
                  <span className="mb-5 grid size-13 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Emergency band */}
      <Section>
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-6 rounded-[2.5rem] bg-dark p-10 text-white sm:flex-row sm:p-14">
            <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
              <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-emerald/15">
                <Siren className="size-10 text-emerald" aria-hidden />
              </span>
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  Facing an emergency?
                </h2>
                <p className="mt-2 text-white/70">
                  Our trauma team, cath lab and ICUs are ready 24×7 — call now
                  and we will take it from there.
                </p>
              </div>
            </div>
            <Button variant="white" size="lg" className="shrink-0" asChild>
              <a href={site.emergencyHref}>Call {site.emergency}</a>
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
