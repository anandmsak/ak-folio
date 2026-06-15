import { motion } from "framer-motion";
import { Suspense } from "react";
import Button from "../components/ui/Button";
import SiliconScene from "../components/3d/SiliconScene";
import profileImg from "../assets/images/profile.jpg";

/* ── Floating background tech labels ── */
const BG_LABELS = [
  { text: "RTL_CORE",          top: "12%",  right: "18%", delay: 0 },
  { text: "FPGA_ARRAY",        top: "28%",  right: "8%",  delay: 1.2 },
  { text: "AI_ACCELERATOR",    top: "44%",  right: "22%", delay: 0.6 },
  { text: "VERILOG",           top: "60%",  right: "12%", delay: 2.0 },
  { text: "CLOCK_DOMAIN",      top: "72%",  right: "28%", delay: 0.9 },
  { text: "MAC_UNIT",          top: "20%",  right: "38%", delay: 1.6 },
  { text: "PIPELINE_STAGE",    top: "52%",  right: "40%", delay: 0.3 },
  { text: "SYNTHESIS_PASS",    top: "80%",  right: "6%",  delay: 1.8 },
  { text: "EDGE_AI",           top: "36%",  right: "52%", delay: 2.4 },
];

function FloatingBgLabels() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {BG_LABELS.map((l, i) => (
        <span
          key={i}
          className="absolute font-mono text-[11px] text-cyan-400 select-none label-drift"
          style={{
            top: l.top,
            right: l.right,
            letterSpacing: "0.18em",
            animationDelay: `${l.delay}s`,
            opacity: 0.05,
          }}
        >
          {l.text}
        </span>
      ))}
    </div>
  );
}

/* ── RTL Waveform SVG — right side panel ── */
function RTLWaveform() {
  // Generate clock + data signals as SVG paths
  const W = 420;
  const H = 280;

  // Clock signal (square wave)
  const clockPath = (() => {
    const step = 42;
    let d = `M 0 30`;
    for (let i = 0; i < 10; i++) {
      const x = i * step;
      d += ` L ${x} ${i % 2 === 0 ? 10 : 50} L ${x + step} ${i % 2 === 0 ? 10 : 50}`;
    }
    return d;
  })();

  // Data bus signal (semi-random transitions)
  const dataTransitions = [0, 63, 84, 126, 168, 189, 252, 294, 336, 378, 420];
  const dataPath = (() => {
    let d = `M 0 80`;
    dataTransitions.forEach((x, i) => {
      const y = i % 3 === 0 ? 65 : i % 3 === 1 ? 95 : 80;
      d += ` L ${x} ${y}`;
    });
    return d;
  })();

  // Enable signal
  const enablePath = "M 0 130 L 84 130 L 84 110 L 252 110 L 252 130 L 420 130";

  // Output signal
  const outputTransitions = [0, 126, 168, 210, 294, 336, 420];
  const outputPath = (() => {
    let d = `M 0 175`;
    outputTransitions.forEach((x, i) => {
      const y = i % 2 === 0 ? 155 : 195;
      d += ` L ${x} ${y}`;
    });
    return d;
  })();

  const signals = [
    { label: "CLK",    path: clockPath,  color: "#00f5ff", y: 0 },
    { label: "DATA",   path: dataPath,   color: "#f59e0b", y: 55 },
    { label: "EN",     path: enablePath, color: "#7c3aed", y: 105 },
    { label: "OUT",    path: outputPath, color: "#22c55e", y: 150 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.9, duration: 0.9, ease: "easeOut" }}
      className="absolute waveform-pulse"
      style={{
        right: "4%",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      {/* Panel header */}
      <div
        className="mb-2 flex items-center gap-2"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <span className="text-[9px] text-cyan-400/50 tracking-[0.3em] uppercase">
          // RTL_WAVEFORM_VIEWER
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/40 pulse-glow" />
      </div>

      <svg
        width={W}
        height={H}
        style={{
          background: "rgba(0,245,255,0.018)",
          border: "1px solid rgba(0,245,255,0.1)",
          borderRadius: "8px",
          padding: "12px",
        }}
      >
        {/* Grid lines */}
        {[0, 84, 168, 252, 336, 420].map((x) => (
          <line
            key={x}
            x1={x + 12} y1={8} x2={x + 12} y2={H - 12}
            stroke="rgba(0,245,255,0.06)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
        ))}

        {/* Signals */}
        {signals.map((sig, i) => (
          <g key={sig.label} transform={`translate(36, ${20 + i * 60})`}>
            {/* Signal label */}
            <text
              x={-32} y={20}
              fill={sig.color}
              fontSize="9"
              fontFamily="var(--font-mono)"
              opacity="0.7"
              dominantBaseline="middle"
            >
              {sig.label}
            </text>

            {/* Signal path */}
            <motion.path
              d={sig.path}
              fill="none"
              stroke={sig.color}
              strokeWidth="1.5"
              opacity="0.8"
              strokeLinecap="square"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 2.5, delay: 1.2 + i * 0.3, ease: "easeInOut" }}
            />

            {/* Glow duplicate */}
            <motion.path
              d={sig.path}
              fill="none"
              stroke={sig.color}
              strokeWidth="4"
              opacity="0.08"
              strokeLinecap="square"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, delay: 1.2 + i * 0.3, ease: "easeInOut" }}
            />
          </g>
        ))}

        {/* Cycle markers */}
        {["T0", "T1", "T2", "T3", "T4"].map((t, i) => (
          <text
            key={t}
            x={48 + i * 84} y={H - 6}
            fill="rgba(0,245,255,0.3)"
            fontSize="8"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
          >
            {t}
          </text>
        ))}

        {/* Active cursor line */}
        <motion.line
          x1={160} y1={8} x2={160} y2={H - 16}
          stroke="#f59e0b"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.4"
          animate={{ x1: [160, 280, 160], x2: [160, 280, 160] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Footer status */}
      <div
        className="mt-1.5 flex items-center justify-between"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <span className="text-[8px] text-gray-600 tracking-widest">
          SIMULATION_MODE // ACTIVE
        </span>
        <span className="text-[8px] text-cyan-400/30 tracking-widest">
          125 MHz · 4-STAGE · RTL
        </span>
      </div>
    </motion.div>
  );
}

/* ── Headline word-by-word cinematic reveal ── */
const HEADLINE = [
  { text: "Designing",        className: "text-white" },
  { text: "Intelligent",      className: "gradient-text" },
  { text: "Silicon Systems",  className: "text-white" },
];

function CinematicHeadline() {
  return (
    <h1
      className="leading-[1.08] tracking-tight"
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(2.6rem, 5vw, 4rem)",
        fontWeight: 700,
      }}
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

/* ── Main Hero ── */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* 3D Scene */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Suspense fallback={null}>
          <SiliconScene />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/85 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Floating bg tech labels */}
      <FloatingBgLabels />

      {/* RTL Waveform — right panel */}
      <RTLWaveform />

      {/* ── Profile photo — top-center, absolute ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{ top: "64px", zIndex: 10 }}
      >
        <div className="relative">
          {/* Spinning ring */}
          <div
            className="absolute -inset-[3px] rounded-full"
            style={{
              background: "conic-gradient(from 0deg, #00f5ff, #3b82f6, #7c3aed, #f59e0b, #00f5ff)",
              animation: "ringRotate 4s linear infinite",
            }}
          />
          {/* Glow */}
          <div className="absolute -inset-3 rounded-full bg-cyan-400/12 blur-lg" />
          {/* Photo */}
          <div className="relative w-[170px] h-[170px] rounded-full overflow-hidden border-[3px] border-[#050816]">
            <img
              src={profileImg}
              alt="Anandha Krishnan P"
              className="w-full h-full object-cover object-top scale-110"
            />
          </div>
        </div>

        {/* Name + tag */}
        <div className="mt-3 text-center">
          <p
            className="text-white font-semibold text-[13px] tracking-wide"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Anandha Krishnan P
          </p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-glow" />
            <span
              className="text-[9px] text-cyan-400 tracking-[0.22em]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ECE · MAHENDRA ENGINEERING COLLEGE · 2028
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── Left content column ── */}
      <div
        className="relative flex flex-col"
        style={{ zIndex: 5, paddingTop: "310px", paddingBottom: "64px", paddingLeft: "52px", paddingRight: "52px", maxWidth: "600px" }}
      >

        {/* Thin left accent divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="h-px w-40 bg-gradient-to-r from-cyan-400/60 to-transparent origin-left mb-5"
        />

        {/* Headline */}
        <div className="mb-5">
          <CinematicHeadline />
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="text-gray-400 text-[13.5px] leading-[1.85] max-w-[420px] mb-5"
          style={{ fontFamily: "var(--font-body)", paddingLeft: "6px" }}
        >
          Electronics and Communication Engineering student building efficient
          digital systems, hardware architectures, and intelligent embedded
          solutions at the frontier of semiconductor technology.
        </motion.p>

        {/* Specialization tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="flex flex-wrap gap-2 mb-5"
          style={{ paddingLeft: "6px" }}
        >
          {["VLSI Design", "RTL Engineering", "FPGA", "Embedded Systems", "AI Hardware"].map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-gray-400 border border-white/10 hover:border-amber-400/50 hover:text-amber-400 transition-all duration-300 cursor-default"
              style={{
                fontFamily: "var(--font-mono)",
                padding: "4px 10px",
                borderRadius: "4px",
                letterSpacing: "0.08em",
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap gap-3 mb-6"
          style={{ paddingLeft: "6px" }}
        >
          <Button 
          variant="primary" 
          href="#projects" 
          className="rounded-[4px]! px-[10px]! py-[4px]! text-[12px]!"
          >
            View Projects
          </Button>
          <Button 
            variant="outline" 
            href="#contact" 
            className="rounded-[4px]! px-[10px]! py-[4px]! text-[12px]!"
          >
            Contact Me
          </Button>
          <a
            href="/Resume-Anandha_Krishnan.pdf"
            download
            className="inline-flex items-center gap-2 px-[18px] py-[6px] font-semibold text-amber-400 border border-amber-400/30 hover:bg-amber-400/8 hover:border-amber-400/60 transition-all duration-300"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              borderRadius: "4px",
            }}
          >
            Resume ↓
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex gap-8 pt-4 border-t border-white/8"
          style={{ paddingLeft: "6px" }}
        >
          {[
            { value: "7+", label: "Projects" },
            { value: "6+", label: "Certifications" },
            { value: "3+", label: "Awards" },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                className="gradient-text leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                }}
              >
                {stat.value}
              </p>
              <p
                className="text-gray-500 mt-1.5 tracking-widest uppercase"
                style={{ fontFamily: "var(--font-mono)", fontSize: "9px" }}
              >
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
        <span
          className="text-gray-600 tracking-[0.4em]"
          style={{ fontFamily: "var(--font-mono)", fontSize: "8px" }}
        >
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