"use client";

import { Button } from "@/components/ui/button";
import { Copy, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const siteUrl = "https://mindmapcn.vercel.app";

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
      className="shrink-0 text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-muted/80 rounded-md p-1.5 -m-1.5"
      aria-label="Copy to clipboard"
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
          Beautiful mind maps, effortlessly
        </h1>
        <p className="text-foreground/80 text-lg max-w-xl mx-auto animate-fade-up delay-100">
          Beautiful mind map components based on <span className="font-semibold text-foreground">Mind Elixir</span>. One command to install, zero config to start.
        </p>
      </div>

      <div className="flex justify-center animate-fade-up delay-200 w-full px-4">
        <div className="group relative inline-flex items-center gap-3 bg-muted/50 backdrop-blur-sm border border-border rounded-lg px-4 py-3 font-mono text-sm max-w-full overflow-x-auto shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200">
          <span className="text-muted-foreground/60 shrink-0 select-none">$</span>
          <code className="text-foreground/90 flex-1">{installCommand}</code>
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
          <Link href="/docs/usage">Explore Examples</Link>
        </Button>
      </div>
    </div>
  );
}
