import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { noStoreHeaders } from "@/lib/auth/http";

export async function GET() {
  const user = await getSession();
  return NextResponse.json({ user }, { status: user ? 200 : 401, headers: noStoreHeaders });
}
