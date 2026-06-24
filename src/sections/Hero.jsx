/**
 * Hero.jsx
 * Cleaned version: Removed floating widgets and orbit timeline tracks.
 * Keeps the clean layout with the interactive 3D <SiliconScene /> as a full background view.
 */

import { motion } from "framer-motion";
import { Suspense } from "react";
import Button from "../components/ui/Button";
import SiliconScene from "../components/3d/SiliconScene";
import profileImg from "../assets/images/profile.jpg";
import resumeFile from "../assets/Resume-Anandha_Krishnan.pdf";

/* ═══════════════════════════════════════════════════════
   CINEMATIC HEADLINE
═══════════════════════════════════════════════════════ */
const HEADLINE = [
  { text: "Designing", className: "text-white" },
  { text: "Intelligent", className: "gradient-text" },
  { text: "Silicon Systems", className: "text-white" },
];

function CinematicHeadline() {
  return (
    <h1
      className="leading-[1.08] tracking-tight"
      style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.6rem, 5vw, 4rem)", fontWeight: 700 }}
    >
      {HEADLINE.map((line, i) => (
        <motion.span
          key={line.text}
          className={`block ${line.className}`}
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.38 + i * 0.18, duration: 0.65, ease: "easeOut" }}
        >
          {line.text}
        </motion.span>
      ))}
    </h1>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN HERO EXPORT
═══════════════════════════════════════════════════════ */
export default function Hero() {
  return (
    <section id="hero" className="relative h-screen max-h-screen flex flex-col overflow-hidden bg-black text-white">
      {/* 3D Scene — central interactive focal point acting as full viewport background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Suspense fallback={null}>
          <SiliconScene />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
      </div>

      {/* ── Profile photo — top-left ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative flex items-center gap-0"
        style={{ zIndex: 10, paddingTop: "48px", paddingLeft: "52px" }}
      >
        <div className="relative">
          <div
            className="absolute -inset-[3px] rounded-full"
            style={{
              background: "conic-gradient(from 0deg, #00f5ff, #3b82f6, #7c3aed, #f59e0b, #00f5ff)",
              animation: "ringRotate 4s linear infinite",
            }}
          />
          <div className="absolute -inset-3 rounded-full bg-cyan-400/12 blur-lg" />
          <div className="relative w-[112px] h-[112px] rounded-full overflow-hidden border-[3px] border-black">
            <img src={profileImg} alt="Anandha Krishnan P" className="w-full h-full object-cover object-top scale-110" />
          </div>
        </div>
      </motion.div>

      {/* ── Left content column ── */}
      <div
        className="relative flex flex-col"
        style={{ zIndex: 5, paddingTop: "24px", paddingBottom: "64px", paddingLeft: "52px", paddingRight: "52px", maxWidth: "580px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className="text-white font-semibold text-[15px] tracking-wide" style={{ fontFamily: "var(--font-display)" }}>
            Anandha Krishnan P
          </p>
          <div className="inline-flex items-center gap-2 mt-2 px-2.5 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-glow" />
            <span className="text-[9px] text-cyan-400 tracking-[0.22em]" style={{ fontFamily: "var(--font-mono)" }}>
              ECE · MAHENDRA ENGINEERING COLLEGE · 2028
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="h-px w-40 bg-gradient-to-r from-cyan-400/60 to-transparent origin-left mt-5 mb-5"
        />

        <div className="mb-5">
          <CinematicHeadline />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="text-gray-400 leading-[1.85] mb-5"
          style={{ fontFamily: "var(--font-body)", fontSize: "13.5px", maxWidth: "400px" }}
        >
          Electronics and Communication Engineering student building efficient
          digital systems, hardware architectures, and intelligent embedded
          solutions at the frontier of semiconductor technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="flex flex-wrap gap-2 mb-5"
        >
          {["VLSI Design", "RTL Engineering", "FPGA", "Embedded Systems", "AI Hardware"].map((tag) => (
            <span
              key={tag}
              className="text-gray-400 border border-white/10 hover:border-amber-400/50 hover:text-amber-400 transition-all duration-300 cursor-default"
              style={{ fontFamily: "var(--font-mono)", fontSize: "10px", padding: "4px 10px", borderRadius: "4px", letterSpacing: "0.08em" }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap gap-3 mb-6"
        >
          <Button variant="primary" href="#projects" className="rounded-[4px]! px-[18px]! py-[8px]! text-[12px]!">
            View Projects →
          </Button>
          <Button variant="outline" href="#contact" className="rounded-[4px]! px-[18px]! py-[8px]! text-[12px]!">
            Contact Me
          </Button>
          <a
            href={resumeFile}
            download
            className="inline-flex items-center gap-2 px-[18px] py-[8px] font-semibold text-amber-400 border border-amber-400/30 hover:bg-amber-400/8 hover:border-amber-400/60 transition-all duration-300"
            style={{ fontFamily: "var(--font-mono)", fontSize: "12px", borderRadius: "4px" }}
          >
            Resume ↓
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex gap-8 pt-4 border-t border-white/8"
        >
          {[
            { value: "7+", label: "Projects" },
            { value: "6+", label: "Certifications" },
            { value: "3+", label: "Awards" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="gradient-text leading-none" style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700 }}>
                {stat.value}
              </p>
              <p className="text-gray-500 mt-1.5 tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)", fontSize: "9px" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <span className="text-gray-600 tracking-[0.4em]" style={{ fontFamily: "var(--font-mono)", fontSize: "8px" }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-7 bg-gradient-to-b from-cyan-400/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}