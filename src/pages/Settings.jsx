import React, { useState } from "react";
import { Download, Upload, Trash2, RotateCcw, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import * as api from "../lib/api";
import { 
  initialCompanyDetails, 
  initialCustomers, 
  initialProducts, 
  initialInvoices 
} from "../data/mockData";

export default function Settings({ 
  company, setCompany, 
  customers, setCustomers, 
  products, setProducts, 
  invoices, setInvoices,
  setView 
}) {
  
  // Export State to JSON file
  const handleExportData = () => {
    const backupData = {
      company,
      customers,
      products,
      invoices,
      version: "1.0.0",
      exportDate: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `gst_billing_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import State from JSON file
  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported.company && imported.customers && imported.products && imported.invoices) {
          setCompany(imported.company);
          setCustomers(imported.customers);
          setProducts(imported.products);
          setInvoices(imported.invoices);
          alert("Database records imported successfully!");
          setView("dashboard");
        } else {
          alert("Invalid file format. Please upload a valid JSON backup file generated from this application.");
        }
      } catch {
        alert("Failed to parse JSON backup file.");
      }
    };
    reader.readAsText(file);
  };

  // Reset to Factory Mock Data
  const handleResetData = () => {
    if (window.confirm("This will overwrite all active edits and reset the database to Jamil Groups sample values. Proceed?")) {
      setCompany(initialCompanyDetails);
      setCustomers(initialCustomers);
      setProducts(initialProducts);
      setInvoices(initialInvoices);
      localStorage.clear();
      alert("Database reset to defaults.");
      setView("dashboard");
    }
  };

  // Erase everything
  const [isWiping, setIsWiping] = useState(false);
  const handleEraseAll = async () => {
    if (window.confirm("WARNING: This will wipe out all invoices, clients, products, and company configuration. This cannot be undone! Proceed?")) {
      setIsWiping(true);
      try {
        await api.wipeDatabase();
        setCompany({ name: "", legalName: "", subtitle: "", gstin: "", address: "", logoUrl: "", signatureUrl: "" });
        setCustomers([]);
        setProducts([]);
        setInvoices([]);
        localStorage.clear();
        alert("Database wiped out.");
        setView("dashboard");
      } catch (e) {
        console.error(e);
        alert("Failed to completely wipe database.");
      } finally {
        setIsWiping(false);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-3xl mx-auto pb-12 relative z-10"
    >
      <div>
        <h2 className="text-2xl font-extrabold text-white font-heading">Database & Portal Configuration</h2>
        <p className="text-slate-400 text-sm mt-0.5">Manage data backups, import backups, or factory-reset states.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backup Card */}
        <div className="card-glass p-6 space-y-4 bg-slate-950/20">
          <h3 className="font-extrabold text-white flex items-center gap-2 text-base">
            <Download size={18} className="text-brand-secondary" /> Export Backup
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Download your invoices, customer directories, product lists, and company defaults in a single, portable backup file. You can load this backup back onto any device.
          </p>
          <button
            onClick={handleExportData}
            className="btn-premium-gradient px-5 py-2.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg shadow-brand-primary/10"
          >
            <Download size={14} /> Export Backup (.json)
          </button>
        </div>

        {/* Restore Card */}
        <div className="card-glass p-6 space-y-4 bg-slate-950/20">
          <h3 className="font-extrabold text-white flex items-center gap-2 text-base">
            <Upload size={18} className="text-brand-secondary" /> Import Backup
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Choose a previously exported backup file to overwrite your current browser data. Ensure the file has a `.json` extension.
          </p>
          <div className="flex items-center gap-3">
            <label className="btn-cyber-outline px-5 py-2.5 text-xs font-bold cursor-pointer flex items-center gap-1.5 hover:text-white">
              <Upload size={14} /> Upload Backup File
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Recovery / Reset */}
        <div className="card-glass p-6 space-y-4 md:col-span-2 bg-slate-950/20 border-rose-500/20">
          <h3 className="font-extrabold text-white flex items-center gap-2 text-base">
            <AlertTriangle size={18} className="text-rose-450" /> Maintenance & Danger Zone
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Need to clear custom testing edits? Reset the database to load standard demo items or clear everything for deployment.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={handleResetData}
              className="btn-cyber-outline px-5 py-2.5 text-xs font-semibold cursor-pointer hover:text-white"
            >
              <RotateCcw size={14} className="mr-1 inline-block" /> Load Default Mock Data
            </button>
            <button
              onClick={handleEraseAll}
              className="bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-450 px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Trash2 size={14} className="shrink-0" /> Wipe Out Local Database
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
