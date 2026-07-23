import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Container } from "./container";
import { Reveal } from "./reveal";

interface Breadcrumb {
  label: string;
  href: string;
}

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  children?: React.ReactNode;
  className?: string;
}

/** Consistent hero band for inner pages. */
export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  children,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-b border-border bg-primary-softer pt-28 pb-16 sm:pt-36 sm:pb-20 dark:bg-primary/5",
        className
      )}
    >
      {/* decorative background */}
      <div aria-hidden className="absolute inset-0 bg-grid [mask-image:radial-gradient(70%_70%_at_50%_30%,black,transparent)]" />
      <div aria-hidden className="absolute -top-24 right-0 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 -left-16 size-80 rounded-full bg-emerald/10 blur-3xl" />

      <Container className="relative">
        <Reveal>
          {breadcrumbs.length > 0 ? (
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
                {breadcrumbs.map((crumb, index) => (
                  <li key={crumb.href} className="flex items-center gap-1.5">
                    {index > 0 ? (
                      <ChevronRight className="size-3.5" aria-hidden />
                    ) : null}
                    {index === breadcrumbs.length - 1 ? (
                      <span aria-current="page" className="font-medium text-foreground">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="transition-colors hover:text-primary"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <Badge className="mb-4">{eyebrow}</Badge>
          <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </Reveal>
      </Container>
    </div>
  );
}
