"use client";

import { motion } from "framer-motion";

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

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-32 lg:grid-cols-2">
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
          <div className="relative h-80 w-80 md:h-96 md:w-96">
            <div
              className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-spin"
              style={{ animationDuration: "20s" }}
            />
            <div
              className="absolute inset-4 rounded-full border-2 border-pink-500/20 animate-spin"
              style={{ animationDuration: "15s", animationDirection: "reverse" }}
            />
            <div className="absolute inset-8 rounded-full border border-purple-500/10" />

            <div className="absolute inset-12 flex items-center justify-center rounded-full border border-purple-500/20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm">
              <div className="text-center">
                <span className="text-gradient font-display text-4xl font-bold">Liz</span>
                <p className="mt-2 text-sm font-medium text-[rgb(var(--muted))]">
                  Building the future
                </p>
              </div>
            </div>

            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="glass absolute -top-2 right-6 rounded-lg px-3 py-1.5 text-xs font-medium"
            >
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-green-400" />
              Shipping
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="glass absolute bottom-4 -left-4 rounded-lg px-3 py-1.5 text-xs font-medium"
            >
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-amber-400" />
              Exploring
            </motion.div>
            <motion.div
              animate={{ y: [-5, 15, -5] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="glass absolute top-1/3 -right-8 rounded-lg px-3 py-1.5 text-xs font-medium"
            >
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-purple-400" />
              Scaling
            </motion.div>
            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 4.5, repeat: Infinity }}
              className="glass absolute top-8 -left-6 rounded-lg px-3 py-1.5 text-xs font-medium"
            >
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-cyan-400" />
              Governing
            </motion.div>
            <motion.div
              animate={{ y: [-8, 12, -8] }}
              transition={{ duration: 5.5, repeat: Infinity }}
              className="glass absolute -bottom-2 right-4 rounded-lg px-3 py-1.5 text-xs font-medium"
            >
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-rose-400" />
              Strategizing
            </motion.div>
            <motion.div
              animate={{ y: [5, -12, 5] }}
              transition={{ duration: 7, repeat: Infinity }}
              className="glass absolute bottom-1/3 -right-10 rounded-lg px-3 py-1.5 text-xs font-medium"
            >
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />
              Volunteering
            </motion.div>
            <motion.div
              animate={{ y: [-6, 8, -6] }}
              transition={{ duration: 6.5, repeat: Infinity }}
              className="glass absolute top-2/3 -left-8 rounded-lg px-3 py-1.5 text-xs font-medium"
            >
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-blue-400" />
              Designing
            </motion.div>
            <motion.div
              animate={{ y: [6, -10, 6] }}
              transition={{ duration: 5.2, repeat: Infinity }}
              className="glass absolute -top-6 left-1/4 rounded-lg px-3 py-1.5 text-xs font-medium"
            >
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-indigo-400" />
              Roadmapping
            </motion.div>
            <motion.div
              animate={{ y: [-7, 9, -7] }}
              transition={{ duration: 4.8, repeat: Infinity }}
              className="glass absolute top-1/4 -left-12 rounded-lg px-3 py-1.5 text-xs font-medium"
            >
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-orange-400" />
              Stakeholder Alignment
            </motion.div>
            <motion.div
              animate={{ y: [4, -14, 4] }}
              transition={{ duration: 6.2, repeat: Infinity }}
              className="glass absolute -bottom-6 left-1/3 rounded-lg px-3 py-1.5 text-xs font-medium"
            >
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-violet-400" />
              Cross-functional Leadership
            </motion.div>
            <motion.div
              animate={{ y: [-9, 7, -9] }}
              transition={{ duration: 5.8, repeat: Infinity }}
              className="glass absolute top-1/2 -left-14 rounded-lg px-3 py-1.5 text-xs font-medium"
            >
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-teal-400" />
              Data-Driven Decisions
            </motion.div>
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
