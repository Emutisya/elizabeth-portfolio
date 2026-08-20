"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import SectionBadge from "@/components/SectionBadge";

const destinations = [
  {
    country: "Kenya",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&h=800&fit=crop",
  },
  {
    country: "Tanzania",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=800&fit=crop",
  },
  {
    country: "Rwanda",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&h=800&fit=crop",
  },
  {
    country: "Ghana",
    image: "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=600&h=800&fit=crop",
  },
  {
    country: "Egypt",
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=600&h=800&fit=crop",
  },
  {
    country: "T\u00FCrkiye",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&h=800&fit=crop",
  },
  {
    country: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=800&fit=crop",
  },
  {
    country: "Vietnam",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&h=800&fit=crop",
  },
  {
    country: "Cambodia",
    image: "/cambodia.png",
  },
  {
    country: "India",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=800&fit=crop",
  },
  {
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&h=800&fit=crop",
  },
  {
    country: "USA",
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=800&fit=crop",
  },
];

const volunteering = [
  {
    title: "Teaching Swahili",
    description: "Sharing my mother tongue with curious learners across borders, keeping culture alive through language.",
  },
  {
    title: "Building Communities",
    description: "From AIESEC projects in Rwanda to local initiatives, contributing hands-on wherever I can.",
  },
  {
    title: "AI for Good",
    description: "Sharing knowledge on AI and technology with communities that can benefit most from it.",
  },
];

const postcardRotations = [-1, 1, -0.5, 1.5];

export default function Adventures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="adventures" className="relative overflow-hidden py-20 md:py-32">
      {/* Background blobs matching site gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[120px]" />
        <div className="absolute right-0 bottom-1/4 h-[500px] w-[500px] rounded-full bg-pink-500/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <SectionBadge>Beyond the Screen</SectionBadge>
          <h2 className="text-4xl font-display font-bold md:text-6xl">
            Life Beyond the <span className="text-gradient">Roadmap</span>
          </h2>
        </motion.div>

        {/* Personal narrative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-20 grid max-w-4xl items-center gap-6 border-y border-purple-500/20 py-8 text-left md:grid-cols-[12rem_1fr]"
        >
          <div className="-rotate-2 border border-purple-500/40 bg-purple-500/5 px-6 py-4 text-center shadow-[5px_5px_0_rgba(168,85,247,0.18)]">
            <span className="block font-display text-7xl leading-none font-black text-gradient">
              12
            </span>
            <span className="mt-2 block text-xs font-bold tracking-[0.2em] text-purple-300 uppercase">
              Countries & counting
            </span>
          </div>
          <div>
            <p className="text-xl leading-relaxed text-[rgb(var(--muted))]">
              When I&apos;m not shipping products, you&apos;ll find me on a trail,
              at an airport, or somewhere between the two.
            </p>
            <p className="mt-3 text-base leading-relaxed text-[rgb(var(--muted))]">
              Ask me about navigating motorbikes in Vietnam, sunrise at the
              Pyramids, or getting lost in Istanbul&apos;s Grand Bazaar.
            </p>
          </div>
        </motion.div>

        {/* Destination Grid */}
        <div className="mx-auto mb-24 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.country}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                      rotate: postcardRotations[index % postcardRotations.length],
                    }
                  : {}
              }
              transition={{ duration: 0.5, delay: index * 0.06 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ y: -8, rotate: 0 }}
              className="group relative border border-[rgb(var(--card-border))] bg-[rgb(var(--card))] p-1.5 pb-3 shadow-[5px_5px_0_rgba(168,85,247,0.12)] transition-all duration-300 hover:border-purple-500/40 hover:shadow-[7px_7px_0_rgba(168,85,247,0.22)]"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.country}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:saturate-[1.15]"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/55 via-transparent to-indigo-950/10 transition-opacity duration-500 group-hover:opacity-70" />
                <div className="absolute top-3 right-3 rotate-3 border border-white/30 bg-[rgb(var(--card))] px-2.5 py-1 font-mono text-[0.65rem] font-bold tracking-widest text-[rgb(var(--foreground))] shadow-[3px_3px_0_rgba(24,24,27,0.5)]">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              <div className="flex items-end justify-between gap-2 px-1.5 pt-2.5">
                <div>
                  <span className="text-[0.6rem] font-bold tracking-[0.18em] text-purple-400 uppercase">
                    Passport note
                  </span>
                  <motion.p
                    className="mt-0.5 font-display text-base font-bold"
                    animate={
                      hoveredIndex === index
                        ? { x: 3, opacity: 1 }
                        : { x: 0, opacity: 0.9 }
                    }
                    transition={{ duration: 0.2 }}
                  >
                    {dest.country}
                  </motion.p>
                </div>
                <span className="text-xl text-purple-400 transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Volunteering */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="mb-8 text-center text-2xl font-display font-bold">
            Giving Back
          </h3>
          <p className="mx-auto mb-10 max-w-2xl text-center text-[rgb(var(--muted))]">
            Whether it&apos;s teaching Swahili, building with communities, or sharing
            what I know about AI, volunteering keeps me grounded and connected.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {volunteering.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-purple-500/10 bg-purple-500/[0.03] p-6 transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/[0.06] hover:shadow-[0_0_20px_rgba(168,85,247,0.08)]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 ring-1 ring-purple-500/20">
                  <svg className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    {index === 0 && <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />}
                    {index === 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />}
                    {index === 2 && <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />}
                  </svg>
                </div>
                <h4 className="mb-2 text-lg font-bold">{item.title}</h4>
                <p className="text-sm leading-relaxed text-[rgb(var(--muted))]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/5 px-6 py-3 text-sm font-medium text-purple-400 transition-all hover:border-purple-500/60 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            Grab a coffee with me and hear the stories
          </a>
        </motion.div>
      </div>
    </section>
  );
}
