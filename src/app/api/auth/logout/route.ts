import { NextRequest, NextResponse } from "next/server";
import {
  isSameOrigin,
  noStoreHeaders,
  sessionCookieOptions,
} from "@/lib/auth/http";
import { SESSION_COOKIE } from "@/lib/auth/token";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request))
    return NextResponse.json(
      { error: "Origem não permitida." },
      { status: 403, headers: noStoreHeaders },
    );
  const response = NextResponse.json(
    { success: true },
    { headers: noStoreHeaders },
  );
  response.cookies.set(SESSION_COOKIE, "", {
    ...sessionCookieOptions,
    maxAge: 0,
  });
  response.cookies.set("pethub-authenticated", "", { path: "/", maxAge: 0 });
  return response;
}
