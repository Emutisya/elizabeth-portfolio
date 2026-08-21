"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { pmWritingPreviews } from "@/content/pmWritingPreviews";

export default function PMWritings() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="writings"
      className="relative overflow-hidden pt-8 pb-20 md:pt-10 md:pb-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(168,85,247,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.055)_1px,transparent_1px)] bg-[size:72px_72px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-purple-500/10 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-display font-bold sm:text-4xl md:text-6xl">
            Liz&apos;s <span className="text-gradient">PM Learnings</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[rgb(var(--muted))]">
            Personal notes on product management, platform thinking, and the
            lessons I am carrying forward from building at scale.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-8 pt-4 lg:grid-cols-3 lg:gap-5">
          {pmWritingPreviews.map((writing, index) => (
            <motion.article
              key={writing.title}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -8 }}
              className={`group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[rgb(var(--card-border))] bg-[rgb(var(--card))] text-[rgb(var(--foreground))] shadow-[5px_5px_0_rgba(168,85,247,0.18)] transition-transform duration-300 lg:min-h-[26rem] ${writing.rotation}`}
            >
              <Link
                href={`/writings/${writing.slug}`}
                className="flex flex-1 flex-col focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-purple-400"
              >
                <div
                  className={`relative h-40 overflow-hidden border-b border-[rgb(var(--card-border))] bg-gradient-to-br ${writing.cover}`}
                >
                  <div
                    aria-hidden="true"
                    className="absolute -top-16 -right-12 h-48 w-48 rotate-12 border-[18px] border-white/20"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full border-[20px] border-zinc-950/15"
                  />
                  <span className="absolute top-4 left-4 font-mono text-xs font-bold tracking-[0.25em] text-white/80">
                    LIZ / PM NOTES
                  </span>
                  <span className="absolute right-4 bottom-0 font-display text-8xl leading-none font-black text-white/20">
                    {writing.coverNumber}
                  </span>
                  <span className="absolute bottom-4 left-4 max-w-[80%] text-2xl leading-none font-black tracking-tight text-white uppercase">
                    {writing.coverLabel}
                  </span>
                  <span className="absolute top-4 right-4 rotate-3 border border-white/30 bg-[rgb(var(--card))] px-3 py-1 text-[0.65rem] font-black tracking-wider text-[rgb(var(--foreground))] uppercase shadow-[3px_3px_0_rgba(24,24,27,0.45)]">
                    Field note
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span
                      className={`border px-3 py-1 text-[0.65rem] font-bold tracking-wide uppercase ${writing.tag}`}
                    >
                      {writing.topic}
                    </span>
                    <span className="border border-[rgb(var(--card-border))] bg-[rgb(var(--background))] px-3 py-1 text-[0.65rem] font-bold tracking-wide text-[rgb(var(--muted))] uppercase">
                      Personal learning
                    </span>
                  </div>

                  <h3 className="break-words text-xl leading-tight font-display font-black">
                    {writing.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[rgb(var(--muted))]">
                    {writing.excerpt}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[rgb(var(--card-border))] pt-4 text-xs">
                    <span className="font-medium text-[rgb(var(--muted))]">
                      {writing.readTime}
                    </span>
                    <span className="font-black text-purple-300 uppercase transition-transform duration-300 group-hover:translate-x-1">
                      Read note →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
