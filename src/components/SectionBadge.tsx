import type { ReactNode } from "react";

type SectionBadgeProps = {
  children: ReactNode;
};

export default function SectionBadge({ children }: SectionBadgeProps) {
  return (
    <span className="mb-7 inline-block -rotate-2 border border-purple-500/40 bg-purple-500/5 px-5 py-2 text-sm font-bold tracking-[0.18em] text-purple-300 uppercase shadow-[4px_4px_0_rgba(168,85,247,0.2)]">
      {children}
    </span>
  );
}
