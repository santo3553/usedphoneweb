'use client';

import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from '@/context/CartContext';
import { Navbar } from '@/components/store/Navbar';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { HologramTiltCard } from '@/components/ui/HologramTiltCard';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  BatteryCharging,
  ArrowRight,
  Smartphone,
  Camera,
} from 'lucide-react';

function CatalogContent() {
  const { items, setIsCartOpen } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');

  useEffect(() => {
    async function loadCatalog() {
      try {
        setLoading(true);
        const res = await fetch(`/api/products?brand=${selectedBrand}&condition=${selectedGrade}`);
        const data = await res.json();
        if (data.products) setProducts(data.products);
      } catch (err) {
        console.error('Failed to load products', err);
      } finally {
        setLoading(false);
      }
    }
    loadCatalog();
  }, [selectedBrand, selectedGrade]);

  const brands = ['all', 'Apple', 'Samsung', 'Google'];
  const grades = [
    { id: 'all', label: 'All Grades' },
    { id: 'PRISTINE', label: 'Pristine (Zero Blemish)' },
    { id: 'GOOD', label: 'Good (Minor Wear)' },
    { id: 'FAIR', label: 'Fair (Discount Deal)' },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Micro-grain overlay */}
      <div className="grain" aria-hidden="true" />
      {/* Ambient radial scrim */}
      <div className="hero-photo" aria-hidden="true" />

      <div className="relative z-10">
        <Navbar cartCount={items.length} onOpenCart={() => setIsCartOpen(true)} />
        <CartDrawer />

        <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="badge-vesper mb-3">
              <svg className="w-4 h-4 fill-white shrink-0 drop-shadow-[0_0_3px_rgba(255,255,255,0.45)]" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
              </svg>
              <span>Verified Pre-Owned Inventory</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-medium text-white tracking-tight">
              Certified Pre-Owned{' '}
              <span className="font-serif-italic text-[#9a9a9a] text-[1.08em]">Catalog</span>
            </h1>
            <p className="mt-2 text-zinc-400 text-sm sm:text-base max-w-2xl">
              Each smartphone is individually serialized, bench-tested, and photographed. Click any model to inspect high-resolution multi-angle photos and genuine diagnostic reports.
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center pb-8 mb-8 border-b border-white/10">
            {/* Brand Filter with Liquid-metal pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium capitalize transition-all shrink-0 ${
                    selectedBrand === b
                      ? 'btn-solid text-black font-semibold'
                      : 'nav-pill'
                  }`}
                >
                  {b === 'all' ? 'All Brands' : b}
                </button>
              ))}
            </div>

            {/* Grade Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 font-medium">Cosmetic Grade:</span>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 rounded-lg px-3 py-2 focus:outline-none focus:border-white/40 cursor-pointer"
              >
                {grades.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-96 rounded-2xl bg-zinc-950/40 border border-zinc-900 animate-pulse"
                />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center">
              <h3 className="text-lg font-bold text-white">No devices found matching filters</h3>
              <p className="text-xs text-zinc-400 mt-1">Try resetting the brand or grade filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((p) => {
                const inStockCount = p.inventoryItems?.length || 0;
                const minPrice =
                  p.inventoryItems?.length > 0
                    ? Math.min(...p.inventoryItems.map((i: any) => i.salePrice))
                    : p.basePrice;
                const maxBattery =
                  p.inventoryItems?.length > 0
                    ? Math.max(...p.inventoryItems.map((i: any) => i.batteryHealth))
                    : 98;

                // Extract actual photography
                const productPhotos: string[] = (() => {
                  try {
                    if (p.inventoryItems?.[0]?.imagesJson) {
                      const parsed = JSON.parse(p.inventoryItems[0].imagesJson);
                      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
                    }
                    if (p.imagesJson) {
                      const parsed = JSON.parse(p.imagesJson);
                      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
                    }
                  } catch {}
                  return [
                    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80',
                  ];
                })();

                const primaryPhoto = productPhotos[0];
                const photoCount = productPhotos.length;

                return (
                  <HologramTiltCard
                    key={p.id}
                    className="rounded-2xl bg-zinc-950/90 border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between overflow-hidden group shadow-xl"
                  >
                    {/* Top Header Card */}
                    <div className="p-6 pb-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
                          {p.brand}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-300 bg-zinc-900/80 px-2.5 py-1 rounded-full border border-white/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          {inStockCount} In Stock
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                        {p.modelName}
                      </h3>

                      <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    {/* Visual Preview Banner - Authentic Photography */}
                    <div className="relative h-56 w-full bg-gradient-to-b from-zinc-900/40 via-zinc-900/20 to-zinc-950 flex items-center justify-center overflow-hidden my-2 rounded-xl p-4">
                      <img
                        src={primaryPhoto}
                        alt={`${p.brand} ${p.modelName} certified unit`}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)] select-none"
                      />

                      {/* Actual Photos Count Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] text-zinc-300 font-medium shadow-md">
                        <Camera className="w-3 h-3 text-white" />
                        <span>{photoCount} Real {photoCount === 1 ? 'Photo' : 'Photos'}</span>
                      </div>

                      {/* Battery Health Badge */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-[10px] text-zinc-300 font-semibold shadow-sm">
                        <BatteryCharging className="w-3 h-3 text-emerald-400" />
                        Up to {maxBattery}% Battery
                      </div>
                    </div>

                    {/* Card Bottom / Actions */}
                    <div className="p-6 pt-2 border-t border-zinc-900 flex flex-col gap-4">
                      <div className="flex justify-between items-baseline">
                        <div>
                          <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                            Certified Starting at
                          </span>
                          <span className="text-2xl font-bold text-white">
                            ${minPrice.toFixed(2)}
                          </span>
                        </div>
                        <span className="text-xs text-zinc-400 flex items-center gap-1 font-semibold">
                          <ShieldCheck className="w-3.5 h-3.5 text-zinc-300" />
                          1-Yr Warranty
                        </span>
                      </div>

                      <Link
                        href={`/phones/${p.slug}`}
                        className="btn btn-solid w-full h-11 text-xs font-bold text-center flex items-center justify-center gap-2"
                      >
                        Inspect Photos & Select Grade
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </HologramTiltCard>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <CartProvider>
      <CatalogContent />
    </CartProvider>
  );
}
