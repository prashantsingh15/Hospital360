import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Hero } from "@/components/home/hero";
import { StatsBar } from "@/components/home/stats-bar";
import { EmergencyCta } from "@/components/home/emergency-cta";
import { QuickAppointment } from "@/components/home/quick-appointment";
import { DepartmentsPreview } from "@/components/home/departments-preview";
import { DoctorsPreview } from "@/components/home/doctors-preview";
import { Facilities } from "@/components/home/facilities";
import { Technology } from "@/components/home/technology";
import { PatientJourney } from "@/components/home/patient-journey";
import { TestimonialsPreview } from "@/components/home/testimonials-preview";
import { InsuranceMarquee } from "@/components/home/insurance-marquee";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { FaqPreview } from "@/components/home/faq-preview";
import { BlogPreview } from "@/components/home/blog-preview";
import { NewsletterCta } from "@/components/home/newsletter-cta";

export const metadata = createMetadata({
  title: "Advanced Multispeciality Hospital in New Delhi",
  description: site.description,
  path: "/",
  keywords: [
    "multispeciality hospital in New Delhi",
    "24x7 emergency care",
    "robotic surgery",
    "book doctor appointment online",
    "NABH accredited hospital",
    "cashless insurance treatment",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <EmergencyCta />
      <QuickAppointment />
      <DepartmentsPreview />
      <DoctorsPreview />
      <Facilities />
      <Technology />
      <PatientJourney />
      <TestimonialsPreview />
      <InsuranceMarquee />
      <GalleryPreview />
      <FaqPreview />
      <BlogPreview />
      <NewsletterCta />
    </>
  );
}
