'use client';

import React from 'react';
import { CartProvider, useCart } from '@/context/CartContext';
import { Navbar } from '@/components/store/Navbar';
import { HeroSection } from '@/components/home/HeroSection';
import { RefurbishedStandards } from '@/components/home/RefurbishedStandards';
import { ImeiVerificationTool } from '@/components/services/ImeiVerificationTool';
import { CustomerProtectionSuite } from '@/components/services/CustomerProtectionSuite';
import { CartDrawer } from '@/components/cart/CartDrawer';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

function HomeContent() {
  const { items, setIsCartOpen } = useCart();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Micro-grain noise overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Ambient Radial Scrim */}
      <div className="hero-photo" aria-hidden="true" />

      {/* Foreground Content */}
      <div className="relative z-10">
        {/* Global Navigation */}
        <Navbar cartCount={items.length} onOpenCart={() => setIsCartOpen(true)} />

        {/* Cart Drawer */}
        <CartDrawer />

        {/* Hero Section */}
        <HeroSection />

        {/* 50-Point Diagnostic Refurbished Standards */}
        <RefurbishedStandards />

        {/* Essential 2nd-Hand Service 2: Live IMEI Diagnostic Report Verification */}
        <ImeiVerificationTool />

        {/* Essential 2nd-Hand Service 3: 1-Year Warranty Claim & Buyer FAQ */}
        <CustomerProtectionSuite />

        {/* Catalog Banner CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-3xl bg-zinc-950/80 border border-zinc-800/80 p-8 sm:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col gap-3 max-w-xl">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-zinc-400" /> Ready to Upgrade?
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                Explore Every Available Certified Flagship
              </h3>
              <p className="text-sm text-zinc-400">
                Browse serialized units by verified battery health, cosmetic grades, and clean IMEI tracking numbers.
              </p>
            </div>

            <Link
              href="/catalog"
              className="btn btn-solid h-12 px-8 text-sm font-bold shadow-xl flex items-center gap-2 shrink-0"
            >
              Open Store Catalog
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-900 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-zinc-500 text-xs flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-300">SWISH Smartphones Inc.</span>
            <span>© 2026. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/track-order" className="hover:text-zinc-300 transition">
              Track Order
            </Link>
            <Link href="/catalog" className="hover:text-zinc-300 transition">
              Catalog
            </Link>
            <Link href="/#standards" className="hover:text-zinc-300 transition">
              Quality Standards
            </Link>
            <Link href="/#verify-imei" className="hover:text-zinc-300 transition">
              Verify IMEI
            </Link>
            <Link href="/admin" className="hover:text-zinc-300 transition">
              Staff Portal
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <CartProvider>
      <HomeContent />
    </CartProvider>
  );
}
