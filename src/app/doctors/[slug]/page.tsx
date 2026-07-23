import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Briefcase,
  Building2,
  CalendarCheck,
  Clock,
  GraduationCap,
  Languages,
  Phone,
  Star,
} from "lucide-react";
import { doctors, getDepartmentBySlug, getDoctorBySlug, getDoctorsByDepartment } from "@/data";
import { site } from "@/lib/site";
import { createMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DoctorCard } from "@/components/cards/doctor-card";
import { InitialsAvatar } from "@/components/shared/initials-avatar";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { JsonLd, physicianSchema, breadcrumbSchema } from "@/components/seo/json-ld";

interface DoctorPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return doctors.map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata({ params }: DoctorPageProps) {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);
  if (!doctor) return {};
  return createMetadata({
    title: doctor.name,
    description: doctor.about.slice(0, 160),
    path: `/doctors/${doctor.slug}`,
  });
}

export default async function DoctorPage({ params }: DoctorPageProps) {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);
  if (!doctor) notFound();

  const department = getDepartmentBySlug(doctor.department);
  const departmentName = department?.name ?? doctor.department;

  const sameDepartment = department
    ? getDoctorsByDepartment(department.slug).filter(
        (item) => item.id !== doctor.id
      )
    : [];
  const related =
    sameDepartment.length > 0
      ? sameDepartment.slice(0, 3)
      : doctors.filter((item) => item.id !== doctor.id).slice(0, 3);

  return (
    <>
      <JsonLd data={physicianSchema(doctor)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Doctors", url: `${site.url}/doctors` },
          { name: doctor.name, url: `${site.url}/doctors/${doctor.slug}` },
        ])}
      />
      <PageHeader
        eyebrow={departmentName}
        title={doctor.name}
        description={`${doctor.qualifications} · ${doctor.designation}`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Doctors", href: "/doctors" },
          { label: doctor.name, href: `/doctors/${doctor.slug}` },
        ]}
      />

      <Section>
        <div className="grid items-start gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Main column */}
          <div className="flex flex-col gap-8">
            <Reveal>
              <Card className="p-6 sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row">
                  <InitialsAvatar
                    name={doctor.name}
                    className="size-24 text-3xl sm:size-28"
                  />
                  <div className="flex-1">
                    {doctor.availableToday ? (
                      <Badge variant="emerald">Available Today</Badge>
                    ) : (
                      <Badge variant="outline">By Appointment</Badge>
                    )}
                    <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
                      {doctor.name}
                    </h2>
                    <p className="mt-1 text-muted">{doctor.qualifications}</p>

                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <Star
                          className="size-4 fill-amber-400 text-amber-400"
                          aria-hidden
                        />
                        {doctor.rating.toFixed(1)}
                        <span className="font-normal text-muted">
                          ({doctor.reviewCount} reviews)
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-muted">
                        <Briefcase className="size-4" aria-hidden />
                        {doctor.experienceYears}+ years
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-muted">
                        <Languages className="size-4" aria-hidden />
                        {doctor.languages.join(", ")}
                      </span>
                      {department ? (
                        <Link
                          href={`/departments/${department.slug}`}
                          className="inline-flex items-center gap-1.5 text-primary transition-colors hover:text-primary-hover"
                        >
                          <Building2 className="size-4" aria-hidden />
                          {department.name}
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>

            <Reveal>
              <Card className="p-6 sm:p-8">
                <h3 className="mb-3 font-display text-xl font-semibold tracking-tight">
                  About {doctor.name}
                </h3>
                <p className="leading-relaxed text-muted">{doctor.about}</p>
              </Card>
            </Reveal>

            <Reveal>
              <Card className="p-6 sm:p-8">
                <h3 className="mb-3 font-display text-xl font-semibold tracking-tight">
                  Specializations
                </h3>
                <div className="flex flex-wrap">
                  {doctor.specializations.map((item) => (
                    <Badge key={item} variant="outline" className="m-1">
                      {item}
                    </Badge>
                  ))}
                </div>
              </Card>
            </Reveal>

            <Reveal>
              <Card className="p-6 sm:p-8">
                <h3 className="mb-4 font-display text-xl font-semibold tracking-tight">
                  Education &amp; Training
                </h3>
                <ul className="space-y-3">
                  {doctor.education.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <GraduationCap
                        className="mt-0.5 size-5 shrink-0 text-primary"
                        aria-hidden
                      />
                      <span className="text-muted">{item}</span>
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
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  Book Consultation
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-muted">Consultation Fee</span>
                  <span className="font-display text-2xl font-bold">
                    ₹{doctor.consultationFee}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2 border-t border-border pt-4 text-sm text-muted">
                  <Clock className="size-4 shrink-0" aria-hidden />
                  {doctor.timings}
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <Button size="lg" className="w-full" asChild>
                    <Link href={`/appointment?doctor=${doctor.slug}`}>
                      <CalendarCheck aria-hidden />
                      Book Appointment
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={site.phoneHref}>
                      <Phone aria-hidden />
                      Call {site.phone}
                    </a>
                  </Button>
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Related specialists */}
      <Section background="surface">
        <SectionHeading
          align="left"
          eyebrow="Related Specialists"
          title={`More from ${departmentName}`}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.06} className="h-full">
              <DoctorCard doctor={item} departmentName={departmentName} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
