import "server-only";
import type { NextRequest } from "next/server";

// Cookies are sent automatically, so mutations must originate from this site.
export function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const expected = process.env.AUTH_APP_ORIGIN || request.nextUrl.origin;
  return origin === expected && request.headers.get("sec-fetch-site") !== "cross-site";
}

export const noStoreHeaders = { "Cache-Control": "no-store" };

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};
