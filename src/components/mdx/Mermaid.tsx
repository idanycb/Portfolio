"use client";

import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";
import { IoAdd, IoClose, IoExpand, IoRefresh, IoRemove } from "react-icons/io5";
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

interface Props {
  chart: string;
}

// Mermaid SVGs have width="100%" + style="max-width:Npx" + a viewBox.
// The max-width is the true rendered pixel width; viewBox gives the aspect ratio.
function parseSvgNaturalSize(svg: string): { width: number; height: number } {
  const mwMatch = svg.match(/max-width:\s*([\d.]+)px/);
  const vbMatch = svg.match(/viewBox="([^"]*)"/);

  if (vbMatch) {
    const parts = vbMatch[1].trim().split(/\s+/);
    if (parts.length === 4) {
      const vbW = parseFloat(parts[2]);
      const vbH = parseFloat(parts[3]);
      const w = mwMatch ? parseFloat(mwMatch[1]) : vbW;
      return { width: w, height: (w / vbW) * vbH };
    }
  }
  const w = mwMatch ? parseFloat(mwMatch[1]) : 800;
  return { width: w, height: 400 };
}

function normalizeSvgForContain(svg: string): string {
  return svg.replace(/<svg\b([^>]*)>/, (_match, attrs: string) => {
    let next = attrs
      .replace(/\swidth="[^"]*"/, "")
      .replace(/\sheight="[^"]*"/, "")
      .replace(/\sstyle="[^"]*"/, "");
    next += ` width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style="max-width:none;max-height:none;display:block;"`;
    return `<svg${next}>`;
  });
}

export function Mermaid({ chart }: Props) {
  const [svgCode, setSvgCode] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayScale, setDisplayScale] = useState(100);
  const [fitScale, setFitScale] = useState(1);
  const transformRef = useRef<ReactZoomPanPinchRef>(null);
  const naturalSize = parseSvgNaturalSize(svgCode);
  const previewSvgCode = normalizeSvgForContain(svgCode);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      fontFamily: "inherit",
      theme: "base",
      themeVariables: {
        primaryColor: "#312e81",
        primaryTextColor: "#e2e8f0",
        primaryBorderColor: "#6366f1",
        lineColor: "#64748b",
        secondaryColor: "#1e1b4b",
        tertiaryColor: "#0f172a",
        background: "#0f172a",
        mainBkg: "#1e293b",
        clusterBkg: "#1e1b4b",
        clusterBorder: "#4f46e5",
        titleColor: "#e2e8f0",
        edgeLabelBackground: "#1e293b",
        nodeTextColor: "#e2e8f0",
        attributeBackgroundColorEven: "#1e293b",
        attributeBackgroundColorOdd: "#0f172a",
      },
    });

    const renderChart = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        setSvgCode(svg);
      } catch (error) {
        console.error("Mermaid parsing error", error);
      }
    };

    if (chart) renderChart();
  }, [chart]);

  const openModal = () => {
    const { width, height } = parseSvgNaturalSize(svgCode);
    const computed = Math.min(
      (window.innerWidth * 0.85) / width,
      (window.innerHeight * 0.85) / height,
    );
    setFitScale(computed);
    setDisplayScale(Math.round(computed * 100));
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  if (!svgCode) {
    return (
      <div className="my-12 flex min-h-48 w-full items-center justify-center rounded-2xl border border-indigo-900/30 bg-slate-900/60 p-8">
        <span className="animate-pulse text-slate-500">Loading diagram…</span>
      </div>
    );
  }

  return (
    <>
      {/* Preview card */}
      <button
        onClick={openModal}
        className="group mermaid relative my-12 flex min-h-48 w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-2xl border border-indigo-900/40 bg-linear-to-br from-slate-900 via-slate-900 to-indigo-950/40 p-8 shadow-lg shadow-black/30 transition-all duration-200 hover:border-indigo-600/50 hover:shadow-indigo-950/40 hover:shadow-xl md:min-h-72 lg:min-h-96"
      >
        <span className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-800/90 px-2.5 py-1.5 text-xs text-slate-400 opacity-0 backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100">
          <IoExpand size={11} />
          Click to expand
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <span className="relative block h-full w-full" dangerouslySetInnerHTML={{ __html: previewSvgCode }} />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md" onClick={closeModal}>
          {/* Toolbar */}
          <div
            className="absolute right-4 top-4 z-10 flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => transformRef.current?.zoomIn()}
              title="Zoom in"
              className="rounded-lg border border-slate-700 bg-slate-800/95 p-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            >
              <IoAdd size={17} />
            </button>
            <button
              onClick={() => transformRef.current?.zoomOut()}
              title="Zoom out"
              className="rounded-lg border border-slate-700 bg-slate-800/95 p-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            >
              <IoRemove size={17} />
            </button>
            <button
              onClick={() => transformRef.current?.resetTransform()}
              title="Reset view"
              className="rounded-lg border border-slate-700 bg-slate-800/95 p-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            >
              <IoRefresh size={17} />
            </button>
            <div className="mx-1 h-6 w-px bg-slate-700" />
            <button
              onClick={closeModal}
              title="Close (Esc)"
              className="rounded-lg border border-slate-700 bg-slate-800/95 p-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            >
              <IoClose size={17} />
            </button>
          </div>

          {/* Zoom pill */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-slate-700/60 bg-slate-800/90 px-3 py-1 text-xs tabular-nums text-slate-400 backdrop-blur-sm">
            {displayScale}%
          </div>

          <div className="pointer-events-none absolute bottom-4 right-4 z-10 hidden text-xs text-slate-600 md:block">
            Scroll to zoom · Drag to pan
          </div>

          {/* Canvas */}
          <div className="h-full w-full" onClick={(e) => e.stopPropagation()}>
            <TransformWrapper
              ref={transformRef}
              initialScale={fitScale}
              minScale={0.05}
              maxScale={12}
              centerOnInit
              limitToBounds={false}
              onTransform={(_ref, state) =>
                setDisplayScale(Math.round(state.scale * 100))
              }
            >
              <TransformComponent
                wrapperStyle={{ width: "100%", height: "100vh" }}
              >
                {/* Explicit pixel width so SVG's width="100%" resolves correctly */}
                <div
                  style={{ width: naturalSize.width }}
                  dangerouslySetInnerHTML={{ __html: svgCode }}
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
        </div>
      )}
    </>
  );
}
