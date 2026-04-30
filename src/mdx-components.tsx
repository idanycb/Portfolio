import { Mermaid } from "@/components/mdx/Mermaid";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import React from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children, id }) => (
      <h2
        id={id}
        className="font-archivo mb-6 text-2xl font-extrabold tracking-tight text-balance text-white uppercase xl:text-3xl"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-archivo mt-6 mb-2 text-xl font-bold tracking-tight text-balance text-white xl:text-2xl">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="font-roboto text-gray-200 xl:text-lg xl:text-gray-300">{children}</p>
    ),
    code: ({ children }) => (
      <code className="rounded bg-gray-800/50 px-1 font-mono text-sm text-orange-300">
        {children}
      </code>
    ),
    a: ({ href, children, ...props }) => {
      const isHashNavigation = href && (href.startsWith("#") || href.startsWith("/#"));
      const isInternalRoute = href && href.startsWith("/") && !isHashNavigation;

      if (isHashNavigation) {
        return (
          <a
            href={href}
            className="rounded text-blue-400 underline underline-offset-4 outline-none hover:text-blue-300 focus-visible:ring-2 focus-visible:ring-blue-500"
            {...props}
          >
            {children}
          </a>
        );
      }

      if (isInternalRoute) {
        return (
          <Link
            href={href}
            className="rounded text-blue-400 underline underline-offset-4 outline-none hover:text-blue-300 focus-visible:ring-2 focus-visible:ring-blue-500"
            {...props}
          >
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded text-blue-400 underline underline-offset-4 outline-none hover:text-blue-300 focus-visible:ring-2 focus-visible:ring-blue-500"
          {...props}
        >
          {children}
        </a>
      );
    },
    ul: ({ children }) => (
      <ul className="my-6 ml-6 list-outside list-['—'] space-y-1 text-gray-300">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mx-auto my-6 max-w-3xl list-inside list-decimal space-y-2 pl-4 text-gray-300">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="pl-2 italic">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="mx-auto mb-6 max-w-3xl rounded-r border-l-4 border-gray-600 bg-gray-800/30 py-1 pl-4 text-gray-400 italic">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="mb-6 w-full overflow-x-auto">
        <table className="w-full border-collapse text-left text-gray-300">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b border-gray-700 bg-gray-800/50 px-4 py-3 font-semibold text-white">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-gray-800 px-4 py-3 tabular-nums">{children}</td>
    ),
    img: (props) => {
      const { src, alt, ...rest } = props as React.ImgHTMLAttributes<HTMLImageElement>;
      return (
        <span className="relative my-8 block w-full overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt || ""}
            loading="lazy"
            className="h-auto w-full object-cover"
            {...rest}
          />
        </span>
      );
    },
    hr: () => <hr className="mt-10 mb-6 border-gray-600" />,
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => {
      const child = React.Children.toArray(props.children)[0];
      if (React.isValidElement(child)) {
        const childProps = child.props as React.HTMLAttributes<HTMLElement>;
        if (childProps.className?.includes("language-mermaid")) {
          const chart =
            typeof childProps.children === "string"
              ? childProps.children
              : childProps.children?.toString() || "";
          return <Mermaid chart={chart} />;
        }
      }
      return (
        <pre
          className="mx-auto my-8 max-w-5xl overflow-x-auto rounded-xl border border-gray-800 bg-gray-900 p-4"
          {...props}
        />
      );
    },
    ...components,
  };
}
