import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MarqueeText from "@/components/MarqueeText";
import ServicesSection from "@/components/ServicesSection";
import ClientLogos from "@/components/ClientLogos";
import AwardsSection from "@/components/AwardsSection";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MarqueeText text="Architecture · Interior Design · Urban Planning" />
        <ServicesSection />
        <ClientLogos />
        <AwardsSection />
        <MarqueeText text="Creating Spaces That Inspire" dark />
        <ProjectsSection />
        <TestimonialsSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  );
}
