import Link from "next/link";

import { ProjectsMarquee } from "./ProjectsMarquee";
import { otherProjects, spotlightProjects } from "./data/projects";

export function Projects() {
  return (
    <section id="projects" className="font-archivo w-screen border-t-[3px] border-black">
      {/* ── Section header ─────────────────────────────────── */}
      <div className="flex items-baseline justify-between border-b-2 border-black px-3 py-5 md:border-b-[3px] md:px-8 md:py-6 xl:px-14">
        <span className="text-[9px] font-bold tracking-[0.15em] text-[#A3A3A3] uppercase md:text-[11px]">
          SELECTED WORK
        </span>
        <span className="text-[9px] font-bold tracking-widest text-[#A3A3A3] md:text-[11px]">
          2025 — 2026
        </span>
      </div>

      {/* ── Spotlight heading ───────────────────────────────── */}
      <div className="flex items-end justify-between gap-2 px-3 pt-6 pb-1 md:justify-start md:gap-8 md:px-6 md:pt-12 md:pb-0 xl:px-10">
        <span className="text-[52px] leading-[0.9] font-black -tracking-[0.06em] uppercase md:text-[clamp(48px,8vw,96px)]">
          {/* Mobile: split word; Desktop: single line */}
          SPOT
          <span className="sm:hidden">
            <br />
          </span>
          LIGHT
        </span>
        <span className="mb-1 max-w-22.5 text-right text-[9px] leading-[1.3] font-bold text-[#4a4848] md:mb-3 md:max-w-35 md:text-left md:text-[11px] md:leading-[1.1]">
          Two featured projects with full case studies.
        </span>
      </div>

      {/* ── Spotlight cards ─────────────────────────────────── */}
      <div className="mt-4 border-t-[3px] border-black md:mt-10 md:grid md:grid-cols-2">
        {spotlightProjects.map((project, i) => (
          <div key={project.id} className="border-b-[3px] border-black md:not-last:border-r-[3px]">
            {/* Image placeholder */}
            <div className="relative h-50 overflow-hidden border-b-[3px] border-black bg-[#E3E3E3] md:h-90">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(0,0,0,0.06) 8px, rgba(0,0,0,0.06) 9px)",
                }}
              />
              <span className="absolute top-3 left-4 text-[10px] font-bold tracking-widest text-[#A3A3A3] md:top-5 md:left-7 md:text-[11px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="absolute top-2.5 right-3.5 border-2 border-black bg-white px-2.5 py-0.75 text-[9px] font-bold tracking-[0.08em] uppercase md:top-4.5 md:right-6 md:px-3 md:py-1 md:text-[10px]">
                CASE STUDY
              </span>
              <div className="flex h-full items-center justify-center">
                <span className="font-mono text-[9px] font-bold tracking-[0.12em] text-[#A3A3A3] uppercase md:text-[10px]">
                  project screenshot
                </span>
              </div>
            </div>

            {/* Card body */}
            <div className="px-4 pt-5 pb-6 md:px-9 md:pt-8 md:pb-9">
              <div className="mb-2 text-[9px] font-bold tracking-[0.12em] text-[#A3A3A3] uppercase md:mb-3 md:text-[11px]">
                {project.category}
              </div>
              <h2 className="mb-3 text-[30px] leading-[0.93] font-black -tracking-[0.05em] uppercase md:mb-4 md:text-[42px] md:leading-[0.95]">
                {project.titleLines.map((line, li) => (
                  <span key={li} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="mb-5 text-[11px] leading-normal font-bold text-[#4a4848] md:mb-8 md:max-w-95 md:text-[13px]">
                {project.description}
              </p>

              {/* Meta — mobile: equal cols with border dividers; desktop: gap row */}
              <div className="mb-5 flex border-t-2 border-[#E3E3E3] pt-3.5 md:mb-8 md:gap-6 md:pt-5">
                {[
                  { label: "Role", value: project.role },
                  { label: "Duration", value: project.duration },
                  { label: "Stack", value: project.stackDisplay },
                ].map((item, mi) => (
                  <div
                    key={item.label}
                    className={`flex flex-1 flex-col gap-0.75 md:flex-initial md:gap-1 ${mi > 0 ? "border-l-2 border-[#E3E3E3] pl-2 md:border-l-0 md:pl-0" : ""}`}
                  >
                    <span className="text-[8px] font-bold tracking-[0.14em] text-[#A3A3A3] uppercase md:text-[9px]">
                      {item.label}
                    </span>
                    <span className="text-[11px] font-bold -tracking-[0.03em] md:text-[13px]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA — mobile: full-width; desktop: inline */}
              <Link
                href={`/projects/${project.caseStudySlug}`}
                className="flex w-full items-center justify-between bg-black px-4.5 py-3 text-[14px] font-bold -tracking-[0.05em] text-white transition-colors hover:bg-white hover:text-black hover:outline-[3px] hover:outline-black md:inline-flex md:w-auto md:justify-start md:gap-2.5 md:px-5.5 md:py-2.5 md:text-base"
              >
                VIEW CASE STUDY
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="md:h-4 md:w-4"
                >
                  <path
                    d="M3 13L13 3M13 3H5M13 3V11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ── Marquee band ────────────────────────────────────── */}
      <ProjectsMarquee />

      {/* ── Other work heading ──────────────────────────────── */}
      <div className="flex items-end justify-between px-3 pt-7 md:px-6 md:pt-16 xl:px-10">
        <span className="text-[40px] leading-[0.9] font-black -tracking-[0.06em] uppercase md:text-[clamp(36px,5vw,56px)]">
          OTHER <br className="md:hidden" />
          WORKS.
        </span>
        <span className="mb-0.5 max-w-30 text-right text-[9px] leading-[1.3] font-bold text-[#4a4848] md:mb-1 md:text-[11px] md:leading-[1.2]">
          More things I&apos;ve built and shipped.
        </span>
      </div>

      {/* ── Other work table ────────────────────────────────── */}
      <div className="mt-5 border-t-[3px] border-black md:mt-10">
        {otherProjects.map((project, i) => (
          <a
            key={project.id}
            href={project.repoURL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-16 cursor-pointer items-center gap-3 border-b-2 border-black px-4 transition-colors hover:bg-black hover:text-white md:grid md:min-h-20 md:grid-cols-[60px_1fr_200px_180px_60px] md:gap-0 md:border-b-[3px] md:px-18"
          >
            {/* Number */}
            <span className="w-5 shrink-0 text-[9px] font-bold tracking-widest text-[#A3A3A3] group-hover:text-[#666] md:w-auto md:text-[11px]">
              {String(spotlightProjects.length + i + 1).padStart(2, "0")}
            </span>

            {/* Mobile: name + stack stacked; Desktop: two separate grid columns via display:contents */}
            <div className="flex flex-1 flex-col gap-0.75 py-3.5 md:contents md:py-0">
              <span className="text-base leading-none font-black -tracking-[0.05em] uppercase md:py-6 md:text-2xl md:leading-normal">
                {project.title}
              </span>
              <span className="text-[9px] font-bold tracking-[0.04em] text-[#A3A3A3] uppercase group-hover:text-[#A3A3A3] md:text-[11px] md:tracking-[0.06em] md:text-[rgb(74,72,72)]">
                {project.stackDisplay}
              </span>
            </div>

            {/* Category pill */}
            <span className="shrink-0 self-center border-2 border-black px-2 py-0.75 text-[8px] font-bold tracking-[0.08em] uppercase group-hover:border-white md:px-3 md:py-1 md:text-[10px]">
              {project.category}
            </span>

            {/* Arrow */}
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-current text-[13px] md:h-9 md:w-9 md:justify-self-end md:text-base">
              ↗
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
