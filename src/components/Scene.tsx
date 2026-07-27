import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Stars, Line } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

const MOUSE_SENS = 0.25;

function CameraRig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * MOUSE_SENS - camera.position.x) * 0.05;
    camera.position.y += (-pointer.y * MOUSE_SENS - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Core() {
  const group = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current.rotation.y = t * 0.25;
    group.current.rotation.x = Math.sin(t * 0.4) * 0.08;
    inner.current.rotation.y = -t * 0.6;
    const s = 1 + Math.sin(t * 2) * 0.025;
    inner.current.scale.setScalar(s);
  });
  return (
    <group ref={group}>
      <Sphere ref={inner} args={[0.95, 64, 64]}>
        <MeshDistortMaterial
          color="#00f0ff"
          emissive="#00b8ff"
          emissiveIntensity={1.1}
          metalness={0.95}
          roughness={0.08}
          distort={0.5}
          speed={1.8}
        />
      </Sphere>
      <Torus args={[1.5, 0.006, 16, 140]} rotation={[Math.PI/2,0,0]}>
        <meshBasicMaterial color="#00f0ff" toneMapped={false} />
      </Torus>
      <Torus args={[1.8, 0.005, 16, 140]} rotation={[0.4,0.6,0.2]}>
        <meshBasicMaterial color="#ff2bd6" toneMapped={false} />
      </Torus>
      <Torus args={[2.1, 0.004, 16, 140]} rotation={[-0.3,-0.8,0]}>
        <meshBasicMaterial color="#7b5bff" toneMapped={false} />
      </Torus>
      {Array.from({ length: 10 }).map((_,i)=>{
        const a = (i/10)*Math.PI*2;
        return (
          <Float key={i} speed={2} rotationIntensity={0} floatIntensity={0.5}>
            <mesh position={[Math.cos(a)*1.8, Math.sin(a*0.9)*0.45, Math.sin(a)*1.8]}>
              <sphereGeometry args={[0.055,16,16]}/>
              <meshBasicMaterial color={i%2?"#ff2bd6":"#00f0ff"} toneMapped={false}/>
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function WireShapes() {
  const group = useRef<THREE.Group>(null!);
  const shapes = useMemo(()=>Array.from({length:10},(_,i)=>{
    return {
      type: i % 3, // 0 tetra, 1 octa, 2 icosa
      color: ["#00f0ff","#ff2bd6","#7b5bff","#30ffb4"][i%4],
      pos: [
        (Math.random()-0.5)*14,
        (Math.random()-0.5)*7,
        -3 - Math.random()*6,
      ] as [number,number,number],
      rot: Math.random()*Math.PI,
      sc: 0.35 + Math.random()*0.35,
    };
  }),[]);
  useFrame((_,dt)=>{
    group.current.children.forEach((c,i)=>{
      c.rotation.x += dt*0.3*(i%2?1:-1);
      c.rotation.y += dt*0.25;
    });
  });
  return (
    <group ref={group}>
      {shapes.map((s,i)=>(
        <Float key={i} speed={1.2} floatIntensity={0.6} rotationIntensity={0.4}>
          <mesh position={s.pos} rotation={[s.rot,s.rot,s.rot]} scale={s.sc}>
            {s.type===0 && <tetrahedronGeometry args={[1,0]}/>}
            {s.type===1 && <octahedronGeometry args={[1,0]}/>}
            {s.type===2 && <icosahedronGeometry args={[1,0]}/>}
            <meshStandardMaterial color={s.color} emissive={s.color} emissiveIntensity={0.35} metalness={0.9} roughness={0.25} wireframe/>
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const { positions } = useMemo(()=>{
    const COUNT = 1400;
    const positions = new Float32Array(COUNT*3);
    for (let i=0;i<COUNT;i++){
      positions[i*3]   = (Math.random()-0.5)*22;
      positions[i*3+1] = (Math.random()-0.5)*14;
      positions[i*3+2] = (Math.random()-0.5)*14 - 5;
    }
    return { positions };
  },[]);
  useFrame(({clock})=>{ pointsRef.current.rotation.y = clock.getElapsedTime()*0.04; });
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions,3]}/>
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#7fe8ff" sizeAttenuation transparent opacity={0.75}/>
    </points>
  );
}

function GridFloor() {
  const mat = useMemo(()=>new THREE.LineBasicMaterial({color:"#00f0ff", transparent:true, opacity:0.16}),[]);
  const geo = useMemo(()=>{
    const g = new THREE.BufferGeometry();
    const v: number[]=[]; const S=30,STEP=1.5;
    for (let i=-S;i<=S;i+=STEP){ v.push(i,-5,-S, i,-5,S); v.push(-S,-5,i, S,-5,i); }
    g.setAttribute("position", new THREE.Float32BufferAttribute(v,3));
    return g;
  },[]);
  return <lineSegments geometry={geo} material={mat} position={[0,-3.5,-8]}/>;
}

function ConnectionLines() {
  const group = useRef<THREE.Group>(null!);
  const pts = useMemo(()=>Array.from({length:18},()=>new THREE.Vector3(
    (Math.random()-0.5)*16,
    (Math.random()-0.5)*7,
    -4-Math.random()*6
  )),[]);
  useFrame(({clock})=>{
    const t = clock.getElapsedTime();
    pts.forEach((p,i)=>{ p.y += Math.sin(t+i)*0.001; });
  });
  return (
    <group ref={group}>
      {pts.map((a,i)=>pts.slice(i+1,i+3).map((b,j)=>{
        const d = a.distanceTo(b);
        if (d>4) return null;
        return <Line key={`${i}-${j}`} points={[a,b]} color="#00f0ff" transparent opacity={0.15} lineWidth={0.5}/>;
      }))}
    </group>
  );
}

export function Scene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{position:[0,0.2,6.5], fov:60}} dpr={[1,2]} gl={{antialias:true, alpha:true, powerPreference:"high-performance"}}>
        <color attach="background" args={["#020308"]}/>
        <fog attach="fog" args={["#020308", 7, 24]}/>
        <ambientLight intensity={0.25}/>
        <pointLight position={[6,5,4]} intensity={2.5} color="#00f0ff"/>
        <pointLight position={[-6,-3,3]} intensity={1.5} color="#ff2bd6"/>
        <Suspense fallback={null}>
          <CameraRig/>
          <Core/>
          <WireShapes/>
          <Particles/>
          <GridFloor/>
          <ConnectionLines/>
          <Stars radius={40} depth={30} count={2000} factor={3} fade speed={0.4}/>
        </Suspense>
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.9} luminanceThreshold={0.18} luminanceSmoothing={0.4} mipmapBlur/>
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0012, 0.002] as any}
            radialModulation={false}
            modulationOffset={0}
          />
          <Vignette eskil={false} offset={0.18} darkness={0.9}/>
        </EffectComposer>
      </Canvas>
    </div>
  );
}
