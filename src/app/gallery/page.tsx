import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export const metadata: Metadata = createMetadata({
  title: "Gallery",
  description:
    "Explore the Hospital360 campus — modular operation theatres, advanced imaging, patient suites and moments of care.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Inside Hospital360"
        description="Explore our campus, technology and moments of care."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery", href: "/gallery" },
        ]}
      />

      <Section>
        <GalleryGrid />
      </Section>
    </>
  );
}
