/**
 * Hero.jsx — UPGRADED v2
 * Matches target reference: glassmorphism floating panels, waveform simulation,
 * verilog code panel, workflow timeline, silicon metrics, all overlaid on the 3D scene.
 *
 * DROP-IN REPLACEMENT for src/sections/Hero.jsx
 * No other file changes needed.
 */

import { motion, AnimatePresence } from "framer-motion";
import { Suspense, useEffect, useState, useRef } from "react";
import Button from "../components/ui/Button";
import SiliconScene from "../components/3d/SiliconScene";
import profileImg from "../assets/images/profile.jpg";

/* ═══════════════════════════════════════════════════════
   SHARED GLASS PANEL WRAPPER
═══════════════════════════════════════════════════════ */
function GlassPanel({
  children,
  style = {},
  accentColor = "#00f5ff",
  title,
  className = "",
  titleRight,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        background: "rgba(5, 10, 24, 0.72)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${accentColor}28`,
        borderRadius: "10px",
        boxShadow: `0 0 24px ${accentColor}10, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${accentColor}18`,
        overflow: "hidden",
        ...style,
      }}
      className={className}
    >
      {title && (
        <div
          style={{
            borderBottom: `1px solid ${accentColor}18`,
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: accentColor,
              letterSpacing: "0.22em",
              fontWeight: 600,
            }}
          >
            {title}
          </span>
          {titleRight && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "8px",
                color: `${accentColor}88`,
                letterSpacing: "0.15em",
              }}
            >
              {titleRight}
            </span>
          )}
        </div>
      )}
      <div style={{ padding: "10px 12px" }}>{children}</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   RTL CORE PANEL — top-center above the chip
═══════════════════════════════════════════════════════ */
function RTLCorePanel() {
  const [statusBlink, setStatusBlink] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setStatusBlink((b) => !b), 800);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.7 }}
      style={{
        position: "absolute",
        top: "6%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "200px",
        zIndex: 8,
      }}
    >
      <GlassPanel accentColor="#00f5ff" title="RTL CORE" titleRight={
        <span style={{ color: statusBlink ? "#22c55e" : "#22c55e80", transition: "color 0.3s" }}>●</span>
      }>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(148,163,184,0.5)", letterSpacing: "0.15em" }}>STATUS</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#22c55e", fontWeight: 700, letterSpacing: "0.1em" }}>ACTIVE</span>
          </div>
          <div style={{ height: "1px", background: "rgba(0,245,255,0.08)" }} />
          <div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(148,163,184,0.5)", letterSpacing: "0.15em" }}>FLOW</span>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#00f5ff", marginTop: "3px", letterSpacing: "0.05em" }}>
              RTL → SYNTHESIS → FPGA
            </p>
          </div>
          {/* Signal line animation */}
          <div style={{ marginTop: "4px", height: "2px", borderRadius: "1px", overflow: "hidden", background: "rgba(0,245,255,0.1)" }}>
            <motion.div
              style={{ height: "100%", background: "linear-gradient(to right, transparent, #00f5ff, transparent)", width: "40%" }}
              animate={{ x: ["-100%", "300%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   VERILOG ENGINE PANEL — left-center
═══════════════════════════════════════════════════════ */
function VerilogEnginePanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.7 }}
      style={{
        position: "absolute",
        top: "22%",
        left: "22%",
        width: "175px",
        zIndex: 8,
      }}
    >
      <GlassPanel accentColor="#3b82f6" title="VERILOG ENGINE" titleRight="</>">
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {["· SYSTEMVERILOG", "· RTL DESIGN", "· FSM", "· PIPELINING"].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.12 }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                color: "rgba(148,163,184,0.75)",
                letterSpacing: "0.06em",
              }}
            >
              {item}
            </motion.div>
          ))}
          {/* Mini block diagram */}
          <div style={{ marginTop: "6px", display: "flex", alignItems: "center", gap: "3px" }}>
            {["D", "→", "D", "→", "D", "→", "D"].map((s, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: s === "→" ? "10px" : "8px",
                  color: s === "→" ? "#3b82f680" : "#3b82f6",
                  background: s !== "→" ? "rgba(59,130,246,0.1)" : "transparent",
                  border: s !== "→" ? "1px solid rgba(59,130,246,0.25)" : "none",
                  padding: s !== "→" ? "1px 4px" : "0",
                  borderRadius: "2px",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   FPGA TARGET PANEL — right-center-upper
═══════════════════════════════════════════════════════ */
function FPGATargetPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7, duration: 0.7 }}
      style={{
        position: "absolute",
        top: "18%",
        right: "22%",
        width: "168px",
        zIndex: 8,
      }}
    >
      <GlassPanel accentColor="#7c3aed" title="FPGA TARGET" titleRight="✦">
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#7c3aed", fontWeight: 700, letterSpacing: "0.08em" }}>
              XILINX ARTIX-7
            </span>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#22c55e", letterSpacing: "0.12em", fontWeight: 600 }}>
            IMPLEMENTED
          </span>
          {/* Blinking LUT grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "2px", marginTop: "4px" }}>
            {Array.from({ length: 15 }).map((_, i) => (
              <FPGATile key={i} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}

function FPGATile({ delay }) {
  const [active, setActive] = useState(Math.random() > 0.4);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => Math.random() > 0.35 ? !a : a), 900 + Math.random() * 700);
    return () => clearInterval(t);
  }, []);
  return (
    <motion.div
      style={{
        width: "100%",
        paddingBottom: "100%",
        borderRadius: "2px",
        background: active ? "rgba(124,58,237,0.6)" : "rgba(124,58,237,0.08)",
        border: `1px solid ${active ? "rgba(124,58,237,0.5)" : "rgba(124,58,237,0.12)"}`,
        boxShadow: active ? "0 0 4px rgba(124,58,237,0.6)" : "none",
        transition: "all 0.4s ease",
      }}
      animate={{ opacity: active ? 1 : 0.4 }}
      transition={{ duration: 0.4 }}
    />
  );
}

/* ═══════════════════════════════════════════════════════
   AI MAC ACCELERATOR PANEL — right side
═══════════════════════════════════════════════════════ */
function AIMACPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.9, duration: 0.7 }}
      style={{
        position: "absolute",
        top: "38%",
        right: "18%",
        width: "192px",
        zIndex: 8,
      }}
    >
      <GlassPanel accentColor="#f59e0b" title="AI MAC ACCELERATOR">
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {["• NEURAL COMPUTE", "• LOW POWER", "• SPARSE DATA PATH"].map((item, i) => (
            <div key={item} style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "rgba(148,163,184,0.75)", letterSpacing: "0.06em" }}>
              {item}
            </div>
          ))}
          {/* Neural network mini graphic */}
          <div style={{ marginTop: "6px", position: "relative", height: "50px" }}>
            <NeuralNetMini />
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}

function NeuralNetMini() {
  const nodes = [
    { x: 10, y: 15 }, { x: 10, y: 35 },
    { x: 40, y: 8 }, { x: 40, y: 25 }, { x: 40, y: 42 },
    { x: 70, y: 15 }, { x: 70, y: 35 },
    { x: 100, y: 25 },
  ];
  const edges = [
    [0,2],[0,3],[0,4],[1,2],[1,3],[1,4],
    [2,5],[2,6],[3,5],[3,6],[4,5],[4,6],
    [5,7],[6,7],
  ];
  return (
    <svg width="110" height="50" style={{ overflow: "visible" }}>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="rgba(245,158,11,0.25)" strokeWidth="0.8"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x} cy={n.y} r="3.5"
          fill="rgba(245,158,11,0.15)"
          stroke="#f59e0b"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   LOW POWER DESIGN PANEL — left lower
═══════════════════════════════════════════════════════ */
function LowPowerPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.0, duration: 0.7 }}
      style={{
        position: "absolute",
        top: "44%",
        left: "19%",
        width: "175px",
        zIndex: 8,
      }}
    >
      <GlassPanel accentColor="#22c55e" title="LOW POWER DESIGN">
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {[
            { label: "· OPTIMIZED",      color: "#f59e0b" },
            { label: "· LOW SWITCHING",  color: "#22c55e" },
            { label: "· ACTIVITY AWARE", color: "#00f5ff" },
          ].map((item) => (
            <div key={item.label} style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: item.color, letterSpacing: "0.06em" }}>
              {item.label}
            </div>
          ))}
          {/* Bar chart */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "24px", marginTop: "6px" }}>
            {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.45, 0.65].map((h, i) => (
              <PowerBar key={i} height={h} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}

function PowerBar({ height, delay }) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: [height, height * 0.7, height, height * 1.1, height] }}
      transition={{ delay, duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      style={{
        flex: 1,
        height: "100%",
        background: "linear-gradient(to top, #22c55e, #22c55e60)",
        borderRadius: "1px",
        transformOrigin: "bottom",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════
   SILICON METRICS PANEL — bottom-center
═══════════════════════════════════════════════════════ */
function SiliconMetricsPanel() {
  const metrics = [
    { label: "CLOCK",      value: "100 MHz",  color: "#00f5ff", icon: "⌇" },
    { label: "POWER",      value: "OPTIMIZED",color: "#22c55e", icon: "⚡" },
    { label: "AREA",       value: "EFFICIENT",color: "#f59e0b", icon: "◫" },
    { label: "THROUGHPUT", value: "HIGH",     color: "#a78bfa", icon: "↗" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.7 }}
      style={{
        position: "absolute",
        bottom: "22%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "340px",
        zIndex: 8,
      }}
    >
      <GlassPanel accentColor="#00f5ff" title="SILICON METRICS" titleRight="×">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
          {metrics.map((m) => (
            <div key={m.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(148,163,184,0.45)", letterSpacing: "0.12em", marginBottom: "4px" }}>
                {m.label}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: m.color, fontWeight: 700, letterSpacing: "0.05em" }}>
                {m.value}
              </div>
              <div style={{ fontSize: "13px", color: m.color, marginTop: "3px", opacity: 0.7 }}>{m.icon}</div>
            </div>
          ))}
        </div>
        {/* Animated waveform */}
        <div style={{ marginTop: "6px", height: "1px", background: "rgba(0,245,255,0.08)" }} />
        <div style={{ marginTop: "6px" }}>
          <WaveformLine color="#00f5ff" />
        </div>
      </GlassPanel>
    </motion.div>
  );
}

function WaveformLine({ color = "#00f5ff" }) {
  const points = "0,10 12,10 12,2 20,2 20,18 28,18 28,10 40,10 40,2 48,2 48,18 56,18 56,10 68,10 68,2 76,2 76,18 84,18 84,10 100,10";
  return (
    <svg width="100%" height="20" viewBox="0 0 100 20" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        opacity="0.6"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   RTL SIMULATION PANEL — right lower
═══════════════════════════════════════════════════════ */
function RTLSimPanel() {
  const signals = [
    { name: "CLK",   color: "#00f5ff", pattern: [1,0,1,0,1,0,1,0,1,0,1,0] },
    { name: "DATA",  color: "#22c55e", pattern: [0,0,1,1,0,1,1,0,0,1,0,0] },
    { name: "OUT",   color: "#f59e0b", pattern: [0,0,0,1,1,0,0,1,1,0,1,0] },
    { name: "VALID", color: "#a78bfa", pattern: [0,0,0,0,1,1,0,0,0,1,1,0] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.7 }}
      style={{
        position: "absolute",
        top: "56%",
        right: "16%",
        width: "200px",
        zIndex: 8,
      }}
    >
      <GlassPanel accentColor="#22c55e" title="RTL SIMULATION">
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {signals.map((sig) => (
            <div key={sig.name} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "7px", color: "rgba(148,163,184,0.5)", width: "28px", letterSpacing: "0.1em", flexShrink: 0 }}>
                {sig.name}
              </span>
              <WaveformSignal pattern={sig.pattern} color={sig.color} />
            </div>
          ))}
        </div>
      </GlassPanel>
    </motion.div>
  );
}

function WaveformSignal({ pattern, color }) {
  const w = 140, h = 12;
  const step = w / pattern.length;
  let d = `M 0 ${pattern[0] === 1 ? 2 : h - 2}`;
  pattern.forEach((v, i) => {
    const x = i * step;
    const y = v === 1 ? 2 : h - 2;
    if (i > 0 && pattern[i] !== pattern[i-1]) {
      d += ` L ${x} ${pattern[i-1] === 1 ? 2 : h - 2}`;
      d += ` L ${x} ${y}`;
    }
    d += ` L ${x + step} ${y}`;
  });
  return (
    <svg width={w} height={h} style={{ flexShrink: 0 }}>
      <path d={d} fill="none" stroke={color} strokeWidth="1.2" opacity="0.8" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   VERILOG CODE PANEL — top-right corner
═══════════════════════════════════════════════════════ */
function VerilogCodePanel() {
  const code = [
    { t: "keyword", s: "module " }, { t: "name", s: "mac_unit" }, { t: "plain", s: " (" },
    { t: "plain", s: "  input " }, { t: "type", s: "clk" }, { t: "plain", s: "," },
    { t: "plain", s: "  input " }, { t: "type", s: "rst_n" }, { t: "plain", s: "," },
    { t: "plain", s: "  input [7:0] " }, { t: "name", s: "a" }, { t: "plain", s: "," },
    { t: "plain", s: "  input [7:0] " }, { t: "name", s: "b" }, { t: "plain", s: "," },
    { t: "plain", s: "  output reg [15:0] " }, { t: "name", s: "p" },
    { t: "plain", s: ");" },
    { t: "plain", s: "" },
    { t: "keyword", s: "always_ff" }, { t: "plain", s: " @(posedge clk)" },
    { t: "plain", s: "  if(!rst_n)" },
    { t: "plain", s: "    p <= 16'd0;" },
    { t: "keyword", s: "  else" },
    { t: "plain", s: "    p <= a * b;" },
    { t: "plain", s: "" },
    { t: "keyword", s: "endmodule" },
  ];

  const colorMap = { keyword: "#7c3aed", name: "#00f5ff", type: "#f59e0b", plain: "rgba(148,163,184,0.7)" };

  // Group into lines
  const lines = [];
  let current = [];
  code.forEach((token) => {
    if (token.t === "plain" && token.s === "") {
      if (current.length) lines.push(current);
      lines.push([]);
      current = [];
    } else if (token.t === "plain" && (token.s.startsWith("  ") || token.s.startsWith("    "))) {
      lines.push(current);
      current = [token];
    } else {
      current.push(token);
    }
  });
  if (current.length) lines.push(current);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      style={{
        position: "absolute",
        top: "6%",
        right: "3%",
        width: "196px",
        zIndex: 8,
      }}
    >
      <GlassPanel accentColor="#7c3aed" title="VERILOG CODE" titleRight="×">
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5px" }}>
          {[
            "module mac_unit (",
            "  input clk,",
            "  input rst_n,",
            "  input [7:0] a,",
            "  input [7:0] b,",
            "  output reg [15:0] p",
            ");",
            "",
            "always_ff @(posedge clk) begin",
            "  if(!rst_n)",
            "    p <= 16'd0;",
            "  else",
            "    p <= a * b;",
            "end",
            "",
            "endmodule",
          ].map((line, i) => (
            <div key={i} style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "7px", color: "rgba(148,163,184,0.2)", width: "10px", textAlign: "right", flexShrink: 0 }}>
                {line === "" ? "" : i + 1}
              </span>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "8px",
                color: line.startsWith("module") || line.startsWith("always") || line.startsWith("end") || line.trim() === "if(!rst_n)" || line.trim() === "else"
                  ? "#a78bfa"
                  : line.includes("clk") || line.includes("rst_n") || line.includes("] a") || line.includes("] b") || line.includes("] p")
                  ? "#00f5ff"
                  : "rgba(148,163,184,0.7)",
                letterSpacing: "0.01em",
                whiteSpace: "pre",
              }}>
                {line || " "}
              </span>
            </div>
          ))}
        </div>
      </GlassPanel>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   SILICON LAB TERMINAL — bottom-right
═══════════════════════════════════════════════════════ */
const TERMINAL_LINES = [
  { text: "> Initializing silicon_engine", color: "rgba(148,163,184,0.6)", delay: 1.4 },
  { text: "> RTL check passed",            color: "#22c55e",              delay: 2.0 },
  { text: "> Synthesis successful",        color: "#00f5ff",              delay: 2.6 },
  { text: "> FPGA ready",                  color: "#f59e0b",              delay: 3.2 },
  { text: "> System online ■",             color: "#22c55e",              delay: 3.8 },
];

function SiliconLabTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay * 1000);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.3, duration: 0.6 }}
      style={{
        position: "absolute",
        bottom: "14%",
        right: "2%",
        width: "216px",
        zIndex: 8,
      }}
    >
      <GlassPanel accentColor="#22c55e" title="SILICON LAB TERMINAL">
        <div>
          <div style={{ display: "flex", gap: "4px", marginBottom: "8px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444" }} />
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f59e0b" }} />
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "8px",
                  color: line.color,
                  letterSpacing: "0.05em",
                }}
              >
                {line.text}
              </motion.span>
            ))}
          </div>
          {/* Interact hint */}
          <div style={{ marginTop: "10px", paddingTop: "6px", borderTop: "1px solid rgba(34,197,94,0.1)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "7px", color: "rgba(148,163,184,0.3)", letterSpacing: "0.2em" }}>
              INTERACT
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginTop: "4px" }}>
              {["⊕ Drag to Rotate", "⊙ Scroll to Zoom", "☆ Hover Modules"].map((hint) => (
                <span key={hint} style={{ fontFamily: "var(--font-mono)", fontSize: "7px", color: "rgba(148,163,184,0.35)", letterSpacing: "0.05em" }}>
                  {hint}
                </span>
              ))}
            </div>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   WORKFLOW TIMELINE — bottom horizontal strip
═══════════════════════════════════════════════════════ */
const WORKFLOW_STEPS = [
  { id: "SPEC",  label: "SPECIFICATION",    icon: "⊞", color: "#00f5ff",  delay: 0 },
  { id: "RTL",   label: "RTL DESIGN",       icon: "⊕", color: "#3b82f6",  delay: 0.15 },
  { id: "SIM",   label: "SIMULATION",       icon: "⊡", color: "#7c3aed",  delay: 0.3 },
  { id: "SYN",   label: "SYNTHESIS",        icon: "⚙", color: "#f59e0b",  delay: 0.45 },
  { id: "FPGA",  label: "FPGA\nIMPLEMENTATION", icon: "⊗", color: "#f59e0b", delay: 0.6 },
  { id: "SI",    label: "SILICON\nREADY",   icon: "✓", color: "#22c55e",  delay: 0.75, final: true },
];

function WorkflowTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveStep((s) => (s + 1) % WORKFLOW_STEPS.length), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      style={{
        position: "absolute",
        bottom: "4%",
        left: "50%",
        transform: "translateX(-30%)",
        zIndex: 8,
        display: "flex",
        alignItems: "center",
        gap: "0px",
      }}
    >
      {WORKFLOW_STEPS.map((step, i) => (
        <div key={step.id} style={{ display: "flex", alignItems: "center" }}>
          {/* Step box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 + step.delay }}
            style={{
              background: step.final
                ? `rgba(34,197,94,0.15)`
                : `rgba(5,10,24,0.8)`,
              backdropFilter: "blur(12px)",
              border: `1px solid ${i <= activeStep ? step.color + "60" : step.color + "20"}`,
              borderRadius: "8px",
              padding: "10px 14px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
              minWidth: "80px",
              boxShadow: i === activeStep ? `0 0 16px ${step.color}30` : "none",
              transition: "all 0.4s ease",
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                background: i <= activeStep ? `${step.color}20` : "rgba(255,255,255,0.03)",
                border: `1px solid ${i <= activeStep ? step.color + "40" : "rgba(255,255,255,0.06)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                color: i <= activeStep ? step.color : "rgba(148,163,184,0.3)",
                transition: "all 0.4s ease",
              }}
            >
              {step.icon}
            </div>
            {/* Label */}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "7px",
                color: i <= activeStep ? step.color : "rgba(148,163,184,0.35)",
                letterSpacing: "0.12em",
                textAlign: "center",
                lineHeight: 1.4,
                whiteSpace: "pre-line",
                fontWeight: i === activeStep ? 700 : 400,
                transition: "color 0.4s ease",
              }}
            >
              {step.label}
            </span>
          </motion.div>

          {/* Arrow connector */}
          {i < WORKFLOW_STEPS.length - 1 && (
            <div style={{ display: "flex", alignItems: "center", padding: "0 3px" }}>
              {/* Signal dot */}
              <motion.div
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: i < activeStep ? WORKFLOW_STEPS[i].color : "rgba(255,255,255,0.12)",
                  boxShadow: i < activeStep ? `0 0 6px ${WORKFLOW_STEPS[i].color}` : "none",
                  transition: "all 0.4s ease",
                }}
              />
              <div
                style={{
                  width: "16px",
                  height: "1px",
                  background: i < activeStep
                    ? `linear-gradient(to right, ${WORKFLOW_STEPS[i].color}60, ${WORKFLOW_STEPS[i+1].color}60)`
                    : "rgba(255,255,255,0.08)",
                  transition: "background 0.4s ease",
                }}
              />
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "9px" }}>→</span>
              <div
                style={{
                  width: "16px",
                  height: "1px",
                  background: i < activeStep
                    ? `linear-gradient(to right, ${WORKFLOW_STEPS[i+1].color}60, transparent)`
                    : "rgba(255,255,255,0.08)",
                  transition: "background 0.4s ease",
                }}
              />
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   RIGHT SIDE DASHBOARD PANELS (compact, existing style)
═══════════════════════════════════════════════════════ */
const FLOW_STEPS = [
  { id: "SPEC",  label: "SPECIFICATION",  color: "#00f5ff" },
  { id: "RTL",   label: "RTL DESIGN",     color: "#3b82f6" },
  { id: "SIM",   label: "SIMULATION",     color: "#7c3aed" },
  { id: "SYN",   label: "SYNTHESIS",      color: "#f59e0b" },
  { id: "FPGA",  label: "FPGA IMPLEMENT", color: "#f59e0b" },
  { id: "SI",    label: "SILICON READY",  color: "#22c55e" },
];

function HardwareFlowPipeline() {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveStep((s) => (s + 1) % FLOW_STEPS.length), 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.7 }}
      style={{
        background: "rgba(0,245,255,0.025)",
        border: "1px solid rgba(0,245,255,0.12)",
        borderRadius: "8px",
        padding: "14px 16px",
        minWidth: "160px",
      }}
    >
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(0,245,255,0.5)", letterSpacing: "0.3em", marginBottom: "12px" }}>
        // HW_FLOW_PIPELINE
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
        {FLOW_STEPS.map((step, i) => (
          <div key={step.id} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "7px", height: "7px", borderRadius: "50%",
                border: `1px solid ${step.color}`,
                background: activeStep === i ? step.color : "transparent",
                boxShadow: activeStep === i ? `0 0 8px ${step.color}` : "none",
                transition: "all 0.4s ease",
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "9px",
                color: activeStep === i ? step.color : "rgba(148,163,184,0.5)",
                letterSpacing: "0.1em",
                transition: "color 0.4s ease",
                fontWeight: activeStep === i ? 700 : 400,
              }}>
                {step.label}
              </span>
            </div>
            {i < FLOW_STEPS.length - 1 && (
              <div style={{
                width: "1px", height: "10px", marginLeft: "3px",
                background: i < activeStep ? step.color : "rgba(255,255,255,0.08)",
                transition: "background 0.4s ease",
              }} />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ChipSpecPanel() {
  const specs = [
    { label: "ARCHITECTURE", value: "Neural MAC",       color: "#00f5ff" },
    { label: "TARGET",       value: "FPGA · RTL",       color: "#3b82f6" },
    { label: "OPTIMIZATION", value: "Power Efficient",  color: "#f59e0b" },
    { label: "DESIGN",       value: "RTL Based",        color: "#7c3aed" },
    { label: "CLOCK",        value: "100 MHz",          color: "#22c55e" },
    { label: "STAGE",        value: "4-Stage Pipeline", color: "#00f5ff" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.7 }}
      style={{ background: "rgba(245,158,11,0.025)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: "8px", padding: "14px 16px" }}
    >
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(245,158,11,0.5)", letterSpacing: "0.3em", marginBottom: "12px" }}>
        // CHIP_SPEC_PANEL
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {specs.map((s) => (
          <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "5px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(148,163,184,0.4)", letterSpacing: "0.15em" }}>{s.label}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: s.color, letterSpacing: "0.05em" }}>{s.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ResearchBadge() {
  const badges = [
    { text: "Hardware Acceleration", color: "#00f5ff" },
    { text: "Low Power Design",      color: "#3b82f6" },
    { text: "AI Silicon",            color: "#7c3aed" },
    { text: "Edge Inference",        color: "#f59e0b" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.7 }}
      style={{ background: "rgba(124,58,237,0.03)", border: "1px solid rgba(124,58,237,0.18)", borderRadius: "8px", padding: "14px 16px" }}
    >
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(124,58,237,0.6)", letterSpacing: "0.3em", marginBottom: "10px" }}>
        // RESEARCH_MODE
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {badges.map((b) => (
          <div key={b.text} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: b.color, fontSize: "9px" }}>✓</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "rgba(148,163,184,0.7)", letterSpacing: "0.08em" }}>{b.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const MINI_TERMINAL_LINES = [
  { text: "> loading silicon_engine",  color: "rgba(148,163,184,0.6)", delay: 1.4 },
  { text: "> rtl_check........passed", color: "#22c55e",               delay: 1.9 },
  { text: "> fpga_ready",              color: "#00f5ff",               delay: 2.4 },
  { text: "> synthesis_ok",            color: "#f59e0b",               delay: 2.9 },
  { text: "> system_online ■",         color: "#22c55e",               delay: 3.4 },
];

function MiniTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  useEffect(() => {
    MINI_TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay * 1000);
    });
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.3, duration: 0.5 }}
      style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(0,245,255,0.08)", borderRadius: "8px", padding: "12px 14px" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "8px" }}>
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444" }} />
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f59e0b" }} />
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "7px", color: "rgba(148,163,184,0.3)", marginLeft: "6px", letterSpacing: "0.2em" }}>
          SILICON_TERMINAL
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
        {MINI_TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
            style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: line.color, letterSpacing: "0.06em" }}>
            {line.text}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

function SignalFlowDot({ style: customStyle, color = "#00f5ff", delay = 0 }) {
  return (
    <motion.div
      style={{ width: "4px", height: "4px", borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}`, position: "absolute", ...customStyle }}
      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
      transition={{ duration: 1.8, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function SiliconLabDashboard() {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ right: "3%", top: "50%", transform: "translateY(-46%)", zIndex: 6, display: "flex", flexDirection: "column", gap: "10px", width: "220px" }}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(34,197,94,0.5)", letterSpacing: "0.3em" }}>
          RTL_STATUS · ACTIVE
        </span>
      </motion.div>
      <HardwareFlowPipeline />
      <ChipSpecPanel />
      <ResearchBadge />
      <MiniTerminal />
      <SignalFlowDot style={{ top: "22%", right: "-12px" }} color="#00f5ff" delay={0.5} />
      <SignalFlowDot style={{ top: "48%", right: "-12px" }} color="#f59e0b" delay={1.1} />
      <SignalFlowDot style={{ top: "68%", right: "-12px" }} color="#7c3aed" delay={0.8} />
      <SignalFlowDot style={{ top: "36%", left: "-12px" }} color="#22c55e" delay={1.5} />
      <SignalFlowDot style={{ top: "58%", left: "-12px" }} color="#00f5ff" delay={0.3} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FLOATING BG LABELS
═══════════════════════════════════════════════════════ */
const BG_LABELS = [
  { text: "RTL_CORE",       top: "14%", right: "52%", delay: 0 },
  { text: "FPGA_ARRAY",     top: "30%", right: "44%", delay: 1.2 },
  { text: "CLOCK_DOMAIN",   top: "68%", right: "48%", delay: 0.9 },
  { text: "SYNTHESIS_PASS", top: "80%", right: "38%", delay: 1.8 },
];

function FloatingBgLabels() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {BG_LABELS.map((l, i) => (
        <span key={i} className="absolute select-none label-drift"
          style={{ top: l.top, right: l.right, fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", color: "#00f5ff", animationDelay: `${l.delay}s`, opacity: 0.04 }}>
          {l.text}
        </span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CINEMATIC HEADLINE
═══════════════════════════════════════════════════════ */
const HEADLINE = [
  { text: "Designing",       className: "text-white" },
  { text: "Intelligent",     className: "gradient-text" },
  { text: "Silicon Systems", className: "text-white" },
];

function CinematicHeadline() {
  return (
    <h1 className="leading-[1.08] tracking-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.6rem, 5vw, 4rem)", fontWeight: 700 }}>
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
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">

      {/* 3D Scene background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Suspense fallback={null}>
          <SiliconScene />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/75 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Floating bg tech labels */}
      <FloatingBgLabels />

      {/* ── GLASSMORPHISM FLOATING PANELS ── */}
      {/* These panels are pointer-events-none to keep 3D scene interactive */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 7 }}>
        <RTLCorePanel />
        <VerilogEnginePanel />
        <FPGATargetPanel />
        <AIMACPanel />
        <LowPowerPanel />
        <SiliconMetricsPanel />
        <RTLSimPanel />
        <VerilogCodePanel />
        <SiliconLabTerminal />
        <WorkflowTimeline />
      </div>

      {/* Silicon Lab Dashboard — compact right side panels */}
      <SiliconLabDashboard />

      {/* ── Profile photo — top-center ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{ top: "64px", zIndex: 10 }}
      >
        <div className="relative">
          <div
            className="absolute -inset-[3px] rounded-full"
            style={{ background: "conic-gradient(from 0deg, #00f5ff, #3b82f6, #7c3aed, #f59e0b, #00f5ff)", animation: "ringRotate 4s linear infinite" }}
          />
          <div className="absolute -inset-3 rounded-full bg-cyan-400/12 blur-lg" />
          <div className="relative w-[170px] h-[170px] rounded-full overflow-hidden border-[3px] border-[#050816]">
            <img src={profileImg} alt="Anandha Krishnan P" className="w-full h-full object-cover object-top scale-110" />
          </div>
        </div>
        <div className="mt-3 text-center">
          <p className="text-white font-semibold text-[13px] tracking-wide" style={{ fontFamily: "var(--font-display)" }}>
            Anandha Krishnan P
          </p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-glow" />
            <span className="text-[9px] text-cyan-400 tracking-[0.22em]" style={{ fontFamily: "var(--font-mono)" }}>
              ECE · MAHENDRA ENGINEERING COLLEGE · 2028
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── Left content column ── */}
      <div
        className="relative flex flex-col"
        style={{ zIndex: 5, paddingTop: "310px", paddingBottom: "64px", paddingLeft: "52px", paddingRight: "52px", maxWidth: "580px" }}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="h-px w-40 bg-gradient-to-r from-cyan-400/60 to-transparent origin-left mb-5"
        />

        <div className="mb-5">
          <CinematicHeadline />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="text-gray-400 leading-[1.85] mb-5"
          style={{ fontFamily: "var(--font-body)", fontSize: "13.5px", paddingLeft: "6px", maxWidth: "400px" }}
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
          style={{ paddingLeft: "6px" }}
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
          style={{ paddingLeft: "6px" }}
        >
          <Button variant="primary" href="#projects" className="rounded-[4px]! px-[10px]! py-[4px]! text-[12px]!">
            View Projects
          </Button>
          <Button variant="outline" href="#contact" className="rounded-[4px]! px-[10px]! py-[4px]! text-[12px]!">
            Contact Me
          </Button>
          <a
            href="/Resume-Anandha_Krishnan.pdf"
            download
            className="inline-flex items-center gap-2 px-[18px] py-[6px] font-semibold text-amber-400 border border-amber-400/30 hover:bg-amber-400/8 hover:border-amber-400/60 transition-all duration-300"
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
          style={{ paddingLeft: "6px" }}
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