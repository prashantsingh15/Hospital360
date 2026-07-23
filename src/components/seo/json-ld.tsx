import { departments } from "@/data/departments";
import { site } from "@/lib/site";
import type { BlogPost, Department, Doctor, FAQ } from "@/types";

/* ------------------------------------------------------------------ */
/* JSON-LD helpers (server components — no client JS).                 */
/* ------------------------------------------------------------------ */

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Hospital", "MedicalOrganization"],
        "@id": `${site.url}/#organization`,
        name: site.legalName,
        alternateName: site.name,
        url: site.url,
        telephone: site.emergency,
        email: site.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.line1,
          addressLocality: site.address.city,
          addressRegion: site.address.state,
          postalCode: site.address.pin,
          addressCountry: "IN",
        },
        openingHours: "Mo-Su 00:00-24:00",
        medicalSpecialty: departments.slice(0, 8).map((d) => d.name),
        availableService: [
          { "@type": "MedicalProcedure", name: "24×7 Emergency & Trauma Care" },
          { "@type": "MedicalProcedure", name: "In-house Pharmacy" },
          { "@type": "MedicalProcedure", name: "Advanced Diagnostics & Imaging" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${site.url}/doctors?query={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return <JsonLd data={data} />;
}

/* ------------------------------------------------------------------ */
/* Typed schema builders for page-level use.                           */
/* ------------------------------------------------------------------ */

export function physicianSchema(doctor: Doctor): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    medicalSpecialty: doctor.specializations,
    worksFor: {
      "@type": "Hospital",
      name: site.legalName,
      url: site.url,
    },
    telephone: site.phone,
  };
}

export function departmentSchema(
  department: Department,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: department.name,
    description: department.description,
    url: `${site.url}/departments/${department.slug}`,
  };
}

export function faqPageSchema(faqs: FAQ[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleSchema(post: BlogPost): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      url: site.url,
    },
  };
}
