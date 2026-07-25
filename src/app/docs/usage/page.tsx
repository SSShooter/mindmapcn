import { DocsLayout, DocsSection, DocsCode } from "../_components/docs";
import { ComponentPreview } from "../_components/component-preview";
import { BasicMindMapExample } from "../_components/examples/basic-mindmap-example";
import { OnChangeMindMapExample } from "../_components/examples/onchange-mindmap-example";
import { ReadonlyMindMapExample } from "../_components/examples/readonly-mindmap-example";
import { DirectionMindMapExample } from "../_components/examples/direction-mindmap-example";
import { LocaleMindMapExample } from "../_components/examples/locale-mindmap-example";
import { CustomThemeMindMapExample } from "../_components/examples/custom-theme-mindmap-example";
import { MarkdownMindMapExample } from "../_components/examples/markdown-mindmap-example";
import { CompactMindMapExample } from "../_components/examples/compact-mindmap-example";
import { ImageProxyMindMapExample } from "../_components/examples/image-proxy-mindmap-example";
import { getExampleSource } from "@/lib/get-example-source";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Basic Usage",
};

export default function UsagePage() {
  const basicMindmapSource = getExampleSource("basic-mindmap-example.tsx");
  const onChangeMindmapSource = getExampleSource("onchange-mindmap-example.tsx");
  const readonlyMindmapSource = getExampleSource("readonly-mindmap-example.tsx");
  const directionMindmapSource = getExampleSource("direction-mindmap-example.tsx");
  const localeMindmapSource = getExampleSource("locale-mindmap-example.tsx");
  const customThemeMindmapSource = getExampleSource("custom-theme-mindmap-example.tsx");
  const markdownMindmapSource = getExampleSource("markdown-mindmap-example.tsx");
  const compactMindmapSource = getExampleSource("compact-mindmap-example.tsx");
  const imageProxyMindmapSource = getExampleSource("image-proxy-mindmap-example.tsx");

  return (
    <DocsLayout
      title="Usage"
      description="The simplest way to add an interactive mind map to your application."
      prev={{ title: "Installation", href: "/docs/installation" }}
      next={{ title: "Plaintext Format", href: "/docs/plaintext" }}
    >
      <DocsSection>
        <p>
          The <DocsCode>MindMap</DocsCode> component initializes the mind map canvas,
          handles theming, and provides context for child components. It is designed
          for presentation-first maps; use <DocsCode>readonly</DocsCode> when viewers
          should not edit nodes.
        </p>
      </DocsSection>

      <ComponentPreview code={basicMindmapSource}>
        <BasicMindMapExample />
      </ComponentPreview>

      <DocsSection title="Handling Changes">
        <p>
          Use the <DocsCode>onChange</DocsCode> callback to respond to user interactions
          with the mind map. This callback receives the updated data whenever a node is
          added, edited, moved, or deleted.
        </p>
      </DocsSection>

      <ComponentPreview code={onChangeMindmapSource}>
        <OnChangeMindMapExample />
      </ComponentPreview>

      <DocsSection title="Readonly Mode">
        <p>
          Create a view-only mind map by disabling editing features. This is perfect
          for displaying organizational charts, knowledge bases, or any static content
          that shouldn&apos;t be modified by users.
        </p>
      </DocsSection>

      <ComponentPreview code={readonlyMindmapSource}>
        <ReadonlyMindMapExample />
      </ComponentPreview>

      <DocsSection title="Markdown Nodes">
        <p>
          Pass a <DocsCode>markdown</DocsCode> function to render rich text in node
          topics. Bring your own parser (for example{" "}
          <DocsCode>marked</DocsCode> or <DocsCode>markdown-it</DocsCode>), or use a
          small custom implementation for bold, italic, and code as shown below.
        </p>
      </DocsSection>

      <ComponentPreview code={markdownMindmapSource}>
        <MarkdownMindMapExample />
      </ComponentPreview>

      <DocsSection title="Compact Layout">
        <p>
          Enable <DocsCode>compact</DocsCode> for tighter spacing. Useful when embedding
          dense knowledge maps or fitting more nodes into a card-sized viewport.
        </p>
      </DocsSection>

      <ComponentPreview code={compactMindmapSource}>
        <CompactMindMapExample />
      </ComponentPreview>

      <DocsSection title="Image Proxy (Export CORS)">
        <p>
          When nodes include remote images, exporting the map to a file can fail
          because of cross-origin restrictions. Pass{" "}
          <DocsCode>imageProxy</DocsCode> to rewrite those image URLs through a
          same-origin or CORS-friendly proxy so the export can capture them.
          This is only needed for image generation / export — not for normal
          on-screen viewing.
        </p>
      </DocsSection>

      <ComponentPreview code={imageProxyMindmapSource}>
        <ImageProxyMindMapExample />
      </ComponentPreview>

      <DocsSection title="Custom Layout Direction">
        <p>
          Control how the mind map branches expand by setting the{" "}
          <DocsCode>direction</DocsCode> prop. Choose between left (0), right (1), or
          both sides (2) to match your content structure and visual preferences.
        </p>
      </DocsSection>

      <ComponentPreview code={directionMindmapSource}>
        <DirectionMindMapExample />
      </ComponentPreview>

      <DocsSection title="Localization">
        <p>
          The MindMap component supports multiple languages for its built-in menus and
          prompts. Set the <DocsCode>locale</DocsCode> prop to match your application&apos;s
          language or user preferences.
        </p>
      </DocsSection>

      <ComponentPreview code={localeMindmapSource}>
        <LocaleMindMapExample />
      </ComponentPreview>

      <DocsSection title="Theme Control">
        <p>
          By default, the mind map automatically adapts to your document&apos;s theme. You
          can override this behavior by explicitly setting the{" "}
          <DocsCode>theme</DocsCode> prop to force a specific appearance.
        </p>
      </DocsSection>

      <ComponentPreview code={customThemeMindmapSource}>
        <CustomThemeMindMapExample />
      </ComponentPreview>
    </DocsLayout>
  );
}
