"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

const ID = "G-LCDLTSH1QX";
const KEY = "soundbath-analytics-consent-v1";
const EVENT = "soundbath-consent-change";
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
type Choice = "allowed" | "denied" | "unknown";
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  "ga-disable-G-LCDLTSH1QX"?: boolean;
};
let memoryChoice: Choice = "unknown";
let started = false;
let lastPath: string | null = null;

function readChoice(): Choice {
  if (memoryChoice !== "unknown") return memoryChoice;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return memoryChoice;
    const saved = JSON.parse(raw);
    return saved.expires > Date.now() && ["allowed", "denied"].includes(saved.choice)
      ? saved.choice : "unknown";
  } catch { return memoryChoice; }
}

function clearAnalyticsCookies() {
  for (const part of document.cookie.split(";")) {
    const name = part.trim().split("=")[0];
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    // Include legacy domain cookies if an earlier installation created any.
    for (const domain of ["", location.hostname, ".soundbathvibrations.com"]) {
      document.cookie = `${name}=; Max-Age=0; Path=/;${domain ? ` Domain=${domain};` : ""} SameSite=Lax; Secure`;
    }
  }
}

function stopAnalytics(reload = true) {
  (window as AnalyticsWindow)["ga-disable-G-LCDLTSH1QX"] = true;
  clearAnalyticsCookies();
  lastPath = null;
  // A reload unloads Google's event listeners, including an in-flight script.
  if (started && reload) location.reload();
}

function subscribe(callback: () => void) {
  const changed = () => {
    if (readChoice() !== "allowed") stopAnalytics(false);
    callback();
  };
  const external = (event: StorageEvent) => {
    if (event.key === KEY || event.key === null) {
      memoryChoice = "unknown";
      changed();
      if (readChoice() !== "allowed" && started) location.reload();
    }
  };
  window.addEventListener(EVENT, changed);
  window.addEventListener("storage", external);
  return () => {
    window.removeEventListener(EVENT, changed);
    window.removeEventListener("storage", external);
  };
}

// Only public, known routes are measured: no arbitrary path, query, hash,
// form values, or document titles can enter event parameters.
const routes = new Set(["/", "/about/", "/catalog/", "/connect/", "/faq/", "/meditation/", "/nature/", "/sleep/", "/solfeggio/"]);
function publicPath(path: string) {
  const normalized = path === "/" ? "/" : `${path.replace(/\/$/, "")}/`;
  return routes.has(normalized) ? normalized : "/other/";
}

export default function AnalyticsConsent() {
  const choice = useSyncExternalStore(subscribe, readChoice, () => "unknown" as Choice);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (choice !== "allowed" || readChoice() !== "allowed") return;
    const w = window as AnalyticsWindow;
    w["ga-disable-G-LCDLTSH1QX"] = false;
    const path = publicPath(pathname);
    const page = `https://soundbathvibrations.com${path}`;
    if (!started) {
      started = true;
      w.dataLayer = w.dataLayer || [];
      // Google's command queue expects an Arguments object, not a nested array.
      // eslint-disable-next-line prefer-rest-params
      w.gtag = function () { w.dataLayer!.push(arguments); };
      w.gtag("consent", "default", {
        analytics_storage: "granted", ad_storage: "denied",
        ad_user_data: "denied", ad_personalization: "denied",
      });
      w.gtag("js", new Date());
      w.gtag("set", { page_location: page, page_referrer: "", page_title: "Sound Bath" });
      w.gtag("config", ID, {
        send_page_view: false, allow_google_signals: false,
        allow_ad_personalization_signals: false, cookie_domain: "none",
        cookie_expires: 60 * 60 * 24 * 180, cookie_flags: "SameSite=Lax;Secure",
        page_location: page, page_referrer: "", page_title: "Sound Bath",
      });
      const script = document.createElement("script");
      script.id = "soundbath-google-analytics";
      script.async = true;
      script.referrerPolicy = "no-referrer";
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
      document.head.appendChild(script);
    }
    if (lastPath === path) return;
    lastPath = path;
    w.gtag?.("set", { page_location: page, page_referrer: "", page_title: "Sound Bath" });
    w.gtag?.("event", "page_view", {
      send_to: ID, page_location: page, page_referrer: "", page_title: "Sound Bath",
    });
  }, [choice, pathname]);

  function choose(next: "allowed" | "denied") {
    memoryChoice = next;
    let saved = false;
    try {
      const value = JSON.stringify({ choice: next, expires: Date.now() + MAX_AGE });
      localStorage.setItem(KEY, value);
      saved = localStorage.getItem(KEY) === value;
    } catch { /* Keep the in-memory choice authoritative for this visit. */ }
    setSaveFailed(!saved);
    if (next === "denied") stopAnalytics(saved);
    window.dispatchEvent(new Event(EVENT));
    setSettingsOpen(!saved);
  }

  const button = "rounded-full border border-[#FFFFE5]/40 px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFFFE5]";
  return (
    <>
      <div className="px-6 pb-5 text-center">
        <button type="button" onClick={() => setSettingsOpen(true)} className="text-xs text-[#FFFFE5]/70 underline underline-offset-4">Privacy &amp; analytics settings</button>
      </div>
      {(choice === "unknown" || settingsOpen) && (
        <section aria-label="Analytics privacy preferences" className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-h-[80vh] max-w-2xl overflow-auto rounded-2xl border border-[#FFFFE5]/30 bg-[#101716] p-5 text-[#FFFFE5] shadow-xl">
          <h2 className="text-lg font-semibold">Your privacy choices</h2>
          {saveFailed && <p role="status" className="mt-2 text-sm">Your browser could not save this preference. It applies to this open page only. To remove an older saved choice, clear this site’s data in your browser settings.</p>}
          <p className="mt-2 text-sm leading-relaxed">With your permission, we use Google Analytics cookies to understand visits and page views. Google receives browsing events and browser/device information. We do not send contact-form entries or URL query details, and advertising features are off.</p>
          <p className="mt-2 text-sm leading-relaxed">Analytics stays off unless you allow it. Your choice is saved on this browser for up to 180 days. Change it anytime using Privacy &amp; analytics settings; turning analytics off clears its cookies in this browser and reloads the page. Previously collected data is not erased.</p>
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm underline underline-offset-4">How Google uses information</a>
          <p className="mt-2 text-xs">Current choice: {choice === "allowed" ? "analytics allowed" : "analytics off"}.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" className={button} onClick={() => choose("denied")}>Decline analytics</button>
            <button type="button" className={button} onClick={() => choose("allowed")}>Allow analytics</button>
            {choice !== "unknown" && <button type="button" className={button} onClick={() => setSettingsOpen(false)}>Close</button>}
          </div>
        </section>
      )}
    </>
  );
}
