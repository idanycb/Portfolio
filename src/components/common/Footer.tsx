export function Footer() {
  return (
    <footer className="flex items-center justify-between px-4 py-5 lg:grid lg:min-h-30 lg:grid-cols-3 lg:gap-10 lg:px-18">
      <span className="hidden text-[11px] font-bold tracking-widest text-[#a3a3a3] uppercase lg:block">
        DANIEL THOMAS — PORTFOLIO 2026
      </span>
      {/* Mobile: abbreviated name */}
      <span className="text-[9px] font-bold tracking-[-0.02em] text-[#a3a3a3] lg:hidden">
        DANIEL THOMAS — 2026
      </span>
      <span className="hidden text-center text-2xl font-black tracking-[-0.05em] uppercase lg:block">
        DANY.
      </span>
      <a
        href="#hero-section"
        className="flex items-center gap-2 text-black no-underline transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-black lg:justify-end lg:gap-3"
        aria-label="Back to Top"
      >
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-black text-sm lg:h-9 lg:w-9 lg:border-[3px] lg:text-base"
          aria-hidden="true"
        >
          ↑
        </span>
        <span className="text-[10px] font-bold tracking-[-0.03em] lg:text-[13px]">BACK TO TOP</span>
      </a>
    </footer>
  );
}
