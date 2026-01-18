import {
  DocsCode,
  DocsLayout,
  DocsLink,
  DocsNote,
  DocsSection,
} from "../_components/docs";
import { CodeBlock } from "../_components/code-block";
import { Metadata } from "next";
import { MindMap, MindMapControls } from "@/registry/mindmap";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mindmap.ssshooter.com";

const installCode = `npx shadcn@latest add ${siteUrl}/registry/mindmap.json`;

const usageCode = `import { MindMap, MindMapControls } from "@/registry/mindmap";

export function MyMindMap() {
  return (
    <div className="h-[500px] w-full border rounded-lg overflow-hidden relative">
      <MindMap />
    </div>
  );
}`;

export const metadata: Metadata = {
  title: "Installation",
};

export default function InstallationPage() {
  return (
    <DocsLayout
      title="Installation"
      description="How to install and set up mindmapcn in your project."
      prev={{ title: "Introduction", href: "/docs" }}
      next={{ title: "Usage", href: "/docs/usage" }}
    >
      <DocsSection title="Prerequisites">
        <p>
          A project with{" "}
          <DocsLink href="https://tailwindcss.com" external>
            Tailwind CSS
          </DocsLink>{" "}
          and{" "}
          <DocsLink href="https://ui.shadcn.com" external>
            shadcn/ui
          </DocsLink>{" "}
          set up.
        </p>
      </DocsSection>

      <DocsSection title="Installation">
        <p>Run the following command to add the mind map component:</p>
        <CodeBlock code={installCode} language="bash" />
        <p>
          This will install <DocsCode>mind-elixir</DocsCode> and add the MindMap
          component to your project.
        </p>
      </DocsSection>

      <DocsSection title="Usage">
        <p>Import and use the MindMap component:</p>
        <CodeBlock code={usageCode} />
        <div className="h-[300px] w-full border rounded-lg overflow-hidden relative bg-background">
          <MindMap fit={true}>
            <MindMapControls />
          </MindMap>
        </div>
      </DocsSection>

      <DocsNote>
        <strong>Note:</strong> The mind map uses <code>oklch</code> colors for accessibility and theme support.
        It automatically switches between light and dark themes.
      </DocsNote>
    </DocsLayout>
  );
}
