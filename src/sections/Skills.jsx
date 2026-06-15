import { skills } from "../data/skills";
import Reveal from "../components/animations/Reveal";
import GlassCard from "../components/ui/GlassCard";
import SectionTitle from "../components/ui/SectionTitle";
import { motion } from "framer-motion";

const iconMap = {
  chip:  "◈",
  cpu:   "◉",
  brain: "◆",
  code:  "◇",
  tools: "◎",
};

export default function Skills() {
  return (
    <section
      id="skills"
      style={{
        padding: "7rem 2.5rem",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      <SectionTitle
        label="Expertise"
        title="Technical Arsenal"
        subtitle="Core competencies across hardware design, embedded systems, AI development, and engineering tools."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {skills.map((skill, i) => (
          <Reveal key={skill.category} delay={i * 0.08}>
            <motion.div
              whileHover={{
                y: -5,
                boxShadow: `0 20px 50px ${skill.color}12, 0 0 1px ${skill.color}30`,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="h-full rounded-2xl p-5 transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.035)",
                border: `1px solid rgba(255,255,255,0.08)`,
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-5">
                <span style={{ color: skill.color, fontSize: "18px", lineHeight: 1 }}>
                  {iconMap[skill.icon] || "◈"}
                </span>
                <h3
                  className="font-mono font-bold tracking-wide text-[11px] leading-tight"
                  style={{ color: skill.color }}
                >
                  {skill.category}
                </h3>
              </div>

              {/* Skill list */}
              <div className="flex flex-col gap-1.5">
                {skill.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 group"
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-300 group-hover:scale-125"
                      style={{ background: skill.color, opacity: 0.5 }}
                    />
                    <span
                      className="font-mono text-[11px] text-gray-400 group-hover:text-gray-200 transition-colors duration-200"
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom accent */}
              <div
                className="mt-5 h-px w-full rounded"
                style={{
                  background: `linear-gradient(to right, ${skill.color}30, transparent)`,
                }}
              />
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* Tools ribbon */}
      <Reveal delay={0.45}>
        <div
          className="mt-8 rounded-2xl p-5 flex flex-wrap gap-2.5 items-center"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <span className="font-mono text-[10px] text-gray-600 tracking-[0.3em] uppercase mr-2">
            // Dev Environment
          </span>
          {[
            "Xilinx Vivado", "ModelSim", "MATLAB", "LTSpice",
            "VS Code", "Git", "Node-RED", "Arduino IDE",
            "Jupyter", "Streamlit",
          ].map((tool) => (
            <motion.span
              key={tool}
              whileHover={{ borderColor: "rgba(0,245,255,0.4)", color: "#00f5ff" }}
              className="text-[11px] px-3 py-1.5 rounded-full border border-white/8 text-gray-500 font-mono transition-colors duration-300 cursor-default"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}