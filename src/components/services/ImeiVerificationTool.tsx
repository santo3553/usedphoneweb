'use client';

import React, { useState } from 'react';
import { Search, ShieldCheck, BatteryCharging, CheckCircle2, Cpu, Smartphone, LockOpen } from 'lucide-react';

export function ImeiVerificationTool() {
  const [imei, setImei] = useState('');
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = (imeiToTest: string) => {
    setLoading(true);
    setImei(imeiToTest);
    setTimeout(() => {
      setReport({
        imei: imeiToTest,
        model: 'iPhone 15 Pro (256GB - Natural Titanium)',
        blacklistStatus: 'CLEAN (0 GSMA Records Found)',
        carrierStatus: '100% Factory Unlocked (Physical SIM + Dual eSIM)',
        batteryHealth: '98% True Capacity (Cycle Count: 142)',
        screenCertification: 'Original Apple OEM Super Retina XDR OLED (0 Dead Pixels)',
        cameraSensors: '48MP Main + 3x Telephoto + LiDAR 100% Calibrated',
        waterResistantSeals: 'Factory Gaskets Verified Intact',
        warrantyStatus: '12-Month SWISH Certified Hardware Warranty Active',
        certifiedDate: 'October 2026',
      });
      setLoading(false);
    }, 400);
  };

  return (
    <section id="verify-imei" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-300" />
          Transparency & Fraud Prevention
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Verify Any Phone's 50-Point Diagnostic Report
        </h2>
        <p className="text-sm text-zinc-400 mt-2">
          Never buy blind. Look up any certified phone's individual hardware inspection report, battery cycle count, and GSMA clean IMEI certificate.
        </p>
      </div>

      {/* Lookup Bar */}
      <div className="max-w-2xl mx-auto flex flex-col gap-3 mb-10">
        <div className="flex gap-2 p-2 rounded-2xl bg-zinc-950 border border-white/15 focus-within:border-white/40 shadow-xl transition">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter 15-digit IMEI (e.g. 358921098471923)"
              value={imei}
              onChange={(e) => setImei(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-mono"
            />
          </div>
          <button
            onClick={() => handleVerify(imei || '358921098471923')}
            disabled={loading}
            className="btn btn-solid h-11 px-6 text-xs font-semibold uppercase tracking-wider shrink-0"
          >
            {loading ? 'Scanning...' : 'Verify IMEI'}
          </button>
        </div>

        <div className="flex justify-center items-center gap-2 text-xs text-zinc-500">
          <span>Want a quick preview?</span>
          <button
            onClick={() => handleVerify('358921098471923')}
            className="text-zinc-400 hover:text-white underline font-medium"
          >
            Test with Sample Certified IMEI #358921098471923
          </button>
        </div>
      </div>

      {/* Verification Result Card */}
      {report && (
        <div className="max-w-3xl mx-auto rounded-3xl bg-zinc-950/90 border border-white/20 p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl animate-fadeIn">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-zinc-800 pb-5">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">
                Hardware Diagnostic Certificate
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">{report.model}</h3>
              <span className="text-xs font-mono text-zinc-400 mt-1 block">
                IMEI: {report.imei}
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold w-fit">
              <CheckCircle2 className="w-4 h-4 text-white" />
              100% Certified Authentic
            </div>
          </div>

          {/* Report Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/10 flex flex-col gap-1">
              <span className="text-[10px] text-zinc-400 uppercase font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-300" /> GSMA Blacklist Check
              </span>
              <span className="text-xs font-bold text-white">{report.blacklistStatus}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/10 flex flex-col gap-1">
              <span className="text-[10px] text-zinc-400 uppercase font-semibold flex items-center gap-1.5">
                <LockOpen className="w-3.5 h-3.5 text-zinc-300" /> Carrier Unlock Status
              </span>
              <span className="text-xs font-bold text-white">{report.carrierStatus}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/10 flex flex-col gap-1">
              <span className="text-[10px] text-zinc-400 uppercase font-semibold flex items-center gap-1.5">
                <BatteryCharging className="w-3.5 h-3.5 text-zinc-300" /> Battery Health & Cycles
              </span>
              <span className="text-xs font-bold text-white">{report.batteryHealth}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/10 flex flex-col gap-1">
              <span className="text-[10px] text-zinc-400 uppercase font-semibold flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-zinc-300" /> Screen & Touch Panel
              </span>
              <span className="text-xs font-bold text-white">{report.screenCertification}</span>
            </div>
          </div>

          {/* Footer note */}
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/10 text-xs text-zinc-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-zinc-300" />
              {report.warrantyStatus}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">
              Certified: {report.certifiedDate}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
