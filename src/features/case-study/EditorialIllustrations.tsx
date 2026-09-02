import type { ReactNode } from "react";

function InkFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 800 330" className="ink-sketch h-auto w-full min-w-[34rem]" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

export function DocumentSketch() {
  return (
    <svg viewBox="0 0 300 230" className="ink-sketch pointer-events-none absolute top-5 right-2 hidden w-48 opacity-[0.17] sm:block lg:right-6 lg:w-72" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M66 30 L192 30 L236 74 L236 200 L66 200 Z" />
      <path d="M192 30 L192 74 L236 74" />
      <path d="M94 106 L208 106 M94 130 L208 130 M94 154 L166 154" />
    </svg>
  );
}

export function HandDrawnUnderline() {
  return <svg viewBox="0 0 480 26" preserveAspectRatio="none" className="ink-sketch pointer-events-none absolute bottom-[-0.75rem] left-0 h-7 w-full" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true"><path d="M6 13 C130 4, 330 6, 474 14" /></svg>;
}

export function RailArrowAnnotation() {
  return <div className="mt-8 hidden lg:block" aria-hidden="true"><svg width="76" height="56" viewBox="0 0 76 56" className="ink-sketch" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M64 10 C48 18, 30 27, 14 40" /><path d="M26 38 C20 39, 15 41, 13 42 C13 37, 14 32, 15 27" /></svg><p className="mt-1 font-annotation text-lg leading-5 text-ink-soft">The rail tracks<br />where you are.</p></div>;
}

export function AmendmentLineageFigure() {
  return (
    <InkFrame label="Three amended filings progress toward a question of which version is true.">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M36 50 L152 50 L152 220 L36 220 Z" strokeWidth="1.8" />
        <path d="M188 68 L304 68 L304 238 L188 238 Z" strokeWidth="1.8" />
        <path d="M340 86 L456 86 L456 256 L340 256 Z" strokeWidth="1.8" />
        <path d="M56 96 L132 96 M56 120 L132 120 M56 144 L106 144" strokeWidth="1.4" />
        <path d="M208 114 L284 114 M208 138 L284 138" strokeWidth="1.4" />
        <path d="M528 152 C528 122, 556 100, 596 100 L680 100 C720 100, 748 124, 748 154 C748 184, 720 206, 680 206 L596 206 C556 206, 528 182, 528 152 Z" strokeWidth="1.8" />
        <path d="M466 156 L520 152 M510 145 L521 152 L510 159" strokeWidth="1.6" />
        <path d="M96 226 C118 250, 208 256, 268 248 M258 241 L270 248 L259 256" strokeWidth="1.5" />
        <path d="M760 132 L774 118 M766 148 L786 148 M760 172 L774 186" strokeWidth="1.5" />
      </g>
      <g className="font-annotation fill-current text-[17px]"><text x="52" y="40">10-K</text><text x="204" y="58">10-K/A</text><text x="356" y="76">10-K/A #2</text><text x="576" y="148">which one</text><text x="596" y="174">is true?</text><text x="104" y="274" className="fill-ink-soft text-[16px]">supersedes parts, not wholes</text></g>
    </InkFrame>
  );
}

export function RetrievalPipelineFigure() {
  return (
    <InkFrame label="FinDoc pulls filings from EDGAR, parses with Docling, embeds chunks with lineage, retrieves progressively, and produces a cited answer.">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 40 L206 40 L206 96 L30 96 Z M312 40 L488 40 L488 96 L312 96 Z M594 40 L770 40 L770 96 L594 96 Z" strokeWidth="1.8" />
        <path d="M212 68 L305 68 M296 61 L307 68 L296 75 M494 68 L587 68 M578 61 L589 68 L578 75 M682 100 L682 158 M675 148 L682 160 L689 148" strokeWidth="1.7" />
        <path d="M540 166 C540 162, 544 158, 550 158 L764 158 C770 158, 774 162, 774 168 L774 236 C774 242, 770 246, 764 246 L550 246 C544 246, 540 242, 540 236 Z" strokeWidth="1.8" />
        <path d="M44 178 C44 170, 92 164, 136 164 C180 164, 228 170, 228 178 L228 264 C228 273, 180 279, 136 279 C92 279, 44 273, 44 264 Z M44 178 C44 187, 92 193, 136 193 C180 193, 228 187, 228 178" strokeWidth="1.8" />
        <path d="M234 226 C320 222, 448 210, 532 200 M522 192 L534 199 L523 207 M136 281 L136 314 M129 304 L136 316 L143 304" strokeWidth="1.7" />
      </g>
      <g className="font-annotation fill-current text-[17px]"><text x="52" y="76">EDGAR pull</text><text x="334" y="76">Docling parse</text><text x="616" y="76">chunk + embed</text><text x="72" y="220">pgvector</text><text x="72" y="246">+ lineage</text><text x="566" y="196">progressive</text><text x="566" y="222">retrieval</text><text x="60" y="328">cited answer</text><text x="266" y="300" className="fill-ink-soft text-[16px]" transform="rotate(-1.6 266 300)">lineage is resolved here, at query time</text></g>
    </InkFrame>
  );
}

export function EvolutionArrow() {
  return <svg viewBox="0 0 110 86" className="ink-sketch pointer-events-none absolute top-5 right-5 hidden w-24 opacity-45 sm:block" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 66 C34 22, 74 12, 98 36" /><path d="M80 32 C87 32, 94 34, 98 34 C97 40, 96 47, 94 53" /></svg>;
}
