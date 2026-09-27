"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  answerLizAIQuestion,
  lizAIStarterPrompts,
  type LizAISource,
} from "@/content/lizAI";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
  sources?: LizAISource[];
  suggestions?: string[];
  animate?: boolean;
};

type SpeechRecognitionResultEvent = Event & {
  results: ArrayLike<{ 0: { transcript: string } }>;
};

type SpeechRecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const STORAGE_KEY = "liz-ai-conversation-v1";

const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  text: "Hey, I’m Liz AI — your shortcut through this portfolio. Ask me about Liz’s impact, product thinking, career, writing, or the person behind the roadmap.",
  suggestions: lizAIStarterPrompts,
};

const contextualTeasers: Record<string, string> = {
  about: "Want the 30-second version of Liz’s career journey?",
  work: "I can unpack the impact behind these numbers.",
  writings: "Ask me which essay best shows Liz’s product thinking.",
  adventures: "There’s more to Liz than roadmaps. Want a fun fact?",
  contact: "Wondering whether Liz is the right person to talk to?",
  recommendations: "I can summarize what colleagues consistently value about Liz.",
};

const starterPromptDetails = [
  {
    question: lizAIStarterPrompts[0],
    label: "Impact",
    detail: "Outcomes & scale",
    color: "from-fuchsia-400 to-pink-500",
    path: "M4 16l5-5 4 4 7-8M16 7h4v4",
  },
  {
    question: lizAIStarterPrompts[1],
    label: "Signal",
    detail: "Strengths & craft",
    color: "from-violet-400 to-indigo-400",
    path: "M12 3l2.2 5.2L20 10l-4.4 3.6L17 20l-5-3-5 3 1.4-6.4L4 10l5.8-1.8L12 3z",
  },
  {
    question: lizAIStarterPrompts[2],
    label: "Thinking",
    detail: "Ideas & decisions",
    color: "from-cyan-300 to-teal-400",
    path: "M9 18h6M10 21h4M8.2 14.5A6 6 0 1115.8 14.5c-.9.7-1.3 1.4-1.3 2.5h-5c0-1.1-.4-1.8-1.3-2.5z",
  },
  {
    question: lizAIStarterPrompts[3],
    label: "Trust",
    detail: "Why Liz",
    color: "from-amber-300 to-orange-400",
    path: "M12 21s8-4.5 8-11V5l-8-2-8 2v5c0 6.5 8 11 8 11zm-3-10 2 2 4-4",
  },
] as const;

function createMessageId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function TypingText({ text, animate }: { text: string; animate?: boolean }) {
  const reduceMotion = useReducedMotion();
  const words = useMemo(() => text.split(" "), [text]);

  if (!animate || reduceMotion) return <>{text}</>;

  return (
    <>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.018, duration: 0.16 }}
          className="inline"
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </>
  );
}

export default function LizAI() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [teaser, setTeaser] = useState<string | null>(null);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const responseTimer = useRef<number | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as ChatMessage[];
          if (Array.isArray(parsed) && parsed.length) {
            setMessages(
              parsed.map((message) => ({ ...message, animate: false })),
            );
          }
        } catch {
          window.localStorage.removeItem(STORAGE_KEY);
        }
      }
      setVoiceSupported(
        Boolean(window.SpeechRecognition || window.webkitSpeechRecognition),
      );
      hydrated.current = true;
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (!isOpen) return;

    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [isOpen, isThinking, messages, reduceMotion]);

  useEffect(() => {
    const panel = panelRef.current;
    const viewport = window.visualViewport;
    if (!isOpen || !panel) return;
    if (!viewport) return;
    const assistantPanel: HTMLElement = panel;
    const visualViewport: VisualViewport = viewport;

    function syncPanelToVisualViewport() {
      const keyboardOffset = Math.max(
        0,
        window.innerHeight -
          visualViewport.height -
          visualViewport.offsetTop,
      );
      assistantPanel.style.setProperty(
        "--liz-ai-viewport-height",
        `${Math.round(visualViewport.height)}px`,
      );
      assistantPanel.style.setProperty(
        "--liz-ai-keyboard-offset",
        `${Math.round(keyboardOffset)}px`,
      );
    }

    syncPanelToVisualViewport();
    visualViewport.addEventListener("resize", syncPanelToVisualViewport);
    visualViewport.addEventListener("scroll", syncPanelToVisualViewport);
    window.addEventListener("resize", syncPanelToVisualViewport);

    return () => {
      visualViewport.removeEventListener("resize", syncPanelToVisualViewport);
      visualViewport.removeEventListener("scroll", syncPanelToVisualViewport);
      window.removeEventListener("resize", syncPanelToVisualViewport);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function closeOnOutsidePointer(event: PointerEvent) {
      if (
        panelRef.current &&
        event.target instanceof Node &&
        !panelRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () =>
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [isOpen]);

  useEffect(() => {
    function openFromHash() {
      if (window.location.hash !== "#ask-liz") return;
      setIsOpen(true);
      setTeaser(null);
      window.sessionStorage.setItem("liz-ai-teaser-seen", "true");
    }

    const timer = window.setTimeout(openFromHash, 0);
    window.addEventListener("hashchange", openFromHash);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, []);

  useEffect(() => {
    if (isOpen || window.sessionStorage.getItem("liz-ai-teaser-seen")) return;

    let currentContext = pathname === "/recommendations" ? "recommendations" : "about";
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) currentContext = visible.target.id;
      },
      { threshold: [0.25, 0.5, 0.75] },
    );

    ["about", "work", "writings", "adventures", "contact"].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    const timer = window.setTimeout(() => {
      setTeaser(contextualTeasers[currentContext]);
    }, 6500);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [isOpen, pathname]);

  useEffect(() => {
    if (!teaser || isOpen) return;

    const timer = window.setTimeout(() => {
      setTeaser(null);
      window.sessionStorage.setItem("liz-ai-teaser-seen", "true");
    }, 7000);

    return () => window.clearTimeout(timer);
  }, [isOpen, teaser]);

  useEffect(
    () => () => {
      if (responseTimer.current) window.clearTimeout(responseTimer.current);
    },
    [],
  );

  function openAssistant() {
    setIsOpen(true);
    setTeaser(null);
    window.sessionStorage.setItem("liz-ai-teaser-seen", "true");
  }

  function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || isThinking) return;

    setMessages((current) => [
      ...current.map((message) => ({ ...message, animate: false })),
      { id: createMessageId(), role: "user", text: trimmed },
    ]);
    setInput("");
    setIsThinking(true);

    const response = answerLizAIQuestion(trimmed);
    responseTimer.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: createMessageId(),
          role: "assistant",
          text: response.answer,
          sources: response.sources,
          suggestions: response.suggestions,
          animate: true,
        },
      ]);
      setIsThinking(false);
      responseTimer.current = null;
    }, reduceMotion ? 100 : 620);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    ask(input);
  }

  function clearConversation() {
    if (responseTimer.current) window.clearTimeout(responseTimer.current);
    responseTimer.current = null;
    setIsThinking(false);
    setMessages([welcomeMessage]);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  function startVoiceInput() {
    const Recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition || isListening) return;

    const recognition = new Recognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) {
        setInput(transcript);
        ask(transcript);
      }
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    setIsListening(true);
    recognition.start();
  }

  return (
    <>
      <AnimatePresence>
        {teaser && !isOpen && (
          <motion.button
            type="button"
            initial={reduceMotion ? false : { opacity: 0, x: 12, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.98 }}
            onClick={openAssistant}
            className="group fixed right-[6.1rem] bottom-[1.6rem] z-[79] w-[min(16rem,calc(100vw-7.35rem))] rounded-[1.35rem] bg-gradient-to-br from-fuchsia-300/55 via-purple-500/25 to-cyan-300/45 p-px text-left shadow-[0_18px_60px_rgba(0,0,0,0.42)] sm:right-[7rem] sm:bottom-[1.85rem]"
          >
            <span className="relative block rounded-[calc(1.35rem-1px)] bg-[rgba(15,9,23,0.94)] px-4 py-3 backdrop-blur-xl">
              <span className="mb-1.5 flex items-center gap-2 text-[0.58rem] font-bold tracking-[0.18em] text-fuchsia-300 uppercase">
                <span className="h-px w-5 bg-gradient-to-r from-fuchsia-300 to-transparent" />
                A quick detour?
              </span>
              <span className="block text-sm leading-relaxed font-medium text-purple-50">
                {teaser}
              </span>
              <span className="mt-2 inline-flex items-center gap-1 text-[0.62rem] font-bold tracking-[0.14em] text-cyan-200 uppercase transition group-hover:gap-2">
                Ask me <span aria-hidden="true">→</span>
              </span>
            </span>
            <span className="absolute top-1/2 -right-2 h-4 w-4 -translate-y-1/2 rotate-45 border-t border-r border-cyan-300/30 bg-[rgba(15,9,23,0.94)]" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            ref={panelRef}
            id="liz-ai-panel"
            role="dialog"
            aria-label="Ask Liz AI about this portfolio"
            initial={reduceMotion ? false : { opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.975 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            onKeyDown={(event) => {
              if (event.key === "Escape") setIsOpen(false);
            }}
            className="fixed right-3 bottom-[calc(0.75rem+var(--liz-ai-keyboard-offset,0px))] z-[80] flex h-[min(39rem,calc(var(--liz-ai-viewport-height,100dvh)-1.5rem))] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[1.8rem] border border-white/[0.11] bg-[rgba(8,5,14,0.965)] shadow-[0_30px_100px_rgba(0,0,0,0.72),0_0_80px_rgba(126,34,206,0.16)] backdrop-blur-2xl sm:right-6 sm:bottom-[calc(1.5rem+var(--liz-ai-keyboard-offset,0px))]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_4%,rgba(217,70,239,0.13),transparent_28%),radial-gradient(circle_at_88%_22%,rgba(34,211,238,0.07),transparent_24%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:28px_28px]"
            />

            <header className="relative flex items-center gap-3 border-b border-white/[0.08] px-4 py-3.5">
              <div className="relative h-11 w-11 shrink-0">
                <motion.span
                  aria-hidden="true"
                  className="absolute -inset-1 rounded-[1.05rem] border border-dashed border-fuchsia-300/35"
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative h-full w-full overflow-hidden rounded-[0.9rem] border border-fuchsia-300/25 bg-purple-950/80">
                  <Image
                    src="/liz-ai.png"
                    alt=""
                    fill
                    priority
                    className="scale-110 object-cover object-top"
                    sizes="44px"
                  />
                </div>
                <span className="absolute -right-1 -bottom-1 h-2.5 w-2.5 rounded-full border-2 border-[#0b0711] bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]" />
              </div>
              <div className="relative min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <h2 className="font-display text-lg font-bold tracking-tight">
                    Liz AI
                  </h2>
                  <span className="text-[0.5rem] font-bold tracking-[0.18em] text-fuchsia-300 uppercase">
                    Beta
                  </span>
                </div>
                <p className="truncate text-[0.64rem] font-medium tracking-[0.08em] text-purple-200/60 uppercase">
                  Portfolio intelligence
                </p>
              </div>
              {messages.length > 1 && (
                <button
                  type="button"
                  onClick={clearConversation}
                  className="relative rounded-full p-2 text-purple-200/45 transition hover:bg-white/5 hover:text-purple-100"
                  aria-label="Clear conversation"
                  title="Clear conversation"
                >
                  <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v5m4-5v5" />
                  </svg>
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="relative rounded-full p-2 text-purple-200/45 transition hover:bg-white/5 hover:text-purple-100"
                aria-label="Close Liz AI"
              >
                <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </header>

            <div
              ref={scrollRef}
              aria-live="polite"
              className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-5 [scrollbar-color:rgba(168,85,247,0.35)_transparent]"
            >
              {messages.map((message) => {
                if (message.id === "welcome" && messages.length > 1) return null;

                if (message.id === "welcome") {
                  return (
                    <motion.div
                      key={message.id}
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.09] bg-white/[0.025] p-4"
                    >
                      <div
                        aria-hidden="true"
                        className="absolute -top-20 -right-16 h-44 w-44 rounded-full bg-fuchsia-500/15 blur-3xl"
                      />
                      <div className="relative">
                        <div className="mb-4 flex items-center justify-between">
                          <span className="flex items-center gap-2 text-[0.56rem] font-bold tracking-[0.18em] text-cyan-200/80 uppercase">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-50 motion-reduce:animate-none" />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-300" />
                            </span>
                            Portfolio signal online
                          </span>
                          <span className="font-mono text-[0.52rem] text-purple-200/35">
                            LIZ.OS / 01
                          </span>
                        </div>
                        <h3 className="max-w-[15rem] font-display text-[1.75rem] leading-[1.02] font-semibold tracking-[-0.04em]">
                          Ask beyond
                          <span className="block bg-gradient-to-r from-fuchsia-300 via-purple-300 to-cyan-200 bg-clip-text text-transparent">
                            the résumé.
                          </span>
                        </h3>
                        <p className="mt-3 max-w-[19rem] text-xs leading-5 text-purple-100/55">
                          Explore the decisions, impact, ideas, and human signal
                          behind Liz’s work.
                        </p>

                        <div className="mt-5 grid grid-cols-2 gap-2">
                          {starterPromptDetails.map((prompt, index) => (
                            <motion.button
                              type="button"
                              key={prompt.question}
                              onClick={() => ask(prompt.question)}
                              aria-label={prompt.question}
                              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.08 + index * 0.055 }}
                              className="group relative min-h-[5rem] overflow-hidden rounded-2xl border border-white/[0.08] bg-black/20 p-3 text-left transition hover:-translate-y-0.5 hover:border-purple-300/25 hover:bg-white/[0.045]"
                            >
                              <span
                                aria-hidden="true"
                                className={`absolute inset-x-3 top-0 h-px bg-gradient-to-r ${prompt.color}`}
                              />
                              <span className="flex items-start justify-between">
                                <span
                                  className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${prompt.color} text-[#0a0710] shadow-lg`}
                                >
                                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={prompt.path} />
                                  </svg>
                                </span>
                                <span className="text-purple-200/25 transition group-hover:translate-x-0.5 group-hover:text-purple-100/70">
                                  ↗
                                </span>
                              </span>
                              <span className="mt-2 block text-xs font-bold text-purple-50">
                                {prompt.label}
                              </span>
                              <span className="mt-0.5 block text-[0.6rem] text-purple-100/60">
                                {prompt.detail}
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                return (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={
                        message.role === "user"
                          ? "max-w-[84%] rounded-[1.25rem] rounded-br-md bg-gradient-to-br from-purple-600 to-fuchsia-600 px-4 py-3 text-sm leading-relaxed text-white shadow-[0_12px_30px_rgba(88,28,135,0.24)]"
                          : "max-w-[94%] rounded-[1.35rem] border border-white/[0.07] bg-white/[0.025] p-4"
                      }
                    >
                      {message.role === "assistant" && (
                        <div className="mb-2.5 flex items-center gap-2 text-[0.56rem] font-bold tracking-[0.16em] text-fuchsia-300 uppercase">
                          <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-300 shadow-[0_0_8px_rgba(232,121,249,0.75)]" />
                          Liz AI
                        </div>
                      )}
                      <p
                        className={
                          message.role === "assistant"
                            ? "text-sm leading-6 text-purple-50/85"
                            : ""
                        }
                      >
                        <TypingText text={message.text} animate={message.animate} />
                      </p>
                      {message.sources?.length ? (
                        <div className="mt-4 grid gap-2">
                          {message.sources.map((source) => {
                            const external = source.href.startsWith("http");
                            return (
                              <Link
                                key={`${message.id}-${source.href}`}
                                href={source.href}
                                target={external ? "_blank" : undefined}
                                rel={external ? "noopener noreferrer" : undefined}
                                onClick={() => setIsOpen(false)}
                                className="group flex items-center justify-between rounded-xl border border-purple-300/10 bg-purple-400/[0.055] px-3 py-2 text-[0.68rem] font-semibold text-purple-100/75 transition hover:border-cyan-300/25 hover:bg-purple-400/10 hover:text-white"
                              >
                                <span className="flex items-center gap-2">
                                  <span className="h-1 w-1 rounded-full bg-cyan-300" />
                                  {source.label}
                                </span>
                                <span aria-hidden="true" className="transition group-hover:translate-x-0.5">
                                  ↗
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      ) : null}
                      {message.role === "assistant" &&
                      message.id === messages.at(-1)?.id &&
                      message.suggestions?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.suggestions.slice(0, 3).map((suggestion) => (
                            <button
                              type="button"
                              key={suggestion}
                              onClick={() => ask(suggestion)}
                              className="rounded-full border border-white/[0.08] px-3 py-2 text-left text-[0.68rem] leading-snug text-purple-100/65 transition hover:border-fuchsia-300/25 hover:bg-white/[0.03] hover:text-white"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}

              {isThinking && (
                <div
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-3 text-xs text-purple-100/55"
                  role="status"
                >
                  <span className="flex h-7 items-center gap-0.5">
                    {[0, 1, 2, 3].map((bar) => (
                      <motion.span
                        key={bar}
                        className="w-0.5 rounded-full bg-gradient-to-t from-fuchsia-400 to-cyan-200"
                        animate={
                          reduceMotion
                            ? { height: 8 }
                            : { height: [5, 18 - bar * 2, 7] }
                        }
                        transition={{
                          duration: 0.85,
                          repeat: Infinity,
                          delay: bar * 0.1,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </span>
                  <span>
                    <span className="block text-[0.55rem] font-bold tracking-[0.15em] text-fuchsia-300 uppercase">
                      Reading the signal
                    </span>
                    <span className="mt-0.5 block text-[0.65rem]">
                      Mapping that to Liz’s portfolio…
                    </span>
                  </span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="relative p-3 pt-2">
              <span
                aria-hidden="true"
                className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-purple-300/20 to-transparent"
              />
              <div className="rounded-[1.2rem] bg-gradient-to-r from-purple-400/30 via-fuchsia-300/15 to-cyan-300/30 p-px shadow-[0_12px_35px_rgba(0,0,0,0.28)]">
                <div className="flex items-center gap-1 rounded-[calc(1.2rem-1px)] bg-[rgba(17,11,26,0.96)] p-1.5">
                  <span className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center text-fuchsia-300/70">
                    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l1.7 5.3L19 10l-4.1 3.2L16 19l-4-2.5L8 19l1.1-5.8L5 10l5.3-1.7L12 3z" />
                    </svg>
                  </span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask anything about Liz…"
                    maxLength={240}
                    enterKeyHint="send"
                    className="min-w-0 flex-1 bg-transparent px-1.5 py-2.5 text-sm text-white outline-none placeholder:text-purple-100/30"
                    aria-label="Ask Liz AI a question"
                  />
                  {voiceSupported && (
                    <button
                      type="button"
                      onClick={startVoiceInput}
                      className={`relative rounded-xl p-2.5 transition ${
                        isListening
                          ? "bg-fuchsia-500/15 text-fuchsia-200"
                          : "text-purple-200/45 hover:bg-white/5 hover:text-purple-100"
                      }`}
                      aria-label={isListening ? "Listening" : "Ask with your voice"}
                      title="Ask with your voice"
                    >
                      {isListening && (
                        <motion.span
                          aria-hidden="true"
                          className="absolute inset-1 rounded-lg border border-fuchsia-300/40"
                          animate={reduceMotion ? undefined : { scale: [0.8, 1.15], opacity: [0.7, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                      <svg aria-hidden="true" className="relative h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="9" y="3" width="6" height="12" rx="3" />
                        <path strokeLinecap="round" d="M6 11a6 6 0 0012 0M12 17v4m-4 0h8" />
                      </svg>
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={!input.trim() || isThinking}
                    className="rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 p-2.5 text-white shadow-[0_8px_22px_rgba(126,34,206,0.35)] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-25"
                    aria-label="Send question"
                  >
                    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={isOpen ? () => setIsOpen(false) : openAssistant}
        animate={isOpen ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
        whileHover={reduceMotion ? undefined : { scale: 1.05, y: -2 }}
        whileTap={reduceMotion ? undefined : { scale: 0.96 }}
        className={`group fixed right-4 bottom-4 z-[81] h-16 w-16 rounded-full bg-gradient-to-br from-fuchsia-300 via-purple-500 to-cyan-300 p-px shadow-[0_14px_38px_rgba(126,34,206,0.32)] sm:right-6 sm:bottom-6 ${
          isOpen ? "pointer-events-none" : ""
        }`}
        aria-label={isOpen ? "Close Liz AI" : "Open Liz AI"}
        aria-expanded={isOpen}
        aria-controls="liz-ai-panel"
      >
        <motion.span
          aria-hidden="true"
          className="absolute -inset-2 rounded-full bg-[conic-gradient(from_90deg,transparent_0deg,rgba(232,121,249,0.7)_48deg,transparent_105deg,rgba(103,232,249,0.55)_185deg,transparent_245deg)] opacity-55"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        />
        <span
          aria-hidden="true"
          className="absolute -inset-[0.42rem] rounded-full bg-[#0a0a0a]"
        />
        <span
          aria-hidden="true"
          className="absolute -inset-[0.34rem] rounded-full border border-purple-300/15"
        />
        <span className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#100918]">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.svg
                key="close"
                initial={{ opacity: 0, rotate: -20 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0 }}
                className="h-6 w-6 text-purple-100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
              </motion.svg>
            ) : (
              <motion.span
                key="portrait"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <Image
                  src="/liz-ai.png"
                  alt=""
                  fill
                  priority
                  className="scale-[1.16] object-cover object-top transition-transform duration-300 group-hover:scale-[1.2]"
                  sizes="64px"
                />
                <motion.span
                  aria-hidden="true"
                  className="absolute -top-4 -bottom-4 -left-8 w-5 rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-sm"
                  animate={reduceMotion ? undefined : { x: [0, 120] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    repeatDelay: 4.5,
                    ease: "easeInOut",
                  }}
                />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        {!isOpen && (
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 -rotate-2 whitespace-nowrap border border-purple-500/45 bg-[#100918]/95 px-2.5 py-0.5 text-[0.48rem] font-black tracking-[0.16em] text-purple-200 uppercase shadow-[3px_3px_0_rgba(168,85,247,0.22)]">
            LIZ AI
          </span>
        )}
        <span className="pointer-events-none absolute top-1/2 right-[calc(100%+0.75rem)] hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-purple-300/15 bg-[#100918]/95 px-3 py-2 text-[0.62rem] font-bold tracking-[0.16em] text-purple-100 uppercase opacity-0 shadow-xl backdrop-blur-xl transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
          Ask Liz AI
        </span>
      </motion.button>
    </>
  );
}
