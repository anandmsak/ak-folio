import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Orbital ring path ─── */
export function OrbitalPath({ radius, tilt = 0, color = "#00f5ff", opacity = 0.18 }) {
  return (
    <group rotation={[tilt, 0, 0]}>
      <mesh>
        <torusGeometry args={[radius, 0.005, 8, 120]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={opacity}
          metalness={1}
          roughness={0}
        />
      </mesh>
    </group>
  );
}

/* ─── Animated data packet along a 3D line ─── */
export function DataStream({ start, end, color = "#00f5ff", speed = 1, delay = 0 }) {
  const ref = useRef();
  const startV = useMemo(() => new THREE.Vector3(...start), [start]);
  const endV   = useMemo(() => new THREE.Vector3(...end),   [end]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = ((clock.elapsedTime * speed * 0.25 + delay) % 1 + 1) % 1;
    ref.current.position.lerpVectors(startV, endV, t);
    ref.current.material.opacity = Math.sin(t * Math.PI) * 0.9;
    ref.current.material.emissiveIntensity = 1.5 + Math.sin(t * Math.PI * 2) * 0.8;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.055, 8, 8]} />
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

/* ─── Glowing line connector ─── */
export function GlowLine({ start, end, color = "#00f5ff", opacity = 0.3 }) {
  const ref = useRef();
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...start),
      new THREE.Vector3(...end),
    ]);
    return g;
  }, [start, end]);

  useFrame(({ clock }) => {
    if (ref.current?.material) {
      ref.current.material.opacity = opacity * (0.6 + Math.sin(clock.elapsedTime * 1.2) * 0.4);
    }
  });

  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={opacity} linewidth={1} />
    </line>
  );
}

/* ─── Planet node — a glowing sphere with inner core ─── */
export function PlanetNode({
  orbitRadius,
  orbitSpeed,
  orbitTilt = 0,
  orbitPhase = 0,
  color,
  size = 0.22,
  children,
  onPositionUpdate,
}) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime * orbitSpeed + orbitPhase;
    const x = Math.cos(t) * orbitRadius;
    const z = Math.sin(t) * orbitRadius;
    const y = Math.sin(t + orbitPhase) * orbitRadius * Math.sin(orbitTilt);
    groupRef.current.position.set(x, y, z);
    if (onPositionUpdate) onPositionUpdate([x, y, z]);
  });

  return (
    <group ref={groupRef}>
      {/* Outer glow shell */}
      <mesh>
        <sphereGeometry args={[size * 1.6, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Main planet body */}
      <mesh>
        <sphereGeometry args={[size, 20, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.15}
        />
      </mesh>
      {/* Bright inner core */}
      <mesh>
        <sphereGeometry args={[size * 0.45, 12, 12]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={color}
          emissiveIntensity={2.5}
          transparent
          opacity={0.85}
        />
      </mesh>
      {children}
    </group>
  );
}