import rawSiteContent from "@/content/site-content.json";

export const gradients = [
  "from-purple-500 to-indigo-500",
  "from-pink-500 to-rose-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-indigo-500 to-purple-500",
  "from-rose-500 to-pink-500",
  "from-orange-500 to-amber-500",
  "from-teal-500 to-emerald-500",
] as const;

export type Gradient = (typeof gradients)[number];

export type TimelineItem = {
  year: string;
  title: string;
  details: string[];
};

export type Recommendation = {
  quote: string;
  name: string;
  title: string;
  company: string;
  theme: string;
  gradient: Gradient;
};

export type FeaturedWork = {
  id: number;
  title: string;
  problem: string;
  role: string;
  actions: string[];
  impact: string[];
  tags: string[];
  gradient: Gradient;
};

export type SkillCategory = {
  title: string;
  skills: string[];
};

export type SiteContent = {
  version: 1;
  timeline: TimelineItem[];
  recommendations: Recommendation[];
  featuredWork: FeaturedWork[];
  skills: SkillCategory[];
};

type ValidationResult =
  | { success: true; data: SiteContent }
  | { success: false; error: string };

const limits = {
  timeline: 20,
  recommendations: 30,
  featuredWork: 12,
  skills: 12,
  listItems: 20,
} as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(
  value: unknown,
  path: string,
  maxLength = 500,
): string {
  if (typeof value !== "string") {
    throw new Error(`${path} must be text.`);
  }

  const normalized = value.trim();
  if (!normalized) {
    throw new Error(`${path} cannot be empty.`);
  }
  if (normalized.length > maxLength) {
    throw new Error(`${path} must be ${maxLength} characters or fewer.`);
  }
  return normalized;
}

function readStringList(
  value: unknown,
  path: string,
  maxItems: number = limits.listItems,
): string[] {
  if (!Array.isArray(value) || value.length === 0 || value.length > maxItems) {
    throw new Error(`${path} must contain between 1 and ${maxItems} items.`);
  }

  return value.map((item, index) =>
    readString(item, `${path}[${index}]`, 300),
  );
}

function readArray<T>(
  value: unknown,
  path: string,
  maxItems: number,
  parseItem: (item: unknown, index: number) => T,
): T[] {
  if (!Array.isArray(value) || value.length === 0 || value.length > maxItems) {
    throw new Error(`${path} must contain between 1 and ${maxItems} items.`);
  }
  return value.map(parseItem);
}

function readGradient(value: unknown, path: string): Gradient {
  const gradient = readString(value, path, 80);
  if (!gradients.includes(gradient as Gradient)) {
    throw new Error(`${path} is not an allowed color theme.`);
  }
  return gradient as Gradient;
}

export function validateSiteContent(value: unknown): ValidationResult {
  try {
    if (!isRecord(value) || value.version !== 1) {
      throw new Error("Content must use schema version 1.");
    }

    const timeline = readArray(
      value.timeline,
      "timeline",
      limits.timeline,
      (item, index) => {
        if (!isRecord(item)) {
          throw new Error(`timeline[${index}] must be an object.`);
        }
        return {
          year: readString(item.year, `timeline[${index}].year`, 20),
          title: readString(item.title, `timeline[${index}].title`, 120),
          details: readStringList(
            item.details,
            `timeline[${index}].details`,
            10,
          ),
        };
      },
    );

    const recommendations = readArray(
      value.recommendations,
      "recommendations",
      limits.recommendations,
      (item, index) => {
        if (!isRecord(item)) {
          throw new Error(`recommendations[${index}] must be an object.`);
        }
        return {
          quote: readString(
            item.quote,
            `recommendations[${index}].quote`,
            1200,
          ),
          name: readString(item.name, `recommendations[${index}].name`, 100),
          title: readString(item.title, `recommendations[${index}].title`, 150),
          company: readString(
            item.company,
            `recommendations[${index}].company`,
            100,
          ),
          theme: readString(item.theme, `recommendations[${index}].theme`, 80),
          gradient: readGradient(
            item.gradient,
            `recommendations[${index}].gradient`,
          ),
        };
      },
    );

    const featuredWork = readArray(
      value.featuredWork,
      "featuredWork",
      limits.featuredWork,
      (item, index) => {
        if (!isRecord(item)) {
          throw new Error(`featuredWork[${index}] must be an object.`);
        }
        if (!Number.isSafeInteger(item.id) || Number(item.id) < 1) {
          throw new Error(`featuredWork[${index}].id must be a positive number.`);
        }
        return {
          id: Number(item.id),
          title: readString(item.title, `featuredWork[${index}].title`, 180),
          problem: readString(
            item.problem,
            `featuredWork[${index}].problem`,
            800,
          ),
          role: readString(item.role, `featuredWork[${index}].role`, 120),
          actions: readStringList(
            item.actions,
            `featuredWork[${index}].actions`,
          ),
          impact: readStringList(
            item.impact,
            `featuredWork[${index}].impact`,
          ),
          tags: readStringList(item.tags, `featuredWork[${index}].tags`, 10),
          gradient: readGradient(
            item.gradient,
            `featuredWork[${index}].gradient`,
          ),
        };
      },
    );

    if (new Set(featuredWork.map((item) => item.id)).size !== featuredWork.length) {
      throw new Error("Featured work IDs must be unique.");
    }

    const skills = readArray(
      value.skills,
      "skills",
      limits.skills,
      (item, index) => {
        if (!isRecord(item)) {
          throw new Error(`skills[${index}] must be an object.`);
        }
        return {
          title: readString(item.title, `skills[${index}].title`, 100),
          skills: readStringList(item.skills, `skills[${index}].skills`),
        };
      },
    );

    return {
      success: true,
      data: { version: 1, timeline, recommendations, featuredWork, skills },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Content is invalid.",
    };
  }
}

const validatedContent = validateSiteContent(rawSiteContent);
if (!validatedContent.success) {
  throw new Error(`Invalid site content: ${validatedContent.error}`);
}

export const siteContent = validatedContent.data;
