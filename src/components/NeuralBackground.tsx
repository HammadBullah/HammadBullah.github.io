import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import * as THREE from "three";

/**
 * Soft, Apple-esque neural / particle backdrop.
 * — Light mode: very subtle grey dots on white, with a faint blue/pink glow.
 * — Dark mode: dimmer white dots on black with a soft blue ambient glow.
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
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Particle field
    const COUNT = 1400;
    const pos = new Float32Array(COUNT * 3);
    const sca = new Float32Array(COUNT);
    const SPREAD = 8;
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * SPREAD;
      pos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD;
      pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD;
      sca[i] = Math.random() * 0.6 + 0.2;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geom.setAttribute("aScale", new THREE.BufferAttribute(sca, 1));

    const isDark = theme === "dark";
    const pointsMat = new THREE.PointsMaterial({
      size: isDark ? 0.012 : 0.010,
      color: isDark ? 0xffffff : 0x1d1d1f,
      transparent: true,
      opacity: isDark ? 0.28 : 0.18,
      sizeAttenuation: true,
      depthWrite: false,
    });

    // Circular soft point texture (so points are smooth dots, not squares)
    const makeDot = () => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
      const tex = new THREE.CanvasTexture(c);
      tex.needsUpdate = true;
      return tex;
    };
    pointsMat.map = makeDot();
    pointsMat.alphaTest = 0.01;

    const points = new THREE.Points(geom, pointsMat);
    scene.add(points);

    // Glow plane behind the dots
    const glowGeom = new THREE.PlaneGeometry(18, 12);
    const glowMat = new THREE.ShaderMaterial({
      uniforms: {
        uColorA: { value: new THREE.Color(isDark ? "#0a84ff" : "#5ac8fa") },
        uColorB: { value: new THREE.Color(isDark ? "#bf5af2" : "#ff375f") },
        uOpacity: { value: isDark ? 0.25 : 0.18 },
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform float uOpacity;
        uniform float uTime;
        void main() {
          vec2 c = vUv - 0.5;
          float d = length(c);
          // subtle moving gradient
          vec3 col = mix(uColorA, uColorB, smoothstep(0.0, 1.0, vUv.x + sin(uTime*0.2)*0.1));
          float a = smoothstep(0.7, 0.0, d) * uOpacity;
          gl_FragColor = vec4(col, a);
        }
      `,
      transparent: true,
      depthWrite: false,
    });
    const glow = new THREE.Mesh(glowGeom, glowMat);
    glow.position.set(0, 0, -2);
    scene.add(glow);

    // Mouse parallax
    const m = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      m.tx = (e.clientX / window.innerWidth - 0.5) * 0.35;
      m.ty = (e.clientY / window.innerHeight - 0.5) * 0.35;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      glowMat.uniforms.uTime.value = t;
      points.rotation.y = t * 0.03;
      points.rotation.x = t * 0.01;

      m.x += (m.tx - m.x) * 0.05;
      m.y += (m.ty - m.y) * 0.05;
      points.rotation.y += m.x * 0.05;
      points.rotation.x += m.y * 0.05;

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
      geom.dispose();
      pointsMat.dispose();
      glowGeom.dispose();
      glowMat.dispose();
      pointsMat.map?.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
