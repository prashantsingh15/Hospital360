import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description:
    "The terms that govern your use of the Hospital360 website, appointment services and billing.",
  path: "/terms",
});

const headingClass = "mt-12 mb-4 font-display text-2xl font-bold tracking-tight";
const listClass = "list-disc space-y-2 pl-6 text-muted";

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms of Service", href: "/terms" },
        ]}
      />

      <Section containerSize="sm">
        <Badge variant="outline">Last updated: January 2025</Badge>

        <p className="mt-6 text-muted">
          These Terms of Service govern your use of the Hospital360 website
          and the services offered through it. By accessing this website or
          booking an appointment, you accept these terms in full. If you do
          not agree, please discontinue use of the website.
        </p>

        <h2 className={headingClass}>1. Acceptance of terms</h2>
        <p className="text-muted">
          The website is operated by Hospital360 Multispeciality Hospital, New
          Delhi. We may update these terms from time to time; the version
          published on this page applies from its &ldquo;last updated&rdquo;
          date. Continued use of the website after an update constitutes
          acceptance of the revised terms.
        </p>

        <h2 className={headingClass}>2. Medical disclaimer</h2>
        <p className="text-muted">
          Content on this website — including articles, doctor profiles and
          FAQs — is provided for general information only. It is not medical
          advice, does not create a doctor–patient relationship and must never
          replace consultation with a qualified physician. If you are
          experiencing a medical emergency, call our emergency line or visit
          the emergency department immediately instead of relying on website
          content.
        </p>

        <h2 className={headingClass}>3. Appointments & cancellations</h2>
        <ul className={listClass}>
          <li>
            Online bookings are requests that are confirmed by our care team
            by phone, SMS or email; a booking is final only after
            confirmation.
          </li>
          <li>
            You may reschedule or cancel free of charge up to 2 hours before
            your confirmed slot.
          </li>
          <li>
            Consultation schedules can change if a doctor is engaged in an
            emergency; in such cases we offer the next available slot or an
            equally qualified doctor.
          </li>
          <li>
            Repeated no-shows without notice may require prepayment for
            future bookings.
          </li>
        </ul>

        <h2 className={headingClass}>4. Payments & refunds</h2>
        <ul className={listClass}>
          <li>
            Fees displayed on the website are indicative; the final fee is
            confirmed at the time of billing.
          </li>
          <li>
            Prepaid consultation fees for appointments cancelled within the
            free-cancellation window are refunded to the original payment
            method within 5–7 working days.
          </li>
          <li>
            Payments are processed through PCI-DSS-compliant gateways; we do
            not store your card details.
          </li>
        </ul>

        <h2 className={headingClass}>5. Insurance & cashless services</h2>
        <p className="text-muted">
          Cashless treatment is subject to authorisation by your insurer or
          TPA and the terms of your policy. Empanelment of an insurer does not
          guarantee claim approval; any amount disallowed by the insurer is
          payable by the patient. Our insurance desk assists with paperwork
          but the policy contract remains between you and your insurer.
        </p>

        <h2 className={headingClass}>6. Intellectual property</h2>
        <p className="text-muted">
          All content on this website — text, design, logos, illustrations and
          software — is the property of Hospital360 or its licensors and is
          protected by applicable intellectual-property law. You may view and
          print pages for personal, non-commercial use. Any other
          reproduction, distribution or modification requires our prior
          written consent.
        </p>

        <h2 className={headingClass}>7. Limitation of liability</h2>
        <ul className={listClass}>
          <li>
            The website is provided &ldquo;as is&rdquo;; we do not warrant
            uninterrupted or error-free availability.
          </li>
          <li>
            To the fullest extent permitted by law, Hospital360 is not liable
            for indirect or consequential losses arising from use of the
            website or reliance on its content.
          </li>
          <li>
            Nothing in these terms limits liability for medical services,
            which are governed by the separate patient consent and treatment
            documentation signed at the hospital.
          </li>
        </ul>

        <h2 className={headingClass}>8. Governing law</h2>
        <p className="text-muted">
          These terms are governed by the laws of India. Any dispute arising
          from use of this website is subject to the exclusive jurisdiction of
          the courts at New Delhi, India.
        </p>

        <h2 className={headingClass}>9. Contact</h2>
        <p className="text-muted">
          Questions about these terms may be sent to{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-primary underline-offset-4 hover:underline"
          >
            {site.email}
          </a>{" "}
          or to {site.address.line1}, {site.address.city} {site.address.pin}.
        </p>
      </Section>
    </>
  );
}
