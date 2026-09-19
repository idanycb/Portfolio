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
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="300"
        strokeDashoffset="300"
        style={{ animation: "dw 1.1s 1.1s cubic-bezier(.33,1,.68,1) forwards" }}
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
        className="overflow-visible layout:hidden"
        aria-hidden="true"
      >
        <g
          className="ink"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M34 34 C24 26, 16 16, 12 6"
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
        className="hidden layout:block"
        aria-hidden="true"
      >
        <g
          className="ink"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M40 52 C30 40, 24 26, 22 8"
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
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M100 8 C88 30, 62 46, 30 54"
          strokeDasharray="130"
          strokeDashoffset="130"
          style={{ animation: "dw .9s 1.4s cubic-bezier(.33,1,.68,1) forwards" }}
        />
        <path
          d="M42 42 C36 49, 32 53, 28 55 C33 58, 38 61, 43 65"
          strokeDasharray="60"
          strokeDashoffset="60"
          style={{ animation: "dw .4s 2.2s ease forwards" }}
        />
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
        className={`block overflow-visible layout:hidden ${className}`}
        aria-hidden="true"
      >
        <path
          className="ink"
          d={mobile.d}
          fill="none"
          stroke="currentColor"
          strokeWidth={mobile.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={mobile.dash}
          strokeDashoffset={isArchive ? undefined : mobile.dash}
          data-anim=""
          style={{ ...paused(mobile.animation), opacity: isArchive ? 0 : undefined }}
        />
      </svg>
      <svg
        width="100%"
        height={isArchive ? "16" : "18"}
        viewBox={desktop.viewBox}
        preserveAspectRatio="none"
        className={`hidden layout:block ${className}`}
        aria-hidden="true"
      >
        <path
          className="ink"
          d={desktop.d}
          fill="none"
          stroke="currentColor"
          strokeWidth={desktop.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={desktop.dash}
          strokeDashoffset={isArchive ? undefined : desktop.dash}
          data-anim=""
          style={{ ...paused(desktop.animation), opacity: isArchive ? 0 : undefined }}
        />
      </svg>
    </>
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
        className="my-[34px] block overflow-visible layout:hidden"
        aria-hidden="true"
      >
        <path
          className="ink"
          d="M2 8 C90 3, 180 12, 250 7 C295 4, 320 6, 338 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="8 11"
          data-anim=""
          style={{ ...paused("fi .9s ease forwards"), opacity: 0 }}
        />
      </svg>
      <svg
        width="100%"
        height="18"
        viewBox="0 0 1072 18"
        preserveAspectRatio="none"
        className="my-10 hidden layout:block"
        aria-hidden="true"
      >
        <path
          className="ink"
          d="M3 10 C180 4, 430 15, 640 9 C830 4, 960 7, 1069 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="9 12"
          data-anim=""
          style={{ ...paused("fi .9s ease forwards"), opacity: 0 }}
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

export function FinDocHomeDiagram() {
  return (
    <>
      <DiagramShell viewBox="0 0 300 462" className="block layout:hidden">
        <title>FinDoc ingestion, retrieval, and cited-answer pipeline</title>
        <g
          className="ink"
          stroke="currentColor"
          fill="none"
          strokeWidth="1.7"
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
          textAnchor="middle"
          data-anim=""
          style={{ ...paused("fi .7s .9s ease forwards"), opacity: 0 }}
        >
          <text x="150" y="43">
            EDGAR pull
          </text>
          <text x="150" y="119">
            Docling parse
          </text>
          <text x="150" y="195">
            chunk + embed
          </text>
          <text x="150" y="276">
            pgvector + lineage
          </text>
          <text x="150" y="374">
            progressive retrieval
          </text>
          <text x="150" y="445">
            cited answer
          </text>
        </g>
      </DiagramShell>
      <DiagramShell viewBox="0 0 472 330" className="hidden layout:block">
        <title>FinDoc ingestion, retrieval, and cited-answer pipeline</title>
        <g
          className="ink"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M16 34 L140 34 L140 82 L16 82 Z"
            strokeWidth="1.7"
            strokeDasharray="350"
            strokeDashoffset="350"
            data-anim=""
            style={paused("dw .8s cubic-bezier(.33,1,.68,1) forwards")}
          />
          <path
            d="M180 34 L302 34 L302 82 L180 82 Z"
            strokeWidth="1.7"
            strokeDasharray="350"
            strokeDashoffset="350"
            data-anim=""
            style={paused("dw .8s .24s cubic-bezier(.33,1,.68,1) forwards")}
          />
          <path
            d="M342 34 L456 34 L456 82 L342 82 Z"
            strokeWidth="1.7"
            strokeDasharray="350"
            strokeDashoffset="350"
            data-anim=""
            style={paused("dw .8s .48s cubic-bezier(.33,1,.68,1) forwards")}
          />
          <path
            d="M144 58 L175 58"
            strokeWidth="1.7"
            strokeDasharray="34"
            strokeDashoffset="34"
            data-anim=""
            style={paused("dw .26s .95s ease forwards")}
          />
          <path
            d="M167 52 L176 58 L167 64"
            strokeWidth="1.7"
            strokeDasharray="26"
            strokeDashoffset="26"
            data-anim=""
            style={paused("dw .18s 1.18s ease forwards")}
          />
          <path
            d="M306 58 L337 58"
            strokeWidth="1.7"
            strokeDasharray="34"
            strokeDashoffset="34"
            data-anim=""
            style={paused("dw .26s 1.1s ease forwards")}
          />
          <path
            d="M329 52 L338 58 L329 64"
            strokeWidth="1.7"
            strokeDasharray="26"
            strokeDashoffset="26"
            data-anim=""
            style={paused("dw .18s 1.33s ease forwards")}
          />
          <path
            d="M399 86 L399 148"
            strokeWidth="1.7"
            strokeDasharray="64"
            strokeDashoffset="64"
            data-anim=""
            style={paused("dw .34s 1.48s ease forwards")}
          />
          <path
            d="M393 139 L399 150 L405 139"
            strokeWidth="1.7"
            strokeDasharray="28"
            strokeDashoffset="28"
            data-anim=""
            style={paused("dw .18s 1.8s ease forwards")}
          />
          <path
            d="M318 154 C318 151, 321 148, 326 148 L456 148 C461 148, 464 151, 464 156 L464 208 C464 213, 461 216, 456 216 L326 216 C321 216, 318 213, 318 208 Z"
            strokeWidth="1.8"
            strokeDasharray="540"
            strokeDashoffset="540"
            data-anim=""
            style={paused("dw 1s 1.92s cubic-bezier(.33,1,.68,1) forwards")}
          />
          <path
            d="M26 166 C26 160, 58 156, 88 156 C118 156, 150 160, 150 166 L150 240 C150 247, 118 251, 88 251 C58 251, 26 247, 26 240 Z"
            strokeWidth="1.7"
            strokeDasharray="470"
            strokeDashoffset="470"
            data-anim=""
            style={paused("dw .95s 2.14s cubic-bezier(.33,1,.68,1) forwards")}
          />
          <path
            d="M26 166 C26 173, 58 177, 88 177 C118 177, 150 173, 150 166"
            strokeWidth="1.6"
            strokeDasharray="140"
            strokeDashoffset="140"
            data-anim=""
            style={paused("dw .45s 2.7s ease forwards")}
          />
          <path
            d="M154 206 C210 203, 274 192, 314 184"
            strokeWidth="1.7"
            strokeDasharray="170"
            strokeDashoffset="170"
            data-anim=""
            style={paused("dw .55s 2.8s cubic-bezier(.33,1,.68,1) forwards")}
          />
          <path
            d="M305 177 L315 183 L305 190"
            strokeWidth="1.7"
            strokeDasharray="30"
            strokeDashoffset="30"
            data-anim=""
            style={paused("dw .18s 3.2s ease forwards")}
          />
          <path
            d="M88 253 L88 292"
            strokeWidth="1.7"
            strokeDasharray="42"
            strokeDashoffset="42"
            data-anim=""
            style={paused("dw .3s 3.05s ease forwards")}
          />
          <path
            d="M82 283 L88 294 L94 283"
            strokeWidth="1.7"
            strokeDasharray="28"
            strokeDashoffset="28"
            data-anim=""
            style={paused("dw .18s 3.32s ease forwards")}
          />
        </g>
        <g
          className="font-hand fill-current text-[15px]"
          data-anim=""
          style={{ ...paused("fi .7s 1.05s ease forwards"), opacity: 0 }}
        >
          <text x="32" y="64">
            EDGAR pull
          </text>
          <text x="194" y="64">
            Docling parse
          </text>
          <text x="352" y="64">
            chunk + embed
          </text>
          <text x="42" y="200">
            pgvector
          </text>
          <text x="42" y="222">
            + lineage
          </text>
          <text x="336" y="178">
            progressive
          </text>
          <text x="336" y="199">
            retrieval
          </text>
          <text x="30" y="302">
            cited answer
          </text>
        </g>
        <g data-anim="" style={{ ...paused("fi .6s 3.5s ease forwards"), opacity: 0 }}>
          <text
            x="176"
            y="286"
            className="font-hand fill-copy-muted text-[15px]"
            transform="rotate(-2 176 286)"
          >
            ← the amendment problem lives here
          </text>
        </g>
      </DiagramShell>
    </>
  );
}

export function GitOpsHomeDiagram() {
  return (
    <>
      <DiagramShell viewBox="0 0 300 308" className="block layout:hidden">
        <title>GitOps deployment loop</title>
        <g
          className="ink"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M10 30 C10 22, 16 16, 26 16 L274 16 C284 16, 290 22, 290 32 L290 276 C290 286, 284 292, 274 292 L26 292 C16 292, 10 286, 10 276 Z"
            strokeWidth="1.6"
            strokeDasharray="1080"
            strokeDashoffset="1080"
            data-anim=""
            style={paused("dw 1.4s cubic-bezier(.33,1,.68,1) forwards")}
          />
          <path
            d="M34 66 L140 66 L140 118 L34 118 Z"
            strokeWidth="1.6"
            strokeDasharray="320"
            strokeDashoffset="320"
            data-anim=""
            style={paused("dw .7s .5s ease forwards")}
          />
          <path
            d="M162 66 L266 66 L266 118 L162 118 Z"
            strokeWidth="1.6"
            strokeDasharray="320"
            strokeDashoffset="320"
            data-anim=""
            style={paused("dw .7s .7s ease forwards")}
          />
          <path
            d="M34 186 L140 186 L140 238 L34 238 Z"
            strokeWidth="1.6"
            strokeDasharray="320"
            strokeDashoffset="320"
            data-anim=""
            style={paused("dw .7s .9s ease forwards")}
          />
          <path
            d="M162 186 L266 186 L266 238 L162 238 Z"
            strokeWidth="1.6"
            strokeDasharray="320"
            strokeDashoffset="320"
            data-anim=""
            style={paused("dw .7s 1.1s ease forwards")}
          />
          <path
            d="M144 92 L157 92 M150 86 L158 92 L150 98"
            strokeWidth="1.6"
            strokeDasharray="40"
            strokeDashoffset="40"
            data-anim=""
            style={paused("dw .3s 1.3s ease forwards")}
          />
          <path
            d="M87 122 L87 182 M81 173 L87 184 L93 173"
            strokeWidth="1.6"
            strokeDasharray="90"
            strokeDashoffset="90"
            data-anim=""
            style={paused("dw .4s 1.45s ease forwards")}
          />
          <path
            d="M214 122 L214 182 M208 173 L214 184 L220 173"
            strokeWidth="1.6"
            strokeDasharray="90"
            strokeDashoffset="90"
            data-anim=""
            style={paused("dw .4s 1.6s ease forwards")}
          />
          <path
            d="M110 258 C134 272, 168 272, 192 258 M184 252 L194 257 L188 266"
            strokeWidth="1.6"
            strokeDasharray="130"
            strokeDashoffset="130"
            data-anim=""
            style={paused("dw .55s 1.75s ease forwards")}
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
            Traefik + TLS
          </text>
          <text x="214" y="229">
            K3S · OCI ARM
          </text>
          <text x="150" y="291">
            reconciles itself ↻
          </text>
        </g>
      </DiagramShell>
      <DiagramShell viewBox="0 0 472 300" className="hidden layout:block">
        <title>GitOps deployment loop</title>
        <g
          className="ink"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M18 26 C18 21, 22 18, 28 18 L444 18 C450 18, 454 21, 454 27 L454 268 C454 274, 450 277, 444 277 L28 277 C22 277, 18 274, 18 268 Z"
            strokeWidth="1.6"
            strokeDasharray="1400"
            strokeDashoffset="1400"
            data-anim=""
            style={paused("dw 1.7s cubic-bezier(.33,1,.68,1) forwards")}
          />
          <path
            d="M52 66 L172 66 L172 112 L52 112 Z"
            strokeWidth="1.6"
            strokeDasharray="340"
            strokeDashoffset="340"
            data-anim=""
            style={paused("dw .7s .65s ease forwards")}
          />
          <path
            d="M304 66 L424 66 L424 112 L304 112 Z"
            strokeWidth="1.6"
            strokeDasharray="340"
            strokeDashoffset="340"
            data-anim=""
            style={paused("dw .7s .9s ease forwards")}
          />
          <path
            d="M52 186 L172 186 L172 232 L52 232 Z"
            strokeWidth="1.6"
            strokeDasharray="340"
            strokeDashoffset="340"
            data-anim=""
            style={paused("dw .7s 1.15s ease forwards")}
          />
          <path
            d="M304 186 L424 186 L424 232 L304 232 Z"
            strokeWidth="1.6"
            strokeDasharray="340"
            strokeDashoffset="340"
            data-anim=""
            style={paused("dw .7s 1.4s ease forwards")}
          />
          <path
            d="M176 89 L299 89"
            strokeWidth="1.6"
            strokeDasharray="126"
            strokeDashoffset="126"
            data-anim=""
            style={paused("dw .45s 1.65s ease forwards")}
          />
          <path
            d="M291 83 L300 89 L291 95"
            strokeWidth="1.6"
            strokeDasharray="26"
            strokeDashoffset="26"
            data-anim=""
            style={paused("dw .18s 2s ease forwards")}
          />
          <path
            d="M112 116 L112 182"
            strokeWidth="1.6"
            strokeDasharray="68"
            strokeDashoffset="68"
            data-anim=""
            style={paused("dw .35s 1.85s ease forwards")}
          />
          <path
            d="M106 173 L112 184 L118 173"
            strokeWidth="1.6"
            strokeDasharray="28"
            strokeDashoffset="28"
            data-anim=""
            style={paused("dw .18s 2.18s ease forwards")}
          />
          <path
            d="M364 116 L364 182"
            strokeWidth="1.6"
            strokeDasharray="68"
            strokeDashoffset="68"
            data-anim=""
            style={paused("dw .35s 2s ease forwards")}
          />
          <path
            d="M358 173 L364 184 L370 173"
            strokeWidth="1.6"
            strokeDasharray="28"
            strokeDashoffset="28"
            data-anim=""
            style={paused("dw .18s 2.33s ease forwards")}
          />
          <path
            d="M196 250 C216 262, 256 262, 276 250"
            strokeWidth="1.6"
            strokeDasharray="100"
            strokeDashoffset="100"
            data-anim=""
            style={paused("dw .5s 2.4s ease forwards")}
          />
          <path
            d="M268 244 L278 249 L272 258"
            strokeWidth="1.6"
            strokeDasharray="26"
            strokeDashoffset="26"
            data-anim=""
            style={paused("dw .18s 2.85s ease forwards")}
          />
        </g>
        <g
          className="font-hand fill-current text-[15px]"
          data-anim=""
          style={{ ...paused("fi .7s 1.35s ease forwards"), opacity: 0 }}
        >
          <text x="78" y="95">
            Git repo
          </text>
          <text x="326" y="95">
            FluxCD
          </text>
          <text x="71" y="215">
            Infisical
          </text>
          <text x="323" y="207">
            Traefik + TLS
          </text>
          <text x="323" y="227">
            K3S · OCI ARM
          </text>
          <text x="194" y="282">
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
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M6 14 C22 8, 44 16, 54 36"
          strokeDasharray="80"
          strokeDashoffset="80"
          data-anim=""
          style={paused("dw .8s cubic-bezier(.33,1,.68,1) forwards")}
        />
        <path
          d="M42 32 C47 33, 52 35, 55 37 C54 41, 52 46, 50 51"
          strokeDasharray="40"
          strokeDashoffset="40"
          data-anim=""
          style={paused("dw .3s .8s ease forwards")}
        />
      </g>
    </svg>
  );
}

const experienceIcons = [
  <>
    <path
      key="a"
      d="M12 14 C12 10, 15 8, 20 8 L92 8 C97 8, 100 10, 100 15 L100 68 C100 73, 97 75, 92 75 L20 75 C15 75, 12 73, 12 68 Z"
      strokeWidth="1.8"
      strokeDasharray="320"
      strokeDashoffset="320"
      data-anim=""
      style={paused("dw .9s cubic-bezier(.33,1,.68,1) forwards")}
    />
    <path
      key="b"
      d="M12 24 L100 24"
      strokeWidth="1.6"
      strokeDasharray="90"
      strokeDashoffset="90"
      data-anim=""
      style={paused("dw .4s .7s ease forwards")}
    />
    <circle
      key="c"
      cx="22"
      cy="16"
      r="2.6"
      strokeWidth="1.4"
      data-anim=""
      style={{ ...paused("fi .3s .95s ease forwards"), opacity: 0 }}
    />
    <circle
      key="d"
      cx="32"
      cy="16"
      r="2.6"
      strokeWidth="1.4"
      data-anim=""
      style={{ ...paused("fi .3s 1.05s ease forwards"), opacity: 0 }}
    />
    <circle
      key="e"
      cx="42"
      cy="16"
      r="2.6"
      strokeWidth="1.4"
      data-anim=""
      style={{ ...paused("fi .3s 1.15s ease forwards"), opacity: 0 }}
    />
    <path
      key="f"
      d="M26 40 L62 40 M26 52 L84 52 M26 63 L52 63"
      strokeWidth="1.6"
      strokeDasharray="180"
      strokeDashoffset="180"
      data-anim=""
      style={paused("dw .8s .95s ease forwards")}
    />
    <path
      key="g"
      d="M46 78 L46 86 M30 88 L82 88"
      strokeWidth="1.6"
      strokeDasharray="70"
      strokeDashoffset="70"
      data-anim=""
      style={paused("dw .4s 1.5s ease forwards")}
    />
  </>,
  <>
    <path
      key="a"
      d="M59 10 L108 30 L59 50 L10 30 Z"
      strokeWidth="1.8"
      strokeDasharray="230"
      strokeDashoffset="230"
      data-anim=""
      style={paused("dw 1s cubic-bezier(.33,1,.68,1) forwards")}
    />
    <path
      key="b"
      d="M28 38 L28 62 C28 72, 90 72, 90 62 L90 38"
      strokeWidth="1.7"
      strokeDasharray="150"
      strokeDashoffset="150"
      data-anim=""
      style={paused("dw .7s .8s ease forwards")}
    />
    <path
      key="c"
      d="M104 32 L104 66"
      strokeWidth="1.6"
      strokeDasharray="36"
      strokeDashoffset="36"
      data-anim=""
      style={paused("dw .3s 1.3s ease forwards")}
    />
    <path
      key="d"
      d="M104 66 C99 70, 99 78, 104 82 C109 78, 109 70, 104 66 Z"
      strokeWidth="1.5"
      strokeDasharray="46"
      strokeDashoffset="46"
      data-anim=""
      style={paused("dw .35s 1.55s ease forwards")}
    />
    <path
      key="e"
      d="M18 84 L100 84"
      strokeWidth="1.6"
      strokeDasharray="84"
      strokeDashoffset="84"
      data-anim=""
      style={paused("dw .4s 1.8s ease forwards")}
    />
  </>,
  <>
    <path
      key="a"
      d="M59 12 L102 34 L16 34 Z"
      strokeWidth="1.8"
      strokeDasharray="200"
      strokeDashoffset="200"
      data-anim=""
      style={paused("dw .9s cubic-bezier(.33,1,.68,1) forwards")}
    />
    <path
      key="b"
      d="M12 40 L106 40"
      strokeWidth="1.7"
      strokeDasharray="96"
      strokeDashoffset="96"
      data-anim=""
      style={paused("dw .4s .7s ease forwards")}
    />
    <path
      key="c"
      d="M28 44 L28 74 M50 44 L50 74 M68 44 L68 74 M90 44 L90 74"
      strokeWidth="1.6"
      strokeDasharray="130"
      strokeDashoffset="130"
      data-anim=""
      style={paused("dw .8s .95s ease forwards")}
    />
    <path
      key="d"
      d="M12 80 L106 80 M6 88 L112 88"
      strokeWidth="1.7"
      strokeDasharray="210"
      strokeDashoffset="210"
      data-anim=""
      style={paused("dw .6s 1.6s ease forwards")}
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
      className="hidden shrink-0 layout:block"
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
      className="absolute inset-0 h-[42px] w-[42px] overflow-visible layout:h-[46px] layout:w-[46px]"
      aria-hidden="true"
    >
      <path
        className="ink [stroke-width:1.6] layout:[stroke-width:1.5]"
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
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M74 52 C52 54, 28 40, 12 14"
          strokeDasharray="94"
          strokeDashoffset="94"
          data-anim=""
          style={paused("dw .8s cubic-bezier(.33,1,.68,1) forwards")}
        />
        <path
          d="M11 30 C11 23, 11 17, 11 13 C16 15, 22 17, 28 19"
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
      className="archive-outline pointer-events-none absolute inset-0 overflow-visible"
      aria-hidden="true"
    >
      <path
        className="ink"
        d={archivePaths[index]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        strokeDasharray="860"
        strokeDashoffset="860"
        data-anim=""
        style={paused(
          `dw 1.1s ${index ? `.${index * 12}s ` : ""}cubic-bezier(.33,1,.68,1) forwards`,
        )}
      />
    </svg>
  );
}

export function ContactEnvelope({ className }: SvgProps) {
  return (
    <svg width="260" height="200" viewBox="0 0 300 230" className={className} aria-hidden="true">
      <g
        className="ink"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M28 56 C28 48, 34 44, 44 44 L256 44 C266 44, 272 48, 272 58 L272 166 C272 176, 266 180, 256 180 L44 180 C34 180, 28 176, 28 166 Z" />
        <path d="M28 56 L150 132 L272 56" />
        <path d="M118 118 L34 174 M182 118 L266 174" strokeWidth="1.4" />
      </g>
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
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M60 20 C44 8, 26 10, 8 22"
          strokeDasharray="70"
          strokeDashoffset="70"
          data-anim=""
          style={paused("dw .7s cubic-bezier(.33,1,.68,1) forwards")}
        />
        <path
          d="M18 14 C13 17, 9 20, 7 22 C11 25, 15 28, 19 32"
          strokeDasharray="44"
          strokeDashoffset="44"
          data-anim=""
          style={paused("dw .3s .65s ease forwards")}
        />
      </g>
    </svg>
  );
}
