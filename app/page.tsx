import { FeaturesSection } from "@/components/layout/features";
import { FooterSection } from "@/components/layout/footer";
import { HeroSection } from "@/components/layout/hero";
import { TeamSection } from "@/components/layout/team";
import { TestimonialSection } from "@/components/layout/testimonials";
import { PricingSection } from "@/components/layout/pricing";
import { ContactSection } from "@/components/layout/contact";
import { FAQSection } from "@/components/layout/faq";
import { Navbar } from "@/components/navbar";

export default function LandingPage() {
  return (
    <>
      \
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialSection />
      <TeamSection />
      <PricingSection />
      <ContactSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}
