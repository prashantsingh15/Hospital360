import Link from "next/link";
import { departments } from "@/data";
import { createMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DepartmentCard } from "@/components/cards/department-card";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";

export const metadata = createMetadata({
  title: "Departments & Centres of Excellence",
  description:
    "Advanced speciality care across 40+ departments at Hospital360, led by nationally renowned doctors and backed by cutting-edge technology.",
  path: "/departments",
});

export default function DepartmentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Departments"
        title="Centres of Excellence"
        description="Advanced speciality care across 40+ departments, led by nationally renowned doctors."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Departments", href: "/departments" },
        ]}
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((department, index) => (
            <Reveal
              key={department.id}
              delay={(index % 3) * 0.06}
              className="h-full"
            >
              <DepartmentCard department={department} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <Card className="border-0 bg-gradient-to-br from-primary to-primary-active p-8 text-center text-white sm:p-10">
            <h3 className="font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl">
              Not sure which specialist you need?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-white/80">
              Tell our care team your symptoms and we will guide you to the
              right department — no medical jargon required.
            </p>
            <Button variant="white" size="lg" className="mt-8" asChild>
              <Link href="/appointment">Talk to Our Care Team</Link>
            </Button>
          </Card>
        </Reveal>
      </Section>
    </>
  );
}
