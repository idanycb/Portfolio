import { inkStroke } from "@/shared/drawn-layer/ink-stroke";
import type { CSSProperties } from "react";

const paused = (animation: string): CSSProperties => ({ animation, animationPlayState: "paused" });

export function CaseHeroDocument() {
  return (
    <svg
      width="300"
      height="230"
      viewBox="0 0 300 230"
      className="layout:top-5 layout:right-[26px] layout:h-[clamp(10.5rem,15.3vw,14.375rem)] layout:w-[clamp(13.75rem,20vw,18.75rem)] layout:opacity-[.17] pointer-events-none absolute -top-2 right-2 h-[52px] w-[68px] overflow-visible opacity-[.13]"
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="currentColor"
        className="ink layout:[stroke-width:calc(1.8px*var(--ink-stroke,1))] [stroke-width:calc(2.6px*var(--ink-stroke,1))]"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g transform="rotate(-5 151 115)">
          {/* Page: bowed edges with corners that overshoot, like a quick pen sketch. */}
          <path d="M62 31 C104 28, 150 31, 191 29" />
          <path d="M190 29 C204 42, 220 57, 236 71" />
          <path d="M235 68 C238 110, 233 160, 236 203" />
          <path d="M240 200 C180 203, 120 197, 63 201" />
          <path d="M66 205 C63 150, 68 90, 65 26" />
          {/* Dog-ear, folded down with a slight curl. */}
          <path d="M191 29 C188 44, 192 60, 189 74 C205 71, 220 74, 236 71" />
          {/* Scribbled lines of text. */}
          <path d="M92 104 C110 99, 128 108, 146 103 S182 99, 208 105" />
          <path d="M92 128 C112 123, 130 132, 150 127 S186 123, 206 129" />
          <path d="M92 152 C106 147, 120 156, 136 151 S156 147, 166 152" />
          {/* A loose loop around one passage, the part that changed. */}
          <path d="M140 118 C172 111, 216 115, 215 129 C214 143, 170 145, 140 140 C116 136, 114 119, 152 115" />
          {/* Paperclip over the top edge. */}
          <path d="M96 48 L96 18 C96 9, 110 9, 110 18 L110 54 C110 62, 101 62, 101 54 L101 24" />
        </g>
      </g>
    </svg>
  );
}

export function RailNoteArrow() {
  return (
    <svg width="76" height="56" viewBox="0 0 76 56" aria-hidden="true">
      <g
        className="ink"
        fill="none"
        stroke="currentColor"
        style={{ strokeWidth: inkStroke(1.6) }}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Tail sits by the note; the head points up at the section list. */}
        <path d="M60 50 A48 48 0 0 1 20 8" />
        <path d="M16.3 17.3 L20 8 L25.7 16.2" />
      </g>
    </svg>
  );
}

const desktop = {
  s1: ["M2 8 C140 3, 300 12, 440 7 C580 2, 700 11, 848 7", "1.2s", "880"],
  s2: ["M2 8 C160 3, 320 13, 470 8 C600 4, 720 11, 848 8", "1.1s", "880"],
  s3: ["M2 8 C140 3, 300 12, 440 7 C580 2, 700 11, 848 7", "1.2s", "880"],
  s4: ["M2 8 C160 3, 320 13, 470 8 C600 4, 720 11, 848 8", "1.1s", "880"],
  s5: ["M2 8 C140 3, 300 12, 440 7 C580 2, 700 11, 848 7", "1.2s", "880"],
  s6: ["M2 8 C160 3, 340 13, 490 8 C620 4, 730 10, 848 8", ".8s", "8 10"],
  s8: ["M2 8 C140 3, 300 12, 440 7 C580 2, 700 11, 848 7", "1.2s", "880"],
} as const;

const mobile = {
  s1: "M2 7 C88 3, 172 11, 248 6 C294 3, 320 5, 338 8",
  s2: "M2 7 C92 2, 176 11, 252 7 C296 4, 322 6, 338 8",
  s3: "M2 7 C88 3, 172 11, 248 6 C294 3, 320 5, 338 8",
  s4: "M2 7 C92 2, 176 11, 252 7 C296 4, 322 6, 338 8",
  s5: "M2 7 C88 3, 172 11, 248 6 C294 3, 320 5, 338 8",
  s6: "M2 7 C92 2, 180 11, 254 7 C296 4, 322 6, 338 8",
  s8: "M2 7 C88 3, 172 11, 248 6 C294 3, 320 5, 338 8",
} as const;

export function CaseSectionUnderline({ id }: { id: keyof typeof desktop }) {
  const d = desktop[id];
  const dashed = id === "s6";
  return (
    <>
      <svg
        width="100%"
        height="12"
        viewBox="0 0 340 12"
        preserveAspectRatio="none"
        className="layout:hidden mt-2.5 block overflow-visible"
        aria-hidden="true"
      >
        <path
          className="ink"
          d={mobile[id]}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeDasharray={dashed ? "8 10" : "360"}
          strokeDashoffset={dashed ? undefined : "360"}
          data-anim=""
          style={{
            // The mobile export uses one duration for every underline, unlike desktop.
            ...paused(`${dashed ? "fi .8s ease" : "dw 1.1s cubic-bezier(.33,1,.68,1)"} forwards`),
            opacity: dashed ? 0 : undefined,
            strokeWidth: inkStroke(dashed ? "1.8" : "2.4"),
          }}
        />
      </svg>
      <svg
        width="100%"
        height={dashed ? "16" : "14"}
        viewBox={`0 0 850 ${dashed ? 16 : 14}`}
        preserveAspectRatio="none"
        className="layout:block mt-3 hidden"
        aria-hidden="true"
      >
        <path
          className="ink"
          d={d[0]}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeDasharray={d[2]}
          strokeDashoffset={dashed ? undefined : d[2]}
          data-anim=""
          style={{
            ...paused(
              `${dashed ? "fi" : "dw"} ${d[1]} ${dashed ? "ease" : "cubic-bezier(.33,1,.68,1)"} forwards`,
            ),
            opacity: dashed ? 0 : undefined,
            strokeWidth: inkStroke(dashed ? "1.8" : "2.4"),
          }}
        />
      </svg>
    </>
  );
}

export function DecisionCircle({ number, index }: { number: string; index: number }) {
  const circle = (mobileGeometry: boolean) => (
    <>
      <circle
        className="ink"
        cx="33"
        cy="33"
        r="26"
        fill="none"
        stroke="currentColor"
        strokeDasharray="170"
        strokeDashoffset="170"
        data-anim=""
        style={{
          ...paused(
            `dw .8s ${index ? `.${index * (mobileGeometry ? 15 : 2)}s ` : ""}cubic-bezier(.33,1,.68,1) forwards`,
          ),
          strokeWidth: inkStroke(mobileGeometry ? "1.9" : "1.8"),
        }}
      />
      <text
        x="33"
        y="41"
        textAnchor="middle"
        className="fill-current font-mono text-[19px] font-bold"
      >
        {number}
      </text>
    </>
  );

  return (
    <>
      <svg
        width="46"
        height="46"
        viewBox="0 0 66 66"
        className="layout:hidden overflow-visible"
        aria-hidden="true"
      >
        {circle(true)}
      </svg>
      <svg
        width="66"
        height="66"
        viewBox="0 0 66 66"
        className="layout:block hidden overflow-visible"
        aria-hidden="true"
      >
        {circle(false)}
      </svg>
    </>
  );
}

export function SectionSevenArrow() {
  return (
    <svg
      width="110"
      height="86"
      viewBox="0 0 110 86"
      className="layout:block pointer-events-none absolute top-3 right-0 hidden h-16 w-[82px] opacity-45"
      aria-hidden="true"
    >
      <g
        className="ink"
        fill="none"
        stroke="currentColor"
        style={{ strokeWidth: inkStroke(1.8) }}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Tail sits in the corner; the head points back at the section heading. */}
        <path d="M100 34 A80 80 0 0 0 14 54" />
        <path d="M25.4 50.2 L14 54 L17.2 42.4" />
      </g>
    </svg>
  );
}
