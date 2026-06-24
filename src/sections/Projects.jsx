import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import Reveal from "../components/animations/Reveal";
import SectionTitle from "../components/ui/SectionTitle";
import ImageModal from "../components/ui/ImageModal";

function ProjectDetailModal({ project, onClose, setActiveZoomImage }) {
  if (!project) return null;

  const projectImages = project.images && project.images.length > 0 ? project.images : (project.image ? [project.image] : []);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl p-6 md:p-12 flex items-center justify-center select-none"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 15 }}
          transition={{ type: "spring", damping: 28, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-6xl bg-[#050816]/98 border border-cyan-500/20 rounded-2xl p-8 md:p-10 shadow-2xl shadow-cyan-950/40 font-sans text-gray-300 relative flex flex-col max-h-[85vh] overflow-hidden"
        >
          {/* Top Diagnostic Header Ribbon */}
          <div className="flex items-center justify-between border-b border-white/5 pb-5 mb-8 shrink-0">
            <div>
              <span className="font-mono text-[10px] text-cyan-400 tracking-[0.3em] uppercase block mb-1">
                PROJECT // DETAILED_ARCHITECTURAL_LOG
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">{project.title}</h2>
                
                {/* Dynamic Architectural Status Identifier Tag */}
                {project.status === "IN_PROGRESS" ? (
                  <span className="font-mono text-[9px] text-amber-500 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(245,158,11,0.1)] font-bold tracking-wider uppercase">
                    ⚡ IN_PROGRESS_VAL
                  </span>
                ) : (
                  <span className="font-mono text-[9px] text-cyan-400 bg-cyan-400/10 border border-cyan-400/30 px-2 py-0.5 rounded font-bold tracking-wider uppercase">
                    ✓ SYSTEM_READY
                  </span>
                )}
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="font-mono text-[10px] tracking-wider text-gray-400 hover:text-cyan-400 border border-white/10 bg-white/5 px-4 py-2 rounded transition-all cursor-pointer hover:border-cyan-400/40"
            >
              [ CLOSE_MODULE ]
            </button>
          </div>

          {/* Internal Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-8 custom-modal-scroll">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* LEFT COLUMN: Project Information (7 Cols) */}
              <div className="lg:col-span-7 space-y-6 text-[14px] leading-relaxed">
                <section>
                  <h4 className="font-mono text-[10px] text-gray-500 tracking-widest uppercase mb-2">[ 0x01 // OVERVIEW & PROBLEM STATEMENT ]</h4>
                  <p className="text-gray-400 font-sans">{project.problem}</p>
                </section>

                <section>
                  <h4 className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase mb-2">[ 0x02 // PROPOSED SOLUTION & CIRCUITS ]</h4>
                  <p className="text-slate-300 bg-cyan-950/10 border border-cyan-500/10 rounded-xl p-5 font-sans">
                    {project.solution}
                  </p>
                </section>
              </div>

              {/* RIGHT COLUMN: Multi-Image Schematic Viewer Console (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <h4 className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">[ 0x03 // HARDWARE_SCHEMATICS, PHOTOS ]</h4>
                
                <div 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (projectImages && projectImages.length > 0) {
                      setActiveZoomImage({ 
                        src: projectImages[activeImageIndex], 
                        alt: project.title,
                        images: projectImages,
                        index: activeImageIndex
                      });
                    }
                  }}
                  className="w-full h-60 rounded-xl bg-gradient-to-br from-slate-900 to-black border border-cyan-500/10 relative overflow-hidden flex items-center justify-center p-2 cursor-pointer group/img"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.015)_1px,transparent_1px)] background-size-[20px_24px] pointer-events-none z-10" />
                  
                  {projectImages.length > 0 ? (
                    <img 
                      src={projectImages[activeImageIndex]} 
                      alt="Active Schematic Frame" 
                      className="w-full h-full object-contain opacity-85 group-hover/img:opacity-100 group-hover/img:scale-[1.01] transition-all duration-300 mix-blend-screen"
                    />
                  ) : (
                    <span className="font-mono text-[10px] text-gray-700 tracking-[0.25em] uppercase">[ NO_SCHEMATIC_DATA ]</span>
                  )}
                  
                  <div className="absolute bottom-3 right-3 bg-slate-900 border border-cyan-400/40 hover:border-cyan-400 px-2.5 py-1 rounded font-mono text-[9px] text-cyan-400 opacity-100 lg:opacity-0 lg:group-hover/img:opacity-100 transition-all duration-200 pointer-events-auto tracking-wider shadow-[0_0_8px_rgba(0,245,255,0.2)]">
                    CLICK TO EXPAND
                  </div>
                </div>

                {/* Interactive Thumbnail Ribbon Collection Strip */}
                {projectImages.length > 1 && (
                  <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                    {projectImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex(idx);
                        }}
                        className={`w-16 h-11 rounded border flex-shrink-0 bg-black overflow-hidden p-0.5 transition-all cursor-pointer ${
                          idx === activeImageIndex ? "border-cyan-400 shadow-[0_0_6px_rgba(0,245,255,0.3)]" : "border-white/5 opacity-40 hover:opacity-80"
                        }`}
                      >
                        <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover mix-blend-screen" />
                      </button>
                    ))}
                  </div>
                )}

                {/* ── SECURE PRIVATE ACCELERATED EMBED PLAYBACK CHANNEL ── */}
                {project.youtubeId && (
                  <div className="mt-2 space-y-2">
                    <h4 className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">[ 0x04 // PROJECT_YOU_TUBE_VIDEO ]</h4>
                    <div className="w-full h-44 rounded-xl border border-cyan-500/10 bg-black overflow-hidden relative shadow-inner">
                      <iframe
                        className="w-full h-full opacity-95 hover:opacity-100 transition-opacity duration-300"
                        src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?rel=0&modestbranding=1&autoplay=0`}
                        title="Project Simulation Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* LOWER EXPANDED PARAMETERS */}
            <div className="border-t border-white/5 pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/30 border border-white/5 rounded-xl p-5 font-mono text-xs">
                  <div className="text-gray-500 font-bold mb-2 tracking-wider uppercase">// IMPLEMENTATION_STACK</div>
                  <div className="text-gray-400 mb-2"><span className="text-gray-600">ENVIRONMENT_REG:</span> {project.stack}</div>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map(t => (
                      <span key={t} className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-black/30 border border-white/5 rounded-xl p-5 font-mono text-xs">
                  <div className="text-emerald-400 font-bold mb-2 tracking-wider uppercase">// SYSTEM_BENCHMARK_RESULTS</div>
                  <div className="text-emerald-400/80 leading-relaxed"><span className="text-gray-600">OUTPUT_LOG:</span> {project.impact}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Footer Action Ribbon Tray */}
          <div className="flex justify-end gap-4 border-t border-white/5 pt-5 mt-5 shrink-0">
            {project.github !== "#" && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold rounded transition-all shadow-lg hover:shadow-cyan-400/10 cursor-pointer"
              >
                📥 FETCH_SOURCE_REPOS
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeZoomImage, setActiveZoomImage] = useState(null);
  const filters = ["ALL", "VLSI", "AI HARDWARE", "EMBEDDED", "SECURITY", "IOT"];

  const currentCollectionImages = useMemo(() => {
    if (!selectedProject) return [];
    return selectedProject.images && selectedProject.images.length > 0 
      ? selectedProject.images 
      : (selectedProject.image ? [selectedProject.image] : []);
  }, [selectedProject]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "ALL") return projects;
    return projects.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()));
  }, [activeFilter]);

  // Integrated Keyboard Tracking Engine Hooks
  useEffect(() => {
    if (!activeZoomImage || currentCollectionImages.length <= 1) return;

    const handleKeyDown = (e) => {
      const currentIndex = currentCollectionImages.indexOf(activeZoomImage.src);
      if (currentIndex === -1) return;

      if (e.key === "ArrowRight") {
        const nextIdx = (currentIndex + 1) % currentCollectionImages.length;
        setActiveZoomImage({ src: currentCollectionImages[nextIdx], alt: activeZoomImage.alt, images: currentCollectionImages, index: nextIdx });
      }
      if (e.key === "ArrowLeft") {
        const prevIdx = (currentIndex - 1 + currentCollectionImages.length) % currentCollectionImages.length;
        setActiveZoomImage({ src: currentCollectionImages[prevIdx], alt: activeZoomImage.alt, images: currentCollectionImages, index: prevIdx });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeZoomImage, currentCollectionImages]);

  // Mobile Device Touch Acceleration Trackers
  const [touchStart, setTouchStart] = useState(0);
  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart || !activeZoomImage || currentCollectionImages.length <= 1) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    const currentIndex = currentCollectionImages.indexOf(activeZoomImage.src);
    if (currentIndex === -1) return;

    if (distance > minSwipeDistance) {
      const nextIdx = (currentIndex + 1) % currentCollectionImages.length;
      setActiveZoomImage({ src: currentCollectionImages[nextIdx], alt: activeZoomImage.alt, images: currentCollectionImages, index: nextIdx });
    } else if (distance < -minSwipeDistance) {
      const prevIdx = (currentIndex - 1 + currentCollectionImages.length) % currentCollectionImages.length;
      setActiveZoomImage({ src: currentCollectionImages[prevIdx], alt: activeZoomImage.alt, images: currentCollectionImages, index: prevIdx });
    }
  };

  return (
    <section id="projects" className="py-28 max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 relative z-10">
      
      {/* Upper Layout */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 pb-6 border-b border-white/5">
        <SectionTitle
          label="PROJECT ARCHIVE"
          title="Project Database"
          subtitle="Hardware designs, intelligent systems, and silicon-level innovations."
        />

        <div className="flex flex-wrap gap-2 lg:mb-14">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-mono text-[11px] tracking-wider px-3.5 py-1.5 rounded transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-cyan-400/10 border border-cyan-400 text-cyan-400 shadow-md shadow-cyan-400/5"
                  : "bg-transparent border border-white/5 text-gray-500 hover:border-white/20 hover:text-gray-300"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              viewport={{ once: true }}
              key={project.title}
              className="group border border-white/8 bg-gradient-to-b from-white/[0.03] to-transparent rounded-xl p-5 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between w-full max-w-[400px] h-[520px]"
              style={{ boxShadow: "0 12px 44px rgba(0,0,0,0.3)" }}
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-16 bg-cyan-400/5 blur-xl group-hover:bg-cyan-400/10 transition-all duration-300" />

              <div>
                <div className="w-full h-44 rounded-lg bg-gradient-to-br from-slate-900 to-black border border-white/5 mb-4 relative overflow-hidden flex items-center justify-center group-hover:border-cyan-500/30 transition-all duration-300">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.015)_1px,transparent_1px)] background-size-[14px_14px] z-10 pointer-events-none" />
                  
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500 filter contrast-125 brightness-95 mix-blend-screen"
                    />
                  ) : (
                    <span className="font-mono text-[9px] text-gray-700 group-hover:text-cyan-400/40 tracking-widest transition-colors duration-300 uppercase">
                      [ NO_SCHEMATIC_DATA ]
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] text-gray-500 tracking-wider uppercase">// {project.category}</span>
                  
                  {/* Dynamic Project Level Status Gauge Ribbon Badge */}
                  <div className="flex items-center gap-1.5">
                    {project.status === "IN_PROGRESS" ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_#f59e0b]" />
                        <span className="font-mono text-[8px] text-amber-500 font-bold tracking-widest uppercase">IN PROGRESS</span>
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-glow" />
                        <span className="font-mono text-[8px] text-cyan-400 font-bold tracking-widest uppercase">RESEARCH PROTOTYPE</span>
                      </>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-200 tracking-tight group-hover:text-white transition-colors line-clamp-2 mb-2 min-h-[44px]">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-4 font-sans">
                  {project.problem}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map(tech => (
                    <span key={tech} className="font-mono text-[9px] text-gray-400 border border-white/5 bg-slate-900/40 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Grid operation system triggers */}
                <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if(project.image) {
                        setActiveZoomImage({ 
                          src: project.image, 
                          alt: project.title, 
                          images: project.images && project.images.length > 0 ? project.images : [project.image], 
                          index: 0 
                        });
                      }
                    }}
                    disabled={!project.image}
                    className={`w-full text-center py-2 border rounded transition-all ${
                      project.image 
                        ? "border-white/5 hover:border-cyan-400/30 text-gray-400 hover:text-cyan-400 cursor-pointer" 
                        : "border-white/5 text-gray-700 cursor-not-allowed"
                    }`}
                  >
                    {project.image ? "VIEW IMAGE" : "NO SCHEMATIC"}
                  </button>

                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="w-full text-center py-2 border border-cyan-500/30 bg-cyan-400/5 text-cyan-400 rounded hover:bg-cyan-400/10 hover:border-cyan-400 transition-all font-bold tracking-wider cursor-pointer"
                  >
                    DETAILS
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Full-Screen Documentation Page Modal */}
      <ProjectDetailModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        setActiveZoomImage={setActiveZoomImage} 
      />

      {/* Full-Screen Image Lightbox Viewport Overlay */}
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
    </section>
  );
}