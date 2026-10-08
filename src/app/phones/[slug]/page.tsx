'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CartProvider, useCart } from '@/context/CartContext';
import { Navbar } from '@/components/store/Navbar';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ProductGalleryStudio } from '@/components/store/ProductGalleryStudio';
import {
  Sparkles,
  ShieldCheck,
  BatteryCharging,
  Cpu,
  Layers,
  CheckCircle,
  ShoppingBag,
  ArrowLeft,
  Truck,
  RotateCcw,
} from 'lucide-react';
import Link from 'next/link';

function ProductDetailContent() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const { addItem, items, setIsCartOpen } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // User configuration state
  const [selectedGrade, setSelectedGrade] = useState<'PRISTINE' | 'GOOD' | 'FAIR'>('PRISTINE');
  const [selectedStorage, setSelectedStorage] = useState('256GB');
  const [activeUnit, setActiveUnit] = useState<any>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const res = await fetch(`/api/products?brand=all`);
        const data = await res.json();
        const found = data.products?.find((p: any) => p.slug === slug);
        if (found) {
          setProduct(found);
          // Set initial unit
          const unit =
            found.inventoryItems?.find((i: any) => i.conditionGrade === 'PRISTINE') ||
            found.inventoryItems?.[0];
          if (unit) {
            setActiveUnit(unit);
            setSelectedGrade(unit.conditionGrade);
            setSelectedStorage(unit.storage);
          }
        }
      } catch (err) {
        console.error('Failed to load product', err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  // When grade changes, find matching inventory unit
  const handleGradeChange = (grade: 'PRISTINE' | 'GOOD' | 'FAIR') => {
    setSelectedGrade(grade);
    if (product && product.inventoryItems) {
      const unit =
        product.inventoryItems.find((i: any) => i.conditionGrade === grade) ||
        product.inventoryItems[0];
      if (unit) setActiveUnit(unit);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    const price = activeUnit ? activeUnit.salePrice : product.basePrice;
    const battery = activeUnit ? activeUnit.batteryHealth : 95;

    addItem({
      id: activeUnit?.id || `${product.id}-${selectedGrade}`,
      productId: product.id,
      modelName: product.modelName,
      brand: product.brand,
      storage: selectedStorage,
      color: activeUnit?.color || 'Titanium Gray',
      conditionGrade: selectedGrade,
      price: price,
      batteryHealth: battery,
      imei: activeUnit?.imeiOrSerial || 'SER-PENDING-ALLOCATION',
    });

    setIsCartOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-white border-t-transparent animate-spin" />
          <span className="text-xs text-zinc-400">Loading certified device diagnostics...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold mb-2">Smartphone Not Found</h2>
        <p className="text-zinc-400 text-sm mb-6">
          The requested device serial or model is currently out of stock or relocated.
        </p>
        <Link
          href="/catalog"
          className="btn btn-solid px-6 py-2.5 text-xs font-semibold"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  // Parse specs
  let specs: any = {};
  try {
    specs = product.specsJson ? JSON.parse(product.specsJson) : {};
  } catch {}

  // Parse device photos
  let unitPhotos: string[] = [];
  try {
    if (activeUnit?.imagesJson) {
      const parsed = JSON.parse(activeUnit.imagesJson);
      if (Array.isArray(parsed) && parsed.length > 0) unitPhotos = parsed;
    }
    if (unitPhotos.length === 0 && product?.imagesJson) {
      const parsed = JSON.parse(product.imagesJson);
      if (Array.isArray(parsed) && parsed.length > 0) unitPhotos = parsed;
    }
  } catch {}

  const currentPrice = activeUnit ? activeUnit.salePrice : product.basePrice;
  const currentBattery = activeUnit ? activeUnit.batteryHealth : 98;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Micro-grain noise overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Ambient Radial Scrim */}
      <div className="hero-photo" aria-hidden="true" />

      <div className="relative z-10">
        <Navbar cartCount={items.length} onOpenCart={() => setIsCartOpen(true)} />
        <CartDrawer />

        <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Navigation Breadcrumb */}
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white mb-8 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all smartphones
          </Link>

          {/* Product Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Authentic Multi-Photo Studio & Lightbox */}
            <div className="lg:col-span-7 rounded-3xl bg-zinc-950/80 border border-white/10 p-6 flex flex-col items-center relative overflow-hidden backdrop-blur-xl">
              <ProductGalleryStudio
                images={unitPhotos}
                productName={product.modelName}
                brand={product.brand}
                imeiOrSerial={activeUnit?.imeiOrSerial}
                conditionGrade={selectedGrade}
                batteryHealth={currentBattery}
              />
            </div>

            {/* Right Column: Configuration & Purchase Box */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <span className="badge-vesper w-fit mb-2">
                  {product.brand}
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-white mt-2">
                  {product.modelName}
                </h1>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-3xl font-black text-white">
                    ${currentPrice.toFixed(2)}
                  </span>
                  <span className="text-xs text-zinc-500 line-through">
                    ${(currentPrice * 1.45).toFixed(2)} retail
                  </span>
                  <span className="text-xs font-semibold text-zinc-300 bg-white/10 border border-white/20 px-2 py-0.5 rounded">
                    Save ~30%
                  </span>
                </div>
              </div>

              {/* Refurbishment Health Metrics */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0">
                    <BatteryCharging className="w-5 h-5 text-zinc-300" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{currentBattery}% Battery</div>
                    <div className="text-[11px] text-zinc-400">Peak Performance</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-zinc-300" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">1-Year Warranty</div>
                    <div className="text-[11px] text-zinc-400">All Hardware Covered</div>
                  </div>
                </div>
              </div>

              {/* Condition Grade Selection */}
              <div>
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2.5 block">
                  Select Cosmetic Condition Grade
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    {
                      id: 'PRISTINE',
                      title: 'Pristine (Grade A+)',
                      desc: 'Zero scratches or flaws. Screen & back glass in 100% factory cosmetic condition.',
                    },
                    {
                      id: 'GOOD',
                      title: 'Good (Grade A)',
                      desc: 'Micro-scuffs on side bezel. Display completely spotless and pristine.',
                    },
                    {
                      id: 'FAIR',
                      title: 'Fair (Grade B)',
                      desc: 'Light visible surface wear on frame/corners. 100% tested internals.',
                    },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => handleGradeChange(g.id as any)}
                      className={`p-3.5 rounded-xl border text-left transition flex flex-col gap-1 ${
                        selectedGrade === g.id
                          ? 'border-white bg-white/10 ring-1 ring-white/30 text-white'
                          : 'border-white/10 bg-zinc-950/70 text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-white">{g.title}</span>
                        {selectedGrade === g.id && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400">{g.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage Selection */}
              <div>
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 block">
                  Internal Storage Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['128GB', '256GB', '512GB'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedStorage(s)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition ${
                        selectedStorage === s
                          ? 'border-white bg-white text-black'
                          : 'border-white/10 bg-zinc-950 text-zinc-400 hover:border-white/30'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart CTA */}
              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="btn btn-solid w-full py-4 px-6 text-sm font-bold flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5 text-current" />
                  Add to Cart — ${currentPrice.toFixed(2)}
                </button>

                <div className="flex justify-between items-center text-xs text-zinc-400 pt-2 px-1">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-zinc-400" /> Free Inspected Express Shipping
                  </span>
                  <span className="flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-zinc-400" /> 14-Day Free Returns
                  </span>
                </div>
              </div>

              {/* Hardware Diagnostic Summary */}
              <div className="border-t border-white/10 pt-6 flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Technical Specifications
              </h4>
              <div className="grid grid-cols-1 gap-2 text-xs">
                {specs.display && (
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-500">Display</span>
                    <span className="text-zinc-300 font-medium text-right max-w-xs">{specs.display}</span>
                  </div>
                )}
                {specs.chipset && (
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-500">Processor</span>
                    <span className="text-zinc-300 font-medium text-right">{specs.chipset}</span>
                  </div>
                )}
                {specs.camera && (
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-500">Camera</span>
                    <span className="text-zinc-300 font-medium text-right max-w-xs">{specs.camera}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
);
}

export default function ProductDetailPage() {
  return (
    <CartProvider>
      <ProductDetailContent />
    </CartProvider>
  );
}
