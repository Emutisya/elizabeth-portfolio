import type { ReactNode } from "react";

type SectionBadgeProps = {
  children: ReactNode;
};

export default function SectionBadge({ children }: SectionBadgeProps) {
  return (
    <span className="mb-6 inline-block -rotate-2 border border-purple-500/40 bg-purple-500/5 px-4 py-1.5 text-xs font-bold tracking-[0.16em] text-purple-300 uppercase shadow-[3px_3px_0_rgba(168,85,247,0.18)] sm:mb-7 sm:px-5 sm:py-2 sm:text-sm sm:tracking-[0.18em] sm:shadow-[4px_4px_0_rgba(168,85,247,0.2)]">
      {children}
    </span>
  );
}
