"use client";

import { useEffect, useState, useRef } from "react";

const STEPS = [
  {
    step: "01",
    title: "Configure",
    description: "Add backup jobs with source and destination paths. Set rsync flags, exclusion patterns, and retention rules.",
    code: "~/Documents → /Volumes/Backup",
  },
  {
    step: "02",
    title: "Schedule",
    description: "Run backups manually or set cron schedules. Each snapshot is incremental — only changed files are copied.",
    code: "0 */4 * * * # every 4 hours",
  },
  {
    step: "03",
    title: "Restore",
    description: "Browse the snapshot timeline, preview any version, and restore files or entire directories to any point in time.",
    code: "847 snapshots · 48.2 GB tracked",
  },
];

export function HowItWorks() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="py-20 px-6 relative" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-2xl md:text-3xl font-bold tracking-tight mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            How it works
          </h2>
          <p
            className="text-sm max-w-lg mx-auto"
            style={{ fontFamily: 'var(--mono)', color: 'var(--text-tertiary)', lineHeight: 1.7 }}
          >
            Three steps from install to automated backups with full version history.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {STEPS.map((step, i) => (
            <div
              key={step.step}
              className="flex flex-col sm:flex-row gap-5 rounded-lg border p-6 transition-all duration-500"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--bg-card)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-24px)',
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <div className="shrink-0">
                <span
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'var(--mono)', color: 'var(--accent)', opacity: 0.5 }}
                >
                  {step.step}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-tertiary)' }}>
                  {step.description}
                </p>
                <div
                  className="inline-block px-3 py-1.5 rounded text-xs"
                  style={{ fontFamily: 'var(--mono)', color: 'var(--text-muted)', background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}
                >
                  {step.code}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
