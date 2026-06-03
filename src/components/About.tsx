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
    <section id="about" className="relative py-32">
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
            <div className="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-purple-500 to-pink-500 opacity-30" />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={`${item.year}-${item.title}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="relative pl-12"
                >
                  <div className="absolute top-1.5 left-2.5 h-3 w-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 ring-4 ring-[rgb(var(--background))]" />
                  <span className="text-xs font-bold tracking-wider text-purple-400 uppercase">
                    {item.year}
                  </span>
                  <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
                  <p className="text-sm text-[rgb(var(--muted))]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
