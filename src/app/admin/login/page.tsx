'use client';

import React, { useState } from 'react';
import { Lock, Mail, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@swishphones.com');
  const [password, setPassword] = useState('AdminPass123!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Success: Full window redirect guarantees session cookie is transmitted and Next.js router cache is refreshed
      const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
      const destination = params?.get('from') || '/admin';
      window.location.href = destination;
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Micro-grain noise overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Ambient Radial Scrim */}
      <div className="hero-photo" aria-hidden="true" />

      <div className="w-full max-w-md bg-zinc-950/80 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-white via-zinc-200 to-zinc-400 text-black font-black text-2xl flex items-center justify-center mx-auto shadow-lg mb-4">
            S
          </div>
          <h1 className="text-2xl font-black text-white">SWISH Staff Portal</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Secure inventory data entry & order fulfillment suite
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 mb-6">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-zinc-400 font-medium block mb-1.5">
              Authorized Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@swishphones.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-sm text-white focus:outline-none focus:border-white/40 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 font-medium block mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-sm text-white focus:outline-none focus:border-white/40 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-solid w-full mt-2 py-3.5 text-sm font-bold flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                <span>Authenticating & Entering...</span>
              </>
            ) : (
              'Authenticate & Sign In'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/80 text-[11px] text-zinc-400 border border-white/10">
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-300" />
            <span>Default Seed: admin@swishphones.com / AdminPass123!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
