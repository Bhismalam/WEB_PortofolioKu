'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, KeyRound, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { ConstellationBackground } from '@/components/public/ConstellationBackground';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate Auth / Supabase auth check
    setTimeout(() => {
      setLoading(false);
      // Save session in localStorage for demo
      localStorage.setItem('admin_authenticated', 'true');
      router.push('/admin/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <ConstellationBackground />

      <div className="relative z-10 w-full max-w-md">
        
        {/* Top Logo Badge */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 p-[2px] shadow-xl shadow-violet-900/50 mb-3">
            <div className="w-full h-full bg-[#0a0015] rounded-[14px] flex items-center justify-center">
              <Lock className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Dashboard <span className="gradient-text-purple">Admin CMS</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1 font-mono-tech">
            Akses internal khusus pengelola portofolio
          </p>
        </div>

        {/* Login Glass Card */}
        <div className="glass-card rounded-3xl p-8 border border-white/15 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-mono-tech text-gray-300 mb-2">
                Email Admin
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input 
                  type="email" 
                  required
                  placeholder="admin@bhisma.dev"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono-tech text-gray-300 mb-2">
                Password / Secure Passkey
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-violet-700/30 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Authenticating...
                </span>
              ) : (
                <>
                  <span>Masuk ke CMS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Note */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-mono-tech border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" /> Demo Admin Access Granted
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
