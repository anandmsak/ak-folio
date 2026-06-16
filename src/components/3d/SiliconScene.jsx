/**
 * SiliconScene.jsx — UPGRADED v2
 * Adds: ground disc / platform, stronger ambient lighting,
 * better camera angle to match target reference.
 *
 * DROP-IN REPLACEMENT for src/components/3d/SiliconScene.jsx
 */

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls, Environment, Sparkles, Stars, Float, Text,
} from "@react-three/drei";
import { Suspense, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import ChipModel from "./ChipModel";
import {
  OrbitalPath, PlanetNode, DataStream, GlowLine,
} from "./OrbitSystem";

/* ══════════════════════════════════════════
   SCENE LIGHTS — enhanced for target match
══════════════════════════════════════════ */
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      {/* Top cyan key light */}
      <pointLight position={[0, 8, 0]}   color="#00f5ff" intensity={6}  distance={22} />
      {/* Purple fill */}
      <pointLight position={[-7, 4, -5]} color="#7c3aed" intensity={4}  distance={18} />
      {/* Amber accent */}
      <pointLight position={[7, 2, -5]}  color="#f59e0b" intensity={4}  distance={18} />
      {/* Green floor bounce */}
      <pointLight position={[0, -5, 3]}  color="#22c55e" intensity={2.5} distance={14} />
      {/* Blue front fill */}
      <pointLight position={[0, 1, 8]}   color="#3b82f6" intensity={2}  distance={14} />
      <spotLight
        position={[0, 12, 2]}
        angle={0.3}
        penumbra={0.9}
        intensity={5}
        color="#00f5ff"
        castShadow
      />
    </>
  );
}

/* ══════════════════════════════════════════
   GROUND DISC — flat reflective platform
══════════════════════════════════════════ */
function GroundDisc() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.opacity = 0.25 + Math.sin(clock.elapsedTime * 0.5) * 0.05;
    }
  });
  return (
    <group position={[0, -2.4, 0]}>
      {/* Main disc */}
      <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[5.5, 80]} />
        <meshStandardMaterial
          color="#020c1f"
          metalness={0.9}
          roughness={0.05}
          transparent
          opacity={0.3}
        />
      </mesh>
      {/* Outer glow ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.8, 5.5, 80]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={0.4}
          transparent
          opacity={0.15}
          metalness={1}
        />
      </mesh>
      {/* Middle ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.0, 3.15, 80]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.5}
          transparent
          opacity={0.12}
          metalness={1}
        />
      </mesh>
      {/* Inner ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.6, 1.72, 80]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.6}
          transparent
          opacity={0.1}
          metalness={1}
        />
      </mesh>
    </group>
  );
}

/* ══════════════════════════════════════════
   FLOATING LABEL — billboard text tag
══════════════════════════════════════════ */
function PlanetLabel({ title, sub, color }) {
  return (
    <group position={[0, 0.38, 0]}>
      <Text
        fontSize={0.09}
        color={color}
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.004}
        outlineColor="#000000"
      >
        {title}
      </Text>
      {sub && (
        <Text
          position={[0, -0.12, 0]}
          fontSize={0.065}
          color={color}
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.003}
          outlineColor="#000000"
          fillOpacity={0.7}
        >
          {sub}
        </Text>
      )}
    </group>
  );
}

/* ══════════════════════════════════════════
   ANIMATED WAVEFORM RING
══════════════════════════════════════════ */
function WaveRing({ color = "#00f5ff" }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 2;
      ref.current.material.opacity = 0.4 + Math.sin(clock.elapsedTime * 3) * 0.3;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[0.35, 0.012, 8, 40]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} transparent opacity={0.5} />
    </mesh>
  );
}

function NeuralMini({ color = "#f59e0b" }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 1.5;
  });
  const nodes = [[-0.18, 0.1, 0], [-0.18, -0.1, 0], [0, 0.15, 0], [0, 0, 0], [0, -0.15, 0], [0.18, 0.05, 0], [0.18, -0.05, 0]];
  return (
    <group ref={ref} position={[0, 0.05, 0]}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.028, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
        </mesh>
      ))}
    </group>
  );
}

function FPGAGrid({ color = "#7c3aed" }) {
  const refs = useRef([]);
  useFrame(({ clock }) => {
    refs.current.forEach((m, i) => {
      if (m) m.material.emissiveIntensity = 0.2 + Math.abs(Math.sin(clock.elapsedTime * 1.2 + i * 0.7)) * 1.2;
    });
  });
  const tiles = Array.from({ length: 9 }, (_, i) => [((i % 3) - 1) * 0.13, (Math.floor(i / 3) - 1) * 0.13, 0]);
  return (
    <group position={[0, 0.05, 0]}>
      {tiles.map((pos, i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)} position={pos}>
          <boxGeometry args={[0.09, 0.09, 0.03]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

function VerilogCrystal({ color = "#3b82f6" }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 1.8;
      ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.9) * 0.4;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0.05, 0]}>
      <octahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} metalness={0.6} roughness={0.05} transparent opacity={0.85} />
    </mesh>
  );
}

function PowerOrb({ color = "#22c55e" }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 2.5) * 0.18;
      ref.current.scale.setScalar(s);
      ref.current.material.emissiveIntensity = 0.8 + Math.sin(clock.elapsedTime * 2.5) * 0.6;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0.05, 0]}>
      <dodecahedronGeometry args={[0.16, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.0} metalness={0.4} roughness={0.2} />
    </mesh>
  );
}

function RTLCapsule({ color = "#00f5ff" }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.8;
  });
  return (
    <group ref={ref} position={[0, 0.05, 0]}>
      <mesh>
        <cylinderGeometry args={[0.14, 0.14, 0.3, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} metalness={0.7} roughness={0.1} transparent opacity={0.75} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.1, 0.018, 8, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

/* ══════════════════════════════════════════
   METRIC RING
══════════════════════════════════════════ */
function MetricRing() {
  const labels = [
    { text: "100 MHz",  color: "#00f5ff", angle: 0 },
    { text: "LOW PWR",  color: "#22c55e", angle: Math.PI / 2 },
    { text: "EFFICIENT",color: "#f59e0b", angle: Math.PI },
    { text: "HIGH ↑",   color: "#a78bfa", angle: (3 * Math.PI) / 2 },
  ];
  const groupRef = useRef();
  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.elapsedTime * 0.08;
  });
  return (
    <group ref={groupRef} position={[0, -2.2, 0]}>
      <mesh>
        <torusGeometry args={[2.0, 0.025, 8, 100]} />
        <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={0.4} transparent opacity={0.35} metalness={1} />
      </mesh>
      {labels.map((l, i) => (
        <Text key={i} position={[Math.cos(l.angle) * 2.0, 0.12, Math.sin(l.angle) * 2.0]}
          fontSize={0.12} color={l.color} anchorX="center" anchorY="bottom" outlineWidth={0.005} outlineColor="#000">
          {l.text}
        </Text>
      ))}
    </group>
  );
}

/* ══════════════════════════════════════════
   ORBIT SYSTEM
══════════════════════════════════════════ */
function OrbitalSystem() {
  const planets = [
    { id: "rtl",    label: "RTL CORE",       sub: "ACTIVE",       color: "#00f5ff", orbitRadius: 2.6, orbitSpeed: 0.28, orbitTilt: 0.22,  orbitPhase: 0,              size: 0.21, child: RTLCapsule },
    { id: "verilog",label: "VERILOG ENGINE", sub: "SYSTEMVERILOG",color: "#3b82f6", orbitRadius: 2.8, orbitSpeed: 0.19, orbitTilt: -0.35, orbitPhase: Math.PI * 0.65, size: 0.19, child: VerilogCrystal },
    { id: "fpga",   label: "FPGA TARGET",    sub: "XILINX ARTIX-7",color:"#7c3aed", orbitRadius: 2.5, orbitSpeed: 0.23, orbitTilt: 0.5,   orbitPhase: Math.PI * 1.3,  size: 0.2,  child: FPGAGrid },
    { id: "aimac",  label: "AI MAC",         sub: "SPARSE COMPUTE",color:"#f59e0b", orbitRadius: 3.0, orbitSpeed: 0.16, orbitTilt: -0.18, orbitPhase: Math.PI * 1.9,  size: 0.22, child: NeuralMini },
    { id: "power",  label: "LOW POWER",      sub: "OPTIMIZED",    color: "#22c55e", orbitRadius: 2.7, orbitSpeed: 0.21, orbitTilt: 0.65,  orbitPhase: Math.PI * 0.35, size: 0.18, child: PowerOrb },
  ];

  const posMap = useRef({ rtl: [2.6,0,0], verilog: [-1.8,0,2], fpga: [1.5,0,-2], aimac: [-2.8,0,-1], power: [2,0,1.8] });
  const updatePos = useCallback((id) => (pos) => { posMap.current[id] = pos; }, []);
  const chipCenter = [0, 0.1, 0];

  return (
    <group>
      <OrbitalPath radius={2.6} tilt={0.22}  color="#00f5ff" opacity={0.18} />
      <OrbitalPath radius={2.8} tilt={-0.35} color="#3b82f6" opacity={0.15} />
      <OrbitalPath radius={2.5} tilt={0.5}   color="#7c3aed" opacity={0.16} />
      <OrbitalPath radius={3.0} tilt={-0.18} color="#f59e0b" opacity={0.15} />
      <OrbitalPath radius={2.7} tilt={0.65}  color="#22c55e" opacity={0.15} />

      {planets.map((p) => {
        const ChildComp = p.child;
        return (
          <PlanetNode key={p.id} {...p} onPositionUpdate={updatePos(p.id)}>
            <WaveRing color={p.color} />
            <ChildComp color={p.color} />
            <PlanetLabel title={p.label} sub={p.sub} color={p.color} />
          </PlanetNode>
        );
      })}

      {[
        { start: chipCenter, end: [2.6, 0.3, 0],   color: "#00f5ff", speed: 1.2, delay: 0 },
        { start: chipCenter, end: [-1.8, 0.2, 2],   color: "#3b82f6", speed: 0.9, delay: 0.4 },
        { start: chipCenter, end: [1.5, -0.2, -2],  color: "#7c3aed", speed: 1.1, delay: 0.7 },
        { start: chipCenter, end: [-2.8, 0.1, -1],  color: "#f59e0b", speed: 0.8, delay: 1.0 },
        { start: chipCenter, end: [2.0, 0.3, 1.8],  color: "#22c55e", speed: 1.0, delay: 1.4 },
        { start: [2.6, 0.3, 0],   end: chipCenter, color: "#00f5ff", speed: 1.0, delay: 0.6 },
        { start: [-1.8, 0.2, 2],  end: chipCenter, color: "#3b82f6", speed: 0.85, delay: 1.2 },
        { start: [1.5, -0.2, -2], end: chipCenter, color: "#7c3aed", speed: 0.95, delay: 0.2 },
        { start: [-2.8, 0.1, -1], end: chipCenter, color: "#f59e0b", speed: 0.75, delay: 1.8 },
        { start: [2.0, 0.3, 1.8], end: chipCenter, color: "#22c55e", speed: 0.9,  delay: 0.9 },
      ].map((stream, i) => (
        <DataStream key={i} {...stream} />
      ))}

      {[
        { start: [0,0.1,0], end: [2.6, 0.3, 0],   color: "#00f5ff" },
        { start: [0,0.1,0], end: [-1.8, 0.2, 2],   color: "#3b82f6" },
        { start: [0,0.1,0], end: [1.5, -0.2, -2],  color: "#7c3aed" },
        { start: [0,0.1,0], end: [-2.8, 0.1, -1],  color: "#f59e0b" },
        { start: [0,0.1,0], end: [2.0, 0.3, 1.8],  color: "#22c55e" },
      ].map((line, i) => (
        <GlowLine key={i} {...line} opacity={0.22} />
      ))}

      <MetricRing />
    </group>
  );
}

/* ══════════════════════════════════════════
   CAMERA — slight mouse parallax
══════════════════════════════════════════ */
function CameraController() {
  useFrame(({ camera, pointer }) => {
    camera.position.x += (pointer.x * 1.2 - camera.position.x) * 0.025;
    camera.position.y += (pointer.y * 0.6 + 2.0 - camera.position.y) * 0.025;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ══════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════ */
export default function SiliconScene() {
  return (
    <Canvas
      camera={{ position: [0, 3.5, 9], fov: 42 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
      shadows
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <SceneLights />
        <Environment preset="night" />

        {/* Stars */}
        <Stars radius={90} depth={45} count={2500} factor={3.5} saturation={0} fade />

        {/* Sparkles */}
        <Sparkles count={70}  scale={14} size={1.4} speed={0.22} color="#00f5ff" opacity={0.4} />
        <Sparkles count={40}  scale={9}  size={1.0} speed={0.14} color="#f59e0b" opacity={0.3} />
        <Sparkles count={30}  scale={7}  size={0.9} speed={0.16} color="#7c3aed" opacity={0.25} />

        {/* Ground disc platform */}
        <GroundDisc />

        {/* Central chip — the SUN */}
        <Float speed={1.0} rotationIntensity={0.1} floatIntensity={0.5}>
          <ChipModel />
        </Float>

        {/* Orbital solar system */}
        <OrbitalSystem />

        {/* Mouse parallax camera */}
        <CameraController />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.35}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 3.5}
          enableDamping
          dampingFactor={0.05}
        />
      </Suspense>
    </Canvas>
  );
}