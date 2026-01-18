"use client";

import { MindMap, MindMapControls } from "@/registry/mindmap";
import { ExampleCard } from "./example-card";

const knowledgeGraphData = {
  nodeData: {
    id: "root",
    topic: "Web Development",
    root: true,
    children: [
      {
        id: "frontend",
        topic: "Frontend",
        direction: 0,
        children: [
          {
            id: "html",
            topic: "HTML",
            children: [
              { id: "semantic", topic: "Semantic HTML" },
              { id: "forms", topic: "Forms" },
            ],
          },
          {
            id: "css",
            topic: "CSS",
            children: [
              { id: "flexbox", topic: "Flexbox" },
              { id: "grid", topic: "Grid" },
            ],
          },
          {
            id: "js",
            topic: "JavaScript",
            children: [
              { id: "es6", topic: "ES6+" },
              { id: "async", topic: "Async/Await" },
            ],
          },
        ],
      },
      {
        id: "backend",
        topic: "Backend",
        direction: 1,
        children: [
          {
            id: "nodejs",
            topic: "Node.js",
            children: [
              { id: "express", topic: "Express" },
              { id: "nestjs", topic: "NestJS" },
            ],
          },
          {
            id: "database",
            topic: "Database",
            children: [
              { id: "sql", topic: "SQL" },
              { id: "nosql", topic: "NoSQL" },
            ],
          },
        ],
      },
    ],
  },
};

export function KnowledgeGraph() {
  return (
    <ExampleCard label="Knowledge Graph" className="aspect-square" delay="delay-600">
      <MindMap
        data={knowledgeGraphData}
        direction={1}
        className="h-full"
        monochrome
      >
        <MindMapControls position="top-right" showExport={false} />
      </MindMap>
    </ExampleCard>
  );
}
