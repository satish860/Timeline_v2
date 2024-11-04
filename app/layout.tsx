import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { Separator } from "@/components/ui/separator";
import { Settings } from "lucide-react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/search/lib/styles/index.css";

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
  description: "Professional litigation timeline software that helps lawyers organize case events, visualize chronology, and build stronger legal arguments.",
  openGraph: {
    title: "Timeline | Win Your Case with Clear Chronology",
    description: "Professional litigation timeline software that helps lawyers organize case events, visualize chronology, and build stronger legal arguments.",
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
    description: "Professional litigation timeline software that helps lawyers organize case events, visualize chronology, and build stronger legal arguments.",
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
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StackProvider app={stackServerApp}>
          <StackTheme>
            <SidebarProvider defaultOpen={defaultOpen}>
              <AppSidebar />
              <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                  <div className="flex items-center">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mx-2 h-4" />
                  </div>
                  <div className="flex items-center gap-4 ml-auto">
                    <span className="text-sm text-gray-600">
                      Page credits remaining: 77,057
                    </span>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50">
                      <span>Purchase Credits</span>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <Settings className="h-5 w-5" />
                    </button>
                  </div>
                </header>
                <main className="p-6">{children}</main>
              </SidebarInset>
            </SidebarProvider>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
