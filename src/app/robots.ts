import type { MetadataRoute } from "next";

export const dynamic = "force-static";

import { siteUrl } from "@/lib/llm-prompts";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
    host: siteUrl,
  };
}
