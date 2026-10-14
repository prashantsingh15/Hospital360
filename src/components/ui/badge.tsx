import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wide transition-colors [&_svg]:size-3.5 shadow-xs",
  {
    variants: {
      variant: {
        primary: "border border-primary/25 bg-primary/10 text-primary font-bold dark:border-primary/40 dark:text-primary-text",
        emerald: "border border-emerald/25 bg-emerald/10 text-emerald-text font-bold",
        solid: "bg-primary text-white font-bold shadow-soft",
        outline: "border border-border bg-surface text-foreground font-semibold shadow-2xs",
        glass: "border border-primary/20 bg-surface/90 text-foreground font-bold shadow-soft backdrop-blur-md",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
