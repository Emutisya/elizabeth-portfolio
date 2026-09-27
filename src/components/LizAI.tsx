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
    inputRef.current?.focus();
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [isOpen, isThinking, messages, reduceMotion]);

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
    inputRef.current?.focus();
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
            role="dialog"
            aria-modal="true"
            aria-label="Ask Liz AI about this portfolio"
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            onKeyDown={(event) => {
              if (event.key === "Escape") setIsOpen(false);
            }}
            className="fixed right-3 bottom-3 z-[80] flex h-[min(42rem,calc(100dvh-1.5rem))] w-[min(25rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[1.75rem] border border-purple-300/20 bg-[rgba(10,7,16,0.96)] shadow-[0_28px_100px_rgba(0,0,0,0.65),0_0_60px_rgba(126,34,206,0.15)] backdrop-blur-2xl sm:right-6 sm:bottom-6"
          >
            <div className="relative flex items-center gap-3 overflow-hidden border-b border-white/10 px-4 py-3.5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(168,85,247,0.24),transparent_45%)]" />
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-fuchsia-300/30 bg-purple-950/80">
                <Image
                  src="/liz-ai.png"
                  alt=""
                  fill
                  priority
                  className="scale-110 object-cover object-top"
                  sizes="48px"
                />
              </div>
              <div className="relative min-w-0 flex-1">
                <h2 className="font-display text-lg font-bold">Liz AI</h2>
                <p className="truncate text-xs text-purple-200/65">
                  Your guide to Liz’s work and world
                </p>
              </div>
              <button
                type="button"
                onClick={clearConversation}
                className="relative rounded-full p-2 text-purple-200/60 transition hover:bg-white/5 hover:text-purple-100"
                aria-label="Clear conversation"
                title="Clear conversation"
              >
                <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v5m4-5v5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="relative rounded-full p-2 text-purple-200/60 transition hover:bg-white/5 hover:text-purple-100"
                aria-label="Close Liz AI"
              >
                <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div
              ref={scrollRef}
              aria-live="polite"
              className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-5 [scrollbar-color:rgba(168,85,247,0.35)_transparent]"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={
                      message.role === "user"
                        ? "max-w-[84%] rounded-2xl rounded-br-md bg-gradient-to-br from-purple-600 to-fuchsia-600 px-4 py-3 text-sm leading-relaxed text-white shadow-lg shadow-purple-950/20"
                        : "max-w-[92%]"
                    }
                  >
                    {message.role === "assistant" && (
                      <div className="mb-2 flex items-center gap-2 text-[0.58rem] font-bold tracking-[0.16em] text-fuchsia-300 uppercase">
                        <span className="h-px w-5 bg-gradient-to-r from-fuchsia-400 to-transparent" />
                        Liz AI
                      </div>
                    )}
                    <p
                      className={
                        message.role === "assistant"
                          ? "text-sm leading-6 text-purple-50/90"
                          : ""
                      }
                    >
                      <TypingText text={message.text} animate={message.animate} />
                    </p>
                    {message.sources?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.sources.map((source) => {
                          const external = source.href.startsWith("http");
                          return (
                            <Link
                              key={`${message.id}-${source.href}`}
                              href={source.href}
                              target={external ? "_blank" : undefined}
                              rel={external ? "noopener noreferrer" : undefined}
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center gap-1.5 rounded-full border border-purple-300/15 bg-purple-400/[0.07] px-3 py-1.5 text-[0.68rem] font-semibold text-purple-200 transition hover:border-fuchsia-300/35 hover:bg-purple-400/15"
                            >
                              {source.label}
                              <span aria-hidden="true">↗</span>
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
                            className="rounded-full border border-white/10 px-3 py-1.5 text-left text-[0.68rem] leading-snug text-purple-100/75 transition hover:border-purple-400/40 hover:text-white"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex items-center gap-2 text-xs text-purple-200/60" role="status">
                  <span className="flex gap-1">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="h-1.5 w-1.5 rounded-full bg-fuchsia-300"
                        animate={reduceMotion ? undefined : { y: [0, -4, 0], opacity: [0.45, 1, 0.45] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.12 }}
                      />
                    ))}
                  </span>
                  Mapping that to Liz’s portfolio…
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="border-t border-white/10 p-3">
              <div className="flex items-center gap-2 rounded-2xl border border-purple-300/15 bg-white/[0.04] p-1.5 transition focus-within:border-fuchsia-300/35 focus-within:bg-white/[0.06]">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask me anything about Liz…"
                  maxLength={240}
                  className="min-w-0 flex-1 bg-transparent px-2.5 py-2 text-sm text-white outline-none placeholder:text-purple-100/35"
                  aria-label="Ask Liz AI a question"
                />
                {voiceSupported && (
                  <button
                    type="button"
                    onClick={startVoiceInput}
                    className={`rounded-xl p-2.5 transition ${
                      isListening
                        ? "bg-fuchsia-500/20 text-fuchsia-200"
                        : "text-purple-200/55 hover:bg-white/5 hover:text-purple-100"
                    }`}
                    aria-label={isListening ? "Listening" : "Ask with your voice"}
                    title="Ask with your voice"
                  >
                    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="9" y="3" width="6" height="12" rx="3" />
                      <path strokeLinecap="round" d="M6 11a6 6 0 0012 0M12 17v4m-4 0h8" />
                    </svg>
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!input.trim() || isThinking}
                  className="rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 p-2.5 text-white shadow-lg shadow-purple-950/30 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Send question"
                >
                  <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </button>
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
      >
        <motion.span
          aria-hidden="true"
          className="absolute -inset-1.5 rounded-full border border-fuchsia-300/25"
          animate={
            reduceMotion
              ? undefined
              : { scale: [0.98, 1.05, 0.98], opacity: [0.18, 0.42, 0.18] }
          }
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
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
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        {!isOpen && (
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full border border-fuchsia-200/25 bg-[#100918]/95 px-2 py-0.5 text-[0.48rem] font-black tracking-[0.14em] text-fuchsia-100 shadow-lg backdrop-blur-sm">
            AI
          </span>
        )}
        <span className="pointer-events-none absolute top-1/2 right-[calc(100%+0.75rem)] hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-purple-300/15 bg-[#100918]/95 px-3 py-2 text-[0.62rem] font-bold tracking-[0.16em] text-purple-100 uppercase opacity-0 shadow-xl backdrop-blur-xl transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
          Ask Liz AI
        </span>
      </motion.button>
    </>
  );
}
