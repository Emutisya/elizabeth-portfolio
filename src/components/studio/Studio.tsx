"use client";

import {
  type FormEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  gradients,
  type FeaturedWork,
  type Recommendation,
  type SiteContent,
  type SkillCategory,
  type TimelineItem,
} from "@/lib/site-content";

const TOKEN_KEY = "liz-portfolio-studio-token";

type Tab = "timeline" | "recommendations" | "featuredWork" | "skills";
type Notice = { kind: "success" | "error" | "info"; message: string };

type ContentResponse = {
  content: SiteContent;
  sha: string;
};

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "timeline", label: "Career timeline" },
  { id: "recommendations", label: "Recommendations" },
  { id: "featuredWork", label: "Featured work" },
  { id: "skills", label: "Skills" },
];

function linesToList(value: string): string[] {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function moveItem<T>(items: T[], index: number, offset: -1 | 1): T[] {
  const nextIndex = index + offset;
  if (nextIndex < 0 || nextIndex >= items.length) return items;
  const copy = [...items];
  [copy[index], copy[nextIndex]] = [copy[nextIndex], copy[index]];
  return copy;
}

async function readApiError(response: Response): Promise<string> {
  const body = (await response.json().catch(() => null)) as {
    error?: string;
  } | null;
  return body?.error ?? `Request failed with status ${response.status}.`;
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
  rows = 4,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  type?: "text" | "password";
}) {
  const className =
    "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20";

  return (
    <label className="block text-sm font-medium text-white/75">
      {label}
      {multiline ? (
        <textarea
          className={`${className} resize-y`}
          value={value}
          rows={rows}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          className={className}
          value={value}
          type={type}
          placeholder={placeholder}
          autoComplete={type === "password" ? "off" : undefined}
          spellCheck={type === "password" ? false : undefined}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function ItemActions({
  index,
  count,
  onMove,
  onRemove,
}: {
  index: number;
  count: number;
  onMove: (offset: -1 | 1) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        disabled={index === 0}
        onClick={() => onMove(-1)}
        className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-white/70 transition hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
      >
        Move up
      </button>
      <button
        type="button"
        disabled={index === count - 1}
        onClick={() => onMove(1)}
        className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-white/70 transition hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
      >
        Move down
      </button>
      <button
        type="button"
        disabled={count === 1}
        onClick={onRemove}
        className="rounded-lg border border-red-400/20 px-3 py-2 text-xs font-semibold text-red-300 transition hover:border-red-400/50 disabled:cursor-not-allowed disabled:opacity-30"
      >
        Remove
      </button>
    </div>
  );
}

function EditorCard({
  number,
  title,
  actions,
  children,
}: {
  number: number;
  title: string;
  actions: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:p-6">
      <div className="mb-5 flex flex-col justify-between gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-center">
        <div>
          <span className="font-mono text-xs text-purple-300">
            {String(number).padStart(2, "0")}
          </span>
          <h3 className="mt-1 font-semibold text-white">{title}</h3>
        </div>
        {actions}
      </div>
      {children}
    </article>
  );
}

function AddButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl border border-dashed border-purple-400/40 bg-purple-500/5 px-5 py-4 text-sm font-semibold text-purple-200 transition hover:border-purple-300 hover:bg-purple-500/10"
    >
      + {children}
    </button>
  );
}

function Login({
  token,
  setToken,
  busy,
  notice,
  onSubmit,
}: {
  token: string;
  setToken: (token: string) => void;
  busy: boolean;
  notice: Notice | null;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#08080b] px-6 py-16 text-white">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#111117] p-7 shadow-2xl shadow-purple-950/20 sm:p-10">
        <div className="mb-8">
          <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-xs font-bold tracking-widest text-purple-300 uppercase">
            Private
          </span>
          <h1 className="mt-5 text-3xl font-bold">Portfolio Studio</h1>
          <p className="mt-3 leading-relaxed text-white/55">
            Sign in with a fine-grained GitHub token for the Emutisya account.
            The token stays in this browser tab and is never saved by the site.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <Field
            label="GitHub token"
            type="password"
            value={token}
            placeholder="github_pat_..."
            onChange={setToken}
          />
          {notice && (
            <p
              role="alert"
              className={`rounded-xl border px-4 py-3 text-sm ${
                notice.kind === "error"
                  ? "border-red-400/20 bg-red-500/10 text-red-200"
                  : "border-purple-400/20 bg-purple-500/10 text-purple-200"
              }`}
            >
              {notice.message}
            </p>
          )}
          <button
            type="submit"
            disabled={busy || !token.trim()}
            className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 font-bold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? "Checking access..." : "Open Studio"}
          </button>
        </form>

        <p className="mt-6 text-xs leading-relaxed text-white/40">
          Required token access: only the{" "}
          <strong className="text-white/60">elizabeth-portfolio</strong>{" "}
          repository, with Contents set to Read and write.
        </p>
      </div>
    </main>
  );
}

export default function Studio() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<string | null>(null);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [sha, setSha] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("timeline");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [ready, setReady] = useState(false);

  const request = useCallback(
    async (path: string, init?: RequestInit) => {
      const response = await fetch(path, {
        ...init,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          ...init?.headers,
        },
      });
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          window.sessionStorage.removeItem(TOKEN_KEY);
        }
        throw new Error(await readApiError(response));
      }
      return response;
    },
    [token],
  );

  const authenticate = useCallback(
    async (candidate: string) => {
      setBusy(true);
      setNotice(null);
      try {
        const response = await fetch("/api/studio/session", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${candidate}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error(await readApiError(response));
        const body = (await response.json()) as {
          user: { name: string };
        };
        const contentResponse = await fetch("/api/studio/content", {
          headers: {
            Authorization: `Bearer ${candidate}`,
            "Content-Type": "application/json",
          },
        });
        if (!contentResponse.ok) {
          throw new Error(await readApiError(contentResponse));
        }
        const contentBody = (await contentResponse.json()) as ContentResponse;
        window.sessionStorage.setItem(TOKEN_KEY, candidate);
        setToken(candidate);
        setUser(body.user.name);
        setContent(contentBody.content);
        setSha(contentBody.sha);
      } catch (error) {
        window.sessionStorage.removeItem(TOKEN_KEY);
        setUser(null);
        setContent(null);
        setNotice({
          kind: "error",
          message:
            error instanceof Error ? error.message : "Unable to sign in.",
        });
      } finally {
        setBusy(false);
        setReady(true);
      }
    },
    [],
  );

  useEffect(() => {
    const savedToken = window.sessionStorage.getItem(TOKEN_KEY);
    if (!savedToken) {
      void Promise.resolve().then(() => setReady(true));
      return;
    }
    void Promise.resolve().then(() => {
      setToken(savedToken);
      void authenticate(savedToken);
    });
  }, [authenticate]);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const candidate = token.trim();
    if (candidate) void authenticate(candidate);
  }

  function updateContent<Key extends keyof SiteContent>(
    key: Key,
    value: SiteContent[Key],
  ) {
    setContent((current) => (current ? { ...current, [key]: value } : current));
    setNotice(null);
  }

  function signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    setUser(null);
    setContent(null);
    setSha("");
    setNotice(null);
  }

  async function save() {
    if (!content || !sha) return;
    setBusy(true);
    setNotice({ kind: "info", message: "Saving a new content revision..." });
    try {
      const response = await request("/api/studio/content", {
        method: "PUT",
        body: JSON.stringify({ content, sha }),
      });
      const body = (await response.json()) as {
        message: string;
        sha: string;
      };
      setSha(body.sha);
      setNotice({ kind: "success", message: body.message });
    } catch (error) {
      setNotice({
        kind: "error",
        message: error instanceof Error ? error.message : "Save failed.",
      });
    } finally {
      setBusy(false);
    }
  }

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#08080b] text-sm text-white/60">
        Opening Portfolio Studio...
      </main>
    );
  }

  if (!user) {
    return (
      <Login
        token={token}
        setToken={setToken}
        busy={busy}
        notice={notice}
        onSubmit={handleLogin}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#08080b] text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#08080b]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold tracking-widest text-purple-300 uppercase">
              Private backend
            </p>
            <h1 className="mt-1 text-xl font-bold">Portfolio Studio</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-white/50 sm:inline">
              Signed in as {user}
            </span>
            <button
              type="button"
              onClick={signOut}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-white/70 hover:border-white/30 hover:text-white"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[16rem_1fr]">
        <aside>
          <nav className="sticky top-28 space-y-2" aria-label="Content sections">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-purple-500 text-white"
                    : "text-white/55 hover:bg-white/5 hover:text-white"
                }`}
              >
                {tab.label}
                {content && (
                  <span className="font-mono text-xs opacity-70">
                    {content[tab.id].length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        <section className="min-w-0">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </h2>
              <p className="mt-2 text-sm text-white/45">
                Changes are published through an auditable GitHub commit.
              </p>
            </div>
            <button
              type="button"
              disabled={busy || !content}
              onClick={() => void save()}
              className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-bold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? "Working..." : "Save & publish"}
            </button>
          </div>

          {notice && (
            <div
              role={notice.kind === "error" ? "alert" : "status"}
              className={`mb-6 rounded-xl border px-4 py-3 text-sm ${
                notice.kind === "error"
                  ? "border-red-400/20 bg-red-500/10 text-red-200"
                  : notice.kind === "success"
                    ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
                    : "border-purple-400/20 bg-purple-500/10 text-purple-200"
              }`}
            >
              {notice.message}
            </div>
          )}

          {!content ? (
            <div className="rounded-2xl border border-white/10 p-8 text-center text-white/50">
              {busy ? "Loading content..." : "Content could not be loaded."}
            </div>
          ) : (
            <>
              {activeTab === "timeline" && (
                <div className="space-y-5">
                  {content.timeline.map((item, index) => (
                    <EditorCard
                      key={`${index}-${item.year}`}
                      number={index + 1}
                      title={item.title || "Untitled milestone"}
                      actions={
                        <ItemActions
                          index={index}
                          count={content.timeline.length}
                          onMove={(offset) =>
                            updateContent(
                              "timeline",
                              moveItem(content.timeline, index, offset),
                            )
                          }
                          onRemove={() =>
                            updateContent(
                              "timeline",
                              content.timeline.filter((_, i) => i !== index),
                            )
                          }
                        />
                      }
                    >
                      <div className="grid gap-5 sm:grid-cols-[9rem_1fr]">
                        <Field
                          label="Year"
                          value={item.year}
                          onChange={(year) => {
                            const timeline = [...content.timeline];
                            timeline[index] = { ...item, year };
                            updateContent("timeline", timeline);
                          }}
                        />
                        <Field
                          label="Title"
                          value={item.title}
                          onChange={(title) => {
                            const timeline = [...content.timeline];
                            timeline[index] = { ...item, title };
                            updateContent("timeline", timeline);
                          }}
                        />
                      </div>
                      <div className="mt-5">
                        <Field
                          label="Details (one per line)"
                          multiline
                          value={item.details.join("\n")}
                          onChange={(details) => {
                            const timeline = [...content.timeline];
                            timeline[index] = {
                              ...item,
                              details: linesToList(details),
                            };
                            updateContent("timeline", timeline);
                          }}
                        />
                      </div>
                    </EditorCard>
                  ))}
                  <AddButton
                    onClick={() =>
                      updateContent("timeline", [
                        ...content.timeline,
                        {
                          year: new Date().getFullYear().toString(),
                          title: "New milestone",
                          details: ["Add a detail"],
                        } satisfies TimelineItem,
                      ])
                    }
                  >
                    Add timeline milestone
                  </AddButton>
                </div>
              )}

              {activeTab === "recommendations" && (
                <div className="space-y-5">
                  {content.recommendations.map((item, index) => (
                    <EditorCard
                      key={`${index}-${item.name}`}
                      number={index + 1}
                      title={item.name || "New recommendation"}
                      actions={
                        <ItemActions
                          index={index}
                          count={content.recommendations.length}
                          onMove={(offset) =>
                            updateContent(
                              "recommendations",
                              moveItem(content.recommendations, index, offset),
                            )
                          }
                          onRemove={() =>
                            updateContent(
                              "recommendations",
                              content.recommendations.filter(
                                (_, i) => i !== index,
                              ),
                            )
                          }
                        />
                      }
                    >
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                          label="Name"
                          value={item.name}
                          onChange={(name) => {
                            const recommendations = [...content.recommendations];
                            recommendations[index] = { ...item, name };
                            updateContent("recommendations", recommendations);
                          }}
                        />
                        <Field
                          label="Work title"
                          value={item.title}
                          onChange={(title) => {
                            const recommendations = [...content.recommendations];
                            recommendations[index] = { ...item, title };
                            updateContent("recommendations", recommendations);
                          }}
                        />
                        <Field
                          label="Company"
                          value={item.company}
                          onChange={(company) => {
                            const recommendations = [...content.recommendations];
                            recommendations[index] = { ...item, company };
                            updateContent("recommendations", recommendations);
                          }}
                        />
                        <Field
                          label="Theme label"
                          value={item.theme}
                          onChange={(theme) => {
                            const recommendations = [...content.recommendations];
                            recommendations[index] = { ...item, theme };
                            updateContent("recommendations", recommendations);
                          }}
                        />
                      </div>
                      <div className="mt-5">
                        <label className="block text-sm font-medium text-white/75">
                          Color theme
                          <select
                            value={item.gradient}
                            onChange={(event) => {
                              const recommendations = [
                                ...content.recommendations,
                              ];
                              recommendations[index] = {
                                ...item,
                                gradient: event.target
                                  .value as Recommendation["gradient"],
                              };
                              updateContent(
                                "recommendations",
                                recommendations,
                              );
                            }}
                            className="mt-2 w-full rounded-xl border border-white/10 bg-[#111117] px-4 py-3 text-sm text-white outline-none focus:border-purple-400"
                          >
                            {gradients.map((gradient) => (
                              <option key={gradient} value={gradient}>
                                {gradient
                                  .replaceAll("-500", "")
                                  .replace("from-", "")
                                  .replace(" to-", " to ")}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                      <div className="mt-5">
                        <Field
                          label="Recommendation"
                          multiline
                          rows={5}
                          value={item.quote}
                          onChange={(quote) => {
                            const recommendations = [...content.recommendations];
                            recommendations[index] = { ...item, quote };
                            updateContent("recommendations", recommendations);
                          }}
                        />
                      </div>
                    </EditorCard>
                  ))}
                  <AddButton
                    onClick={() =>
                      updateContent("recommendations", [
                        ...content.recommendations,
                        {
                          quote: "Add the recommendation text",
                          name: "Colleague name",
                          title: "Work title",
                          company: "Microsoft",
                          theme: "Collaboration",
                          gradient: gradients[0],
                        } satisfies Recommendation,
                      ])
                    }
                  >
                    Add recommendation
                  </AddButton>
                </div>
              )}

              {activeTab === "featuredWork" && (
                <div className="space-y-5">
                  {content.featuredWork.map((item, index) => (
                    <EditorCard
                      key={item.id}
                      number={index + 1}
                      title={item.title || "New project"}
                      actions={
                        <ItemActions
                          index={index}
                          count={content.featuredWork.length}
                          onMove={(offset) =>
                            updateContent(
                              "featuredWork",
                              moveItem(content.featuredWork, index, offset),
                            )
                          }
                          onRemove={() =>
                            updateContent(
                              "featuredWork",
                              content.featuredWork.filter((_, i) => i !== index),
                            )
                          }
                        />
                      }
                    >
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                          label="Project title"
                          value={item.title}
                          onChange={(title) => {
                            const featuredWork = [...content.featuredWork];
                            featuredWork[index] = { ...item, title };
                            updateContent("featuredWork", featuredWork);
                          }}
                        />
                        <Field
                          label="Role"
                          value={item.role}
                          onChange={(role) => {
                            const featuredWork = [...content.featuredWork];
                            featuredWork[index] = { ...item, role };
                            updateContent("featuredWork", featuredWork);
                          }}
                        />
                      </div>
                      <div className="mt-5">
                        <Field
                          label="Problem"
                          multiline
                          value={item.problem}
                          onChange={(problem) => {
                            const featuredWork = [...content.featuredWork];
                            featuredWork[index] = { ...item, problem };
                            updateContent("featuredWork", featuredWork);
                          }}
                        />
                      </div>
                      <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        <Field
                          label="Actions (one per line)"
                          multiline
                          rows={7}
                          value={item.actions.join("\n")}
                          onChange={(actions) => {
                            const featuredWork = [...content.featuredWork];
                            featuredWork[index] = {
                              ...item,
                              actions: linesToList(actions),
                            };
                            updateContent("featuredWork", featuredWork);
                          }}
                        />
                        <Field
                          label="Impact (one per line)"
                          multiline
                          rows={7}
                          value={item.impact.join("\n")}
                          onChange={(impact) => {
                            const featuredWork = [...content.featuredWork];
                            featuredWork[index] = {
                              ...item,
                              impact: linesToList(impact),
                            };
                            updateContent("featuredWork", featuredWork);
                          }}
                        />
                      </div>
                      <div className="mt-5">
                        <Field
                          label="Tags (one per line)"
                          multiline
                          rows={3}
                          value={item.tags.join("\n")}
                          onChange={(tags) => {
                            const featuredWork = [...content.featuredWork];
                            featuredWork[index] = {
                              ...item,
                              tags: linesToList(tags),
                            };
                            updateContent("featuredWork", featuredWork);
                          }}
                        />
                      </div>
                    </EditorCard>
                  ))}
                  <AddButton
                    onClick={() => {
                      const nextId =
                        Math.max(
                          0,
                          ...content.featuredWork.map((item) => item.id),
                        ) + 1;
                      updateContent("featuredWork", [
                        ...content.featuredWork,
                        {
                          id: nextId,
                          title: "New featured project",
                          problem: "Describe the problem",
                          role: "Product Manager",
                          actions: ["Add an action"],
                          impact: ["Add an outcome"],
                          tags: ["Product"],
                          gradient: gradients[
                            content.featuredWork.length % gradients.length
                          ],
                        } satisfies FeaturedWork,
                      ]);
                    }}
                  >
                    Add featured project
                  </AddButton>
                </div>
              )}

              {activeTab === "skills" && (
                <div className="space-y-5">
                  {content.skills.map((item, index) => (
                    <EditorCard
                      key={`${index}-${item.title}`}
                      number={index + 1}
                      title={item.title || "New skill category"}
                      actions={
                        <ItemActions
                          index={index}
                          count={content.skills.length}
                          onMove={(offset) =>
                            updateContent(
                              "skills",
                              moveItem(content.skills, index, offset),
                            )
                          }
                          onRemove={() =>
                            updateContent(
                              "skills",
                              content.skills.filter((_, i) => i !== index),
                            )
                          }
                        />
                      }
                    >
                      <Field
                        label="Category"
                        value={item.title}
                        onChange={(title) => {
                          const skills = [...content.skills];
                          skills[index] = { ...item, title };
                          updateContent("skills", skills);
                        }}
                      />
                      <div className="mt-5">
                        <Field
                          label="Skills (one per line)"
                          multiline
                          rows={7}
                          value={item.skills.join("\n")}
                          onChange={(skillsText) => {
                            const skills = [...content.skills];
                            skills[index] = {
                              ...item,
                              skills: linesToList(skillsText),
                            };
                            updateContent("skills", skills);
                          }}
                        />
                      </div>
                    </EditorCard>
                  ))}
                  <AddButton
                    onClick={() =>
                      updateContent("skills", [
                        ...content.skills,
                        {
                          title: "New category",
                          skills: ["Add a skill"],
                        } satisfies SkillCategory,
                      ])
                    }
                  >
                    Add skill category
                  </AddButton>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
