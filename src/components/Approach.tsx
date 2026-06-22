"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const approaches = [
  {
    number: "01",
    title: "Find the Pattern",
    description:
      "I identify common threads hidden inside complexity. The signal in the noise that reveals the real problem to solve.",
    icon: "pattern",
    color: "from-purple-500 to-indigo-500",
  },
  {
    number: "02",
    title: "Create Clarity",
    description:
      "I design scalable systems and workflows that transform ambiguity into structured, actionable solutions.",
    icon: "clarity",
    color: "from-pink-500 to-rose-500",
  },
  {
    number: "03",
    title: "Align Teams",
    description:
      "I bring engineers, stakeholders, and customers together. Building shared understanding and collective momentum.",
    icon: "align",
    color: "from-amber-500 to-orange-500",
  },
  {
    number: "04",
    title: "Measure Impact",
    description:
      "Every decision should drive measurable outcomes. I define success metrics and track what matters.",
    icon: "measure",
    color: "from-emerald-500 to-teal-500",
  },
];

export default function Approach() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="approach" className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 h-px w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <span className="mb-4 block text-sm font-semibold tracking-widest text-purple-500 uppercase">
            My Approach
          </span>
          <h2 className="text-4xl font-display font-bold md:text-6xl">
            How I <span className="text-gradient">Work</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {approaches.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl border border-[rgb(var(--card-border))] bg-[rgb(var(--card))] p-8"
            >
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />

              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${item.color} bg-opacity-10`}>
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  {item.icon === "pattern" && <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />}
                  {item.icon === "clarity" && <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />}
                  {item.icon === "align" && <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />}
                  {item.icon === "measure" && <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />}
                </svg>
              </div>
              <span
                className={`bg-gradient-to-r ${item.color} bg-clip-text text-xs font-bold tracking-widest text-transparent uppercase`}
              >
                {item.number}
              </span>
              <h3 className="mt-2 mb-3 text-xl font-bold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[rgb(var(--muted))]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
