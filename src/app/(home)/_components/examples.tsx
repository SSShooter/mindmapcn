"use client";

import {
  MindMap,
  MindMapControls,
} from "@/registry/mindmap";
import { cn } from "@/lib/utils";

// Sample mind map data
const organizationalData = {
  nodeData: {
    id: "root",
    topic: "TechCorp Inc.",
    root: true,
    children: [
      {
        id: "ceo",
        topic: "CEO",
        direction: 0,
        children: [
          {
            id: "cto",
            topic: "CTO",
            children: [
              { id: "dev", topic: "Development Team" },
              { id: "qa", topic: "QA Team" },
            ],
          },
          {
            id: "cfo",
            topic: "CFO",
            children: [
              { id: "accounting", topic: "Accounting" },
              { id: "finance", topic: "Finance" },
            ],
          },
        ],
      },
      {
        id: "coo",
        topic: "COO",
        direction: 1,
        children: [
          {
            id: "hr",
            topic: "HR",
            children: [
              { id: "recruiting", topic: "Recruiting" },
              { id: "training", topic: "Training" },
            ],
          },
          {
            id: "ops",
            topic: "Operations",
            children: [
              { id: "logistics", topic: "Logistics" },
              { id: "support", topic: "Support" },
            ],
          },
        ],
      },
    ],
  },
};

const projectPlanningData = {
  nodeData: {
    id: "root",
    topic: "Website Redesign",
    root: true,
    children: [
      {
        id: "research",
        topic: "Research",
        direction: 0,
        children: [
          { id: "user-research", topic: "User Research", tags: ["Week 1"] },
          { id: "competitor", topic: "Competitor Analysis", tags: ["Week 1"] },
        ],
      },
      {
        id: "design",
        topic: "Design",
        direction: 0,
        children: [
          { id: "wireframes", topic: "Wireframes", tags: ["Week 2"] },
          { id: "mockups", topic: "Mockups", tags: ["Week 3"] },
          { id: "prototype", topic: "Prototype", tags: ["Week 4"] },
        ],
      },
      {
        id: "development",
        topic: "Development",
        direction: 1,
        children: [
          { id: "frontend", topic: "Frontend", tags: ["Week 5-6"] },
          { id: "backend", topic: "Backend", tags: ["Week 5-6"] },
          { id: "testing", topic: "Testing", tags: ["Week 7"] },
        ],
      },
      {
        id: "launch",
        topic: "Launch",
        direction: 1,
        children: [
          { id: "deployment", topic: "Deployment", tags: ["Week 8"] },
          { id: "monitoring", topic: "Monitoring", tags: ["Ongoing"] },
        ],
      },
    ],
  },
};

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

const brainstormingData = {
  nodeData: {
    id: "root",
    topic: "Mobile App Ideas",
    root: true,
    children: [
      {
        id: "productivity",
        topic: "Productivity",
        direction: 0,
        children: [
          { id: "task-manager", topic: "Smart Task Manager", icons: ["📝"] },
          { id: "time-tracker", topic: "Time Tracker", icons: ["⏱️"] },
          { id: "habit", topic: "Habit Builder", icons: ["🎯"] },
        ],
      },
      {
        id: "social",
        topic: "Social",
        direction: 0,
        children: [
          { id: "community", topic: "Community Platform", icons: ["👥"] },
          { id: "events", topic: "Event Finder", icons: ["🎉"] },
        ],
      },
      {
        id: "health",
        topic: "Health & Fitness",
        direction: 1,
        children: [
          { id: "workout", topic: "Workout Planner", icons: ["💪"] },
          { id: "nutrition", topic: "Nutrition Tracker", icons: ["🥗"] },
          { id: "meditation", topic: "Meditation Guide", icons: ["🧘"] },
        ],
      },
      {
        id: "education",
        topic: "Education",
        direction: 1,
        children: [
          { id: "language", topic: "Language Learning", icons: ["🗣️"] },
          { id: "coding", topic: "Coding Tutorials", icons: ["💻"] },
        ],
      },
    ],
  },
};

const decisionTreeData = {
  nodeData: {
    id: "root",
    topic: "Choose Tech Stack",
    root: true,
    children: [
      {
        id: "type",
        topic: "Project Type?",
        direction: 0,
        children: [
          {
            id: "web-app",
            topic: "Web App",
            children: [
              {
                id: "react",
                topic: "React + Next.js",
                style: { background: "#10b981", color: "#fff" },
              },
              {
                id: "vue",
                topic: "Vue + Nuxt",
                style: { background: "#10b981", color: "#fff" },
              },
            ],
          },
          {
            id: "mobile",
            topic: "Mobile App",
            children: [
              {
                id: "rn",
                topic: "React Native",
                style: { background: "#10b981", color: "#fff" },
              },
              {
                id: "flutter",
                topic: "Flutter",
                style: { background: "#10b981", color: "#fff" },
              },
            ],
          },
        ],
      },
      {
        id: "scale",
        topic: "Scale?",
        direction: 1,
        children: [
          {
            id: "small",
            topic: "Small/MVP",
            children: [
              {
                id: "serverless",
                topic: "Serverless",
                style: { background: "#3b82f6", color: "#fff" },
              },
            ],
          },
          {
            id: "large",
            topic: "Large/Enterprise",
            children: [
              {
                id: "microservices",
                topic: "Microservices",
                style: { background: "#3b82f6", color: "#fff" },
              },
            ],
          },
        ],
      },
    ],
  },
};

function ExampleCard({
  label,
  className,
  delay = "delay-500",
  children,
}: {
  label: string;
  className?: string;
  delay?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden border border-border/50 shadow bg-card relative animate-scale-in",
        delay,
        className
      )}
    >
      {label && (
        <div className="uppercase absolute top-2 left-2 z-10 tracking-wider text-[10px] text-muted-foreground bg-background/90 backdrop-blur-sm rounded px-2 py-1">
          {label}
        </div>
      )}
      {children}
    </div>
  );
}

export function Examples() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in delay-400">
      {/* Widget 1: Organizational Chart */}
      <ExampleCard
        label="Organizational Chart"
        className="aspect-square sm:col-span-2 sm:aspect-video lg:aspect-auto lg:h-[330px]"
        delay="delay-400"
      >
        <MindMap
          data={organizationalData}
          direction={1}
          className="h-full"
        >
          <MindMapControls position="top-right" />
        </MindMap>
      </ExampleCard>

      {/* Widget 2: Project Planning */}
      <ExampleCard label="Project Planning" className="aspect-square" delay="delay-500">
        <MindMap
          data={projectPlanningData}
          direction={1}
          className="h-full"
        >
          <MindMapControls position="top-right" showExport={false} />
        </MindMap>
      </ExampleCard>

      {/* Widget 3: Knowledge Graph */}
      <ExampleCard label="Knowledge Graph" className="aspect-square" delay="delay-600">
        <MindMap
          data={knowledgeGraphData}
          direction={1}
          className="h-full"
        >
          <MindMapControls position="top-right" showExport={false} />
        </MindMap>
      </ExampleCard>

      {/* Widget 4: Brainstorming */}
      <ExampleCard
        label="Brainstorming"
        className="aspect-square"
        delay="delay-700"
      >
        <MindMap
          data={brainstormingData}
          direction={1}
          className="h-full"
        >
          <MindMapControls position="top-right" showExport={false} />
        </MindMap>
      </ExampleCard>

      {/* Widget 5: Decision Tree */}
      <ExampleCard
        label="Decision Tree"
        className="aspect-square"
        delay="delay-800"
      >
        <MindMap
          data={decisionTreeData}
          direction={1}
          className="h-full"
        >
          <MindMapControls position="top-right" showExport={false} />
        </MindMap>
      </ExampleCard>
    </div>
  );
}
