import { SignJWT, jwtVerify } from "jose";

export type AuthRole = "client" | "admin";

export type AuthSession = {
  type: AuthRole;
  id: string;
  name: string;
  email: string;
};

let cachedSecretKey: Uint8Array | null = null;

function getSecretKey(): Uint8Array {
  if (cachedSecretKey) return cachedSecretKey;

  const secret = process.env.AUTH_JWT_SECRET;
  if (!secret) {
    throw new Error("AUTH_JWT_SECRET is not set.");
  }

  cachedSecretKey = new TextEncoder().encode(secret);
  return cachedSecretKey;
}

export async function signAuthToken(session: AuthSession): Promise<string> {
  const secretKey = getSecretKey();
  return new SignJWT({
    type: session.type,
    name: session.name,
    email: session.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.id)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifyAuthToken(token: string): Promise<AuthSession | null> {
  try {
    const secretKey = getSecretKey();
    const { payload } = await jwtVerify(token, secretKey);
    if (typeof payload.sub !== "string") return null;
    if (payload.type !== "client" && payload.type !== "admin") return null;
    if (typeof payload.name !== "string") return null;
    if (typeof payload.email !== "string") return null;

    return {
      type: payload.type as AuthRole,
      id: payload.sub,
      name: payload.name,
      email: payload.email,
    };
  } catch {
    return null;
  }
}
