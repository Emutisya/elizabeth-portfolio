"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionBadge from "@/components/SectionBadge";

const skillCategories = [
  {
    title: "Product & Strategy",
    skills: [
      "Product Strategy",
      "Roadmapping & OKRs",
      "Data-Informed Decisions",
      "A/B Testing",
      "Go-to-Market Strategy",
    ],
  },
  {
    title: "Program & Operations",
    skills: [
      "Program Management",
      "Stakeholder Management",
      "Change Management",
      "Governance & Compliance",
      "Risk Management",
    ],
  },
  {
    title: "Technical",
    skills: [
      "Microsoft Graph",
      "REST APIs",
      "Azure DevOps",
      "GitHub",
      "CI/CD Pipelines",
      "Telemetry & Analytics",
    ],
  },
  {
    title: "Design & Tools",
    skills: [
      "Figma",
      "UX Research",
      "User Story Mapping",
      "Agile/Scrum",
      "Process Improvement",
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="pt-10 pb-10 md:pt-14 md:pb-14">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <SectionBadge>Skills</SectionBadge>
          <h2 className="text-3xl font-display font-bold sm:text-4xl md:text-6xl">
            What I <span className="text-gradient">Bring</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[rgb(var(--muted))]">
            The product, technical, and operating toolkit I use to turn complex
            platform work into clear outcomes.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-7 pt-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {skillCategories.map((category, index) => (
              <motion.article
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                  className="group relative overflow-hidden rounded-2xl border border-[rgb(var(--card-border))] bg-[rgb(var(--card))] shadow-[5px_5px_0_rgba(255,255,255,0.035)] transition-all duration-300 hover:border-[rgb(var(--card-border))] hover:bg-[rgb(var(--background))] hover:shadow-[7px_7px_0_rgba(255,255,255,0.055)]"
                >
                  <div className="flex items-start justify-between gap-4 border-b border-[rgb(var(--card-border))] px-5 py-4">
                    <h3 className="text-lg leading-tight font-bold text-[rgb(var(--foreground))]">
                      {category.title}
                    </h3>
                    <span className="font-mono text-xs font-bold tracking-widest text-[rgb(var(--muted))]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex flex-wrap content-start gap-2 p-5 md:min-h-44">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="border border-[rgb(var(--card-border))] bg-transparent px-3 py-1.5 text-xs font-medium text-[rgb(var(--muted))] transition-colors group-hover:text-[rgb(var(--foreground))]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
