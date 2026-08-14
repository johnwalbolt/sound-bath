"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/components/site";

const fieldLabel =
  "block text-[12px] font-medium uppercase tracking-[0.18em] text-[#FFFFE5]/60";
const field =
  "mt-2 w-full rounded-xl border border-foreground/25 bg-black/40 px-4 py-3 text-[15px] text-[#FFFFE5] outline-none transition-colors placeholder:text-[#FFFFE5]/30 focus:border-foreground/60";

/** Contact form. With no backend, SUBMIT opens the visitor's email client with
 *  the message pre-filled to the Sound Bath address. */
export default function ConnectForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = `From: ${email}\n\n${message}`;
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject || "Message from the Sound Bath site",
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 flex max-w-xl flex-col gap-6">
      <div>
        <label htmlFor="email" className={fieldLabel}>
          Email <span className="text-[#FFFFE5]/40">(required)</span>
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={field}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="subject" className={fieldLabel}>
          Subject
        </label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={field}
        />
      </div>
      <div>
        <label htmlFor="message" className={fieldLabel}>
          Message <span className="text-[#FFFFE5]/40">(required)</span>
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${field} resize-y`}
        />
      </div>
      <button
        type="submit"
        className="btn-fill-shimmer-primary relative inline-flex items-center justify-center gap-2 self-start overflow-hidden rounded-full border-0 bg-foreground px-8 py-3 text-[12px] font-bold tracking-[0.18em] text-background transition-[border-color] duration-300"
      >
        <span className="relative z-10">SUBMIT</span>
      </button>
    </form>
  );
}
