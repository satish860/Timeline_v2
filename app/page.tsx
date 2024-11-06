import { FeaturesSection } from "@/components/layout/features";
import { FooterSection } from "@/components/layout/footer";
import { HeroSection } from "@/components/layout/hero";
import { FAQSection } from "@/components/layout/faq";
import { Navbar } from "@/components/navbar";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}
