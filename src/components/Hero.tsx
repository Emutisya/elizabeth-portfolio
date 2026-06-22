"use client";

import { motion } from "framer-motion";

// Evenly distributed around the orbit; `mobile: true` tags also show on small screens.
const floatingTags = [
  { label: "Shipping", color: "bg-green-400", mobile: true },
  { label: "Scaling", color: "bg-purple-400" },
  { label: "Roadmapping", color: "bg-indigo-400" },
  { label: "Governing", color: "bg-cyan-400", mobile: true },
  { label: "Stakeholder Alignment", color: "bg-orange-400" },
  { label: "Data-Driven Decisions", color: "bg-teal-400" },
  { label: "Designing", color: "bg-blue-400" },
  { label: "Customer Obsessed", color: "bg-amber-400", mobile: true },
  { label: "Cross-functional Leadership", color: "bg-violet-400" },
  { label: "Strategizing", color: "bg-rose-400" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="animate-float absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
        <div
          className="animate-float absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl"
          style={{ animationDelay: "3s" }}
        />
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:py-32 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 flex flex-wrap gap-3"
          >
            {["Product Manager", "Microsoft", "Platform Builder", "Explorer"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-purple-500/30 bg-purple-500/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-purple-400 uppercase"
                >
                  {tag}
                </span>
              ),
            )}
          </motion.div>

          <h1 className="mb-6 text-5xl leading-[1.1] font-display font-bold md:text-7xl">
            Hi, I&apos;m E<span className="text-gradient">liz</span>abeth.
          </h1>
          <p className="mb-4 text-2xl leading-relaxed font-display text-[rgb(var(--muted))] md:text-3xl">
            I build products that{" "}
            <span className="text-[rgb(var(--foreground))] italic">
              untangle complexity.
            </span>
          </p>
          <p className="mb-10 max-w-lg text-lg leading-relaxed text-[rgb(var(--muted))]">
            Product Manager at Microsoft focused on platform governance,
            developer experiences, and enterprise-scale systems.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#work"
              className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-[rgb(var(--card-border))] px-8 py-4 font-semibold transition-all duration-300 hover:border-purple-500/50 hover:text-purple-400"
            >
              Let&apos;s Connect
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96">
            <div
              className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-spin"
              style={{ animationDuration: "20s" }}
            />
            <div
              className="absolute inset-4 rounded-full border-2 border-pink-500/20 animate-spin"
              style={{ animationDuration: "15s", animationDirection: "reverse" }}
            />
            <div className="absolute inset-8 rounded-full border border-purple-500/10" />

            {/* Circuit traces wiring each skill "pin" back to the core chip */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              fill="none"
              aria-hidden
            >
              {floatingTags.map((tag, i) => {
                const angle = (i / floatingTags.length) * Math.PI * 2 - Math.PI / 2;
                const sx = 50 + Math.cos(angle) * 32;
                const sy = 50 + Math.sin(angle) * 32;
                const ex = 50 + Math.cos(angle) * 48;
                const ey = 50 + Math.sin(angle) * 48;
                return (
                  <g
                    key={`wire-${tag.label}`}
                    className={tag.mobile ? "" : "hidden sm:block"}
                  >
                    <line
                      x1={sx}
                      y1={sy}
                      x2={ex}
                      y2={ey}
                      stroke="rgba(168,85,247,0.25)"
                      strokeWidth={0.6}
                      strokeLinecap="round"
                    />
                    <line
                      x1={sx}
                      y1={sy}
                      x2={ex}
                      y2={ey}
                      stroke="#c084fc"
                      strokeWidth={0.9}
                      strokeLinecap="round"
                      pathLength={100}
                      strokeDasharray="25 75"
                      style={{
                        filter: "drop-shadow(0 0 1.2px rgba(192,132,252,0.9))",
                        animation: `circuit-pin ${2.6 + (i % 5) * 0.6}s linear infinite`,
                        animationDelay: `${(i % 4) * 0.5}s`,
                      }}
                    />
                    <circle
                      cx={sx}
                      cy={sy}
                      r={0.9}
                      fill="#e9d5ff"
                      style={{
                        animation: `circuit-node ${3 + (i % 5) * 0.7}s ease-in-out infinite`,
                        animationDelay: `${(i % 6) * 0.4}s`,
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            <div className="absolute inset-12 flex items-center justify-center rounded-full border border-purple-500/20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm">
              <div className="text-center">
                <span className="text-gradient font-display text-4xl font-bold">Liz</span>
                <p className="mt-2 text-sm font-medium text-[rgb(var(--muted))]">
                  Building the future
                </p>
              </div>
            </div>

            {/* Floating skill tags — evenly distributed; 3 PM skills show on mobile */}
            {floatingTags.map((tag, i) => {
              const angle = (i / floatingTags.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 50; // % of container half-width => sits on the outer ring
              const top = 50 + Math.sin(angle) * radius;
              const left = 50 + Math.cos(angle) * radius;
              return (
                <motion.div
                  key={tag.label}
                  animate={{ y: [-8, 8, -8] }}
                  transition={{
                    duration: 4 + (i % 5) * 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ top: `${top}%`, left: `${left}%` }}
                  className={`glass absolute flex -translate-x-1/2 -translate-y-1/2 items-center whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium ${
                    tag.mobile ? "" : "hidden sm:flex"
                  }`}
                >
                  <span
                    className={`mr-1 inline-block h-2 w-2 rounded-full ${tag.color}`}
                  />
                  {tag.label}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-[rgb(var(--muted))] pt-2">
          <div className="h-3 w-1 animate-bounce rounded-full bg-purple-500" />
        </div>
      </motion.div>
    </section>
  );
}
