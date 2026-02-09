import Link from "next/link";
import { APP_VERSION } from "@/lib/version";

const NAV = [
  { label: "Overview", href: "#overview" },
  { label: "Features", href: "#features" },
  { label: "Installation", href: "#installation" },
  { label: "Architecture", href: "#architecture" },
];

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code style={{ fontFamily: 'var(--mono)', fontSize: '0.8em', background: 'var(--bg-code)', border: '1px solid var(--border)', padding: '1px 5px', borderRadius: 3, color: 'var(--link)' }}>
      {children}
    </code>
  );
}

function Pre({ children }: { children: string }) {
  const lines = children.split('\n');
  const minIndent = lines
    .filter(l => l.trim().length > 0)
    .reduce((min, l) => Math.min(min, l.match(/^(\s*)/)?.[1].length ?? 0), Infinity);
  const dedented = lines.map(l => l.slice(minIndent)).join('\n').trim();
  return (
    <pre style={{ fontFamily: 'var(--mono)', fontSize: '13px', lineHeight: 1.7, background: 'var(--bg-code)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px', overflowX: 'auto', color: 'var(--fg-dim)', marginBottom: 20 }}>
      <code>{dedented}</code>
    </pre>
  );
}

export default function Home() {
  return (
    <div style={{ fontFamily: 'var(--sans)' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg)', backdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/" style={{ fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 600, color: 'var(--fg)', letterSpacing: '-0.02em' }}>
              amber
            </Link>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--fg-ghost)' }}>
              {APP_VERSION}
            </span>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Link href="https://github.com/amber-sync/amber" target="_blank" style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--fg-faint)' }}>
              github
            </Link>
            <Link href="https://github.com/amber-sync/amber/releases" target="_blank" style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--fg-faint)' }}>
              releases
            </Link>
          </nav>
        </div>
      </header>

      {/* Layout: sidebar + content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 64 }}>

        {/* Sidebar */}
        <aside className="hidden lg:block" style={{ width: 160, flexShrink: 0, paddingTop: 48, position: 'sticky', top: 48, height: 'fit-content' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--fg-faint)', padding: '3px 0', display: 'block' }}
              >
                {item.label}
              </Link>
            ))}
            <div style={{ borderTop: '1px solid var(--border)', marginTop: 12, paddingTop: 12 }}>
              <Link href="https://github.com/amber-sync/amber" target="_blank" style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--fg-ghost)', display: 'block', padding: '3px 0' }}>
                GitHub
              </Link>
              <Link href="https://github.com/amber-sync/amber/releases" target="_blank" style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--fg-ghost)', display: 'block', padding: '3px 0' }}>
                Releases
              </Link>
              <Link href="https://github.com/amber-sync/amber/blob/main/LICENSE" target="_blank" style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--fg-ghost)', display: 'block', padding: '3px 0' }}>
                MIT License
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, minWidth: 0, paddingTop: 48, paddingBottom: 96 }}>

          {/* Title block */}
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 12 }}>
              Amber
            </h1>
            <p style={{ color: 'var(--fg-dim)', fontSize: 15, lineHeight: 1.7, maxWidth: 560 }}>
              A native backup application powered by rsync. Incremental snapshots with hard-link deduplication, scheduled jobs, visual snapshot history, and point-in-time file restore. Built with Tauri and Rust.
            </p>
            <div style={{ display: 'flex', gap: 16, marginTop: 20, fontFamily: 'var(--mono)', fontSize: 12 }}>
              <Link href="https://github.com/amber-sync/amber/releases" target="_blank" style={{ color: 'var(--link)' }}>
                Download v{APP_VERSION}
              </Link>
              <Link href="https://github.com/amber-sync/amber" target="_blank" style={{ color: 'var(--fg-faint)' }}>
                Source code
              </Link>
            </div>
          </div>

          {/* Overview */}
          <section id="overview">
            <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid var(--border)', marginTop: 32 }}>
              Overview
            </h2>
            <p style={{ color: 'var(--fg-dim)', lineHeight: 1.75, marginBottom: 16 }}>
              Amber wraps <Code>rsync</Code> in a desktop application with a GUI for managing backup jobs. Each backup creates a timestamped snapshot directory. Unchanged files are hard-linked to the previous snapshot, so only modified files consume additional disk space.
            </p>
            <p style={{ color: 'var(--fg-dim)', lineHeight: 1.75, marginBottom: 16 }}>
              The application tracks all snapshot metadata in a local SQLite database. There are no external services, no accounts, and no network dependencies. Everything runs locally.
            </p>
            <Pre>{`# What rsync does under the hood for each snapshot
rsync -avz --delete \\
  --link-dest=../2025-02-08-143000 \\
  ~/Documents/ \\
  /Volumes/Backup/2025-02-09-143000/`}</Pre>
            <p style={{ color: 'var(--fg-dim)', lineHeight: 1.75, marginBottom: 16 }}>
              The <Code>--link-dest</Code> flag is the key mechanism. It tells rsync to hard-link identical files from the previous snapshot rather than copying them. A typical incremental backup of 50 GB of source data transfers only the changed files while the full snapshot directory appears to contain everything.
            </p>
          </section>

          {/* Features */}
          <section id="features">
            <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid var(--border)', marginTop: 48 }}>
              Features
            </h2>
            <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginTop: 20 }}>
              {[
                { title: "Incremental snapshots", desc: "Each backup is a full directory tree. Unchanged files are hard-linked to the previous version. Only changed data is transferred and stored." },
                { title: "Scheduled jobs", desc: "Cron-based scheduling. Set intervals per job. Backups run automatically in the background." },
                { title: "Snapshot timeline", desc: "Browse all snapshots on a visual timeline. Navigate to any point in time and inspect the file tree as it existed then." },
                { title: "File restore", desc: "Restore individual files or entire directories from any snapshot. Preview changes before restoring." },
                { title: "Multi-job support", desc: "Configure separate backup jobs for different source directories. Each job has its own schedule, destination, and retention policy." },
                { title: "SQLite metadata", desc: "All snapshot and file metadata is stored in a local SQLite database. Fast queries for large file trees. No external dependencies." },
                { title: "Custom rsync flags", desc: "Full control over rsync arguments. Add exclusion patterns, compression flags, bandwidth limits, or any other rsync option." },
                { title: "Safety checks", desc: "Destination validation with marker files. Backups abort if the destination is unreachable or the marker is missing." },
              ].map((f) => (
                <div key={f.title}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', marginBottom: 6 }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--fg-faint)', lineHeight: 1.7 }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Installation */}
          <section id="installation">
            <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid var(--border)', marginTop: 48 }}>
              Installation
            </h2>
            <p style={{ color: 'var(--fg-dim)', lineHeight: 1.75, marginBottom: 16 }}>
              Download the latest release from GitHub. Amber requires <Code>rsync</Code> to be installed on your system (included by default on macOS and most Linux distributions).
            </p>

            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 10, marginTop: 24, color: 'var(--fg)' }}>
              macOS
            </h3>
            <Pre>{`# Download the .dmg from GitHub releases
open https://github.com/amber-sync/amber/releases/latest

# Or build from source
git clone https://github.com/amber-sync/amber.git
cd amber
npm install
npm run build`}</Pre>

            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 10, marginTop: 24, color: 'var(--fg)' }}>
              Linux
            </h3>
            <Pre>{`# Download the .AppImage from GitHub releases
# Or build from source (requires Rust toolchain)
git clone https://github.com/amber-sync/amber.git
cd amber
npm install
npm run build`}</Pre>

            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 10, marginTop: 24, color: 'var(--fg)' }}>
              Build requirements
            </h3>
            <Pre>{`Node.js >= 20
Rust >= 1.77
rsync (system)`}</Pre>
          </section>

          {/* Architecture */}
          <section id="architecture">
            <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid var(--border)', marginTop: 48 }}>
              Architecture
            </h2>
            <p style={{ color: 'var(--fg-dim)', lineHeight: 1.75, marginBottom: 16 }}>
              Amber is a <Link href="https://v2.tauri.app" target="_blank">Tauri v2</Link> application. The backend is Rust, the frontend is React with TypeScript, and they communicate through Tauri&apos;s IPC command system.
            </p>

            <Pre>{`amber/
  src/              # React frontend
    components/     # UI components
    features/       # Feature modules (dashboard, restore, timemachine)
    api/            # Tauri IPC client
    hooks/          # React hooks
    types/          # TypeScript types
  src-tauri/        # Rust backend
    src/
      commands/     # Tauri command handlers
      services/     # Business logic (rsync, snapshots, scheduler)
      types/        # Rust types
    tests/
    benches/        # Criterion benchmarks`}</Pre>

            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 10, marginTop: 24, color: 'var(--fg)' }}>
              How snapshots work
            </h3>
            <p style={{ color: 'var(--fg-dim)', lineHeight: 1.75, marginBottom: 16 }}>
              Each snapshot is a directory named with a timestamp (e.g., <Code>2025-02-09-143000</Code>). Rsync copies the source directory into this new snapshot, using <Code>--link-dest</Code> to reference the previous snapshot. Files that haven&apos;t changed get hard-linked rather than copied.
            </p>
            <p style={{ color: 'var(--fg-dim)', lineHeight: 1.75, marginBottom: 16 }}>
              The result: every snapshot appears to be a complete copy of your files, but only the deltas use real disk space. Deleting an old snapshot doesn&apos;t affect newer ones because the hard links maintain reference counts.
            </p>

            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 10, marginTop: 24, color: 'var(--fg)' }}>
              Stack
            </h3>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--fg-dim)', lineHeight: 2 }}>
              <div><span style={{ color: 'var(--fg-ghost)', display: 'inline-block', width: 120 }}>Runtime</span> Tauri v2</div>
              <div><span style={{ color: 'var(--fg-ghost)', display: 'inline-block', width: 120 }}>Backend</span> Rust</div>
              <div><span style={{ color: 'var(--fg-ghost)', display: 'inline-block', width: 120 }}>Frontend</span> React 19, TypeScript</div>
              <div><span style={{ color: 'var(--fg-ghost)', display: 'inline-block', width: 120 }}>Sync engine</span> rsync</div>
              <div><span style={{ color: 'var(--fg-ghost)', display: 'inline-block', width: 120 }}>Database</span> SQLite</div>
              <div><span style={{ color: 'var(--fg-ghost)', display: 'inline-block', width: 120 }}>Bundler</span> Vite</div>
              <div><span style={{ color: 'var(--fg-ghost)', display: 'inline-block', width: 120 }}>License</span> MIT</div>
            </div>
          </section>

          {/* Footer */}
          <footer style={{ marginTop: 80, paddingTop: 20, borderTop: '1px solid var(--border)', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--fg-ghost)', display: 'flex', gap: 20 }}>
            <span>amber v{APP_VERSION}</span>
            <Link href="https://github.com/amber-sync/amber" target="_blank" style={{ color: 'var(--fg-ghost)' }}>github</Link>
            <Link href="https://github.com/amber-sync/amber/blob/main/LICENSE" target="_blank" style={{ color: 'var(--fg-ghost)' }}>mit license</Link>
          </footer>
        </main>
      </div>
    </div>
  );
}
