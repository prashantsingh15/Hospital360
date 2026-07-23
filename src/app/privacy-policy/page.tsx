import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "How Hospital360 collects, uses, protects and retains your personal and health information.",
  path: "/privacy-policy",
});

const headingClass = "mt-12 mb-4 font-display text-2xl font-bold tracking-tight";
const listClass = "list-disc space-y-2 pl-6 text-muted";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy-policy" },
        ]}
      />

      <Section containerSize="sm">
        <Badge variant="outline">Last updated: January 2025</Badge>

        <p className="mt-6 text-muted">
          Hospital360 Multispeciality Hospital (&ldquo;Hospital360&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;) is committed to protecting the
          privacy of every patient, attendant and website visitor. This policy
          explains what information we collect, why we collect it, how we keep
          it safe and the rights you have over your own data. By using our
          website or availing our services, you agree to the practices
          described here.
        </p>

        <h2 className={headingClass}>1. Information we collect</h2>
        <p className="text-muted">
          We collect only the information needed to deliver safe, effective
          care and a smooth digital experience:
        </p>
        <ul className={listClass}>
          <li>
            <strong className="text-foreground">Identity & contact details</strong>{" "}
            — name, age, gender, phone number, email address and postal
            address provided during registration or appointment booking.
          </li>
          <li>
            <strong className="text-foreground">Health information</strong> —
            medical history, symptoms, diagnoses, prescriptions, investigation
            reports and treatment records created during your care. This is
            treated as sensitive personal data under applicable law.
          </li>
          <li>
            <strong className="text-foreground">Billing & insurance data</strong>{" "}
            — payment details, policy numbers and insurer/TPA information
            required for cashless processing.
          </li>
          <li>
            <strong className="text-foreground">Usage data</strong> — device,
            browser and pages visited on our website, collected through
            cookies and analytics tools.
          </li>
        </ul>

        <h2 className={headingClass}>2. How we use your information</h2>
        <ul className={listClass}>
          <li>To schedule, confirm and remind you about appointments.</li>
          <li>To diagnose, treat and coordinate your care across departments.</li>
          <li>To process payments, insurance claims and cashless approvals.</li>
          <li>To share lab reports, discharge summaries and follow-up plans.</li>
          <li>To meet legal, regulatory and medical-record-keeping obligations.</li>
          <li>
            To improve our services — using aggregated, de-identified data
            only.
          </li>
        </ul>

        <h2 className={headingClass}>3. Cookies & analytics</h2>
        <p className="text-muted">
          Our website uses essential cookies to keep pages secure and sessions
          working, and optional analytics cookies to understand which content
          helps visitors most. Analytics data is aggregated and never linked
          to your medical record. You can disable non-essential cookies in
          your browser settings; core site features will continue to work.
        </p>

        <h2 className={headingClass}>4. Data sharing — never sold</h2>
        <p className="text-muted">
          We do not sell, rent or trade your personal or health information to
          anyone, for any reason. Information is shared only in these limited
          circumstances:
        </p>
        <ul className={listClass}>
          <li>
            With doctors, laboratories and specialists directly involved in
            your care.
          </li>
          <li>
            With your insurer or TPA, strictly for claim processing you have
            authorised.
          </li>
          <li>
            With regulators or authorities where disclosure is required by
            law.
          </li>
          <li>
            With service providers (for example, SMS gateways) bound by
            confidentiality agreements and data-processing terms.
          </li>
        </ul>

        <h2 className={headingClass}>5. How we protect your data</h2>
        <ul className={listClass}>
          <li>Encryption of data in transit (TLS) and at rest.</li>
          <li>
            Role-based access — staff see only the records their duties
            require.
          </li>
          <li>Audit trails on every access to an electronic health record.</li>
          <li>
            Regular security assessments, staff training and incident-response
            drills.
          </li>
        </ul>

        <h2 className={headingClass}>6. Your rights</h2>
        <p className="text-muted">You may, at any time:</p>
        <ul className={listClass}>
          <li>Request a copy of your medical records and personal data.</li>
          <li>
            Ask us to correct inaccurate or incomplete information
            (rectification).
          </li>
          <li>
            Withdraw consent for optional communications such as health
            newsletters.
          </li>
          <li>
            Raise a concern about how your data is handled and receive a
            response within 30 days.
          </li>
        </ul>

        <h2 className={headingClass}>7. Data retention</h2>
        <p className="text-muted">
          Medical records are retained for the periods mandated by Indian law
          and clinical guidelines — typically a minimum of three years for
          outpatient records and longer for inpatient and medico-legal
          records. Website enquiry data that does not become part of a medical
          record is deleted within 12 months of resolution.
        </p>

        <h2 className={headingClass}>8. Children&apos;s privacy</h2>
        <p className="text-muted">
          Records for patients under 18 are created and accessed only with the
          consent of a parent or legal guardian. Guardians may exercise all
          rights described in this policy on behalf of their child.
        </p>

        <h2 className={headingClass}>9. Contact our Data Protection Officer</h2>
        <p className="text-muted">
          For any privacy question, request or complaint, write to our Data
          Protection Officer at{" "}
          <a
            href="mailto:dpo@hospital360.com"
            className="text-primary underline-offset-4 hover:underline"
          >
            dpo@hospital360.com
          </a>{" "}
          or by post to the hospital address. We acknowledge every request
          within 72 hours.
        </p>

        <h2 className={headingClass}>10. Updates to this policy</h2>
        <p className="text-muted">
          We may revise this policy as our services or regulations evolve. The
          latest version is always available on this page, and material
          changes are announced on the website before they take effect.
        </p>
      </Section>
    </>
  );
}
