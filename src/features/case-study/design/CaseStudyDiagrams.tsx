import type { CSSProperties } from "react";

import type { CaseStudySectionData, PipelineStep } from "@/content/case-studies";
import { inkStroke } from "@/shared/drawn-layer/ink-stroke";
import { ResponsiveCopy } from "@/shared/responsive-copy";

const paused = (animation: string): CSSProperties => ({ animation, animationPlayState: "paused" });

function splitLabel(title: string, maxChars: number) {
  const words = title.split(" ");
  if (title.length <= maxChars || words.length < 2) return [title];
  let best = [title];
  let bestWidth = Infinity;
  for (let at = 1; at < words.length; at++) {
    const lines = [words.slice(0, at).join(" "), words.slice(at).join(" ")];
    const width = Math.max(...lines.map((line) => line.length));
    if (width < bestWidth) {
      best = lines;
      bestWidth = width;
    }
  }
  return best;
}

type Shape = NonNullable<PipelineStep["shape"]> | "box";
type Node = { cx: number; cy: number; w: number; h: number; shape: Shape };

const STORE_RY = 9;
const LINE_HEIGHT = 21;

function shapePaths({ cx, cy, w, h, shape }: Node) {
  const x0 = cx - w / 2;
  const x1 = cx + w / 2;
  const y0 = cy - h / 2;
  const y1 = cy + h / 2;
  if (shape === "store") {
    const rx = w / 2;
    return {
      outline: `M${x0} ${y0 + STORE_RY} A${rx} ${STORE_RY} 0 0 1 ${x1} ${y0 + STORE_RY} L${x1} ${y1 - STORE_RY} A${rx} ${STORE_RY} 0 0 1 ${x0} ${y1 - STORE_RY} Z`,
      lip: `M${x0} ${y0 + STORE_RY} A${rx} ${STORE_RY} 0 0 0 ${x1} ${y0 + STORE_RY}`,
      length: Math.ceil(2 * (h - 2 * STORE_RY) + Math.PI * w),
    };
  }
  if (shape === "process") {
    const r = 10;
    return {
      outline: `M${x0 + r} ${y0} L${x1 - r} ${y0} Q${x1} ${y0} ${x1} ${y0 + r} L${x1} ${y1 - r} Q${x1} ${y1} ${x1 - r} ${y1} L${x0 + r} ${y1} Q${x0} ${y1} ${x0} ${y1 - r} L${x0} ${y0 + r} Q${x0} ${y0} ${x0 + r} ${y0} Z`,
      length: Math.ceil(2 * (w + h)),
    };
  }
  return {
    outline: `M${x0} ${y0} L${x1} ${y0} L${x1} ${y1} L${x0} ${y1} Z`,
    length: Math.ceil(2 * (w + h)),
  };
}

/** Arrow from one node to the next: leaves a gap at both ends so heads never touch a shape. */
function arrowPath(from: Node, to: Node) {
  const gap = 8;
  const head = 10;
  const spread = 6;
  if (from.cy === to.cy) {
    const dir = Math.sign(to.cx - from.cx);
    const start = from.cx + (dir * from.w) / 2 + dir * gap;
    const tip = to.cx - (dir * to.w) / 2 - dir * gap;
    const back = tip - dir * head;
    return {
      d: `M${start} ${from.cy} L${tip} ${to.cy} M${back} ${to.cy - spread} L${tip} ${to.cy} L${back} ${to.cy + spread}`,
      length: Math.ceil(Math.abs(tip - start) + 2 * head + 8),
    };
  }
  const dir = Math.sign(to.cy - from.cy);
  const start = from.cy + (dir * from.h) / 2 + dir * gap;
  const tip = to.cy - (dir * to.h) / 2 - dir * gap;
  const back = tip - dir * head;
  return {
    d: `M${from.cx} ${start} L${to.cx} ${tip} M${to.cx - spread} ${back} L${to.cx} ${tip} L${to.cx + spread} ${back}`,
    length: Math.ceil(Math.abs(tip - start) + 2 * head + 8),
  };
}

function PipelineMarks({
  nodes,
  steps,
  maxChars,
  shapeWidth,
  arrowWidth,
  textClass,
}: {
  nodes: Node[];
  steps: readonly PipelineStep[];
  maxChars: number;
  shapeWidth: number;
  arrowWidth: number;
  textClass: string;
}) {
  return (
    <>
      <g
        className="ink"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {nodes.map((node, index) => {
          const { outline, lip, length } = shapePaths(node);
          const delay = index * 0.3;
          return (
            <g key={index}>
              <path
                d={outline}
                strokeDasharray={length}
                strokeDashoffset={length}
                data-anim=""
                style={{
                  ...paused(`dw .8s ${delay}s cubic-bezier(.33,1,.68,1) forwards`),
                  strokeWidth: inkStroke(shapeWidth),
                }}
              />
              {lip ? (
                <path
                  d={lip}
                  strokeDasharray={node.w * 2}
                  strokeDashoffset={node.w * 2}
                  data-anim=""
                  style={{
                    ...paused(`dw .5s ${delay + 0.6}s ease forwards`),
                    strokeWidth: inkStroke(shapeWidth - 0.2),
                  }}
                />
              ) : null}
            </g>
          );
        })}
        {nodes.slice(1).map((node, index) => {
          const previousNode = nodes[index];
          if (!previousNode) throw new Error("Pipeline arrow is missing its preceding node.");
          const { d, length } = arrowPath(previousNode, node);
          return (
            <path
              key={index}
              d={d}
              strokeDasharray={length}
              strokeDashoffset={length}
              data-anim=""
              style={{
                ...paused(`dw .35s ${index * 0.3 + 0.55}s ease forwards`),
                strokeWidth: inkStroke(arrowWidth),
              }}
            />
          );
        })}
      </g>
      <g
        className={`font-hand fill-current ${textClass}`}
        data-anim=""
        style={{ ...paused("fi .7s .9s ease forwards"), opacity: 0 }}
      >
        {steps.map((step, index) => {
          const node = nodes[index];
          if (!node) throw new Error(`Pipeline step ${index + 1} is missing its drawing node.`);
          const lines = splitLabel(step.title, maxChars);
          // A cylinder's face sits below its top ellipse, so centre on the face.
          const centre = node.cy + (node.shape === "store" ? STORE_RY / 2 : 0);
          const first = centre - ((lines.length - 1) * LINE_HEIGHT) / 2;
          return (
            <text key={step.title} textAnchor="middle" dominantBaseline="central">
              {lines.map((line, lineIndex) => (
                <tspan key={line} x={node.cx} y={first + lineIndex * LINE_HEIGHT}>
                  {line}
                </tspan>
              ))}
            </text>
          );
        })}
      </g>
    </>
  );
}

export function AmendmentDiagram({
  diagram,
}: {
  diagram: NonNullable<CaseStudySectionData["amendmentDiagram"]>;
}) {
  return (
    <figure className="mt-7">
      <div className="border-signature border-ink bg-paper-light tablet:p-[26px] p-3">
        <svg width="100%" viewBox="0 0 300 330" className="tablet:hidden block" role="img">
          <title>{diagram.label}</title>
          <g
            className="ink"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M14 38 L94 38 L94 148 L14 148 Z"
              strokeDasharray="540"
              strokeDashoffset="540"
              data-anim=""
              style={{
                ...paused("dw .85s cubic-bezier(.33,1,.68,1) forwards"),
                strokeWidth: inkStroke(1.7),
              }}
            />
            <path
              d="M110 52 L190 52 L190 162 L110 162 Z"
              strokeDasharray="540"
              strokeDashoffset="540"
              data-anim=""
              style={{
                ...paused("dw .85s .24s cubic-bezier(.33,1,.68,1) forwards"),
                strokeWidth: inkStroke(1.7),
              }}
            />
            <path
              d="M206 66 L286 66 L286 176 L206 176 Z"
              strokeDasharray="540"
              strokeDashoffset="540"
              data-anim=""
              style={{
                ...paused("dw .85s .48s cubic-bezier(.33,1,.68,1) forwards"),
                strokeWidth: inkStroke(1.7),
              }}
            />
            <path
              d="M28 72 L80 72 M28 92 L80 92 M28 112 L62 112"
              strokeDasharray="220"
              strokeDashoffset="220"
              data-anim=""
              style={{ ...paused("dw .7s 1.05s ease forwards"), strokeWidth: inkStroke(1.3) }}
            />
            <path
              d="M124 86 L176 86 M124 106 L176 106"
              strokeDasharray="160"
              strokeDashoffset="160"
              data-anim=""
              style={{ ...paused("dw .6s 1.2s ease forwards"), strokeWidth: inkStroke(1.3) }}
            />
            <path
              d="M46 246 C46 230, 66 218, 96 218 L204 218 C234 218, 254 230, 254 246 C254 262, 234 274, 204 274 L96 274 C66 274, 46 262, 46 246 Z"
              strokeDasharray="700"
              strokeDashoffset="700"
              data-anim=""
              style={{
                ...paused("dw 1.2s 1.1s cubic-bezier(.33,1,.68,1) forwards"),
                strokeWidth: inkStroke(1.8),
              }}
            />
            <path
              d="M150 170 L150 210 M144 200 L150 210 L156 200"
              strokeDasharray="60"
              strokeDashoffset="60"
              data-anim=""
              style={{ ...paused("dw .3s 2.1s ease forwards"), strokeWidth: inkStroke(1.6) }}
            />
            <path
              d="M262 228 L276 216 M266 246 L284 246 M262 264 L276 276"
              strokeDasharray="80"
              strokeDashoffset="80"
              data-anim=""
              style={{ ...paused("dw .4s 2.3s ease forwards"), strokeWidth: inkStroke(1.5) }}
            />
          </g>
          <g
            className="font-hand fill-current text-[16px]"
            data-anim=""
            style={{ ...paused("fi .7s 1.2s ease forwards"), opacity: 0 }}
          >
            <text x="54" y="30" textAnchor="middle">
              10-K
            </text>
            <text x="150" y="44" textAnchor="middle">
              10-K/A
            </text>
            <text x="246" y="58" textAnchor="middle">
              10-K/A #2
            </text>
            <text x="150" y="246" textAnchor="middle" dominantBaseline="central">
              which one is true?
            </text>
            <text x="150" y="312" textAnchor="middle" className="fill-copy-muted text-[15px]">
              supersedes parts, not wholes
            </text>
          </g>
        </svg>
        <svg
          width="100%"
          height="280"
          viewBox="0 0 800 280"
          className="tablet:block hidden"
          role="img"
        >
          <title>{diagram.label}</title>
          <g
            className="ink"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M36 50 L152 50 L152 220 L36 220 Z"
              strokeDasharray="580"
              strokeDashoffset="580"
              data-anim=""
              style={{
                ...paused("dw .9s cubic-bezier(.33,1,.68,1) forwards"),
                strokeWidth: inkStroke(1.8),
              }}
            />
            <path
              d="M188 68 L304 68 L304 238 L188 238 Z"
              strokeDasharray="580"
              strokeDashoffset="580"
              data-anim=""
              style={{
                ...paused("dw .9s .26s cubic-bezier(.33,1,.68,1) forwards"),
                strokeWidth: inkStroke(1.8),
              }}
            />
            <path
              d="M340 86 L456 86 L456 256 L340 256 Z"
              strokeDasharray="580"
              strokeDashoffset="580"
              data-anim=""
              style={{
                ...paused("dw .9s .52s cubic-bezier(.33,1,.68,1) forwards"),
                strokeWidth: inkStroke(1.8),
              }}
            />
            <path
              d="M56 96 L132 96 M56 120 L132 120 M56 144 L106 144"
              strokeDasharray="210"
              strokeDashoffset="210"
              data-anim=""
              style={{ ...paused("dw .7s .7s ease forwards"), strokeWidth: inkStroke(1.4) }}
            />
            <path
              d="M208 114 L284 114 M208 138 L284 138"
              strokeDasharray="160"
              strokeDashoffset="160"
              data-anim=""
              style={{ ...paused("dw .6s .95s ease forwards"), strokeWidth: inkStroke(1.4) }}
            />
            <path
              d="M528 152 C528 122, 556 100, 596 100 L680 100 C720 100, 748 124, 748 154 C748 184, 720 206, 680 206 L596 206 C556 206, 528 182, 528 152 Z"
              strokeDasharray="700"
              strokeDashoffset="700"
              data-anim=""
              style={{
                ...paused("dw 1.3s .9s cubic-bezier(.33,1,.68,1) forwards"),
                strokeWidth: inkStroke(1.8),
              }}
            />
            <path
              d="M466 156 L520 152"
              strokeDasharray="56"
              strokeDashoffset="56"
              data-anim=""
              style={{ ...paused("dw .3s 1.8s ease forwards"), strokeWidth: inkStroke(1.6) }}
            />
            <path
              d="M510 145 L521 152 L510 159"
              strokeDasharray="28"
              strokeDashoffset="28"
              data-anim=""
              style={{ ...paused("dw .18s 2.1s ease forwards"), strokeWidth: inkStroke(1.6) }}
            />
            <path
              d="M96 226 C118 250, 208 256, 268 248"
              strokeDasharray="200"
              strokeDashoffset="200"
              data-anim=""
              style={{
                ...paused("dw .7s 2.2s cubic-bezier(.33,1,.68,1) forwards"),
                strokeWidth: inkStroke(1.5),
              }}
            />
            <path
              d="M258 241 L270 248 L259 256"
              strokeDasharray="28"
              strokeDashoffset="28"
              data-anim=""
              style={{ ...paused("dw .18s 2.85s ease forwards"), strokeWidth: inkStroke(1.5) }}
            />
            <path
              d="M760 132 L774 118 M766 148 L786 148 M760 172 L774 186"
              strokeDasharray="80"
              strokeDashoffset="80"
              data-anim=""
              style={{ ...paused("dw .4s 2.4s ease forwards"), strokeWidth: inkStroke(1.5) }}
            />
          </g>
          <g
            className="font-hand fill-current text-[17px]"
            data-anim=""
            style={{ ...paused("fi .7s 1.3s ease forwards"), opacity: 0 }}
          >
            <text x="94" y="40" textAnchor="middle">
              10-K
            </text>
            <text x="246" y="58" textAnchor="middle">
              10-K/A
            </text>
            <text x="398" y="76" textAnchor="middle">
              10-K/A #2
            </text>
            <text x="638" textAnchor="middle" dominantBaseline="central">
              <tspan x="638" y="142">
                which one
              </tspan>
              <tspan x="638" y="164">
                is true?
              </tspan>
            </text>
            <text x="182" y="274" textAnchor="middle" className="fill-copy-muted text-[16px]">
              supersedes parts, not wholes
            </text>
          </g>
        </svg>
      </div>
      <figcaption className="border-ink text-muted layout:text-[0.59375rem] mt-2.5 flex justify-between border-t pt-1.5 font-mono text-[0.5625rem] tracking-[0.16em]">
        <span>FIG. 1</span>
        <span className="text-copy-muted">{diagram.caption}</span>
      </figcaption>
    </figure>
  );
}

const shapeOf = (step: PipelineStep): Shape => step.shape ?? "box";
const heightOf = (shape: Shape, base: number) => (shape === "store" ? base + 18 : base);

// Mobile: one column, top to bottom.
function mobileLayout(steps: readonly PipelineStep[]) {
  let y = 14;
  const nodes = steps.map((step) => {
    const shape = shapeOf(step);
    const h = heightOf(shape, 50);
    const node = { cx: 150, cy: y + h / 2, w: 256, h, shape };
    y += h + 32;
    return node;
  });
  return { nodes, height: y - 32 + 14 };
}

// Desktop: three across, down on the right, then back right to left.
const DESKTOP_COLUMNS = [118, 400, 682] as const;
const DESKTOP_ROWS = [64, 204] as const;

function desktopLayout(steps: readonly PipelineStep[]) {
  const nodes = steps.map((step, index) => {
    const shape = shapeOf(step);
    const row = index < 3 ? 0 : 1;
    const column = row === 0 ? index : 5 - index;
    const cx = DESKTOP_COLUMNS[column];
    if (cx === undefined) throw new Error("Desktop pipeline layouts support at most six steps.");
    return {
      cx,
      cy: DESKTOP_ROWS[row],
      w: 176,
      h: heightOf(shape, 58),
      shape,
    };
  });
  return { nodes, height: 278 };
}

export function PipelineDiagram({
  pipeline,
}: {
  pipeline: NonNullable<CaseStudySectionData["pipeline"]>;
}) {
  const mobile = mobileLayout(pipeline.steps);
  const desktop = desktopLayout(pipeline.steps);
  const desc = pipeline.steps.map((step) => `${step.title}: ${step.detail}`).join(". ");

  return (
    <figure className="mt-7">
      <div className="border-signature border-ink bg-paper-light tablet:p-[26px] p-3">
        <svg
          width="100%"
          viewBox={`0 0 300 ${mobile.height}`}
          className="tablet:hidden block"
          role="img"
        >
          <title>{pipeline.caption}</title>
          <desc>{desc}</desc>
          <PipelineMarks
            nodes={mobile.nodes}
            steps={pipeline.steps}
            maxChars={Infinity}
            shapeWidth={1.7}
            arrowWidth={1.6}
            textClass="text-[16px]"
          />
        </svg>
        <svg
          width="100%"
          viewBox={`0 0 800 ${desktop.height}`}
          className="tablet:block hidden"
          role="img"
        >
          <title>{pipeline.caption}</title>
          <desc>{desc}</desc>
          <PipelineMarks
            nodes={desktop.nodes}
            steps={pipeline.steps}
            maxChars={15}
            shapeWidth={1.8}
            arrowWidth={1.7}
            textClass="text-[17px]"
          />
        </svg>
      </div>
      <figcaption className="border-ink text-muted layout:text-[0.59375rem] mt-2.5 flex justify-between border-t pt-1.5 font-mono text-[0.5625rem] tracking-[0.16em]">
        <span>FIG. {pipeline.figureNumber}</span>
        <ResponsiveCopy
          long={pipeline.caption}
          short={pipeline.captionShort}
          className="text-copy-muted"
        />
      </figcaption>
    </figure>
  );
}
