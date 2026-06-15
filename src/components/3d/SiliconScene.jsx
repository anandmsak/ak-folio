import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Sparkles, Stars } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import ChipModel from "./ChipModel";


function GLBChip() {
  const { scene } = useGLTF("/models/chip.glb");
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.15;
      ref.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={0.8}
      position={[2.5, 0, 0]}
    />
  );
}

function OrbitalRing({ radius, speed, color, tilt = 0 }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.elapsedTime * speed;
  });
  return (
    <group rotation={[tilt, 0, 0]}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, 0.006, 8, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.5}
          metalness={1}
          roughness={0}
        />
      </mesh>
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} color="#00f5ff" intensity={4} distance={15} />
      <pointLight position={[-5, 3, -5]} color="#7c3aed" intensity={3} distance={12} />
      <pointLight position={[0, -4, 2]} color="#f59e0b" intensity={2} distance={10} />
      <spotLight
        position={[0, 8, 0]}
        angle={0.4}
        penumbra={0.8}
        intensity={3}
        color="#00f5ff"
        castShadow
      />
    </>
  );
}

export default function SiliconScene() {
  return (
    <Canvas
      camera={{ position: [0, 2.5, 6], fov: 42 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
      shadows
    >
      <Suspense fallback={null}>
        <SceneLights />

        <Environment preset="night" />

        {/* Stars background */}
        <Stars
          radius={80}
          depth={40}
          count={2000}
          factor={3}
          saturation={0}
          fade
        />

        {/* Cyan sparkles */}
        <Sparkles
          count={80}
          scale={10}
          size={1.5}
          speed={0.25}
          color="#00f5ff"
          opacity={0.4}
        />

        {/* Gold sparkles */}
        <Sparkles
          count={40}
          scale={7}
          size={1}
          speed={0.15}
          color="#f59e0b"
          opacity={0.3}
        />

        {/* Orbital rings */}
        <OrbitalRing radius={2.2} speed={0.4} color="#00f5ff" tilt={Math.PI / 6} />
        <OrbitalRing radius={2.8} speed={-0.25} color="#f59e0b" tilt={Math.PI / 3} />
        <OrbitalRing radius={3.4} speed={0.15} color="#7c3aed" tilt={Math.PI / 2.5} />

        {/* Procedural chip — center */}
        <ChipModel />

        {/* Your downloaded GLB chip — offset right */}
        <GLBChip />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/chip.glb");