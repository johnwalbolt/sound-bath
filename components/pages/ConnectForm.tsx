"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/components/site";

// ─────────────────────────────────────────────────────────────────────────────
// Paste the Web3Forms access key here (from https://web3forms.com — it's tied to
// the destination inbox and is safe to keep in client code). One-line swap:
const WEB3FORMS_ACCESS_KEY = "";
// ─────────────────────────────────────────────────────────────────────────────

const fieldLabel =
  "block text-[12px] font-medium uppercase tracking-[0.18em] text-[#FFFFE5]/60";
const field =
  "mt-2 w-full rounded-xl border border-foreground/25 bg-black/40 px-4 py-3 text-[15px] text-[#FFFFE5] outline-none transition-colors placeholder:text-[#FFFFE5]/30 focus:border-foreground/60";

type Status = "idle" | "sending" | "sent" | "error";

/** Contact form. Submits to Web3Forms, which emails the message to the Sound
 *  Bath inbox — no backend of our own required (works on a static host). */
export default function ConnectForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!WEB3FORMS_ACCESS_KEY) {
      // Not configured yet — fall back to opening the visitor's email client.
      const body = `From: ${email}\n\n${message}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        subject || "Message from the Sound Bath site",
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          from_name: "Sound Bath website",
          subject: subject || "New message from the Sound Bath site",
          email, // used as reply-to
          message,
          botcheck: "", // honeypot (kept empty by humans)
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-10 max-w-xl rounded-2xl border border-foreground/20 bg-black/40 p-8 text-center">
        <p className="text-lg font-bold text-[#FFFFE5]">Message sent — thank you!</p>
        <p className="mt-2 text-[14px] text-[#FFFFE5]/70">
          We&rsquo;ll be in touch soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[12px] font-medium uppercase tracking-[0.18em] text-[#FFFFE5]/60 underline underline-offset-4 transition-colors hover:text-[#FFFFE5]"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 flex max-w-xl flex-col gap-6">
      {/* honeypot: hidden from humans, catches bots */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
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

      {status === "error" && (
        <p className="text-[13px] text-red-400">
          Something went wrong — please try again, or email {CONTACT_EMAIL}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-fill-shimmer-primary relative inline-flex items-center justify-center gap-2 self-start overflow-hidden rounded-full border-0 bg-foreground px-8 py-3 text-[12px] font-bold tracking-[0.18em] text-background transition-[border-color] duration-300 disabled:opacity-60"
      >
        <span className="relative z-10">
          {status === "sending" ? "SENDING…" : "SUBMIT"}
        </span>
      </button>
    </form>
  );
}
