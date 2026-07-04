import React from "react";
import { Printer, ArrowLeft, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { calculateInvoice, numberToWords } from "../utils/calculations";

export default function InvoicePreview({ 
  invoices, 
  _customers, 
  _products, 
  company, 
  setView, 
  selectedInvoiceId 
}) {
  const invoice = invoices.find(inv => inv.id === selectedInvoiceId);

  if (!invoice) {
    return (
      <div className="card-glass p-8 text-center max-w-md mx-auto mt-12 bg-slate-950/20">
        <p className="text-slate-400 font-medium">No invoice selected.</p>
        <button 
          onClick={() => setView("history")} 
          className="mt-4 btn-premium-gradient font-bold px-5 py-2.5 rounded-xl text-xs transition cursor-pointer"
        >
          View Invoice History
        </button>
      </div>
    );
  }

  // Calculate tax figures
  const calculations = calculateInvoice(invoice, company);
  if (!calculations) return null;

  const handlePrint = () => {
    window.print();
  };

  const custDetails = invoice.customerDetails || {};
  const shipDetails = invoice.shippingDetails || {};

  // Custom SVG Gold Corner Ornament
  const GoldCorner = ({ className }) => (
    <svg 
      viewBox="0 0 100 100" 
      className={`w-12 h-12 absolute pointer-events-none text-[#d4af37]/80 ${className}`}
      fill="currentColor"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M 0 0 L 30 0 C 30 10, 20 20, 0 20 Z" opacity="0.25"/>
      <path d="M 0 0 L 0 30 C 10 30, 20 20, 20 0 Z" opacity="0.25"/>
      <path d="M 5 5 Q 25 5 25 25 Q 5 25 5 5 Z" fill="none" stroke="currentColor" strokeWidth="0.75"/>
      <path d="M 8 8 Q 18 8 18 18 Q 8 18 8 8 Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
      <path d="M 0 0 Q 35 10 35 35 Q 10 35 0 0" fill="none" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-4xl mx-auto pb-12 relative z-10"
    >
      {/* Floating Action Menu - Hidden during prints */}
      <div className="flex flex-wrap items-center justify-between gap-3 no-print card-glass bg-slate-950/20 p-4 border border-white/10 rounded-2xl">
        <button 
          onClick={() => setView("history")} 
          className="flex items-center gap-1.5 text-xs font-bold text-slate-350 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to History
        </button>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setView("create-invoice")} 
            className="btn-cyber-outline hover:text-white px-5 py-2.5 text-xs font-extrabold transition cursor-pointer"
          >
            Edit Data
          </button>
          <button 
            onClick={handlePrint}
            className="btn-premium-gradient px-6 py-2.5 text-xs flex items-center gap-2 tracking-wider font-extrabold uppercase cursor-pointer"
          >
            <Printer size={16} /> Print Invoice (A4 PDF)
          </button>
        </div>
      </div>

      {/* A4 Sheet Container */}
      <div className="flex justify-center card-glass bg-slate-950/10 p-6 no-print overflow-x-auto">
        <div 
          className="bg-white text-slate-800 p-12 border border-slate-350 shadow-lg print-container font-sans select-none select-text shrink-0"
          style={{ width: "210mm", height: "297mm", boxSizing: "border-box" }}
        >
          {/* Double-line inner border */}
          <div className="absolute inset-4 border border-[#d4af37]/60 pointer-events-none rounded-sm"></div>
          <div className="absolute inset-5 border border-[#d4af37]/40 pointer-events-none rounded-sm"></div>

          {/* Gold corner ornaments */}
          <GoldCorner className="top-6 left-6" />
          <GoldCorner className="top-6 right-6 rotate-90" />
          <GoldCorner className="bottom-6 left-6 -rotate-90" />
          <GoldCorner className="bottom-6 right-6 rotate-180" />

          {/* Core Content Box with absolute placement offsets */}
          <div className="relative z-10 p-6 h-full flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* BRAND HEADER SECTION */}
              <div className="flex justify-between items-start border-b-2 border-[#d4af37]/40 pb-4">
                <div className="flex gap-4">
                  {company.logoUrl ? (
                    <img 
                      src={company.logoUrl} 
                      alt="Company Logo" 
                      className="w-20 h-20 object-contain rounded-md"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center font-bold text-lg rounded-xl">
                      JG
                    </div>
                  )}
                  <div className="space-y-0.5 max-w-xl">
                    <h1 className="text-2xl font-extrabold text-slate-950 tracking-tight leading-none font-serif-invoice uppercase">
                      {company.name}
                    </h1>
                    <div className="text-[10px] text-slate-505 space-y-0.5 pt-2 leading-relaxed font-medium">
                      <p className="font-bold text-slate-800">GSTIN: {company.gstin}</p>
                      <p className="whitespace-pre-line text-slate-600 leading-normal">{company.address}</p>
                    </div>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end shrink-0">
                  <div className="border border-slate-900 px-5 py-2 bg-white rounded-sm">
                    <h2 className="text-base font-black text-slate-950 tracking-wider uppercase leading-none">
                      TAX INVOICE
                    </h2>
                  </div>
                  <div className="border border-slate-300 px-4 py-0.5 mt-1 bg-white text-[8px] font-bold text-slate-450 rounded-sm">
                    ORIGINAL
                  </div>
                </div>
              </div>

              {/* DATES BLOCK */}
              <div className="grid grid-cols-3 border border-slate-200 divide-x divide-slate-200 text-[10px] font-semibold text-slate-700 bg-white/50 rounded-sm">
                <div className="p-2.5">
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Invoice No.</span>
                  <span className="text-slate-950 font-bold font-mono">{invoice.invoiceNo}</span>
                </div>
                <div className="p-2.5">
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Invoice Date</span>
                  <span className="text-slate-950">{new Date(invoice.invoiceDate).toLocaleDateString("en-IN")}</span>
                </div>
                <div className="p-2.5">
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Due Date</span>
                  <span className="text-slate-950">{new Date(invoice.dueDate).toLocaleDateString("en-IN")}</span>
                </div>
              </div>

              {/* BILLING AND SHIPPING GRIDS */}
              <div className="grid grid-cols-2 border border-[#d4af37]/25 rounded-sm divide-x divide-amber-600/10">
                <div className="p-4 space-y-1.5 bg-white/20">
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#b48d2d] border-b border-slate-100 pb-0.5">
                    Bill To
                  </h3>
                  <div className="text-[10.5px] space-y-0.5 text-slate-605">
                    <h4 className="font-black text-slate-900 text-[11px] leading-tight">{custDetails.name}</h4>
                    <p className="whitespace-pre-line text-[9px] leading-normal">{custDetails.address}</p>
                    {custDetails.phone && <p><span className="text-slate-400">Mobile:</span> {custDetails.phone}</p>}
                    {custDetails.gstin && <p className="font-semibold text-slate-900"><span className="text-slate-400 font-normal">GSTIN:</span> {custDetails.gstin}</p>}
                    {custDetails.pan && <p className="font-mono"><span className="text-slate-400 font-normal">PAN:</span> {custDetails.pan}</p>}
                    <p><span className="text-slate-400">Place of Supply:</span> {custDetails.placeOfSupply}</p>
                  </div>
                </div>

                <div className="p-4 space-y-1.5 bg-white/20">
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#b48d2d] border-b border-slate-100 pb-0.5">
                    Ship To
                  </h3>
                  <div className="text-[10.5px] space-y-0.5 text-slate-605">
                    <h4 className="font-black text-slate-900 text-[11px] leading-tight">{shipDetails.name || custDetails.name}</h4>
                    <p className="whitespace-pre-line text-[9px] leading-normal">{shipDetails.address || custDetails.address}</p>
                    <p><span className="text-slate-400">Destination State:</span> {shipDetails.placeOfSupply || custDetails.placeOfSupply}</p>
                  </div>
                </div>
              </div>

              {/* PRODUCTS TABLE */}
              <div className="border border-slate-200 rounded-sm overflow-hidden">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold">
                      <th className="px-3 py-2 w-8 text-center border-r border-slate-200 font-bold">No</th>
                      <th className="px-3 py-2 border-r border-slate-200 font-bold">Items</th>
                      <th className="px-3 py-2 w-20 text-center border-r border-slate-200 font-bold">HSN/SAC</th>
                      <th className="px-3 py-2 w-16 text-center border-r border-slate-200 font-bold">Qty</th>
                      <th className="px-3 py-2 w-24 text-right border-r border-slate-200 font-mono font-bold">Rate</th>
                      <th className="px-3 py-2 w-24 text-center border-r border-slate-200 font-bold">Tax</th>
                      <th className="px-3 py-2 w-28 text-right font-mono font-bold">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 text-slate-700">
                    {calculations.itemsDetailed.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-3 py-2 text-center border-r border-slate-200 text-slate-400 font-medium">{idx + 1}</td>
                        <td className="px-3 py-2 border-r border-slate-200 text-slate-900 font-semibold">{item.productName}</td>
                        <td className="px-3 py-2 text-center border-r border-slate-200 font-mono font-medium">{item.hsnSac || "—"}</td>
                        <td className="px-3 py-2 text-center border-r border-slate-200 font-bold">{item.qty} PCS</td>
                        <td className="px-3 py-2 text-right border-r border-slate-200 font-mono font-medium">₹{item.rate.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                        <td className="px-3 py-2 text-center border-r border-slate-200 leading-tight">
                          <span className="block font-bold">₹{item.taxAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                          <span className="text-[8.5px] text-slate-400">({item.gstRate}%)</span>
                        </td>
                        <td className="px-3 py-2 text-right font-mono text-slate-900 font-bold">₹{item.totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                      </tr>
                    ))}

                    {/* Subtotal Row */}
                    <tr className="bg-slate-150/40 font-black text-slate-900 border-t border-slate-300">
                      <td colSpan="3" className="px-3 py-2 text-right uppercase border-r border-slate-200 tracking-wider">
                        SUBTOTAL
                      </td>
                      <td className="px-3 py-2 text-center border-r border-slate-200">{calculations.totalQty}</td>
                      <td className="px-3 py-2 border-r border-slate-200"></td>
                      <td className="px-3 py-2 text-center border-r border-slate-200 font-mono">
                        ₹{calculations.totalTax.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-3 py-2 text-right font-mono font-bold">
                        ₹{calculations.finalTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* TERMS AND TAX SUMMARY GRIDS */}
              <div className="grid grid-cols-2 gap-6 items-start pt-1">
                <div className="space-y-3">
                  <div className="text-[9.5px] text-slate-500 leading-relaxed bg-white p-3.5 rounded-sm border border-slate-200">
                    <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-0.5">Terms & Conditions</h4>
                    <p className="whitespace-pre-line leading-normal">{invoice.terms}</p>
                  </div>
                  <div className="text-[9.5px] text-slate-505 leading-relaxed bg-white p-3.5 rounded-sm border border-slate-200">
                    <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-0.5">Settlement Bank details</h4>
                    <p className="leading-tight text-slate-600">
                      Account: <span className="font-semibold text-slate-800 font-mono">{company.bankAccountNo}</span><br />
                      Bank Name: <span className="font-semibold text-slate-800">{company.bankName}</span><br />
                      IFSC Code: <span className="font-semibold text-slate-800 font-mono">{company.bankIfsc}</span>
                    </p>
                    
                    {/* UPI QR scan block */}
                    {(company.qrCodeUrl || company.upiId) && (
                      <div className="mt-2.5 pt-2.5 border-t border-dashed border-slate-200 flex items-center gap-4">
                        {company.qrCodeUrl && (
                          <img 
                            src={company.qrCodeUrl} 
                            alt="UPI QR" 
                            className="w-16 h-16 object-contain border border-slate-200 p-0.5 rounded bg-white"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        )}
                        <div>
                          <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400 leading-none mb-0.5">UPI Settlement Address</span>
                          <span className="font-mono font-bold text-slate-800 text-[9.5px] leading-tight block">{company.upiId || "—"}</span>
                          <span className="block text-[7px] text-slate-550 mt-1 leading-none">Scan code with any UPI app to settle payment</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div className="border border-slate-200 rounded-sm p-3 bg-white/20 divide-y divide-slate-150 text-[10.5px]">
                    <div className="flex justify-between py-1 text-slate-550">
                      <span>Taxable Amount</span>
                      <span className="font-mono font-medium">₹{calculations.totalTaxable.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                    </div>

                    {calculations.taxDetails.map((tax) => {
                      if (calculations.isIntrastate) {
                        const splitRate = tax.rate / 2;
                        const splitTax = tax.tax / 2;
                        return (
                          <React.Fragment key={tax.rate}>
                            <div className="flex justify-between py-1 text-slate-400">
                              <span>CGST @ {splitRate}%</span>
                              <span className="font-mono">₹{splitTax.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between py-1 text-slate-400">
                              <span>SGST @ {splitRate}%</span>
                              <span className="font-mono">₹{splitTax.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                            </div>
                          </React.Fragment>
                        );
                      } else {
                        return (
                          <div key={tax.rate} className="flex justify-between py-1 text-slate-400">
                            <span>IGST @ {tax.rate}%</span>
                            <span className="font-mono">₹{tax.tax.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                          </div>
                        );
                      }
                    })}

                    <div className="flex justify-between py-1.5 text-[11px] font-black text-slate-900 border-t border-slate-350">
                      <span>Grand Total</span>
                      <span className="font-mono text-xs text-[#a37e2c] font-black">₹{calculations.finalTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  <div className="text-[8.5px] text-slate-500 leading-normal bg-white/50 p-2.5 border border-slate-100 rounded-sm">
                    <span className="block font-bold uppercase tracking-wider text-slate-750 mb-0.5">Total Amount (in words)</span>
                    <span className="italic font-semibold text-slate-950 block">{numberToWords(calculations.finalTotal)}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* AUTHORIZED SIGNATORY BLOCK */}
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2.5 text-emerald-800/80 px-3 py-1.5 border border-emerald-100 bg-emerald-50/20 rounded-md">
                <ShieldCheck size={16} />
                <span className="text-[9px] font-bold uppercase tracking-wider">Digitally Verified GST Invoice</span>
              </div>
              <div className="border border-[#d4af37]/40 bg-amber-50/5 p-3 rounded-md w-60 text-center">
                <div className="h-12 flex items-center justify-center overflow-hidden mb-1">
                  {company.signatureUrl ? (
                    <img 
                      src={company.signatureUrl} 
                      alt="Authorized Signature" 
                      className="max-h-12 w-auto object-contain mix-blend-multiply"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <span className="text-slate-300 text-[10px] italic">No signature</span>
                  )}
                </div>
                <div className="border-t border-dashed border-slate-300 pt-1.5 text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                  Authorized Signatory
                  <span className="block text-slate-700 font-bold text-[9px] mt-0.5 leading-none">{company.signatureText}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Hidden print container - this container only renders during print actions */}
      <div 
        className="hidden print:block print-container bg-white text-slate-800 p-8 border border-slate-350 relative font-sans"
        style={{ width: "210mm", height: "297mm", boxSizing: "border-box" }}
      >
        {/* Double-line inner border */}
        <div className="absolute inset-4 border border-[#d4af37]/60 pointer-events-none rounded-sm"></div>
        <div className="absolute inset-5 border border-[#d4af37]/40 pointer-events-none rounded-sm"></div>

        {/* Gold corner ornaments */}
        <GoldCorner className="top-6 left-6" />
        <GoldCorner className="top-6 right-6 rotate-90" />
        <GoldCorner className="bottom-6 left-6 -rotate-90" />
        <GoldCorner className="bottom-6 right-6 rotate-180" />

        {/* Content */}
        <div className="relative z-10 p-6 h-full flex flex-col justify-between text-slate-800">
          <div className="space-y-6">
            
            {/* Header */}
            <div className="flex justify-between items-start border-b-2 border-[#d4af37]/40 pb-4">
              <div className="flex gap-4">
                {company.logoUrl && (
                  <img 
                    src={company.logoUrl} 
                    alt="Company Logo" 
                    className="w-20 h-20 object-contain rounded-md"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                <div className="space-y-0.5 max-w-xl">
                  <h1 className="text-2xl font-extrabold text-slate-950 tracking-tight leading-none font-serif-invoice uppercase">
                    {company.name}
                  </h1>
                  <div className="text-[10px] text-slate-500 space-y-0.5 pt-2 leading-relaxed font-medium">
                    <p className="font-bold text-slate-800">GSTIN: {company.gstin}</p>
                    <p className="whitespace-pre-line text-slate-650 leading-normal">{company.address}</p>
                  </div>
                </div>
              </div>

              <div className="text-right flex flex-col items-end shrink-0">
                <div className="border border-slate-900 px-5 py-2 bg-white rounded-sm">
                  <h2 className="text-base font-black text-slate-950 tracking-wider uppercase leading-none">
                    TAX INVOICE
                  </h2>
                </div>
                <div className="border border-slate-300 px-4 py-0.5 mt-1 bg-white text-[8px] font-bold text-slate-400 rounded-sm">
                  ORIGINAL
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-3 border border-slate-200 divide-x divide-slate-200 text-[10px] font-semibold text-slate-700 bg-white/50 rounded-sm">
              <div className="p-2.5">
                <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Invoice No.</span>
                <span className="text-slate-950 font-bold font-mono">{invoice.invoiceNo}</span>
              </div>
              <div className="p-2.5">
                <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Invoice Date</span>
                <span className="text-slate-950">{new Date(invoice.invoiceDate).toLocaleDateString("en-IN")}</span>
              </div>
              <div className="p-2.5">
                <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Due Date</span>
                <span className="text-slate-950">{new Date(invoice.dueDate).toLocaleDateString("en-IN")}</span>
              </div>
            </div>

            {/* Billing */}
            <div className="grid grid-cols-2 border border-[#d4af37]/25 rounded-sm divide-x divide-amber-600/10">
              <div className="p-4 space-y-1.5 bg-white/20">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#b48d2d] border-b border-slate-100 pb-0.5">
                  Bill To
                </h3>
                <div className="text-[10.5px] space-y-0.5 text-slate-650">
                  <h4 className="font-black text-slate-900 text-[11px] leading-tight">{custDetails.name}</h4>
                  <p className="whitespace-pre-line text-[9px] leading-normal">{custDetails.address}</p>
                  {custDetails.phone && <p><span className="text-slate-400">Mobile:</span> {custDetails.phone}</p>}
                  {custDetails.gstin && <p className="font-semibold text-slate-900"><span className="text-slate-400 font-normal">GSTIN:</span> {custDetails.gstin}</p>}
                  {custDetails.pan && <p className="font-mono"><span className="text-slate-400 font-normal">PAN:</span> {custDetails.pan}</p>}
                  <p><span className="text-slate-400">Place of Supply:</span> {custDetails.placeOfSupply}</p>
                </div>
              </div>

              <div className="p-4 space-y-1.5 bg-white/20">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#b48d2d] border-b border-slate-100 pb-0.5">
                  Ship To
                </h3>
                <div className="text-[10.5px] space-y-0.5 text-slate-655">
                  <h4 className="font-black text-slate-900 text-[11px] leading-tight">{shipDetails.name || custDetails.name}</h4>
                  <p className="whitespace-pre-line text-[9px] leading-normal">{shipDetails.address || custDetails.address}</p>
                  <p><span className="text-slate-400">Destination State:</span> {shipDetails.placeOfSupply || custDetails.placeOfSupply}</p>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="border border-slate-200 rounded-sm overflow-hidden">
              <table className="w-full text-left border-collapse text-[10.5px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-605 font-bold">
                    <th className="px-3 py-2 w-8 text-center border-r border-slate-200 font-bold">No</th>
                    <th className="px-3 py-2 border-r border-slate-200 font-bold">Items</th>
                    <th className="px-3 py-2 w-20 text-center border-r border-slate-200 font-bold">HSN/SAC</th>
                    <th className="px-3 py-2 w-16 text-center border-r border-slate-200 font-bold">Qty</th>
                    <th className="px-3 py-2 w-24 text-right border-r border-slate-200 font-mono font-bold">Rate</th>
                    <th className="px-3 py-2 w-24 text-center border-r border-slate-200 font-bold">Tax</th>
                    <th className="px-3 py-2 w-28 text-right font-mono font-bold">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 text-slate-700">
                  {calculations.itemsDetailed.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-3 py-2 text-center border-r border-slate-200 text-slate-400 font-medium">{idx + 1}</td>
                      <td className="px-3 py-2 border-r border-slate-200 text-slate-900 font-semibold">{item.productName}</td>
                      <td className="px-3 py-2 text-center border-r border-slate-200 font-mono font-medium">{item.hsnSac || "—"}</td>
                      <td className="px-3 py-2 text-center border-r border-slate-200 font-bold">{item.qty} PCS</td>
                      <td className="px-3 py-2 text-right border-r border-slate-200 font-mono font-medium">₹{item.rate.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                      <td className="px-3 py-2 text-center border-r border-slate-200 leading-tight">
                        <span className="block font-bold">₹{item.taxAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                        <span className="text-[8.5px] text-slate-400">({item.gstRate}%)</span>
                      </td>
                      <td className="px-3 py-2 text-right font-mono font-bold text-slate-900">₹{item.totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}

                  {/* Subtotal Row */}
                  <tr className="bg-slate-150/40 font-black text-slate-900 border-t border-slate-300">
                    <td colSpan="3" className="px-3 py-2 text-right uppercase border-r border-slate-200 tracking-wider">
                      SUBTOTAL
                    </td>
                    <td className="px-3 py-2 text-center border-r border-slate-200">{calculations.totalQty}</td>
                    <td className="px-3 py-2 border-r border-slate-200"></td>
                    <td className="px-3 py-2 text-center border-r border-slate-200 font-mono">
                      ₹{calculations.totalTax.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-3 py-2 text-right font-mono font-bold">
                      ₹{calculations.finalTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Calculations */}
            <div className="grid grid-cols-2 gap-6 items-start pt-1">
              <div className="space-y-3">
                <div className="text-[9.5px] text-slate-500 leading-relaxed bg-white p-3.5 rounded-sm border border-slate-200">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-0.5">Terms & Conditions</h4>
                  <p className="whitespace-pre-line leading-normal">{invoice.terms}</p>
                </div>
                <div className="text-[9.5px] text-slate-505 leading-relaxed bg-white p-3.5 rounded-sm border border-slate-200">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-0.5">Settlement Bank details</h4>
                  <p className="leading-tight text-slate-655">
                    Account: <span className="font-semibold text-slate-800 font-mono">{company.bankAccountNo}</span><br />
                    Bank Name: <span className="font-semibold text-slate-800">{company.bankName}</span><br />
                    IFSC Code: <span className="font-semibold text-slate-800 font-mono">{company.bankIfsc}</span>
                  </p>
                  
                  {/* UPI QR scan block */}
                  {(company.qrCodeUrl || company.upiId) && (
                    <div className="mt-2.5 pt-2.5 border-t border-dashed border-slate-200 flex items-center gap-4">
                      {company.qrCodeUrl && (
                        <img 
                          src={company.qrCodeUrl} 
                          alt="UPI QR" 
                          className="w-16 h-16 object-contain border border-slate-200 p-0.5 rounded bg-white"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}
                      <div>
                        <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400 leading-none mb-0.5">UPI Settlement Address</span>
                        <span className="font-mono font-bold text-slate-800 text-[9.5px] leading-tight block">{company.upiId || "—"}</span>
                        <span className="block text-[7px] text-slate-550 mt-1 leading-none">Scan code with any UPI app to settle payment</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="border border-slate-200 rounded-sm p-3 bg-white/20 divide-y divide-slate-150 text-[10.5px]">
                  <div className="flex justify-between py-1 text-slate-550">
                    <span>Taxable Amount</span>
                    <span className="font-mono font-medium">₹{calculations.totalTaxable.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                  </div>

                  {calculations.taxDetails.map((tax) => {
                    if (calculations.isIntrastate) {
                      const splitRate = tax.rate / 2;
                      const splitTax = tax.tax / 2;
                      return (
                        <React.Fragment key={tax.rate}>
                          <div className="flex justify-between py-1 text-slate-400">
                            <span>CGST @ {splitRate}%</span>
                            <span className="font-mono">₹{splitTax.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                          </div>
                          <div className="flex justify-between py-1 text-slate-400">
                            <span>SGST @ {splitRate}%</span>
                            <span className="font-mono">₹{splitTax.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                          </div>
                        </React.Fragment>
                      );
                    } else {
                      return (
                        <div key={tax.rate} className="flex justify-between py-1 text-slate-400">
                          <span>IGST @ {tax.rate}%</span>
                          <span className="font-mono">₹{tax.tax.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                        </div>
                      );
                    }
                  })}

                  <div className="flex justify-between py-1.5 text-[11px] font-black text-slate-900 border-t border-slate-350">
                    <span>Grand Total</span>
                    <span className="font-mono text-xs text-[#a37e2c] font-black">₹{calculations.finalTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <div className="text-[8.5px] text-slate-500 leading-normal bg-white/50 p-2.5 border border-slate-100 rounded-sm">
                  <span className="block font-bold uppercase tracking-wider text-slate-750 mb-0.5">Total Amount (in words)</span>
                  <span className="italic font-semibold text-slate-950 block">{numberToWords(calculations.finalTotal)}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Signatures */}
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-2.5 text-emerald-800/80 px-3 py-1.5 border border-emerald-100 bg-emerald-50/20 rounded-md">
              <ShieldCheck size={16} />
              <span className="text-[9px] font-bold uppercase tracking-wider">Digitally Verified GST Invoice</span>
            </div>
            <div className="border border-[#d4af37]/40 bg-amber-50/5 p-3 rounded-md w-60 text-center font-sans">
              <div className="h-12 flex items-center justify-center overflow-hidden mb-1">
                {company.signatureUrl ? (
                  <img 
                    src={company.signatureUrl} 
                    alt="Authorized Signature" 
                    className="max-h-12 w-auto object-contain mix-blend-multiply"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <span className="text-slate-350 text-[10px] italic">No signature</span>
                )}
              </div>
              <div className="border-t border-dashed border-slate-300 pt-1.5 text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                Authorized Signatory
                <span className="block text-slate-700 font-bold text-[9px] mt-0.5 leading-none">{company.signatureText}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
