"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

const marqueeSkills = [
  ...skillCategories.flatMap((category) => category.skills),
  ...skillCategories.flatMap((category) => category.skills),
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 block text-sm font-semibold tracking-widest text-purple-500 uppercase">
            Skills
          </span>
          <h2 className="text-4xl font-display font-bold md:text-6xl">
            What I <span className="text-gradient">Bring</span>
          </h2>
        </motion.div>

        <div className="mb-16 overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 whitespace-nowrap"
          >
            {marqueeSkills.map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="rounded-full border border-purple-500/20 px-6 py-2 text-sm font-medium text-purple-400"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-[rgb(var(--card-border))] bg-[rgb(var(--card))] p-6"
            >
              <h3 className="mb-4 text-lg font-bold">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
