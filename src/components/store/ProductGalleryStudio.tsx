'use client';

import React, { useState, useEffect } from 'react';
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  BatteryCharging,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface ProductGalleryStudioProps {
  images: string[];
  productName: string;
  brand: string;
  imeiOrSerial?: string;
  conditionGrade?: 'PRISTINE' | 'GOOD' | 'FAIR';
  batteryHealth?: number;
}

export function ProductGalleryStudio({
  images,
  productName,
  brand,
  imeiOrSerial,
  conditionGrade = 'PRISTINE',
  batteryHealth = 98,
}: ProductGalleryStudioProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Fallback if no images provided
  const photoList =
    images && images.length > 0
      ? images
      : [
          'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1695048065053-cfbb42981ce1?auto=format&fit=crop&w=1200&q=80',
        ];

  // Reset index if image list changes
  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % photoList.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + photoList.length) % photoList.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, photoList.length]);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % photoList.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + photoList.length) % photoList.length);
  };

  const gradeColors = {
    PRISTINE: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40',
    GOOD: 'border-blue-500/40 text-blue-400 bg-blue-950/40',
    FAIR: 'border-amber-500/40 text-amber-400 bg-amber-950/40',
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Studio Stage Header */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-[11px] font-bold text-zinc-300 uppercase tracking-wider shadow-sm">
            <Camera className="w-3.5 h-3.5 text-zinc-300" />
            <span>Actual Device Photos</span>
          </div>
          {imeiOrSerial && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 bg-zinc-900/80 px-2.5 py-1 rounded-full border border-white/10">
              IMEI: {imeiOrSerial}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${gradeColors[conditionGrade]}`}
          >
            {conditionGrade}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400 bg-zinc-900/80 px-2.5 py-1 rounded-full border border-white/10">
            <BatteryCharging className="w-3.5 h-3.5 text-zinc-300" />
            {batteryHealth}% Health
          </span>
        </div>
      </div>

      {/* Main Image Stage */}
      <div
        onClick={() => setIsLightboxOpen(true)}
        className="group relative w-full h-[400px] sm:h-[480px] lg:h-[520px] rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center overflow-hidden cursor-zoom-in shadow-2xl backdrop-blur-xl"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 bg-radial-at-c from-white/5 via-transparent to-transparent pointer-events-none" />

        {/* The Current Photo */}
        <img
          src={photoList[activeIndex]}
          alt={`${brand} ${productName} - Angle ${activeIndex + 1}`}
          className="max-w-[90%] max-h-[90%] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] group-hover:scale-[1.02] transition-transform duration-300 select-none"
        />

        {/* Prev & Next Floating Arrow Buttons */}
        {photoList.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 hover:border-white text-white flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-md shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 hover:border-white text-white flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-md shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Bottom Stage Overlay Pills */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-zinc-300 text-xs shadow-lg font-medium">
            <span>
              Photo {activeIndex + 1} of {photoList.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black/95 backdrop-blur-md border border-white/15 group-hover:border-white/40 text-zinc-300 group-hover:text-white text-xs shadow-lg transition-colors pointer-events-auto">
            <Maximize2 className="w-3.5 h-3.5 text-zinc-300" />
            <span className="hidden sm:inline">Click to Zoom Lightbox</span>
          </div>
        </div>
      </div>

      {/* Horizontal Filmstrip Thumbnails */}
      {photoList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-zinc-800">
          {photoList.map((imgUrl, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-zinc-900 border overflow-hidden transition-all duration-200 flex items-center justify-center p-1.5 ${
                  isActive
                    ? 'border-white ring-2 ring-white/30 shadow-lg scale-105'
                    : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-contain"
                />
                <span className="absolute bottom-1 right-1.5 text-[9px] font-mono px-1 rounded bg-black/80 text-zinc-400">
                  #{idx + 1}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Header */}
          <div
            className="w-full max-w-6xl flex items-center justify-between z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-white text-sm sm:text-base">
                {brand} {productName}
              </span>
              <span className="text-zinc-500 text-xs">|</span>
              <span className="text-xs text-zinc-400 font-mono">
                Actual Serialized Photography ({activeIndex + 1}/{photoList.length})
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Image Stage */}
          <div
            className="relative w-full max-w-5xl flex-1 flex items-center justify-center py-6"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photoList[activeIndex]}
              alt={`${brand} ${productName} full inspection`}
              className="max-w-full max-h-[80vh] object-contain select-none drop-shadow-2xl"
            />

            {/* Navigation Arrows */}
            {photoList.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-zinc-900/90 hover:bg-white hover:text-black border border-white/20 text-white flex items-center justify-center transition shadow-xl"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-zinc-900/90 hover:bg-white hover:text-black border border-white/20 text-white flex items-center justify-center transition shadow-xl"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Footer Thumbnails */}
          <div
            className="w-full max-w-2xl flex items-center justify-center gap-2 overflow-x-auto py-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {photoList.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`w-14 h-14 rounded-xl border overflow-hidden p-1 bg-zinc-900 transition ${
                  idx === activeIndex
                    ? 'border-white ring-2 ring-white/40'
                    : 'border-white/10 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
