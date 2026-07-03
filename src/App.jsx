import React, { useEffect, useState } from 'react';

import { 
  LayoutDashboard, 
  Building, 
  Users, 
  Package, 
  FilePlus, 
  Eye, 
  History, 
  Settings as SettingsIcon,
  Menu,
  X,
  ArrowUp,
  Sun,
  Moon
} from "lucide-react";

// Mock Data
import { 
  initialCompanyDetails, 
  initialCustomers, 
  initialProducts, 
  initialInvoices 
} from "./data/mockData";

// Pages
import Dashboard from "./pages/Dashboard";
import CompanyDetails from "./pages/CompanyDetails";
import CustomerDetails from "./pages/CustomerDetails";
import ProductManagement from "./pages/ProductManagement";
import CreateInvoice from "./pages/CreateInvoice";
import InvoicePreview from "./pages/InvoicePreview";
import InvoiceHistory from "./pages/InvoiceHistory";
import Settings from "./pages/Settings";
import LoginPage from "./pages/LoginPage";

export default function App() {
  // ─── Authentication State ───
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const auth = localStorage.getItem("jg_auth");
      return auth ? JSON.parse(auth)?.user === "jamilgroups" : false;
    } catch { return false; }
  });

  const handleLogout = () => {
    localStorage.removeItem("jg_auth");
    setIsAuthenticated(false);
  };

  // If not authenticated, show the login page
  if (!isAuthenticated) {
    return <LoginPage onLogin={setIsAuthenticated} />;
  }
  // Migration check: If the user's local storage contains the old "NEXTLIFE" branding, force reset
  useEffect(() => {
    const localComp = localStorage.getItem("gst_company");
    if (localComp && (localComp.includes("NEXTLIFE") || localComp.includes("Nextlife"))) {
      localStorage.clear();
      window.location.reload();
    }
  }, []);

  // Inject QR Code and UPI default values if missing in loaded storage
  useEffect(() => {
    const localComp = localStorage.getItem("gst_company");
    if (localComp) {
      try {
        const parsed = JSON.parse(localComp);
        if (parsed && (!parsed.qrCodeUrl || !parsed.upiId)) {
          parsed.qrCodeUrl = parsed.qrCodeUrl || "/qr_code.png";
          parsed.upiId = parsed.upiId || "jamilgroups@sbi";
          localStorage.setItem("gst_company", JSON.stringify(parsed));
          setCompany(parsed);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Safe LocalStorage Loader to prevent startup crash from corrupt/conflicting data
  const safeLoad = (key, defaultValue) => {
    try {
      const local = localStorage.getItem(key);
      if (!local || local === "undefined" || local === "null") {
        return defaultValue;
      }
      const parsed = JSON.parse(local);
      if (parsed === null) {
        return defaultValue;
      }
      // If default is an array, parsed must be an array
      if (Array.isArray(defaultValue) && !Array.isArray(parsed)) {
        return defaultValue;
      }
      // If default is an object, parsed must be an object (and not an array)
      if (!Array.isArray(defaultValue) && (typeof parsed !== "object" || Array.isArray(parsed))) {
        return defaultValue;
      }
      // Guarantee Jamil Groups details restore if local storage has empty company name
      if (key === "gst_company" && (!parsed.name || parsed.name.trim() === "")) {
        return defaultValue;
      }
      return parsed;
    } catch (e) {
      console.error(`Error loading localStorage key "${key}":`, e);
      return defaultValue;
    }
  };

  // State initialization with safe loader
  const [company, setCompany] = useState(() => safeLoad("gst_company", initialCompanyDetails));
  const [customers, setCustomers] = useState(() => safeLoad("gst_customers", initialCustomers));
  const [products, setProducts] = useState(() => safeLoad("gst_products", initialProducts));
  const [invoices, setInvoices] = useState(() => safeLoad("gst_invoices", initialInvoices));

  const [view, setView] = useState("dashboard");
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(() => {
    const loadedInvoices = safeLoad("gst_invoices", initialInvoices);
    return Array.isArray(loadedInvoices) && loadedInvoices.length > 0 ? loadedInvoices[0].id : "inv-1";
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem("gst_theme") || "dark");
  
  // Cursor state
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isCursorMoving, setIsCursorMoving] = useState(false);
  
  // Scroll indicators
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync theme with local storage
  useEffect(() => {
    localStorage.setItem("gst_theme", theme);
  }, [theme]);

  // Track cursor movement
  useEffect(() => {
    let timeout;
    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
      setIsCursorMoving(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsCursorMoving(false), 800);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  // Track page scroll position
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress((window.scrollY / total) * 100);
      }
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // Synchronize state with LocalStorage
  useEffect(() => {
    if (company) {
      localStorage.setItem("gst_company", JSON.stringify(company));
    }
  }, [company]);

  useEffect(() => {
    if (customers) {
      localStorage.setItem("gst_customers", JSON.stringify(customers));
    }
  }, [customers]);

  useEffect(() => {
    if (products) {
      localStorage.setItem("gst_products", JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (invoices) {
      localStorage.setItem("gst_invoices", JSON.stringify(invoices));
    }
  }, [invoices]);

  // Sidebar Menu Items
  const menuItems = [
    { name: "Dashboard", view: "dashboard", icon: LayoutDashboard },
    { name: "Create Invoice", view: "create-invoice", icon: FilePlus },
    { name: "Invoice Preview", view: "invoice-preview", icon: Eye },
    { name: "Invoice History", view: "history", icon: History },
    { name: "Company Details", view: "company", icon: Building },
    { name: "Customer Details", view: "customers", icon: Users },
    { name: "Product Catalogue", view: "products", icon: Package },
    { name: "Settings", view: "settings", icon: SettingsIcon },
  ];

  // Render correct view
  const renderView = () => {
    switch (view) {
      case "dashboard":
        return (
          <Dashboard 
            invoices={invoices} 
            customers={customers} 
            products={products} 
            company={company}
            setView={setView}
            setSelectedInvoiceId={setSelectedInvoiceId}
          />
        );
      case "company":
        return (
          <CompanyDetails 
            company={company} 
            setCompany={setCompany} 
            setView={setView}
          />
        );
      case "customers":
        return (
          <CustomerDetails 
            customers={customers} 
            setCustomers={setCustomers} 
            setView={setView}
          />
        );
      case "products":
        return (
          <ProductManagement 
            products={products} 
            setProducts={setProducts} 
            setView={setView}
          />
        );
      case "create-invoice":
        return (
          <CreateInvoice 
            invoices={invoices}
            setInvoices={setInvoices}
            customers={customers}
            products={products} 
            company={company}
            setView={setView}
            selectedInvoiceId={selectedInvoiceId}
            setSelectedInvoiceId={setSelectedInvoiceId}
          />
        );
      case "invoice-preview":
        return (
          <InvoicePreview 
            invoices={invoices}
            customers={customers}
            products={products}
            company={company}
            setView={setView}
            selectedInvoiceId={selectedInvoiceId}
          />
        );
      case "history":
        return (
          <InvoiceHistory 
            invoices={invoices}
            setInvoices={setInvoices}
            customers={customers}
            products={products}
            company={company}
            setView={setView}
            setSelectedInvoiceId={setSelectedInvoiceId}
          />
        );
      case "settings":
        return (
          <Settings 
            company={company}
            setCompany={setCompany}
            customers={customers}
            setCustomers={setCustomers}
            products={products}
            setProducts={setProducts}
            invoices={invoices}
            setInvoices={setInvoices}
            setView={setView}
          />
        );
      default:
        return (
          <Dashboard 
            invoices={invoices} 
            customers={customers} 
            products={products} 
            company={company}
            setView={setView}
            setSelectedInvoiceId={setSelectedInvoiceId}
          />
        );
    }
  };

  // Helper for Breadcrumbs / Current Title
  const getCurrentTitle = () => {
    const item = menuItems.find(m => m.view === view);
    return item ? item.name : "Dashboard";
  };

  return (
    <div className="min-h-screen flex antialiased font-sans relative overflow-hidden select-none select-text bg-[#ffffff] text-[#020617] light-theme">

      {/* Sticky Scroll Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-orange-500 z-50 transition-all duration-100" style={{ width: `${scrollProgress}%` }}></div>

      {/* Sidebar: Navigation Panel */}
      <aside 
        className={`fixed top-4 bottom-4 left-4 z-40 w-64 bg-[#020617] text-white border border-slate-800 rounded-2xl flex flex-col transition-all duration-300 no-print shadow-xl
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Sidebar Header Brand */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800/50 bg-slate-950/30 rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-br from-emerald-400 to-orange-550 text-white font-extrabold p-1.5 rounded-xl text-xs tracking-wider flex items-center justify-center w-8 h-8 shadow-md">
              JG
            </div>
            <div>
              <h1 className="text-sm font-extrabold tracking-tight text-white leading-none">Jamil Groups</h1>
              <span className="text-[9px] text-orange-500 font-bold tracking-widest uppercase mt-0.5 block">BILLING PORTAL</span>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = view === item.view;
            return (
              <button
                key={item.view}
                onClick={() => {
                  setView(item.view);
                  // Auto-collapse sidebar on mobile
                  if (window.innerWidth < 1024) {
                    setIsSidebarOpen(false);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 border border-transparent group
                  ${isActive 
                    ? "bg-gradient-to-r from-emerald-500/10 to-emerald-500/20 border border-emerald-500/30 text-emerald-450 shadow-[0_0_15px_rgba(16,185,129,0.12)]" 
                    : "text-slate-400 hover:bg-slate-900/30 hover:border-slate-850 hover:text-slate-200"}`}
              >
                <Icon size={16} className={isActive ? "text-emerald-450" : "text-slate-400 group-hover:text-emerald-400 transition-colors duration-300"} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/50 bg-slate-950/20 rounded-b-2xl text-[10px] text-slate-500 flex flex-col gap-2">
          <p className="font-bold text-slate-300">{company?.name || ""}</p>
          <p className="truncate font-medium">GSTIN: {company?.gstin || ""}</p>
          <button
            onClick={handleLogout}
            className="mt-1 w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition-all duration-300 text-[10px] font-bold uppercase tracking-wider"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 relative z-10 ${isSidebarOpen ? "lg:pl-72 lg:pr-4 lg:py-4" : "lg:px-4 lg:py-4"}`}>
        {/* Header (Top-bar) */}
        <header className="h-16 bg-white border border-slate-200/80 lg:rounded-2xl px-6 flex items-center justify-between sticky top-4 z-30 no-print shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-slate-500 hover:text-slate-800 p-1.5 rounded-lg hover:bg-white transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="h-4 w-px bg-slate-200"></div>
            <div>
              <h2 className="text-sm font-black text-[#020617] uppercase tracking-wider">{getCurrentTitle()}</h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-slate-850">{company?.name || ""}</span>
              <span className="text-[9px] text-emerald-700 font-extrabold flex items-center gap-1 justify-end uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                GST: {company?.gstin || ""}
              </span>
            </div>
            

            <div className="h-8 w-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center font-black text-xs shadow-sm">
              JG
            </div>
          </div>
        </header>

        {/* Content View Container */}
        <main className="flex-1 pt-6 max-w-7xl w-full mx-auto print:p-0 print:max-w-none">
          {renderView()}
        </main>
      </div>
      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full card-glass-dark border border-emerald-500/30 text-emerald-600 hover:text-emerald-700 hover:scale-105 shadow-md transition cursor-pointer flex items-center justify-center"
        >
          <ArrowUp size={16} />
        </button>
      )}

    </div>
  );
}
