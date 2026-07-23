import Link from "next/link";
import { blogPosts } from "@/data";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/cards/blog-card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";

export function BlogPreview() {
  const posts = [...blogPosts]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  return (
    <Section aria-label="Health insights">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading
          align="left"
          className="mb-0"
          eyebrow="Health Insights"
          title="From our medical desk"
          description="Practical, doctor-written guides to help you and your family stay ahead of illness."
        />
        <Button variant="outline" className="hidden shrink-0 sm:inline-flex" asChild>
          <Link href="/blog">View All Articles</Link>
        </Button>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Reveal key={post.id} delay={index * 0.06}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
