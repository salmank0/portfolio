"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Send,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  Menu,
  X
} from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
import CanvasParticles from "../components/canvas-particles";
import ProjectCard, { ProjectData } from "../components/project-card";
import PerformanceSandbox from "../components/performance-sandbox";
import TechStack from "../components/tech-stack";

const PROJECTS_DATA: ProjectData[] = [
  {
    id: "yrf-hrms",
    client: "Yash Raj Films",
    title: "YRF HRMS",
    shortDesc: "Designed and implemented comprehensive human resource management workflows and database query optimizations.",
    longDesc: "An enterprise-grade resource management system designed specifically for the production workflows of Yash Raj Films. Challenged with managing vast media crew rosters and complex department relations, we built a modular architecture. The core bottleneck lay in dashboard load times fetching relational statistics across 10M rows of historical records, which we optimized down to sub-second ranges.",
    role: "Lead Full Stack Developer",
    metrics: [
      { label: "Query Latency", value: "<2.0s" },
      { label: "Query Speedup", value: "95% faster" },
      { label: "Code Size", value: "-75% lines" },
      { label: "Staff Managed", value: "5 developers" }
    ],
    achievements: [
      "Led engineering for a high-traffic enterprise media platform, coordinating 5 developers to deliver 12+ critical business modules serving 500+ daily active users.",
      "Engineered performant REST APIs with response times under 100ms and optimized MySQL/PostgreSQL queries, reducing critical workflow execution latency from 40s to under 2s.",
      "Refactored legacy controllers from 8,000+ lines of redundant code into 2,000 lines of modular, clean services, decreasing production crashes by 40% and enhancing maintainability."
    ],
    architecture: ["Next.js", "Express.js", "PostgreSQL", "Prisma", "Flutter", "REST APIs"],
    tags: ["Next.js", "Express.js", "PostgreSQL", "Prisma"],
    demoText: "Optimized complex SQL join costs and introduced composite indexing, bringing page load response down by 95%."
  },
  {
    id: "cinepolis-global",
    client: "Cinépolis Global",
    title: "Cinépolis Booking System",
    shortDesc: "Developed a scalable ticket and food & beverage booking application handling high concurrent traffic using micro-frontends.",
    longDesc: "A critical customer-facing booking engine serving hundreds of concurrent daily active users. Designed with a micro-frontend architecture to isolate high-throughput checkout workflows from marketing content. This allowed independent deployments, minimized blast radius, and allowed seamless integration with the ticketing API.",
    role: "Full Stack Developer",
    metrics: [
      { label: "Dev Velocity", value: "+25% faster" },
      { label: "Uptime Rate", value: "99.9% guaranteed" },
      { label: "Page Load", value: "20% faster" },
      { label: "UI Modules", value: "3 lines" }
    ],
    achievements: [
      "Developed and maintained scalable full-stack web applications utilizing React, Vue, Node.js, Express, PHP, and MySQL.",
      "Implemented micro-frontend architectures and modular UI libraries, reducing development cycle times by 25% across 3 distinct product lines.",
      "Optimized frontend performance and API integrations, improving page load speeds by 20% and ensuring full cross-browser compatibility."
    ],
    architecture: ["React.js", "Vue.js", "Micro-Frontends", "Node.js", "Express.js", "MySQL", "Sequelize"],
    tags: ["React.js", "Micro-Frontends", "Node.js", "MySQL"],
    demoText: "Implemented runtime module federation and shared state store to sync ticketing with F&B checkout widgets."
  },
  {
    id: "kozo",
    client: "KOZO Finance",
    title: "KOZO Financial Module",
    shortDesc: "Engineered secure financial modules for real-time transaction processing with integrated frontend and backend APIs.",
    longDesc: "A secure transactional portal handling real-time payments, authorization audits, and ledger logs. Built with rigorous unit test coverage and robust cryptographic payload handshakes to ensure transaction integrity and absolute security.",
    role: "Full Stack Developer",
    metrics: [
      { label: "Bugs Resolved", value: "100+ Production" },
      { label: "API Speed", value: "<150ms latency" },
      { label: "Test Coverage", value: "90% TDD" },
      { label: "Module Count", value: "5+ Custom" }
    ],
    achievements: [
      "Engineered secure financial modules for real-time transaction processing with integrated frontend and backend APIs.",
      "Resolved 100+ critical production bugs, wrote unit tests, and provided production support to guarantee 99.9% application uptime.",
      "Built solid foundations in HTML, CSS, JavaScript, jQuery, PHP, Laravel, WordPress, and Magento."
    ],
    architecture: ["Vue.js", "Nuxt.js", "PHP", "Laravel", "REST APIs", "MySQL", "Jest (TDD)"],
    tags: ["Vue.js", "PHP", "Laravel", "REST APIs"],
    demoText: "Configured transaction validation middleware preventing double-spend exploits and integrated JWT auth."
  }
];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    // Rate Limiting: prevent submissions more than once every 60 seconds
    const lastSubmit = localStorage.getItem("last_contact_submit");
    const now = Date.now();
    if (lastSubmit && now - parseInt(lastSubmit) < 60000) {
      const waitTime = Math.ceil((60000 - (now - parseInt(lastSubmit))) / 1000);
      alert(`Please wait ${waitTime} seconds before sending another message to prevent spam.`);
      return;
    }

    setFormStatus("sending");

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        throw new Error("Web3Forms Access Key is not configured. Please check your .env.local file.");
      }

      // Client-side Honeypot Check
      const form = e.currentTarget as HTMLFormElement;
      const botcheck = (form.elements.namedItem("botcheck") as HTMLInputElement)?.value;
      if (botcheck) {
        // If bot filled the honeypot, simulate successful response but drop it silently
        setFormStatus("sent");
        setFormState({ name: "", email: "", message: "" });
        return;
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: `Portfolio Message from ${formState.name}`,
          from_name: "Salman Portfolio"
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus("sent");
        setFormState({ name: "", email: "", message: "" });
        localStorage.setItem("last_contact_submit", now.toString());
      } else {
        throw new Error(data.message || "Something went wrong during form submission.");
      }
    } catch (error) {
      console.error("Form error:", error);
      setFormStatus("idle");
      alert(error instanceof Error ? error.message : "Failed to send message. Please try again.");
    }

    setTimeout(() => setFormStatus("idle"), 4000);
  };

  const navLinks = [
    { name: "About", href: "#hero", id: "hero" },
    { name: "Enterprise Projects", href: "#projects", id: "projects" },
    { name: "Performance Sandbox", href: "#sandbox", id: "sandbox" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Contact", href: "#contact", id: "contact" }
  ];

  return (
    <div className="relative min-h-screen grid-bg">
      {/* 3D Canvas Background */}
      <CanvasParticles />

      {/* Floating Header */}
      <header className="fixed top-4 inset-x-4 z-40 max-w-7xl mx-auto">
        <div className="glass-panel rounded-2xl px-6 py-4 flex items-center justify-between transition-all duration-300">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <a href="#hero" className="font-mono font-bold text-lg tracking-tight text-white hover:text-cyan-400 transition-colors">
              SALMAN.DEV
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveSection(link.id)}
                className={`text-xs font-mono tracking-wider uppercase transition-colors hover:text-cyan-400 ${activeSection === link.id ? "text-cyan-400 font-bold" : "text-zinc-400"
                  }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/20 text-white rounded-xl px-4 py-2 text-xs font-mono tracking-wider transition-all"
            >
              Get In Touch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 right-0 glass-panel rounded-2xl p-6 mt-2 md:hidden space-y-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveSection(link.id);
                  setMobileMenuOpen(false);
                }}
                className="block text-sm font-mono tracking-wider uppercase text-zinc-300 hover:text-cyan-400"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-cyan-500 text-black font-bold font-mono rounded-xl py-2.5 text-xs tracking-wider"
            >
              Get In Touch
            </a>
          </motion.div>
        )}
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-24 space-y-32">

        {/* Section 1: Hero */}
        <section id="hero" className="min-h-[70vh] flex flex-col justify-center items-start lg:grid lg:grid-cols-12 lg:gap-12 py-12">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-950/40 border border-cyan-500/20 px-4.5 py-1.5 text-xs text-cyan-400 font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Available for Contracts & Architect Roles
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              I Engineer High-Performance <br />
              <span className="text-gradient-teal-violet">Full Stack Systems</span>
            </h1>

            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl">
              Hi, I&apos;m <strong>Mohammad Salman Khan</strong>. A Full Stack Developer with 5+ years of experience constructing scalable enterprise applications, sub-100ms APIs, and micro-frontend structures for major brands.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#projects"
                className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-black font-bold rounded-xl px-6 py-3.5 text-sm tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/10 transition-all cursor-pointer"
              >
                Explore Enterprise Work <ChevronRight className="h-4.5 w-4.5" />
              </a>
              <a
                href="#contact"
                className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 text-white font-semibold rounded-xl px-6 py-3.5 text-sm tracking-wider flex items-center gap-2 transition-all cursor-pointer"
              >
                <Mail className="h-4 w-4" /> Let&apos;s Build
              </a>
            </div>
          </div>

          {/* Interactive Hero Console representation */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-0 right-0 h-40 w-40 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-40 w-40 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                <span className="text-xs font-mono text-cyan-400">credentials.config</span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">SYS: ACTIVE</span>
              </div>

              <div className="space-y-4 text-xs font-mono text-zinc-300">
                <div>
                  <span className="text-cyan-500">developer$</span> <span className="text-white font-bold">cat salman.json</span>
                </div>
                <div className="bg-black/50 p-4 rounded-xl border border-white/5 space-y-2 leading-relaxed text-zinc-400">
                  <p><span className="text-purple-400">&quot;yearsOfExperience&quot;</span>: 5,</p>
                  <p><span className="text-purple-400">&quot;coreStack&quot;</span>: [&quot;Next.js&quot;, &quot;Node.js&quot;, &quot;PHP&quot;, &quot;SQL&quot;],</p>
                  <p><span className="text-purple-400">&quot;enterpriseClients&quot;</span>: [&quot;Yash Raj Films&quot;, &quot;Cinépolis&quot;, &quot;Dharma&quot;],</p>
                  <p><span className="text-purple-400">&quot;queryOptimizations&quot;</span>: &quot;From 40s down to &lt;2s&quot;,</p>
                  <p><span className="text-purple-400">&quot;architectureMethodology&quot;</span>: &quot;Micro-Frontends & TDD&quot;</p>
                </div>
                <div className="flex gap-4 text-zinc-500 pt-2">
                  <a href="https://linkedin.com/in/mohammad-salman-khan" target="_blank" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                    <LinkedinIcon className="h-3.5 w-3.5" /> LinkedIn
                  </a>
                  <a href="https://github.com" target="_blank" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                    <GithubIcon className="h-3.5 w-3.5" /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section: Enterprise Clients scrolling strip */}
        <section className="py-6 border-y border-white/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              Enterprise Client Engagements:
            </span>
            <div className="flex flex-wrap items-center gap-8 md:gap-12">
              {["Yash Raj Films", "Dharma Productions", "Cinépolis Global", "Applause Entertainment"].map((client) => (
                <div
                  key={client}
                  className="text-md md:text-lg font-bold tracking-tight text-zinc-400/50 hover:text-cyan-400/80 transition-colors cursor-default"
                >
                  {client}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Case Studies Grid */}
        <section id="projects" className="space-y-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Enterprise Case Studies
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl">
              Due to NDA compliance, source code is private. These detailed system architecture reviews detail my contributions to corporate platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS_DATA.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* Section 3: Performance Sandbox */}
        <section id="sandbox" className="space-y-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Proof of Work Sandbox
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl">
              Interact with a mock execution dashboard simulating database querying over 10,000,000 index pages. Toggle optimizations to view load speed comparison.
            </p>
          </div>

          <PerformanceSandbox />
        </section>

        {/* Section 4: Skills Map */}
        <section id="skills" className="space-y-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Interactive Tech Stack
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl">
              Hover over a skill node to map its engineering dependencies and inspect where and why it is integrated.
            </p>
          </div>

          <TechStack />
        </section>

        {/* Section 5: Experience & Resume */}
        <section id="experience" className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Work History */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                Professional Journey
              </h2>
              <p className="text-zinc-400 text-sm">
                5+ years of building web applications, optimizing databases, and orchestrating microservice APIs.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative border-l border-white/10 pl-6 space-y-8 ml-2">
              {/* Job 1 */}
              <div className="relative">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-cyan-400 border-2 border-[#030303]" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    Full Stack Developer <span className="text-xs font-normal text-cyan-400 font-mono">@ End Point IT Services</span>
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">Nov 2024 — Present</span>
                </div>
                <p className="text-xs text-zinc-400 mb-3 font-semibold">Mumbai, India (Enterprise Client Focus)</p>
                <ul className="space-y-1.5 text-xs text-zinc-400 leading-relaxed list-disc list-inside pl-1">
                  <li>Led engineering for a high-traffic enterprise media platform, coordinating 5 developers to deliver 12+ critical modules.</li>
                  <li>Designed and developed full-stack features using React, Next.js, Node.js, Express, PHP, and MySQL.</li>
                  <li>Engineered performant REST APIs under 100ms and optimized databases, trimming latency from 40s to under 2s (95% gain).</li>
                  <li>Refactored legacy files, cutting bloated files from 8,000+ lines down to 2,000 lines of modular services.</li>
                </ul>
              </div>

              {/* Job 2 */}
              <div className="relative">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-violet-400 border-2 border-[#030303]" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    Full Stack Developer <span className="text-xs font-normal text-violet-400 font-mono">@ Binary Numbers ITzone</span>
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">Nov 2021 — Nov 2024</span>
                </div>
                <p className="text-xs text-zinc-400 mb-3 font-semibold">Mumbai, India (3 Years Contract)</p>
                <ul className="space-y-1.5 text-xs text-zinc-400 leading-relaxed list-disc list-inside pl-1">
                  <li>Maintained and structured scalable full-stack web applications utilizing React, Vue, Node.js, Express, PHP, and MySQL.</li>
                  <li>Implemented modular micro-frontend libraries, reducing development iteration cycles by 25% across 3 distinct product lines.</li>
                  <li>Optimized API calls and frontend assets, boosting client load speeds by 20% on all primary browsers.</li>
                  <li>Resolved 100+ critical bugs and supported production services to assure 99.9% application uptime.</li>
                </ul>
              </div>

              {/* Job 3 */}
              <div className="relative">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-zinc-600 border-2 border-[#030303]" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    Intern <span className="text-xs font-normal text-zinc-500 font-mono">@ Geecon Systems</span>
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">Mar 2021 — Oct 2021</span>
                </div>
                <p className="text-xs text-zinc-400 mb-3 font-semibold">Mumbai, India</p>
                <ul className="space-y-1.5 text-xs text-zinc-400 leading-relaxed list-disc list-inside pl-1">
                  <li>Built core templates in HTML, CSS, JavaScript, jQuery, PHP, Laravel, WordPress, and Magento.</li>
                  <li>Assisted with debugging database queries and custom modules for e-commerce websites.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education & Certs */}
          <div className="lg:col-span-4 space-y-8">
            {/* Education */}
            <div className="space-y-4 p-5 rounded-2xl border border-white/5 bg-white/[0.01]">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-cyan-400" /> Education
              </h3>
              <div className="space-y-3 font-mono">
                <div>
                  <h4 className="text-sm font-bold text-white">B.Sc. in Information Technology</h4>
                  <p className="text-xs text-zinc-500">Mumbai University • 2016 — 2020</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">HSC (Junior College)</h4>
                  <p className="text-xs text-zinc-500">Kalavidyalaya Junior College • 2013 — 2015</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-4 p-5 rounded-2xl border border-white/5 bg-white/[0.01]">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="h-5 w-5 text-violet-400" /> Credentials & Certs
              </h3>
              <ul className="space-y-2.5 text-xs text-zinc-400 font-mono">
                <li className="flex gap-2">
                  <span className="text-violet-400">•</span>
                  <span>freeCodeCamp: JS Algorithms & Data Structures</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-violet-400">•</span>
                  <span>freeCodeCamp: Responsive Web Design</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-violet-400">•</span>
                  <span>Outskills: Generative AI Mastermind</span>
                </li>
              </ul>
            </div>

            {/* Achievements Callout */}
            <div className="p-5 rounded-2xl border border-dashed border-cyan-500/20 bg-cyan-950/10 text-xs text-cyan-400 space-y-2 leading-relaxed">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="h-4.5 w-4.5 shrink-0" /> Enterprise Highlights
              </div>
              <p>Recognized as school topper for academic excellence. Successfully led multiple engineering teams to take core enterprise applications to production under tight schedules.</p>
            </div>
          </div>
        </section>

        {/* Section 6: Contact */}
        <section id="contact" className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Connect With Me
            </h2>
            <p className="text-zinc-400 text-sm max-w-md mx-auto">
              Want to discuss database optimizations, contract opportunities, or full-stack architecture? Drop a line below.
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="glass-panel rounded-2xl p-6 md:p-8 space-y-6">
            {/* Honeypot Spam Protection (Invisible to humans) */}
            <input type="text" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 uppercase">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Mohammad Salman Khan"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-cyan-400 focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 uppercase">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="salman@gmail.com"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-cyan-400 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-400 uppercase">Project / Discussion Message</label>
              <textarea
                name="message"
                required
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Describe what you want to build or discuss..."
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={formStatus !== "idle"}
              className="w-full bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-black font-bold rounded-xl py-3.5 text-sm tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10 transition-all cursor-pointer"
            >
              {formStatus === "sending" ? (
                "Sending message..."
              ) : formStatus === "sent" ? (
                <>
                  <CheckCircle className="h-4.5 w-4.5" /> Message Sent Successfully!
                </>
              ) : (
                <>
                  <Send className="h-4.5 w-4.5" /> Send Secure Message
                </>
              )}
            </button>
          </form>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/40 py-12 text-center text-xs text-zinc-500 font-mono space-y-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
            <span>Mohammad Salman Khan • Portfolio 2026</span>
          </div>

          <div className="flex gap-6">
            <a href="https://linkedin.com/in/mohammad-salman-khan" target="_blank" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://github.com/salmank0" target="_blank" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
