"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionBadge from "@/components/SectionBadge";
import { siteContent } from "@/lib/site-content";

export default function ColleagueRecommendations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="recommendations"
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -z-10 h-80 bg-gradient-to-r from-purple-500/5 via-pink-500/10 to-purple-500/5 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <SectionBadge>Colleague Recommendations</SectionBadge>
          <h2 className="break-words text-3xl font-display font-bold sm:text-4xl md:text-6xl">
            What Colleagues <span className="text-gradient">Say About Me</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[rgb(var(--muted))]">
            First-hand perspectives from colleagues on how I lead, collaborate,
            and turn complex work into lasting impact.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {siteContent.recommendations.map((perspective, index) => (
            <motion.figure
              key={perspective.name}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-[rgb(var(--card-border))] bg-[rgb(var(--card))] p-6 sm:p-7 md:p-8"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${perspective.gradient}`}
              />
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-purple-400 uppercase">
                  {perspective.theme}
                </span>
                <svg
                  aria-hidden="true"
                  className="h-8 w-8 text-purple-500/30 transition-colors group-hover:text-purple-500/50"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <path d="M9.2 8C5.2 10.4 3 13.8 3 18.4 3 22.7 5.4 25 8.6 25c3 0 5.4-2.2 5.4-5.3 0-2.9-2.1-5-4.8-5-.5 0-1 .1-1.4.2.7-2 2.1-3.7 4.3-5.1L9.2 8Zm15 0C20.2 10.4 18 13.8 18 18.4c0 4.3 2.4 6.6 5.6 6.6 3 0 5.4-2.2 5.4-5.3 0-2.9-2.1-5-4.8-5-.5 0-1 .1-1.4.2.7-2 2.1-3.7 4.3-5.1L24.2 8Z" />
                </svg>
              </div>

              <blockquote className="flex-1 text-lg leading-relaxed text-[rgb(var(--foreground))]">
                “{perspective.quote}”
              </blockquote>

              <figcaption className="mt-7 border-t border-[rgb(var(--card-border))] pt-5">
                <span className="block font-semibold">{perspective.name}</span>
                <span className="mt-1 block text-sm text-[rgb(var(--muted))]">
                  {perspective.title}
                </span>
                <span className="block text-sm text-[rgb(var(--muted))]">
                  {perspective.company}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
