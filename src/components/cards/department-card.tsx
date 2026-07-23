import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Department } from "@/types";
import { cn } from "@/lib/utils";

interface DepartmentCardProps {
  department: Department;
  className?: string;
}

export function DepartmentCard({ department, className }: DepartmentCardProps) {
  const Icon = department.icon;

  return (
    <Link
      href={`/departments/${department.slug}`}
      className={cn(
        "group relative flex h-full flex-col rounded-3xl border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lifted sm:p-7",
        className
      )}
    >
      <div className="mb-5 flex items-start justify-between">
        <span className="grid size-13 place-items-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-glow">
          <Icon className="size-6" aria-hidden />
        </span>
        <ArrowUpRight
          aria-hidden
          className="size-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
        />
      </div>

      <h3 className="font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
        {department.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {department.tagline}
      </p>
      <p className="mt-4 text-xs font-semibold tracking-wide text-muted uppercase">
        {department.doctorsCount}+ specialists
      </p>
    </Link>
  );
}
