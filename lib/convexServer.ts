import "server-only";
import { ConvexHttpClient } from "convex/browser";

function getConvexClient(): ConvexHttpClient {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not set.");
  }
  return new ConvexHttpClient(convexUrl);
}

export const convex = new Proxy({} as ConvexHttpClient, {
  get(_target, prop) {
    const client = getConvexClient();
    const value = (client as unknown as Record<string | symbol, unknown>)[prop];
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});
