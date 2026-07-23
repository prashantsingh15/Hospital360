import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone, Siren } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { PlaceholderImage } from "@/components/shared/placeholder-image";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = createMetadata({
  title: "Contact Us",
  description:
    "Reach Hospital360 for appointments, feedback or emergencies — available 24×7 by phone, email or at our New Delhi campus.",
  path: "/contact",
});

const infoCards = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: [
      site.address.line1,
      `${site.address.city}, ${site.address.state} ${site.address.pin}`,
    ],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: [site.phone, site.hours],
    href: site.phoneHref,
  },
  {
    icon: Siren,
    title: "Emergency",
    lines: [site.emergency, "24×7 Emergency"],
    href: site.emergencyHref,
  },
  {
    icon: Mail,
    title: "Email",
    lines: [site.email, "We reply within 24 hours"],
    href: `mailto:${site.email}`,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We're here to help"
        description="Reach out for appointments, feedback or emergencies — 24×7."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <Section>
        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {infoCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.08}>
              <Card className="h-full p-6">
                <div className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <card.icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-display font-semibold">
                  {card.title}
                </h3>
                <div className="mt-2 flex flex-col gap-1">
                  {card.lines.map((line, lineIndex) =>
                    card.href && lineIndex === 0 ? (
                      <a
                        key={line}
                        href={card.href}
                        className="text-sm text-muted transition-colors hover:text-primary"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={line} className="text-sm text-muted">
                        {line}
                      </p>
                    )
                  )}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full p-6 sm:p-8">
              <h2 className="mb-6 font-display text-2xl font-bold tracking-tight">
                Send us a message
              </h2>
              <ContactForm />
            </Card>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div className="relative min-h-[24rem] flex-1 overflow-hidden rounded-[2rem] border border-border">
              <PlaceholderImage
                seed="map"
                label="Hospital360 location map"
                minimal
                className="absolute inset-0 h-full w-full"
              />
              <div className="absolute inset-0 grid place-items-center p-6">
                <div className="glass rounded-3xl border border-white/25 p-6 text-center shadow-lifted">
                  <MapPin
                    className="mx-auto size-8 text-primary"
                    aria-hidden
                  />
                  <p className="mt-3 font-semibold">
                    {site.address.line1}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {site.address.city} {site.address.pin}
                  </p>
                  <Button size="sm" className="mt-4" asChild>
                    <a
                      href="https://maps.google.com/?q=New+Delhi"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in Google Maps
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <Card className="flex items-center gap-4 p-5">
              <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Clock className="size-5" aria-hidden />
              </div>
              <div>
                <p className="text-sm font-semibold">{site.hours}</p>
                <p className="text-xs text-muted">
                  Emergency & pharmacy always open
                </p>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
