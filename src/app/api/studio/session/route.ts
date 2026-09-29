import { NextResponse } from "next/server";
import {
  authorizeStudio,
  readBearerToken,
  StudioError,
} from "@/lib/github-content";

export const runtime = "nodejs";

function errorResponse(error: unknown) {
  if (error instanceof StudioError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status, headers: { "Cache-Control": "no-store" } },
    );
  }
  console.error("Studio authentication failed.", error);
  return NextResponse.json(
    { error: "Unable to contact GitHub right now. Try again shortly." },
    { status: 502, headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  try {
    const token = readBearerToken(request);
    const user = await authorizeStudio(token);
    return NextResponse.json(
      { user },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return errorResponse(error);
  }
}
