"use client";

import { useEffect, useState, useRef } from "react";

const LINES = [
  { text: '$ amber sync "Documents Backup"', color: 'var(--text-secondary)', delay: 0 },
  { text: '', delay: 200 },
  { text: '  ● Connecting to /Volumes/Backup...', color: 'var(--blue)', delay: 400 },
  { text: '  ✓ Destination mounted', color: 'var(--green)', delay: 800 },
  { text: '', delay: 900 },
  { text: '  rsync -avz --delete --link-dest=../2025-02-08-143000 \\', color: 'var(--text-muted)', delay: 1000 },
  { text: '    ~/Documents/ /Volumes/Backup/2025-02-09-143000/', color: 'var(--text-muted)', delay: 1100 },
  { text: '', delay: 1200 },
  { text: '  sending incremental file list', color: 'var(--text-tertiary)', delay: 1400 },
  { text: '  projects/amber/src/main.rs', color: 'var(--text-secondary)', delay: 1600 },
  { text: '  projects/amber/Cargo.lock', color: 'var(--text-secondary)', delay: 1700 },
  { text: '  documents/notes/meeting-2025-02-09.md', color: 'var(--text-secondary)', delay: 1900 },
  { text: '  photos/2025/february/IMG_4821.heic', color: 'var(--text-secondary)', delay: 2100 },
  { text: '', delay: 2300 },
  { text: '  sent 2.4 MB  received 312 bytes  total size 48.2 GB', color: 'var(--text-tertiary)', delay: 2500 },
  { text: '  speedup is 17,841.26 (hard links saved 99.7% disk space)', color: 'var(--accent)', delay: 2700 },
  { text: '', delay: 2900 },
  { text: '  ✓ Snapshot 2025-02-09-143000 created', color: 'var(--green)', delay: 3100 },
  { text: '  ✓ 4 files changed, 847 snapshots retained', color: 'var(--green)', delay: 3300 },
];

export function TerminalDemo() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const timers: NodeJS.Timeout[] = [];
    LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay));
    });
    return () => timers.forEach(clearTimeout);
  }, [hasStarted]);

  return (
    <section className="py-20 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <div
          className="rounded-lg border overflow-hidden"
          style={{ borderColor: 'var(--border-highlight)', background: 'var(--bg-secondary)' }}
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
              amber — sync
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-5 min-h-[380px]" style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', lineHeight: 1.8 }}>
            {LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i} style={{ color: line.color || 'var(--text-secondary)' }}>
                {line.text || '\u00A0'}
              </div>
            ))}
            {visibleLines < LINES.length && visibleLines > 0 && (
              <span className="cursor-blink" />
            )}
          </div>
        </div>

        <p className="text-center mt-6 text-xs" style={{ fontFamily: 'var(--mono)', color: 'var(--text-muted)' }}>
          What happens when you click &ldquo;Sync Now&rdquo; — hard links keep only changed files on disk
        </p>
      </div>
    </section>
  );
}
