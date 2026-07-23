import type { Metadata } from "next";
import { Star } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { testimonials } from "@/data";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { TestimonialCard } from "@/components/cards/testimonial-card";

export const metadata: Metadata = createMetadata({
  title: "Patient Stories",
  description:
    "Real experiences from patients and families treated at Hospital360 — rated 4.9/5 across 2,400+ verified reviews.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="Stories of healing"
        description="Real experiences from patients and families across India."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Testimonials", href: "/testimonials" },
        ]}
      />

      <Section>
        <Reveal>
          <Card className="mb-12 flex flex-col items-center justify-center gap-6 p-8 text-center sm:flex-row sm:gap-10 sm:text-left">
            <p className="font-display text-6xl font-bold text-primary">4.9</p>
            <div>
              <div
                className="flex justify-center gap-1 sm:justify-start"
                role="img"
                aria-label="Rated 4.9 out of 5"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="size-5 fill-amber-400 text-amber-400"
                    aria-hidden
                  />
                ))}
              </div>
              <p className="mt-2 font-semibold">Excellent</p>
              <p className="mt-1 text-sm text-muted">
                Based on 2,400+ verified patient reviews
              </p>
            </div>
            <div aria-hidden className="hidden h-16 w-px bg-border sm:block" />
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium">
                <span className="font-display text-lg font-bold text-foreground">
                  98%
                </span>{" "}
                <span className="text-muted">would recommend us</span>
              </p>
              <p className="text-sm font-medium">
                <span className="font-display text-lg font-bold text-foreground">
                  1M+
                </span>{" "}
                <span className="text-muted">patients treated</span>
              </p>
            </div>
          </Card>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={(index % 3) * 0.1}>
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
