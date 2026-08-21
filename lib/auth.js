import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = "aeg_session";
const TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

if (!JWT_SECRET) {
  // Thrown only when actually used, so build steps that don't touch auth don't crash.
}

export function signSessionToken(payload) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in environment variables");
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: TOKEN_MAX_AGE_SECONDS,
  });
}

export function verifySessionToken(token) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in environment variables");
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
export const SESSION_MAX_AGE = TOKEN_MAX_AGE_SECONDS;
