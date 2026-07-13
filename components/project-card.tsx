"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { ExternalLink, ShieldCheck, Cpu, Code2, Users, CheckCircle2, ArrowRight, X } from "lucide-react";

export interface ProjectData {
  id: string;
  title: string;
  client: string;
  shortDesc: string;
  longDesc: string;
  tags: string[];
  role: string;
  metrics: { label: string; value: string }[];
  achievements: string[];
  architecture: string[];
  demoText?: string;
}

interface ProjectCardProps {
  project: ProjectData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for mouse position relative to card dimensions
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse positions to rotation degrees (tilt effect)
  const rotateX = useTransform(y, [-300, 300], [15, -15]);
  const rotateY = useTransform(x, [-300, 300], [-15, 15]);

  // Spotlight gradient position
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to center of card
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;

    x.set(mouseX);
    y.set(mouseY);

    // Calculate spotlight relative coordinates
    const sx = event.clientX - rect.left;
    const sy = event.clientY - rect.top;
    setSpotlightPos({ x: sx, y: sy });
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }

  return (
    <>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsOpen(true)}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-[380px] w-full rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-md cursor-pointer transition-all duration-300 hover:border-cyan-500/30 group"
      >
        {/* Spotlight Effect */}
        {isHovered && (
          <div
            className="absolute inset-0 -z-10 rounded-2xl pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(6, 182, 212, 0.08), transparent 80%)`,
            }}
          />
        )}

        <div style={{ transform: "translateZ(30px)" }} className="h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400/80">
                {project.client}
              </span>
              <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-zinc-400">
                {project.role}
              </span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              {project.shortDesc}
            </p>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-cyan-950/30 border border-cyan-500/10 px-2.5 py-1 text-xs text-cyan-300 font-mono"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="text-xs text-zinc-500 flex items-center">
                  +{project.tags.length - 3} more
                </span>
              )}
            </div>

            <div className="flex items-center text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
              View Detailed Case Study
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-4xl rounded-2xl border border-white/10 bg-zinc-950 p-6 md:p-8 max-h-[90vh] overflow-y-auto shadow-2xl glass-panel"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full">
                  {project.client}
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mt-4">
                  {project.title}
                </h2>
                <p className="text-zinc-400 mt-2 font-mono text-sm">Role: {project.role}</p>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-4 rounded-xl border border-white/5 bg-white/[0.02] text-center"
                  >
                    <div className="text-2xl md:text-3xl font-extrabold text-cyan-400">
                      {m.value}
                    </div>
                    <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Column 1 & 2: Overview & Achievements */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                      <Cpu className="h-5 w-5 text-cyan-400" /> Project Architecture & Overview
                    </h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {project.longDesc}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" /> Key Contributions & Achievements
                    </h4>
                    <ul className="space-y-2.5">
                      {project.achievements.map((ach, idx) => (
                        <li key={idx} className="flex gap-3 text-zinc-300 text-sm leading-relaxed">
                          <span className="text-emerald-400 font-bold shrink-0">✓</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Column 3: Tech Stack & System Details */}
                <div className="space-y-6">
                  <div className="p-5 rounded-xl border border-white/5 bg-white/[0.01]">
                    <h4 className="text-md font-semibold text-white mb-3 flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-cyan-400" /> Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-zinc-900 border border-white/10 px-2 py-1 text-xs text-zinc-300 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 rounded-xl border border-white/5 bg-white/[0.01]">
                    <h4 className="text-md font-semibold text-white mb-3 flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-violet-400" /> Architectural Decisions
                    </h4>
                    <ul className="space-y-2 text-xs text-zinc-400">
                      {project.architecture.map((arch, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-violet-400 font-bold shrink-0">•</span>
                          <span>{arch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {project.demoText && (
                    <div className="p-4 rounded-xl border border-dashed border-cyan-500/20 bg-cyan-950/10 text-xs text-cyan-400 leading-relaxed">
                      💡 <strong>Case Study Insight:</strong> {project.demoText}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
