import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certifications } from "../data/certifications";
import Reveal from "../components/animations/Reveal";
import SectionTitle from "../components/ui/SectionTitle";

// Directory asset file imports
import certAicte from "../assets/images/cert_aicte.jpg";
import certIBM from "../assets/images/cert_ibm_ai.jpg";
import certDeloitteJob from "../assets/images/cert_deloitte_job.jpg";
import certDeloitteCyber from "../assets/images/cert_deloitte_cyber.jpg";
import certEncoderDecoder from "../assets/images/cert_encoder_decoder.jpg";
import certGenAiXai from "../assets/images/cert_genai_xai.jpg";
import certIotWorkshop from "../assets/images/cert_iot_workshop.jpg";
import certNielit from "../assets/images/cert_nielit.jpg";
import certNPTEL_IOT from "../assets/images/cert_iot_nptel.jpg";
import cert_ieee_aimla from "../assets/images/cert_ieee_aimla.jpg";

const assetMap = {
  "Artificial Intelligence and Data Analytics (Green Skills)": certAicte,
  "AI for Sustainability Virtual Internship": certIBM,
  "Embedded Systems for Beginners": certNielit,
  "IoT & Embedded Systems Workshop": certIotWorkshop,
  "IoT and Embedded System Workshop": certIotWorkshop,
  "GENAI and XAI Workshop": certGenAiXai,
  "Deloitte Job Simulation": certDeloitteJob,
  "Deloitte Technology Job Simulation": certDeloitteJob,
  "Deloitte Cyber Security Simulation": certDeloitteCyber,
  "Deloitte Cyber Job Simulation": certDeloitteCyber,
  "Encoder Decoder Architecture": certEncoderDecoder,
  "Encoder-Decoder Architecture": certEncoderDecoder,
  "Introduction_to_Internet_of_Things": certNPTEL_IOT,
  "Introduction to Internet of Things": certNPTEL_IOT,
  "Certificate of Presentation – IEEE AIMLA 2026": cert_ieee_aimla,
};

export default function Certifications({ setActiveZoomImage }) {
  const [activeSidePanel, setActiveSidePanel] = useState(null);

  return (
    <section id="certifications" className="py-28 max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 relative z-10">
      <SectionTitle
        label="CREDENTIAL MATRIX"
        title="Verified Credentials"
        subtitle="Professional credentials, field telemetry certifications, and corporate job simulations."
      />

      {/* Balanced 2-Column Desktop Grid Assembly Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {certifications.map((cert, i) => {
          const matchedAsset = assetMap[cert.title] || null;

          const handleZoom = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (matchedAsset && setActiveZoomImage) {
              setActiveZoomImage({
                src: matchedAsset,
                alt: cert.title,
                images: [matchedAsset],
                index: 0
              });
            }
          };

          return (
            <Reveal key={cert.title} delay={i * 0.04}>
              <motion.div
                whileHover={{ borderColor: "rgba(0, 245, 255, 0.25)", x: 2 }}
                className="group border border-white/5 bg-gradient-to-r from-slate-950/50 via-[#070c1e]/30 to-transparent rounded-xl p-5 backdrop-blur-xl w-full flex flex-col sm:flex-row gap-5 relative overflow-hidden items-center sm:items-stretch"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
              >
                <div className="absolute top-0 left-0 w-full h-px bg-cyan-400/10 group-hover:bg-cyan-400/40 transition-colors duration-300 pointer-events-none" />

                {/* LEFT FLANK: Certificate Image Frame Case */}
                <div 
                  onClick={handleZoom}
                  className="w-full sm:w-44 h-32 rounded-lg bg-black border border-white/5 relative overflow-hidden flex items-center justify-center shrink-0 cursor-pointer group/thumb shadow-inner"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.01)_1px,transparent_1px)] background-size-[10px_10px] z-10 pointer-events-none" />
                  {matchedAsset ? (
                    <img 
                      src={matchedAsset} 
                      alt={cert.title} 
                      className="w-full h-full object-cover opacity-60 group-hover/thumb:opacity-95 group-hover/thumb:scale-[1.02] transition-all duration-300 filter contrast-125 mix-blend-screen"
                    />
                  ) : (
                    <span className="font-mono text-[8px] text-gray-700 tracking-widest uppercase">[ ACCESS_DENIED ]</span>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center font-mono text-[8px] text-cyan-400 tracking-wider font-bold z-20 uppercase">
                    [ ZOOM_LOG ]
                  </div>
                </div>

                {/* RIGHT FLANK: High-Density Meta Text Area */}
                <div className="flex flex-col justify-between flex-1 w-full text-center sm:text-left py-0.5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center sm:justify-between gap-2 font-mono text-[9px]">
                      <span className="tracking-wider uppercase text-cyan-400 font-semibold tracking-widest">// {cert.org}</span>
                      <span className="text-gray-500 font-bold">{cert.year}</span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-200 tracking-tight leading-snug group-hover:text-white transition-colors">
                      {cert.title}
                    </h3>

                    {/* Description Paragraph Container */}
                    <p className="text-[11px] text-gray-400 font-sans line-clamp-2 leading-relaxed text-left">
                      {cert.description}
                    </p>

                    {/* Tech Skill Sub-Ribbon Strip Array */}
                    <div className="flex flex-wrap gap-1 pt-1 justify-center sm:justify-start">
                      {cert.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="font-mono text-[8px] text-gray-500 bg-white/5 border border-white/5 px-1.5 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Operational Status HUD Footer Tray */}
                  <div className="flex items-center justify-between gap-4 font-mono text-[9px] border-t border-white/5 pt-3 mt-4">
                    <div className="text-gray-500 hidden sm:block truncate max-w-[140px] md:max-w-[200px]">
                      ID: <span className="text-gray-400">{cert.credentialId}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mx-auto sm:mx-0 sm:hidden">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-emerald-400 font-bold tracking-widest">[ VERIFIED ]</span>
                    </div>
                    
                    <button 
                      onClick={() => setActiveSidePanel({ ...cert, asset: matchedAsset })}
                      className="text-cyan-400 hover:text-white font-bold tracking-wider transition-all cursor-pointer uppercase border border-cyan-500/20 hover:bg-cyan-400/10 px-3 py-1 rounded shadow-[0_0_8px_rgba(0,245,255,0.05)] ml-auto sm:ml-0"
                    >
                      [ LOG_VIEW ]
                    </button>
                  </div>
                </div>

              </motion.div>
            </Reveal>
          );
        })}
      </div>

      {/* ── INTERACTIVE SLIDE-OUT RIGHT HAND SIDE METADATA SHEET DRAWER ── */}
      <AnimatePresence>
        {activeSidePanel && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSidePanel(null)}
              className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 260 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#050813]/99 border-l border-cyan-500/10 shadow-2xl z-[201] p-6 flex flex-col justify-between font-sans select-none"
            >
              <div className="space-y-6 overflow-y-auto pr-1 h-full custom-modal-scroll">
                {/* Drawer Module Title ribbon header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div>
                    <span className="font-mono text-[9px] text-cyan-400 tracking-widest uppercase block mb-0.5">// DIAG_TELEMETRY_SHEET</span>
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider">Credential Verification Profile</h2>
                  </div>
                  <button 
                    onClick={() => setActiveSidePanel(null)}
                    className="font-mono text-[9px] text-gray-500 hover:text-red-400 border border-white/10 bg-white/5 px-2.5 py-1 rounded transition-colors cursor-pointer"
                  >
                    [ DISMISS ]
                  </button>
                </div>

                {/* Central Drawer Zoomable Landscape Preview Asset Frame */}
                {activeSidePanel.asset && (
                  <div 
                    onClick={() => {
                      if (setActiveZoomImage) {
                        setActiveZoomImage({ src: activeSidePanel.asset, alt: activeSidePanel.title, images: [activeSidePanel.asset], index: 0 });
                      }
                    }}
                    className="w-full h-48 bg-black/60 rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center cursor-zoom-in group/sideimg shadow-inner p-1"
                  >
                    <img src={activeSidePanel.asset} alt={activeSidePanel.title} className="w-full h-full object-contain filter brightness-95 group-hover/sideimg:scale-[1.01] transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/sideimg:opacity-100 transition-opacity flex items-center justify-center font-mono text-[8px] text-cyan-400 font-bold tracking-widest uppercase">[ EXPLODE_VIEWPORT ]</div>
                  </div>
                )}

                {/* Primary Panel Meta Data Dictionary Block List */}
                <div className="space-y-5 text-xs">
                  <div>
                    <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mb-1">// SYSTEM_CREDENTIAL_TITLE</div>
                    <div className="text-sm font-bold text-white leading-snug">{activeSidePanel.title}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-3">
                    <div>
                      <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mb-1">// VALIDATING_AUTHORITY</div>
                      <div className="font-semibold text-slate-300 tracking-tight leading-tight">{activeSidePanel.org}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mb-1">// TIMELINE_STAMP</div>
                      <div className="font-mono text-cyan-400 font-bold">{activeSidePanel.year}</div>
                    </div>
                  </div>

                  <div>
                    <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mb-1">// CORE_SYNOPSIS_LOG</div>
                    <p className="text-gray-400 leading-relaxed font-sans text-justify">{activeSidePanel.description}</p>
                  </div>

                  <div>
                    <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mb-2">// TECHNICAL_SKILLS_ACQUIRED</div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeSidePanel.skills.map(skill => (
                        <span key={skill} className="font-mono text-[9px] text-cyan-400/90 border border-cyan-500/10 bg-cyan-950/20 px-2.5 py-0.5 rounded tracking-wide">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Fixed HUD Anchor Registry line panel */}
              <div className="border-t border-white/5 pt-4 mt-4 flex items-center justify-between font-mono text-[9px] shrink-0">
                <div className="space-y-0.5">
                  <div className="text-gray-600 uppercase tracking-wider">IDENTIFIER_KEY_HASH:</div>
                  <div className="text-gray-400 font-bold select-text selection:bg-cyan-500 selection:text-black">{activeSidePanel.credentialId}</div>
                </div>
                <div className="flex items-center gap-1 bg-emerald-500/5 border border-emerald-500/20 px-2 py-0.5 rounded shrink-0">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-[8px] font-bold tracking-widest">[ SECURE ]</span>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}