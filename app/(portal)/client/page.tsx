"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAuth } from "../../../contexts/AuthContext";

type Tab = "overview" | "articles" | "flowcharts";

const tabs: { key: Tab; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "articles", label: "Articles" },
  { key: "flowcharts", label: "Flowcharts" },
];

export default function ClientDashboardPage() {
  const router = useRouter();
  const { session, isLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const articles = useQuery(api.articles.list, { publishedOnly: true });
  const flowcharts = useQuery(api.flowcharts.list);

  useEffect(() => {
    if (!isLoading && (!session || session.type !== "client")) {
      router.push("/client/login");
    }
  }, [session, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!session || session.type !== "client") {
    return null;
  }

  const selectedArticle = selectedArticleId
    ? articles?.find((a) => a._id === selectedArticleId)
    : null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Portal header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-serif tracking-tight text-navy-900">
            ATF
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">{session.name}</span>
            <button
              onClick={() => {
                logout();
                router.push("/client/login");
              }}
              className="text-sm font-medium text-slate-500 transition hover:text-slate-700"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl gap-0 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setSelectedArticleId(null);
              }}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-navy-900 text-navy-900"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="mx-auto max-w-5xl px-6 py-10">
        {activeTab === "overview" && (
          <>
            <h1 className="text-2xl font-semibold text-slate-900">
              Welcome back, {session.name}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Your client portal dashboard
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="text-sm font-semibold text-slate-900">Loan Applications</h3>
                <p className="mt-2 text-2xl font-bold text-navy-900">0</p>
                <p className="mt-1 text-xs text-slate-500">Active applications</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="text-sm font-semibold text-slate-900">Documents</h3>
                <p className="mt-2 text-2xl font-bold text-navy-900">0</p>
                <p className="mt-1 text-xs text-slate-500">Uploaded documents</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="text-sm font-semibold text-slate-900">Messages</h3>
                <p className="mt-2 text-2xl font-bold text-navy-900">0</p>
                <p className="mt-1 text-xs text-slate-500">Unread messages</p>
              </div>
            </div>

            <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">Your Details</h2>
              <dl className="mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <dt className="text-slate-500">Name</dt>
                  <dd className="font-medium text-slate-900">{session.name}</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-slate-500">Email</dt>
                  <dd className="font-medium text-slate-900">{session.email}</dd>
                </div>
              </dl>
            </div>
          </>
        )}

        {activeTab === "articles" && (
          <>
            {selectedArticle ? (
              <div>
                <button
                  onClick={() => setSelectedArticleId(null)}
                  className="mb-6 text-sm font-medium text-navy-400 hover:underline flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                  Back to articles
                </button>
                <article>
                  <h1 className="text-2xl font-semibold text-slate-900">
                    {selectedArticle.title}
                  </h1>
                  <p className="mt-2 text-xs text-slate-500">
                    By {selectedArticle.authorName}
                    {selectedArticle.publishedAt &&
                      ` · ${new Date(selectedArticle.publishedAt).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}`}
                  </p>
                  <div
                    className="mt-8 prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedArticle.body }}
                  />
                </article>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-semibold text-slate-900">Articles</h1>
                <p className="mt-2 text-sm text-slate-600">
                  Latest updates and insights from ATF
                </p>

                {!articles ? (
                  <p className="mt-8 text-sm text-slate-500">Loading articles...</p>
                ) : articles.length === 0 ? (
                  <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center">
                    <p className="text-sm text-slate-500">No articles published yet.</p>
                  </div>
                ) : (
                  <div className="mt-8 space-y-4">
                    {articles.map((article) => (
                      <button
                        key={article._id}
                        onClick={() => setSelectedArticleId(article._id)}
                        className="w-full text-left rounded-xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-sm"
                      >
                        <h3 className="text-base font-semibold text-slate-900">
                          {article.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          By {article.authorName}
                          {article.publishedAt &&
                            ` · ${new Date(article.publishedAt).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}`}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {activeTab === "flowcharts" && (
          <>
            <h1 className="text-2xl font-semibold text-slate-900">Flowcharts</h1>
            <p className="mt-2 text-sm text-slate-600">
              Process flowcharts and diagrams
            </p>

            {!flowcharts ? (
              <p className="mt-8 text-sm text-slate-500">Loading flowcharts...</p>
            ) : flowcharts.length === 0 ? (
              <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center">
                <p className="text-sm text-slate-500">No flowcharts uploaded yet.</p>
              </div>
            ) : (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {flowcharts.map((fc) => (
                  <div
                    key={fc._id}
                    className="rounded-xl border border-slate-200 bg-white overflow-hidden"
                  >
                    {fc.fileType === "image" && fc.fileUrl ? (
                      <img
                        src={fc.fileUrl}
                        alt={fc.title}
                        className="w-full h-48 object-cover bg-slate-100"
                      />
                    ) : (
                      <div className="flex h-48 items-center justify-center bg-slate-100">
                        <svg className="w-12 h-12 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-slate-900">{fc.title}</h3>
                      {fc.description && (
                        <p className="mt-1 text-xs text-slate-500">{fc.description}</p>
                      )}
                      {fc.fileUrl && (
                        <a
                          href={fc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-navy-400 hover:underline"
                        >
                          {fc.fileType === "pdf" ? "View PDF" : "View full size"}
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
