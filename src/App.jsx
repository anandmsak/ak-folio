import CursorTrail from "./components/ui/CursorTrail";
import ParticleField from "./components/ui/ParticleField";
import PCBBackground from "./components/ui/PCBBackground";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";

// Thin horizontal divider between sections
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
  return (
    <div className="relative min-h-screen">
      {/* Fixed ambient layers — DO NOT MODIFY */}
      <CursorTrail />
      <ParticleField />
      <PCBBackground />

      {/* Fixed top navigation */}
      <Navbar />

      {/* Page content */}
      <main className="relative z-10">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        {/* Phase 3 sections go here — Projects, Research, Achievements */}
        {/* Phase 4 sections go here — Certifications, Experience, Education, Contact */}
      </main>

      <Footer />
    </div>
  );
}

export default App;