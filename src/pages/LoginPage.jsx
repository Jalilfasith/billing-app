import React, { useState } from "react";
import { Eye, EyeOff, Lock, User, ArrowRight, Shield } from "lucide-react";

/**
 * Premium Login Page for Jamil Groups Billing Portal.
 * Validates credentials against stored user data.
 */
export default function LoginPage({ onLogin }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

  // Authorized credentials (hashed comparison in production)
  const VALID_USER = "jamilgroups";
  const VALID_PASS = "Jaffanbanu@1981";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!userId.trim() || !password.trim()) {
      setError("Please enter both User ID and Password.");
      triggerShake();
      return;
    }

    setIsLoading(true);

    // Simulate a brief network delay for premium feel
    setTimeout(() => {
      if (userId.trim() === VALID_USER && password === VALID_PASS) {
        // Save session
        localStorage.setItem("jg_auth", JSON.stringify({
          user: VALID_USER,
          loggedInAt: new Date().toISOString()
        }));
        onLogin(true);
      } else {
        setError("Invalid User ID or Password. Please try again.");
        triggerShake();
        setIsLoading(false);
      }
    }, 800);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      {/* Login Card */}
      <div className={`relative z-10 w-full max-w-md mx-4 ${shake ? "animate-shake" : ""}`}>
        {/* Top accent line */}
        <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 rounded-t-2xl" />

        <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-b-2xl shadow-2xl shadow-black/40 p-8 sm:p-10">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-2xl shadow-lg shadow-emerald-500/25 mb-4">
              <span className="text-white font-black text-xl tracking-wider">JG</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Jamil Groups
            </h1>
            <p className="text-slate-400 text-xs font-semibold tracking-widest uppercase mt-1.5">
              GST Billing Portal
            </p>
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 mb-6 py-2 px-4 bg-emerald-500/5 border border-emerald-500/15 rounded-xl mx-auto w-fit">
            <Shield size={13} className="text-emerald-400" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              Secured Access
            </span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* User ID Field */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.15em] mb-2">
                User ID
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <User size={16} />
                </div>
                <input
                  id="login-userid"
                  type="text"
                  value={userId}
                  onChange={(e) => { setUserId(e.target.value); setError(""); }}
                  placeholder="Enter your User ID"
                  autoComplete="username"
                  className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-300"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.15em] mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Lock size={16} />
                </div>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl py-3.5 pl-11 pr-12 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 py-2.5 px-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 animate-pulse" />
                <p className="text-rose-400 text-xs font-bold">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              id="login-submit"
              type="submit"
              disabled={isLoading}
              className="w-full relative bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-extrabold text-sm uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 overflow-hidden group"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}

              {/* Shimmer effect */}
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-[100%] transition-all duration-700 ease-in-out" />
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-5 border-t border-slate-800/60 text-center">
            <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
              © 2026 Jamil Groups — All Rights Reserved
            </p>
            <p className="text-[9px] text-slate-600 mt-1 font-medium">
              Authorized Personnel Only
            </p>
          </div>
        </div>
      </div>

      {/* Shake animation style (injected inline for self-containment) */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
          20%, 40%, 60%, 80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
}
