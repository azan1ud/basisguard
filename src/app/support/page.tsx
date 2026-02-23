"use client";

import Link from "next/link";
import { useState } from "react";

export default function SupportPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-navy">
            Basis<span className="text-emerald">Guard</span>
          </Link>
          <Link href="/" className="text-sm text-slate hover:text-charcoal transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-navy mb-3">Contact Support</h1>
          <p className="text-slate max-w-xl mx-auto">
            Have a question or need help? Reach out and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="space-y-6">
            <div className="bg-white rounded-card shadow-card p-6">
              <div className="w-10 h-10 bg-emerald/10 rounded-full flex items-center justify-center mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h3 className="font-semibold text-charcoal mb-1">Email</h3>
              <a href="mailto:support@basisguard.com" className="text-sm text-emerald hover:text-emerald-dark">
                support@basisguard.com
              </a>
            </div>

            <div className="bg-white rounded-card shadow-card p-6">
              <div className="w-10 h-10 bg-emerald/10 rounded-full flex items-center justify-center mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="font-semibold text-charcoal mb-1">Response Time</h3>
              <p className="text-sm text-slate">Within 24 hours on business days</p>
            </div>

            <div className="bg-white rounded-card shadow-card p-6">
              <div className="w-10 h-10 bg-emerald/10 rounded-full flex items-center justify-center mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-charcoal mb-1">Common Topics</h3>
              <ul className="text-sm text-slate space-y-1 mt-2">
                <li>&bull; PDF parsing issues</li>
                <li>&bull; Exchange connection help</li>
                <li>&bull; Report questions</li>
                <li>&bull; Refund requests</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-card shadow-card p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-2">Message Sent</h3>
                  <p className="text-slate mb-6">
                    We&apos;ve received your message and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="text-sm text-emerald hover:text-emerald-dark"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">Name</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full border border-gray-200 rounded-btn px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">Email</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full border border-gray-200 rounded-btn px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">Subject</label>
                    <select
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full border border-gray-200 rounded-btn px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald bg-white"
                    >
                      <option value="">Select a topic...</option>
                      <option value="pdf-parsing">PDF Parsing Issue</option>
                      <option value="exchange-connection">Exchange Connection Help</option>
                      <option value="report-question">Question About My Report</option>
                      <option value="billing">Billing / Refund Request</option>
                      <option value="account">Account Issue</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full border border-gray-200 rounded-btn px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald resize-none"
                      placeholder="Describe your issue or question..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-emerald hover:bg-emerald-dark text-white font-semibold py-3 rounded-btn transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
