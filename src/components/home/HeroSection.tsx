'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
      {/* Vesper Horizontal Metallic Badge */}
      <div className="badge-vesper">
        <svg
          className="w-4 h-4 fill-white shrink-0 drop-shadow-[0_0_3px_rgba(255,255,255,0.45)]"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
        </svg>
        <span>Certified Used Smartphone Infrastructure</span>
      </div>

      {/* Main Title with Instrument Serif Italic Accent */}
      <h1 className="text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tight text-white max-w-5xl leading-[1.08]">
        Certified Used Flagships.<br />
        <span className="font-serif-italic text-[#9a9a9a] text-[1.08em] tracking-normal">
          100% Real Photos.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-6 text-base sm:text-lg text-[#9a9a9a] max-w-xl font-normal leading-relaxed">
        Save up to <strong className="text-white font-medium">50% off retail</strong> on certified second-hand iPhones & Galaxies. 
        Zero stock mockups. What you inspect in high-resolution photography is the exact serialized unit shipped to your door.
      </p>

      {/* CTAs with Liquid-Glass Language */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
        <Link
          href="/catalog"
          className="btn btn-solid h-11 px-6 text-sm font-semibold shadow-xl flex items-center justify-center gap-2"
        >
          Explore Certified Phones
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="#verify-imei"
          className="btn btn-ghost h-11 px-6 text-sm font-semibold flex items-center justify-center gap-2"
        >
          Verify Phone IMEI
        </Link>
      </div>

      {/* Stats Bar with Exact Vesper Monochrome SVGs */}
      <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6 w-full max-w-5xl pt-8 border-t border-white/10 text-[#d8d8d8]">
        {/* Stat 1: 50-Point Diagnostic */}
        <div className="inline-flex items-center gap-3.5 text-xs sm:text-sm tracking-tight text-zinc-300">
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient id="pillGradL" x1="3" y1="2" x2="14" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#3a3a3a" stopOpacity="0.62" />
              </linearGradient>
              <linearGradient id="pillGradR" x1="3" y1="2" x2="14" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3a3a3a" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.62" />
              </linearGradient>
            </defs>
            <rect x="3.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#pillGradL)" />
            <rect x="13.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#pillGradR)" />
            <rect x="9.2" y="10.9" width="5.6" height="2.2" rx="1.1" fill="#4a4a4a" />
          </svg>
          <span>50-Point Hardware Diagnostics Automated</span>
        </div>

        {/* Stat 2: 90%+ Battery Health */}
        <div className="inline-flex items-center gap-3.5 text-xs sm:text-sm tracking-tight text-zinc-300">
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="6.2" fill="#ffffff" />
            <path d="M12 7.1v7.4" stroke="#111111" strokeWidth="1.85" strokeLinecap="round" fill="none" />
            <path
              d="M8.15 12.35L12 16.2l3.85-3.85"
              stroke="#111111"
              strokeWidth="1.85"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span>90%+ Battery Health Guaranteed</span>
        </div>

        {/* Stat 3: 1-Year Warranty / Avatars */}
        <div className="inline-flex items-center gap-3.5 text-xs sm:text-sm tracking-tight text-zinc-300">
          <svg className="w-9 h-5 shrink-0" viewBox="0 0 40 22" aria-hidden="true">
            <circle cx="10.2" cy="11" r="9.2" fill="#2b2b2b" />
            <polygon points="6.8,4.5 9,2.8 9.5,5.5" fill="#2b2b2b" />
            <polygon points="13.6,4.5 11.4,2.8 10.9,5.5" fill="#2b2b2b" />
            <ellipse cx="10.2" cy="12.1" rx="4.15" ry="3.7" fill="#f4f4f4" />
            <circle cx="8.9" cy="11.5" r="0.7" fill="#1a1a1a" />
            <circle cx="11.5" cy="11.5" r="0.7" fill="#1a1a1a" />
            <circle cx="20.2" cy="11" r="9.2" fill="#ffffff" />
            <circle cx="18.4" cy="9.8" r="1.7" fill="#000000" />
            <circle cx="22" cy="9.8" r="1.7" fill="#000000" />
            <ellipse cx="20.2" cy="11.8" rx="1.1" ry="0.8" fill="#000000" />
            <path d="M18.6 13.5c.8.9 2.4.9 3.2 0" stroke="#111" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            <circle cx="30.2" cy="11" r="9.2" fill="#f26b1d" />
            <text x="30.2" y="15.1" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="12.5" fill="#ffffff" textAnchor="middle">
              e
            </text>
          </svg>
          <span>1-Year Certified Warranty Included</span>
        </div>
      </div>
    </section>
  );
}
