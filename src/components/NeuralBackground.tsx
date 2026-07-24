import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import * as THREE from "three";

/**
 * Quiet aurora + particles backdrop. Not flashy — just a soft,
 * drifting field of gaussian dots with a very slow gradient shader plane.
 */
export function NeuralBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 3.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ------- Dots -------
    const COUNT = 900;
    const pos = new Float32Array(COUNT * 3);
    const sca = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      sca[i] = Math.random() * 0.6 + 0.2;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    const isDark = theme === "dark";
    const dotTex = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, 64, 64);
      const t = new THREE.CanvasTexture(c);
      return t;
    })();

    const pointsMat = new THREE.PointsMaterial({
      size: isDark ? 0.018 : 0.014,
      color: isDark ? 0xffffff : 0x111113,
      transparent: true,
      opacity: isDark ? 0.22 : 0.22,
      map: dotTex,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geom, pointsMat);
    scene.add(points);

    // ------- Aurora plane -------
    const glowGeom = new THREE.PlaneGeometry(24, 16);
    const glowMat = new THREE.ShaderMaterial({
      uniforms: {
        uA: { value: new THREE.Color(isDark ? "#0a84ff" : "#8fb8ff") },
        uB: { value: new THREE.Color(isDark ? "#bf5af2" : "#f0a0d6") },
        uC: { value: new THREE.Color(isDark ? "#ff9f0a" : "#ffc48c") },
        uOpacity: { value: isDark ? 0.55 : 0.45 },
        uTime: { value: 0 },
        uDark: { value: isDark ? 1 : 0 },
      },
      transparent: true,
      depthWrite: false,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 uA; uniform vec3 uB; uniform vec3 uC;
        uniform float uOpacity; uniform float uTime; uniform float uDark;
        // simple simplex-like noise (hash-based)
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise(vec2 p){
          vec2 i = floor(p), f = fract(p);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
        }
        void main(){
          vec2 uv = vUv;
          vec2 p = uv * 2.2;
          float n = 0.0;
          n += noise(p + uTime*0.04) * 0.5;
          n += noise(p*2.0 - uTime*0.06) * 0.25;
          n += noise(p*4.0 + uTime*0.02) * 0.125;
          // three radial blobs
          vec2 c1 = vec2(0.25 + 0.08*sin(uTime*0.2), 0.5 + 0.08*cos(uTime*0.17));
          vec2 c2 = vec2(0.70 + 0.10*cos(uTime*0.23), 0.45 + 0.10*sin(uTime*0.21));
          vec2 c3 = vec2(0.55 + 0.07*sin(uTime*0.31), 0.75 + 0.05*cos(uTime*0.13));
          float d1 = smoothstep(0.7, 0.0, distance(uv, c1));
          float d2 = smoothstep(0.65, 0.0, distance(uv, c2));
          float d3 = smoothstep(0.65, 0.0, distance(uv, c3));
          vec3 col = uA * d1 + uB * d2 + uC * d3;
          col += n * mix(uA, uB, 0.5) * 0.12;
          float v = smoothstep(1.0, 0.1, length(uv - 0.5));
          float a = (d1+d2+d3) * uOpacity * v;
          gl_FragColor = vec4(col, a);
        }
      `,
    });
    const glow = new THREE.Mesh(glowGeom, glowMat);
    glow.position.set(0, 0, -3);
    scene.add(glow);

    // Mouse parallax
    const m = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      m.tx = (e.clientX / window.innerWidth - 0.5) * 0.3;
      m.ty = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      glowMat.uniforms.uTime.value = t;
      points.rotation.y = t * 0.02;
      points.rotation.x = Math.sin(t * 0.1) * 0.05;
      m.x += (m.tx - m.x) * 0.05;
      m.y += (m.ty - m.y) * 0.05;
      points.rotation.y += m.x * 0.04;
      points.rotation.x += m.y * 0.04;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geom.dispose(); pointsMat.dispose(); glowGeom.dispose(); glowMat.dispose();
      dotTex.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, [theme]);

  return <div ref={containerRef} aria-hidden className="fixed inset-0 -z-10 pointer-events-none" />;
}
