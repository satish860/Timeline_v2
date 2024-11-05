import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      {/* Announcement Banner */}
      <Card className="bg-secondary mb-12">
        <div className="px-2 py-2 flex items-center gap-2">
          <span className="text-sm bg-primary/10 px-2 py-0 rounded-md">🔔 Announcement</span>
          <Button variant="link" className="text-sm p-0 h-auto" asChild>
            <a href="#" className="flex items-center">
              Introducing Acme.ai
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </Button>
        </div>
      </Card>

      {/* Hero Content */}
      <h1 className="text-4xl sm:text-5xl font-bold max-w-2xl mb-6 tracking-tight">
        Automate your workflow with AI
      </h1>
      
      <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mb-8">
        No matter what problem you have, our AI can help you solve it.
      </p>

      {/* CTA Button */}
      <Button size="lg" className="mb-4">
        <Sparkles className="mr-2 h-4 w-4" />
        Get started for free
      </Button>

      {/* Trial Text */}
      <p className="text-sm text-muted-foreground">
        7 day free trial. No credit card required.
      </p>
    </main>
  );
}
