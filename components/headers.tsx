"use client";
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Boxes } from "lucide-react";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

export default function Component() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Boxes className="h-10 w-10" />
          <span className="text-2xl font-bold">Timeline</span>
        </div>

        <div className="flex items-center gap-10">
          <NavigationMenu className="ml-auto">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <Boxes className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            AI-Powered Automation
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Streamline your workflow with intelligent
                            automation.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/task-automation" title="Task Automation">
                      Automate repetitive tasks and save time.
                    </ListItem>
                    <ListItem
                      href="/workflow-optimization"
                      title="Workflow Optimization"
                    >
                      Optimize your processes with AI-driven insights.
                    </ListItem>
                    <ListItem
                      href="/intelligent-scheduling"
                      title="Intelligent Scheduling"
                    >
                      AI-powered scheduling for maximum efficiency.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {[
                      {
                        title: "Task Automation",
                        href: "/solutions/task-automation",
                        description: "Automate repetitive tasks and save time.",
                      },
                      {
                        title: "Workflow Optimization",
                        href: "/solutions/workflow-optimization",
                        description:
                          "Optimize your processes with AI-driven insights.",
                      },
                      {
                        title: "Intelligent Scheduling",
                        href: "/solutions/intelligent-scheduling",
                        description:
                          "AI-powered scheduling for maximum efficiency.",
                      },
                      {
                        title: "Data Analysis",
                        href: "/solutions/data-analysis",
                        description:
                          "Gain valuable insights from your data with AI.",
                      },
                      {
                        title: "Process Mining",
                        href: "/solutions/process-mining",
                        description:
                          "Discover and analyze your business processes.",
                      },
                      {
                        title: "Custom Solutions",
                        href: "/solutions/custom",
                        description:
                          "Tailored AI solutions for your unique needs.",
                      },
                    ].map((solution) => (
                      <ListItem
                        key={solution.title}
                        title={solution.title}
                        href={solution.href}
                      >
                        {solution.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <Button variant="ghost">Login</Button>
            <Button>Get Started for Free</Button>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-base font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
