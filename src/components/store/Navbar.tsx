'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ShieldCheck, Sparkles, Search, UserCheck } from 'lucide-react';

interface NavbarProps {
  cartCount?: number;
  onOpenCart?: () => void;
}

export function Navbar({ cartCount = 0, onOpenCart }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo with Liquid Monochrome Styling */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-white via-zinc-200 to-zinc-400 text-black flex items-center justify-center font-black text-lg shadow-lg shadow-white/10 group-hover:scale-105 transition-transform">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              SWISH
              <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
            </span>
            <span className="text-[10px] text-zinc-400 font-medium tracking-wider uppercase -mt-1">
              Certified Used
            </span>
          </div>
        </Link>

        {/* Center Navigation in Liquid-metal Pills */}
        <nav className="hidden lg:flex items-center gap-2 text-sm font-medium">
          <Link href="/catalog" className="nav-pill">
            Shop Phones
          </Link>
          <Link href="/#standards" className="nav-pill">
            Diagnostic Standards
          </Link>
          <Link href="/#verify-imei" className="nav-pill">
            Verify IMEI
          </Link>
          <Link href="/#faq-support" className="nav-pill">
            Warranty & FAQ
          </Link>
          <Link href="/track-order" className="nav-pill">
            Track Order
          </Link>
        </nav>

        {/* Right CTA & Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/catalog"
            className="btn btn-solid h-9 px-3.5 text-xs font-semibold hidden sm:inline-flex"
          >
            <Search className="w-3.5 h-3.5 mr-1.5" />
            Find Phone
          </Link>

          <Link
            href="/admin"
            className="btn btn-ghost h-9 px-3 text-xs font-medium text-zinc-300 hover:text-white"
            title="Staff Portal"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden md:inline ml-1.5">Staff</span>
          </Link>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-white/30 text-zinc-200 hover:text-white transition group"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white text-black text-xs font-extrabold flex items-center justify-center shadow-lg">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
