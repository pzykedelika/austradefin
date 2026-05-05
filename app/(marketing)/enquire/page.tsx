"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import MotionInView from "@/components/MotionInView";

const states = ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"];

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-slate-400 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-400/20 transition-colors";

const labelClass = "block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5";

export default function EnquirePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    state: "",
    needs: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <PageHeader
        eyebrow="Enquire"
        title="Tell Us About Your Funding Needs"
        subtitle="Complete the form below and a member of our team will be in touch within one business day."
      />

      <section className="section-padding">
        <div className="container-main">
          <div className="max-w-2xl">
            {submitted ? (
              <MotionInView>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-10 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy-900/5">
                    <svg
                      className="h-7 w-7 text-navy-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-serif text-navy-900">Enquiry Received</h2>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    Thank you for reaching out. A member of the ATF team will review your
                    enquiry and be in touch within one business day.
                  </p>
                  <p className="mt-4 text-sm text-slate-500">
                    In the meantime, you can reach us directly at{" "}
                    <a
                      href="mailto:funds@austradefin.com.au"
                      className="text-navy-900 font-medium hover:text-navy-600 transition-colors"
                    >
                      funds@austradefin.com.au
                    </a>{" "}
                    or{" "}
                    <a
                      href="tel:1300002026"
                      className="text-navy-900 font-medium hover:text-navy-600 transition-colors"
                    >
                      1300 002 026
                    </a>
                    .
                  </p>
                </div>
              </MotionInView>
            ) : (
              <MotionInView>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="jane@example.com.au"
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="04XX XXX XXX"
                        value={form.phone}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className={labelClass}>
                        Company Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        placeholder="Acme Pty Ltd"
                        value={form.company}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="state" className={labelClass}>
                      State / Territory <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="state"
                      name="state"
                      required
                      value={form.state}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select a state or territory
                      </option>
                      {states.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="needs" className={labelClass}>
                      Financial Needs <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="needs"
                      name="needs"
                      required
                      rows={6}
                      placeholder="Please describe your funding requirements — including the type of finance, approximate amount, purpose, and any relevant details about your business or project."
                      value={form.needs}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="btn-primary">
                      Submit Enquiry
                    </button>
                  </div>
                </form>
              </MotionInView>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
