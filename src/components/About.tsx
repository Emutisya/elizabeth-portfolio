"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const timeline = [
  {
    year: "2018",
    title: "Started at Strathmore University",
    desc: "BSc Informatics & Computer Science",
  },
  {
    year: "2021",
    title: "Software Developer",
    desc: "Built web solutions at Uwezo College & Foundation",
  },
  {
    year: "2022",
    title: "Spotify Software Engineer Intern",
    desc: "Worked on Canvas and Analytics in Cairo, Egypt",
  },
  {
    year: "2022",
    title: "Microsoft PM Intern",
    desc: "Customer research on Microsoft Authenticator",
  },
  {
    year: "2023",
    title: "Product Manager at Microsoft",
    desc: "Led Graph Onboarding & OData initiatives",
  },
  {
    year: "2024",
    title: "PM – Permissions & Governance",
    desc: "Leading Microsoft Graph governance and platform initiatives",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 block text-sm font-semibold tracking-widest text-purple-500 uppercase">
            About
          </span>
          <h2 className="mb-8 text-4xl font-display font-bold md:text-6xl">
            From Developer to <span className="text-gradient">Product Leader</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-lg leading-relaxed text-[rgb(var(--muted))]"
          >
            <p>
              Elizabeth began her career building software, from web
              applications in Nairobi to engineering features at Spotify in
              Cairo, before discovering a passion for solving larger
              organizational and customer problems.
            </p>
            <p>
              Today she leads product initiatives at Microsoft focused on
              permissions, governance, onboarding experiences, workflow
              automation, and platform modernization across Microsoft Graph and
              enterprise ecosystems.
            </p>
            <p>
              She thrives on transforming messy, ambiguous processes into
              scalable systems that improve customer experiences and operational
              efficiency at enterprise scale.
            </p>
            <p className="border-l-4 border-purple-500 pl-4 font-medium text-[rgb(var(--foreground))] italic">
              Outside work, she&apos;s an adventurer at heart. Traveling across
              continents, hiking new trails, discovering cultures, and planning
              the next expedition.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            {/* Single continuous circuit bus: origin chip → through every
                year → down to the live "Present" node. Positioned purely with
                CSS — top aligns to the chip centre (14px), bottom to the
                "Present" node centre (8px from container bottom). */}
            <div
              aria-hidden="true"
              className="absolute top-3.5 bottom-2 left-4 w-1 -translate-x-1/2"
            >
              <svg
                className="h-full w-full overflow-visible"
                viewBox="0 0 2 100"
                preserveAspectRatio="none"
                fill="none"
              >
                <line x1="1" y1="0" x2="1" y2="100" stroke="rgba(168,85,247,0.28)" strokeWidth={1.4} strokeLinecap="round" />
                <line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="100"
                  stroke="#c084fc"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  pathLength={100}
                  strokeDasharray="9 91"
                  style={{ animation: "circuit-dash 14s linear infinite" }}
                />
              </svg>
            </div>

            <div className="space-y-8">
              {timeline.map((item, index) => {
                const isFirst = index === 0;
                return (
                  <motion.div
                    key={`${item.year}-${item.title}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="relative pl-12"
                  >
                    {/* Node — IC chip at the origin, solder pads thereafter */}
                    {isFirst ? (
                      <svg
                        className="absolute top-0 left-4 h-7 w-7 -translate-x-1/2 overflow-visible"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        {[8, 12, 16].map((y) => (
                          <line key={`cl-${y}`} x1="2" y1={y} x2="5" y2={y} stroke="#c084fc" strokeWidth={1} strokeLinecap="round" />
                        ))}
                        {[8, 12, 16].map((y) => (
                          <line key={`cr-${y}`} x1="19" y1={y} x2="22" y2={y} stroke="#c084fc" strokeWidth={1} strokeLinecap="round" />
                        ))}
                        <rect x="5" y="5" width="14" height="14" rx="3" fill="rgba(168,85,247,0.15)" stroke="#a855f7" strokeWidth={1.2} />
                        <circle cx="12" cy="12" r="2.4" fill="#e9d5ff" style={{ animation: "circuit-node 2.4s ease-in-out infinite" }} />
                      </svg>
                    ) : (
                      <>
                        <span className="absolute top-1.5 left-4 h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 ring-4 ring-[rgb(var(--background))] shadow-[0_0_10px_rgba(168,85,247,0.7)]" />
                        <span
                          className="absolute top-1.5 left-4 h-3 w-3 -translate-x-1/2 rounded-full ring-1 ring-purple-400/60"
                          style={{ animation: `circuit-node ${2.6 + (index % 4) * 0.6}s ease-in-out infinite` }}
                        />
                      </>
                    )}

                    {/* Branch trace from bus to the milestone */}
                    {!isFirst && (
                      <span className="absolute top-3 left-4 h-px w-7 bg-gradient-to-r from-purple-400/70 to-transparent" />
                    )}

                    <span className="text-xs font-bold tracking-wider text-purple-400 uppercase">
                      {item.year}
                    </span>
                    <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
                    <p className="text-sm text-[rgb(var(--muted))]">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Live "Present" endpoint — the bus terminates here */}
            <div className="relative mt-10 h-4">
              <div className="absolute top-0 left-4 -translate-x-1/2">
                {/* glowing live node */}
                <span className="relative block h-4 w-4 rounded-full bg-pink-500 ring-4 ring-[rgb(var(--background))] shadow-[0_0_16px_rgba(236,72,153,0.95)]">
                  <span
                    className="absolute inset-0 rounded-full ring-2 ring-pink-400/70"
                    style={{ animation: "circuit-node 2s ease-in-out infinite" }}
                  />
                </span>
                {/* "Present" label — left of the bus on desktop, right on mobile */}
                <span className="absolute top-1/2 right-full mr-3 -translate-y-1/2 whitespace-nowrap text-xs font-bold tracking-[0.18em] text-pink-400 uppercase max-lg:right-auto max-lg:left-full max-lg:mr-0 max-lg:ml-3">
                  Present
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
