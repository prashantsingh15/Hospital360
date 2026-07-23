import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-32 w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground shadow-sm transition-all duration-200",
        "placeholder:text-muted/70",
        "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-red-500 aria-invalid:ring-red-500/15",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
