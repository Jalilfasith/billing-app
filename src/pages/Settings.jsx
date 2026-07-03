import React from "react";
import { Download, Upload, Trash2, RotateCcw, AlertTriangle, ShieldAlert } from "lucide-react";
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
      } catch (err) {
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
  const handleEraseAll = () => {
    if (window.confirm("WARNING: This will wipe out all invoices, clients, products, and company configuration. This cannot be undone! Proceed?")) {
      setCompany({ name: "", legalName: "", subtitle: "", gstin: "", address: "", logoUrl: "", signatureUrl: "" });
      setCustomers([]);
      setProducts([]);
      setInvoices([]);
      localStorage.clear();
      alert("Database wiped out.");
      setView("dashboard");
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Database & Portal Configuration</h2>
        <p className="text-slate-500 text-sm mt-0.5">Manage data backups, import backups, or factory-reset states.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backup Card */}
        <div className="bg-slate-950/45 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <Download size={18} className="text-amber-500" /> Export Backup
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Download your invoices, customer directories, product lists, and company defaults in a single, portable backup file. You can load this backup back onto any device.
          </p>
          <button
            onClick={handleExportData}
            className="bg-slate-900 hover:bg-slate-850 text-white hover:text-amber-400 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition"
          >
            Export Backup (.json)
          </button>
        </div>

        {/* Restore Card */}
        <div className="bg-slate-950/45 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <Upload size={18} className="text-amber-500" /> Import Backup
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Choose a previously exported backup file to overwrite your current browser data. Ensure the file has a `.json` extension.
          </p>
          <div className="flex items-center gap-3">
            <label className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-lg text-xs cursor-pointer flex items-center gap-1.5 transition">
              <Upload size={14} /> Upload Backup
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
        <div className="bg-slate-950/45 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4 md:col-span-2">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-600" /> Maintenance & Danger Zone
          </h3>
          <p className="text-xs text-slate-500">
            Need to clear custom testing edits? Reset the database to load standard demo items or clear everything for deployment.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={handleResetData}
              className="border border-slate-850 hover:bg-slate-950/40 text-slate-700 font-semibold px-4 py-2.5 rounded-lg text-xs flex items-center gap-1.5 transition"
            >
              <RotateCcw size={14} /> Load Default Mock Data
            </button>
            <button
              onClick={handleEraseAll}
              className="bg-rose-50 border border-rose-200 hover:bg-rose-100/50 text-rose-700 font-semibold px-4 py-2.5 rounded-lg text-xs flex items-center gap-1.5 transition"
            >
              <Trash2 size={14} className="shrink-0" /> Wipe Out Local Database
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
