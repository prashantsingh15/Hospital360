import Link from "next/link";
import { doctors, getDepartmentBySlug } from "@/data";
import { Button } from "@/components/ui/button";
import { DoctorCard } from "@/components/cards/doctor-card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";

export function DoctorsPreview() {
  return (
    <Section aria-label="Doctors">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading
          align="left"
          className="mb-0"
          eyebrow="Our Doctors"
          title="Meet the specialists"
          description="Senior consultants and surgeons, most trained at India's premier institutes — unhurried consultations, honest advice."
        />
        <Button variant="outline" className="hidden shrink-0 sm:inline-flex" asChild>
          <Link href="/doctors">View All Doctors</Link>
        </Button>
      </div>
      <div className="-mx-4 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 no-scrollbar">
        {doctors.slice(0, 6).map((doctor, index) => (
          <Reveal
            key={doctor.id}
            delay={index * 0.06}
            className="w-[300px] shrink-0 snap-start sm:w-[340px]"
          >
            <DoctorCard
              doctor={doctor}
              departmentName={getDepartmentBySlug(doctor.department)?.name}
              className="w-[300px] sm:w-[340px]"
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
