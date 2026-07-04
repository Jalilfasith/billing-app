import React, { useState } from "react";
import { 
  Eye, 
  EyeOff, 
  Lock, 
  User, 
  ArrowRight, 
  Shield, 
  Check, 
  Menu, 
  X, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Activity, 
  Layers, 
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage({ onLogin }) {
  // Navigation & Landing state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // Login credentials state
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

  // Authorized credentials
  const VALID_USER = "jamilgroups";
  const VALID_PASS = "Jaffanbanu@1981";

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!userId.trim() || !password.trim()) {
      setError("Please enter both User ID and Password.");
      triggerShake();
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (userId.trim() === VALID_USER && password === VALID_PASS) {
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
    setTimeout(() => setShake(false), 500);
  };



  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-slate-100 overflow-x-hidden font-sans select-none select-text">
      
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[140px]" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-brand-secondary/80 rounded-full blur-[160px] opacity-10" />
        <div className="absolute bottom-[10%] left-[5%] w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[150px]" />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px"
          }}
        />
      </div>

      {/* ─── STICKY GLASS NAVBAR ─── */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#0B0F19]/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-br from-brand-primary via-brand-accent to-brand-secondary p-2 rounded-xl text-white font-extrabold text-sm shadow-lg shadow-brand-primary/20">
              JG
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-white text-sm sm:text-base">Jamil Groups</span>
              <span className="text-[9px] text-brand-secondary font-bold tracking-wider block leading-none">BILLING PORTAL</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-350">
            <a href="#features" className="hover:text-white transition-colors relative group py-2">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-secondary group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#preview" className="hover:text-white transition-colors relative group py-2">
              Dashboard Preview
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-secondary group-hover:w-full transition-all duration-300" />
            </a>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="hidden sm:inline-flex text-xs font-bold text-slate-300 hover:text-white transition"
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="btn-premium-gradient text-xs px-5 py-2.5 flex items-center gap-1.5 shadow-md shadow-brand-primary/20 cursor-pointer"
            >
              Get Started <ArrowRight size={14} />
            </button>
            
            {/* Hamburger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-white/5 bg-[#0B0F19] overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4 text-sm font-medium text-slate-300">
                <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white py-1">Features</a>
                <a href="#preview" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white py-1">Dashboard Preview</a>
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); setIsLoginOpen(true); }}
                  className="w-full text-center py-2.5 rounded-lg border border-white/10 hover:bg-white/5"
                >
                  Sign In
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-[calc(100vh-64px)] max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 pt-12 pb-24 z-10">
        
        {/* Left column info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-primary/25 bg-brand-primary/5 text-brand-secondary text-[11px] font-bold tracking-wider uppercase leading-none">
            <Sparkles size={12} className="text-brand-secondary" /> Fintech billing excellence
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
            GST-Compliant Invoicing <br />
            <span className="text-gradient-primary">Built For Enterprise.</span>
          </h1>
          
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
            Issue tax invoices instantly with real-time A4 visual generation. Rest assured with automated splits for IGST, CGST, and SGST based on place-of-supply registries.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="btn-premium-gradient text-xs px-6 py-3.5 flex items-center gap-2 cursor-pointer shadow-lg shadow-brand-primary/10"
            >
              <Zap size={15} /> Open Billing Console
            </button>
            <a 
              href="#preview" 
              className="btn-cyber-outline text-xs px-6 py-3.5 flex items-center gap-1.5"
            >
              Explore Live Mockups
            </a>
          </div>

          <div className="flex items-center gap-6 pt-4 text-xs text-slate-500 font-semibold border-t border-white/5 w-fit">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-500" /> Secure Encryption
            </div>
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-brand-secondary" /> 99.99% Guaranteed Uptime
            </div>
          </div>
        </motion.div>

        {/* Right column: Animated Mockup Dashboard */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex-1 w-full relative max-w-xl"
        >
          {/* Main dashboard frame */}
          <div className="card-glass border-white/10 p-6 shadow-2xl relative overflow-hidden bg-slate-950/45">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] text-slate-500 font-mono">https://portal.jamilgroups.com/desk</span>
            </div>

            {/* Dashboard metrics preview */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-4 rounded-xl border border-white/5 bg-white/3 backdrop-blur-md">
                <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Total Sales</span>
                <span className="text-lg font-black text-white font-mono mt-1 block">₹45,39,120</span>
                <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-0.5 mt-1.5"><TrendingUp size={10} /> +12.4%</span>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-white/3 backdrop-blur-md">
                <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Outstanding Collections</span>
                <span className="text-lg font-black text-brand-secondary font-mono mt-1 block">₹6,88,400</span>
                <span className="text-[9px] text-amber-500 font-bold block mt-1.5">3 Clients Overdue</span>
              </div>
            </div>

            {/* Simulated Chart */}
            <div className="p-4 rounded-xl border border-white/5 bg-white/3 backdrop-blur-md h-36 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Revenue Stream</span>
                <span className="text-[8px] bg-brand-primary/20 text-brand-secondary px-2 py-0.5 rounded-full font-bold">LIVE</span>
              </div>
              
              {/* Fake SVG Chart line */}
              <svg className="w-full h-16 mt-2 overflow-visible" viewBox="0 0 100 40">
                <defs>
                  <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 0 35 Q 20 20, 40 28 T 80 10 T 100 5 L 100 40 L 0 40 Z" fill="url(#glowGrad)" />
                <path d="M 0 35 Q 20 20, 40 28 T 80 10 T 100 5" fill="none" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="100" cy="5" r="2.5" fill="#06B6D4" className="animate-ping" />
                <circle cx="100" cy="5" r="1.5" fill="#0B0F19" stroke="#06B6D4" strokeWidth="1" />
              </svg>
            </div>
          </div>

          {/* Floating card widgets */}
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 w-44 p-4 rounded-2xl border border-white/10 bg-slate-950/70 shadow-2xl backdrop-blur-xl pointer-events-none"
          >
            <div className="flex items-center gap-2 text-brand-secondary font-bold text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>INVOICE ISSUED</span>
            </div>
            <p className="text-xs font-black mt-1 font-mono text-white">#JM-9428-A</p>
            <div className="flex justify-between items-center text-[9px] text-slate-500 mt-2">
              <span>GSTIN Split</span>
              <span className="font-semibold text-slate-350">18% Rate</span>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 w-48 p-4 rounded-2xl border border-white/10 bg-slate-950/70 shadow-2xl backdrop-blur-xl pointer-events-none"
          >
            <span className="text-[8px] text-slate-500 uppercase tracking-wider block">Customer Registry</span>
            <p className="text-xs font-bold text-white mt-0.5">JEHIS ONLINE MARKETING</p>
            <div className="flex items-center gap-1.5 mt-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-extrabold text-[8px] px-2 py-0.5 rounded w-fit uppercase">
              ✓ State Code 33 TN
            </div>
          </motion.div>
        </motion.div>

      </section>

      {/* ─── FEATURES GRID ─── */}
      <section id="features" className="py-24 border-t border-white/5 bg-[#080B12]/80 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-brand-secondary text-xs font-bold uppercase tracking-widest">Architectural Pillars</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Engineered for Rapid Tax Accounting</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every detail is tailored to provide visual clarity, lightning load speeds, and error-proof GST configurations.
            </p>
          </div>

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="card-glass border-white/5 p-6 space-y-4 hover:border-brand-primary/30 hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-accent">
                <Zap size={18} />
              </div>
              <h3 className="text-base font-extrabold text-white">Real-Time Invoicing</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                As you type product rates or quantities, watch the formal A4 printable billing sheet scale and layout values live instantly.
              </p>
            </div>

            {/* Card 2 */}
            <div className="card-glass border-white/5 p-6 space-y-4 hover:border-brand-secondary/30 hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center text-brand-secondary">
                <Layers size={18} />
              </div>
              <h3 className="text-base font-extrabold text-white">Automated Splits</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Seamless checks verify customer place-of-supply state codes against company registration to allocate CGST, SGST, or IGST tax pools.
              </p>
            </div>

            {/* Card 3 */}
            <div className="card-glass border-white/5 p-6 space-y-4 hover:border-brand-accent/30 hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
                <FileText size={18} />
              </div>
              <h3 className="text-base font-extrabold text-white">Export & Backup</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Export the entire system database in one single-click JSON backup, ready to import on any browser or system instantly.
              </p>
            </div>

            {/* Card 4 */}
            <div className="card-glass border-white/5 p-6 space-y-4 hover:border-emerald-500/30 hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck size={18} />
              </div>
              <h3 className="text-base font-extrabold text-white">Secure Local Storage</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Protected and self-contained sandbox. All logs, client lists, settings, and secrets remain securely in your local storage.
              </p>
            </div>

          </div>

          {/* Stat counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 mt-16 border-t border-white/5">
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono block">₹4.5Cr+</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mt-1">Total Bills Generated</span>
            </div>
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono block">99.99%</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mt-1">Uptime SLA</span>
            </div>
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono block">1.2s</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mt-1">A4 Render Speed</span>
            </div>
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono block">100%</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mt-1">GST Audit Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTERACTIVE DASHBOARD PREVIEW ─── */}
      <section id="preview" className="py-24 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            <div className="flex-1 space-y-6">
              <span className="text-brand-secondary text-xs font-bold uppercase tracking-widest">Interactive Console</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Full-Fidelity Premium Dashboard</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Log in to access the high-performance workspace layout. Swap between analytics trackers, invoicing grids, customer catalogs, and global backup settings in a single unified system.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-primary/20 text-brand-secondary flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} />
                  </div>
                  <div>
                    <span className="font-bold text-white text-sm block">Robust Safe Loader</span>
                    <span className="text-slate-400 text-xs">Self-repairing database guards files from corrupt or conflict states during boot.</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-primary/20 text-brand-secondary flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} />
                  </div>
                  <div>
                    <span className="font-bold text-white text-sm block">A4 Document Print Outfits</span>
                    <span className="text-slate-400 text-xs">Formatted templates hide screen control elements to export beautiful physical tax slips.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Mockup Grid preview */}
            <div className="flex-1 w-full">
              <div className="card-glass border-white/5 bg-slate-950/20 p-6 space-y-6 relative">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="text-brand-secondary" size={16} />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Workspace Analytics Preview</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Dashboard Preview Mode</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 border border-white/5 bg-white/2 rounded-xl text-center">
                    <span className="text-[8px] text-slate-500 uppercase font-bold tracking-wider">Active Customers</span>
                    <span className="text-sm font-black text-white block mt-1">42</span>
                  </div>
                  <div className="p-3 border border-white/5 bg-white/2 rounded-xl text-center">
                    <span className="text-[8px] text-slate-500 uppercase font-bold tracking-wider">Products Registered</span>
                    <span className="text-sm font-black text-white block mt-1">118</span>
                  </div>
                  <div className="p-3 border border-white/5 bg-white/2 rounded-xl text-center">
                    <span className="text-[8px] text-slate-500 uppercase font-bold tracking-wider">Total Sales (IN)</span>
                    <span className="text-sm font-black text-white block mt-1">₹45.3L</span>
                  </div>
                </div>

                {/* Table Mockup inside Preview */}
                <div className="border border-white/5 rounded-xl overflow-hidden bg-slate-950/30">
                  <div className="p-3 bg-white/2 border-b border-white/5 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <span>Recent Activity</span>
                    <span className="text-brand-secondary font-bold">Live Status</span>
                  </div>
                  <div className="divide-y divide-white/5 text-[11px]">
                    <div className="p-3 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-white">#JM-0419-B</p>
                        <p className="text-[9px] text-slate-500">JEHIS ONLINE MARKETING</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-bold text-[8px] uppercase tracking-wider">Paid</span>
                    </div>
                    <div className="p-3 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-white">#JM-0418-A</p>
                        <p className="text-[9px] text-slate-500">THE UNIT OF JAMIL GROUPS</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/25 font-bold text-[8px] uppercase tracking-wider">Unpaid</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── FOOTER SECTION ─── */}
      <footer className="border-t border-white/5 bg-[#080B12] py-16 relative z-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-brand-primary to-brand-secondary p-1.5 rounded-lg text-white font-extrabold text-[11px]">
                JG
              </div>
              <span className="font-extrabold text-white text-sm">Jamil Groups</span>
            </div>
            <p className="leading-relaxed">
              Safe, fast, and compliant GST Invoicing SaaS designed to streamline merchant billing routines.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[10px]">Product Desk</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#features" className="hover:text-white transition">Features Sheet</a></li>
              <li><a href="#preview" className="hover:text-white transition">Live Dashboard Mockup</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[10px]">Security & Legal</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition">Data Local Encryption</a></li>
              <li><a href="#" className="hover:text-white transition">GST Audit Rules</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[10px]">Newsletter</h4>
            <p className="leading-relaxed">Get the latest feature release briefings in your inbox.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="input-premium py-2 px-3 text-xs w-full bg-slate-950" 
              />
              <button className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold px-3.5 rounded-xl flex items-center justify-center transition">
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Jamil Groups. All rights reserved. Made for premium merchant operations.</p>
          <div className="flex gap-4 text-slate-400">
            <a href="#" className="hover:text-white transition">LinkedIn</a>
            <a href="#" className="hover:text-white transition">Twitter</a>
            <a href="#" className="hover:text-white transition">GitHub</a>
          </div>
        </div>
      </footer>

      {/* ─── GLASSMORPHISM LOGIN MODAL ─── */}
      <AnimatePresence>
        {isLoginOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Modal Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLoginOpen(false)}
              className="absolute inset-0 bg-[#070A13]/80 backdrop-blur-md cursor-pointer"
            />
            
            {/* Modal Card content */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className={`relative z-10 w-full max-w-md ${shake ? "animate-shake" : ""}`}
            >
              {/* Glow Accent Border Line */}
              <div className="h-1 w-full bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary rounded-t-3xl" />
              
              <div className="bg-[#0D1220]/90 backdrop-blur-2xl border border-white/10 rounded-b-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                
                {/* Modal close icon */}
                <button 
                  onClick={() => setIsLoginOpen(false)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-white p-1 rounded-lg"
                >
                  <X size={18} />
                </button>

                {/* Brand Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-accent rounded-2xl shadow-lg shadow-brand-primary/25 mb-4">
                    <span className="text-white font-black text-xl tracking-wider">JG</span>
                  </div>
                  <h2 className="text-2xl font-black text-white tracking-tight leading-tight">
                    Welcome Back
                  </h2>
                  <p className="text-slate-400 text-xs font-semibold tracking-widest uppercase mt-1.5">
                    GST Billing Console Gateway
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 mb-6 py-2 px-4 bg-emerald-500/5 border border-emerald-500/15 rounded-xl mx-auto w-fit">
                  <Shield size={13} className="text-emerald-400" />
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest leading-none">
                    Secured Access
                  </span>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLoginSubmit} className="space-y-5">
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
                        className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-secondary/60 focus:ring-2 focus:ring-brand-secondary/10 transition-all duration-300"
                      />
                    </div>
                  </div>

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
                        className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl py-3.5 pl-11 pr-12 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-secondary/60 focus:ring-2 focus:ring-brand-secondary/10 transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-350 transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Error Notification */}
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 py-2.5 px-4 bg-rose-500/10 border border-rose-500/20 rounded-xl"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 animate-pulse" />
                      <p className="text-rose-400 text-xs font-bold">{error}</p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    id="login-submit"
                    type="submit"
                    disabled={isLoading}
                    className="w-full relative bg-gradient-to-r from-brand-primary to-brand-accent hover:from-brand-primary/90 hover:to-brand-accent/90 text-white font-extrabold text-sm uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-brand-primary/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 overflow-hidden group"
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
                  </button>
                </form>

                <div className="mt-8 pt-5 border-t border-white/5 text-center text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  © 2026 Jamil Groups — Authorized Access Only
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Shake style definition (Modal error visual feedback) */}
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
