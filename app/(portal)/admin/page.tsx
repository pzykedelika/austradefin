"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAuth } from "../../../contexts/AuthContext";
import type { Id } from "../../../convex/_generated/dataModel";
import dynamic from "next/dynamic";
import SiteAccessAdmin from "../../../components/SiteAccessAdmin";
import { contentFields, contentDefaults } from "../../../lib/siteContentFields";

const RichTextEditor = dynamic(() => import("../../../components/RichTextEditor"), {
  ssr: false,
  loading: () => <div className="h-[200px] rounded-xl border border-slate-200 bg-slate-50" />,
});

type Tab = "site text" | "articles" | "flowcharts" | "site access";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { session, isLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("site text");

  useEffect(() => {
    if (!isLoading && (!session || session.type !== "admin")) {
      router.push("/admin/login");
    }
  }, [session, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!session || session.type !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-serif tracking-tight text-navy-900">
            ATF <span className="text-xs font-sans text-slate-500 ml-2">Admin</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">{session.name}</span>
            <button
              onClick={() => {
                logout();
                router.push("/admin/login");
              }}
              className="text-sm font-medium text-slate-500 transition hover:text-slate-700"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl gap-0 px-6">
          {(["site text", "articles", "flowcharts", "site access"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? "border-navy-900 text-navy-900"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {activeTab === "site text" && <SiteTextAdmin />}
        {activeTab === "articles" && (
          <ArticlesAdmin adminId={session.id as Id<"adminAccounts">} adminName={session.name} />
        )}
        {activeTab === "site access" && <SiteAccessAdmin />}
        {activeTab === "flowcharts" && (
          <FlowchartsAdmin adminId={session.id as Id<"adminAccounts">} adminName={session.name} />
        )}
      </div>
    </div>
  );
}

function SiteTextAdmin() {
  const saved = useQuery(api.siteContent.getAll);
  const [values, setValues] = useState<Record<string, string> | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  const savedValue = (key: string) =>
    saved?.find((row) => row.key === key)?.value ?? contentDefaults[key];

  useEffect(() => {
    if (saved && !values) {
      setValues(
        Object.fromEntries(
          contentFields.map((f) => [f.key, saved.find((row) => row.key === f.key)?.value ?? f.default])
        )
      );
    }
  }, [saved, values]);

  if (!saved || !values) {
    return <p className="text-sm text-slate-500">Loading...</p>;
  }

  const changedKeys = contentFields.filter((f) => values[f.key] !== savedValue(f.key)).map((f) => f.key);
  const pages = Array.from(new Set(contentFields.map((f) => f.page)));

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/site-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          values: Object.fromEntries(changedKeys.map((key) => [key, values[key]])),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Could not save changes.");
      }
      setMessage({ type: "ok", text: "Saved. The changes are now live on the website." });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Could not save changes." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Website text</h2>
          <p className="mt-1 max-w-xl text-sm text-slate-500">
            Change the wording on the website. Edit any box, then press Save. Changes go live within a
            few seconds. Use Reset to go back to the original wording for a box.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {changedKeys.length > 0 && (
            <span className="text-sm text-slate-500">
              {changedKeys.length} unsaved {changedKeys.length === 1 ? "change" : "changes"}
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving || changedKeys.length === 0}
            className="rounded-xl bg-navy-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>

      {message && (
        <p
          className={`mb-6 rounded-xl px-4 py-3 text-sm ${
            message.type === "ok" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </p>
      )}

      <div className="space-y-10">
        {pages.map((page) => (
          <section key={page}>
            <h3 className="mb-4 border-b border-slate-200 pb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
              {page}
            </h3>
            <div className="space-y-5">
              {contentFields
                .filter((f) => f.page === page)
                .map((field) => (
                  <div key={field.key}>
                    <div className="mb-1 flex items-center justify-between">
                      <label htmlFor={field.key} className="block text-sm font-medium text-slate-700">
                        {field.label}
                      </label>
                      {values[field.key] !== field.default && (
                        <button
                          type="button"
                          onClick={() => setValues({ ...values, [field.key]: field.default })}
                          className="text-xs font-medium text-navy-400 hover:underline"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                    {field.multiline ? (
                      <textarea
                        id={field.key}
                        rows={3}
                        maxLength={2000}
                        value={values[field.key]}
                        onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                      />
                    ) : (
                      <input
                        id={field.key}
                        type="text"
                        maxLength={2000}
                        value={values[field.key]}
                        onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                      />
                    )}
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function ArticlesAdmin({ adminId, adminName }: { adminId: Id<"adminAccounts">; adminName: string }) {
  const articles = useQuery(api.articles.list, { publishedOnly: false });
  const createArticle = useMutation(api.articles.create);
  const updateArticle = useMutation(api.articles.update);
  const removeArticle = useMutation(api.articles.remove);

  const [editing, setEditing] = useState<string | null>(null); // article ID or "new"
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);

  const startNew = () => {
    setEditing("new");
    setTitle("");
    setBody("");
    setPublished(false);
  };

  const startEdit = (article: NonNullable<typeof articles>[number]) => {
    setEditing(article._id);
    setTitle(article.title);
    setBody(article.body);
    setPublished(article.published);
  };

  const handleSave = async () => {
    if (!title.trim()) return;
    setSaving(true);
    try {
      if (editing === "new") {
        await createArticle({
          title,
          body,
          authorId: adminId,
          authorName: adminName,
          published,
        });
      } else if (editing) {
        await updateArticle({
          id: editing as Id<"articles">,
          title,
          body,
          published,
        });
      }
      setEditing(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: Id<"articles">) => {
    if (!confirm("Delete this article?")) return;
    await removeArticle({ id });
  };

  if (editing) {
    return (
      <div>
        <button
          onClick={() => setEditing(null)}
          className="mb-6 text-sm font-medium text-navy-400 hover:underline flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to articles
        </button>

        <h2 className="text-xl font-semibold text-slate-900 mb-6">
          {editing === "new" ? "New Article" : "Edit Article"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
              placeholder="Article title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
            <RichTextEditor content={body} onChange={setBody} />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="rounded border-slate-300"
            />
            <span className="text-slate-700">Published (visible to clients)</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving || !title.trim()}
              className="rounded-xl bg-navy-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Article"}
            </button>
            <button
              onClick={() => setEditing(null)}
              className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Articles</h2>
        <button
          onClick={startNew}
          className="rounded-xl bg-navy-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-700"
        >
          New Article
        </button>
      </div>

      {!articles ? (
        <p className="text-sm text-slate-500">Loading...</p>
      ) : articles.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-sm text-slate-500">No articles yet. Create your first one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {articles.map((article) => (
            <div
              key={article._id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{article.title}</h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  {article.published ? (
                    <span className="text-green-600">Published</span>
                  ) : (
                    <span className="text-amber-600">Draft</span>
                  )}
                  {" · "}
                  {new Date(article.updatedAt).toLocaleDateString("en-AU")}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(article)}
                  className="text-xs font-medium text-navy-400 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(article._id)}
                  className="text-xs font-medium text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FlowchartsAdmin({ adminId, adminName }: { adminId: Id<"adminAccounts">; adminName: string }) {
  const flowcharts = useQuery(api.flowcharts.list);
  const generateUploadUrl = useMutation(api.flowcharts.generateUploadUrl);
  const createFlowchart = useMutation(api.flowcharts.create);
  const removeFlowchart = useMutation(api.flowcharts.remove);

  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file || !title.trim()) return;
    setUploading(true);

    try {
      const uploadUrl = await generateUploadUrl();

      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await result.json();

      const fileType = file.type === "application/pdf" ? "pdf" : "image";

      await createFlowchart({
        title,
        description: description || undefined,
        storageId,
        fileType,
        uploadedById: adminId,
        uploadedByName: adminName,
      });

      setShowForm(false);
      setTitle("");
      setDescription("");
      setFile(null);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: Id<"flowcharts">) => {
    if (!confirm("Delete this flowchart?")) return;
    await removeFlowchart({ id });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Flowcharts</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-navy-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-700"
        >
          {showForm ? "Cancel" : "Upload Flowchart"}
        </button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
              placeholder="Flowchart title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description <span className="text-slate-400">(optional)</span>
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
              placeholder="Brief description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">File (image or PDF)</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-navy-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-navy-700"
            />
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading || !file || !title.trim()}
            className="rounded-xl bg-navy-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}

      {!flowcharts ? (
        <p className="text-sm text-slate-500">Loading...</p>
      ) : flowcharts.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-sm text-slate-500">No flowcharts uploaded yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {flowcharts.map((fc) => (
            <div
              key={fc._id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex items-center gap-4">
                {fc.fileType === "image" && fc.fileUrl ? (
                  <img
                    src={fc.fileUrl}
                    alt={fc.title}
                    className="h-12 w-12 rounded-lg object-cover bg-slate-100"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                    <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{fc.title}</h3>
                  {fc.description && (
                    <p className="mt-0.5 text-xs text-slate-500">{fc.description}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleDelete(fc._id)}
                className="text-xs font-medium text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
