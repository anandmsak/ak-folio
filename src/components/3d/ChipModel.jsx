import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Single PCB trace line
function Trace({ points, color = "#00f5ff", speed = 1 }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.dashOffset = -clock.elapsedTime * speed * 0.5;
    }
  });
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(
      points.map((p) => new THREE.Vector3(...p))
    );
    return g;
  }, [points]);
  return (
    <line ref={ref} geometry={geometry}>
      <lineDashedMaterial
        color={color}
        dashSize={0.15}
        gapSize={0.1}
        linewidth={1}
        transparent
        opacity={0.6}
      />
    </line>
  );
}

// Glowing via (connection dot)
function Via({ position, color = "#00f5ff" }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.emissiveIntensity =
        0.5 + Math.sin(clock.elapsedTime * 2 + position[0]) * 0.5;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        metalness={1}
        roughness={0}
      />
    </mesh>
  );
}

// Floating data packet moving along a path
function DataPacket({ start, end, color = "#f59e0b", speed = 1 }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = (clock.elapsedTime * speed * 0.3) % 1;
      ref.current.position.lerpVectors(
        new THREE.Vector3(...start),
        new THREE.Vector3(...end),
        t
      );
      ref.current.material.opacity = Math.sin(t * Math.PI);
    }
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        transparent
        opacity={1}
      />
    </mesh>
  );
}

// Orbital ring around chip
function OrbitalRing({ radius, speed, color, tilt = 0 }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.elapsedTime * speed;
    }
  });
  return (
    <group rotation={[tilt, 0, 0]}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, 0.008, 8, 80]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          transparent
          opacity={0.5}
          metalness={1}
          roughness={0}
        />
      </mesh>
    </group>
  );
}

// Procedural premium chip body
function ProceduralChip() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.08;
    }
  });

  const pinPositions = useMemo(() => {
    const pins = [];
    const count = 7;
    const spacing = 0.28;
    const offset = -(count - 1) * spacing * 0.5;
    for (let i = 0; i < count; i++) {
      const pos = offset + i * spacing;
      pins.push(
        { pos: [pos, -0.14, 1.15], axis: "z" },
        { pos: [pos, -0.14, -1.15], axis: "z" },
        { pos: [1.15, -0.14, pos], axis: "x" },
        { pos: [-1.15, -0.14, pos], axis: "x" },
      );
    }
    return pins;
  }, []);

  const circuitLines = useMemo(() => [
    { points: [[-0.8, 0.13, 0], [-0.4, 0.13, 0], [-0.4, 0.13, 0.4], [0.1, 0.13, 0.4]], color: "#00f5ff" },
    { points: [[0.8, 0.13, 0], [0.4, 0.13, 0], [0.4, 0.13, -0.4], [-0.1, 0.13, -0.4]], color: "#00f5ff" },
    { points: [[0, 0.13, 0.8], [0, 0.13, 0.3], [0.3, 0.13, 0.3], [0.3, 0.13, 0]], color: "#f59e0b" },
    { points: [[0, 0.13, -0.8], [0, 0.13, -0.3], [-0.3, 0.13, -0.3], [-0.3, 0.13, 0]], color: "#f59e0b" },
    { points: [[-0.6, 0.13, -0.6], [-0.2, 0.13, -0.6], [-0.2, 0.13, -0.2]], color: "#7c3aed" },
    { points: [[0.6, 0.13, 0.6], [0.2, 0.13, 0.6], [0.2, 0.13, 0.2]], color: "#7c3aed" },
  ], []);

  const vias = [
    [-0.4, 0.13, 0.4], [0.4, 0.13, -0.4],
    [0.3, 0.13, 0.3], [-0.3, 0.13, -0.3],
    [-0.2, 0.13, -0.6], [0.2, 0.13, 0.6],
    [0.1, 0.13, 0.4], [-0.1, 0.13, -0.4],
  ];

  const dataPackets = [
    { start: [-0.8, 0.13, 0], end: [0.1, 0.13, 0.4], color: "#00f5ff", speed: 1.2 },
    { start: [0, 0.13, 0.8], end: [0.3, 0.13, 0], color: "#f59e0b", speed: 0.8 },
    { start: [0.8, 0.13, 0], end: [-0.1, 0.13, -0.4], color: "#00f5ff", speed: 1.5 },
    { start: [0, 0.13, -0.8], end: [-0.3, 0.13, 0], color: "#7c3aed", speed: 1.0 },
  ];

  return (
    <group ref={groupRef}>
      {/* Main chip substrate */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.22, 2.2]} />
        <meshStandardMaterial
          color="#060d1a"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>

      {/* Green PCB base */}
      <mesh position={[0, -0.12, 0]}>
        <boxGeometry args={[2.4, 0.06, 2.4]} />
        <meshStandardMaterial
          color="#0a1f0a"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Die surface layer */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[1.8, 0.015, 1.8]} />
        <meshStandardMaterial
          color="#0d1f3c"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Core processor die */}
      <mesh position={[0, 0.125, 0]}>
        <boxGeometry args={[0.8, 0.02, 0.8]} />
        <meshStandardMaterial
          color="#00f5ff"
          metalness={0.8}
          roughness={0.1}
          emissive="#00f5ff"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Sub-die blocks (cache/IO areas) */}
      {[
        [-0.55, 0.13, -0.55],
        [0.55, 0.13, -0.55],
        [-0.55, 0.13, 0.55],
        [0.55, 0.13, 0.55],
      ].map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.35, 0.015, 0.35]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#7c3aed" : "#f59e0b"}
            metalness={0.9}
            roughness={0.1}
            emissive={i % 2 === 0 ? "#7c3aed" : "#f59e0b"}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}

      {/* Pins */}
      {pinPositions.map((pin, i) => (
        <mesh key={i} position={pin.pos}>
          <boxGeometry
            args={
              pin.axis === "z"
                ? [0.06, 0.08, 0.18]
                : [0.18, 0.08, 0.06]
            }
          />
          <meshStandardMaterial
            color="#c0c0c0"
            metalness={1}
            roughness={0.05}
          />
        </mesh>
      ))}

      {/* Circuit traces */}
      {circuitLines.map((trace, i) => (
        <Trace
          key={i}
          points={trace.points}
          color={trace.color}
          speed={0.8 + i * 0.2}
        />
      ))}

      {/* Vias */}
      {vias.map((pos, i) => (
        <Via
          key={i}
          position={pos}
          color={i % 3 === 0 ? "#f59e0b" : i % 3 === 1 ? "#00f5ff" : "#7c3aed"}
        />
      ))}

      {/* Animated data packets */}
      {dataPackets.map((pkt, i) => (
        <DataPacket key={i} {...pkt} />
      ))}
    </group>
  );
}

export default function ChipModel() {
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.8}>
      <ProceduralChip />
    </Float>
  );
}