"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function ClientSignupPage() {
  const signup = useMutation(api.auth.signupClient);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const result = await signup({
        name,
        email,
        password,
        company: company || undefined,
      });

      if (result.success) {
        setCreated(true);
      } else {
        setError(result.error || "Failed to create account");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 sm:px-6">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 text-center">
            <Link href="/">
              <span className="text-2xl font-serif tracking-tight text-navy-900">
                ATF
              </span>
            </Link>
            <h1 className="mt-4 text-2xl font-semibold text-slate-900">
              Create Client Account
            </h1>
          </div>

          {created ? (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <p className="text-sm text-slate-600">
                Account created successfully! You can now sign in to your client portal.
              </p>
              <Link
                href="/client/login"
                className="mt-2 inline-block rounded-xl bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-700"
              >
                Go to sign in
              </Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Company <span className="text-slate-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
                    required
                    minLength={6}
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-navy-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-navy-700 disabled:opacity-50"
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-500">
                <p>
                  Already have an account?{" "}
                  <Link href="/client/login" className="text-navy-400 hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
