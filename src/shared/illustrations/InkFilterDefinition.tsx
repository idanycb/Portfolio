export function InkFilterDefinition() {
  return (
    <svg
      aria-hidden="true"
      className="ink-filter-definition pointer-events-none absolute h-0 w-0"
      focusable="false"
    >
      <defs>
        <filter id="ink-sketch">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="1"
            seed="4"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="0.9"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
