"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";

import { otherProjects, spotlightProjects } from "./data/projects";

const allTags = [
  ...new Set([
    ...spotlightProjects.flatMap((p) => p.tags),
    ...otherProjects.flatMap((p) => p.tags),
  ]),
];

const splitIndex = Math.ceil(allTags.length / 2);
const marqueeRows = [allTags.slice(0, splitIndex), allTags.slice(splitIndex)];
const marqueeSpeed = 50;
const initialRowConfigs = marqueeRows.map(() => ({
  copies: 3,
  distance: 0,
  duration: 10,
}));

export function ProjectsMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sequenceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isInView, setIsInView] = useState(false);
  const [rowConfigs, setRowConfigs] = useState(initialRowConfigs);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const measureRows = () => {
      const containerWidth = container.clientWidth;

      const nextConfigs = marqueeRows.map((_, rowIndex) => {
        const sequenceWidth = sequenceRefs.current[rowIndex]?.scrollWidth || 0;

        if (!sequenceWidth) {
          return initialRowConfigs[rowIndex];
        }

        return {
          copies: Math.max(3, Math.ceil(containerWidth / sequenceWidth) + 2),
          distance: sequenceWidth,
          duration: sequenceWidth / marqueeSpeed,
        };
      });

      setRowConfigs((currentConfigs) => {
        const hasChanged = nextConfigs.some((config, index) => {
          const current = currentConfigs[index];

          return (
            config.copies !== current.copies ||
            config.distance !== current.distance ||
            config.duration !== current.duration
          );
        });

        return hasChanged ? nextConfigs : currentConfigs;
      });
    };

    measureRows();

    const resizeObserver = new ResizeObserver(measureRows);
    resizeObserver.observe(container);

    sequenceRefs.current.forEach((sequence) => {
      if (sequence) {
        resizeObserver.observe(sequence);
      }
    });

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden border-b-3 border-black"
      data-in-view={isInView}
    >
      {marqueeRows.map((tags, rowIndex) => {
        const rowConfig = rowConfigs[rowIndex] ?? initialRowConfigs[rowIndex];
        const trackStyle = {
          "--marquee-distance": `${rowConfig.distance}px`,
          "--marquee-duration": `${rowConfig.duration}s`,
        } as CSSProperties;

        return (
          <div
            key={rowIndex}
            className="projects-marquee-row flex overflow-hidden select-none not-last:border-b-2 not-last:border-black/20"
          >
            <div
              className={`projects-marquee-track flex w-max will-change-transform ${
                rowIndex === 1 ? "projects-marquee-track-reverse" : ""
              }`}
              style={trackStyle}
            >
              {Array.from({ length: rowConfig.copies }).map((_, copyIndex) => (
                <div
                  key={copyIndex}
                  ref={(node) => {
                    if (copyIndex === 0) {
                      sequenceRefs.current[rowIndex] = node;
                    }
                  }}
                  className="flex shrink-0"
                >
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="relative inline-flex shrink-0 items-center px-3 py-2.5 text-[9px] font-bold tracking-[0.08em] whitespace-nowrap text-[#A3A3A3] uppercase md:px-6 md:py-3.5 md:text-[13px]"
                    >
                      <span className="projects-marquee-dot absolute left-0 inline-block h-1 w-1 shrink-0 -translate-x-1/2 rounded-full bg-[#A3A3A3] md:h-1.5 md:w-1.5" />
                      <span className="projects-marquee-tag inline-block rounded-full px-2 py-1 md:px-2.5">
                        {tag}
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
