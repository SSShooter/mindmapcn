import { notFound } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";

import {
  createLlmItemMarkdown,
  getRegistryItem,
  getRegistryItemNames,
} from "@/lib/llm-content";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const itemName = slug?.[0];

  if (!itemName) {
    notFound();
  }

  const item = getRegistryItem(itemName);

  if (!item || (slug && slug.length > 1)) {
    notFound();
  }

  return new NextResponse(createLlmItemMarkdown(item), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}

export function generateStaticParams() {
  return getRegistryItemNames().map((name) => ({ slug: [name] }));
}
