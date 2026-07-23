import Link from "next/link";
import {
  Award,
  Eye,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Target,
  type LucideIcon,
} from "lucide-react";
import { stats } from "@/data";
import { createMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Counter } from "@/components/shared/counter";
import { InitialsAvatar } from "@/components/shared/initials-avatar";
import { PageHeader } from "@/components/shared/page-header";
import { PlaceholderImage } from "@/components/shared/placeholder-image";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";

export const metadata = createMetadata({
  title: "About Us",
  description:
    "The story, mission and people behind Hospital360 — a 450-bed multispeciality hospital combining advanced technology with compassionate care since 2009.",
  path: "/about",
});

interface Value {
  title: string;
  description: string;
  icon: LucideIcon;
}

const values: Value[] = [
  {
    title: "Compassion",
    description:
      "Every decision starts with one question — what is kindest for the patient in front of us?",
    icon: HeartHandshake,
  },
  {
    title: "Excellence",
    description:
      "We audit our outcomes against national benchmarks and never stop raising the bar.",
    icon: Award,
  },
  {
    title: "Integrity",
    description:
      "Honest advice, transparent billing and treatment plans we would give our own families.",
    icon: ShieldCheck,
  },
  {
    title: "Innovation",
    description:
      "From robotic surgery to digital records, we adopt technology that measurably improves care.",
    icon: Lightbulb,
  },
];

interface Milestone {
  year: string;
  title: string;
  description: string;
}

const milestones: Milestone[] = [
  {
    year: "2009",
    title: "A single clinic opens its doors",
    description:
      "Two physicians, one 40-bed facility and a promise: hospital care that treats people like family.",
  },
  {
    year: "2012",
    title: "NABH accreditation",
    description:
      "Our quality and patient-safety systems earn national accreditation — three years ahead of schedule.",
  },
  {
    year: "2015",
    title: "Expansion to 200 beds",
    description:
      "New towers for critical care, oncology and mother-and-child services open to meet growing demand.",
  },
  {
    year: "2018",
    title: "Robotic surgery programme launches",
    description:
      "Hospital360 becomes one of Delhi NCR's first centres for robotic joint replacement and minimally invasive surgery.",
  },
  {
    year: "2021",
    title: "One million patients cared for",
    description:
      "A milestone built one consultation, one surgery and one recovery at a time.",
  },
  {
    year: "2025",
    title: "The Hospital360 digital platform",
    description:
      "Online appointments, digital reports and telemedicine bring the hospital to every home in the region.",
  },
];

interface Leader {
  name: string;
  role: string;
  bio: string;
}

const leaders: Leader[] = [
  {
    name: "Dr. Rajesh Khanna",
    role: "Chairman & Chief of Cardiology",
    bio: "Founded Hospital360 after two decades in interventional cardiology at AIIMS.",
  },
  {
    name: "Dr. Meera Iyer",
    role: "Medical Director",
    bio: "Leads clinical governance across all 40+ specialities and 250+ doctors.",
  },
  {
    name: "Mr. Arjun Nair",
    role: "Chief Executive Officer",
    bio: "Drives Hospital360's digital transformation and patient-experience programmes.",
  },
  {
    name: "Dr. Sana Qureshi",
    role: "Head of Quality",
    bio: "Keeps every audit, accreditation and safety protocol ahead of national standards.",
  },
];

const accreditations = [
  "NABH Accredited",
  "JCI Certified",
  "ISO 9001:2015",
  "NABL Certified",
  "Green OT Certified",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Hospital360"
        title="Redefining healthcare since 2009"
        description="From a single 40-bed clinic to one of India's most trusted multispeciality hospitals — this is the story of Hospital360."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />

      {/* Story */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="right">
            <PlaceholderImage
              seed="about-story"
              label="Hospital360 Campus"
              className="aspect-[4/3] w-full rounded-[2rem] shadow-lifted"
            />
          </Reveal>
          <Reveal direction="left">
            <Badge className="mb-4">Our Story</Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              From one clinic to India&apos;s most trusted hospital
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted">
              <p>
                Hospital360 began in 2009 as a modest 40-bed clinic in New
                Delhi, founded by two young physicians who believed a hospital
                should feel less like an institution and more like a place of
                healing. Word travelled quickly — not because of our building,
                but because of how our doctors listened.
              </p>
              <p>
                Today, Hospital360 is a 450-bed multispeciality hospital with
                over 250 specialist doctors, two advanced cath labs, a Level III
                NICU and one of the region&apos;s most experienced robotic
                surgery programmes. We have cared for more than a million
                patients across 40+ specialities.
              </p>
              <p>
                Yet our founding philosophy has not changed: pair the most
                advanced medical technology available with doctors who treat
                every patient with empathy, patience and honesty. Technology
                heals faster; compassion heals deeper. We insist on both.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section background="surface">
        <div className="grid gap-6 sm:grid-cols-2">
          <Reveal className="h-full">
            <Card className="h-full p-8">
              <span className="mb-5 grid size-13 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Target className="size-6" aria-hidden />
              </span>
              <h3 className="font-display text-2xl font-bold tracking-tight">
                Our Mission
              </h3>
              <p className="mt-3 leading-relaxed text-muted">
                To make world-class healthcare accessible to every family —
                delivering advanced, ethical and affordable treatment with the
                warmth of a neighbourhood clinic and the rigour of a global
                institution.
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.1} className="h-full">
            <Card className="h-full p-8">
              <span className="mb-5 grid size-13 place-items-center rounded-2xl bg-emerald/10 text-emerald">
                <Eye className="size-6" aria-hidden />
              </span>
              <h3 className="font-display text-2xl font-bold tracking-tight">
                Our Vision
              </h3>
              <p className="mt-3 leading-relaxed text-muted">
                To be India&apos;s most trusted healthcare partner — a hospital
                where every patient, at every stage of life, receives exactly
                the care we would want for our own families.
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <SectionHeading
          eyebrow="What we stand for"
          title="Values that guide every decision"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Reveal key={value.title} delay={index * 0.06} className="h-full">
                <Card className="h-full p-6">
                  <span className="mb-5 grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {value.description}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Milestones */}
      <Section background="muted">
        <SectionHeading eyebrow="Our Journey" title="Milestones" />
        <div className="ml-3 max-w-3xl space-y-10 border-l-2 border-primary/20">
          {milestones.map((milestone, index) => (
            <Reveal key={milestone.year} delay={index * 0.06}>
              <div className="relative pl-10">
                <span
                  aria-hidden
                  className="absolute top-1 -left-[9px] size-4 rounded-full bg-primary ring-4 ring-primary/15"
                />
                <Badge>{milestone.year}</Badge>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
                  {milestone.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {milestone.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Leadership */}
      <Section>
        <SectionHeading
          eyebrow="Leadership"
          title="Guided by experience"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {leaders.map((leader, index) => (
            <Reveal key={leader.name} delay={index * 0.06} className="h-full">
              <Card className="h-full p-6 text-center">
                <InitialsAvatar
                  name={leader.name}
                  className="mx-auto size-20 text-2xl"
                />
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                  {leader.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-primary">
                  {leader.role}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {leader.bio}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Accreditations */}
      <Section spacing="sm">
        <Reveal className="flex flex-wrap justify-center gap-4">
          {accreditations.map((item) => (
            <Badge key={item} variant="outline" className="px-4 py-2 text-sm">
              <Award aria-hidden className="text-primary" />
              {item}
            </Badge>
          ))}
        </Reveal>
      </Section>

      {/* Stats band */}
      <Section background="dark">
        <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id}>
              <Counter
                to={stat.value}
                suffix={stat.suffix}
                className="font-display text-4xl font-bold text-white"
              />
              <p className="mt-2 text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA band */}
      <Section>
        <Reveal>
          <div className="rounded-[2.5rem] bg-gradient-to-br from-primary to-primary-active p-10 text-center text-white sm:p-16">
            <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Experience care beyond compare
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Book a consultation with one of our 250+ specialists and see the
              Hospital360 difference for yourself.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button variant="white" size="lg" asChild>
                <Link href="/appointment">Book an Appointment</Link>
              </Button>
              <Link
                href="/doctors"
                className="inline-flex h-13 items-center rounded-full border border-white/30 px-8 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Meet Our Doctors
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
