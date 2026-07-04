import React, { useState } from "react";
import { Edit2, Trash2, Search, Package, Save, X } from "lucide-react";
import { motion } from "framer-motion";
import * as api from "../lib/api";
export default function ProductManagement({ products, setProducts, _setView }) {
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        console.error(err);
        alert("Failed to delete from database. Will remove locally.");
        setProducts(products.filter(p => p.id !== id));
      }
    }
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSaving(true);
    try {
      if (editingId) {
        // Edit
        const updatedProd = { id: editingId, name, unitPrice: Number(unitPrice), gstRate: Number(gstRate), hsnSac };
        await api.updateProduct(updatedProd);
        setProducts(products.map(p => p.id === editingId ? updatedProd : p));
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
        await api.addProduct(newProd);
        setProducts([newProd, ...products]);
        setIsAdding(false);
      }
      clearForm();
      alert("Product saved to catalogue!");
    } catch (err) {
      console.error(err);
      alert("Failed to save to database. Check console.");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 relative z-10"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white font-heading">Product Catalogue</h2>
          <p className="text-slate-400 text-sm mt-0.5">Manage products list, base unit prices, and standard GST tax brackets.</p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={() => { setIsAdding(true); clearForm(); }}
            className="btn-premium-gradient font-bold px-5 py-2.5 rounded-xl text-xs transition cursor-pointer shadow-lg shadow-brand-primary/10"
          >
            + Add New Product
          </button>
        )}
      </div>

      {/* Editor Frame */}
      {(isAdding || editingId) && (
        <div className="card-glass p-6 space-y-4 bg-slate-950/20">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="font-extrabold text-white text-base">
              {editingId ? "Edit Product Details" : "Add Product to Database"}
            </h3>
            <button onClick={cancelEdit} className="text-slate-400 hover:text-white transition cursor-pointer">
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <label className="label-premium">
                Product Name / Description
              </label>
              <input
                type="text"
                placeholder="e.g. Day cream 50gms"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-premium font-semibold"
                required
              />
            </div>

            <div>
              <label className="label-premium">
                Base Unit Price (₹)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={unitPrice || ""}
                onChange={(e) => setUnitPrice(parseFloat(e.target.value) || 0)}
                className="input-premium font-mono font-semibold"
                required
              />
            </div>

            <div>
              <label className="label-premium">
                HSN / SAC Code
              </label>
              <input
                type="text"
                placeholder="e.g. 33049910"
                value={hsnSac}
                onChange={(e) => setHsnSac(e.target.value)}
                className="input-premium font-mono font-semibold"
              />
            </div>
            <div className="md:col-span-2">
              <label className="label-premium">
                Default GST Rate (%)
              </label>
              <select
                value={gstRate}
                onChange={(e) => setGstRate(parseInt(e.target.value) || 0)}
                className="input-premium font-bold cursor-pointer"
              >
                <option value="18">18% GST (Standard Cosmetics/Herbal)</option>
                <option value="12">12% GST</option>
                <option value="5">5% GST</option>
                <option value="0">0% GST (Nil)</option>
                <option value="28">28% GST</option>
              </select>
            </div>

            <div className="flex items-end justify-end gap-2 pt-2 md:col-span-2 flex-wrap">
              <button
                type="button"
                onClick={cancelEdit}
                className="btn-cyber-outline px-4 py-2.5 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isSaving}
                className="w-full btn-premium-gradient py-3 text-xs uppercase font-extrabold tracking-wider mt-2 flex items-center justify-center gap-2"
              >
                <Save size={16} />
                {isSaving ? "Saving..." : (editingId ? "Update Product" : "Save New Product")}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Catalog Table */}
      <div className="card-glass overflow-hidden bg-slate-950/20">
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-slate-950/35">
          <div className="relative w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search catalogue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-premium pl-9 py-2 text-xs"
            />
          </div>
          <span className="text-xs text-slate-450 font-bold">Items: {filteredProducts.length}</span>
        </div>

        <div className="divide-y divide-white/5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(prod => (
              <div key={prod.id} className="p-4 flex items-center justify-between hover:bg-white/2 transition">
                <div className="flex items-center gap-3.5">
                  <div className="bg-brand-primary/10 text-brand-secondary p-3 rounded-xl shrink-0 border border-brand-primary/20">
                    <Package size={20} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-sm leading-snug">{prod.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Base Rate: <span className="font-bold text-white font-mono">₹{prod.unitPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                      &nbsp;•&nbsp; GST Bracket: <span className="font-bold text-brand-secondary">{prod.gstRate}%</span>
                      {prod.hsnSac && <span>&nbsp;•&nbsp; HSN/SAC: <span className="font-bold text-slate-350 font-mono">{prod.hsnSac}</span></span>}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEdit(prod)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition cursor-pointer"
                    title="Edit Product"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(prod.id)}
                    className="p-2 text-slate-400 hover:text-rose-450 hover:bg-rose-500/10 rounded-xl transition cursor-pointer"
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
    </motion.div>
  );
}
