import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { faqs } from "@/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";

export function FaqPreview() {
  return (
    <Section background="muted" aria-label="Frequently asked questions">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading
            align="left"
            className="mb-6"
            eyebrow="FAQ"
            title="Questions, answered"
            description="Everything you need to know before your visit."
          />
          <Reveal className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/contact">
                <MessageCircle aria-hidden />
                Ask a Question
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/faq">View all FAQs</Link>
            </Button>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {faqs.slice(0, 6).map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}
