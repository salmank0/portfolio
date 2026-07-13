"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  color: string;
  size: number;
}

export default function CanvasParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Generate particles in 3D space
    const particleCount = 100;
    const particles: Particle[] = [];
    
    // Theme colors: Cyan/Teal and Violet/Purple
    const colors = [
      "rgba(6, 182, 212, 0.4)", // Cyan
      "rgba(139, 92, 246, 0.4)", // Violet
      "rgba(34, 211, 238, 0.3)", // Light cyan
      "rgba(167, 139, 250, 0.3)", // Light violet
    ];

    for (let i = 0; i < particleCount; i++) {
      // Range around center
      const x = (Math.random() - 0.5) * 1600;
      const y = (Math.random() - 0.5) * 1600;
      const z = Math.random() * 800 + 200; // Keep in front of camera

      particles.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 1,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to [-0.5, 0.5]
      mouseRef.current.targetX = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Focal length for 3D projection
    const fl = 400;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation (easing)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const angleY = mouseRef.current.x * 0.3; // Rotate around Y-axis based on mouse X
      const angleX = -mouseRef.current.y * 0.3; // Rotate around X-axis based on mouse Y

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      particles.forEach((p) => {
        // Slow float movement in Z
        p.baseZ -= 0.5;
        if (p.baseZ <= 0) {
          p.baseZ = 1000;
        }

        // Apply rotation to base coordinates for 3D interactive effect
        // 1. Rotate around Y axis
        let x1 = p.baseX * cosY - p.baseZ * sinY;
        let z1 = p.baseZ * cosY + p.baseX * sinY;

        // 2. Rotate around X axis
        let y2 = p.baseY * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.baseY * sinX;

        // Add small drift/float animation
        const time = Date.now() * 0.0005;
        x1 += Math.sin(time + p.baseZ) * 10;
        y2 += Math.cos(time + p.baseX) * 10;

        // 3D to 2D projection
        // Scale factor depends on distance Z
        const scale = fl / (fl + z2);
        
        // Project coordinates to 2D plane offset from screen center
        const screenX = width / 2 + x1 * scale;
        const screenY = height / 2 + y2 * scale;
        const renderSize = p.size * scale * 2.5;

        // Only render if within screen bounds
        if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height && z2 > -fl) {
          ctx.beginPath();
          ctx.arc(screenX, screenY, Math.max(0.1, renderSize), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = renderSize * 3;
          ctx.shadowColor = p.color;
          ctx.fill();
        }
      });

      // Draw subtle connecting lines for close particles
      ctx.shadowBlur = 0; // Reset shadow for lines speed
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          // Compute rotated coords of both particles for distance check
          const x1_1 = p1.baseX * cosY - p1.baseZ * sinY;
          const z1_1 = p1.baseZ * cosY + p1.baseX * sinY;
          const y2_1 = p1.baseY * cosX - z1_1 * sinX;
          const z2_1 = z1_1 * cosX + p1.baseY * sinX;

          const x1_2 = p2.baseX * cosY - p2.baseZ * sinY;
          const z1_2 = p2.baseZ * cosY + p2.baseX * sinY;
          const y2_2 = p2.baseY * cosX - z1_2 * sinX;
          const z2_2 = z1_2 * cosX + p2.baseY * sinX;

          // Euclidean distance in 3D space
          const dx = x1_1 - x1_2;
          const dy = y2_1 - y2_2;
          const dz = z2_1 - z2_2;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 150) {
            const scale1 = fl / (fl + z2_1);
            const scale2 = fl / (fl + z2_2);

            const sx1 = width / 2 + x1_1 * scale1;
            const sy1 = height / 2 + y2_1 * scale1;
            const sx2 = width / 2 + x1_2 * scale2;
            const sy2 = height / 2 + y2_2 * scale2;

            if (
              sx1 >= 0 && sx1 <= width && sy1 >= 0 && sy1 <= height &&
              sx2 >= 0 && sx2 <= width && sy2 >= 0 && sy2 <= height
            ) {
              const alpha = (1 - dist / 150) * 0.12;
              ctx.beginPath();
              ctx.moveTo(sx1, sy1);
              ctx.lineTo(sx2, sy2);
              ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none bg-[#030303]"
    />
  );
}
