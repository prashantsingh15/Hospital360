import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-colors [&_svg]:size-3.5",
  {
    variants: {
      variant: {
        primary: "bg-primary/10 text-primary-text",
        emerald: "bg-emerald/10 text-emerald-text",
        solid: "bg-primary-hover text-white",
        outline: "border border-border bg-surface text-muted",
        glass: "glass border border-white/20 text-foreground",
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
