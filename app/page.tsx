import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import VideoSection from "@/components/VideoSection";
import ServicesSection from "@/components/ServicesSection";
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
        <AwardsSection />
        <ProjectsSection />
        <MarqueeText />
        <BlogSection />

        {/* Architecture wordmark strip — letters deliberately overflow the fixed-height container */}
        <div
          className="bg-[#191919] overflow-hidden flex items-center"
          style={{
            backgroundImage: "url('/dotted-pattern.svg')",
            backgroundPosition: "center top",
            backgroundRepeat: "repeat",
            height: "clamp(70px, 9.5vw, 150px)",
          }}
        >
          <div
            className="font-antonio font-bold text-center whitespace-nowrap w-full select-none pointer-events-none leading-none"
            style={{
              fontSize: "clamp(110px, 15vw, 240px)",
              color: "#2B2B2B",
              letterSpacing: "-5px",
            }}
          >
            architecture
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
