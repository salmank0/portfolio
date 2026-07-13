"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Play, CheckCircle, AlertTriangle, Cpu, HardDrive, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";

export default function PerformanceSandbox() {
  const [isOptimized, setIsOptimized] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [activeLang, setActiveLang] = useState<"prisma" | "sql">("prisma");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const unoptimizedPrisma = `// ❌ N+1 queries, loading all columns, sorting in JS
const mediaItems = await prisma.mediaContent.findMany();
const detailedMedia = await Promise.all(
  mediaItems.map(async (item) => {
    const genres = await prisma.genre.findMany({
      where: { mediaId: item.id }
    });
    return { ...item, genres };
  })
);

// Sorting and filtering in JS memory
const results = detailedMedia
  .filter(item => item.title.toLowerCase().includes(searchQuery))
  .sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime());`;

  const optimizedPrisma = `//  Single query using Joins, Indexes, Select projection, & DB-level pagination
const results = await prisma.mediaContent.findMany({
  where: {
    title: {
      search: searchQuery // Index-supported Full-Text Search
    }
  },
  select: {
    id: true,
    title: true,
    releaseDate: true,
    thumbnail: true,
    genres: {
      select: { name: true }
    }
  },
  orderBy: {
    releaseDate: 'desc'
  },
  take: 50 // Paginated results
});`;

  const unoptimizedSQL = `-- ❌ Full Table Scan on 10,000,000 rows
SELECT * FROM media_contents 
WHERE LOWER(title) LIKE '%salman%' 
ORDER BY release_date DESC;

-- EXPLAIN ANALYZE OUTPUT:
-- -> Sort: media_contents.release_date DESC (cost=125439.12 rows=10543)
--   -> Filter: (lower(title) ~~ '%salman%') (cost=98432.43)
--     -> Seq Scan on media_contents (cost=0.00..87432.12 rows=10000000)`;

  const optimizedSQL = `--  Covering Composite Index + Full-Text Search
CREATE INDEX CONCURRENTLY idx_media_title_search 
ON media_contents USING gin(to_tsvector('english', title));

SELECT id, title, release_date, thumbnail 
FROM media_contents 
WHERE to_tsvector('english', title) @@ to_tsquery('english', 'salman') 
ORDER BY release_date DESC 
LIMIT 50;

-- EXPLAIN ANALYZE OUTPUT:
-- -> Limit (cost=42.12..42.25 rows=50)
--   -> Index Scan using idx_media_title_search (cost=12.43..984.12 rows=3412)`;

  const runSimulation = async () => {
    setIsRunning(true);
    setProgress(0);
    setResponseTime(null);
    setLogs([]);

    const unoptimizedSteps = [
      { text: "⚡ Initiating API Request: GET /api/v1/media?query=salman...", delay: 200 },
      { text: "⚠️ Database warning: No query parameters caching found.", delay: 400 },
      { text: "📊 Executing Sequential Scan: SELECT * FROM media_contents...", delay: 600 },
      { text: "⏳ Scanned 1,000,000 rows... High CPU overhead detected.", delay: 1000 },
      { text: "⏳ Scanned 5,000,000 rows... Disk I/O bottlenecks rising.", delay: 1800 },
      { text: "⏳ Scanned 10,000,000 rows... Table scan complete.", delay: 2600 },
      { text: "🔄 Resolving N+1 relations: Fetching genres for 12,400 matching items...", delay: 3000 },
      { text: "🧮 Performing in-memory JS Array.prototype.sort() on server instance...", delay: 3500 },
      { text: "❗ Thread blocked: Event loop latency spike (+150ms).", delay: 3900 },
      { text: "✅ Response finished. Latency: 42.1 seconds. Code 200 OK.", delay: 4200 },
    ];

    const optimizedSteps = [
      { text: "⚡ Initiating API Request: GET /api/v1/media?query=salman...", delay: 100 },
      { text: "🎯 Cache Miss. Redirecting to PostgreSQL instance...", delay: 200 },
      { text: "🔍 Executing Bitmap Index Scan using idx_media_title_search...", delay: 300 },
      { text: "🟢 Index matches found: 3,412 rows. Extracting top 50 rows via Index Scan...", delay: 400 },
      { text: "📦 Joined relations on DB level: genres columns extracted dynamically.", delay: 500 },
      { text: "🚀 Returning paginated response payload (2.1 KB).", delay: 580 },
      { text: "✅ Query execution finished in 18ms. Code 200 OK.", delay: 600 },
    ];

    const steps = isOptimized ? optimizedSteps : unoptimizedSteps;
    const totalTime = steps[steps.length - 1].delay;

    // Progress bar simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, totalTime / 100);

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, steps[i].delay - (i === 0 ? 0 : steps[i - 1].delay)));
      setLogs((prev) => [...prev, steps[i].text]);
    }

    clearInterval(interval);
    setProgress(100);
    setResponseTime(isOptimized ? 18 : 42100); // 18ms vs 42.1s
    setIsRunning(false);

    if (isOptimized) {
      // Confetti fire
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  const handleOptimizationToggle = () => {
    setIsOptimized(!isOptimized);
    setResponseTime(null);
    setLogs([]);
    setProgress(0);
  };

  return (
    <div className="w-full rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-6 backdrop-blur-md">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-white">
            Performance Playground
          </h3>
          <p className="text-zinc-400 text-xs mt-1">
            See how I optimized database queries from 40s to 18ms for client production systems.
          </p>
        </div>

        {/* Toggle Optimization */}
        <button
          onClick={handleOptimizationToggle}
          disabled={isRunning}
          className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
            isOptimized
              ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
              : "bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10"
          }`}
        >
          {isOptimized ? (
            <>
              <CheckCircle className="h-4 w-4" /> Optimization Active
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 animate-spin-slow" /> Apply Index & Pagination
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Code Window */}
        <div className="flex flex-col rounded-xl border border-white/10 bg-black/60 overflow-hidden">
          {/* Code Window Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/60 border-b border-white/5">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setActiveLang("prisma")}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-colors ${
                  activeLang === "prisma" ? "bg-white/10 text-cyan-400" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Prisma ORM
              </button>
              <button
                onClick={() => setActiveLang("sql")}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-colors ${
                  activeLang === "sql" ? "bg-white/10 text-cyan-400" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                PostgreSQL
              </button>
            </div>
          </div>

          {/* Code Body */}
          <div className="p-4 flex-1 font-mono text-[11px] md:text-[13px] leading-relaxed overflow-x-auto text-zinc-300 min-h-[300px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.pre
                key={`${activeLang}-${isOptimized}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="whitespace-pre overflow-x-auto"
              >
                {activeLang === "prisma"
                  ? isOptimized
                    ? optimizedPrisma
                    : unoptimizedPrisma
                  : isOptimized
                  ? optimizedSQL
                  : unoptimizedSQL}
              </motion.pre>
            </AnimatePresence>

            <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-zinc-500 flex justify-between">
              <span>Status: {isOptimized ? "🚀 Database Optimized" : "⚠️ Legacy Pipeline Scan"}</span>
              <span>Lines: {activeLang === "prisma" ? 22 : 12}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Terminal Window */}
        <div className="flex flex-col rounded-xl border border-white/10 bg-black/60 overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/60 border-b border-white/5">
            <span className="flex items-center gap-2 font-mono text-xs text-zinc-400">
              <Terminal className="h-4 w-4 text-cyan-400" /> Database Execution Logs
            </span>
            {responseTime && (
              <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                isOptimized ? "bg-emerald-950 text-emerald-400 border border-emerald-500/20" : "bg-red-950 text-red-400 border border-red-500/20"
              }`}>
                Finished: {isOptimized ? `${responseTime}ms` : "42.1s"}
              </span>
            )}
          </div>

          {/* Terminal Body */}
          <div className="p-4 flex-1 bg-[#020204] font-mono text-xs text-emerald-400/90 overflow-y-auto min-h-[220px] max-h-[260px] flex flex-col justify-between">
            <div className="space-y-1">
              {logs.length === 0 && (
                <div className="text-zinc-600 text-center py-12 italic">
                  Press "Run Query" to trigger a simulated backend request...
                </div>
              )}
              {logs.map((log, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <span className="text-zinc-600 shrink-0">[{idx + 1}]</span>
                  <span className={log.startsWith("❌") || log.startsWith("⚠️") || log.startsWith("❗") ? "text-red-400" : log.startsWith("✅") ? "text-cyan-400" : "text-emerald-400/80"}>
                    {log}
                  </span>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Run Progress Bar */}
            {isRunning && (
              <div className="mt-4 bg-zinc-950 border border-white/5 rounded p-2 text-[10px] text-zinc-400">
                <div className="flex justify-between mb-1">
                  <span>Executing search query...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-100 ${isOptimized ? "bg-cyan-500" : "bg-red-500"}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Performance Dashboard Controls */}
          <div className="p-4 bg-zinc-900/40 border-t border-white/5 grid grid-cols-3 gap-4 items-center">
            {/* CPU Gauge */}
            <div className="flex flex-col items-center justify-center p-2 rounded bg-white/[0.01]">
              <Cpu className={`h-4 w-4 mb-1 ${isRunning ? (isOptimized ? "text-cyan-400 animate-pulse" : "text-red-500 animate-bounce") : "text-zinc-500"}`} />
              <span className="text-[10px] text-zinc-500 uppercase">CPU Usage</span>
              <span className="text-xs font-bold text-white font-mono mt-0.5">
                {isRunning ? (isOptimized ? "12%" : "98%") : "0%"}
              </span>
            </div>

            {/* Disk IO */}
            <div className="flex flex-col items-center justify-center p-2 rounded bg-white/[0.01]">
              <HardDrive className={`h-4 w-4 mb-1 ${isRunning ? (isOptimized ? "text-cyan-400" : "text-red-500 animate-pulse") : "text-zinc-500"}`} />
              <span className="text-[10px] text-zinc-500 uppercase">Disk Reads</span>
              <span className="text-xs font-bold text-white font-mono mt-0.5">
                {isRunning ? (isOptimized ? "50 pages" : "1.2M pages") : "0"}
              </span>
            </div>

            {/* Play trigger button */}
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className={`h-full w-full rounded-xl flex items-center justify-center gap-1.5 font-bold text-xs uppercase tracking-wider transition-colors ${
                isRunning
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-black cursor-pointer shadow-lg shadow-cyan-500/10"
              }`}
            >
              <Play className="h-4.5 w-4.5 fill-black" /> Run Query
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
