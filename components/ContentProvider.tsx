"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";
import { resolveText } from "@/lib/siteContentFields";

const ContentContext = createContext<Record<string, string>>({});

export function ContentProvider({
  content,
  children,
}: {
  content: Record<string, string>;
  children: ReactNode;
}) {
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useText(): (key: string) => string {
  const overrides = useContext(ContentContext);
  return useCallback((key: string) => resolveText(overrides, key), [overrides]);
}
