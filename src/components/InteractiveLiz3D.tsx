"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

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
  { eyebrow: string; message: string; accent: string }
> = {
  Bow: {
    eyebrow: "Selected work",
    message: "Ideas made real.",
    accent: "from strategy to ship",
  },
  Agree: {
    eyebrow: "In their words",
    message: "Built with trust.",
    accent: "proven in partnership",
  },
  Wave: {
    eyebrow: "Open channel",
    message: "Let’s make something.",
    accent: "say hello",
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
  const [temporaryAnimation, setTemporaryAnimation] = useState<LizAnimation | null>(null);
  const captionAnimation = temporaryAnimation ?? animation;

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
      <LizAvatarCanvas
        animation={animation}
        onTemporaryAnimationChange={setTemporaryAnimation}
      />
      <AnimatePresence mode="wait">
        {captionAnimation !== "Idle" && (
          <motion.div
            key={captionAnimation}
            initial={prefersReducedMotion ? false : { opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="pointer-events-none absolute top-[57%] right-[1%] z-30 w-[10.5rem] sm:top-[49%] sm:-right-[2%] sm:w-[14rem]"
            aria-hidden="true"
          >
            <div className="mb-2 flex items-center gap-2">
              <motion.span
                initial={prefersReducedMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="h-px w-7 origin-right bg-gradient-to-r from-transparent to-fuchsia-300"
              />
              <span className="text-[0.56rem] font-bold tracking-[0.2em] text-fuchsia-200 uppercase sm:text-[0.62rem]">
                {speechByAnimation[captionAnimation].eyebrow}
              </span>
            </div>
            <div className="font-display text-lg leading-[1.05] font-semibold tracking-[-0.03em] text-white drop-shadow-[0_5px_18px_rgba(88,28,135,0.8)] sm:text-[1.65rem]">
              {speechByAnimation[captionAnimation].message.split(" ").map((word, index) => (
                <motion.span
                  key={`${captionAnimation}-${word}`}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 9, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: index * 0.07, duration: 0.3, ease: "easeOut" }}
                  className="mr-[0.24em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <motion.span
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28, duration: 0.3 }}
              className="mt-1.5 block text-[0.58rem] font-medium tracking-[0.16em] text-cyan-200/75 uppercase sm:text-[0.65rem]"
            >
              {speechByAnimation[captionAnimation].accent}
            </motion.span>
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
