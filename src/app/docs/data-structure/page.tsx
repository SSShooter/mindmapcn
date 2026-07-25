import {
  DocsLayout,
  DocsSection,
  DocsCode,
  DocsLink,
} from "../_components/docs";
import { CodeBlock } from "../_components/code-block";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Structure",
};

const minimalCode = `import type { MindElixirData } from "mind-elixir";

const data: MindElixirData = {
  nodeData: {
    id: "root",
    topic: "Mind Map",
    children: [
      { id: "a", topic: "Topic A" },
      { id: "b", topic: "Topic B" },
    ],
  },
};`;

const fullCode = `import type { MindElixirData } from "mind-elixir";

const data: MindElixirData = {
  nodeData: {
    id: "root",
    topic: "Product",
    children: [
      {
        id: "design",
        topic: "Design",
        icons: ["🎨"],
        tags: ["UI"],
        children: [
          {
            id: "tokens",
            topic: "Tokens",
            // Optional per-node styling
            style: { fontWeight: "bold" },
            branchColor: "#3b82f6",
          },
          {
            id: "logo",
            topic: "Logo",
            image: {
              url: "https://example.com/logo.png",
              width: 64,
              height: 64,
              fit: "contain",
            },
          },
        ],
      },
      {
        id: "docs",
        topic: "Docs",
        hyperLink: "https://example.com/docs",
        expanded: true,
        children: [{ id: "api", topic: "API" }],
      },
    ],
  },
  // Optional map-level fields:
  // direction: 2,
  // arrows: [{ id: "a1", from: "tokens", to: "api", label: "refs" }],
  // summaries: [{ id: "s1", parent: "design", start: 0, end: 1, label: "Scope" }],
};`;

export default function DataStructurePage() {
  return (
    <DocsLayout
      title="Data Structure"
      description="Shape of the data you pass to MindMap via the data prop."
      prev={{ title: "Plaintext Format", href: "/docs/plaintext" }}
      next={{ title: "API Reference", href: "/docs/api-reference" }}
    >
      <DocsSection>
        <p>
          Pass a <DocsCode>MindElixirData</DocsCode> object to{" "}
          <DocsCode>data</DocsCode>. The type comes from{" "}
          <DocsCode>mind-elixir</DocsCode>; mindmapcn does not invent a separate
          schema. Prefer authoring an outline instead? <DocsCode>data</DocsCode>{" "}
          also accepts a <DocsLink href="/docs/plaintext">plaintext string</DocsLink>.
        </p>
      </DocsSection>

      <DocsSection title="Minimal example">
        <p>
          At minimum you need a root <DocsCode>nodeData</DocsCode> with{" "}
          <DocsCode>id</DocsCode>, <DocsCode>topic</DocsCode>, and optional{" "}
          <DocsCode>children</DocsCode>.
        </p>
        <CodeBlock code={minimalCode} />
      </DocsSection>

      <DocsSection title="Node fields">
        <p>Common fields for presentation-oriented maps:</p>
        <ul>
          <li>
            <DocsCode>id</DocsCode>, <DocsCode>topic</DocsCode> — required identity
            and label
          </li>
          <li>
            <DocsCode>children</DocsCode> — nested nodes
          </li>
          <li>
            <DocsCode>tags</DocsCode>, <DocsCode>icons</DocsCode> — labels and emoji
          </li>
          <li>
            <DocsCode>image</DocsCode> —{" "}
            <DocsCode>{"{ url, width, height, fit? }"}</DocsCode>
          </li>
          <li>
            <DocsCode>hyperLink</DocsCode> — clickable URL on the node
          </li>
          <li>
            <DocsCode>style</DocsCode>, <DocsCode>branchColor</DocsCode> — visual
            tweaks
          </li>
          <li>
            <DocsCode>expanded</DocsCode> — initial collapse state
          </li>
        </ul>
      </DocsSection>

      <DocsSection title="Map-level fields">
        <p>Optional fields on the root data object:</p>
        <ul>
          <li>
            <DocsCode>direction</DocsCode> — layout side (0 left / 1 right / 2
            both)
          </li>
          <li>
            <DocsCode>arrows</DocsCode> — cross-node links
          </li>
          <li>
            <DocsCode>summaries</DocsCode> — group brackets over sibling ranges
          </li>
          <li>
            <DocsCode>theme</DocsCode> — full Mind Elixir theme object (overrides
            prop theme)
          </li>
          <li>
            <DocsCode>compact</DocsCode>, <DocsCode>meta</DocsCode> — layout density
            and custom metadata
          </li>
        </ul>
      </DocsSection>

      <DocsSection title="Richer example">
        <CodeBlock code={fullCode} />
      </DocsSection>

      <DocsSection title="Learn more">
        <p>
          For the complete schema and advanced fields, see{" "}
          <DocsLink
            href="https://github.com/ssshooter/mind-elixir-core"
            external
          >
            Mind Elixir Core
          </DocsLink>
          .
        </p>
      </DocsSection>
    </DocsLayout>
  );
}
