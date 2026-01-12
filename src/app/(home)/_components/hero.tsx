"use client";

import { Button } from "@/components/ui/button";
import { Copy, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "site-url-here";

const installCommand = `npx shadcn@latest add ${siteUrl}/mindmaps/mindmap.json`;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      {copied ? (
        <Check className="size-4 text-emerald-500" />
      ) : (
        <Copy className="size-4" />
      )}
    </button>
  );
}

export function Hero() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight animate-fade-up">
          Beautiful mind maps, made simple.
        </h1>
        <p className="text-foreground/80 text-lg max-w-xl mx-auto animate-fade-up delay-100">
          Beautifully designed, Open source mind map components. Zero config. One
          command setup.
        </p>
      </div>

      <div className="flex justify-center animate-fade-up delay-200 w-full px-4">
        <div className="inline-flex items-center gap-3 bg-secondary/50 border border-border/50 rounded-full px-5 py-2.5 font-mono text-sm max-w-full overflow-x-auto">
          <span className="text-muted-foreground shrink-0">$</span>
          <code>{installCommand}</code>
          <CopyButton text={installCommand} />
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-3 animate-fade-up delay-300">
        <Button asChild>
          <Link href="/docs">
            Get Started <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/docs/basic-map">View Examples</Link>
        </Button>
      </div>
    </div>
  );
}
