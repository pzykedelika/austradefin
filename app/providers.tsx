"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { AuthProvider } from "../contexts/AuthContext";
import { useRef } from "react";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const convex = useRef<ConvexReactClient | null>(null);

  if (!convex.current) {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (url) {
      convex.current = new ConvexReactClient(url);
    }
  }

  if (!convex.current) {
    return <>{children}</>;
  }

  return (
    <ConvexProvider client={convex.current}>
      <AuthProvider>{children}</AuthProvider>
    </ConvexProvider>
  );
}
