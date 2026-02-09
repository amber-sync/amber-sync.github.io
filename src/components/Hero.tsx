"use client";

import Link from "next/link";
import { Download, Github, ArrowRight } from "lucide-react";
import { APP_VERSION } from "@/lib/version";
import { useEffect, useState } from "react";

interface GitHubAsset {
  name: string;
  browser_download_url: string;
}

interface GitHubRelease {
  tag_name: string;
  assets: GitHubAsset[];
}

export function Hero() {
  const [downloadUrl, setDownloadUrl] = useState<string>(
    'https://github.com/amber-sync/amber/releases'
  );

  useEffect(() => {
    fetch('https://api.github.com/repos/amber-sync/amber/releases/latest', {
      headers: { 'Accept': 'application/vnd.github.v3+json' },
    })
      .then(res => {
        if (!res.ok) throw new Error('no release');
        return res.json();
      })
      .then((data: GitHubRelease) => {
        const asset = data.assets.find(a => a.name.endsWith('.dmg'))
          || data.assets.find(a => a.name.endsWith('.msi'))
          || data.assets.find(a => a.name.endsWith('.AppImage'))
          || data.assets[0];
        if (asset) setDownloadUrl(asset.browser_download_url);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden noise-bg">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex justify-center mb-8 fade-in-up fade-in-up-1">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border"
            style={{ fontFamily: 'var(--mono)', borderColor: 'var(--border-highlight)', color: 'var(--text-tertiary)', background: 'var(--bg-secondary)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--green)' }} />
            Open source · MIT Licensed
          </span>
        </div>

        <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 fade-in-up fade-in-up-2">
          <span style={{ color: 'var(--text-primary)' }}>Backups that</span>
          <br />
          <span style={{ color: 'var(--accent)' }}>just work.</span>
        </h1>

        <p className="text-center text-base md:text-lg max-w-xl mx-auto mb-10 fade-in-up fade-in-up-3" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Amber is a native backup app powered by rsync.
          Time Machine-style snapshots, scheduled jobs, visual history —
          all in a clean interface built with Tauri and Rust.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center fade-in-up fade-in-up-4">
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all hover:brightness-110 glow-amber"
            style={{ background: 'var(--accent)', color: 'var(--bg-primary)' }}
          >
            <Download size={16} />
            Download v{APP_VERSION}
          </a>
          <Link
            href="https://github.com/amber-sync/amber"
            target="_blank"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm border transition-colors"
            style={{ borderColor: 'var(--border-highlight)', color: 'var(--text-secondary)', background: 'var(--bg-secondary)' }}
          >
            <Github size={16} />
            View source
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-10 fade-in-up fade-in-up-5">
          {['Tauri v2', 'Rust', 'React 19', 'rsync', 'SQLite'].map(tech => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded text-xs"
              style={{ fontFamily: 'var(--mono)', color: 'var(--text-muted)', background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
