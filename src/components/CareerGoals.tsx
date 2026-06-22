"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CareerGoals() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 block text-sm font-semibold tracking-widest text-purple-500 uppercase">
            What&apos;s Next
          </span>
          <h2 className="mb-8 text-4xl font-display font-bold md:text-6xl">
            The Next <span className="text-gradient">Chapter</span>
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-[rgb(var(--muted))]">
            I&apos;m excited about opportunities to build products at global
            scale, solve complex platform challenges, and contribute to
            high-performing international teams.
          </p>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[rgb(var(--muted))]">
            I am particularly interested in product leadership opportunities
            across <span className="font-medium text-[rgb(var(--foreground))]">Europe</span>,{" "}
            <span className="font-medium text-[rgb(var(--foreground))]">Australia</span>,
            and other{" "}
            <span className="font-medium text-[rgb(var(--foreground))]">
              global technology hubs
            </span>
            .
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            {[
              "Netherlands",
              "Australia",
              "Ireland",
              "Canada",
              "Kenya",
            ].map((location) => (
              <span
                key={location}
                className="rounded-full border border-purple-500/20 bg-purple-500/5 px-5 py-2.5 text-sm font-medium text-purple-400"
              >
                {location}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
