import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Link2, Mail, MessageCircle, Share2 } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { blogPosts } from "@/data";
import type { BlogPost } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { PlaceholderImage } from "@/components/shared/placeholder-image";
import { InitialsAvatar } from "@/components/shared/initials-avatar";
import { BlogCard } from "@/components/cards/blog-card";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/components/seo/json-ld";
import { site } from "@/lib/site";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return createMetadata({
      title: "Article Not Found",
      description: "The article you are looking for does not exist.",
      path: "/blog",
    });
  }
  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
  });
}

function getRelatedPosts(post: BlogPost): BlogPost[] {
  const others = blogPosts.filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, 3);
}

const shareButtons = [
  { label: "Share this article", icon: Share2 },
  { label: "Share via WhatsApp", icon: MessageCircle },
  { label: "Share via email", icon: Mail },
  { label: "Copy link", icon: Link2 },
];

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Blog", url: `${site.url}/blog` },
          { name: post.title, url: `${site.url}/blog/${post.slug}` },
        ])}
      />
      <PageHeader
        eyebrow={post.category}
        title={post.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.category, href: `/blog/${post.slug}` },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <InitialsAvatar name={post.author} className="size-10 text-sm" />
          <div className="min-w-0">
            <p className="font-semibold">{post.author}</p>
            <p className="text-xs text-muted">{post.authorRole}</p>
          </div>
          <span aria-hidden className="text-muted">
            ·
          </span>
          <time dateTime={post.publishedAt} className="text-xs text-muted">
            {formatDate(post.publishedAt)}
          </time>
          <span aria-hidden className="text-muted">
            ·
          </span>
          <span className="text-xs text-muted">
            {post.readingTime} min read
          </span>
        </div>
      </PageHeader>

      <Section containerSize="sm">
        <PlaceholderImage
          seed={post.slug}
          label={post.category}
          className="mb-12 aspect-[16/8] w-full rounded-[2rem] shadow-lifted"
        />

        <article>
          {post.content.map((paragraph, index) => (
            <p
              key={index}
              className={
                index === 0
                  ? "mb-6 text-lg leading-relaxed font-medium text-foreground sm:text-xl"
                  : "mb-6 text-base leading-relaxed text-muted sm:text-lg"
              }
            >
              {paragraph}
            </p>
          ))}
        </article>

        <div className="mt-10 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>

        <Card className="mt-10 flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">
          <p className="font-semibold">Share this article</p>
          <div className="flex items-center gap-3">
            {shareButtons.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-4" aria-hidden />
              </a>
            ))}
          </div>
        </Card>

        <Card className="mt-8 flex items-center gap-4 p-6">
          <InitialsAvatar name={post.author} className="size-14 text-base" />
          <div className="min-w-0">
            <p className="font-semibold">{post.author}</p>
            <p className="text-sm text-muted">{post.authorRole}</p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto" asChild>
            <Link href="/doctors">Find a Doctor</Link>
          </Button>
        </Card>
      </Section>

      {related.length > 0 ? (
        <Section background="surface">
          <SectionHeading
            align="left"
            eyebrow="Keep Reading"
            title="Related articles"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((relatedPost, index) => (
              <Reveal key={relatedPost.id} delay={index * 0.1}>
                <BlogCard post={relatedPost} />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
