import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "ShieldCheck",
    title: "Trusted Security",
    description:
      "SOC 2, ISO 27001, and GDPR compliant on Google Cloud for secure data storage.",
  },
  {
    icon: "BadgeCheck",
    title: "Intelligent AI Review Loop",
    description:
      "Automatic AI review to detect and reduce hallucinations, ensuring reliable insights.",
  },
  {
    icon: "Goal",
    title: "AI Insights, Human Verifiable",
    description:
      "AI-driven insights backed by source documents for complete transparency.",
  },
  {
    icon: "FileText",
    title: "Handles Scanned & Handwritten Files",
    description: "Effortlessly process both scanned and handwritten documents.",
  },
  {
    icon: "MousePointerClick",
    title: "Made in India, Built for the World",
    description: "Indian innovation tailored for global legal professionals.",
  },
  {
    icon: "Newspaper",
    title: "Clear, Connected Timelines",
    description:
      "Structured timelines reveal critical case connections and insights.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Features
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Never Let Your Team Manually Prepare a Timeline Again
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Our platform automates the creation of Lists of Dates, reducing drafting
        time by up to 90% so your team can focus on high-impact case
        preparation.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
