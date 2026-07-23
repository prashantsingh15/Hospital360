import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { departments } from "@/data";
import { Button } from "@/components/ui/button";
import { DepartmentCard } from "@/components/cards/department-card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";

export function DepartmentsPreview() {
  const featured = departments.filter((department) => department.featured);

  return (
    <Section background="surface" aria-label="Departments">
      <SectionHeading
        eyebrow="Centres of Excellence"
        title="40+ specialities under one roof"
        description="From preventive cardiology to robotic joint replacement, every centre pairs senior specialists with advanced technology."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((department, index) => (
          <Reveal key={department.id} delay={index * 0.06}>
            <DepartmentCard department={department} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12 flex justify-center">
        <Button variant="outline" size="lg" asChild>
          <Link href="/departments">
            View All Departments
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </Reveal>
    </Section>
  );
}
