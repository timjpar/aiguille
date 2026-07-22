import type { Metadata } from "next";
import { Archivo, Instrument_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GradeRail from "@/components/GradeRail";

const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aiguille.com"),
  title: {
    default: "Aiguille Rock Climbing Center — Longwood, FL",
    template: "%s · Aiguille Rock Climbing Center",
  },
  description:
    "Orlando's only full-service climbing gym. 10,000 sq ft, 24-foot walls, and routes reset every week. Plan your first visit in Longwood, Florida.",
  openGraph: {
    title: "Aiguille Rock Climbing Center",
    description:
      "Orlando's only full-service climbing gym — top-rope, bouldering, auto-belay, and coaching for every level.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-limestone text-basalt">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <GradeRail />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
