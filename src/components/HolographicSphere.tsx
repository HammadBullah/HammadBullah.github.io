import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial } from "@react-three/drei";

export const HolographicSphere = () => {
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere args={[1.2, 128, 128]}>
        <MeshDistortMaterial
          color="#4f46e5"
          speed={3}
          distort={0.4}
          radius={1}
          metalness={0.8}
          roughness={0.2}
          emissive="#22d3ee"
          emissiveIntensity={0.5}
        />
      </Sphere>
      {/* Outer Glass Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.01, 16, 100]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>
    </Float>
  );
};
