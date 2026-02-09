"use client";

import { useEffect, useState, useRef } from "react";
import { Clock, Layers, HardDrive, Link2, FolderSync, Database } from "lucide-react";

const FEATURES = [
  {
    icon: Clock,
    title: "Scheduled backups",
    description: "Set it and forget it. Cron-based scheduling runs jobs automatically on your terms.",
  },
  {
    icon: Layers,
    title: "Snapshot history",
    description: "Time Machine-style timeline. Browse any previous backup version and see exactly what changed.",
  },
  {
    icon: HardDrive,
    title: "File restore",
    description: "Point-in-time recovery for any file or directory. Select a snapshot and restore in one click.",
  },
  {
    icon: Link2,
    title: "Hard-link dedup",
    description: "Only changed files use disk space. Identical files are hard-linked across snapshots, saving 99%+ storage.",
  },
  {
    icon: FolderSync,
    title: "Multi-job support",
    description: "Separate backup jobs for different directories. Each job has its own schedule, destination, and history.",
  },
  {
    icon: Database,
    title: "SQLite tracking",
    description: "All metadata stored in a local SQLite database. Fast queries, no external dependencies, fully offline.",
  },
];

export function FeatureGrid() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="py-20 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-2xl md:text-3xl font-bold tracking-tight mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Built for reliability
          </h2>
          <p
            className="text-sm max-w-lg mx-auto"
            style={{ fontFamily: 'var(--mono)', color: 'var(--text-tertiary)', lineHeight: 1.7 }}
          >
            rsync under the hood. A clean interface on top. Everything stored locally.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-lg border p-5 transition-all duration-500 hover:border-[var(--border-highlight)]"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--bg-card)',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(16px)',
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center mb-3"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}
                >
                  <Icon size={16} style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
