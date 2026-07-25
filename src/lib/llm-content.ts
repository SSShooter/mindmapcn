import registry from "../../registry.json";
import {
  mindmapInstallCommand,
  siteUrl,
} from "@/lib/llm-prompts";

interface ComponentDoc {
  title: string;
  href: string;
  description: string;
}

interface RegistryFile {
  path: string;
  target?: string;
  type?: string;
}

export interface RegistryItem {
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: RegistryFile[];
  categories?: string[];
  meta?: {
    components?: ComponentDoc[];
  };
}

interface RegistrySchema {
  name: string;
  homepage?: string;
  items: RegistryItem[];
}

const typedRegistry = registry as RegistrySchema;

function code(value: string) {
  return `\`${value}\``;
}

function formatList(items: string[] | undefined, fallback = "None") {
  if (!items?.length) return fallback;
  return items.map((item) => `- ${item}`).join("\n");
}

function formatFiles(files: RegistryFile[] | undefined) {
  if (!files?.length) return "None";

  return files
    .map((file) => {
      const target = file.target ? ` -> ${file.target}` : "";
      const type = file.type ? ` (${file.type})` : "";
      return `- ${file.path}${target}${type}`;
    })
    .join("\n");
}

function createUsageGuidanceMarkdown() {
  return `## Usage guidance for agents

- Always wrap ${code("<MindMap>")} in a parent with an explicit height (for example ${code("h-[500px]")}). The map uses full width/height of its parent; a parent without height collapses to a blank area.
- In the Next.js App Router, the consuming file must be a Client Component (${code('"use client"')}) because the map uses browser APIs.
- Prefer ${code("readonly")} for presentation, embedding, org charts, knowledge maps, and other view-only diagrams.
- Leave the map interactive only when the user explicitly needs in-canvas editing. This library is not a full mind-map editor UI (no built-in undo toolbar or inspector).
- Use ${code("fit")} (default ${code("true")}) so the map scales to the viewport on load.
- Use ${code("compact")} for denser layouts in cards or small viewports.
- Use ${code("direction")}: ${code("0")} left, ${code("1")} right, ${code("2")} both/side (default).
- Use ${code("theme")} only to force light/dark; omit it to follow the document / system theme (works with next-themes).
- Use ${code("markdown")} when node topics need rich text — pass a custom parser (for example marked); do not assume a built-in markdown engine.
- The ${code("data")} prop accepts either a ${code("MindElixirData")} object or a Mind Elixir plaintext string (2-space indented outline); strings are parsed automatically via ${code("plaintextToMindElixir")}. The plaintext format is convenient for AI generation and streaming.
- Use ${code("imageProxy")} only when export fails due to CORS on remote node images; it is not required for on-screen display.
- For the full instance API (methods, events, advanced options), use ${code("useMindMap().mind")} and see Mind Elixir docs: https://github.com/ssshooter/mind-elixir-core
`;
}

function getComponentDocs() {
  return typedRegistry.items.flatMap((item) => {
    if (item.type !== "registry:ui") return [];

    const components = item.meta?.components ?? [
      {
        title: item.title ?? item.name,
        href: `/llm/${item.name}`,
        description: item.description ?? "No description.",
      },
    ];

    return components;
  });
}

export function getRegistryItem(name: string) {
  return typedRegistry.items.find((entry) => entry.name === name);
}

export function getRegistryItemNames() {
  return typedRegistry.items.map((item) => item.name);
}

export function createLlmIndexMarkdown() {
  const components = getComponentDocs();
  const blocks = typedRegistry.items.filter(
    (item) => item.type === "registry:block",
  );

  return `# mindmapcn

mindmapcn is a free, open-source shadcn-style registry of ready-to-use React mind map components. It is built on Mind Elixir, styled with Tailwind CSS, and intended for projects that already use shadcn/ui. Optimized for presentation-first maps (org charts, knowledge maps, project plans); editing works but is secondary.

Website: ${siteUrl}
Docs: ${siteUrl}/docs
Registry index: ${siteUrl}/mindmaps/registry.json
Source: ${typedRegistry.homepage ?? "https://github.com/SSShooter/mindmapcn"}

## Install the mind map component

Prerequisites: Tailwind CSS and shadcn/ui already set up in the project.

Run:

\`\`\`bash
${mindmapInstallCommand}
\`\`\`

This installs ${code("mind-elixir")}, ${code("lucide-react")}, and ${code("@zumer/snapdom")}, and copies the component to ${code("components/ui/mindmap.tsx")} by default.

Then import from ${code("@/components/ui/mindmap")}:

\`\`\`tsx
"use client";

import { MindMap, MindMapControls } from "@/components/ui/mindmap";
import type { MindElixirData } from "mind-elixir";

const data: MindElixirData = {
  nodeData: {
    id: "root",
    topic: "Mind Map",
    children: [
      { id: "a", topic: "Topic A" },
      { id: "b", topic: "Topic B" },
    ],
  },
};

export function MyMindMap() {
  return (
    // Give the container an explicit height — the map fills 100% of its parent.
    <div className="h-[500px] w-full border rounded-lg overflow-hidden relative">
      <MindMap data={data} readonly>
        <MindMapControls />
      </MindMap>
    </div>
  );
}
\`\`\`

${createUsageGuidanceMarkdown()}

## Components

Install once with ${code(mindmapInstallCommand)}, then import these APIs from ${code("@/components/ui/mindmap")}:

${components.map((item) => `- [${item.title}](${item.href}) - ${item.description}`).join("\n")}

## Documentation

- [Introduction](/docs) - Project overview and presentation-first philosophy
- [Installation](/docs/installation) - Install command and first example
- [Usage](/docs/usage) - Readonly, onChange, direction, theme, markdown, compact, imageProxy
- [Plaintext Format](/docs/plaintext) - Pass an indentation-based outline string to ${code("data")}
- [Data Structure](/docs/data-structure) - Shape of ${code("MindElixirData")} / ${code("nodeData")}
- [API Reference](/docs/api-reference) - Component props and ${code("useMindMap")}

## Blocks

${
  blocks.length
    ? blocks
        .map(
          (item) =>
            `- [${item.title ?? item.name}](/llm/${item.name}) - install with ${code(`npx shadcn@latest add ${siteUrl}/mindmaps/${item.name}.json`)}`,
        )
        .join("\n")
    : "None yet."
}
`;
}

export function createLlmItemMarkdown(item: RegistryItem) {
  const installCommand = `npx shadcn@latest add ${siteUrl}/mindmaps/${item.name}.json`;

  return `# ${item.title ?? item.name}

${item.description ?? "No description available."}

Type: ${code(item.type)}
Registry item: ${siteUrl}/mindmaps/${item.name}.json

## Install

\`\`\`bash
${installCommand}
\`\`\`

## Dependencies

${formatList(item.dependencies)}

## Registry Dependencies

${formatList(item.registryDependencies)}

## Files

${formatFiles(item.files)}

## Exports

Import from ${code("@/components/ui/mindmap")} after install:

- ${code("MindMap")} - Root component; initializes Mind Elixir, theming, and context
- ${code("MindMapControls")} - Zoom in/out, fit, and export controls
- ${code("useMindMap")} - Hook for ${code("mind")} instance and ${code("isLoaded")}

${item.name === "mindmap" ? createUsageGuidanceMarkdown() : ""}
`;
}
