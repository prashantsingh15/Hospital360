import { createMetadata } from "@/lib/seo";
import { DoctorsDirectory } from "@/components/doctors/doctors-directory";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";

export const metadata = createMetadata({
  title: "Our Doctors",
  description:
    "Meet 250+ specialist doctors across 40+ specialities at Hospital360 — find the right expert and book a consultation online.",
  path: "/doctors",
});

export default function DoctorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Doctors"
        title="250+ specialists. One team."
        description="Find the right expert across 40+ specialities — book directly online."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Doctors", href: "/doctors" },
        ]}
      />
      <Section>
        <DoctorsDirectory />
      </Section>
    </>
  );
}
