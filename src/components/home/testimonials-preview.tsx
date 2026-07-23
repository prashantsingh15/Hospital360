import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { testimonials } from "@/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";

export function TestimonialsPreview() {
  return (
    <Section background="surface" aria-label="Patient stories">
      <SectionHeading
        eyebrow="Patient Stories"
        title="Lives we've touched"
        description="Real recoveries, told by the patients and families who lived them."
      />
      <Reveal className="mb-10 flex justify-center">
        <Badge variant="outline">
          <Star className="fill-amber-400 text-amber-400" aria-hidden />
          4.9/5 · 2,400+ verified patient reviews
        </Badge>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.slice(0, 3).map((testimonial, index) => (
          <Reveal key={testimonial.id} delay={index * 0.06}>
            <TestimonialCard testimonial={testimonial} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12 flex justify-center">
        <Button variant="ghost" asChild>
          <Link href="/testimonials">
            Read All Patient Stories
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </Reveal>
    </Section>
  );
}
