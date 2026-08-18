import type { MetadataRoute } from "next";
import { blogPosts, departments, doctors } from "@/data";
import { site } from "@/lib/site";

const staticRoutes: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/appointment", priority: 0.9 },
  { path: "/doctors", priority: 0.9 },
  { path: "/departments", priority: 0.9 },
  { path: "/services", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
  { path: "/blog", priority: 0.7 },
  { path: "/testimonials", priority: 0.6 },
  { path: "/gallery", priority: 0.5 },
  { path: "/faq", priority: 0.5 },
  { path: "/privacy-policy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority,
    })),
    ...doctors.map((doctor) => ({
      url: `${site.url}/doctors/${doctor.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...departments.map((department) => ({
      url: `${site.url}/departments/${department.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
