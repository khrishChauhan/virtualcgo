import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export type Role = "ADMIN" | "STAFF";

// ─── Constants ────────────────────────────────────────────────────────────────

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = "7d";
const BCRYPT_ROUNDS = 12;

export const AUTH_COOKIE = "vgo_token";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface JWTPayload {
  sub: string;   // user id
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}

// ─── Password Utilities ───────────────────────────────────────────────────────

/**
 * Hash a plain-text password using bcrypt.
 */
export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, BCRYPT_ROUNDS);
}

/**
 * Compare a plain-text password against a stored hash.
 */
export async function comparePassword(
  plain: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// ─── JWT Utilities ────────────────────────────────────────────────────────────

/**
 * Sign a JWT token with the user's id, email, and role.
 */
export function signToken(payload: Omit<JWTPayload, "iat" | "exp">): string {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set.");
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verify and decode a JWT token. Returns null on failure.
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    if (!JWT_SECRET) return null;
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

// ─── Cookie Config ────────────────────────────────────────────────────────────

/**
 * Returns the Set-Cookie header string for the auth token.
 */
export function buildAuthCookie(token: string): string {
  const maxAge = 60 * 60 * 24 * 7; // 7 days in seconds
  const isProd = process.env.NODE_ENV === "production";

  return [
    `${AUTH_COOKIE}=${token}`,
    "Path=/",
    `Max-Age=${maxAge}`,
    "HttpOnly",
    "SameSite=Lax",
    isProd ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

/**
 * Returns the Set-Cookie header string to clear the auth cookie.
 */
export function clearAuthCookie(): string {
  return `${AUTH_COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`;
}
