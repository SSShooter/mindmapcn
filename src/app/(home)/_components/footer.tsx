import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full px-6 py-6 border-t border-border/40">
      <div className="mx-auto max-w-5xl flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Built by{" "}
          <a
            href="https://github.com/ssshooter"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:underline"
          >
            SSShooter
          </a>
        </span>
        <div className="flex items-center gap-4">
          <a
            href="https://mindmapcn-svelte.mind-elixir.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Svelte Version
          </a>
          <a
            href="https://github.com/ssshooter/mindmapcn"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <Link
            href="/docs"
            className="hover:text-foreground transition-colors"
          >
            Docs
          </Link>
        </div>
      </div>
    </footer>
  );
}
