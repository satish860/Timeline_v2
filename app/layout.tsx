import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/search/lib/styles/index.css";
import { ThemeProvider } from "@/components/theme-proivder";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Timeline | Win Your Case with Clear Chronology",
  description:
    "Professional litigation timeline software that helps lawyers organize case events, visualize chronology, and build stronger legal arguments.",
  openGraph: {
    title: "Timeline | Win Your Case with Clear Chronology",
    description:
      "Professional litigation timeline software that helps lawyers organize case events, visualize chronology, and build stronger legal arguments.",
    type: "website",
    locale: "en_US",
    url: "https://timeline.app", // Replace with your actual URL
    siteName: "Timeline",
    images: [
      {
        url: "/og-image.png", // Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: "Timeline App - Legal Case Management Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Timeline | Win Your Case with Clear Chronology",
    description:
      "Professional litigation timeline software that helps lawyers organize case events, visualize chronology, and build stronger legal arguments.",
    images: ["/og-image.png"], // Replace with your actual Twitter card image path
  },
  keywords: [
    "legal timeline",
    "litigation software",
    "case chronology",
    "legal case management",
    "lawyer tools",
    "litigation preparation",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StackProvider app={stackServerApp}>
            <StackTheme>
              {children}
            </StackTheme>
          </StackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
