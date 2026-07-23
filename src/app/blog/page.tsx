import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { blogPosts } from "@/data";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { PlaceholderImage } from "@/components/shared/placeholder-image";
import { InitialsAvatar } from "@/components/shared/initials-avatar";
import { BlogCard } from "@/components/cards/blog-card";

export const metadata: Metadata = createMetadata({
  title: "Health Blog",
  description:
    "Evidence-based health guidance written by Hospital360 doctors — heart health, orthopedics, parenting, nutrition and more.",
  path: "/blog",
});

export default function BlogPage() {
  const featured = blogPosts.find((post) => post.featured);
  const rest = blogPosts.filter((post) => post !== featured);

  return (
    <>
      <PageHeader
        eyebrow="Health Insights"
        title="From our medical desk"
        description="Evidence-based health guidance written by our doctors."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />

      <Section>
        {featured ? (
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-[2rem] border border-border bg-surface shadow-soft transition-all hover:shadow-lifted lg:grid-cols-2"
            >
              <PlaceholderImage
                seed={featured.slug}
                label={featured.category}
                minimal
                className="aspect-[16/10] w-full lg:aspect-auto lg:h-full"
              />
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <div className="flex flex-wrap gap-2">
                  <Badge>{featured.category}</Badge>
                  <Badge variant="emerald">Featured</Badge>
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-balance transition-colors group-hover:text-primary sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 line-clamp-3 leading-relaxed text-muted">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
                  <InitialsAvatar
                    name={featured.author}
                    className="size-10 text-sm"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold">{featured.author}</p>
                    <p className="text-xs text-muted">{featured.authorRole}</p>
                  </div>
                  <span aria-hidden className="text-muted">
                    ·
                  </span>
                  <time
                    dateTime={featured.publishedAt}
                    className="text-xs text-muted"
                  >
                    {formatDate(featured.publishedAt)}
                  </time>
                  <span aria-hidden className="text-muted">
                    ·
                  </span>
                  <span className="text-xs text-muted">
                    {featured.readingTime} min read
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ) : null}

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, index) => (
            <Reveal key={post.id} delay={(index % 3) * 0.1}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
