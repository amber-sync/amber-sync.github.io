import Link from "next/link";
import { Github, Download, Star } from "lucide-react";
import { Hero } from "@/components/Hero";
import { AppShowcase } from "@/components/AppShowcase";
import { FeatureGrid } from "@/components/FeatureGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { APP_VERSION } from "@/lib/version";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--sans)' }}>
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b" style={{ borderColor: 'var(--border)', background: 'rgba(10, 11, 15, 0.85)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold" style={{ background: 'var(--accent)', color: 'var(--bg-primary)' }}>A</div>
            <span className="font-semibold text-sm tracking-tight" style={{ color: 'var(--text-primary)' }}>amber</span>
            <span className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ color: 'var(--text-tertiary)', background: 'var(--bg-tertiary)' }}>v{APP_VERSION}</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#how-it-works">How it works</NavLink>
            <NavLink href="/docs">Docs</NavLink>
            <Link
              href="https://github.com/amber-sync/amber"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Github size={15} />
              <span>GitHub</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow pt-14">
        <Hero />

        {/* Glow divider */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="glow-line" />
        </div>

        <AppShowcase />

        <FeatureGrid />

        <HowItWorks />

        {/* CTA */}
        <section className="py-32 px-6 text-center relative">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
              Ready to stop losing files?
            </h2>
            <p className="text-base mb-8" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--mono)' }}>
              Free. Open source. No account required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="https://github.com/amber-sync/amber/releases"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all hover:brightness-110"
                style={{ background: 'var(--accent)', color: 'var(--bg-primary)' }}
              >
                <Download size={16} />
                Download
              </Link>
              <Link
                href="https://github.com/amber-sync/amber"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm border transition-colors"
                style={{ borderColor: 'var(--border-highlight)', color: 'var(--text-secondary)' }}
              >
                <Star size={16} />
                Star on GitHub
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t px-6 py-8" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4" style={{ fontFamily: 'var(--mono)' }}>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>amber v{APP_VERSION}</span>
            <span style={{ color: 'var(--border)' }}>·</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>MIT License</span>
            <span style={{ color: 'var(--border)' }}>·</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Built with Tauri + Rust</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/amber-sync/amber" target="_blank" className="text-xs transition-colors" style={{ color: 'var(--text-tertiary)' }}>
              <Github size={16} />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm transition-colors hover:brightness-125" style={{ color: 'var(--text-tertiary)' }}>
      {children}
    </Link>
  );
}
