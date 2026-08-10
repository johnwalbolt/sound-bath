import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond, Instrument_Serif } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
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

export const metadata: Metadata = {
  title: "Sound Bath — A holistic wellness experience through sound",
  description:
    "Explore our full catalog of music for healing, meditation, sleep, solfeggio frequencies, and more.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${serifDisplay.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
