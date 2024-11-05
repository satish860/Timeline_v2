import { FeaturesSection } from "@/components/layout/features";
import { FooterSection } from "@/components/layout/footer";
import { HeroSection } from "@/components/layout/hero";
import { TestimonialSection } from "@/components/layout/testimonials";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TestimonialSection />
      <FooterSection />
    </>
  );
}
