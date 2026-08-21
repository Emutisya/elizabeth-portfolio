"use client";

import { motion, useReducedMotion } from "framer-motion";

const approaches = [
  {
    number: "01",
    title: "Find the Pattern",
  },
  {
    number: "02",
    title: "Create Clarity",
  },
  {
    number: "03",
    title: "Align Teams",
  },
  {
    number: "04",
    title: "Measure Impact",
  },
];

export default function Approach() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="approach" className="relative my-6 overflow-hidden md:my-8">
      <div className="relative overflow-hidden border-y border-purple-500/30 bg-[rgb(var(--card))] py-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[rgb(var(--background))] to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[rgb(var(--background))] to-transparent"
          />

          <motion.div
            className="flex w-max items-center"
            animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[0, 1].map((setIndex) => (
              <div
                key={setIndex}
                aria-hidden={setIndex === 1}
                className="flex shrink-0 items-center"
              >
                {approaches.map((item) => (
                  <div
                    key={`${setIndex}-${item.number}`}
                    className="flex items-center"
                  >
                    <span className="px-8 font-display text-xl font-bold tracking-wide whitespace-nowrap text-[rgb(var(--foreground))] uppercase md:px-12 md:text-2xl">
                      <span className="mr-3 font-mono text-xs text-purple-400">
                        {item.number}
                      </span>
                      {item.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-xl text-purple-300"
                    >
                      ★
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
      </div>
    </section>
  );
}
