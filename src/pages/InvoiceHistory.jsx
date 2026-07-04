import React, { useState } from "react";
import { Search, Eye, Trash2, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { calculateInvoice } from "../utils/calculations";

import * as api from "../lib/api";

export default function InvoiceHistory({ 
  invoices, 
  setInvoices, 
  customers, 
  company, 
  setView, 
  setSelectedInvoiceId 
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        await api.deleteInvoice(id);
        const newInvoices = invoices.filter(inv => inv.id !== id);
        setInvoices(newInvoices);
      } catch (err) {
        console.error(err);
        alert("Failed to delete from database.");
        // Still remove locally for optimistic UI if desired, but here we let it stay if API fails.
      }
    }
  };

  const handleView = (id) => {
    setSelectedInvoiceId(id);
    setView("invoice-preview");
  };

  // Filter invoices based on search
  const filteredInvoices = invoices.filter(inv => {
    const cust = customers.find(c => c.id === inv.customerId) || inv.customerDetails || {};
    const clientName = cust.name || "";
    return (
      inv.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clientName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 relative z-10"
    >
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white font-heading">Invoice Registry & History</h2>
          <p className="text-slate-400 text-sm mt-0.5">Search, review details, print or delete issued invoices.</p>
        </div>
        <button
          onClick={() => setView("create-invoice")}
          className="btn-premium-gradient font-bold px-5 py-2.5 rounded-xl text-xs transition cursor-pointer shadow-lg shadow-brand-primary/10"
        >
          + Issue New Invoice
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card-glass p-4 bg-slate-950/20 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by invoice number or client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-premium pl-10 pr-4 py-2.5 text-xs"
          />
        </div>
        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
          Total Invoices: {filteredInvoices.length}
        </div>
      </div>

      {/* Invoices List Table */}
      <div className="card-glass overflow-hidden bg-slate-950/20">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/40 border-b border-white/5 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Invoice No</th>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Issue Date</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Tax Type</th>
                <th className="px-6 py-4 text-right">Invoice Total</th>
                <th className="px-6 py-4 text-center w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-slate-350">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map(inv => {
                  const cust = customers.find(c => c.id === inv.customerId) || inv.customerDetails || {};
                  const calcs = calculateInvoice(inv, company);
                  const isIntraState = calcs?.isIntrastate;
                  
                  return (
                    <tr key={inv.id} className="hover:bg-white/2 transition duration-200">
                      <td className="px-6 py-4 font-bold text-white font-mono">{inv.invoiceNo}</td>
                      <td className="px-6 py-4 font-semibold text-slate-200">{cust.name || "Unknown Customer"}</td>
                      <td className="px-6 py-4">{new Date(inv.invoiceDate).toLocaleDateString("en-IN")}</td>
                      <td className="px-6 py-4">{new Date(inv.dueDate).toLocaleDateString("en-IN")}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${isIntraState 
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                          : "bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/20"}`}
                        >
                          {isIntraState ? "CGST + SGST" : "IGST"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-bold text-white">
                        ₹{(calcs?.finalTotal || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 text-center flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleView(inv.id)}
                          title="View Invoice & Print"
                          className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition cursor-pointer"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(inv.id)}
                          title="Delete Invoice"
                          className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition cursor-pointer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-500 bg-[#0B0F19]/10">
                    <FileText size={48} className="mx-auto text-slate-600 mb-2" />
                    No invoices match your search or none have been generated yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
