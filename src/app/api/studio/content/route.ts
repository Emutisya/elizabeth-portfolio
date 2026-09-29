import { NextResponse } from "next/server";
import {
  authorizeStudio,
  readBearerToken,
  readSiteContent,
  StudioError,
  writeSiteContent,
} from "@/lib/github-content";
import { validateSiteContent } from "@/lib/site-content";

export const runtime = "nodejs";

function errorResponse(error: unknown) {
  if (error instanceof StudioError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status, headers: { "Cache-Control": "no-store" } },
    );
  }
  console.error("Studio content request failed.", error);
  return NextResponse.json(
    { error: "The Studio backend encountered an unexpected error." },
    { status: 500, headers: { "Cache-Control": "no-store" } },
  );
}

function verifySameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    throw new StudioError("Cross-site updates are not allowed.", 403);
  }
}

export async function GET(request: Request) {
  try {
    const token = readBearerToken(request);
    await authorizeStudio(token);
    const result = await readSiteContent(token);
    const validated = validateSiteContent(result.content);
    if (!validated.success) {
      throw new StudioError(
        `Stored portfolio content is invalid: ${validated.error}`,
        502,
      );
    }
    return NextResponse.json(
      { content: validated.data, sha: result.sha },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request) {
  try {
    verifySameOrigin(request);
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > 150_000) {
      throw new StudioError("The update is too large.", 413);
    }

    const token = readBearerToken(request);
    await authorizeStudio(token);

    const body = (await request.json()) as { content?: unknown; sha?: unknown };
    if (typeof body.sha !== "string" || !/^[a-f0-9]{40}$/i.test(body.sha)) {
      throw new StudioError("Reload the latest content before saving.", 400);
    }

    const validated = validateSiteContent(body.content);
    if (!validated.success) {
      throw new StudioError(validated.error, 400);
    }

    const result = await writeSiteContent(
      token,
      validated.data,
      body.sha,
    );
    return NextResponse.json(
      {
        commitSha: result.commitSha,
        sha: result.contentSha,
        message: "Saved. The live site will update after deployment finishes.",
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "The request body must be valid JSON." },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    }
    return errorResponse(error);
  }
}
