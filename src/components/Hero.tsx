"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import InteractiveLiz3D, { type LizAnimation } from "@/components/InteractiveLiz3D";
import { useState } from "react";

export default function Hero() {
  const [avatarAnimation, setAvatarAnimation] = useState<LizAnimation>("Idle");

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

      <div className="mx-auto grid w-full min-w-0 max-w-7xl items-center gap-12 px-6 py-24 md:py-32 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="min-w-0"
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

          <p className="mb-3 text-sm font-semibold tracking-widest text-purple-400 uppercase">
            Elizabeth Waeni Mutisya
          </p>
          <h1
            aria-label="Elizabeth Waeni Mutisya — Product Manager at Microsoft"
            className="mb-6 break-words text-4xl leading-[1.1] font-display font-bold sm:text-5xl md:text-7xl"
          >
            Hi, I&apos;m E<span className="text-gradient">liz</span>abeth.
          </h1>
          <p className="mb-4 text-xl leading-relaxed font-display text-[rgb(var(--muted))] sm:text-2xl md:text-3xl">
            I build products that{" "}
            <span className="text-[rgb(var(--foreground))] italic">
              untangle complexity.
            </span>
          </p>
          <p className="mb-10 max-w-lg text-lg leading-relaxed text-[rgb(var(--muted))]">
            Product Manager at Microsoft focused on platform governance,
            developer experiences, and enterprise-scale systems.
          </p>

          <div className="flex flex-wrap gap-4 max-sm:flex-col">
            <a
              href="#work"
              onMouseEnter={() => setAvatarAnimation("Bow")}
              onMouseLeave={() => setAvatarAnimation("Idle")}
              onFocus={() => setAvatarAnimation("Bow")}
              onBlur={() => setAvatarAnimation("Idle")}
              className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-center font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              View My Work
            </a>
            <Link
              href="/recommendations"
              onMouseEnter={() => setAvatarAnimation("Agree")}
              onMouseLeave={() => setAvatarAnimation("Idle")}
              onFocus={() => setAvatarAnimation("Agree")}
              onBlur={() => setAvatarAnimation("Idle")}
              className="rounded-full border border-purple-500/50 bg-purple-500/10 px-8 py-4 text-center font-semibold text-purple-300 transition-all duration-300 hover:scale-105 hover:border-purple-400 hover:bg-purple-500/15"
            >
              View Recommendations
            </Link>
            <a
              href="#contact"
              onMouseEnter={() => setAvatarAnimation("Wave")}
              onMouseLeave={() => setAvatarAnimation("Idle")}
              onFocus={() => setAvatarAnimation("Wave")}
              onBlur={() => setAvatarAnimation("Idle")}
              className="rounded-full border border-[rgb(var(--card-border))] px-8 py-4 text-center font-semibold transition-all duration-300 hover:border-purple-500/50 hover:text-purple-400"
            >
              Let&apos;s Connect
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex min-w-0 justify-center lg:justify-end"
        >
          <InteractiveLiz3D animation={avatarAnimation} />
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-[rgb(var(--muted))] pt-2">
          <div className="h-3 w-1 animate-bounce rounded-full bg-purple-500" />
        </div>
      </motion.div>
    </section>
  );
}
