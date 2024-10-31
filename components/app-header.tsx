import Image from "next/image";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppHeader() {
  const cookieStore = cookies();
  const credits = cookieStore.get("credits")?.value || "0";

  return (
    <header className="flex h-14 items-center justify-between border-b px-6 bg-background">
      {/* Left side - Logo and Name */}
      <div className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={24}
          height={24}
          className="dark:invert"
        />
        <span className="font-semibold">Mary Technology</span>
      </div>

      {/* Right side - Credits and Settings */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Page credits remaining: {credits}
        </span>
        <Button variant="outline" size="sm">
          Purchase Credits
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Help</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
