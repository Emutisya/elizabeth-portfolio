"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type LizAnimation = "Idle" | "Wave" | "Bow" | "Agree";

const orbitPhrases = [
  { label: "CUSTOMER OBSESSED", offset: "2%", color: "#fbbf24" },
  { label: "ROADMAPS INTO REALITY", offset: "21%", color: "#818cf8" },
  { label: "ALIGN → SHIP → SCALE", offset: "41%", color: "#2dd4bf" },
  { label: "DATA INTO DECISIONS", offset: "61%", color: "#fb7185" },
  { label: "SYSTEMS, SIMPLIFIED", offset: "81%", color: "#c084fc" },
] as const;

const speechByAnimation: Record<
  Exclude<LizAnimation, "Idle">,
  { eyebrow: string; message: string }
> = {
  Bow: {
    eyebrow: "Portfolio mode",
    message: "Come see what I’ve been building.",
  },
  Agree: {
    eyebrow: "Real talk",
    message: "The people I’ve built with tell it best.",
  },
  Wave: {
    eyebrow: "Hello there",
    message: "Good ideas start with a conversation.",
  },
};

const LizAvatarCanvas = dynamic(() => import("@/components/LizAvatarCanvas"), {
  ssr: false,
  loading: () => (
    <div
      className="h-full w-full animate-pulse rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/5"
      aria-hidden="true"
    />
  ),
});

export default function InteractiveLiz3D({
  animation = "Idle",
}: {
  animation?: LizAnimation;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative aspect-square w-full max-w-[34rem] sm:aspect-[0.94]">
      <div className="pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.24)_0%,rgba(236,72,153,0.1)_48%,transparent_72%)] blur-2xl" />
      <div className="absolute inset-[9%] overflow-hidden rounded-full border border-purple-400/15 bg-[radial-gradient(circle_at_50%_30%,rgba(88,28,135,0.2)_0%,rgba(49,18,57,0.18)_46%,rgba(8,8,12,0.04)_74%)]">
        <div className="absolute inset-x-[18%] bottom-[5%] h-[18%] rounded-[100%] bg-purple-900/25 blur-2xl" />
        <div className="absolute top-[8%] right-[16%] h-[28%] w-[20%] rotate-12 rounded-full bg-fuchsia-400/[0.04] blur-2xl" />
      </div>
      <div
        className="pointer-events-none absolute inset-[1%] z-0 hidden sm:block"
        aria-hidden="true"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 68%, transparent 89%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 68%, transparent 89%)",
        }}
      >
        <motion.svg
          viewBox="0 0 520 520"
          className="h-full w-full overflow-visible"
          animate={prefersReducedMotion ? undefined : { rotate: 360 }}
          transition={{
            duration: 90,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <defs>
            <path
              id="liz-idea-orbit"
              d="M 260,26 A 234,234 0 1,1 259.9,26"
            />
          </defs>
          <circle
            cx="260"
            cy="260"
            r="234"
            fill="none"
            stroke="rgba(192,132,252,0.11)"
            strokeWidth="1"
          />
          {orbitPhrases.map((phrase) => (
            <text
              key={phrase.label}
              fill="rgba(233,213,255,0.62)"
              fontSize="9.5"
              fontWeight="650"
              letterSpacing="2.2"
            >
              <textPath href="#liz-idea-orbit" startOffset={phrase.offset}>
                <tspan fill={phrase.color}>● </tspan>
                <tspan>{phrase.label}</tspan>
              </textPath>
            </text>
          ))}
        </motion.svg>
      </div>
      <div className="pointer-events-none absolute bottom-[1.5%] left-1/2 z-[5] h-[4.5%] w-[36%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse,rgba(0,0,0,0.88)_0%,rgba(88,28,135,0.42)_48%,transparent_76%)] blur-sm" />
      <LizAvatarCanvas animation={animation} />
      <AnimatePresence mode="wait">
        {animation !== "Idle" && (
          <motion.div
            key={animation}
            initial={prefersReducedMotion ? false : { opacity: 0, x: 10, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="pointer-events-none absolute top-[54%] right-0 z-30 w-[10.75rem] rounded-[1.35rem] bg-gradient-to-br from-fuchsia-400/60 via-purple-500/25 to-cyan-300/50 p-px shadow-[0_18px_55px_rgba(88,28,135,0.32)] sm:top-[47%] sm:-right-[3%] sm:w-[13.5rem]"
            aria-hidden="true"
          >
            <div className="relative overflow-hidden rounded-[calc(1.35rem-1px)] bg-[rgba(12,8,20,0.9)] px-3.5 py-3 backdrop-blur-xl sm:px-4 sm:py-3.5">
              <span className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent" />
              <span className="mb-1.5 flex items-center gap-1.5 text-[0.58rem] font-bold tracking-[0.17em] text-fuchsia-200 uppercase sm:text-[0.62rem]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-300 opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fuchsia-300" />
                </span>
                {speechByAnimation[animation].eyebrow}
              </span>
              <span className="block text-xs leading-relaxed font-medium text-purple-50 sm:text-sm">
                {speechByAnimation[animation].message}
              </span>
            </div>
            <span className="absolute top-8 -left-7 h-px w-7 bg-gradient-to-l from-fuchsia-300/75 to-transparent" />
            <span className="absolute top-[1.82rem] -left-8 h-1.5 w-1.5 rounded-full border border-fuchsia-200/70 bg-fuchsia-400 shadow-[0_0_12px_rgba(232,121,249,0.8)]" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="pointer-events-none absolute right-[20%] bottom-[0.5%] left-[20%] z-[15] hidden h-[7%] rounded-[100%] bg-[radial-gradient(ellipse,rgba(126,34,206,0.2)_0%,rgba(88,28,135,0.08)_45%,transparent_72%)] blur-xl sm:block" />
      <div className="pointer-events-none absolute right-[2%] bottom-[7%] z-20 rounded-full border border-purple-400/25 bg-black/55 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.14em] text-purple-200 uppercase backdrop-blur-md">
        Tap to say hello
      </div>
    </div>
  );
}
