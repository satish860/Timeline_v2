import localFont from "next/font/local";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Settings } from "lucide-react";
import { EdgeStoreProvider } from "../../lib/edgestore";
import { cookies } from "next/headers";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default async function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
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
            <EdgeStoreProvider>
              <main className="p-6">{children}</main>
            </EdgeStoreProvider>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
