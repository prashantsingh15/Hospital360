import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

const backgrounds = {
  default: "",
  surface: "bg-surface",
  muted: "bg-muted-soft",
  tinted: "bg-primary/5",
  dark: "bg-dark text-white",
} as const;

const spacings = {
  sm: "py-12 sm:py-16",
  default: "py-16 sm:py-20 lg:py-28",
  lg: "py-20 sm:py-28 lg:py-36",
} as const;

interface SectionProps extends React.ComponentProps<"section"> {
  background?: keyof typeof backgrounds;
  spacing?: keyof typeof spacings;
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  /** Render without the inner Container (full-bleed sections) */
  bleed?: boolean;
}

export function Section({
  background = "default",
  spacing = "default",
  containerSize = "xl",
  bleed = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        backgrounds[background],
        spacings[spacing],
        className
      )}
      {...props}
    >
      {bleed ? (
        children
      ) : (
        <Container size={containerSize}>{children}</Container>
      )}
    </section>
  );
}
