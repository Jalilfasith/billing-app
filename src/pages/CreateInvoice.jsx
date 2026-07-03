import React, { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Printer, Eye, Save, Sparkles, Building, User, MapPin } from "lucide-react";
import { calculateInvoice, numberToWords, getStateFromGstin } from "../utils/calculations";

export default function CreateInvoice({ 
  invoices, 
  setInvoices, 
  customers, 
  products, 
  company, 
  setView, 
  selectedInvoiceId,
  setSelectedInvoiceId 
}) {
  // 1. Initial State Setup
  const [invoiceNo, setInvoiceNo] = useState(() => {
    const count = invoices.length;
    return `JM ${String(count + 1).padStart(2, '0')}`;
  });

  const [invoiceDate, setInvoiceDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  const [dueDate, setDueDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString().split('T')[0];
  });

  // Customer State
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [clientName, setClientName] = useState("JEHIS ONLINE MARKETING");
  const [clientAddress, setClientAddress] = useState("4-306H/10, CMC Nagar (opp. CMC School),\nThammathukonam, Nagercoil, Kanniyakumari, Tamil Nadu, 629004");
  const [clientMobile, setClientMobile] = useState("9442551622");
  const [clientGstin, setClientGstin] = useState("33BPPJ1074G1ZR");
  const [clientPan, setClientPan] = useState("BBPPJ1074G");
  const [clientState, setClientState] = useState("Tamil Nadu");

  // Shipping State
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [shippingName, setShippingName] = useState("JEHIS ONLINE MARKETING");
  const [shippingAddress, setShippingAddress] = useState("4-306H/10, CMC Nagar (opp. CMC School),\nThammathukonam, Nagercoil, Kanniyakumari, Tamil Nadu, 629004");
  const [shippingState, setShippingState] = useState("Tamil Nadu");

  // Line items (default matching reference values)
  const [items, setItems] = useState([
    { productName: "Day cream 50gms", hsnSac: "33049910", qty: 25, rate: 200, gstRate: 18 },
    { productName: "Face cream 30gm", hsnSac: "33049910", qty: 50, rate: 450, gstRate: 18 },
    { productName: "Hair oil 100ml", hsnSac: "33059011", qty: 30, rate: 250, gstRate: 18 }
  ]);

  const [terms, setTerms] = useState(company.terms || "Goods once sold will not be taken back or exchanged");
  const [receivedAmount, setReceivedAmount] = useState(0);

  // Sync shipping if sameAsBilling is checked
  useEffect(() => {
    if (sameAsBilling) {
      setShippingName(clientName);
      setShippingAddress(clientAddress);
      setShippingState(clientState);
    }
  }, [sameAsBilling, clientName, clientAddress, clientState]);

  // Load customer when selected
  const handleCustomerSelect = (id) => {
    setSelectedCustomerId(id);
    if (!id) return;
    const cust = customers.find(c => c.id === id);
    if (cust) {
      setClientName(cust.name);
      setClientAddress(cust.address);
      setClientMobile(cust.phone || "");
      setClientGstin(cust.gstin || "");
      setClientPan(cust.pan || "");
      setClientState(cust.placeOfSupply || "Tamil Nadu");

      if (sameAsBilling) {
        setShippingName(cust.name);
        setShippingAddress(cust.shippingAddress || cust.address);
        setShippingState(cust.placeOfSupply || "Tamil Nadu");
      }
    }
  };

  // Line Items Handlers
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleProductSelect = (index, prodId) => {
    if (!prodId) return;
    const prod = products.find(p => p.id === prodId);
    if (prod) {
      handleItemChange(index, "productName", prod.name);
      handleItemChange(index, "rate", prod.unitPrice);
      handleItemChange(index, "gstRate", prod.gstRate);
      handleItemChange(index, "hsnSac", prod.hsnSac || "");
    }
  };

  const addItemRow = () => {
    setItems([...items, { productName: "", hsnSac: "", qty: 1, rate: 0, gstRate: 18 }]);
  };

  const removeItemRow = (index) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  // Real-time Calculations
  const isInterstate = clientState !== (getStateFromGstin(company.gstin) || "Tamil Nadu");
  const draftInvoice = {
    items,
    receivedAmount,
    isInterstate
  };
  const calculations = calculateInvoice(draftInvoice, company);

  // Submit Handler
  const saveInvoice = () => {
    if (!clientName.trim()) {
      alert("Please specify customer name.");
      return null;
    }

    const newInvoice = {
      id: `inv-${Date.now()}`,
      invoiceNo,
      invoiceDate,
      dueDate,
      customerId: selectedCustomerId || "cust-custom",
      customerDetails: {
        name: clientName,
        address: clientAddress,
        phone: clientMobile,
        gstin: clientGstin,
        pan: clientPan,
        placeOfSupply: clientState
      },
      shippingDetails: {
        name: shippingName,
        address: shippingAddress,
        placeOfSupply: shippingState
      },
      items,
      terms,
      receivedAmount: Number(receivedAmount) || 0,
      isInterstate
    };

    setInvoices([newInvoice, ...invoices]);
    setSelectedInvoiceId(newInvoice.id);
    return newInvoice;
  };

  const handleSaveAndPreview = () => {
    const inv = saveInvoice();
    if (inv) {
      setView("invoice-preview");
    }
  };

  const handlePrintDirectly = () => {
    const inv = saveInvoice();
    if (inv) {
      // Small timeout to allow state to settle and then print
      setTimeout(() => {
        window.print();
      }, 300);
    }
  };

  // Gold Corner SVG Component
  const GoldCorner = ({ className }) => (
    <svg 
      viewBox="0 0 100 100" 
      className={`w-8 h-8 absolute pointer-events-none text-[#d4af37]/75 ${className}`}
      fill="currentColor"
    >
      <circle cx="10" cy="10" r="2" />
      <path d="M 0 0 Q 30 10 30 30 Q 10 30 0 0" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M 4 4 Q 20 4 20 20 Q 4 20 4 4" fill="none" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto pb-12 items-start">
      {/* 2. Left Panel: Forms & Inputs */}
      <div className="w-full lg:w-5/12 space-y-6 no-print">
        {/* Header Title */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-2 uppercase tracking-wider">
              <Sparkles className="text-cyan-400" size={18} /> Real-time Billing Desk
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">Customize your products, prices, and GST codes instantly.</p>
          </div>
        </div>

        {/* Invoice configuration block */}
        <div className="bg-slate-950/45 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-xs font-bold text-white font-extrabold uppercase tracking-widest text-[11px] border-b border-slate-800/50 pb-2.5">
            1. Invoice Registry Dates
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="label-premium">Bill No.</label>
              <input 
                type="text" 
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                className="input-premium font-mono font-bold"
              />
            </div>
            <div>
              <label className="label-premium">Issue Date</label>
              <input 
                type="date" 
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                className="input-premium"
              />
            </div>
            <div>
              <label className="label-premium">Due Date</label>
              <input 
                type="date" 
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="input-premium"
              />
            </div>
          </div>
        </div>

        {/* Customer ("Bill To") block */}
        <div className="bg-slate-950/45 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/50 pb-2.5">
            <h3 className="text-xs font-bold text-white font-extrabold uppercase tracking-widest text-[11px]">
              2. Billing Details (Bill To)
            </h3>
            <select
              value={selectedCustomerId}
              onChange={(e) => handleCustomerSelect(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-300 rounded px-2 py-1 text-[11px] font-bold outline-none focus:border-cyan-500/50 transition"
            >
              <option value="">-- Choose Client --</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <div>
              <label className="label-premium">Business Client Name</label>
              <input 
                type="text"
                placeholder="JEHIS ONLINE MARKETING"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Enter Customer Name" className="input-premium font-semibold"
              />
            </div>
            <div>
              <label className="label-premium">Billing Address</label>
              <textarea 
                rows="2"
                placeholder="Business location details"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                placeholder="Enter Full Address" className="input-premium resize-none leading-relaxed"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-premium">GSTIN</label>
                <input 
                  type="text"
                  placeholder="33XXXXXXXXXXXXX"
                  value={clientGstin}
                  onChange={(e) => setClientGstin(e.target.value.toUpperCase())}
                  className="input-premium font-mono"
                />
              </div>
              <div>
                <label className="label-premium">PAN Number</label>
                <input 
                  type="text"
                  placeholder="ABCDE1234F"
                  value={clientPan}
                  onChange={(e) => setClientPan(e.target.value.toUpperCase())}
                  className="input-premium font-mono"
                />
              </div>
              <div>
                <label className="label-premium">Mobile Contact</label>
                <input 
                  type="text"
                  value={clientMobile}
                  onChange={(e) => setClientMobile(e.target.value)}
                  className="input-premium"
                />
              </div>
              <div>
                <label className="label-premium">Supply Place (State)</label>
                <input 
                  type="text"
                  value={clientState}
                  onChange={(e) => setClientState(e.target.value)}
                  className="input-premium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Shipping details block */}
        <div className="bg-slate-950/45 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/50 pb-2.5">
            <h3 className="text-xs font-bold text-white font-extrabold uppercase tracking-widest text-[11px]">
              3. Shipping Address (Ship To)
            </h3>
            <button
              onClick={() => setSameAsBilling(!sameAsBilling)}
              type="button"
              className={`text-[9px] uppercase tracking-wider font-extrabold px-3 py-1.5 rounded-lg border transition duration-300 ${sameAsBilling 
                ? "bg-cyan-950/40 text-cyan-400 border-cyan-800/40" 
                : "bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700"}`}
            >
              {sameAsBilling ? "✓ Copy Billing" : "Custom Shipping"}
            </button>
          </div>

          {!sameAsBilling && (
            <div className="space-y-3">
              <div>
                <label className="label-premium">Recipient Name</label>
                <input 
                  type="text"
                  placeholder="Enter Recipient Name"
                  value={shippingName}
                  onChange={(e) => setShippingName(e.target.value)}
                  className="input-premium"
                />
              </div>
              <div>
                <label className="label-premium">Shipping Address</label>
                <textarea 
                  rows="2"
                  placeholder="Enter Shipping Address"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="input-premium resize-none leading-relaxed"
                />
              </div>
              <div>
                <label className="label-premium">Destination State</label>
                <input 
                  type="text"
                  placeholder="Enter Destination State"
                  value={shippingState}
                  onChange={(e) => setShippingState(e.target.value)}
                  className="input-premium"
                />
              </div>
            </div>
          )}
          {sameAsBilling && (
            <div className="text-xs text-slate-400 bg-white p-3.5 rounded-xl border border-slate-800/60 flex items-center gap-2">
              <MapPin size={14} className="text-slate-400 shrink-0" />
              <span>Shipping address is set to match customer billing address.</span>
            </div>
          )}
        </div>

        {/* Item listing blocks */}
        <div className="bg-slate-950/45 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-xs font-bold text-white font-extrabold uppercase tracking-widest text-[11px] border-b border-slate-800/50 pb-2.5">
            4. Line Items & GST Calculation
          </h3>

          <div className="space-y-4 divide-y divide-slate-800/60">
            {items.map((item, idx) => (
              <div key={idx} className={`space-y-3 ${idx > 0 ? "pt-4" : ""}`}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                    Item #{idx + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <select
                      onChange={(e) => handleProductSelect(idx, e.target.value)}
                      className="bg-slate-900 border border-slate-800 text-slate-400 rounded px-2 py-1 text-[10px] outline-none font-bold focus:border-cyan-500/50 transition"
                      defaultValue=""
                    >
                      <option value="">-- Catalog --</option>
                      {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItemRow(idx)}
                        className="text-slate-400 hover:text-rose-600 transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-8">
                    <input 
                      type="text"
                      placeholder="Product Description / Name"
                      value={item.productName}
                      onChange={(e) => handleItemChange(idx, "productName", e.target.value)}
                      className="input-premium font-medium"
                    />
                  </div>
                  <div className="col-span-4">
                    <input 
                      type="text"
                      placeholder="HSN/SAC"
                      value={item.hsnSac || ""}
                      onChange={(e) => handleItemChange(idx, "hsnSac", e.target.value)}
                      className="input-premium font-mono font-semibold text-center"
                    />
                  </div>
                  <div className="col-span-4">
                    <label className="label-premium">Qty</label>
                    <input 
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) => handleItemChange(idx, "qty", parseInt(e.target.value) || 0)}
                      className="input-premium font-bold text-center"
                    />
                  </div>
                  <div className="col-span-5">
                    <label className="label-premium">Unit Rate (₹)</label>
                    <input 
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.rate || ""}
                      onChange={(e) => handleItemChange(idx, "rate", parseFloat(e.target.value) || 0)}
                      className="input-premium font-mono font-bold"
                    />
                  </div>
                  <div className="col-span-3">
                    <label className="label-premium">GST</label>
                    <select
                      value={item.gstRate}
                      onChange={(e) => handleItemChange(idx, "gstRate", parseInt(e.target.value) || 0)}
                      className="input-premium font-bold"
                    >
                      <option value="18">18%</option>
                      <option value="12">12%</option>
                      <option value="5">5%</option>
                      <option value="0">0%</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addItemRow}
            className="w-full flex items-center justify-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-bold py-2.5 border border-dashed border-cyan-850 rounded-xl bg-cyan-950/15 hover:bg-cyan-950/30 transition duration-300 mt-2"
          >
            <Plus size={14} /> Add Line Product
          </button>
        </div>

        {/* Action Panel */}
        <div className="bg-slate-950/45 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col gap-2">
          <button
            onClick={handleSaveAndPreview}
            className="w-full btn-neon-cyan py-3 px-4 flex items-center justify-center gap-2 text-xs transition uppercase tracking-wider font-extrabold"
          >
            <Eye size={16} /> Save & Open Invoice Preview
          </button>
          <button
            onClick={handlePrintDirectly}
            className="w-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-extrabold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs border border-slate-800 hover:border-slate-700 transition duration-300 uppercase tracking-wider"
          >
            <Printer size={16} /> Save & Print directly (A4)
          </button>
        </div>
      </div>

      {/* 3. Right Panel: Live-updating A4 Sheet Preview */}
      <div className="w-full lg:w-7/12 flex flex-col items-center sticky top-24 overflow-y-auto max-h-[82vh] p-4 bg-white rounded-2xl border border-slate-200 shadow-sm no-print">
        <span className="text-[9px] text-slate-400 uppercase tracking-widest font-extrabold mb-3 flex items-center gap-1.5">
          <Sparkles size={12} className="text-cyan-400" /> Live-updating Invoice Preview
        </span>

        {/* Scaled A4 Preview Box */}
        <div className="w-full max-w-[210mm] origin-top scale-[0.9] lg:scale-[0.80] xl:scale-[0.95] bg-white text-slate-800 p-8 border border-slate-200 shadow-2xl relative rounded-sm font-sans select-none select-text">
          {/* Double-line inner border like in Nextlife */}
          <div className="absolute inset-2 border border-[#d4af37]/60 pointer-events-none rounded-sm"></div>
          <div className="absolute inset-3 border border-[#d4af37]/40 pointer-events-none rounded-sm"></div>

          {/* Gold corners */}
          <GoldCorner className="top-4 left-4" />
          <GoldCorner className="top-4 right-4 rotate-90" />
          <GoldCorner className="bottom-4 left-4 -rotate-90" />
          <GoldCorner className="bottom-4 right-4 rotate-180" />

          {/* Outer padding spacer */}
          <div className="relative z-10 p-4 space-y-4 text-slate-800">
            {/* Logo/Brand Header */}
            <div className="flex justify-between items-start border-b border-[#d4af37]/20 pb-4">
              <div className="flex gap-3">
                <img 
                  src={company.logoUrl || "/jamil_logo.png"}
                  alt="Jamil Logo" 
                  className="w-16 h-16 object-contain rounded-md"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="space-y-0.5 max-w-md">
                  <h1 className="text-xl font-extrabold text-slate-950 tracking-tight leading-tight font-serif-invoice uppercase">
                    {company.name}
                  </h1>
                  <div className="text-[10px] text-slate-500 leading-normal pt-1.5">
                    <p className="font-semibold text-slate-800">GSTIN: {company.gstin}</p>
                    <p className="text-[9px] text-slate-500 whitespace-pre-line">{company.address}</p>
                  </div>
                </div>
              </div>

              <div className="text-right flex flex-col items-end">
                <div className="border border-slate-900 px-4 py-1.5 bg-white rounded-sm">
                  <h2 className="text-sm font-black text-slate-950 tracking-wider uppercase leading-none">
                    TAX INVOICE
                  </h2>
                </div>
                <div className="border border-slate-300 px-3 py-0.5 mt-1 bg-white text-[8px] font-bold text-slate-400 rounded-sm">
                  ORIGINAL
                </div>
              </div>
            </div>

            {/* Dates box */}
            <div className="grid grid-cols-3 border border-slate-200 divide-x divide-slate-200 text-[10px] font-semibold text-slate-700 bg-white/50 rounded-sm">
              <div className="p-2">
                <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Invoice No.</span>
                <span className="text-slate-900 font-bold font-mono">{invoiceNo}</span>
              </div>
              <div className="p-2">
                <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Invoice Date</span>
                <span className="text-slate-900">{new Date(invoiceDate).toLocaleDateString("en-IN")}</span>
              </div>
              <div className="p-2">
                <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Due Date</span>
                <span className="text-slate-900">{new Date(dueDate).toLocaleDateString("en-IN")}</span>
              </div>
            </div>

            {/* Client address grids */}
            <div className="grid grid-cols-2 border border-[#d4af37]/25 rounded-sm divide-x divide-amber-600/10">
              <div className="p-3 space-y-1 bg-white">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#b48d2d] border-b border-slate-100 pb-0.5">
                  Bill To
                </h3>
                <div className="text-[10px] space-y-0.5 text-slate-600">
                  <h4 className="font-black text-slate-900 text-[11px] leading-tight">{clientName}</h4>
                  <p className="whitespace-pre-line text-[9px] leading-normal">{clientAddress}</p>
                  {clientMobile && <p><span className="text-slate-400">Mobile:</span> {clientMobile}</p>}
                  {clientGstin && <p className="font-semibold text-slate-900"><span className="text-slate-400 font-normal">GSTIN:</span> {clientGstin}</p>}
                  {clientPan && <p className="font-mono"><span className="text-slate-400 font-normal">PAN:</span> {clientPan}</p>}
                  <p><span className="text-slate-400">Place of Supply:</span> {clientState}</p>
                </div>
              </div>

              <div className="p-3 space-y-1 bg-white">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-amber-700 border-b border-slate-100 pb-0.5">
                  Ship To
                </h3>
                <div className="text-[10px] space-y-0.5 text-slate-600">
                  <h4 className="font-black text-slate-900 text-[11px] leading-tight">{shippingName}</h4>
                  <p className="whitespace-pre-line text-[9px] leading-normal">{shippingAddress}</p>
                  <p><span className="text-slate-400">Destination:</span> {shippingState}</p>
                </div>
              </div>
            </div>

            {/* Invoices Table */}
            <div className="border border-slate-200 rounded-sm overflow-hidden">
              <table className="w-full text-left border-collapse text-[10px]">
                <thead>
                  <tr className="bg-white border-b border-slate-200 text-slate-600 font-bold">
                    <th className="px-3 py-2 w-8 text-center border-r border-slate-200 font-bold">No</th>
                    <th className="px-3 py-2 border-r border-slate-200 font-bold">Items</th>
                    <th className="px-3 py-2 w-20 text-center border-r border-slate-200 font-bold">HSN/SAC</th>
                    <th className="px-3 py-2 w-16 text-center border-r border-slate-200 font-bold">Qty</th>
                    <th className="px-3 py-2 w-20 text-right border-r border-slate-200 font-mono font-bold">Rate</th>
                    <th className="px-3 py-2 w-20 text-center border-r border-slate-200 font-bold">Tax</th>
                    <th className="px-3 py-2 w-24 text-right font-mono font-bold">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 text-slate-700">
                  {calculations.itemsDetailed.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-3 py-2 text-center border-r border-slate-200 text-slate-400 font-medium">{idx + 1}</td>
                      <td className="px-3 py-2 border-r border-slate-200 text-slate-900 font-semibold">{item.productName || "Custom Product"}</td>
                      <td className="px-3 py-2 text-center border-r border-slate-200 font-mono font-medium">{item.hsnSac || "—"}</td>
                      <td className="px-3 py-2 text-center border-r border-slate-200 font-bold">{item.qty} PCS</td>
                      <td className="px-3 py-2 text-right border-r border-slate-200 font-mono font-medium">₹{item.rate.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                      <td className="px-3 py-2 text-center border-r border-slate-200 leading-tight">
                        <span className="block font-bold">₹{item.taxAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                        <span className="text-[8px] text-slate-400">({item.gstRate}%)</span>
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
                    <td className="px-3 py-2 text-right font-mono">
                      ₹{calculations.finalTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Calculations and Terms */}
            <div className="grid grid-cols-2 gap-4 items-start pt-1">
              <div className="space-y-3">
                <div className="text-[9px] text-slate-500 leading-relaxed bg-white p-3 rounded-sm border border-slate-200">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-0.5">Terms & Conditions</h4>
                  <p className="whitespace-pre-line leading-normal">{terms}</p>
                </div>
                <div className="text-[9px] text-slate-500 leading-relaxed bg-white p-2.5 rounded-sm border border-slate-200">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-0.5">Bank Settlement Details</h4>
                  <p className="leading-tight text-slate-600">
                    Account: <span className="font-semibold text-slate-800 font-mono">{company.bankAccountNo}</span><br />
                    Bank: <span className="font-semibold text-slate-800">{company.bankName}</span> &nbsp;|&nbsp; IFSC: <span className="font-semibold text-slate-800 font-mono">{company.bankIfsc}</span>
                  </p>
                  
                  {/* UPI QR scan block */}
                  {(company.qrCodeUrl || company.upiId) && (
                    <div className="mt-2 pt-2 border-t border-dashed border-slate-200 flex items-center gap-3">
                      {company.qrCodeUrl && (
                        <img 
                          src={company.qrCodeUrl} 
                          alt="UPI QR" 
                          className="w-14 h-14 object-contain border border-slate-200 p-0.5 rounded bg-white"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}
                      <div>
                        <span className="block text-[7px] font-bold uppercase tracking-wider text-slate-400 leading-none mb-0.5">UPI Settlement Address</span>
                        <span className="font-mono font-bold text-slate-800 text-[8.5px] leading-tight block">{company.upiId || "—"}</span>
                        <span className="block text-[6.5px] text-slate-500 mt-0.5 leading-none">Scan code with any UPI app to settle payment</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="border border-slate-200 rounded-sm p-3 bg-white divide-y divide-slate-150 text-[10px]">
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

                <div className="text-[8px] text-slate-500 leading-normal bg-white/50 p-2 border border-slate-100 rounded-sm">
                  <span className="block font-bold uppercase tracking-wider text-slate-700 mb-0.5">Total Amount (in words)</span>
                  <span className="italic font-semibold text-slate-950 block">{numberToWords(calculations.finalTotal)}</span>
                </div>
              </div>
            </div>

            {/* Signature Block */}
            <div className="flex justify-end pt-1">
              <div className="border border-[#d4af37]/30 bg-[#fefdfa] p-3 rounded-md w-56 text-center">
                <div className="h-10 flex items-center justify-center overflow-hidden mb-1">
                  {company.signatureUrl ? (
                    <img 
                      src={company.signatureUrl} 
                      alt="Authorized Signature" 
                      className="max-h-10 w-auto object-contain mix-blend-multiply"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <span className="text-slate-300 text-[10px] italic">No signature</span>
                  )}
                </div>
                <div className="border-t border-dashed border-slate-300 pt-1 text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                  Authorized Signatory
                  <span className="block text-slate-700 font-bold text-[9px] mt-0.5 leading-none">{company.signatureText}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
