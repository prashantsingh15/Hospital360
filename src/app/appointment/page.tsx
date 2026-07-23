import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { AppointmentWizard } from "@/components/appointment/appointment-wizard";

export const metadata: Metadata = createMetadata({
  title: "Book an Appointment",
  description:
    "Book an appointment at Hospital360 in three quick steps. Confirmed slots, free rescheduling and reminders via SMS & WhatsApp.",
  path: "/appointment",
});

const perks = [
  "Confirmed slots — no waiting",
  "Free rescheduling up to 2 hrs prior",
  "Reminder via SMS & WhatsApp",
  "Reports on your phone",
];

export default async function AppointmentPage({
  searchParams,
}: {
  searchParams: Promise<{ doctor?: string }>;
}) {
  const { doctor } = await searchParams;

  return (
    <>
      <PageHeader
        eyebrow="Book Appointment"
        title="Your care starts here"
        description="Three quick steps — confirmation within 15 minutes."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Appointment", href: "/appointment" },
        ]}
      />

      <Section>
        <div className="grid items-start gap-8 lg:grid-cols-[1.6fr_1fr]">
          <AppointmentWizard initialDoctor={doctor} />

          <aside className="flex flex-col gap-6">
            <Card className="p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold tracking-tight">
                Why book online?
              </h2>
              <ul className="mt-5 flex flex-col gap-4">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-emerald"
                      aria-hidden
                    />
                    <span className="text-sm font-medium sm:text-base">
                      {perk}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="border-0 bg-primary/5 p-6 sm:p-8">
              <p className="text-sm text-muted">Prefer to talk?</p>
              <a
                href={site.phoneHref}
                className="mt-2 inline-block font-display text-xl font-bold text-primary"
              >
                {site.phone}
              </a>
              <p className="mt-2 text-xs text-muted">{site.hours}</p>
            </Card>
          </aside>
        </div>
      </Section>
    </>
  );
}
