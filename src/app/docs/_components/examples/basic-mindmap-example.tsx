"use client";

import { MindMap, MindMapControls } from "@/registry/mindmap";
import type { MindElixirData } from "mind-elixir";

const initialData: MindElixirData = {
  nodeData: {
    id: "root",
    topic: "Mind Map",
    children: [
      {
        id: "sub1",
        topic: "Subtopic 1",
      },
      {
        id: "sub2",
        topic: "Subtopic 2",
      },
    ],
  },
};

export function BasicMindMapExample() {
  return (
    <div className="h-[500px] w-full rounded-lg border bg-background overflow-hidden relative">
      <MindMap data={initialData}>
        <MindMapControls />
      </MindMap>
    </div>
  );
}
