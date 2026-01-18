import {
  DocsLayout,
  DocsSection,
  DocsCode,
  DocsPropTable,
} from "../_components/docs";
import { CodeBlock } from "../_components/code-block";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Reference",
};

const anatomyCode = `<MindMap data={initialData}>
  <MindMapControls />
</MindMap>`;

const useMindMapCode = `const { mind, isLoaded } = useMindMap();`;

export default function ApiReferencePage() {
  return (
    <DocsLayout
      title="API Reference"
      description="Complete reference for the MindMap component and its props."
      prev={{ title: "Usage", href: "/docs/usage" }}
    >
      <DocsSection title="Component Anatomy">
        <p>
          The standard way to use the MindMap component.
        </p>
        <CodeBlock code={anatomyCode} showCopyButton={false} />
      </DocsSection>

      {/* MindMap */}
      <DocsSection title="MindMap">
        <p>
          The root component that initializes the mind map instance.
          It handles data loading, theme management, and event listeners.
        </p>
        <DocsPropTable
          props={[
            {
              name: "data",
              type: "MindElixirData",
              description:
                "Initial data for the mind map. Changes to this prop will update the map content.",
            },
            {
              name: "direction",
              type: "0 | 1 | 2",
              default: "1",
              description:
                "Layout direction: 0 (Left), 1 (Right), 2 (Side/Both).",
            },
            {
              name: "draggable",
              type: "boolean",
              default: "true",
              description: "Enable node dragging.",
            },
            {
              name: "contextMenu",
              type: "boolean",
              default: "true",
              description: "Enable right-click context menu.",
            },
            {
              name: "toolBar",
              type: "boolean",
              default: "false",
              description: "Show the built-in toolbar (not recommended, use MindMapControls instead).",
            },
            {
              name: "nodeMenu",
              type: "boolean",
              default: "true",
              description: "Show menu when clicking a node.",
            },
            {
              name: "keypress",
              type: "boolean",
              default: "true",
              description: "Enable keyboard shortcuts (Enter, Tab, etc.).",
            },
            {
              name: "locale",
              type: '"en" | "zh_CN" | "zh_TW" | "ja" | "pt"',
              default: '"en"',
              description: "Language for built-in menus and prompts.",
            },
            {
              name: "theme",
              type: '"light" | "dark"',
              description: "Force a specific theme. If omitted, follows system/document theme.",
            },
            {
              name: "fit",
              type: "boolean",
              default: "true",
              description: "Automatically fit map to view on load.",
            },
            {
              name: "onChange",
              type: "(data: MindElixirData) => void",
              description: "Callback when map data changes.",
            },
             {
              name: "onSelectNodes",
              type: "(nodes: NodeObj[]) => void",
              description: "Callback when nodes are selected.",
            },
          ]}
        />
      </DocsSection>

      {/* useMindMap */}
      <DocsSection title="useMindMap">
        <p>
          A hook that provides access to the MindElixir instance. 
          Must be used within a <DocsCode>MindMap</DocsCode> component.
        </p>
        <CodeBlock code={useMindMapCode} language="tsx" showCopyButton={false} />
        <p>
          Returns <DocsCode>mind</DocsCode> (MindElixirInstance) and <DocsCode>isLoaded</DocsCode> (boolean).
        </p>
      </DocsSection>

      {/* MindMapControls */}
      <DocsSection title="MindMapControls">
        <p>
          Renders UI controls for the mind map (Zoom, Fit, Export, Fullscreen).
        </p>
        <DocsPropTable
          props={[
            {
              name: "position",
              type: '"top-left" | "top-right" | "bottom-left" | "bottom-right"',
              default: '"top-right"',
              description: "Position of the controls overlay.",
            },
            {
              name: "showZoom",
              type: "boolean",
              default: "true",
              description: "Show Zoom In/Out buttons.",
            },
            {
              name: "showFit",
              type: "boolean",
              default: "true",
              description: "Show Fit-to-Screen button.",
            },
             {
              name: "showExport",
              type: "boolean",
              default: "true",
              description: "Show Export button.",
            },
            {
              name: "onExport",
              type: "(type: string) => void",
              description: "Callback after export is triggered.",
            },
          ]}
        />
      </DocsSection>
    </DocsLayout>
  );
}
