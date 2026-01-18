import { DocsLayout, DocsSection, DocsCode } from "../_components/docs";
import { ComponentPreview } from "../_components/component-preview";
import { BasicMindMapExample } from "../_components/examples/basic-mindmap-example";
import { getExampleSource } from "@/lib/get-example-source";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Basic Usage",
};

export default function UsagePage() {
  const basicMindmapSource = getExampleSource("basic-mindmap-example.tsx");

  return (
    <DocsLayout
      title="Usage"
      description="The simplest way to add an interactive mind map to your application."
      prev={{ title: "Installation", href: "/docs/installation" }}
      next={{ title: "API Reference", href: "/docs/api-reference" }}
    >
      <DocsSection>
        <p>
          The <DocsCode>MindMap</DocsCode> component initializes the mind map canvas,
          handles theming, and provides context for child components.
        </p>
      </DocsSection>

      <ComponentPreview code={basicMindmapSource}>
        <BasicMindMapExample />
      </ComponentPreview>
    </DocsLayout>
  );
}
