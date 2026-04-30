import React from "react";
import { FiArrowLeft } from "react-icons/fi";

interface Props {
  children: React.ReactNode;
  title: string;
  metadata: { label: string; value: string }[];
}

export function CaseStudyLayout({ children, title, metadata }: Props) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24 font-sans text-gray-200 selection:bg-blue-500/30 selection:text-white">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/#projects"
            className="flex items-center gap-2 rounded text-sm font-medium text-gray-400 transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <FiArrowLeft aria-hidden="true" />
            <span>BACK TO PROJECTS</span>
          </a>
          <div className="font-archivo text-sm font-bold tracking-widest text-white uppercase">
            {title}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pt-20">
        {/* Title Section */}
        <div className="mx-auto mb-20 max-w-3xl">
          <h1 className="font-archivo mb-12 text-5xl leading-[1.1] font-extrabold tracking-tighter text-balance text-white md:text-7xl">
            {title}
          </h1>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-8 border-t border-b border-white/10 py-8 md:grid-cols-4">
            {metadata.map((item, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-archivo mb-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
                  {item.label}
                </span>
                <span className="text-sm font-medium text-gray-200">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MDX Content Wrapper */}
        <article className="mdx-content w-full">{children}</article>
      </main>
    </div>
  );
}
