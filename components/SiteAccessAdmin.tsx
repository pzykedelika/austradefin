"use client";

import { useCallback, useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  company?: string;
  active: boolean;
  createdAt: number;
};

const MIN_PASSWORD_LENGTH = 8;

const inputClass =
  "w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400";

async function api(path: string, method: string, body?: unknown) {
  const res = await fetch(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong.");
  return data;
}

export default function SiteAccessAdmin() {
  const [gateEnabled, setGateEnabled] = useState<boolean | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [resetId, setResetId] = useState<string | null>(null);
  const [resetPassword, setResetPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const [gate, list] = await Promise.all([
        api("/api/admin/site-access", "GET"),
        api("/api/admin/users", "GET"),
      ]);
      setGateEnabled(gate.enabled);
      setUsers(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load.");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const run = async (fn: () => Promise<void>, success: string) => {
    setError("");
    setNotice("");
    setBusy(true);
    try {
      await fn();
      setNotice(success);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const toggleGate = () =>
    run(async () => {
      const next = !gateEnabled;
      if (next && !window.confirm("Turn on the password gate? Visitors will need an account to view the site.")) {
        return;
      }
      const res = await api("/api/admin/site-access", "PUT", { enabled: next });
      setGateEnabled(res.enabled);
    }, "Site access updated.");

  const createUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    void run(async () => {
      await api("/api/admin/users", "POST", {
        name: newName,
        email: newEmail,
        company: newCompany,
        password: newPassword,
      });
      setShowNew(false);
      setNewName("");
      setNewEmail("");
      setNewCompany("");
      setNewPassword("");
    }, "User created.");
  };

  const savePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetId) return;
    if (resetPassword.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    void run(async () => {
      await api(`/api/admin/users/${resetId}`, "PATCH", { password: resetPassword });
      setResetId(null);
      setResetPassword("");
    }, "Password changed.");
  };

  const setActive = (user: User, active: boolean) =>
    run(async () => {
      await api(`/api/admin/users/${user._id}`, "PATCH", { active });
    }, active ? "User reactivated." : "User deactivated.");

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Password protect the site</h2>
          <p className="mt-1 text-sm text-slate-500">
            When on, visitors must sign in with an account below to view the public site. The admin
            and client portals are not affected.
          </p>
        </div>
        <button
          onClick={toggleGate}
          disabled={busy || gateEnabled === null}
          className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:opacity-50 ${
            gateEnabled
              ? "bg-green-600 text-white hover:bg-green-700"
              : "border border-slate-300 text-slate-700 hover:bg-slate-50"
          }`}
        >
          {gateEnabled === null ? "Loading..." : gateEnabled ? "Protection on" : "Protection off"}
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {notice && <p className="text-sm text-green-700">{notice}</p>}

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Users</h2>
          <button
            onClick={() => setShowNew((v) => !v)}
            className="rounded-xl bg-navy-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-700"
          >
            {showNew ? "Cancel" : "Add user"}
          </button>
        </div>

        {showNew && (
          <form onSubmit={createUser} className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2">
            <input className={inputClass} placeholder="Name" value={newName} onChange={(e) => setNewName(e.target.value)} required />
            <input className={inputClass} type="email" placeholder="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required />
            <input className={inputClass} placeholder="Company (optional)" value={newCompany} onChange={(e) => setNewCompany(e.target.value)} />
            <input className={inputClass} type="text" placeholder={`Password (min ${MIN_PASSWORD_LENGTH} characters)`} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            <div className="sm:col-span-2">
              <button type="submit" disabled={busy} className="rounded-xl bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700 disabled:opacity-50">
                Create user
              </button>
            </div>
          </form>
        )}

        <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
          {users === null && <p className="p-6 text-sm text-slate-500">Loading...</p>}
          {users?.length === 0 && <p className="p-6 text-sm text-slate-500">No users yet.</p>}
          {users?.map((user) => (
            <div key={user._id} className="p-4 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {user.name}
                    {!user.active && (
                      <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">Inactive</span>
                    )}
                  </p>
                  <p className="text-sm text-slate-500">
                    {user.email}
                    {user.company ? ` · ${user.company}` : ""}
                  </p>
                </div>
                <div className="flex gap-4 text-sm font-medium">
                  <button
                    onClick={() => {
                      setResetId(resetId === user._id ? null : user._id);
                      setResetPassword("");
                    }}
                    className="text-navy-400 hover:underline"
                  >
                    Change password
                  </button>
                  <button
                    onClick={() => setActive(user, !user.active)}
                    disabled={busy}
                    className="text-slate-500 hover:text-slate-700 disabled:opacity-50"
                  >
                    {user.active ? "Deactivate" : "Reactivate"}
                  </button>
                </div>
              </div>
              {resetId === user._id && (
                <form onSubmit={savePassword} className="mt-3 flex gap-3">
                  <input
                    className={inputClass}
                    type="text"
                    placeholder={`New password (min ${MIN_PASSWORD_LENGTH} characters)`}
                    value={resetPassword}
                    onChange={(e) => setResetPassword(e.target.value)}
                    required
                  />
                  <button type="submit" disabled={busy} className="shrink-0 rounded-xl bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700 disabled:opacity-50">
                    Save
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
