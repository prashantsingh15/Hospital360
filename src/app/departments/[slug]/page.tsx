import Link from "next/link";
import { notFound } from "next/navigation";
import { CircleCheckBig, Phone } from "lucide-react";
import {
  departments,
  getDepartmentBySlug,
  getDoctorsByDepartment,
} from "@/data";
import { site } from "@/lib/site";
import { createMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DoctorCard } from "@/components/cards/doctor-card";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { JsonLd, departmentSchema, breadcrumbSchema } from "@/components/seo/json-ld";

interface DepartmentPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return departments.map((department) => ({ slug: department.slug }));
}

export async function generateMetadata({ params }: DepartmentPageProps) {
  const { slug } = await params;
  const department = getDepartmentBySlug(slug);
  if (!department) return {};
  return createMetadata({
    title: department.name,
    description: department.description,
    path: `/departments/${department.slug}`,
  });
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const { slug } = await params;
  const department = getDepartmentBySlug(slug);
  if (!department) notFound();

  const Icon = department.icon;
  const specialists = getDoctorsByDepartment(department.slug);
  const otherDepartments = departments.filter(
    (item) => item.slug !== department.slug
  );

  return (
    <>
      <JsonLd data={departmentSchema(department)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Departments", url: `${site.url}/departments` },
          { name: department.name, url: `${site.url}/departments/${department.slug}` },
        ])}
      />
      <PageHeader
        eyebrow="Department"
        title={department.name}
        description={department.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Departments", href: "/departments" },
          { label: department.name, href: `/departments/${department.slug}` },
        ]}
      />

      <Section>
        <div className="grid items-start gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Main column */}
          <div className="flex flex-col gap-8">
            <Reveal>
              <Card className="p-6 sm:p-8">
                <span className="mb-6 grid size-16 place-items-center rounded-3xl bg-primary/10 text-primary">
                  <Icon className="size-8" aria-hidden />
                </span>
                <h2 className="mb-4 font-display text-2xl font-bold tracking-tight">
                  Overview
                </h2>
                {department.longDescription.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="mb-4 leading-relaxed text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </Card>
            </Reveal>

            <Reveal>
              <Card className="p-6 sm:p-8">
                <h2 className="mb-5 font-display text-2xl font-bold tracking-tight">
                  Key Highlights
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {department.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-sm text-muted"
                    >
                      <CircleCheckBig
                        className="mt-0.5 size-5 shrink-0 text-emerald"
                        aria-hidden
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>

            <Reveal>
              <Card className="p-6 sm:p-8">
                <h2 className="mb-5 font-display text-2xl font-bold tracking-tight">
                  Services &amp; Treatments
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {department.services.map((service) => (
                    <li key={service}>
                      <Badge
                        variant="outline"
                        className="w-full justify-start px-4 py-2.5 text-sm"
                      >
                        {service}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-24">
            <Reveal>
              <Card className="p-6">
                <p className="font-display text-3xl font-bold text-primary">
                  {department.doctorsCount}+
                </p>
                <p className="mt-1 text-sm text-muted">Specialist doctors</p>
                <hr className="my-4 border-border" />
                <div className="flex flex-col gap-3">
                  <Button className="w-full" asChild>
                    <Link href="/appointment">Book Appointment</Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/doctors">Find a Doctor</Link>
                  </Button>
                </div>
              </Card>
            </Reveal>

            <Reveal>
              <Card className="bg-muted-soft p-6">
                <p className="text-sm font-medium">Need help deciding?</p>
                <p className="mt-1 text-sm text-muted">
                  Our care team will guide you to the right specialist.
                </p>
                <a
                  href={site.phoneHref}
                  className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
                >
                  <Phone className="size-4" aria-hidden />
                  Call {site.phone}
                </a>
              </Card>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Specialists */}
      {specialists.length > 0 ? (
        <Section background="surface">
          <SectionHeading
            align="left"
            eyebrow="Our Specialists"
            title={`Doctors in ${department.name}`}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {specialists.map((doctor, index) => (
              <Reveal
                key={doctor.id}
                delay={(index % 3) * 0.06}
                className="h-full"
              >
                <DoctorCard
                  doctor={doctor}
                  departmentName={department.name}
                />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Other departments */}
      <Section spacing="sm">
        <Reveal>
          <h2 className="mb-6 font-display text-xl font-semibold tracking-tight">
            Other Departments
          </h2>
          <div className="flex flex-wrap gap-3">
            {otherDepartments.map((item) => (
              <Link
                key={item.slug}
                href={`/departments/${item.slug}`}
                className="inline-flex min-h-11 items-center rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </Reveal>
      </Section>
    </>
  );
}
