export type LizAISource = {
  label: string;
  href: string;
};

export type LizAIResponse = {
  answer: string;
  sources: LizAISource[];
  suggestions: string[];
};

type KnowledgeEntry = LizAIResponse & {
  keywords: string[];
  phrases?: string[];
};

export const lizAIStarterPrompts = [
  "What impact has Liz delivered?",
  "What is Liz best at?",
  "Show me her product thinking",
  "Why should I work with Liz?",
];

const knowledge: KnowledgeEntry[] = [
  {
    keywords: [
      "impact",
      "results",
      "metrics",
      "achievement",
      "achievements",
      "delivered",
      "outcomes",
      "project",
      "projects",
      "work",
    ],
    phrases: ["biggest impact", "featured work", "what has liz built"],
    answer:
      "Liz turns complex platform problems into measurable outcomes. Her featured work includes cutting onboarding latency by 60%, reaching 92% SLA compliance, bringing 1,200+ Microsoft Graph permissions under unified governance, migrating 158 workloads, and reducing manual operational effort by 50%.",
    sources: [{ label: "Explore featured work", href: "/#work" }],
    suggestions: [
      "How did she achieve those results?",
      "What are her strongest skills?",
      "What do colleagues say?",
    ],
  },
  {
    keywords: [
      "how",
      "approach",
      "process",
      "method",
      "strategy",
      "product",
      "thinking",
      "lead",
      "leadership",
    ],
    phrases: ["how does liz work", "product thinking", "leadership style"],
    answer:
      "Liz’s operating rhythm is simple: find the pattern, create clarity, align teams, and measure impact. In practice, that means mapping ambiguous workflows, defining a clear product strategy, aligning engineering and stakeholder groups, writing testable requirements, and instrumenting outcomes rather than stopping at launch.",
    sources: [
      { label: "See her approach", href: "/#approach" },
      { label: "Read her product essays", href: "/#writings" },
    ],
    suggestions: [
      "Show me a concrete project",
      "What does she write about?",
      "Why should I work with Liz?",
    ],
  },
  {
    keywords: [
      "skill",
      "skills",
      "strength",
      "strengths",
      "best",
      "expertise",
      "toolkit",
      "technical",
      "good",
    ],
    phrases: ["what is liz best at", "core strengths"],
    answer:
      "Liz is strongest where product strategy, technical depth, and operational execution meet. Her toolkit spans platform governance, Microsoft Graph and REST APIs, roadmaps and OKRs, stakeholder alignment, UX research, telemetry, change management, and turning ambiguous enterprise workflows into scalable self-service systems.",
    sources: [
      { label: "Browse skills", href: "/#skills" },
      { label: "See proof in her projects", href: "/#work" },
    ],
    suggestions: [
      "What impact has she delivered?",
      "What do colleagues say?",
      "Tell me about her career journey",
    ],
  },
  {
    keywords: [
      "career",
      "journey",
      "background",
      "history",
      "experience",
      "spotify",
      "microsoft",
      "developer",
      "education",
      "strathmore",
    ],
    phrases: ["tell me about liz", "who is liz", "career journey"],
    answer:
      "Liz began in software development after studying Informatics and Computer Science at Strathmore University. She later worked as a Spotify software engineering intern in Cairo, moved into product through a Microsoft PM internship, and now leads permissions, governance, onboarding, automation, and platform-modernization initiatives at Microsoft.",
    sources: [{ label: "Follow Liz’s timeline", href: "/#about" }],
    suggestions: [
      "What is she working on now?",
      "What are her strongest skills?",
      "What is she looking for next?",
    ],
  },
  {
    keywords: [
      "current",
      "now",
      "role",
      "job",
      "does",
      "governance",
      "permissions",
      "graph",
      "onboarding",
    ],
    phrases: ["what does liz do", "current role", "working on now"],
    answer:
      "Liz is a Product Manager at Microsoft focused on permissions and governance, Microsoft Graph, developer onboarding, workflow automation, and enterprise platform modernization. Her work sits at the intersection of customer experience, security, compliance, and scalable developer systems.",
    sources: [
      { label: "About Liz", href: "/#about" },
      { label: "View her Microsoft-scale work", href: "/#work" },
    ],
    suggestions: [
      "What impact has she delivered?",
      "How does she approach product work?",
      "What do colleagues say?",
    ],
  },
  {
    keywords: [
      "recommendation",
      "recommendations",
      "colleague",
      "colleagues",
      "feedback",
      "testimonial",
      "testimonials",
      "say",
      "trust",
      "reliable",
      "work with",
      "hire",
      "why",
    ],
    phrases: ["why should i work with liz", "what do colleagues say"],
    answer:
      "Colleagues consistently describe Liz as strategic, technically credible, reliable, deeply customer-focused, and unusually strong at turning ambiguity into clear priorities. They also call out her ownership, written clarity, openness to feedback, attention to detail, and ability to follow through without letting things fall through the cracks.",
    sources: [
      { label: "Read colleague recommendations", href: "/recommendations" },
    ],
    suggestions: [
      "Show me her strongest results",
      "What is her leadership style?",
      "How can I contact Liz?",
    ],
  },
  {
    keywords: [
      "writing",
      "writings",
      "essay",
      "essays",
      "article",
      "articles",
      "think",
      "permissioning",
      "clarity",
      "milestones",
      "agents",
      "ai",
      "security",
    ],
    phrases: ["product thinking", "what does she write about"],
    answer:
      "Liz writes about the less-visible decisions behind strong product work: why clarity is a product decision, what PMs actually do between roadmap milestones, and why static human access models break down in agent-to-agent permissioning. Her writing combines practical product judgment with platform and security depth.",
    sources: [
      { label: "Browse all writings", href: "/#writings" },
      {
        label: "Read about agent permissioning",
        href: "/writings/why-most-companies-get-agent-permissioning-wrong",
      },
    ],
    suggestions: [
      "Tell me about her product approach",
      "What technical skills does she have?",
      "Show me her work",
    ],
  },
  {
    keywords: [
      "next",
      "future",
      "opportunity",
      "opportunities",
      "looking",
      "relocate",
      "location",
      "europe",
      "australia",
      "canada",
      "ireland",
      "netherlands",
      "kenya",
    ],
    phrases: ["what is liz looking for", "open to opportunities"],
    answer:
      "Liz is interested in product leadership opportunities where she can build at global scale, solve complex platform challenges, and contribute to high-performing international teams. She highlights the Netherlands, Australia, Ireland, Canada, and Kenya among the locations she is exploring.",
    sources: [{ label: "See what’s next", href: "/#contact" }],
    suggestions: [
      "Why should I work with Liz?",
      "What impact has she delivered?",
      "How can I contact her?",
    ],
  },
  {
    keywords: [
      "travel",
      "travels",
      "adventure",
      "adventures",
      "outside",
      "personal",
      "countries",
      "traveled",
      "volunteer",
      "volunteering",
      "fun",
      "hobby",
      "hobbies",
    ],
    phrases: ["outside work", "beyond work", "fun fact"],
    answer:
      "Outside product work, Liz is an avid traveler and community builder. She has explored 12 countries across Africa, Europe, Asia, and North America, and she gives back through teaching Swahili, community initiatives, and sharing practical AI knowledge.",
    sources: [{ label: "Explore life beyond the roadmap", href: "/#adventures" }],
    suggestions: [
      "Where has she traveled?",
      "Tell me about her career journey",
      "How can I contact Liz?",
    ],
  },
  {
    keywords: [
      "contact",
      "email",
      "reach",
      "connect",
      "linkedin",
      "github",
      "talk",
      "conversation",
      "coffee",
    ],
    phrases: ["how can i contact liz", "get in touch"],
    answer:
      "The best way to reach Liz is through LinkedIn for professional conversations, or by email through the contact section. You can also explore her public work on GitHub. She is especially happy to discuss product leadership, platform challenges, and meaningful collaboration.",
    sources: [
      { label: "Go to contact options", href: "/#contact" },
      {
        label: "Connect on LinkedIn",
        href: "https://www.linkedin.com/in/elizabeth-waeni-m-11983ab4",
      },
    ],
    suggestions: [
      "Why should I work with Liz?",
      "Show me her strongest results",
      "What is she looking for next?",
    ],
  },
];

const fallback: LizAIResponse = {
  answer:
    "I’m grounded in Liz’s published portfolio, so I’m best at questions about her work, impact, skills, career, product thinking, recommendations, writing, travels, and how to connect. Try asking about one of those and I’ll take you straight to the evidence.",
  sources: [{ label: "Explore the portfolio", href: "/#home" }],
  suggestions: lizAIStarterPrompts,
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function answerLizAIQuestion(question: string): LizAIResponse {
  const normalizedQuestion = normalize(question);
  const words = new Set(normalizedQuestion.split(" "));

  const ranked = knowledge
    .map((entry) => {
      const keywordScore = entry.keywords.reduce(
        (score, keyword) =>
          score + (keyword.includes(" ") ? (normalizedQuestion.includes(keyword) ? 3 : 0) : words.has(keyword) ? 1 : 0),
        0,
      );
      const phraseScore = (entry.phrases ?? []).reduce(
        (score, phrase) => score + (normalizedQuestion.includes(phrase) ? 5 : 0),
        0,
      );

      return { entry, score: keywordScore + phraseScore };
    })
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.score > 0 ? ranked[0].entry : fallback;
}
