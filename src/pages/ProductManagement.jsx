import React, { useState } from "react";
import { Plus, Edit2, Trash2, Search, Package, Save, X } from "lucide-react";

export default function ProductManagement({ products, setProducts, setView }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);
  const [gstRate, setGstRate] = useState(18);
  const [hsnSac, setHsnSac] = useState("");

  const startEdit = (prod) => {
    setEditingId(prod.id);
    setName(prod.name);
    setUnitPrice(prod.unitPrice);
    setGstRate(prod.gstRate || 18);
    setHsnSac(prod.hsnSac || "");
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    clearForm();
  };

  const clearForm = () => {
    setName("");
    setUnitPrice(0);
    setGstRate(18);
    setHsnSac("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingId) {
      // Edit
      setProducts(products.map(p => p.id === editingId ? {
        ...p, name, unitPrice: Number(unitPrice), gstRate: Number(gstRate), hsnSac
      } : p));
      setEditingId(null);
    } else {
      // Add
      const newProd = {
        id: `prod-${Date.now()}`,
        name,
        unitPrice: Number(unitPrice),
        gstRate: Number(gstRate),
        hsnSac
      };
      setProducts([...products, newProd]);
      setIsAdding(false);
    }
    clearForm();
    alert("Product saved to catalogue!");
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Product Catalogue</h2>
          <p className="text-slate-500 text-sm mt-0.5">Manage products list, base unit prices, and standard GST tax brackets.</p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={() => { setIsAdding(true); clearForm(); }}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition"
          >
            + Add New Product
          </button>
        )}
      </div>

      {/* Editor Frame */}
      {(isAdding || editingId) && (
        <div className="bg-white p-6 rounded-xl border border-slate-850 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/50 pb-3">
            <h3 className="font-bold text-slate-900">
              {editingId ? "Edit Product Details" : "Add Product to Database"}
            </h3>
            <button onClick={cancelEdit} className="text-slate-500 hover:text-slate-300">
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Product Name / Description
              </label>
              <input
                type="text"
                placeholder="e.g. Day cream 50gms"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Base Unit Price (₹)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={unitPrice || ""}
                onChange={(e) => setUnitPrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-mono font-semibold"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                HSN / SAC Code
              </label>
              <input
                type="text"
                placeholder="e.g. 33049910"
                value={hsnSac}
                onChange={(e) => setHsnSac(e.target.value)}
                className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-mono font-semibold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Default GST Rate (%)
              </label>
              <select
                value={gstRate}
                onChange={(e) => setGstRate(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-bold"
              >
                <option value="18">18% GST (Standard Cosmetics/Herbal)</option>
                <option value="12">12% GST</option>
                <option value="5">5% GST</option>
                <option value="0">0% GST (Nil)</option>
                <option value="28">28% GST</option>
              </select>
            </div>

            <div className="flex items-end justify-end gap-2 pt-2 md:col-span-1 md:col-start-4">
              <button
                type="button"
                onClick={cancelEdit}
                className="px-4 py-2 rounded-lg border border-slate-850 text-slate-300 hover:bg-slate-950/40 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-slate-900 text-white hover:text-amber-400 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition"
              >
                <Save size={14} /> Save Product
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Catalog Table */}
      <div className="bg-white rounded-xl border border-slate-850 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-850 flex items-center justify-between">
          <div className="relative w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search catalogue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg pl-9 pr-3 py-1.5 text-xs outline-none transition"
            />
          </div>
          <span className="text-xs text-slate-500">Items: {filteredProducts.length}</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(prod => (
              <div key={prod.id} className="p-4 flex items-center justify-between hover:bg-slate-950/40/30 transition">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 text-amber-800 p-2.5 rounded-xl shrink-0">
                    <Package size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{prod.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Base Rate: <span className="font-semibold text-slate-200">₹{prod.unitPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                      &nbsp;•&nbsp; GST Bracket: <span className="font-semibold text-emerald-600">{prod.gstRate}%</span>
                      {prod.hsnSac && <span>&nbsp;•&nbsp; HSN/SAC: <span className="font-semibold text-slate-700 font-mono">{prod.hsnSac}</span></span>}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEdit(prod)}
                    className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                    title="Edit Product"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(prod.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title="Delete Product"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500 text-sm">
              No products found in catalog. Click "Add New Product" to populate items.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
