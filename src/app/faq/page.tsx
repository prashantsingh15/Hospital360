import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { faqs } from "@/data";
import type { FAQ } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { JsonLd, faqPageSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = createMetadata({
  title: "FAQs",
  description:
    "Quick answers about appointments, insurance, visiting hours and hospital services at Hospital360.",
  path: "/faq",
});

/** Group FAQs by category, preserving the order they appear in the data. */
function groupByCategory(items: FAQ[]): [string, FAQ[]][] {
  const groups = new Map<string, FAQ[]>();
  for (const item of items) {
    const group = groups.get(item.category);
    if (group) {
      group.push(item);
    } else {
      groups.set(item.category, [item]);
    }
  }
  return [...groups.entries()];
}

export default function FAQPage() {
  const categories = groupByCategory(faqs);

  return (
    <>
      <JsonLd data={faqPageSchema(faqs)} />
      <PageHeader
        eyebrow="Help Center"
        title="Frequently asked questions"
        description="Quick answers about appointments, insurance, visits and more."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQs", href: "/faq" },
        ]}
      />

      <Section containerSize="md">
        {categories.map(([category, items], categoryIndex) => (
          <Reveal key={category}>
            <h2
              className={
                categoryIndex === 0
                  ? "mb-4 flex items-center gap-3 font-display text-xl font-bold"
                  : "mt-12 mb-4 flex items-center gap-3 font-display text-xl font-bold"
              }
            >
              <Badge>{category}</Badge>
            </h2>
            <Accordion type="single" collapsible className="flex flex-col gap-3">
              {items.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        ))}

        <Reveal>
          <Card className="mt-16 border-primary/15 bg-primary/5 p-8 text-center">
            <h3 className="font-display text-2xl font-bold tracking-tight">
              Still have questions?
            </h3>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Our care team is available round the clock to help with
              appointments, reports and insurance queries.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button variant="outline" asChild>
                <a href={site.phoneHref}>
                  <Phone aria-hidden />
                  {site.phone}
                </a>
              </Button>
            </div>
          </Card>
        </Reveal>
      </Section>
    </>
  );
}
