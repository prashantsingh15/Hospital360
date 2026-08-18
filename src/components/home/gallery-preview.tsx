import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { galleryItems } from "@/data";
import type { GalleryItem } from "@/types";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/shared/placeholder-image";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";

const spanClasses: Record<GalleryItem["span"], string> = {
  wide: "col-span-2",
  tall: "row-span-2",
  normal: "",
};

export function GalleryPreview() {
  return (
    <Section aria-label="Campus gallery">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading
          align="left"
          className="mb-0"
          eyebrow="Inside Hospital360"
          title="A glimpse of our campus"
          description="Sunlit atriums, modular theatres and quiet recovery spaces — take a look around."
        />
        <Button variant="outline" className="hidden shrink-0 sm:inline-flex" asChild>
          <Link href="/gallery">View Full Gallery</Link>
        </Button>
      </div>
      <div className="mt-12 grid auto-rows-[9rem] grid-cols-2 gap-4 sm:auto-rows-[11rem] md:grid-cols-4">
        {galleryItems.slice(0, 6).map((item, index) => (
          <Reveal
            key={item.id}
            delay={index * 0.06}
            className={spanClasses[item.span]}
          >
            <div className="group relative h-full overflow-hidden rounded-3xl">
              <PlaceholderImage
                seed={item.seed}
                label={item.title}
                minimal
                className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent p-4">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="text-xs text-white/70">{item.category}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10 flex justify-center sm:hidden">
        <Button variant="outline" size="lg" className="w-full" asChild>
          <Link href="/gallery">
            View Full Gallery
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </Reveal>
    </Section>
  );
}
