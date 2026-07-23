import { ShieldCheck } from "lucide-react";
import { insurancePartners } from "@/data";
import { Section } from "@/components/shared/section";

export function InsuranceMarquee() {
  return (
    <Section spacing="sm" id="insurance" aria-label="Insurance partners">
      <p className="mb-8 text-center text-sm font-semibold tracking-widest text-muted uppercase">
        Cashless treatment with 12+ insurance partners
      </p>
      <div
        aria-label="Insurance partners"
        className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
          {[...insurancePartners, ...insurancePartners].map((partner, index) => (
            <span
              key={`${partner.id}-${index}`}
              className="flex items-center gap-2.5 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold whitespace-nowrap text-muted shadow-soft"
            >
              <ShieldCheck className="size-4 text-emerald" aria-hidden />
              {partner.name}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
