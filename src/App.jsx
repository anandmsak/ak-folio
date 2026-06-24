import { useState, useEffect } from "react"; // Added React hooks for global overlay sync
import CursorTrail from "./components/ui/CursorTrail";
import ParticleField from "./components/ui/ParticleField";
import PCBBackground from "./components/ui/PCBBackground";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Research from "./sections/Research";
import Achievements from "./sections/Achievements";

// ── IMPORT YOUR FINAL PHASE 4 SECTIONS SEAMLESSLY
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";
import ImageModal from "./components/ui/ImageModal"; // Centralizing image zoom modal at root context

function SectionDivider() {
  return (
    <div
      style={{
        width: "100%",
        height: "1px",
        background: "linear-gradient(to right, transparent, rgba(0,245,255,0.1), rgba(245,158,11,0.06), transparent)",
        margin: "0 auto",
      }}
    />
  );
}

function App() {
  // ── CORE GLOBAL LIGHTBOX STORAGE HOOK ──
  const [activeZoomImage, setActiveZoomImage] = useState(null);

  // Keyboard Event Listener Matrix: Handles Arrow Keys for multi-frame switching globally
  useEffect(() => {
    if (!activeZoomImage || !activeZoomImage.images || activeZoomImage.images.length <= 1) return;

    const handleKeyDown = (e) => {
      const { images, index, alt } = activeZoomImage;

      if (e.key === "ArrowRight") {
        const nextIdx = (index + 1) % images.length;
        setActiveZoomImage({ src: images[nextIdx], alt, images, index: nextIdx });
      }
      if (e.key === "ArrowLeft") {
        const prevIdx = (index - 1 + images.length) % images.length;
        setActiveZoomImage({ src: images[prevIdx], alt, images, index: prevIdx });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeZoomImage]);

  // Mobile Device Touch Swipe Vector Translators
  const [touchStart, setTouchStart] = useState(0);
  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart || !activeZoomImage || !activeZoomImage.images || activeZoomImage.images.length <= 1) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    const { images, index, alt } = activeZoomImage;

    if (distance > minSwipeDistance) {
      // Swipe Left Trigger -> Show Next Image
      const nextIdx = (index + 1) % images.length;
      setActiveZoomImage({ src: images[nextIdx], alt, images, index: nextIdx });
    } else if (distance < -minSwipeDistance) {
      // Swipe Right Trigger -> Show Previous Image
      const prevIdx = (index - 1 + images.length) % images.length;
      setActiveZoomImage({ src: images[prevIdx], alt, images, index: prevIdx });
    }
  };

  return (
    <div className="relative min-h-screen">
      <CursorTrail />
      <ParticleField />
      <PCBBackground />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        
        {/* Pass down the central state manager down into your projects archive component block */}
        <Projects activeZoomImage={activeZoomImage} setActiveZoomImage={setActiveZoomImage} />
        
        <SectionDivider />
        <Research />
        <SectionDivider />
        <Achievements />
        
        {/* ── PHASE 4 PORT PORTALS INJECTION ── */}
        <SectionDivider />
        {/* Pass down the central zoom state manager to unleash full screen horizontal credential overlays */}
        <Certifications setActiveZoomImage={setActiveZoomImage} />
        
        <SectionDivider />
        <Contact />
      </main>

      <Footer />

      {/* ── CENTRAL GLOBAL APPLICATION LEVEL VIEWPORT MATRIX ── */}
      {activeZoomImage && (
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative"
        >
          <ImageModal 
            src={activeZoomImage.src} 
            alt={activeZoomImage.alt} 
            projectImages={activeZoomImage.images || [activeZoomImage.src]}
            setActiveZoomImage={setActiveZoomImage}
            onClose={() => setActiveZoomImage(null)} 
          />
        </div>
      )}
    </div>
  );
}

export default App;