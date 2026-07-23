import type { Metadata } from "next";
import { site } from "./site";

interface PageMetadataInput {
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/doctors" */
  path?: string;
  keywords?: string[];
}

/** Builds consistent per-page metadata: canonical, OpenGraph, Twitter. */
export function createMetadata({
  title,
  description,
  path = "",
  keywords = [],
}: PageMetadataInput): Metadata {
  const url = `${site.url}${path}`;

  return {
    title,
    description,
    keywords: [...keywords, "hospital", "healthcare", site.name],
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
    },
  };
}
