export const AUTH_SECRET = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;

export const SESSION_COOKIE = "next-auth.session-token";
export const SECURE_SESSION_COOKIE = "__Secure-next-auth.session-token";
