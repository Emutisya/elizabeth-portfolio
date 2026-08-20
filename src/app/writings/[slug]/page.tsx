import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Aurora from "@/components/Aurora";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import SectionBadge from "@/components/SectionBadge";
import { getPMWriting, pmWritings } from "@/content/pmWritings";

type WritingPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return pmWritings.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WritingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const writing = getPMWriting(slug);

  if (!writing) {
    return {};
  }

  return {
    title: writing.title,
    description: writing.description,
    alternates: {
      canonical: `/writings/${writing.slug}`,
    },
  };
}

export default async function WritingPage({ params }: WritingPageProps) {
  const { slug } = await params;
  const writing = getPMWriting(slug);

  if (!writing) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[rgb(var(--background))]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.1),transparent_25%)]" />
      <Aurora />
      <ScrollProgress />
      <Navigation />

      <div className="mx-auto max-w-5xl px-6 pt-28 pb-16 md:pt-32 md:pb-20">
        <Link
          href="/#writings"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-purple-300 transition-colors hover:text-purple-200"
        >
          <span aria-hidden="true">←</span>
          Back to PM learnings
        </Link>

        <article className="relative mx-auto max-w-4xl">
          <div
            aria-hidden="true"
            className="absolute top-5 -right-2 bottom-5 w-3 rounded-r-xl border border-[rgb(var(--card-border))] bg-[rgb(var(--card))] opacity-70"
          />
          <div
            aria-hidden="true"
            className="absolute top-9 -right-4 bottom-9 w-3 rounded-r-xl border border-[rgb(var(--card-border))] bg-[rgb(var(--card))] opacity-40"
          />

          <div className="relative overflow-hidden rounded-[2rem] border border-[rgb(var(--card-border))] bg-[rgb(var(--card))] shadow-[0_28px_80px_rgba(0,0,0,0.3),inset_20px_0_40px_rgba(0,0,0,0.14)]">
            <div
              aria-hidden="true"
              className="absolute top-0 bottom-0 left-5 w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent sm:left-8"
            />
            <div
              aria-hidden="true"
              className="absolute top-0 bottom-0 left-7 w-px bg-gradient-to-b from-transparent via-[rgb(var(--card-border))] to-transparent sm:left-10"
            />

            <div className="relative px-9 py-9 sm:px-14 md:px-16 md:py-10 lg:px-20">
              <header className="text-center">
                <p className="mb-5 font-mono text-[0.65rem] font-bold tracking-[0.28em] text-[rgb(var(--muted))] uppercase">
                  Liz&apos;s PM notebook · Field note
                </p>
                <SectionBadge>{writing.topic}</SectionBadge>
                <h1 className="mx-auto max-w-3xl text-3xl leading-tight font-display font-black md:text-4xl">
                  {writing.title}
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 font-display italic text-[rgb(var(--muted))]">
                  {writing.description}
                </p>

                <div
                  aria-hidden="true"
                  className="mx-auto my-6 flex max-w-xs items-center gap-4"
                >
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/50" />
                  <span className="h-2.5 w-2.5 rotate-45 border border-purple-400 bg-purple-500/20" />
                  <span className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/50" />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-[rgb(var(--muted))]">
                  <span className="font-semibold tracking-wide text-[rgb(var(--foreground))]">
                    Liz Mutisya
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{writing.readTime}</span>
                </div>
              </header>

              <div className="mt-9 space-y-5 border-t border-[rgb(var(--card-border))] pt-8">
                {writing.introduction.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className={`font-display text-lg leading-8 text-[rgb(var(--foreground))] ${
                      index === 0
                        ? "first-letter:mr-2 first-letter:float-left first-letter:text-6xl first-letter:leading-[0.82] first-letter:font-black first-letter:text-purple-400"
                        : ""
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-12 space-y-12">
                {writing.sections.map((section, sectionIndex) => (
                  <section
                    key={section.heading}
                    className="border-t border-[rgb(var(--card-border))] pt-9"
                  >
                    <span className="mb-3 block font-mono text-xs font-bold tracking-[0.22em] text-purple-400 uppercase">
                      Chapter {String(sectionIndex + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mb-5 text-2xl font-display font-bold md:text-3xl">
                      {section.heading}
                    </h2>

                    {section.paragraphs && (
                      <div className="space-y-4">
                        {section.paragraphs.map((paragraph) => (
                          <p
                            key={paragraph}
                            className="text-base leading-7 text-[rgb(var(--muted))]"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    )}

                    {section.bullets && (
                      <ul className="mt-6 space-y-4 border-y border-[rgb(var(--card-border))] py-6">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-4 text-base leading-7 text-[rgb(var(--muted))]"
                          >
                            <span className="mt-3 h-2 w-2 shrink-0 rotate-45 bg-purple-400" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.numberedPoints && (
                      <ol className="mt-6 space-y-6">
                        {section.numberedPoints.map((point, index) => (
                          <li
                            key={point.title}
                            className="grid gap-4 border-l-2 border-purple-500/40 pl-6 md:grid-cols-[3rem_1fr]"
                          >
                            <span className="font-mono text-2xl font-bold text-purple-400">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <div>
                              <h3 className="text-lg font-bold">{point.title}</h3>
                              <p className="mt-2 text-base leading-7 text-[rgb(var(--muted))]">
                                {point.body}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    )}
                  </section>
                ))}
              </div>

              <footer className="mt-14 border-t border-[rgb(var(--card-border))] pt-8 text-center">
                <Link
                  href="/#writings"
                  className="inline-flex items-center gap-2 font-semibold text-purple-300 transition-colors hover:text-purple-200"
                >
                  <span aria-hidden="true">←</span>
                  Explore more PM learnings
                </Link>
              </footer>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
