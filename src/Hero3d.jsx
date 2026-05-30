import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

/* ─── NEON PARTICLES ─── */
function NeonParticles() {
  const ref = useRef();
  const { mouse } = useThree();

  const data = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 8;
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      base[i3] = x;
      base[i3 + 1] = y;
      base[i3 + 2] = z;
    }

    return { positions, base, count };
  }, []);

  useFrame(() => {
    const pos = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < data.count; i++) {
      const i3 = i * 3;
      let x = pos[i3];
      let y = pos[i3 + 1];
      let z = pos[i3 + 2];
      const bx = data.base[i3];
      const by = data.base[i3 + 1];
      const bz = data.base[i3 + 2];

      const dx = x - mouse.x * 3;
      const dy = y - mouse.y * 3;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const force = Math.max(0, 1.5 - dist) * 0.03;

      x -= dx * force;
      y -= dy * force;
      x += (bx - x) * 0.02;
      y += (by - y) * 0.02;
      z += (bz - z) * 0.02;
      x += Math.sin(Date.now() * 0.0005 + i) * 0.0005;
      y += Math.cos(Date.now() * 0.0005 + i) * 0.0005;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={data.positions}
          count={data.count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        color="#39ff88"
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#39ff88" />
      <pointLight position={[-5, -5, -5]} intensity={0.6} color="#00ff9c" />
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
        <Lights />
        <NeonParticles />
      </Canvas>
    </div>
  );
}