import { NextRequest, NextResponse } from "next/server";
import { verifyToken, AUTH_COOKIE } from "@/lib/auth";
import { Role } from "@prisma/client";

// ─── Route Config ─────────────────────────────────────────────────────────────

/** Routes that require authentication (any valid role) */
const PROTECTED = ["/dashboard", "/admin", "/staff"];

/** Routes that require the ADMIN role specifically */
const ADMIN_ONLY = ["/admin"];

/** Routes only accessible when NOT authenticated */
const AUTH_ROUTES = ["/login"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function matchesPrefix(pathname: string, prefixes: string[]): boolean {
  return prefixes.some((prefix) => pathname.startsWith(prefix));
}

// ─── Middleware ───────────────────────────────────────────────────────────────

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(AUTH_COOKIE)?.value ?? null;
  const payload = token ? verifyToken(token) : null;
  const isAuthenticated = payload !== null;

  // ── Redirect authenticated users away from auth pages ──────────────────────
  if (isAuthenticated && matchesPrefix(pathname, AUTH_ROUTES)) {
    const destination =
      payload!.role === Role.ADMIN ? "/admin/dashboard" : "/staff/dashboard";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  // ── Require authentication for protected routes ─────────────────────────────
  if (!isAuthenticated && matchesPrefix(pathname, PROTECTED)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── Require ADMIN role for admin-only routes ────────────────────────────────
  if (
    isAuthenticated &&
    matchesPrefix(pathname, ADMIN_ONLY) &&
    payload!.role !== Role.ADMIN
  ) {
    return NextResponse.redirect(new URL("/staff/dashboard", request.url));
  }

  return NextResponse.next();
}

// ─── Matcher ──────────────────────────────────────────────────────────────────

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static  (Next.js static files)
     * - _next/image   (image optimization)
     * - favicon.ico
     * - public folder assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
