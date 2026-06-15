import { motion } from "framer-motion";
import Reveal from "../components/animations/Reveal";
import SectionTitle from "../components/ui/SectionTitle";
import profileImg from "../assets/images/profile.jpg";

const focusAreas = [
  {
    icon: "◈",
    title: "VLSI & RTL Design",
    desc: "RTL architectures, Verilog-based hardware, FPGA prototyping, and low-power digital systems.",
    color: "#00f5ff",
  },
  {
    icon: "◉",
    title: "Embedded Intelligence",
    desc: "Sensors, microcontrollers, and intelligent algorithms fused into real-world embedded and IoT platforms.",
    color: "#f59e0b",
  },
  {
    icon: "◆",
    title: "AI Hardware",
    desc: "Efficient neural processing pipelines for edge devices — from computer vision to AI accelerator design.",
    color: "#7c3aed",
  },
];

const researchTags = [
  "VLSI Architecture",
  "RTL Optimization",
  "FPGA Acceleration",
  "AI Accelerator Design",
  "Edge AI Systems",
  "Embedded Intelligence",
  "Computer Vision",
  "IoT Security",
];

export default function About() {
  return (
    <section
      id="about"
      style={{ padding: "6rem 0", maxWidth: "1280px", margin: "0 auto", paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
    >
      <SectionTitle
        label="Profile"
        title="About Me"
        subtitle="ECE student building at the intersection of silicon design, embedded computing, and artificial intelligence."
      />

      <div className="grid lg:grid-cols-12 gap-10 items-start">

        {/* ── LEFT: Professional ID Card (4 cols) ── */}
        <div className="lg:col-span-4">
          <Reveal direction="left">
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 30px 80px rgba(0,245,255,0.1)" }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(155deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 0 60px rgba(0,245,255,0.05), 0 24px 64px rgba(0,0,0,0.5)",
              }}
            >
              {/* ── Photo area — TALL, photo fills from bottom ── */}
              <div
                className="relative overflow-hidden"
                style={{
                  height: "320px",
                  background: "linear-gradient(175deg, #0c1a35 0%, #050816 100%)",
                }}
              >
                {/* Grid overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Top glow */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 blur-3xl"
                  style={{ background: "radial-gradient(ellipse, rgba(0,245,255,0.12) 0%, transparent 70%)" }}
                />

                {/* Availability badge */}
                <div
                  className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md z-20"
                  style={{
                    background: "rgba(34,197,94,0.08)",
                    border: "1px solid rgba(34,197,94,0.25)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-glow" />
                  <span className="text-[10px] font-mono text-green-400 tracking-wide">Available</span>
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-5 h-5 border-l border-t border-cyan-400/40" />
                <div className="absolute bottom-0 right-4 w-5 h-5 border-r border-b border-amber-400/30" />

                {/* Photo — emerges from bottom, tall and fitted */}
                <div className="absolute inset-x-0 bottom-0 flex justify-center items-end z-10">
                  <div
                    style={{
                      width: "200px",
                      height: "260px",
                      borderRadius: "16px 16px 0 0",
                      overflow: "hidden",
                      border: "1px solid rgba(0,245,255,0.18)",
                      borderBottom: "none",
                      boxShadow: "0 -12px 50px rgba(0,245,255,0.12), 0 -4px 20px rgba(0,0,0,0.6)",
                    }}
                  >
                    <img
                      src={profileImg}
                      alt="Anandha Krishnan P"
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Bottom blend */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-12"
                      style={{ background: "linear-gradient(to top, rgba(5,8,22,0.5), transparent)" }}
                    />
                  </div>
                </div>
              </div>

              {/* ── Info area ── */}
              <div className="px-6 py-5">
                {/* Name + role */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3
                      className="text-white font-bold text-[15px] tracking-wide mb-0.5"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Anandha Krishnan P
                    </h3>
                    <p className="font-mono text-[10px] text-cyan-400 tracking-[0.2em]">
                      VLSI · RTL · EMBEDDED · AI HW
                    </p>
                  </div>
                  {/* ID chip decoration */}
                  <div
                    className="w-9 h-6 rounded flex items-center justify-center flex-shrink-0"
                    style={{ border: "1px solid rgba(245,158,11,0.3)" }}
                  >
                    <div
                      className="w-5 h-3.5 rounded-sm"
                      style={{
                        border: "1px solid rgba(245,158,11,0.5)",
                        background: "rgba(245,158,11,0.05)",
                      }}
                    />
                  </div>
                </div>

                {/* Info rows */}
                <div className="space-y-0 mb-5">
                  {[
                    { label: "Institution", value: "Mahendra Engineering College" },
                    { label: "Degree",      value: "B.E. Electronics & Communication" },
                    { label: "Batch",       value: "2024 – 2028" },
                    { label: "Location",    value: "Namakkal, Tamil Nadu" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between items-center py-2.5"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                    >
                      <span className="font-mono text-[9px] text-gray-600 tracking-[0.2em] uppercase flex-shrink-0 mr-3">
                        {row.label}
                      </span>
                      <span className="text-[11px] text-gray-300 text-right leading-tight">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Social links */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "LinkedIn", href: "https://www.linkedin.com/in/anandha-krishnan-vlsi", color: "#00f5ff" },
                    { label: "GitHub",   href: "https://github.com/anandmsak",                       color: "#f59e0b" },
                    { label: "Email",    href: "mailto:anandhperumal27@gmail.com",                   color: "#94a3b8" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-center py-2 rounded-lg text-[11px] font-mono transition-all duration-300 hover:-translate-y-0.5"
                      style={{
                        color: link.color,
                        border: `1px solid ${link.color}22`,
                        background: `${link.color}05`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${link.color}12`;
                        e.currentTarget.style.borderColor = `${link.color}44`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `${link.color}05`;
                        e.currentTarget.style.borderColor = `${link.color}22`;
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>

        {/* ── RIGHT: Bio + Focus + Research (8 cols) ── */}
        <div className="lg:col-span-8 flex flex-col gap-7">

          {/* Bio paragraphs */}
          <Reveal>
            <div
              className="space-y-4 text-gray-400 leading-[1.95]"
              style={{ fontSize: "14.5px" }}
            >
              <p>
                I am an Electronics and Communication Engineering student
                specializing in{" "}
                <span className="text-cyan-400 font-medium">VLSI Design</span>,
                RTL Architecture, FPGA Systems, Embedded Technologies, and AI
                Hardware. My core interest lies in designing the hardware
                foundation behind modern intelligent systems.
              </p>
              <p>
                From digital circuits and processors to AI accelerators and edge
                computing platforms, I work across the full hardware stack —
                developing expertise in{" "}
                <span className="text-cyan-400 font-medium">RTL design</span>,
                Verilog-based hardware development, FPGA implementation, and
                low-power hardware optimization.
              </p>
              <p>
                My long-term goal is to become a{" "}
                <span className="text-amber-400 font-semibold">
                  VLSI / RTL Design Engineer
                </span>{" "}
                contributing to next-generation semiconductor and AI hardware
                systems that power the future of computing.
              </p>
            </div>
          </Reveal>

          {/* Focus area cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {focusAreas.map((area, i) => (
              <Reveal key={area.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: `0 12px 40px ${area.color}15` }}
                  className="rounded-xl p-5 h-full transition-all duration-300 cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${area.color}1a`,
                  }}
                >
                  <span
                    className="text-2xl block mb-3"
                    style={{ color: area.color }}
                  >
                    {area.icon}
                  </span>
                  <h4
                    className="text-[12px] font-bold font-mono mb-2"
                    style={{ color: area.color }}
                  >
                    {area.title}
                  </h4>
                  <p className="text-gray-500 text-[11px] leading-relaxed">
                    {area.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Research interests */}
          <Reveal delay={0.2}>
            <div
              className="rounded-xl p-5"
              style={{
                background: "rgba(0,245,255,0.02)",
                border: "1px solid rgba(0,245,255,0.09)",
              }}
            >
              <p className="font-mono text-[9px] text-gray-600 tracking-[0.35em] uppercase mb-3">
                // Research Interests
              </p>
              <div className="flex flex-wrap gap-2">
                {researchTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-3 py-1.5 rounded-full text-cyan-400 font-mono cursor-default transition-all duration-300 hover:bg-cyan-400/10"
                    style={{ border: "1px solid rgba(0,245,255,0.14)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Email footer row */}
          <Reveal delay={0.3}>
            <div
              className="flex items-center gap-4 pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <span className="font-mono text-[9px] text-gray-600 tracking-[0.3em] uppercase">
                Direct Contact
              </span>
              <a
                href="mailto:anandhperumal27@gmail.com"
                className="font-mono text-[12px] text-gray-400 hover:text-cyan-400 transition-colors duration-200"
              >
                anandhperumal27@gmail.com
              </a>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}