import { inkStroke } from "@/shared/drawn-layer/ink-stroke";
import type { CSSProperties, ReactNode } from "react";

type SvgProps = { className?: string };

const paused = (animation: string): CSSProperties => ({ animation, animationPlayState: "paused" });

export function ContactNavCircle({ className }: SvgProps) {
  return (
    <svg width="106" height="40" viewBox="0 0 106 40" className={className} aria-hidden="true">
      <path
        className="ink"
        d="M30 5 C68 2, 98 10, 99 20 C100 31, 60 36, 30 34 C10 32, 4 23, 8 15 C12 8, 26 5, 40 5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeDasharray="300"
        strokeDashoffset="300"
        style={{
          animation: "dw 1.1s 1.1s cubic-bezier(.33,1,.68,1) forwards",
          strokeWidth: inkStroke(1.6),
        }}
      />
    </svg>
  );
}

export function HeroStartArrow() {
  return (
    <>
      <svg
        width="46"
        height="40"
        viewBox="0 0 46 40"
        className="layout:hidden overflow-visible"
        aria-hidden="true"
      >
        <g
          className="ink"
          fill="none"
          stroke="currentColor"
          style={{ strokeWidth: inkStroke(1.7) }}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M42 28 C28 28, 14 22, 12 6"
            strokeDasharray="60"
            strokeDashoffset="60"
            style={{ animation: "dw .7s 1.1s cubic-bezier(.33,1,.68,1) forwards" }}
          />
          <path
            d="M5 16 C7 11, 10 8, 12 5 C15 9, 18 13, 22 17"
            strokeDasharray="44"
            strokeDashoffset="44"
            style={{ animation: "dw .3s 1.75s ease forwards" }}
          />
        </g>
      </svg>
      <svg
        width="64"
        height="58"
        viewBox="0 0 64 58"
        className="layout:block hidden"
        aria-hidden="true"
      >
        <g
          className="ink"
          fill="none"
          stroke="currentColor"
          style={{ strokeWidth: inkStroke(1.7) }}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M58 36 C40 36, 24 28, 22 8"
            strokeDasharray="70"
            strokeDashoffset="70"
            style={{ animation: "dw .8s 1.5s cubic-bezier(.33,1,.68,1) forwards" }}
          />
          <path
            d="M12 20 C15 15, 19 10, 22 6 C25 11, 28 16, 32 21"
            strokeDasharray="46"
            strokeDashoffset="46"
            style={{ animation: "dw .35s 2.25s ease forwards" }}
          />
        </g>
      </svg>
    </>
  );
}

export function PortraitNoteArrow({ className }: SvgProps) {
  return (
    <svg width="118" height="72" viewBox="0 0 118 72" className={className} aria-hidden="true">
      <g
        className="ink"
        fill="none"
        stroke="currentColor"
        style={{ strokeWidth: inkStroke(1.7) }}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M30 18 C62 26, 88 42, 100 64"
          strokeDasharray="130"
          strokeDashoffset="130"
          style={{ animation: "dw .9s 1.4s cubic-bezier(.33,1,.68,1) forwards" }}
        />
        <path
          d="M103.2 45.2 C100.6 54, 99.5 59.6, 100 64 C94.8 61.5, 89.5 58.9, 83.4 56.9"
          strokeDasharray="60"
          strokeDashoffset="60"
          style={{ animation: "dw .4s 2.2s ease forwards" }}
        />
      </g>
    </svg>
  );
}

/* The portrait frame is square (the lower 80% of the 4:5 photo box) and is
   split in two: the top edge sits behind the photo so the head breaks out of
   it, the sides and bottom sit in front so the frame still reads as closed. */
const frameStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  vectorEffect: "non-scaling-stroke",
  // Non-scaling strokes measure dashes in screen pixels, so pathLength can't
  // normalise them; 400 comfortably exceeds any edge at the widest layout.
  strokeDasharray: 400,
  strokeDashoffset: 400,
} as const;

export function PortraitFrameBack({ className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      overflow="visible"
      style={{ strokeWidth: inkStroke(1.6) }}
      aria-hidden="true"
    >
      <path
        className="ink"
        d="M-7 2 C40 0.5, 120 3.5, 207 1"
        {...frameStroke}
        style={{ animation: "dw .7s .2s cubic-bezier(.33,1,.68,1) forwards" }}
      />
    </svg>
  );
}

export function PortraitFrameFront({ className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      overflow="visible"
      style={{ strokeWidth: inkStroke(1.6) }}
      aria-hidden="true"
    >
      <g className="ink">
        <path
          d="M198.5 -5 C200.5 70, 197 150, 199 207"
          {...frameStroke}
          style={{ animation: "dw .6s .7s cubic-bezier(.33,1,.68,1) forwards" }}
        />
        <path
          d="M206 199 C140 197, 70 200.5, -6 198.5"
          {...frameStroke}
          style={{ animation: "dw .6s 1.05s cubic-bezier(.33,1,.68,1) forwards" }}
        />
        <path
          d="M1.5 206 C3 140, 0 60, 1.5 -6"
          {...frameStroke}
          style={{ animation: "dw .6s 1.4s cubic-bezier(.33,1,.68,1) forwards" }}
        />
      </g>
    </svg>
  );
}

export function PortraitTape({ className }: SvgProps) {
  return (
    <svg width="58" height="21" viewBox="0 0 58 21" className={className} aria-hidden="true">
      <path
        d="M2 3 L55 0.5 L57 5 L55.5 9 L57.5 14 L56 18.5 L3 20 L1 15.5 L3 11 L0.5 6.5 Z"
        className="fill-band stroke-subtle"
        fillOpacity="0.85"
        style={{ strokeWidth: inkStroke(1) }}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Small, disconnected marks keep the portrait handmade without competing with
   the face. Its 4:5 coordinate system is anchored to the photo itself, so the
   marks cannot drift when the surrounding figure changes width. */
const portraitDoodleStroke = {
  // With non-scaling strokes, dash lengths are screen pixels. This comfortably
  // exceeds every compact mark and avoids partial multi-segment drawings.
  strokeDasharray: 240,
  strokeDashoffset: 240,
  vectorEffect: "non-scaling-stroke",
} as const;

export function PortraitDoodles({
  className,
  variant = "wide",
}: SvgProps & { variant?: "mobile" | "wide" }) {
  const mobile = variant === "mobile";
  const doodleTransform = mobile
    ? "matrix(.88 0 0 1.25 3 0)"
    : "matrix(1.28205 0 0 1.25 -28.205 0)";

  return (
    <svg viewBox="0 0 100 125" className={className} aria-hidden="true">
      <g
        className="ink"
        fill="none"
        stroke="currentColor"
        style={{ strokeWidth: inkStroke(1.1) }}
        strokeLinecap="round"
        strokeLinejoin="round"
        transform={doodleTransform}
      >
        {/* Open circle at the frame's upper-left corner. */}
        <path
          d="M22.6 18.1 C21.2 17.6,20.2 18.5,20.3 19.8 C20.4 21.2,21.5 21.8,22.8 21.3 C24 20.8,24.4 19.6,23.8 18.7 C23.5 18.3,23.1 18.1,22.6 18.1"
          {...portraitDoodleStroke}
          transform={mobile ? "translate(-20 0)" : undefined}
          style={{ animation: "dw .38s 1.7s ease forwards" }}
        />
        {/* Three left-leaning rays with a little air before the hair. */}
        <path
          d="M27.2 12.8 L24.8 11 M30 11.2 L28.7 8.4 M32.4 10.8 L31.7 7.8"
          {...portraitDoodleStroke}
          transform={`${mobile ? "translate(10.2 10.3)" : "translate(27.2 10.3)"} rotate(-10) scale(1.2) translate(-28.6 -10.3)`}
          style={{ animation: "dw .42s 1.82s ease forwards" }}
        />
        {/* Left-margin squiggle and compact zigzag. */}
        <path
          d="M15.4 42.5 C17 40.5,18.2 40.5,19.5 42.2 C20.7 43.7,22 43.4,23.7 41.7"
          {...portraitDoodleStroke}
          style={{ animation: "dw .36s 2s ease forwards" }}
        />
        <path
          d="M16.7 50.3 L18.7 48.8 L18.4 52.2 L20.8 50.7 L20.4 53.3"
          {...portraitDoodleStroke}
          style={{ animation: "dw .34s 2.12s ease forwards" }}
        />
        {/* Tiny plus beside the shoulder. */}
        <path
          d="M34 59.1 L34 63 M32.2 61.1 L35.9 61.1"
          {...portraitDoodleStroke}
          style={{ animation: "dw .3s 2.24s ease forwards" }}
        />
        {/* Four-point sparkle in the open space beside the face. */}
        <path
          d="M87 23.8 C87.4 26.1,88.4 27.1,90.3 27.5 C88.3 27.9,87.4 29.1,87 31.4 C86.6 29.1,85.7 27.9,83.8 27.5 C85.7 27.1,86.6 26.1,87 23.8"
          {...portraitDoodleStroke}
          style={{ animation: "dw .38s 2.35s ease forwards" }}
        />
        {/* Short echo marks beside the headphones. */}
        <path
          d="M91.9 55.5 C93.4 56.7,94.1 58.1,94 60.1 M94.6 54.2 C96.4 55.8,97.2 57.8,97 60.5"
          {...portraitDoodleStroke}
          style={{ animation: "dw .4s 2.47s ease forwards" }}
        />
        {/* Spiral near the lower tape and two finishing hatch marks. */}
        <path
          d="M21.6 91.8 C20.3 90.5,18.8 91.2,18.9 92.7 C19 94.3,21.2 94.6,22.3 93.4 C23.7 91.9,22.7 89.6,20.7 89.5 C18.4 89.4,17.1 91.1,17.4 93"
          {...portraitDoodleStroke}
          transform={mobile ? "translate(-14 0)" : "translate(-2 0)"}
          style={{ animation: "dw .42s 2.58s ease forwards" }}
        />
        <path
          d="M101 84.5 L103 82.3 M101.8 87.2 L104 85"
          {...portraitDoodleStroke}
          style={{ animation: "dw .3s 2.7s ease forwards" }}
        />
      </g>
      <g
        className="fill-current"
        transform={doodleTransform}
        style={{ animation: "fi .35s 2.2s both" }}
      >
        <circle cx="8.2" cy="62.6" r="0.7" />
        <circle cx="10.3" cy="61" r="0.62" />
        <circle cx="12.2" cy="58.9" r="0.52" />
      </g>
    </svg>
  );
}

type UnderlineKind = "work" | "experience" | "stack" | "archive";

const desktopUnderlines: Record<
  UnderlineKind,
  { viewBox: string; d: string; strokeWidth: string; dash: string; animation: string }
> = {
  work: {
    viewBox: "0 0 1144 18",
    d: "M3 11 C160 4, 300 15, 460 9 C620 3, 760 15, 920 9 C1010 6, 1080 7, 1141 10",
    strokeWidth: "2.8",
    dash: "1180",
    animation: "dw 1.4s cubic-bezier(.33,1,.68,1) forwards",
  },
  experience: {
    viewBox: "0 0 1144 18",
    d: "M3 10 C220 4, 520 15, 780 9 C940 5, 1050 8, 1141 11",
    strokeWidth: "2.8",
    dash: "1180",
    animation: "dw 1.3s cubic-bezier(.33,1,.68,1) forwards",
  },
  stack: {
    viewBox: "0 0 1144 18",
    d: "M3 8 C240 3, 560 12, 830 7 C970 4, 1060 6, 1141 9",
    strokeWidth: "2.8",
    dash: "1180",
    animation: "dw 1.3s cubic-bezier(.33,1,.68,1) forwards",
  },
  archive: {
    viewBox: "0 0 1144 16",
    d: "M3 9 C200 3, 470 14, 700 8 C900 3, 1030 6, 1141 9",
    strokeWidth: "2",
    dash: "10 12",
    animation: "fi .9s .2s ease forwards",
  },
};

const mobileUnderlines: Record<
  UnderlineKind,
  { viewBox: string; d: string; strokeWidth: string; dash: string; animation: string }
> = {
  work: {
    viewBox: "0 0 340 14",
    d: "M2 8 C80 3, 160 12, 240 7 C290 4, 320 6, 338 9",
    strokeWidth: "2.6",
    dash: "360",
    animation: "dw 1.1s cubic-bezier(.33,1,.68,1) forwards",
  },
  experience: {
    viewBox: "0 0 340 14",
    d: "M2 8 C90 3, 190 12, 260 7 C300 4, 322 6, 338 9",
    strokeWidth: "2.6",
    dash: "360",
    animation: "dw 1.1s cubic-bezier(.33,1,.68,1) forwards",
  },
  stack: {
    viewBox: "0 0 340 14",
    d: "M2 9 C86 3, 170 12, 246 7 C292 4, 320 6, 338 9",
    strokeWidth: "2.6",
    dash: "360",
    animation: "dw 1.1s cubic-bezier(.33,1,.68,1) forwards",
  },
  archive: {
    viewBox: "0 0 340 12",
    d: "M2 7 C90 2, 180 11, 252 6 C296 3, 320 5, 338 8",
    strokeWidth: "1.8",
    dash: "9 11",
    animation: "fi .9s ease forwards",
  },
};

export function HomeSectionUnderline({
  kind,
  className = "",
}: {
  kind: UnderlineKind;
  className?: string;
}) {
  const desktop = desktopUnderlines[kind];
  const mobile = mobileUnderlines[kind];
  const isArchive = kind === "archive";
  return (
    <>
      <svg
        width="100%"
        height={isArchive ? "12" : "14"}
        viewBox={mobile.viewBox}
        preserveAspectRatio="none"
        className={`layout:hidden block overflow-visible ${className}`}
        aria-hidden="true"
      >
        <path
          className="ink"
          d={mobile.d}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeDasharray={mobile.dash}
          strokeDashoffset={isArchive ? undefined : mobile.dash}
          data-anim=""
          style={{
            ...paused(mobile.animation),
            opacity: isArchive ? 0 : undefined,
            strokeWidth: inkStroke(mobile.strokeWidth),
          }}
        />
      </svg>
      <svg
        width="100%"
        height={isArchive ? "16" : "18"}
        viewBox={desktop.viewBox}
        preserveAspectRatio="none"
        className={`layout:block hidden ${className}`}
        aria-hidden="true"
      >
        <path
          className="ink"
          d={desktop.d}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeDasharray={desktop.dash}
          strokeDashoffset={isArchive ? undefined : desktop.dash}
          data-anim=""
          style={{
            ...paused(desktop.animation),
            opacity: isArchive ? 0 : undefined,
            strokeWidth: inkStroke(desktop.strokeWidth),
          }}
        />
      </svg>
    </>
  );
}

// The Selected Work frame, drawn as four separate strokes so each edge keeps a
// fixed 18px band and its wobble at any box size. The strokes overrun the
// corners a little, the way a pen does. `pathLength="1"` keeps the draw-in
// dash correct however far `preserveAspectRatio="none"` stretches a path.
// An <svg> is a replaced element, so opposite insets do not stretch it; each
// edge needs an explicit length.
const frameEdges = [
  {
    viewBox: "0 0 1000 18",
    d: "M4 11 C180 6, 360 13, 540 8 C720 4, 860 12, 996 7",
    className: "-top-2.25 -left-1.25 h-4.5 w-[calc(100%+12px)]",
    animation: "dw 1.2s cubic-bezier(.33,1,.68,1) forwards",
  },
  {
    viewBox: "0 0 18 1000",
    d: "M10 4 C6 200, 13 410, 8 600 C4 780, 12 900, 9 996",
    className: "-top-1 -right-2.25 h-[calc(100%+11px)] w-4.5",
    animation: "dw 1.6s .2s cubic-bezier(.33,1,.68,1) forwards",
  },
  {
    viewBox: "0 0 1000 18",
    d: "M3 8 C200 13, 420 5, 610 10 C780 14, 900 6, 997 11",
    className: "-bottom-2.25 -left-2 h-4.5 w-[calc(100%+12px)]",
    animation: "dw 1.2s cubic-bezier(.33,1,.68,1) forwards",
  },
  {
    viewBox: "0 0 18 1000",
    d: "M8 3 C12 180, 5 380, 10 560 C14 740, 6 880, 9 997",
    className: "-top-1.75 -left-2.25 h-[calc(100%+11px)] w-4.5",
    animation: "dw 1.6s .1s cubic-bezier(.33,1,.68,1) forwards",
  },
];

export function WorkFrame({ className = "" }: SvgProps) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      {frameEdges.map((edge) => (
        <svg
          key={edge.d}
          viewBox={edge.viewBox}
          preserveAspectRatio="none"
          className={`absolute overflow-visible ${edge.className}`}
        >
          <path
            className="ink"
            d={edge.d}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset="1"
            data-anim=""
            style={{ ...paused(edge.animation), strokeWidth: inkStroke(2) }}
          />
        </svg>
      ))}
    </div>
  );
}

export function WorkDivider() {
  return (
    <>
      <svg
        width="100%"
        height="14"
        viewBox="0 0 340 14"
        preserveAspectRatio="none"
        className="layout:hidden my-8.5 block overflow-visible"
        aria-hidden="true"
      >
        <path
          className="ink"
          d="M2 8 C90 3, 180 12, 250 7 C295 4, 320 6, 338 9"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeDasharray="8 11"
          data-anim=""
          style={{ ...paused("fi .9s ease forwards"), opacity: 0, strokeWidth: inkStroke(1.8) }}
        />
      </svg>
      <svg
        width="100%"
        height="18"
        viewBox="0 0 1072 18"
        preserveAspectRatio="none"
        className="layout:block my-10 hidden"
        aria-hidden="true"
      >
        <path
          className="ink"
          d="M3 10 C180 4, 430 15, 640 9 C830 4, 960 7, 1069 10"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeDasharray="9 12"
          data-anim=""
          style={{ ...paused("fi .9s ease forwards"), opacity: 0, strokeWidth: inkStroke(1.8) }}
        />
      </svg>
    </>
  );
}

function DiagramShell({
  children,
  viewBox,
  className,
}: {
  children: ReactNode;
  viewBox: string;
  className: string;
}) {
  return (
    <svg width="100%" viewBox={viewBox} className={className} role="img">
      {children}
    </svg>
  );
}

/* Drawn on the same grid as GitOpsHomeDiagram: the same rounded frame, a
   platform label on top, equal boxes with centred labels, and a note at the
   foot. Both variants follow the pipeline in order. The wide one snakes
   (ingest left to right, then down into pgvector and back out to the answer). */
export function FinDocHomeDiagram() {
  return (
    <>
      <DiagramShell viewBox="0 0 300 456" className="tablet:hidden block">
        <title>FinDoc ingestion, retrieval, and cited-answer pipeline</title>
        <g
          className="ink"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M10 30 C10 22, 16 16, 26 16 L274 16 C284 16, 290 22, 290 32 L290 424 C290 434, 284 440, 274 440 L26 440 C16 440, 10 434, 10 424 Z"
            strokeDasharray="1400"
            strokeDashoffset="1400"
            data-anim=""
            style={{
              ...paused("dw 1.4s cubic-bezier(.33,1,.68,1) forwards"),
              strokeWidth: inkStroke(1.6),
            }}
          />
          <path
            d="M40 66 L260 66 L260 104 L40 104 Z"
            strokeDasharray="530"
            strokeDashoffset="530"
            data-anim=""
            style={{ ...paused("dw .7s .5s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M40 124 L260 124 L260 162 L40 162 Z"
            strokeDasharray="530"
            strokeDashoffset="530"
            data-anim=""
            style={{ ...paused("dw .7s .65s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M40 182 L260 182 L260 220 L40 220 Z"
            strokeDasharray="530"
            strokeDashoffset="530"
            data-anim=""
            style={{ ...paused("dw .7s .8s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M40 250 C40 244, 90 240, 150 240 C210 240, 260 244, 260 250 L260 294 C260 300, 210 304, 150 304 C90 304, 40 300, 40 294 Z"
            strokeDasharray="580"
            strokeDashoffset="580"
            data-anim=""
            style={{
              ...paused("dw .8s .95s cubic-bezier(.33,1,.68,1) forwards"),
              strokeWidth: inkStroke(1.6),
            }}
          />
          <path
            d="M40 250 C40 256, 90 260, 150 260 C210 260, 260 256, 260 250"
            strokeDasharray="240"
            strokeDashoffset="240"
            data-anim=""
            style={{ ...paused("dw .4s 1.6s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M40 332 C40 327, 43 324, 48 324 L252 324 C257 324, 260 327, 260 332 L260 354 C260 359, 257 362, 252 362 L48 362 C43 362, 40 359, 40 354 Z"
            strokeDasharray="530"
            strokeDashoffset="530"
            data-anim=""
            style={{ ...paused("dw .7s 1.1s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M40 382 L260 382 L260 420 L40 420 Z"
            strokeDasharray="530"
            strokeDashoffset="530"
            data-anim=""
            style={{ ...paused("dw .7s 1.25s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M150 106 L150 122 M144 113 L150 124 L156 113"
            strokeDasharray="40"
            strokeDashoffset="40"
            data-anim=""
            style={{ ...paused("dw .3s 1.4s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M150 164 L150 180 M144 171 L150 182 L156 171"
            strokeDasharray="40"
            strokeDashoffset="40"
            data-anim=""
            style={{ ...paused("dw .3s 1.5s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M150 222 L150 236 M144 227 L150 238 L156 227"
            strokeDasharray="40"
            strokeDashoffset="40"
            data-anim=""
            style={{ ...paused("dw .3s 1.6s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M150 306 L150 320 M144 311 L150 322 L156 311"
            strokeDasharray="40"
            strokeDashoffset="40"
            data-anim=""
            style={{ ...paused("dw .3s 1.7s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M150 364 L150 378 M144 369 L150 380 L156 369"
            strokeDasharray="40"
            strokeDashoffset="40"
            data-anim=""
            style={{ ...paused("dw .3s 1.8s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
        </g>
        <g
          className="font-hand fill-current text-[16px]"
          textAnchor="middle"
          data-anim=""
          style={{ ...paused("fi .7s 1.1s ease forwards"), opacity: 0 }}
        >
          <text x="150" y="91">
            EDGAR pull
          </text>
          <text x="150" y="149">
            Docling parse
          </text>
          <text x="150" y="207">
            chunk + embed
          </text>
          <text x="150" y="288">
            pgvector + lineage
          </text>
          <text x="150" y="349">
            progressive retrieval
          </text>
          <text x="150" y="407">
            cited answer
          </text>
          <text x="150" y="46" className="fill-muted text-[14.5px] tracking-[1.4px]">
            SPRING BOOT · PGVECTOR
          </text>
        </g>
      </DiagramShell>
      <DiagramShell viewBox="0 0 472 310" className="tablet:block hidden">
        <title>FinDoc ingestion, retrieval, and cited-answer pipeline</title>
        <g
          className="ink"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M18 26 C18 21, 22 18, 28 18 L444 18 C450 18, 454 21, 454 27 L454 278 C454 284, 450 287, 444 287 L28 287 C22 287, 18 284, 18 278 Z"
            strokeDasharray="1420"
            strokeDashoffset="1420"
            data-anim=""
            style={{
              ...paused("dw 1.7s cubic-bezier(.33,1,.68,1) forwards"),
              strokeWidth: inkStroke(1.6),
            }}
          />
          <path
            d="M35 66 L149 66 L149 112 L35 112 Z"
            strokeDasharray="330"
            strokeDashoffset="330"
            data-anim=""
            style={{ ...paused("dw .7s .65s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M179 66 L293 66 L293 112 L179 112 Z"
            strokeDasharray="330"
            strokeDashoffset="330"
            data-anim=""
            style={{ ...paused("dw .7s .85s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M323 66 L437 66 L437 112 L323 112 Z"
            strokeDasharray="330"
            strokeDashoffset="330"
            data-anim=""
            style={{ ...paused("dw .7s 1.05s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M323 186 C323 181, 350 178, 380 178 C410 178, 437 181, 437 186 L437 234 C437 239, 410 242, 380 242 C350 242, 323 239, 323 234 Z"
            strokeDasharray="360"
            strokeDashoffset="360"
            data-anim=""
            style={{
              ...paused("dw .8s 1.25s cubic-bezier(.33,1,.68,1) forwards"),
              strokeWidth: inkStroke(1.6),
            }}
          />
          <path
            d="M323 186 C323 191, 350 194, 380 194 C410 194, 437 191, 437 186"
            strokeDasharray="130"
            strokeDashoffset="130"
            data-anim=""
            style={{ ...paused("dw .4s 1.9s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M179 194 C179 189, 182 186, 187 186 L285 186 C290 186, 293 189, 293 194 L293 224 C293 229, 290 232, 285 232 L187 232 C182 232, 179 229, 179 224 Z"
            strokeDasharray="330"
            strokeDashoffset="330"
            data-anim=""
            style={{ ...paused("dw .7s 1.45s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M35 186 L149 186 L149 232 L35 232 Z"
            strokeDasharray="330"
            strokeDashoffset="330"
            data-anim=""
            style={{ ...paused("dw .7s 1.65s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M153 89 L174 89"
            strokeDasharray="24"
            strokeDashoffset="24"
            data-anim=""
            style={{ ...paused("dw .2s 1.85s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M166 83 L175 89 L166 95"
            strokeDasharray="26"
            strokeDashoffset="26"
            data-anim=""
            style={{ ...paused("dw .18s 2.05s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M297 89 L318 89"
            strokeDasharray="24"
            strokeDashoffset="24"
            data-anim=""
            style={{ ...paused("dw .2s 2s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M310 83 L319 89 L310 95"
            strokeDasharray="26"
            strokeDashoffset="26"
            data-anim=""
            style={{ ...paused("dw .18s 2.2s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M380 116 L380 172"
            strokeDasharray="58"
            strokeDashoffset="58"
            data-anim=""
            style={{ ...paused("dw .35s 2.15s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M374 164 L380 175 L386 164"
            strokeDasharray="28"
            strokeDashoffset="28"
            data-anim=""
            style={{ ...paused("dw .18s 2.48s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M319 209 L298 209"
            strokeDasharray="24"
            strokeDashoffset="24"
            data-anim=""
            style={{ ...paused("dw .2s 2.5s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M306 203 L297 209 L306 215"
            strokeDasharray="26"
            strokeDashoffset="26"
            data-anim=""
            style={{ ...paused("dw .18s 2.7s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M175 209 L154 209"
            strokeDasharray="24"
            strokeDashoffset="24"
            data-anim=""
            style={{ ...paused("dw .2s 2.65s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M162 203 L153 209 L162 215"
            strokeDasharray="26"
            strokeDashoffset="26"
            data-anim=""
            style={{ ...paused("dw .18s 2.85s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
        </g>
        <g
          className="font-hand fill-current text-[14.5px]"
          textAnchor="middle"
          data-anim=""
          style={{ ...paused("fi .7s 1.35s ease forwards"), opacity: 0 }}
        >
          <text x="92" y="94">
            EDGAR pull
          </text>
          <text x="236" y="94">
            Docling parse
          </text>
          <text x="380" y="94">
            chunk + embed
          </text>
          <text x="380" y="214">
            pgvector
          </text>
          <text x="380" y="231">
            + lineage
          </text>
          <text x="236" y="205">
            progressive
          </text>
          <text x="236" y="222">
            retrieval
          </text>
          <text x="92" y="214">
            cited answer
          </text>
          <text x="236" y="44" className="fill-muted text-[14.5px] tracking-[1.4px]">
            SPRING BOOT · PGVECTOR
          </text>
        </g>
        <g data-anim="" style={{ ...paused("fi .6s 3s ease forwards"), opacity: 0 }}>
          <text x="386" y="273" textAnchor="end" className="font-hand fill-copy-muted text-[15px]">
            the amendment problem lives here ↑
          </text>
        </g>
      </DiagramShell>
    </>
  );
}

export function GitOpsHomeDiagram() {
  return (
    <>
      <DiagramShell viewBox="0 0 300 318" className="tablet:hidden block">
        <title>GitOps deployment loop</title>
        <g
          className="ink"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M10 30 C10 22, 16 16, 26 16 L274 16 C284 16, 290 22, 290 32 L290 286 C290 296, 284 302, 274 302 L26 302 C16 302, 10 296, 10 286 Z"
            strokeDasharray="1120"
            strokeDashoffset="1120"
            data-anim=""
            style={{
              ...paused("dw 1.4s cubic-bezier(.33,1,.68,1) forwards"),
              strokeWidth: inkStroke(1.6),
            }}
          />
          <path
            d="M34 66 L140 66 L140 118 L34 118 Z"
            strokeDasharray="320"
            strokeDashoffset="320"
            data-anim=""
            style={{ ...paused("dw .7s .5s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M162 66 L266 66 L266 118 L162 118 Z"
            strokeDasharray="320"
            strokeDashoffset="320"
            data-anim=""
            style={{ ...paused("dw .7s .7s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M34 186 L140 186 L140 238 L34 238 Z"
            strokeDasharray="320"
            strokeDashoffset="320"
            data-anim=""
            style={{ ...paused("dw .7s .9s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M162 186 L266 186 L266 238 L162 238 Z"
            strokeDasharray="320"
            strokeDashoffset="320"
            data-anim=""
            style={{ ...paused("dw .7s 1.1s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M144 92 L157 92 M150 86 L158 92 L150 98"
            strokeDasharray="40"
            strokeDashoffset="40"
            data-anim=""
            style={{ ...paused("dw .3s 1.3s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M87 122 L87 182 M81 173 L87 184 L93 173"
            strokeDasharray="90"
            strokeDashoffset="90"
            data-anim=""
            style={{ ...paused("dw .4s 1.45s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M214 122 L214 182 M208 173 L214 184 L220 173"
            strokeDasharray="90"
            strokeDashoffset="90"
            data-anim=""
            style={{ ...paused("dw .4s 1.6s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M110 258 C134 272, 168 272, 192 258 M184 252 L194 257 L188 266"
            strokeDasharray="130"
            strokeDashoffset="130"
            data-anim=""
            style={{ ...paused("dw .55s 1.75s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
        </g>
        <g
          className="font-hand fill-current text-[16px]"
          textAnchor="middle"
          data-anim=""
          style={{ ...paused("fi .7s 1.1s ease forwards"), opacity: 0 }}
        >
          <text x="87" y="97">
            Git repo
          </text>
          <text x="214" y="97">
            FluxCD
          </text>
          <text x="87" y="217">
            Infisical
          </text>
          <text x="214" y="208">
            Traefik
          </text>
          <text x="214" y="227">
            + TLS
          </text>
          <text x="150" y="46" className="fill-muted text-[14.5px] tracking-[1.4px]">
            K3S · OCI ARM
          </text>
          <text x="150" y="284" className="fill-copy-muted text-[15px]">
            reconciles itself ↻
          </text>
        </g>
      </DiagramShell>
      <DiagramShell viewBox="0 0 472 310" className="tablet:block hidden">
        <title>GitOps deployment loop</title>
        <g
          className="ink"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M18 26 C18 21, 22 18, 28 18 L444 18 C450 18, 454 21, 454 27 L454 278 C454 284, 450 287, 444 287 L28 287 C22 287, 18 284, 18 278 Z"
            strokeDasharray="1420"
            strokeDashoffset="1420"
            data-anim=""
            style={{
              ...paused("dw 1.7s cubic-bezier(.33,1,.68,1) forwards"),
              strokeWidth: inkStroke(1.6),
            }}
          />
          <path
            d="M52 66 L172 66 L172 112 L52 112 Z"
            strokeDasharray="340"
            strokeDashoffset="340"
            data-anim=""
            style={{ ...paused("dw .7s .65s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M304 66 L424 66 L424 112 L304 112 Z"
            strokeDasharray="340"
            strokeDashoffset="340"
            data-anim=""
            style={{ ...paused("dw .7s .9s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M52 186 L172 186 L172 232 L52 232 Z"
            strokeDasharray="340"
            strokeDashoffset="340"
            data-anim=""
            style={{ ...paused("dw .7s 1.15s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M304 186 L424 186 L424 232 L304 232 Z"
            strokeDasharray="340"
            strokeDashoffset="340"
            data-anim=""
            style={{ ...paused("dw .7s 1.4s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M176 89 L299 89"
            strokeDasharray="126"
            strokeDashoffset="126"
            data-anim=""
            style={{ ...paused("dw .45s 1.65s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M291 83 L300 89 L291 95"
            strokeDasharray="26"
            strokeDashoffset="26"
            data-anim=""
            style={{ ...paused("dw .18s 2s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M112 116 L112 182"
            strokeDasharray="68"
            strokeDashoffset="68"
            data-anim=""
            style={{ ...paused("dw .35s 1.85s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M106 173 L112 184 L118 173"
            strokeDasharray="28"
            strokeDashoffset="28"
            data-anim=""
            style={{ ...paused("dw .18s 2.18s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M364 116 L364 182"
            strokeDasharray="68"
            strokeDashoffset="68"
            data-anim=""
            style={{ ...paused("dw .35s 2s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M358 173 L364 184 L370 173"
            strokeDasharray="28"
            strokeDashoffset="28"
            data-anim=""
            style={{ ...paused("dw .18s 2.33s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M196 246 C216 258, 256 258, 276 246"
            strokeDasharray="100"
            strokeDashoffset="100"
            data-anim=""
            style={{ ...paused("dw .5s 2.4s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
          <path
            d="M268 240 L278 245 L272 254"
            strokeDasharray="26"
            strokeDashoffset="26"
            data-anim=""
            style={{ ...paused("dw .18s 2.85s ease forwards"), strokeWidth: inkStroke(1.6) }}
          />
        </g>
        <g
          className="font-hand fill-current text-[15px]"
          textAnchor="middle"
          data-anim=""
          style={{ ...paused("fi .7s 1.35s ease forwards"), opacity: 0 }}
        >
          <text x="112" y="94">
            Git repo
          </text>
          <text x="364" y="94">
            FluxCD
          </text>
          <text x="112" y="214">
            Infisical
          </text>
          <text x="364" y="214" className="text-[14.5px]">
            Traefik + TLS
          </text>
          <text x="236" y="44" className="fill-muted text-[14.5px] tracking-[1.4px]">
            K3S · OCI ARM
          </text>
          <text x="236" y="273" className="fill-copy-muted">
            reconciles itself ↻
          </text>
        </g>
      </DiagramShell>
    </>
  );
}

export function WorkNoteArrow({ className }: SvgProps) {
  return (
    <svg width="64" height="60" viewBox="0 0 64 60" className={className} aria-hidden="true">
      <g
        className="ink"
        fill="none"
        stroke="currentColor"
        style={{ strokeWidth: inkStroke(1.7) }}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M8 4 C6 20, 18 28, 54 26"
          strokeDasharray="80"
          strokeDashoffset="80"
          data-anim=""
          style={paused("dw .8s cubic-bezier(.33,1,.68,1) forwards")}
        />
        <path
          d="M45.7 16.6 C50 19.3, 53.9 23, 56 26 C53.6 29.4, 49.9 33.3, 46.2 37.2"
          strokeDasharray="40"
          strokeDashoffset="40"
          data-anim=""
          style={paused("dw .3s .8s ease forwards")}
        />
      </g>
    </svg>
  );
}

// A quick double loop scribbled around the Experience note. The second pass
// drifts off the first and stops short, the way a pen circles something twice.
// `pathLength="1"` keeps the draw-in dash right as the box stretches the path.
export function ExperienceNoteCircle({ className = "" }: SvgProps) {
  return (
    <svg
      viewBox="0 0 180 80"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute overflow-visible ${className}`}
      aria-hidden="true"
    >
      <path
        className="ink"
        d="M40 11 C100 2, 166 8, 172 34 C177 60, 130 74, 84 74 C36 74, 5 62, 8 40 C11 17, 52 7, 98 7 C142 7, 178 21, 171 45 C165 66, 124 71, 102 70"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="1"
        data-anim=""
        style={{
          ...paused("dw 1.4s .3s cubic-bezier(.33,1,.68,1) forwards"),
          strokeWidth: inkStroke(1.5),
        }}
      />
    </svg>
  );
}

const experienceIcons = [
  <>
    <path
      key="a"
      d="M12 14 C12 10, 15 8, 20 8 L92 8 C97 8, 100 10, 100 15 L100 68 C100 73, 97 75, 92 75 L20 75 C15 75, 12 73, 12 68 Z"
      strokeDasharray="320"
      strokeDashoffset="320"
      data-anim=""
      style={{
        ...paused("dw .9s cubic-bezier(.33,1,.68,1) forwards"),
        strokeWidth: inkStroke(1.8),
      }}
    />
    <path
      key="b"
      d="M12 24 L100 24"
      strokeDasharray="90"
      strokeDashoffset="90"
      data-anim=""
      style={{ ...paused("dw .4s .7s ease forwards"), strokeWidth: inkStroke(1.6) }}
    />
    <circle
      key="c"
      cx="22"
      cy="16"
      r="2.6"
      data-anim=""
      style={{ ...paused("fi .3s .95s ease forwards"), opacity: 0, strokeWidth: inkStroke(1.4) }}
    />
    <circle
      key="d"
      cx="32"
      cy="16"
      r="2.6"
      data-anim=""
      style={{ ...paused("fi .3s 1.05s ease forwards"), opacity: 0, strokeWidth: inkStroke(1.4) }}
    />
    <circle
      key="e"
      cx="42"
      cy="16"
      r="2.6"
      data-anim=""
      style={{ ...paused("fi .3s 1.15s ease forwards"), opacity: 0, strokeWidth: inkStroke(1.4) }}
    />
    <path
      key="f"
      d="M26 40 L62 40 M26 52 L84 52 M26 63 L52 63"
      strokeDasharray="180"
      strokeDashoffset="180"
      data-anim=""
      style={{ ...paused("dw .8s .95s ease forwards"), strokeWidth: inkStroke(1.6) }}
    />
    <path
      key="g"
      d="M46 78 L46 86 M30 88 L82 88"
      strokeDasharray="70"
      strokeDashoffset="70"
      data-anim=""
      style={{ ...paused("dw .4s 1.5s ease forwards"), strokeWidth: inkStroke(1.6) }}
    />
  </>,
  <>
    <path
      key="a"
      d="M59 10 L108 30 L59 50 L10 30 Z"
      strokeDasharray="230"
      strokeDashoffset="230"
      data-anim=""
      style={{ ...paused("dw 1s cubic-bezier(.33,1,.68,1) forwards"), strokeWidth: inkStroke(1.8) }}
    />
    <path
      key="b"
      d="M28 38 L28 62 C28 72, 90 72, 90 62 L90 38"
      strokeDasharray="150"
      strokeDashoffset="150"
      data-anim=""
      style={{ ...paused("dw .7s .8s ease forwards"), strokeWidth: inkStroke(1.7) }}
    />
    <path
      key="c"
      d="M104 32 L104 66"
      strokeDasharray="36"
      strokeDashoffset="36"
      data-anim=""
      style={{ ...paused("dw .3s 1.3s ease forwards"), strokeWidth: inkStroke(1.6) }}
    />
    <path
      key="d"
      d="M104 66 C99 70, 99 78, 104 82 C109 78, 109 70, 104 66 Z"
      strokeDasharray="46"
      strokeDashoffset="46"
      data-anim=""
      style={{ ...paused("dw .35s 1.55s ease forwards"), strokeWidth: inkStroke(1.5) }}
    />
    <path
      key="e"
      d="M18 84 L100 84"
      strokeDasharray="84"
      strokeDashoffset="84"
      data-anim=""
      style={{ ...paused("dw .4s 1.8s ease forwards"), strokeWidth: inkStroke(1.6) }}
    />
  </>,
  <>
    <path
      key="a"
      d="M59 12 L102 34 L16 34 Z"
      strokeDasharray="200"
      strokeDashoffset="200"
      data-anim=""
      style={{
        ...paused("dw .9s cubic-bezier(.33,1,.68,1) forwards"),
        strokeWidth: inkStroke(1.8),
      }}
    />
    <path
      key="b"
      d="M12 40 L106 40"
      strokeDasharray="96"
      strokeDashoffset="96"
      data-anim=""
      style={{ ...paused("dw .4s .7s ease forwards"), strokeWidth: inkStroke(1.7) }}
    />
    <path
      key="c"
      d="M28 44 L28 74 M50 44 L50 74 M68 44 L68 74 M90 44 L90 74"
      strokeDasharray="130"
      strokeDashoffset="130"
      data-anim=""
      style={{ ...paused("dw .8s .95s ease forwards"), strokeWidth: inkStroke(1.6) }}
    />
    <path
      key="d"
      d="M12 80 L106 80 M6 88 L112 88"
      strokeDasharray="210"
      strokeDashoffset="210"
      data-anim=""
      style={{ ...paused("dw .6s 1.6s ease forwards"), strokeWidth: inkStroke(1.7) }}
    />
  </>,
];

export function ExperienceIcon({ index }: { index: number }) {
  const dimensions = index === 0 ? [112, 96] : index === 1 ? [118, 100] : [118, 96];
  return (
    <svg
      width={dimensions[0]}
      height={dimensions[1]}
      viewBox={`0 0 ${dimensions[0]} ${dimensions[1]}`}
      className="layout:block hidden shrink-0"
      aria-hidden="true"
    >
      <g
        className="ink"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {experienceIcons[index]}
      </g>
    </svg>
  );
}

const stackPaths = [
  "M6 7 C17 4, 31 4, 40 7 C42 17, 42 30, 40 39 C29 42, 15 42, 6 39 C4 29, 4 17, 6 7 Z",
  "M6 6 C17 4, 30 3, 40 7 C42 18, 41 29, 39 39 C28 42, 15 41, 6 39 C4 28, 4 16, 6 6 Z",
  "M5 7 C16 3, 31 5, 40 6 C42 17, 42 30, 40 40 C29 42, 16 41, 6 39 C3 29, 3 17, 5 7 Z",
  "M6 6 C18 4, 30 4, 41 7 C42 18, 41 30, 39 40 C28 41, 15 42, 5 39 C4 28, 4 17, 6 6 Z",
];

export function StackMarker({ index }: { index: number }) {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      className="layout:h-11.5 layout:w-11.5 absolute inset-0 h-10.5 w-10.5 overflow-visible"
      aria-hidden="true"
    >
      <path
        className="ink layout:stroke-[calc(1.5px*var(--ink-stroke,1))] stroke-[calc(1.6px*var(--ink-stroke,1))]"
        d={stackPaths[index]}
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray="160"
        strokeDashoffset="160"
        data-anim=""
        style={paused(`dw .9s ${index ? `.${index}s ` : ""}cubic-bezier(.33,1,.68,1) forwards`)}
      />
    </svg>
  );
}

export function StackNoteArrow({ className }: SvgProps) {
  return (
    <svg width="82" height="66" viewBox="0 0 82 66" className={className} aria-hidden="true">
      <g
        className="ink"
        fill="none"
        stroke="currentColor"
        style={{ strokeWidth: inkStroke(1.7) }}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M78 45 C50 47, 18 40, 12 8"
          strokeDasharray="94"
          strokeDashoffset="94"
          data-anim=""
          style={paused("dw .8s cubic-bezier(.33,1,.68,1) forwards")}
        />
        <path
          d="M4.9 23.4 C7.8 17.1, 10.3 11.6, 12 8 C15.7 11.9, 20.3 16.2, 24.9 20.5"
          strokeDasharray="40"
          strokeDashoffset="40"
          data-anim=""
          style={paused("dw .3s .75s ease forwards")}
        />
      </g>
    </svg>
  );
}

const archivePaths = [
  "M7 9 C74 4, 168 4, 256 8 C259 48, 260 112, 255 150 C176 154, 88 155, 9 150 C5 108, 4 50, 7 9 Z",
  "M8 7 C80 3, 170 5, 257 9 C259 50, 259 110, 254 151 C170 155, 86 154, 8 149 C4 106, 5 48, 8 7 Z",
  "M6 8 C82 5, 166 3, 255 7 C258 46, 259 108, 256 151 C174 156, 84 154, 9 151 C5 110, 4 46, 6 8 Z",
  "M7 6 C78 4, 172 6, 256 8 C260 50, 258 112, 254 149 C172 154, 88 155, 8 150 C5 108, 5 46, 7 6 Z",
];

export function ArchiveOutline({ index }: { index: number }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 264 158"
      preserveAspectRatio="none"
      className="archive-outline text-muted pointer-events-none absolute inset-0 -z-10 overflow-visible"
      aria-hidden="true"
    >
      {/* The fill shares the outline's path, so the card surface wobbles with it. */}
      <path
        className="ink fill-paper"
        d={archivePaths[index]}
        stroke="currentColor"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        // Non-scaling strokes measure dashes in screen pixels; 1000 must exceed
        // the widest card's perimeter or the outline stops short of closing.
        strokeDasharray="1000"
        strokeDashoffset="1000"
        data-anim=""
        style={{
          ...paused(`dw 1.1s ${index ? `.${index * 12}s ` : ""}cubic-bezier(.33,1,.68,1) forwards`),
          strokeWidth: inkStroke(1.6),
        }}
      />
    </svg>
  );
}

// Stretches with the GET IN TOUCH heading; `pathLength="1"` keeps the draw-in
// dash correct at any width.
export function ContactFormUnderline({ className }: SvgProps) {
  return (
    <svg
      width="100%"
      height="12"
      viewBox="0 0 210 12"
      preserveAspectRatio="none"
      className={`block overflow-visible ${className ?? ""}`}
      aria-hidden="true"
    >
      <path
        className="ink"
        d="M3 9 C48 4, 120 2, 207 5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        data-anim=""
        style={{
          ...paused("dw .9s cubic-bezier(.33,1,.68,1) forwards"),
          strokeWidth: inkStroke(2.2),
        }}
      />
    </svg>
  );
}

export function ContactNoteArrow({ className }: SvgProps) {
  return (
    <svg width="66" height="40" viewBox="0 0 66 40" className={className} aria-hidden="true">
      <g
        className="ink"
        fill="none"
        stroke="currentColor"
        style={{ strokeWidth: inkStroke(1.7) }}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M60 24 C38 26, 14 22, 10 1"
          strokeDasharray="70"
          strokeDashoffset="70"
          data-anim=""
          style={paused("dw .7s cubic-bezier(.33,1,.68,1) forwards")}
        />
        <path
          d="M20.2 10 C16.2 5.8, 12.4 2.5, 10 1 C8 5.6, 5.9 10.1, 2.9 14.9"
          strokeDasharray="44"
          strokeDashoffset="44"
          data-anim=""
          style={paused("dw .3s .65s ease forwards")}
        />
      </g>
    </svg>
  );
}
