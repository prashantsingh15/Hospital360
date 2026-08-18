import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogPost } from "@/types";
import { cn, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PlaceholderImage } from "@/components/shared/placeholder-image";
import { InitialsAvatar } from "@/components/shared/initials-avatar";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lifted",
        className
      )}
    >
      <div className="relative overflow-hidden">
        <PlaceholderImage
          seed={post.slug}
          label={post.category}
          minimal
          className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-4 left-4 glass border-white/25 text-white">
          {post.category}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-3 text-xs text-muted">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden />
            {post.readingTime} min read
          </span>
        </div>

        <h3 className="font-display text-lg leading-snug font-semibold tracking-tight">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors after:absolute after:inset-0 group-hover:text-primary"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center gap-3 border-t border-border pt-5">
          <InitialsAvatar name={post.author} className="size-9 text-xs" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">{post.author}</p>
            <p className="text-xs text-muted">{post.authorRole}</p>
          </div>
          <ArrowUpRight
            aria-hidden
            className="ml-auto size-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
          />
        </div>
      </div>
    </article>
  );
}
