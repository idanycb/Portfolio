import type { CSSProperties } from "react";

const paused = (animation: string): CSSProperties => ({ animation, animationPlayState: "paused" });

export function CaseHeroDocument() {
  return (
    <svg
      width="300"
      height="230"
      viewBox="0 0 300 230"
      className="pointer-events-none absolute -top-2 right-2 h-[52px] w-[68px] overflow-visible opacity-[.13] layout:top-5 layout:right-[26px] layout:h-[clamp(10.5rem,15.3vw,14.375rem)] layout:w-[clamp(13.75rem,20vw,18.75rem)] layout:opacity-[.17]"
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="currentColor"
        className="ink [stroke-width:2.6] layout:[stroke-width:1.8]"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M66 30 L192 30 L236 74 L236 200 L66 200 Z" />
        <path d="M192 30 L192 74 L236 74" />
        <path d="M94 106 L208 106 M94 130 L208 130 M94 154 L166 154" />
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
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M64 10 C48 18, 30 27, 14 40" />
        <path d="M26 38 C20 39, 15 41, 13 42 C13 37, 14 32, 15 27" />
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
        className="mt-2.5 block overflow-visible layout:hidden"
        aria-hidden="true"
      >
        <path
          className="ink"
          d={mobile[id]}
          fill="none"
          stroke="currentColor"
          strokeWidth={dashed ? "1.8" : "2.4"}
          strokeLinecap="round"
          strokeDasharray={dashed ? "8 10" : "360"}
          strokeDashoffset={dashed ? undefined : "360"}
          data-anim=""
          style={{
            ...paused(
              `${dashed ? "fi" : "dw"} ${d[1]} ${dashed ? "ease" : "cubic-bezier(.33,1,.68,1)"} forwards`,
            ),
            opacity: dashed ? 0 : undefined,
          }}
        />
      </svg>
      <svg
        width="100%"
        height={dashed ? "16" : "14"}
        viewBox={`0 0 850 ${dashed ? 16 : 14}`}
        preserveAspectRatio="none"
        className="mt-3 hidden layout:block"
        aria-hidden="true"
      >
        <path
          className="ink"
          d={d[0]}
          fill="none"
          stroke="currentColor"
          strokeWidth={dashed ? "1.8" : "2.4"}
          strokeLinecap="round"
          strokeDasharray={d[2]}
          strokeDashoffset={dashed ? undefined : d[2]}
          data-anim=""
          style={{
            ...paused(
              `${dashed ? "fi" : "dw"} ${d[1]} ${dashed ? "ease" : "cubic-bezier(.33,1,.68,1)"} forwards`,
            ),
            opacity: dashed ? 0 : undefined,
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
        strokeWidth={mobileGeometry ? "1.9" : "1.8"}
        strokeDasharray="170"
        strokeDashoffset="170"
        data-anim=""
        style={paused(
          `dw .8s ${index ? `.${index * (mobileGeometry ? 15 : 2)}s ` : ""}cubic-bezier(.33,1,.68,1) forwards`,
        )}
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
        className="overflow-visible layout:hidden"
        aria-hidden="true"
      >
        {circle(true)}
      </svg>
      <svg
        width="66"
        height="66"
        viewBox="0 0 66 66"
        className="hidden overflow-visible layout:block"
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
      className="pointer-events-none absolute top-3 right-0 hidden h-16 w-[82px] opacity-45 layout:block"
      aria-hidden="true"
    >
      <g
        className="ink"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 66 C34 22, 74 12, 98 36" />
        <path d="M80 32 C87 32, 94 34, 98 34 C97 40, 96 47, 94 53" />
      </g>
    </svg>
  );
}
