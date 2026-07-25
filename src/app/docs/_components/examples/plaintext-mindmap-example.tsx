"use client";

import { MindMap, MindMapControls } from "@/registry/mindmap";

// A Mind Elixir plaintext outline. Pass the string straight to `data` —
// the component parses it with `plaintextToMindElixir` internally.
const plaintext = `- Project Planning
  - Phase 1: Research [^phase1]
    - Market Analysis {"color": "#3298db"}
    - Competitor Study {"color": "#3298db"}
    - }:2 Research Summary
  - Phase 2: Development [^phase2]
    - Frontend {"color": "#2ecc71"}
    - Backend {"color": "#2ecc71"}
    - Testing {"color": "#f39c12"}
    - } Development Summary
  - Phase 3: Launch [^phase3]
    - Marketing
    - Deployment
  - > [^phase1] >-Leads to-> [^phase2]
  - > [^phase2] >-Leads to-> [^phase3]`;

export function PlaintextMindMapExample() {
  return (
    <div className="h-[400px] w-full rounded-lg border bg-background overflow-hidden relative">
      <MindMap data={plaintext} readonly>
        <MindMapControls showExport={false} />
      </MindMap>
    </div>
  );
}
