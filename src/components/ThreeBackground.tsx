"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 1500 : 3500;
    const SHOW_LINES = !isMobile;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x050508, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 80);

    // ── Particles ──────────────────────────────────────────────────
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const particlePositions: THREE.Vector3[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 30 + (Math.random() - 0.5) * 20;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      particlePositions.push(new THREE.Vector3(x, y, z));
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 0.18,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Connection lines ──────────────────────────────────────────
    let linesMesh: THREE.LineSegments | null = null;
    if (SHOW_LINES) {
      const linePositions: number[] = [];
      const MAX_DIST = 8;
      const MAX_LINES = 400;
      let lineCount = 0;
      for (let i = 0; i < PARTICLE_COUNT && lineCount < MAX_LINES; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT && lineCount < MAX_LINES; j++) {
          const dist = particlePositions[i].distanceTo(particlePositions[j]);
          if (dist < MAX_DIST) {
            linePositions.push(
              particlePositions[i].x, particlePositions[i].y, particlePositions[i].z,
              particlePositions[j].x, particlePositions[j].y, particlePositions[j].z
            );
            lineCount++;
          }
        }
      }
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(linePositions), 3));
      const lineMat = new THREE.LineBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.06 });
      linesMesh = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(linesMesh);
    }

    // ── Wireframe geometries ───────────────────────────────────────
    const geoConfigs = [
      { geo: new THREE.IcosahedronGeometry(4, 0), pos: [-35, 18, -20], speed: 0.003, bobAmp: 0.8 },
      { geo: new THREE.OctahedronGeometry(3.5, 0), pos: [38, -14, -10], speed: 0.005, bobAmp: 1.0 },
      { geo: new THREE.TorusGeometry(4, 0.8, 8, 12), pos: [20, 25, -30], speed: 0.004, bobAmp: 0.6 },
      { geo: new THREE.IcosahedronGeometry(3, 0), pos: [-28, -22, -15], speed: 0.006, bobAmp: 1.2 },
      { geo: new THREE.OctahedronGeometry(2.5, 0), pos: [0, -30, -25], speed: 0.004, bobAmp: 0.7 },
      { geo: new THREE.TorusGeometry(3, 0.6, 8, 10), pos: [-15, 30, -20], speed: 0.003, bobAmp: 0.9 },
    ];

    const wireMeshes = geoConfigs.map(({ geo, pos, speed, bobAmp }) => {
      const mat = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.07 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos[0], pos[1], pos[2]);
      (mesh as any)._speed = speed;
      (mesh as any)._bobAmp = bobAmp;
      (mesh as any)._bobOffset = Math.random() * Math.PI * 2;
      (mesh as any)._baseY = pos[1];
      scene.add(mesh);
      return mesh;
    });

    // ── Mouse parallax ─────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Scroll parallax ────────────────────────────────────────────
    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener("scroll", onScroll);

    // ── Resize ─────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ─────────────────────────────────────────────
    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      particles.rotation.y = t * 0.03 + mouse.x * 0.15;
      particles.rotation.x = mouse.y * 0.08;

      if (linesMesh) {
        linesMesh.rotation.y = particles.rotation.y;
        linesMesh.rotation.x = particles.rotation.x;
      }

      wireMeshes.forEach((mesh) => {
        const s = (mesh as any)._speed;
        const amp = (mesh as any)._bobAmp;
        const off = (mesh as any)._bobOffset;
        const baseY = (mesh as any)._baseY;
        mesh.rotation.x += s;
        mesh.rotation.y += s * 1.3;
        mesh.position.y = baseY + Math.sin(t * 0.5 + off) * amp;
      });

      camera.position.x = mouse.x * 3;
      camera.position.y = mouse.y * 3 - scrollY * 0.01;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
}
