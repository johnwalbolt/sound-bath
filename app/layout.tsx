import AnalyticsConsent from "@/components/AnalyticsConsent";
import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { OFFICIAL_PROFILES, SITE_URL } from "@/components/profiles";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

// Elegant high-contrast display serif for the "SOUND BATH" wordmark.
// Swap this out if you provide a specific brand typeface.
const serifDisplay = Cormorant_Garamond({
  variable: "--font-serif-display",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Display serif used for the variant 3 title.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const SITE_DESCRIPTION =
  "Sound Bath is an ambient music project by music producer Andrew Heringer: music for sleep, meditation, solfeggio frequencies, and nature sounds. Stream on Spotify, Apple Music, Amazon Music, and YouTube.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sound Bath — A holistic wellness experience through sound",
  description: SITE_DESCRIPTION,
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: "Sound Bath",
    title: "Sound Bath — Ambient music by Andrew Heringer",
    description: SITE_DESCRIPTION,
    url: "./",
    images: [{ url: "/assets/album-art.webp", alt: "Sound Bath catalog artwork" }],
  },
  icons: {
    icon: [{ url: "/favicon-32x32.webp", type: "image/webp", sizes: "32x32" }],
  },
};

// Structured data (JSON-LD): describes "Sound Bath" as a music project, who
// makes it, and which profiles are official. The profile list comes from
// components/profiles.ts, the same list the FAQ shows.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Sound Bath",
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#soundbath` },
    },
    {
      "@type": "MusicGroup",
      "@id": `${SITE_URL}/#soundbath`,
      name: "Sound Bath",
      url: `${SITE_URL}/`,
      description: SITE_DESCRIPTION,
      genre: "Ambient",
      foundingLocation: { "@type": "Place", name: "California, USA" },
      founder: { "@id": `${SITE_URL}/#andrew-heringer` },
      sameAs: OFFICIAL_PROFILES.map((p) => p.href),
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#andrew-heringer`,
      name: "Andrew Heringer",
      jobTitle: "Music producer",
      url: "https://www.andrewheringer.com/",
      sameAs: ["https://en.wikipedia.org/wiki/Andrew_Heringer"],
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${serifDisplay.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <AnalyticsConsent />
      </body>
    </html>
  );
}
