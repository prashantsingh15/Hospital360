import { Check } from "lucide-react";
import type { Service } from "@/types";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Card
      className={cn(
        "group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lifted sm:p-7",
        className
      )}
    >
      <span className="mb-5 grid size-13 place-items-center rounded-2xl bg-emerald/10 text-emerald transition-all duration-300 group-hover:bg-emerald group-hover:text-white">
        <Icon className="size-6" aria-hidden />
      </span>

      <h3 className="font-display text-lg font-semibold tracking-tight">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {service.description}
      </p>

      <ul className="mt-5 flex flex-col gap-2.5 border-t border-border pt-5">
        {service.features.slice(0, 3).map((feature) => (
          <li key={feature} className="flex items-center gap-2.5 text-sm text-muted">
            <Check className="size-4 shrink-0 text-emerald" aria-hidden />
            {feature}
          </li>
        ))}
      </ul>
    </Card>
  );
}
