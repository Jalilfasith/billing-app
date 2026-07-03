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
import { calculateInvoice } from "../utils/calculations";
import GlassCard from "../components/ui/GlassCard.jsx";

export default function Dashboard({ 
  invoices, 
  customers, 
  products, 
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

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Banner */}
      <div className="bg-slate-950/40 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-800/80 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-5 pointer-events-none transform translate-x-12 -translate-y-6">
          <Building size={280} className="text-cyan-500" />
        </div>
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="relative z-10 space-y-3">
          <h2 className="text-3xl font-black text-white font-serif-invoice tracking-tight">
            {company?.name || "THE UNIT OF JAMIL GROUPS"}
          </h2>
          <p className="text-slate-350 text-sm leading-relaxed max-w-2xl font-medium">
            Futuristic GST Accounts Dashboard. Access and manage your tax configurations, build invoices with instant real-time live page rendering, and track outstanding collections.
          </p>
          <div className="flex flex-wrap gap-3 pt-3">
            <button 
              onClick={() => setView("create-invoice")} 
              className="btn-neon-cyan px-5 py-2.5 text-xs tracking-wider font-extrabold flex items-center gap-2 cursor-pointer"
            >
              <Plus size={16} /> Issue Tax Invoice
            </button>
            <button 
              onClick={() => setView("company")} 
              className="bg-slate-900/60 hover:bg-slate-850 text-slate-200 hover:text-white font-extrabold px-5 py-2.5 rounded-xl flex items-center gap-2 text-xs border border-slate-800 transition"
            >
              <Building size={16} className="text-cyan-400" /> Company Settings
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Sales */}
        <GlassCard className="flex items-center justify-between hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.12)]">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Sales</span>
            <h3 className="text-lg font-black text-white mt-1.5 font-mono tracking-tight text-shadow-[0_0_15px_rgba(255,255,255,0.2)]">₹{totalRevenue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</h3>
            <span className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-2 font-extrabold">
              <TrendingUp size={11} /> +12.4% vs last month
            </span>
          </div>
          <div className="bg-cyan-950/50 border border-cyan-800/45 text-cyan-400 p-2.5 rounded-xl shadow-lg shadow-cyan-500/10">
            <TrendingUp size={18} />
          </div>
        </GlassCard>

        {/* Invoices */}
        <GlassCard className="flex items-center justify-between hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.12)]">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Invoices</span>
            <h3 className="text-lg font-black text-white mt-1.5 font-mono">{totalInvoices} Issued</h3>
            <span className="text-[9px] text-slate-400 font-semibold tracking-wide uppercase mt-2 block">GST-compliant</span>
          </div>
          <div className="bg-blue-950/50 border border-blue-800/45 text-blue-400 p-2.5 rounded-xl shadow-lg shadow-blue-500/10">
            <FileText size={18} />
          </div>
        </GlassCard>

        {/* GST */}
        <GlassCard className="flex items-center justify-between hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.12)]">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">GST Tax</span>
            <h3 className="text-lg font-black text-white mt-1.5 font-mono">₹{totalGst.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</h3>
            <span className="text-[9px] text-slate-400 font-semibold tracking-wide uppercase mt-2 block">Tax breaks computed</span>
          </div>
          <div className="bg-purple-950/50 border border-purple-800/45 text-purple-400 p-2.5 rounded-xl shadow-lg shadow-purple-500/10">
            <Percent size={18} />
          </div>
        </GlassCard>

        {/* Customers */}
        <div className="card-glass-dark p-5 flex items-center justify-between hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.12)]">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Clients</span>
            <h3 className="text-lg font-black text-white mt-1.5">{activeCustomersCount} Active</h3>
            <span className="text-[9px] text-slate-400 font-semibold tracking-wide uppercase mt-2 block">Supply verification</span>
          </div>
          <div className="bg-emerald-950/50 border border-emerald-800/45 text-emerald-400 p-2.5 rounded-xl shadow-lg shadow-emerald-500/10">
            <Users size={18} />
          </div>
        </div>

        {/* Outstanding */}
        <div className="card-glass-dark p-5 flex items-center justify-between hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.12)]">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Outstanding</span>
            <h3 className="text-lg font-black text-amber-550 mt-1.5 font-mono">₹{totalOutstanding.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</h3>
            <span className="text-[10px] text-amber-500 flex items-center gap-0.5 mt-2 font-extrabold">
              <AlertTriangle size={11} className="shrink-0" /> Pending balances
            </span>
          </div>
          <div className="bg-amber-950/50 border border-amber-800/45 text-amber-400 p-2.5 rounded-xl shadow-lg shadow-amber-500/10">
            <AlertTriangle size={18} />
          </div>
        </div>
      </div>

      {/* Analytics Charts and Quick Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart (SVG) */}
        <div className="card-glass-dark p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-extrabold text-white text-base">Monthly Sales Performance</h3>
            <span className="text-[9px] bg-slate-900 border border-slate-800 text-cyan-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider">Metrics</span>
          </div>
          <div className="w-full">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-48 overflow-visible">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="0" y1={chartHeight * 0.25} x2={chartWidth} y2={chartHeight * 0.25} stroke="#1e293b" strokeOpacity="0.4" strokeDasharray="3 3" />
              <line x1="0" y1={chartHeight * 0.5} x2={chartWidth} y2={chartHeight * 0.5} stroke="#1e293b" strokeOpacity="0.4" strokeDasharray="3 3" />
              <line x1="0" y1={chartHeight * 0.75} x2={chartWidth} y2={chartHeight * 0.75} stroke="#1e293b" strokeOpacity="0.4" strokeDasharray="3 3" />
              
              <polygon points={areaPoints} fill="url(#chartGradient)" />
              <polyline points={points} fill="none" stroke="#06b6d4" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              
              {monthlyData.map((d, index) => {
                const x = (index / (monthlyData.length - 1)) * chartWidth;
                const y = chartHeight - (d.revenue / maxVal) * chartHeight;
                return (
                  <g key={index}>
                    <circle cx={x} cy={y} r="5.5" fill="#020617" stroke="#06b6d4" strokeWidth="3.5" />
                    <text x={x} y={chartHeight + 16} fill="#94a3b8" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                      {d.month}
                    </text>
                    <text x={x} y={y - 12} fill="#f8fafc" fontSize="9.5" fontWeight="black" textAnchor="middle">
                      ₹{(d.revenue / 1000).toFixed(0)}k
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Quick Tools & Shortcuts */}
        <div className="card-glass-dark p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-white text-base mb-4 border-b border-slate-800 pb-2">Quick Navigation</h3>
            <div className="space-y-3">
              <button 
                onClick={() => setView("customers")} 
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-900/20 hover:border-cyan-500/35 hover:bg-cyan-500/5 transition text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-950 text-emerald-400 p-2.5 rounded-xl border border-emerald-800/40">
                    <Users size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-200 text-xs">Customer Database</p>
                    <p className="text-[10px] text-slate-400">Search and configure client records</p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-slate-500 group-hover:text-cyan-400 transform group-hover:translate-x-0.5 transition duration-300" />
              </button>

              <button 
                onClick={() => setView("products")} 
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-900/20 hover:border-cyan-500/35 hover:bg-cyan-500/5 transition text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-950 text-blue-400 p-2.5 rounded-xl border border-blue-800/40">
                    <Package size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-200 text-xs">Product Catalog</p>
                    <p className="text-[10px] text-slate-400">Set base prices and GST thresholds</p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-slate-500 group-hover:text-cyan-400 transform group-hover:translate-x-0.5 transition duration-300" />
              </button>

              <button 
                onClick={() => setView("history")} 
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-900/20 hover:border-cyan-500/35 hover:bg-cyan-500/5 transition text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-950 text-purple-400 p-2.5 rounded-xl border border-purple-800/40">
                    <FileText size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-200 text-xs">Invoice Logs</p>
                    <p className="text-[10px] text-slate-400">Reprint and audit previous logs</p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-slate-500 group-hover:text-cyan-400 transform group-hover:translate-x-0.5 transition duration-300" />
              </button>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-450 font-bold uppercase tracking-wider">
            <span>State Code: 33 (TN)</span>
            <span>Firm Portal v1.0.0</span>
          </div>
        </div>
      </div>

      {/* Recent Activity Invoices Table */}
      <div className="bg-slate-950/20 rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden backdrop-blur-md">
        <div className="p-5 border-b border-slate-800/85 flex items-center justify-between bg-slate-950/35">
          <h3 className="font-extrabold text-white text-base">Recent Tax Invoices</h3>
          <button 
            onClick={() => setView("history")}
            className="text-cyan-400 hover:text-cyan-300 text-xs font-bold flex items-center gap-1.5 group transition duration-300 uppercase tracking-wider"
          >
            View History <ArrowRight size={14} className="transform group-hover:translate-x-0.5 transition duration-300" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950/40 border-b border-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Invoice No</th>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Issue Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">GST Tax</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 text-[13px]">
              {recentInvoices.length > 0 ? (
                recentInvoices.map(inv => {
                  const customer = customers.find(c => c.id === inv.customerId) || inv.customerDetails || {};
                  const isFullyPaid = Number(inv.receivedAmount) >= (inv.finalTotal || 0);
                  const isPartiallyPaid = Number(inv.receivedAmount) > 0 && !isFullyPaid;
                  
                  return (
                    <tr key={inv.id} className="hover:bg-slate-900/25 transition duration-300">
                      <td className="px-6 py-4 font-bold text-slate-100 font-mono text-sm">{inv.invoiceNo}</td>
                      <td className="px-6 py-4 font-bold text-slate-200">{customer?.name || "Unknown Customer"}</td>
                      <td className="px-6 py-4 font-medium text-slate-400">{new Date(inv.invoiceDate).toLocaleDateString("en-IN")}</td>
                      <td className="px-6 py-4 font-black text-slate-100 font-mono">₹{(inv.finalTotal || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                      <td className="px-6 py-4 font-mono font-semibold text-slate-450">₹{(inv.totalTax || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                      <td className="px-6 py-4 text-center">
                        {isFullyPaid ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shadow-[0_0_12px_rgba(16,185,129,0.08)]">
                            <CheckCircle2 size={10} /> Paid
                          </span>
                        ) : isPartiallyPaid ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/25 shadow-[0_0_12px_rgba(245,158,11,0.08)]">
                            <Clock size={10} /> Partial
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/25 shadow-[0_0_12px_rgba(244,63,94,0.08)]">
                            <Clock size={10} /> Unpaid
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedInvoiceId(inv.id);
                            setView("invoice-preview");
                          }}
                          className="bg-slate-900 border border-slate-800 hover:border-cyan-500/60 hover:bg-cyan-500/5 hover:text-cyan-400 text-slate-300 font-extrabold px-4.5 py-2 rounded-xl text-[10px] transition duration-300 uppercase tracking-wider"
                        >
                          View Bill
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-slate-500">
                    No invoices generated yet. Click "Issue Tax Invoice" to begin.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
