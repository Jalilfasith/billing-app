import React from "react";
import { 
  TrendingUp, 
  FileText, 
  Users, 
  Percent, 
  AlertTriangle, 
  Plus, 
  Building, 
  Package, 
  ArrowRight,
  CheckCircle2,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { calculateInvoice } from "../utils/calculations";


export default function Dashboard({ 
  invoices, 
  customers, 
  _products, 
  company, 
  setView, 
  setSelectedInvoiceId 
}) {
  // Compute dashboard metrics
  const calculatedInvoices = Array.isArray(invoices) ? invoices.map(inv => {
    const calc = calculateInvoice(inv, company);
    return { ...inv, ...calc };
  }) : [];

  const totalRevenue = calculatedInvoices.reduce((sum, inv) => sum + (inv?.finalTotal || 0), 0);
  const totalInvoices = calculatedInvoices.length;
  const totalGst = calculatedInvoices.reduce((sum, inv) => sum + (inv?.totalTax || 0), 0);
  const activeCustomersCount = Array.isArray(customers) ? customers.length : 0;
  
  const totalPaid = calculatedInvoices.reduce((sum, inv) => sum + (Number(inv.receivedAmount) || 0), 0);
  const totalOutstanding = totalRevenue - totalPaid;

  // Recent 5 invoices
  const recentInvoices = [...calculatedInvoices]
    .sort((a, b) => new Date(b.invoiceDate) - new Date(a.invoiceDate))
    .slice(0, 5);

  // SVG Area Chart points (for mock months Jan - Jun)
  const monthlyData = [
    { month: "Jan", revenue: 15000, gst: 2700 },
    { month: "Feb", revenue: 22000, gst: 3960 },
    { month: "Mar", revenue: 18000, gst: 3240 },
    { month: "Apr", revenue: 32000, gst: 5760 },
    { month: "May", revenue: 28000, gst: 5040 },
    { month: "Jun", revenue: totalRevenue > 0 ? totalRevenue : 41300, gst: totalGst > 0 ? totalGst : 6300 },
  ];

  const maxVal = Math.max(...monthlyData.map(d => d.revenue)) * 1.15;
  const chartHeight = 160;
  const chartWidth = 500;
  
  const points = monthlyData.map((d, index) => {
    const x = (index / (monthlyData.length - 1)) * chartWidth;
    const y = chartHeight - (d.revenue / maxVal) * chartHeight;
    return `${x},${y}`;
  }).join(" ");

  const areaPoints = `0,${chartHeight} ${points} ${chartWidth},${chartHeight}`;

  // Framer Motion presets
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        staggerChildren: 0.08 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 sm:space-y-6 pb-6 z-10 relative"
    >
      {/* Welcome Banner */}
      <motion.div 
        variants={itemVariants}
        className="card-glass p-8 relative overflow-hidden bg-slate-950/20"
      >
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none transform translate-x-12 -translate-y-6">
          <Building size={280} className="text-brand-secondary" />
        </div>
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-brand-secondary/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-brand-accent/5 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="relative z-10 space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            {company?.name || "THE UNIT OF JAMIL GROUPS"}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl font-medium">
            GST Accounts Dashboard — manage invoices, track collections, and configure products.
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3 pt-1">
            <button 
              onClick={() => setView("create-invoice")} 
              className="btn-premium-gradient px-4 sm:px-6 py-2.5 sm:py-3 text-xs tracking-wider font-extrabold flex items-center gap-2 cursor-pointer"
            >
              <Plus size={15} /> Issue Invoice
            </button>
            <button 
              onClick={() => setView("company")} 
              className="btn-cyber-outline hover:text-white font-extrabold px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-2 text-xs"
            >
              <Building size={15} className="text-brand-secondary" /> Settings
            </button>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4"
      >
        {/* Sales */}
        <div className="card-glass card-glass-hover p-4 sm:p-5 flex items-center justify-between col-span-2 sm:col-span-1">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Sales</span>
            <h3 className="text-base sm:text-lg font-black text-white mt-1 font-mono tracking-tight">₹{totalRevenue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</h3>
            <span className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-1.5 font-extrabold">
              <TrendingUp size={11} /> +12.4%
            </span>
          </div>
          <div className="bg-brand-primary/10 border border-brand-primary/20 text-brand-secondary p-2.5 rounded-xl shadow-lg shrink-0">
            <TrendingUp size={18} />
          </div>
        </div>

        {/* Invoices */}
        <div className="card-glass card-glass-hover p-4 sm:p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Invoices</span>
            <h3 className="text-base sm:text-lg font-black text-white mt-1 font-mono">{totalInvoices}</h3>
            <span className="text-[9px] text-slate-400 font-semibold tracking-wide uppercase mt-1.5 block">Issued</span>
          </div>
          <div className="bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary p-2.5 rounded-xl shadow-lg shrink-0">
            <FileText size={18} />
          </div>
        </div>

        {/* GST */}
        <div className="card-glass card-glass-hover p-4 sm:p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">GST Tax</span>
            <h3 className="text-base sm:text-lg font-black text-white mt-1 font-mono">₹{totalGst.toLocaleString("en-IN", { minimumFractionDigits: 0 })}</h3>
            <span className="text-[9px] text-slate-400 font-semibold tracking-wide uppercase mt-1.5 block">Collected</span>
          </div>
          <div className="bg-brand-accent/10 border border-brand-accent/20 text-brand-accent p-2.5 rounded-xl shadow-lg shrink-0">
            <Percent size={18} />
          </div>
        </div>

        {/* Customers */}
        <div className="card-glass card-glass-hover p-4 sm:p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Clients</span>
            <h3 className="text-base sm:text-lg font-black text-white mt-1">{activeCustomersCount}</h3>
            <span className="text-[9px] text-slate-400 font-semibold tracking-wide uppercase mt-1.5 block">Active</span>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-2.5 rounded-xl shadow-lg shrink-0">
            <Users size={18} />
          </div>
        </div>

        {/* Outstanding */}
        <div className="card-glass card-glass-hover p-4 sm:p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pending</span>
            <h3 className="text-base sm:text-lg font-black text-amber-500 mt-1 font-mono">₹{totalOutstanding.toLocaleString("en-IN", { minimumFractionDigits: 0 })}</h3>
            <span className="text-[10px] text-amber-500 flex items-center gap-0.5 mt-1.5 font-extrabold">
              <AlertTriangle size={10} className="shrink-0" /> Unpaid
            </span>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-2.5 rounded-xl shadow-lg shrink-0">
            <AlertTriangle size={18} />
          </div>
        </div>
      </motion.div>

      {/* Analytics Charts and Quick Panel */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        {/* Sales Chart (SVG) */}
        <div className="card-glass p-4 sm:p-6 lg:col-span-2 bg-slate-950/20">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="font-extrabold text-white text-sm sm:text-base">Monthly Sales Performance</h3>
            <span className="text-[9px] bg-slate-900 border border-white/5 text-brand-secondary px-3 py-1 rounded-full font-bold uppercase tracking-wider">Metrics</span>
          </div>
          <div className="w-full overflow-x-auto">
            <div style={{ minWidth: '280px' }}>
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-36 sm:h-48 overflow-visible">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1={chartHeight * 0.25} x2={chartWidth} y2={chartHeight * 0.25} stroke="#1e293b" strokeOpacity="0.3" strokeDasharray="3 3" />
                <line x1="0" y1={chartHeight * 0.5} x2={chartWidth} y2={chartHeight * 0.5} stroke="#1e293b" strokeOpacity="0.3" strokeDasharray="3 3" />
                <line x1="0" y1={chartHeight * 0.75} x2={chartWidth} y2={chartHeight * 0.75} stroke="#1e293b" strokeOpacity="0.3" strokeDasharray="3 3" />
                <polygon points={areaPoints} fill="url(#chartGradient)" />
                <polyline points={points} fill="none" stroke="#06B6D4" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                {monthlyData.map((d, index) => {
                  const x = (index / (monthlyData.length - 1)) * chartWidth;
                  const y = chartHeight - (d.revenue / maxVal) * chartHeight;
                  return (
                    <g key={index}>
                      <circle cx={x} cy={y} r="5.5" fill="#0B0F19" stroke="#06B6D4" strokeWidth="3" />
                      <text x={x} y={chartHeight + 16} fill="#94a3b8" fontSize="9.5" fontWeight="bold" textAnchor="middle">{d.month}</text>
                      <text x={x} y={y - 12} fill="#f8fafc" fontSize="9.5" fontWeight="bold" textAnchor="middle">₹{(d.revenue / 1000).toFixed(0)}k</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Quick Tools & Shortcuts */}
        <div className="card-glass p-4 sm:p-6 flex flex-col justify-between bg-slate-950/20">
          <div>
            <h3 className="font-extrabold text-white text-sm sm:text-base mb-3 border-b border-white/5 pb-2">Quick Navigation</h3>
            <div className="space-y-2.5">
              <button 
                onClick={() => setView("customers")} 
                className="w-full flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/2 hover:border-brand-secondary/40 hover:bg-brand-secondary/5 transition text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-500/10 text-emerald-400 p-2 rounded-xl border border-emerald-500/20">
                    <Users size={15} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-200 text-xs">Customer Database</p>
                    <p className="text-[10px] text-slate-500">Search and configure client records</p>
                  </div>
                </div>
                <ArrowRight size={13} className="text-slate-500 group-hover:text-brand-secondary transition shrink-0" />
              </button>

              <button 
                onClick={() => setView("products")} 
                className="w-full flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/2 hover:border-brand-secondary/40 hover:bg-brand-secondary/5 transition text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-brand-primary/10 text-brand-secondary p-2 rounded-xl border border-brand-primary/20">
                    <Package size={15} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-200 text-xs">Product Catalog</p>
                    <p className="text-[10px] text-slate-500">Set base prices and GST thresholds</p>
                  </div>
                </div>
                <ArrowRight size={13} className="text-slate-500 group-hover:text-brand-secondary transition shrink-0" />
              </button>

              <button 
                onClick={() => setView("history")} 
                className="w-full flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/2 hover:border-brand-secondary/40 hover:bg-brand-secondary/5 transition text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-brand-accent/10 text-brand-accent p-2 rounded-xl border border-brand-accent/20">
                    <FileText size={15} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-200 text-xs">Invoice Logs</p>
                    <p className="text-[10px] text-slate-500">Reprint and audit previous logs</p>
                  </div>
                </div>
                <ArrowRight size={13} className="text-slate-500 group-hover:text-brand-secondary transition shrink-0" />
              </button>
            </div>
          </div>
          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-4">
            <span>State Code: 33 (TN)</span>
            <span>Portal v1.0.0</span>
          </div>
        </div>
      </motion.div>


      {/* Recent Activity Invoices — Card list on mobile, table on desktop */}
      <motion.div 
        variants={itemVariants}
        className="card-glass overflow-hidden bg-slate-950/20"
      >
        <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between bg-slate-950/35">
          <h3 className="font-extrabold text-white text-sm sm:text-base">Recent Tax Invoices</h3>
          <button 
            onClick={() => setView("history")}
            className="text-brand-secondary hover:text-white text-xs font-bold flex items-center gap-1.5 group transition duration-300 uppercase tracking-wider"
          >
            View All <ArrowRight size={13} className="transform group-hover:translate-x-0.5 transition" />
          </button>
        </div>

        {/* Mobile: card list */}
        <div className="sm:hidden divide-y divide-white/5">
          {recentInvoices.length > 0 ? recentInvoices.map(inv => {
            const customer = customers.find(c => c.id === inv.customerId) || inv.customerDetails || {};
            const isFullyPaid = Number(inv.receivedAmount) >= (inv.finalTotal || 0);
            const isPartiallyPaid = Number(inv.receivedAmount) > 0 && !isFullyPaid;
            return (
              <div key={inv.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black text-white font-mono text-sm">{inv.invoiceNo}</span>
                  {isFullyPaid ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                      <CheckCircle2 size={9} /> Paid
                    </span>
                  ) : isPartiallyPaid ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/25">
                      <Clock size={9} /> Partial
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/25">
                      <Clock size={9} /> Unpaid
                    </span>
                  )}
                </div>
                <p className="text-slate-300 text-xs font-semibold">{customer?.name || "Unknown Customer"}</p>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-[11px]">{new Date(inv.invoiceDate).toLocaleDateString("en-IN")}</span>
                  <span className="font-black text-white font-mono text-sm">₹{(inv.finalTotal || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                </div>
                <button
                  onClick={() => { setSelectedInvoiceId(inv.id); setView("invoice-preview"); }}
                  className="w-full mt-1 bg-slate-900 border border-white/5 hover:border-brand-secondary hover:bg-brand-secondary/5 text-slate-300 font-extrabold py-2 rounded-xl text-[10px] transition uppercase tracking-wider"
                >
                  View Bill
                </button>
              </div>
            );
          }) : (
            <div className="p-6 text-center text-slate-500 text-xs">No invoices yet. Tap "Issue Invoice" to begin.</div>
          )}
        </div>

        {/* Desktop: full table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950/40 border-b border-white/5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="px-5 py-4">Invoice No</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">GST</th>
                <th className="px-5 py-4 text-center">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300 text-[13px]">
              {recentInvoices.length > 0 ? (
                recentInvoices.map(inv => {
                  const customer = customers.find(c => c.id === inv.customerId) || inv.customerDetails || {};
                  const isFullyPaid = Number(inv.receivedAmount) >= (inv.finalTotal || 0);
                  const isPartiallyPaid = Number(inv.receivedAmount) > 0 && !isFullyPaid;
                  return (
                    <tr key={inv.id} className="hover:bg-white/2 transition duration-300">
                      <td className="px-5 py-4 font-bold text-white font-mono text-sm">{inv.invoiceNo}</td>
                      <td className="px-5 py-4 font-bold text-slate-200">{customer?.name || "Unknown Customer"}</td>
                      <td className="px-5 py-4 font-medium text-slate-400">{new Date(inv.invoiceDate).toLocaleDateString("en-IN")}</td>
                      <td className="px-5 py-4 font-black text-white font-mono">₹{(inv.finalTotal || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                      <td className="px-5 py-4 font-mono font-semibold text-brand-secondary">₹{(inv.totalTax || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                      <td className="px-5 py-4 text-center">
                        {isFullyPaid ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                            <CheckCircle2 size={10} /> Paid
                          </span>
                        ) : isPartiallyPaid ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/25">
                            <Clock size={10} /> Partial
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/25">
                            <Clock size={10} /> Unpaid
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => { setSelectedInvoiceId(inv.id); setView("invoice-preview"); }}
                          className="bg-slate-900 border border-white/5 hover:border-brand-secondary hover:bg-brand-secondary/5 hover:text-white text-slate-300 font-extrabold px-4 py-2 rounded-xl text-[10px] transition uppercase tracking-wider"
                        >
                          View Bill
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-5 py-8 text-center text-slate-500">
                    No invoices generated yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}

