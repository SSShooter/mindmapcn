import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/llm-prompts";

const routes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/docs", changeFrequency: "monthly", priority: 0.9 },
  { path: "/docs/installation", changeFrequency: "monthly", priority: 0.9 },
  { path: "/docs/usage", changeFrequency: "monthly", priority: 0.8 },
  { path: "/docs/plaintext", changeFrequency: "monthly", priority: 0.8 },
  { path: "/docs/data-structure", changeFrequency: "monthly", priority: 0.8 },
  { path: "/docs/api-reference", changeFrequency: "monthly", priority: 0.8 },
  { path: "/llms.txt", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified,
    changeFrequency,
    priority,
  }));
}
