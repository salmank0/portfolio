"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Server, Database, CheckSquare, Sparkles } from "lucide-react";

interface TechItem {
  name: string;
  category: "frontend" | "backend" | "database" | "practices";
  level: "Expert" | "Advanced" | "Proficient";
  desc: string;
  projects: string[];
  related: string[];
}

const TECH_DATA: TechItem[] = [
  // Frontend
  {
    name: "Next.js",
    category: "frontend",
    level: "Expert",
    desc: "Used for production booking systems and enterprise dashboard workflows with SSR, ISR, Server Actions, and optimal bundle size.",
    projects: ["YRF HRMS", "Cinépolis Global"],
    related: ["React.js", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    name: "React.js",
    category: "frontend",
    level: "Expert",
    desc: "Core library for building reusable components, custom hooks, and complex client-side state engines.",
    projects: ["YRF HRMS", "Cinépolis Global"],
    related: ["Next.js", "TypeScript", "Redux Toolkit", "Tailwind CSS"],
  },
  {
    name: "TypeScript",
    category: "frontend",
    level: "Expert",
    desc: "Provides static type-safety across front-end models and backend API contracts (shared types between Express and Next).",
    projects: ["YRF HRMS", "Cinépolis Global"],
    related: ["Next.js", "React.js", "Node.js", "Express.js", "Prisma"],
  },
  {
    name: "Vue.js",
    category: "frontend",
    level: "Advanced",
    desc: "Utilized Vue 3 Composition API to build real-time secure financial transactional applications.",
    projects: ["KOZO"],
    related: ["Nuxt.js", "PHP", "REST APIs"],
  },
  {
    name: "Nuxt.js",
    category: "frontend",
    level: "Advanced",
    desc: "Built server-side rendered applications integrated with PHP and Laravel backends.",
    projects: ["KOZO"],
    related: ["Vue.js", "PHP", "Laravel"],
  },
  {
    name: "Redux Toolkit",
    category: "frontend",
    level: "Expert",
    desc: "Global state management for complex data tables and workspace panels.",
    projects: ["YRF HRMS"],
    related: ["React.js", "Next.js"],
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    level: "Expert",
    desc: "Constructed design systems and responsive landing pages utilizing modern layout engines (CSS grid, flex, custom theme tokens).",
    projects: ["YRF HRMS", "Cinépolis Global"],
    related: ["Next.js", "React.js"],
  },

  // Backend
  {
    name: "Node.js",
    category: "backend",
    level: "Expert",
    desc: "Primary runtime environment for microservices, background job workers, and high-performance server logic.",
    projects: ["YRF HRMS", "Cinépolis Global"],
    related: ["Express.js", "TypeScript", "Prisma", "PostgreSQL", "MySQL"],
  },
  {
    name: "Express.js",
    category: "backend",
    level: "Expert",
    desc: "Built scalable RESTful endpoints. Refactored bloated controllers into structured routes, services, and middlewares.",
    projects: ["YRF HRMS", "Cinépolis Global"],
    related: ["Node.js", "TypeScript", "Prisma", "PostgreSQL", "MySQL"],
  },
  {
    name: "PHP",
    category: "backend",
    level: "Advanced",
    desc: "Engineered secure transactional backend modules and customized e-commerce plugins.",
    projects: ["KOZO"],
    related: ["Laravel", "MySQL", "Vue.js"],
  },
  {
    name: "Laravel",
    category: "backend",
    level: "Advanced",
    desc: "Developed clean PHP web application backends utilizing MVC framework patterns and Eloquent ORM.",
    projects: ["KOZO"],
    related: ["PHP", "MySQL", "Nuxt.js"],
  },
  {
    name: "REST APIs",
    category: "backend",
    level: "Expert",
    desc: "Designed sub-100ms request-response cycles, utilizing rate limiters, token validation, and payload serialization compression.",
    projects: ["YRF HRMS", "Cinépolis Global", "KOZO"],
    related: ["Express.js", "Node.js", "PHP", "JWT (Auth)"],
  },
  {
    name: "JWT (Auth)",
    category: "backend",
    level: "Expert",
    desc: "Implemented secure cross-domain authentication using short-lived tokens and refresh tokens in HTTP-only cookies.",
    projects: ["YRF HRMS", "KOZO"],
    related: ["REST APIs", "Express.js", "PHP"],
  },

  // Database
  {
    name: "PostgreSQL",
    category: "database",
    level: "Expert",
    desc: "Configured relational models, triggers, and full-text search indexes. Optimized complex join costs.",
    projects: ["YRF HRMS"],
    related: ["Prisma", "Node.js", "Express.js"],
  },
  {
    name: "MySQL",
    category: "database",
    level: "Expert",
    desc: "Configured multi-table databases, indexing key query paths to reduce query times down by 95%.",
    projects: ["Cinépolis Global", "KOZO"],
    related: ["Prisma", "Sequelize", "Node.js", "PHP"],
  },
  {
    name: "MongoDB",
    category: "database",
    level: "Advanced",
    desc: "Schema design and aggregation pipelines for unstructured JSON document stores.",
    projects: [],
    related: ["Node.js", "Express.js"],
  },
  {
    name: "Prisma",
    category: "database",
    level: "Expert",
    desc: "Type-safe database ORM Client. Extensively used for join optimization, transaction batching, and schema migrations.",
    projects: ["YRF HRMS"],
    related: ["PostgreSQL", "MySQL", "TypeScript", "Node.js"],
  },
  {
    name: "Sequelize",
    category: "database",
    level: "Advanced",
    desc: "Utilized Sequelize models and associations in Node.js backends for clean database orchestration.",
    projects: ["Cinépolis Global"],
    related: ["MySQL", "Node.js", "Express.js"],
  },

  // Practices
  {
    name: "Micro-Frontends",
    category: "practices",
    level: "Expert",
    desc: "Coordinated runtime module loading and cross-app communication, improving parallel team delivery velocities by 25%.",
    projects: ["Cinépolis Global"],
    related: ["Next.js", "React.js"],
  },
  {
    name: "TDD (Jest)",
    category: "practices",
    level: "Advanced",
    desc: "Wrote unit and integration tests to ensure 99.9% uptime and prevent production regressions.",
    projects: ["KOZO"],
    related: ["TypeScript", "Node.js"],
  },
  {
    name: "Agile Delivery",
    category: "practices",
    level: "Expert",
    desc: "Collaborated in sprint cycles, sizing cards, planning database models, and coordinating releases.",
    projects: ["YRF HRMS", "Cinépolis Global"],
    related: [],
  },
];

export default function TechStack() {
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);

  const categories = [
    {
      id: "frontend",
      title: "Frontend & Logic",
      icon: <Code2 className="h-5 w-5 text-cyan-400" />,
      gradient: "from-cyan-500/20 to-blue-500/5",
    },
    {
      id: "backend",
      title: "Backend & Systems",
      icon: <Server className="h-5 w-5 text-violet-400" />,
      gradient: "from-violet-500/20 to-purple-500/5",
    },
    {
      id: "database",
      title: "Databases & ORMs",
      icon: <Database className="h-5 w-5 text-emerald-400" />,
      gradient: "from-emerald-500/20 to-teal-500/5",
    },
    {
      id: "practices",
      title: "Architecture & Tools",
      icon: <CheckSquare className="h-5 w-5 text-amber-400" />,
      gradient: "from-amber-500/20 to-orange-500/5",
    },
  ];

  return (
    <div className="w-full space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent p-5 backdrop-blur-md"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 shrink-0">
                {cat.icon}
              </div>
              <h4 className="text-md font-bold tracking-tight text-white">{cat.title}</h4>
            </div>

            <div className="flex flex-col gap-3">
              {TECH_DATA.filter((tech) => tech.category === cat.id).map((tech) => {
                const isCurrent = hoveredTech?.name === tech.name;
                const isRelated = hoveredTech?.related.includes(tech.name);
                const isDimmed = hoveredTech && !isCurrent && !isRelated;

                return (
                  <motion.div
                    key={tech.name}
                    onMouseEnter={() => setHoveredTech(tech)}
                    onMouseLeave={() => setHoveredTech(null)}
                    animate={{
                      opacity: isDimmed ? 0.35 : 1,
                      scale: isCurrent ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    className={`relative p-3.5 rounded-xl border cursor-pointer select-none transition-all ${
                      isCurrent
                        ? "bg-gradient-to-r from-cyan-950/40 to-indigo-950/40 border-cyan-400 shadow-md shadow-cyan-500/5"
                        : isRelated
                        ? "bg-white/[0.03] border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                        : "bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-semibold transition-colors ${
                        isCurrent || isRelated ? "text-cyan-400" : "text-zinc-200"
                      }`}>
                        {tech.name}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 px-1.5 py-0.5 rounded bg-white/5">
                        {tech.level}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Floating detail box explaining hovered stack node */}
      <div className="relative min-h-[110px] w-full rounded-2xl border border-white/5 bg-[#08080a] p-5 flex items-center justify-center overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-indigo-500/5 pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {hoveredTech ? (
            <motion.div
              key={hoveredTech.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 items-center relative z-10"
            >
              <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-white/10 pb-2 md:pb-0 md:pr-4">
                <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
                  ACTIVE NODE
                </span>
                <h5 className="text-2xl font-bold tracking-tight text-white mt-1">
                  {hoveredTech.name}
                </h5>
                <span className="inline-block text-[10px] font-bold text-indigo-400 border border-indigo-500/30 bg-indigo-950/20 px-2 py-0.5 rounded mt-1.5">
                  {hoveredTech.level} Proficiency
                </span>
              </div>

              <div className="md:col-span-2">
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {hoveredTech.desc}
                </p>
              </div>

              <div className="md:col-span-1 bg-white/[0.02] border border-white/5 rounded-xl p-3">
                <span className="text-[10px] text-zinc-500 block uppercase font-mono">
                  Applied In Projects:
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {hoveredTech.projects.length > 0 ? (
                    hoveredTech.projects.map((proj) => (
                      <span
                        key={proj}
                        className="text-[10px] font-semibold text-zinc-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded"
                      >
                        {proj}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-zinc-500 italic">Independent / General Stack</span>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-zinc-500 text-sm flex items-center gap-2 italic relative z-10"
            >
              <Sparkles className="h-4 w-4 text-cyan-500 animate-pulse" /> Hover over a stack card to trace dependencies & review project deployment context
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
