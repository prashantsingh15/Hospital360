import Link from "next/link";
import { ArrowRight, CalendarCheck, Star } from "lucide-react";
import type { Doctor } from "@/types";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InitialsAvatar } from "@/components/shared/initials-avatar";

interface DoctorCardProps {
  doctor: Doctor;
  departmentName?: string;
  className?: string;
}

export function DoctorCard({ doctor, departmentName, className }: DoctorCardProps) {
  return (
    <Card
      className={cn(
        "group relative flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lifted sm:p-7",
        className
      )}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <InitialsAvatar name={doctor.name} className="size-16 text-lg" />
        {doctor.availableToday ? (
          <Badge variant="emerald">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald" />
            </span>
            Available today
          </Badge>
        ) : null}
      </div>

      <h3 className="font-display text-lg font-semibold tracking-tight">
        <Link
          href={`/doctors/${doctor.slug}`}
          className="transition-colors after:absolute after:inset-0 group-hover:text-primary"
        >
          {doctor.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-muted">
        {doctor.designation}
        {departmentName ? ` · ${departmentName}` : ""}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
          <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden />
          {doctor.rating.toFixed(1)}
          <span className="font-normal text-muted">({doctor.reviewCount})</span>
        </span>
        <span className="text-muted">
          {doctor.experienceYears}+ yrs experience
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
        <div>
          <p className="text-xs text-muted">Consultation</p>
          <p className="font-display text-base font-bold text-foreground">
            ₹{doctor.consultationFee}
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="relative z-10 group-hover:border-primary group-hover:bg-primary group-hover:text-white"
          asChild
        >
          <Link href={`/appointment?doctor=${doctor.slug}`}>
            <CalendarCheck aria-hidden />
            Book
          </Link>
        </Button>
      </div>

      <ArrowRight
        aria-hidden
        className="absolute top-7 right-7 size-4 -translate-x-1 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-primary group-hover:opacity-100"
      />
    </Card>
  );
}
