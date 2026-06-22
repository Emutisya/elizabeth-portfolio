"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Book = {
  title: string;
  author: string;
};

type Shelf = {
  label: string;
  accent: string;
  panel: string;
  border: string;
  card: string;
  cardBorder: string;
  icon: string;
  books: Book[];
};

const shelves: Shelf[] = [
  {
    label: "Currently Reading",
    accent: "text-purple-300",
    panel: "bg-purple-500/[0.06]",
    border: "border-purple-500/20",
    card: "bg-purple-500/[0.04] hover:bg-purple-500/[0.08]",
    cardBorder: "border-purple-500/15 hover:border-purple-500/40",
    icon: "text-purple-400",
    books: [
      { title: "The Nightingale", author: "Kristin Hannah" },
      {
        title: "How to Be Enough: Self-Acceptance for Self-Critics and Perfectionists",
        author: "Ellen Hendriksen",
      },
      {
        title: "A Novel Love Story",
        author: "Ashley Poston",
      },
    ],
  },
  {
    label: "Favorites",
    accent: "text-amber-200",
    panel: "bg-amber-400/[0.06]",
    border: "border-amber-400/20",
    card: "bg-amber-400/[0.04] hover:bg-amber-400/[0.08]",
    cardBorder: "border-amber-400/15 hover:border-amber-400/40",
    icon: "text-amber-300",
    books: [
      { title: "On Writing", author: "Stephen King" },
      { title: "Open Veins of Latin America", author: "Eduardo Galeano" },
      { title: "The Art of Asking", author: "Amanda Palmer" },
    ],
  },
  {
    label: "Must Reads",
    accent: "text-pink-300",
    panel: "bg-pink-500/[0.06]",
    border: "border-pink-500/20",
    card: "bg-pink-500/[0.04] hover:bg-pink-500/[0.08]",
    cardBorder: "border-pink-500/15 hover:border-pink-500/40",
    icon: "text-pink-400",
    books: [
      { title: "The Lean Startup", author: "Eric Ries" },
      { title: "The Five Dysfunctions of a Team", author: "Patrick Lencioni" },
      { title: "Radical Candor", author: "Kim Scott" },
    ],
  },
];

function BookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    </svg>
  );
}

export default function Bookshelf() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="bookshelf" className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-pink-500/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <span className="mb-4 block text-sm font-semibold tracking-widest text-purple-500 uppercase">
            On My Shelf
          </span>
          <h2 className="text-4xl font-display font-bold md:text-6xl">
            What I&apos;m <span className="text-gradient">Reading</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-[rgb(var(--muted))]">
            A mix of fiction, history, and the books that shape how I lead and build.
          </p>
        </motion.div>

        {/* Shelves */}
        <div className="grid gap-6 md:grid-cols-3">
          {shelves.map((shelf, col) => (
            <motion.div
              key={shelf.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: col * 0.12 }}
              className={`rounded-3xl border ${shelf.border} ${shelf.panel} p-5 sm:p-6`}
            >
              <h3
                className={`mb-5 text-center text-sm font-bold tracking-[0.18em] uppercase ${shelf.accent}`}
              >
                {shelf.label}
              </h3>

              <div className="flex flex-col gap-4">
                {shelf.books.map((book, i) => (
                  <motion.div
                    key={book.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: col * 0.12 + i * 0.08 + 0.2 }}
                    whileHover={{ y: -3 }}
                    className={`flex items-start gap-3 rounded-2xl border ${shelf.cardBorder} ${shelf.card} p-4 transition-all duration-300`}
                  >
                    <BookIcon className={`mt-0.5 h-5 w-5 shrink-0 ${shelf.icon}`} />
                    <div>
                      <p className="text-sm font-bold leading-snug text-[rgb(var(--foreground))]">
                        {book.title}
                      </p>
                      <p className="mt-1 text-xs text-[rgb(var(--muted))]">
                        {book.author}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
