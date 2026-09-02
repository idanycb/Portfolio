import type { ReactNode } from "react";

export function EvaluationTable({ children }: { children: ReactNode }) {
  return <div className="my-6 overflow-x-auto"><table className="w-full min-w-[34rem] border-collapse text-left">{children}</table></div>;
}
