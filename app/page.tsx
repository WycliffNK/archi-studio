import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import VideoSection from "@/components/VideoSection";
import ServicesSection from "@/components/ServicesSection";
import ClientLogos from "@/components/ClientLogos";
import AwardsSection from "@/components/AwardsSection";
import ProjectsSection from "@/components/ProjectsSection";
import MarqueeText from "@/components/MarqueeText";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <VideoSection />
        <ServicesSection />
        <ClientLogos />
        <AwardsSection />
        <ProjectsSection />
        <MarqueeText />
        <BlogSection />
      </main>
      <Footer />
    </>
  );
}
