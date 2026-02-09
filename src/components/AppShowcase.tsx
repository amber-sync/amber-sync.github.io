"use client";

import { useEffect, useState, useRef } from "react";

const JOBS = [
  { name: "Documents", source: "~/Documents", dest: "/Volumes/Backup", snapshots: 847, lastRun: "2 min ago", status: "idle" as const, size: "48.2 GB" },
  { name: "Projects", source: "~/Projects", dest: "/mnt/nas/backups", snapshots: 312, lastRun: "Running…", status: "running" as const, size: "12.7 GB" },
  { name: "Photos", source: "~/Pictures", dest: "/Volumes/External", snapshots: 156, lastRun: "3 hrs ago", status: "idle" as const, size: "234.1 GB" },
];

const SIDEBAR_ITEMS = [
  { label: "Dashboard", active: true },
  { label: "Time Machine", active: false },
  { label: "Restore", active: false },
  { label: "Settings", active: false },
];

export function AppShowcase() {
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
    <section className="py-20 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div
          className="rounded-xl border overflow-hidden transition-all duration-700"
          style={{
            borderColor: visible ? 'var(--border-highlight)' : 'var(--border)',
            background: 'var(--bg-secondary)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            boxShadow: '0 24px 80px -16px rgba(0,0,0,0.6)',
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 border-b"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-tertiary)' }}
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
            </div>
            <span className="text-xs ml-2" style={{ fontFamily: 'var(--mono)', color: 'var(--text-muted)' }}>
              Amber
            </span>
          </div>

          {/* App body */}
          <div className="flex min-h-[420px]">
            {/* Sidebar */}
            <div
              className="hidden sm:flex flex-col w-48 border-r py-3 shrink-0"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-primary)' }}
            >
              {SIDEBAR_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="px-4 py-2 text-xs cursor-default"
                  style={{
                    fontFamily: 'var(--mono)',
                    color: item.active ? 'var(--text-primary)' : 'var(--text-muted)',
                    background: item.active ? 'var(--bg-tertiary)' : 'transparent',
                    borderLeft: item.active ? '2px solid var(--accent)' : '2px solid transparent',
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="flex-1 p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Backup Jobs</div>
                  <div className="text-xs mt-0.5" style={{ fontFamily: 'var(--mono)', color: 'var(--text-muted)' }}>3 jobs · 295.0 GB tracked</div>
                </div>
                <div
                  className="px-3 py-1.5 rounded text-xs font-medium"
                  style={{ background: 'var(--accent)', color: 'var(--bg-primary)' }}
                >
                  + New Job
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {JOBS.map((job, i) => (
                  <div
                    key={job.name}
                    className="rounded-lg border p-4 transition-all duration-500"
                    style={{
                      borderColor: 'var(--border)',
                      background: 'var(--bg-card)',
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(12px)',
                      transitionDelay: `${300 + i * 150}ms`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: job.status === 'running' ? 'var(--blue)' : 'var(--green)',
                            boxShadow: job.status === 'running' ? '0 0 8px var(--blue)' : 'none',
                          }}
                        />
                        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                          {job.name}
                        </span>
                      </div>
                      <span className="text-xs" style={{ fontFamily: 'var(--mono)', color: job.status === 'running' ? 'var(--blue)' : 'var(--text-muted)' }}>
                        {job.lastRun}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs" style={{ fontFamily: 'var(--mono)', color: 'var(--text-tertiary)' }}>
                      <span>{job.source} → {job.dest}</span>
                    </div>

                    <div className="flex items-center gap-4 mt-2 text-xs" style={{ fontFamily: 'var(--mono)', color: 'var(--text-muted)' }}>
                      <span>{job.snapshots} snapshots</span>
                      <span>·</span>
                      <span>{job.size}</span>
                    </div>

                    {job.status === 'running' && (
                      <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: '62%',
                            background: 'var(--blue)',
                            transition: 'width 2s ease',
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-center mt-6 text-xs" style={{ fontFamily: 'var(--mono)', color: 'var(--text-muted)' }}>
          Dashboard — manage multiple backup jobs with real-time status
        </p>
      </div>
    </section>
  );
}
