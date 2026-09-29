import type { SiteContent } from "@/lib/site-content";

const GITHUB_API = "https://api.github.com";
const REPOSITORY_OWNER = "Emutisya";
const REPOSITORY_NAME = "elizabeth-portfolio";
const CONTENT_PATH = "src/content/site-content.json";
const BRANCH = "main";

const githubHeaders = (token: string): HeadersInit => ({
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${token}`,
  "User-Agent": "lizmutisya-portfolio-studio",
  "X-GitHub-Api-Version": "2022-11-28",
});

export class StudioError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "StudioError";
  }
}

type GitHubUser = {
  login?: string;
  name?: string | null;
};

type GitHubRepository = {
  permissions?: {
    push?: boolean;
  };
};

type GitHubFile = {
  type?: string;
  encoding?: string;
  content?: string;
  sha?: string;
};

async function readGitHubError(response: Response): Promise<string> {
  const body = (await response.json().catch(() => null)) as {
    message?: string;
  } | null;
  return body?.message ?? `GitHub returned ${response.status}.`;
}

async function githubRequest<T>(
  path: string,
  token: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${GITHUB_API}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      ...githubHeaders(token),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const message = await readGitHubError(response);
    if (response.status === 401) {
      throw new StudioError(
        "GitHub rejected this token. Check that it is active and try again.",
        401,
      );
    }
    if (response.status === 403) {
      throw new StudioError(
        "This token does not have permission to update the portfolio repository.",
        403,
      );
    }
    if (response.status === 409 || response.status === 422) {
      throw new StudioError(
        "The content changed while you were editing. Reload before saving again.",
        409,
      );
    }
    throw new StudioError(`GitHub request failed: ${message}`, 502);
  }

  return (await response.json()) as T;
}

export function readBearerToken(request: Request): string {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) {
    throw new StudioError("Sign in with GitHub to continue.", 401);
  }

  const token = authorization.slice("Bearer ".length).trim();
  if (token.length < 20 || token.length > 300 || /\s/.test(token)) {
    throw new StudioError("The GitHub token format is invalid.", 401);
  }
  return token;
}

export async function authorizeStudio(token: string): Promise<{
  login: string;
  name: string;
}> {
  const user = await githubRequest<GitHubUser>("/user", token);
  if (user.login?.toLowerCase() !== REPOSITORY_OWNER.toLowerCase()) {
    throw new StudioError(
      `This Studio is restricted to the ${REPOSITORY_OWNER} GitHub account.`,
      403,
    );
  }

  const repository = await githubRequest<GitHubRepository>(
    `/repos/${REPOSITORY_OWNER}/${REPOSITORY_NAME}`,
    token,
  );
  if (!repository.permissions?.push) {
    throw new StudioError(
      "The token needs read and write access to repository contents.",
      403,
    );
  }

  return {
    login: user.login,
    name: user.name?.trim() || user.login,
  };
}

export async function readSiteContent(token: string): Promise<{
  content: unknown;
  sha: string;
}> {
  const file = await githubRequest<GitHubFile>(
    `/repos/${REPOSITORY_OWNER}/${REPOSITORY_NAME}/contents/${CONTENT_PATH}?ref=${BRANCH}`,
    token,
  );

  if (
    file.type !== "file" ||
    file.encoding !== "base64" ||
    !file.content ||
    !file.sha
  ) {
    throw new StudioError("The portfolio content file is unavailable.", 502);
  }

  try {
    const decoded = Buffer.from(file.content, "base64").toString("utf8");
    return { content: JSON.parse(decoded) as unknown, sha: file.sha };
  } catch {
    throw new StudioError("The portfolio content file is not valid JSON.", 502);
  }
}

export async function writeSiteContent(
  token: string,
  content: SiteContent,
  sha: string,
): Promise<{ commitSha: string; contentSha: string }> {
  const encodedContent = Buffer.from(
    `${JSON.stringify(content, null, 2)}\n`,
    "utf8",
  ).toString("base64");

  const result = await githubRequest<{
    commit?: { sha?: string };
    content?: { sha?: string };
  }>(
    `/repos/${REPOSITORY_OWNER}/${REPOSITORY_NAME}/contents/${CONTENT_PATH}`,
    token,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Update portfolio content from Studio",
        content: encodedContent,
        sha,
        branch: BRANCH,
      }),
    },
  );

  if (!result.commit?.sha || !result.content?.sha) {
    throw new StudioError(
      "GitHub accepted the update but did not return a commit.",
      502,
    );
  }
  return {
    commitSha: result.commit.sha,
    contentSha: result.content.sha,
  };
}
