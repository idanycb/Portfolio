import type { CSSProperties } from "react";

import type { CaseStudySectionData } from "@/content/case-studies";
import { inkStroke } from "@/shared/drawn-layer/ink-stroke";
import { ResponsiveCopy } from "@/shared/responsive-copy";

const paused = (animation: string): CSSProperties => ({ animation, animationPlayState: "paused" });

function SvgStepLabel({ title, x, y }: { title: string; x: number; y: number }) {
  const words = title.split(" ");
  const splitAt =
    title.length > 15 && words.length > 1 ? Math.ceil(words.length / 2) : words.length;
  const lines = [words.slice(0, splitAt).join(" "), words.slice(splitAt).join(" ")].filter(Boolean);

  return (
    <text x={x} y={y} textAnchor="middle">
      {lines.map((line, index) => (
        <tspan key={line} x={x} dy={index === 0 ? 0 : 22}>
          {line}
        </tspan>
      ))}
    </text>
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
        <svg width="100%" viewBox="0 0 300 360" className="tablet:hidden block" role="img">
          <title>{diagram.label}</title>
          <g
            className="ink"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M16 24 L134 24 L134 172 L16 172 Z"
              strokeDasharray="540"
              strokeDashoffset="540"
              data-anim=""
              style={{
                ...paused("dw .85s cubic-bezier(.33,1,.68,1) forwards"),
                strokeWidth: inkStroke(1.7),
              }}
            />
            <path
              d="M62 52 L180 52 L180 200 L62 200 Z"
              strokeDasharray="540"
              strokeDashoffset="540"
              data-anim=""
              style={{
                ...paused("dw .85s .24s cubic-bezier(.33,1,.68,1) forwards"),
                strokeWidth: inkStroke(1.7),
              }}
            />
            <path
              d="M108 80 L226 80 L226 228 L108 228 Z"
              strokeDasharray="540"
              strokeDashoffset="540"
              data-anim=""
              style={{
                ...paused("dw .85s .48s cubic-bezier(.33,1,.68,1) forwards"),
                strokeWidth: inkStroke(1.7),
              }}
            />
            <path
              d="M128 128 L206 128 M128 150 L206 150 M128 172 L176 172"
              strokeDasharray="220"
              strokeDashoffset="220"
              data-anim=""
              style={{ ...paused("dw .7s 1.05s ease forwards"), strokeWidth: inkStroke(1.3) }}
            />
            <path
              d="M46 272 C46 256, 66 244, 96 244 L206 244 C236 244, 256 256, 256 272 C256 288, 236 300, 206 300 L96 300 C66 300, 46 288, 46 272 Z"
              strokeDasharray="700"
              strokeDashoffset="700"
              data-anim=""
              style={{
                ...paused("dw 1.2s 1.1s cubic-bezier(.33,1,.68,1) forwards"),
                strokeWidth: inkStroke(1.8),
              }}
            />
            <path
              d="M168 232 L168 240 M162 231 L168 242 L174 231"
              strokeDasharray="40"
              strokeDashoffset="40"
              data-anim=""
              style={{ ...paused("dw .3s 2.1s ease forwards"), strokeWidth: inkStroke(1.6) }}
            />
            <path
              d="M266 254 L282 240 M272 272 L290 272 M266 290 L282 304"
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
            <text x="26" y="18">
              10-K
            </text>
            <text x="74" y="46">
              10-K/A
            </text>
            <text x="120" y="74">
              10-K/A #2
            </text>
            <text x="92" y="268">
              which one is true?
            </text>
            <text x="46" y="334" className="fill-copy-muted text-[15px]">
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
            <text x="52" y="40">
              10-K
            </text>
            <text x="204" y="58">
              10-K/A
            </text>
            <text x="356" y="76">
              10-K/A #2
            </text>
            <text x="576" y="148">
              which one
            </text>
            <text x="596" y="174">
              is true?
            </text>
            <text x="104" y="274" className="fill-copy-muted text-[16px]">
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

export function PipelineDiagram({
  pipeline,
}: {
  pipeline: NonNullable<CaseStudySectionData["pipeline"]>;
}) {
  return (
    <figure className="mt-7">
      <div className="border-signature border-ink bg-paper-light tablet:p-[26px] p-3">
        <svg width="100%" viewBox="0 0 300 462" className="tablet:hidden block" role="img">
          <title>{pipeline.caption}</title>
          <desc>{pipeline.steps.map((step) => `${step.title}: ${step.detail}`).join(". ")}</desc>
          <g
            className="ink"
            stroke="currentColor"
            fill="none"
            style={{ strokeWidth: inkStroke(1.7) }}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M22 12 L278 12 L278 62 L22 62 Z"
              strokeDasharray="620"
              strokeDashoffset="620"
              data-anim=""
              style={paused("dw .8s cubic-bezier(.33,1,.68,1) forwards")}
            />
            <path
              d="M22 88 L278 88 L278 138 L22 138 Z"
              strokeDasharray="620"
              strokeDashoffset="620"
              data-anim=""
              style={paused("dw .8s .22s cubic-bezier(.33,1,.68,1) forwards")}
            />
            <path
              d="M22 164 L278 164 L278 214 L22 214 Z"
              strokeDasharray="620"
              strokeDashoffset="620"
              data-anim=""
              style={paused("dw .8s .44s cubic-bezier(.33,1,.68,1) forwards")}
            />
            <path
              d="M32 248 C32 242, 86 236, 150 236 C214 236, 268 242, 268 248 L268 302 C268 308, 214 314, 150 314 C86 314, 32 308, 32 302 Z"
              strokeDasharray="700"
              strokeDashoffset="700"
              data-anim=""
              style={paused("dw .95s .66s cubic-bezier(.33,1,.68,1) forwards")}
            />
            <path
              d="M32 248 C32 254, 86 260, 150 260 C214 260, 268 254, 268 248"
              strokeDasharray="240"
              strokeDashoffset="240"
              data-anim=""
              style={paused("dw .5s 1.4s ease forwards")}
            />
            <path
              d="M26 344 C26 338, 30 334, 36 334 L264 334 C270 334, 274 338, 274 344 L274 388 C274 394, 270 398, 264 398 L36 398 C30 398, 26 394, 26 388 Z"
              strokeDasharray="700"
              strokeDashoffset="700"
              data-anim=""
              style={paused("dw .95s .88s cubic-bezier(.33,1,.68,1) forwards")}
            />
            <path
              d="M22 424 L278 424 L278 452 L22 452 Z"
              strokeDasharray="620"
              strokeDashoffset="620"
              data-anim=""
              style={paused("dw .8s 1.1s ease forwards")}
            />
            <path
              d="M150 64 L150 84 M144 75 L150 86 L156 75"
              strokeDasharray="46"
              strokeDashoffset="46"
              data-anim=""
              style={paused("dw .3s 1.2s ease forwards")}
            />
            <path
              d="M150 140 L150 160 M144 151 L150 162 L156 151"
              strokeDasharray="46"
              strokeDashoffset="46"
              data-anim=""
              style={paused("dw .3s 1.35s ease forwards")}
            />
            <path
              d="M150 216 L150 234 M144 225 L150 236 L156 225"
              strokeDasharray="46"
              strokeDashoffset="46"
              data-anim=""
              style={paused("dw .3s 1.5s ease forwards")}
            />
            <path
              d="M150 316 L150 332 M144 323 L150 334 L156 323"
              strokeDasharray="46"
              strokeDashoffset="46"
              data-anim=""
              style={paused("dw .3s 1.65s ease forwards")}
            />
            <path
              d="M150 400 L150 420 M144 411 L150 422 L156 411"
              strokeDasharray="46"
              strokeDashoffset="46"
              data-anim=""
              style={paused("dw .3s 1.8s ease forwards")}
            />
          </g>
          <g
            className="font-hand fill-current text-[16px]"
            data-anim=""
            style={{ ...paused("fi .7s .9s ease forwards"), opacity: 0 }}
          >
            {pipeline.steps.map((step, index) => (
              <SvgStepLabel
                key={step.title}
                title={step.title}
                x={150}
                y={[43, 119, 195, 276, 374, 445][index]}
              />
            ))}
          </g>
        </svg>
        <svg
          width="100%"
          height="330"
          viewBox="0 0 800 330"
          className="tablet:block hidden"
          role="img"
        >
          <title>{pipeline.caption}</title>
          <desc>{pipeline.steps.map((step) => `${step.title}: ${step.detail}`).join(". ")}</desc>
          <g
            className="ink"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M30 40 L206 40 L206 96 L30 96 Z"
              strokeDasharray="470"
              strokeDashoffset="470"
              data-anim=""
              style={{
                ...paused("dw .85s cubic-bezier(.33,1,.68,1) forwards"),
                strokeWidth: inkStroke(1.8),
              }}
            />
            <path
              d="M312 40 L488 40 L488 96 L312 96 Z"
              strokeDasharray="470"
              strokeDashoffset="470"
              data-anim=""
              style={{
                ...paused("dw .85s .25s cubic-bezier(.33,1,.68,1) forwards"),
                strokeWidth: inkStroke(1.8),
              }}
            />
            <path
              d="M594 40 L770 40 L770 96 L594 96 Z"
              strokeDasharray="470"
              strokeDashoffset="470"
              data-anim=""
              style={{
                ...paused("dw .85s .5s cubic-bezier(.33,1,.68,1) forwards"),
                strokeWidth: inkStroke(1.8),
              }}
            />
            <path
              d="M212 68 L305 68"
              strokeDasharray="96"
              strokeDashoffset="96"
              data-anim=""
              style={{ ...paused("dw .35s 1s ease forwards"), strokeWidth: inkStroke(1.7) }}
            />
            <path
              d="M296 61 L307 68 L296 75"
              strokeDasharray="30"
              strokeDashoffset="30"
              data-anim=""
              style={{ ...paused("dw .18s 1.32s ease forwards"), strokeWidth: inkStroke(1.7) }}
            />
            <path
              d="M494 68 L587 68"
              strokeDasharray="96"
              strokeDashoffset="96"
              data-anim=""
              style={{ ...paused("dw .35s 1.15s ease forwards"), strokeWidth: inkStroke(1.7) }}
            />
            <path
              d="M578 61 L589 68 L578 75"
              strokeDasharray="30"
              strokeDashoffset="30"
              data-anim=""
              style={{ ...paused("dw .18s 1.47s ease forwards"), strokeWidth: inkStroke(1.7) }}
            />
            <path
              d="M682 100 L682 158"
              strokeDasharray="60"
              strokeDashoffset="60"
              data-anim=""
              style={{ ...paused("dw .32s 1.6s ease forwards"), strokeWidth: inkStroke(1.7) }}
            />
            <path
              d="M675 148 L682 160 L689 148"
              strokeDasharray="30"
              strokeDashoffset="30"
              data-anim=""
              style={{ ...paused("dw .18s 1.9s ease forwards"), strokeWidth: inkStroke(1.7) }}
            />
            <path
              d="M540 166 C540 162, 544 158, 550 158 L764 158 C770 158, 774 162, 774 168 L774 236 C774 242, 770 246, 764 246 L550 246 C544 246, 540 242, 540 236 Z"
              strokeDasharray="800"
              strokeDashoffset="800"
              data-anim=""
              style={{
                ...paused("dw 1.1s 2s cubic-bezier(.33,1,.68,1) forwards"),
                strokeWidth: inkStroke(1.8),
              }}
            />
            <path
              d="M44 178 C44 170, 92 164, 136 164 C180 164, 228 170, 228 178 L228 264 C228 273, 180 279, 136 279 C92 279, 44 273, 44 264 Z"
              strokeDasharray="640"
              strokeDashoffset="640"
              data-anim=""
              style={{
                ...paused("dw 1.05s 2.2s cubic-bezier(.33,1,.68,1) forwards"),
                strokeWidth: inkStroke(1.8),
              }}
            />
            <path
              d="M44 178 C44 187, 92 193, 136 193 C180 193, 228 187, 228 178"
              strokeDasharray="200"
              strokeDashoffset="200"
              data-anim=""
              style={{ ...paused("dw .5s 2.85s ease forwards"), strokeWidth: inkStroke(1.6) }}
            />
            <path
              d="M234 226 C320 222, 448 210, 532 200"
              strokeDasharray="310"
              strokeDashoffset="310"
              data-anim=""
              style={{
                ...paused("dw .7s 2.95s cubic-bezier(.33,1,.68,1) forwards"),
                strokeWidth: inkStroke(1.7),
              }}
            />
            <path
              d="M522 192 L534 199 L523 207"
              strokeDasharray="30"
              strokeDashoffset="30"
              data-anim=""
              style={{ ...paused("dw .18s 3.5s ease forwards"), strokeWidth: inkStroke(1.7) }}
            />
            <path
              d="M136 281 L136 314"
              strokeDasharray="36"
              strokeDashoffset="36"
              data-anim=""
              style={{ ...paused("dw .28s 3.3s ease forwards"), strokeWidth: inkStroke(1.7) }}
            />
            <path
              d="M129 304 L136 316 L143 304"
              strokeDasharray="30"
              strokeDashoffset="30"
              data-anim=""
              style={{ ...paused("dw .18s 3.6s ease forwards"), strokeWidth: inkStroke(1.7) }}
            />
          </g>
          <g
            className="font-hand fill-current text-[17px]"
            data-anim=""
            style={{ ...paused("fi .7s 1.1s ease forwards"), opacity: 0 }}
          >
            {pipeline.steps.map((step, index) => (
              <SvgStepLabel
                key={step.title}
                title={step.title}
                x={[118, 400, 682, 136, 657, 136][index]}
                y={[76, 76, 76, 220, 196, 328][index]}
              />
            ))}
          </g>
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
