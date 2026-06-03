"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const caseStudies = [
  {
    id: 1,
    title: "Building Microsoft's Unified Permissions & PreAuthorization Experience",
    problem:
      "Fragmented onboarding experience with multiple approval paths and poor visibility across Microsoft's platform.",
    role: "Product Manager",
    actions: [
      "Mapped end-to-end workflows across engineering, operations, and stakeholder teams",
      "Aligned multiple stakeholder groups around a unified self-service strategy",
      "Defined self-service platform strategy and led product development",
    ],
    impact: [
      "60% reduction in onboarding latency",
      "92% SLA compliance",
      "25 support tickets eliminated per week",
    ],
    tags: ["Platform", "Governance", "Self-Service"],
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    id: 2,
    title: "Modernizing Microsoft Graph Permissions Governance",
    problem:
      "Permissions lacked complete metadata and governance visibility, creating compliance gaps across 1,200+ permissions.",
    role: "Product Manager",
    actions: [
      "Led cross-functional modernization coordinating multiple engineering teams",
      "Integrated RBAC, RSC, and token-based authorization models",
      "Introduced scalable governance practices across the ecosystem",
    ],
    impact: [
      "100% metadata coverage across 1,200+ permissions",
      "Unified governance framework established",
    ],
    tags: ["API", "Governance", "Enterprise"],
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: 3,
    title: "Scaling API Review Adoption Across Microsoft",
    problem:
      "Large engineering organizations struggled to adopt a new API review process, risking fragmentation.",
    role: "Product Manager & Program Manager",
    actions: [
      "Program-managed migration of 158 workloads to new review process",
      "Led weekly governance reviews and dependency tracking",
      "Coordinated stakeholders and tracked execution to completion",
    ],
    impact: [
      "100% migration completion within committed timelines",
      "50% reduction in manual operational effort",
      "40% increase in tool adoption",
    ],
    tags: ["Program Management", "Migration", "Scale"],
    gradient: "from-amber-500 to-orange-500",
  },
];

export default function FeaturedWork() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <span className="mb-4 block text-sm font-semibold tracking-widest text-purple-500 uppercase">
            My Work
          </span>
          <h2 className="text-4xl font-display font-bold md:text-6xl">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[rgb(var(--muted))]">
            Transforming complex enterprise challenges into scalable solutions at
            Microsoft scale.
          </p>
        </motion.div>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="card-hover group relative overflow-hidden rounded-3xl border border-[rgb(var(--card-border))] bg-[rgb(var(--card))] p-8 md:p-12"
            >
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${study.gradient}`}
              />

              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-3 text-sm font-semibold tracking-wider text-[rgb(var(--muted))] uppercase">
                    {study.role}
                  </h3>
                  <h4 className="mb-4 text-2xl font-display font-bold transition-all group-hover:text-transparent group-hover:[background-image:linear-gradient(135deg,#667eea_0%,#764ba2_100%)] group-hover:bg-clip-text md:text-3xl">
                    {study.title}
                  </h4>
                  <p className="mb-6 text-[rgb(var(--muted))]">{study.problem}</p>
                  <div>
                    <h5 className="mb-3 text-sm font-semibold tracking-wider text-purple-400 uppercase">
                      What I Did
                    </h5>
                    <ul className="space-y-2">
                      {study.actions.map((action) => (
                        <li
                          key={action}
                          className="flex items-start gap-2 text-sm text-[rgb(var(--muted))]"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <h5 className="mb-4 text-sm font-semibold tracking-wider text-pink-400 uppercase">
                    Impact
                  </h5>
                  <div className="space-y-4">
                    {study.impact.map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="flex items-center gap-3 rounded-xl border border-purple-500/10 bg-gradient-to-r from-purple-500/5 to-pink-500/5 p-4"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                          <svg className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                          </svg>
                        </span>
                        <span className="font-semibold">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
