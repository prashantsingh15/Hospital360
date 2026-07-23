import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/types";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { InitialsAvatar } from "@/components/shared/initials-avatar";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted sm:p-7",
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-0.5" role="img" aria-label={`Rated ${testimonial.rating} out of 5`}>
          {Array.from({ length: testimonial.rating }).map((_, index) => (
            <Star key={index} className="size-4 fill-amber-400 text-amber-400" aria-hidden />
          ))}
        </div>
        <Quote className="size-7 text-primary/15" aria-hidden />
      </div>

      <blockquote className="flex-1">
        <p className="text-sm leading-relaxed text-foreground sm:text-base">
          “{testimonial.quote}”
        </p>
      </blockquote>

      <footer className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <InitialsAvatar name={testimonial.name} className="size-11 text-sm" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{testimonial.name}</p>
          <p className="truncate text-xs text-muted">
            {testimonial.role} · {testimonial.location}
          </p>
        </div>
      </footer>
    </Card>
  );
}
