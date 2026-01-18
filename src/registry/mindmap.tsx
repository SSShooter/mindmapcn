"use client";

import "mind-elixir/style.css";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Minus, Plus, Download, Maximize2, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { type MindElixirInstance, type NodeObj, type Options, type Theme as MindElixirTheme } from "mind-elixir";

// Check document class for theme (works with next-themes, etc.)
function getDocumentTheme(): Theme | null {
  if (typeof document === "undefined") return null;
  if (document.documentElement.classList.contains("dark")) return "dark";
  if (document.documentElement.classList.contains("light")) return "light";
  return null;
}

// Get system preference
function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function useResolvedTheme(themeProp?: "light" | "dark"): "light" | "dark" {
  const [detectedTheme, setDetectedTheme] = useState<"light" | "dark">(
    () => getDocumentTheme() ?? getSystemTheme(),
  );

  useEffect(() => {
    if (themeProp) return; // Skip detection if theme is provided via prop

    // Watch for document class changes (e.g., next-themes toggling dark class)
    const observer = new MutationObserver(() => {
      const docTheme = getDocumentTheme();
      if (docTheme) {
        setDetectedTheme(docTheme);
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Also watch for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (e: MediaQueryListEvent) => {
      // Only use system preference if no document class is set
      if (!getDocumentTheme()) {
        setDetectedTheme(e.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleSystemChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleSystemChange);
    };
  }, [themeProp]);

  return themeProp ?? detectedTheme;
}

type Theme = "light" | "dark";

// Context for MindMap
interface MindMapContextValue {
  mind: MindElixirInstance | null;
  isLoaded: boolean;
}

const MindMapContext = createContext<MindMapContextValue | null>(null);

export function useMindMap() {
  const context = useContext(MindMapContext);
  if (!context) {
    throw new Error("useMindMap must be used within a MindMap component");
  }
  return context;
}

// MindMap Props
interface MindMapData {
  nodeData: {
    id: string;
    topic: string;
    root?: boolean;
    children?: MindMapData["nodeData"][];
    [key: string]: unknown;
  };
}

interface MindMapProps {
  children?: ReactNode;
  data?: MindMapData;
  className?: string;
  direction?: 0 | 1 | 2;
  draggable?: boolean;
  contextMenu?: boolean;
  toolBar?: boolean;
  nodeMenu?: boolean;
  keypress?: boolean;
  locale?: "en" | "zh_CN" | "zh_TW" | "ja" | "pt";
  overflowHidden?: boolean;
  mainLinkStyle?: number;
  theme?: "dark" | "light";
  monochrome?: boolean;
  fit?: boolean;
  onOperation?: (operation: unknown) => void;
  onSelectNodes?: (nodeObj: NodeObj[]) => void;
  loader?: ReactNode;
}

function DefaultLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Loader2 className="size-8 animate-spin text-muted-foreground" />
    </div>
  );
}

// Common spacing and layout configuration
const commonSpacing = {
  "--node-gap-x": "48px",
  "--node-gap-y": "16px",
  "--main-gap-x": "24px",
  "--main-gap-y": "32px",
  "--root-radius": "0.625rem",
  "--main-radius": "0.5rem",
  "--topic-padding": "8px 16px",
  "--map-padding": "48px",
};

// Helper function to create theme
function createTheme(
  name: string,
  type: "light" | "dark",
  colors: {
    mainColor: string;
    mainBgcolor: string;
    color: string;
    bgcolor: string;
    selected: string;
    accentColor: string;
    rootColor: string;
    rootBgcolor: string;
    rootBorderColor: string;
    panelColor: string;
    panelBgcolor: string;
    panelBorderColor: string;
  },
  palette: string[]
): MindElixirTheme {
  return {
    name,
    type,
    palette,
    cssVar: {
      ...commonSpacing,
      "--main-color": colors.mainColor,
      "--main-bgcolor": colors.mainBgcolor,
      "--main-bgcolor-transparent": `${colors.mainBgcolor.replace(")", " / 95%)")}`,
      "--color": colors.color,
      "--bgcolor": colors.bgcolor,
      "--selected": colors.selected,
      "--accent-color": colors.accentColor,
      "--root-color": colors.rootColor,
      "--root-bgcolor": colors.rootBgcolor,
      "--root-border-color": colors.rootBorderColor,
      "--panel-color": colors.panelColor,
      "--panel-bgcolor": colors.panelBgcolor,
      "--panel-border-color": colors.panelBorderColor,
    },
  };
}

// Shadcn-styled light theme
const lightTheme: MindElixirTheme = createTheme(
  "shadcn-light",
  "light",
  {
    mainColor: "oklch(0.145 0 0)",           // foreground
    mainBgcolor: "oklch(1 0 0)",             // background (white)
    color: "oklch(0.145 0 0)",               // foreground
    bgcolor: "oklch(1 0 0)",                 // card background
    selected: "oklch(0.205 0 0)",            // primary
    accentColor: "oklch(0.646 0.222 41.116)", // chart-1 (vibrant)
    rootColor: "oklch(0.985 0 0)",           // primary-foreground
    rootBgcolor: "oklch(0.205 0 0)",         // primary
    rootBorderColor: "oklch(0.205 0 0)",     // primary
    panelColor: "oklch(0.145 0 0)",          // foreground
    panelBgcolor: "oklch(1 0 0)",            // popover
    panelBorderColor: "oklch(0.922 0 0)",    // border
  },
  [
    "oklch(0.646 0.222 41.116)", // chart-1: vibrant orange
    "oklch(0.6 0.118 184.704)",   // chart-2: teal
    "oklch(0.398 0.07 227.392)",  // chart-3: blue
    "oklch(0.828 0.189 84.429)",  // chart-4: yellow-green
    "oklch(0.769 0.188 70.08)",   // chart-5: warm yellow
    "oklch(0.488 0.243 264.376)", // purple
    "oklch(0.696 0.17 162.48)",   // mint
  ]
);

// Shadcn-styled dark theme
const darkTheme: MindElixirTheme = createTheme(
  "shadcn-dark",
  "dark",
  {
    mainColor: "oklch(0.985 0 0)",           // foreground
    mainBgcolor: "oklch(0.145 0 0)",         // background (dark)
    color: "oklch(0.985 0 0)",               // foreground
    bgcolor: "oklch(0.205 0 0)",             // card background
    selected: "oklch(0.922 0 0)",            // primary
    accentColor: "oklch(0.488 0.243 264.376)", // chart-1 (purple)
    rootColor: "oklch(0.205 0 0)",           // primary-foreground
    rootBgcolor: "oklch(0.922 0 0)",         // primary
    rootBorderColor: "oklch(0.922 0 0)",     // primary
    panelColor: "oklch(0.985 0 0)",          // foreground
    panelBgcolor: "oklch(0.205 0 0)",        // popover
    panelBorderColor: "oklch(1 0 0 / 10%)",  // border
  },
  [
    "oklch(0.488 0.243 264.376)", // chart-1: purple
    "oklch(0.696 0.17 162.48)",   // chart-2: mint
    "oklch(0.769 0.188 70.08)",   // chart-3: warm yellow
    "oklch(0.627 0.265 303.9)",   // chart-4: pink
    "oklch(0.645 0.246 16.439)",  // chart-5: coral
    "oklch(0.646 0.222 41.116)",  // orange
    "oklch(0.6 0.118 184.704)",   // teal
  ]
);

// Monochrome variants
const lightThemeMonochrome: MindElixirTheme = createTheme(
  "shadcn-light-mono",
  "light",
  {
    mainColor: "oklch(0.145 0 0)",
    mainBgcolor: "oklch(1 0 0)",
    color: "oklch(0.145 0 0)",
    bgcolor: "oklch(1 0 0)",
    selected: "oklch(0.205 0 0)",
    accentColor: "oklch(0.205 0 0)",         // primary
    rootColor: "oklch(0.985 0 0)",
    rootBgcolor: "oklch(0.205 0 0)",
    rootBorderColor: "oklch(0.205 0 0)",
    panelColor: "oklch(0.145 0 0)",
    panelBgcolor: "oklch(1 0 0)",
    panelBorderColor: "oklch(0.922 0 0)",
  },
  ["oklch(0.205 0 0)"] // Single primary color
);

const darkThemeMonochrome: MindElixirTheme = createTheme(
  "shadcn-dark-mono",
  "dark",
  {
    mainColor: "oklch(0.985 0 0)",
    mainBgcolor: "oklch(0.145 0 0)",
    color: "oklch(0.985 0 0)",
    bgcolor: "oklch(0.205 0 0)",
    selected: "oklch(0.922 0 0)",
    accentColor: "oklch(0.922 0 0)",         // primary
    rootColor: "oklch(0.205 0 0)",
    rootBgcolor: "oklch(0.922 0 0)",
    rootBorderColor: "oklch(0.922 0 0)",
    panelColor: "oklch(0.985 0 0)",
    panelBgcolor: "oklch(0.205 0 0)",
    panelBorderColor: "oklch(1 0 0 / 10%)",
  },
  ["oklch(0.922 0 0)"] // Single primary color
)

// Helper function to get the appropriate theme
function getTheme(isDark: boolean, isMonochrome: boolean): MindElixirTheme {
  if (isDark) {
    return isMonochrome ? darkThemeMonochrome : darkTheme;
  }
  return isMonochrome ? lightThemeMonochrome : lightTheme;
}

export function MindMap({
  children,
  data,
  className,
  direction = 1, // MindElixir.SIDE
  draggable = true,
  contextMenu = true,
  toolBar = false,
  nodeMenu = true,
  keypress = true,
  locale = "en",
  overflowHidden = false,
  mainLinkStyle = 2,
  theme: themeProp,
  monochrome = false,
  fit = true,
  onOperation,
  onSelectNodes,
  loader,
}: MindMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mindRef = useRef<MindElixirInstance | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mindInstance, setMindInstance] = useState<MindElixirInstance | null>(
    null,
  );
  const [isMounted, setIsMounted] = useState(false);
  const resolvedTheme = useResolvedTheme(themeProp);
  const id = useId();
  
  // Store resolvedTheme in a ref for use in effects without triggering re-runs
  const resolvedThemeRef = useRef(resolvedTheme);
  useEffect(() => {
    resolvedThemeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  // Ensure component only renders on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize MindElixir (client-side only)
  useEffect(() => {
    if (!isMounted || !containerRef.current || mindRef.current) return;

    let isSubscribed = true;

    // Dynamic import to avoid SSR issues
    import("mind-elixir").then((MindElixirModule) => {
      if (!isSubscribed || !containerRef.current) return;

      const MindElixir = MindElixirModule.default;

      const options = {
        el: containerRef.current,
        direction,
        draggable,
        contextMenu,
        toolBar,
        nodeMenu,
        keypress,
        locale,
        overflowHidden,
        mainLinkStyle,
        alignment: "nodes",
        theme:
          getTheme(resolvedThemeRef.current === "dark", monochrome),
      } as Options;

      try {
        const mind = new MindElixir(options);

        // Initialize with data or create new
        const initialData = data || MindElixir.new("Mind Map");
        mind.init(initialData);

        if (isSubscribed) {
          mindRef.current = mind;
          setMindInstance(mind);
          setIsLoaded(true);

          // Auto-fit if enabled
          if (fit) {
            mind.scaleFit();
          }

          // Event listeners
          if (onOperation) {
            mind.bus.addListener("operation", onOperation);
          }
          if (onSelectNodes) {
            mind.bus.addListener("selectNodes", onSelectNodes);
          }
        }
      } catch (error) {
        console.error("Failed to initialize MindElixir:", error);
      }
    });

    return () => {
      isSubscribed = false;
      // Note: We intentionally don't clean up the mind instance here
      // to avoid DOM manipulation conflicts with React
      // The instance will be garbage collected when the component unmounts
      mindRef.current = null;
    };
  }, [
    isMounted,
    direction,
    draggable,
    contextMenu,
    toolBar,
    nodeMenu,
    keypress,
    locale,
    overflowHidden,
    mainLinkStyle,
    monochrome,
    fit,
    data,
    onOperation,
    onSelectNodes,
  ]);

  // Update data when it changes
  useEffect(() => {
    if (mindRef.current && data && isLoaded) {
      mindRef.current.refresh(data);
    }
  }, [data, isLoaded]);

  // Update theme when resolvedTheme or monochrome changes
  useEffect(() => {
    if (!mindRef.current || !isLoaded) return;

    const newTheme = getTheme(resolvedTheme === "dark", monochrome);
    mindRef.current.changeTheme(newTheme, false);
  }, [resolvedTheme, monochrome, isLoaded]);

  return (
    <MindMapContext.Provider value={{ mind: mindInstance, isLoaded }}>
      <div
        key={id}
        ref={containerRef}
        id={`mindmap-${id}`}
        className={cn(
          "relative w-full h-full bg-background rounded-lg overflow-hidden",
          className,
        )}
      ></div>
      {!isMounted || !isLoaded ? loader || <DefaultLoader /> : null}
      {children}
    </MindMapContext.Provider>
  );
}

// MindMap Controls
interface MindMapControlsProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  showZoom?: boolean;
  showFit?: boolean;
  showExport?: boolean;
  className?: string;
  onExport?: (type: "png" | "svg" | "json") => void;
}

export function MindMapControls({
  position = "top-right",
  showZoom = true,
  showFit = true,
  showExport = true,
  className,
  onExport,
}: MindMapControlsProps) {
  const { mind, isLoaded } = useMindMap();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleZoomIn = useCallback(() => {
    if (mind) {
      const currentScale = mind.scaleVal || 1;
      mind.scale(currentScale + 0.2);
    }
  }, [mind]);

  const handleZoomOut = useCallback(() => {
    if (mind) {
      const currentScale = mind.scaleVal || 1;
      mind.scale(Math.max(0.2, currentScale - 0.2));
    }
  }, [mind]);

  const handleFit = useCallback(() => {
    if (mind) {
      mind.scaleFit();
    }
  }, [mind]);

  const handleExport = useCallback(() => {
    if (mind && onExport) {
      // Export as JSON by default
      const data = mind.getData();
      onExport("json");

      // Download JSON
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mindmap.json";
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [mind, onExport]);

  if (!mounted || !isLoaded) return null;

  const positionClasses = {
    "top-left": "top-3 left-3",
    "top-right": "top-3 right-3",
    "bottom-left": "bottom-3 left-3",
    "bottom-right": "bottom-3 right-3",
  };

  return (
    <div
      className={cn(
        "absolute z-10 flex flex-col gap-1",
        positionClasses[position],
        className,
      )}
    >
      {showZoom && (
        <>
          <button
            onClick={handleZoomIn}
            className="size-8 rounded-md bg-background/95 backdrop-blur-md border border-border/50 shadow-lg flex items-center justify-center hover:bg-accent transition-colors"
            aria-label="Zoom in"
          >
            <Plus className="size-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="size-8 rounded-md bg-background/95 backdrop-blur-md border border-border/50 shadow-lg flex items-center justify-center hover:bg-accent transition-colors"
            aria-label="Zoom out"
          >
            <Minus className="size-4" />
          </button>
        </>
      )}
      {showFit && (
        <button
          onClick={handleFit}
          className="size-8 rounded-md bg-background/95 backdrop-blur-md border border-border/50 shadow-lg flex items-center justify-center hover:bg-accent transition-colors"
          aria-label="Fit to screen"
        >
          <Maximize2 className="size-4" />
        </button>
      )}
      {showExport && (
        <button
          onClick={handleExport}
          className="size-8 rounded-md bg-background/95 backdrop-blur-md border border-border/50 shadow-lg flex items-center justify-center hover:bg-accent transition-colors"
          aria-label="Export"
        >
          <Download className="size-4" />
        </button>
      )}
    </div>
  );
}

// Export components
