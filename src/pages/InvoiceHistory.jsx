import React, { useState } from "react";
import { Search, Eye, Trash2, Calendar, FileText, Download } from "lucide-react";
import { calculateInvoice } from "../utils/calculations";

export default function InvoiceHistory({ 
  invoices, 
  setInvoices, 
  customers, 
  company, 
  setView, 
  setSelectedInvoiceId 
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      const newInvoices = invoices.filter(inv => inv.id !== id);
      setInvoices(newInvoices);
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
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Invoice Registry & History</h2>
          <p className="text-slate-500 text-sm mt-0.5">Search, review details, print or delete issued invoices.</p>
        </div>
        <button
          onClick={() => setView("create-invoice")}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition"
        >
          + Issue New Invoice
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-950/45 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by invoice number or client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950/40 hover:bg-slate-100/50 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg pl-10 pr-4 py-2 text-sm outline-none transition"
          />
        </div>
        <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
          Total Invoices: {filteredInvoices.length}
        </div>
      </div>

      {/* Invoices List Table */}
      <div className="bg-white rounded-xl border border-slate-850 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/40 border-b border-slate-850 text-slate-500 text-xs font-semibold uppercase">
                <th className="px-6 py-4">Invoice No</th>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Issue Date</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Tax Type</th>
                <th className="px-6 py-4 text-right">Invoice Total</th>
                <th className="px-6 py-4 text-center w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-300">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map(inv => {
                  const cust = customers.find(c => c.id === inv.customerId) || inv.customerDetails || {};
                  const calcs = calculateInvoice(inv, company);
                  const isIntraState = calcs?.isIntrastate;
                  
                  return (
                    <tr key={inv.id} className="hover:bg-slate-950/40/50 transition">
                      <td className="px-6 py-4 font-bold text-slate-950 font-mono">{inv.invoiceNo}</td>
                      <td className="px-6 py-4 font-semibold text-slate-200">{cust.name || "Unknown Customer"}</td>
                      <td className="px-6 py-4">{new Date(inv.invoiceDate).toLocaleDateString("en-IN")}</td>
                      <td className="px-6 py-4">{new Date(inv.dueDate).toLocaleDateString("en-IN")}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${isIntraState 
                          ? "bg-amber-50 text-amber-800 border border-amber-200" 
                          : "bg-blue-50 text-blue-800 border border-blue-200"}`}
                        >
                          {isIntraState ? "CGST + SGST" : "IGST"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-bold text-slate-900">
                        ₹{(calcs?.finalTotal || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 text-center flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleView(inv.id)}
                          title="View Invoice & Print"
                          className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(inv.id)}
                          title="Delete Invoice"
                          className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                    <FileText size={48} className="mx-auto text-slate-300 mb-2" />
                    No invoices match your search or none have been generated yet.
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
