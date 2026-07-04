import React, { useState } from "react";
import { Edit2, Trash2, Search, User, MapPin, Save, X } from "lucide-react";
import { motion } from "framer-motion";
import * as api from "../lib/api";
export default function CustomerDetails({ customers, setCustomers, _setView }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gstin, setGstin] = useState("");
  const [pan, setPan] = useState("");
  const [placeOfSupply, setPlaceOfSupply] = useState("Tamil Nadu");

  const startEdit = (cust) => {
    setEditingId(cust.id);
    setName(cust.name);
    setAddress(cust.address);
    setShippingAddress(cust.shippingAddress || cust.address);
    setPhone(cust.phone || "");
    setGstin(cust.gstin || "");
    setPan(cust.pan || "");
    setPlaceOfSupply(cust.placeOfSupply || "Tamil Nadu");
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    clearForm();
  };

  const clearForm = () => {
    setName("");
    setAddress("");
    setShippingAddress("");
    setPhone("");
    setGstin("");
    setPan("");
    setPlaceOfSupply("Tamil Nadu");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await api.deleteCustomer(id);
        setCustomers(customers.filter(c => c.id !== id));
      } catch (err) {
        console.error(err);
        alert("Failed to delete from database. Will remove locally.");
        setCustomers(customers.filter(c => c.id !== id));
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
        const updatedCust = { id: editingId, name, address, shippingAddress, phone, gstin, pan, placeOfSupply };
        await api.updateCustomer(updatedCust);
        setCustomers(customers.map(c => c.id === editingId ? updatedCust : c));
        setEditingId(null);
      } else {
        // Add
        const newCust = {
          id: `cust-${Date.now()}`,
          name, address, shippingAddress, phone, gstin, pan, placeOfSupply
        };
        await api.addCustomer(newCust);
        setCustomers([newCust, ...customers]);
        setIsAdding(false);
      }
      clearForm();
      alert("Customer details saved!");
    } catch (err) {
      console.error(err);
      alert("Failed to save to database. Check console.");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.gstin && c.gstin.toLowerCase().includes(searchTerm.toLowerCase()))
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
          <h2 className="text-2xl font-extrabold text-white font-heading">Customers Catalog</h2>
          <p className="text-slate-400 text-sm mt-0.5">Manage registered clients, default billing and shipping addresses.</p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={() => { setIsAdding(true); clearForm(); }}
            className="btn-premium-gradient font-bold px-5 py-2.5 rounded-xl text-xs transition cursor-pointer shadow-lg shadow-brand-primary/10"
          >
            + Register New Client
          </button>
        )}
      </div>

      {/* Editor Panel (Add / Edit) */}
      {(isAdding || editingId) && (
        <div className="card-glass p-6 space-y-4 bg-slate-950/20">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="font-extrabold text-white text-base">
              {editingId ? "Edit Customer Registry" : "Register New Business Client"}
            </h3>
            <button onClick={cancelEdit} className="text-slate-400 hover:text-white transition cursor-pointer">
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="label-premium">
                Client / Business Name
              </label>
              <input
                type="text"
                placeholder="e.g. JEHIS ONLINE MARKETING"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-premium font-semibold"
                required
              />
            </div>

            <div>
              <label className="label-premium">
                GSTIN
              </label>
              <input
                type="text"
                placeholder="33XXXXXXXXXXXXX"
                value={gstin}
                onChange={(e) => setGstin(e.target.value.toUpperCase())}
                className="input-premium font-mono"
              />
            </div>

            <div>
              <label className="label-premium">
                PAN Number
              </label>
              <input
                type="text"
                placeholder="ABCDE1234F"
                value={pan}
                onChange={(e) => setPan(e.target.value.toUpperCase())}
                className="input-premium font-mono"
              />
            </div>

            <div>
              <label className="label-premium">
                Mobile / Phone
              </label>
              <input
                type="text"
                placeholder="9442551622"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-premium"
              />
            </div>

            <div>
              <label className="label-premium">
                Place of Supply (State)
              </label>
              <input
                type="text"
                placeholder="Tamil Nadu"
                value={placeOfSupply}
                onChange={(e) => setPlaceOfSupply(e.target.value)}
                className="input-premium"
              />
            </div>

            <div>
              <label className="label-premium">
                Billing Address
              </label>
              <textarea
                rows="2"
                placeholder="Street address, City, PIN"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="input-premium resize-none"
                required
              />
            </div>

            <div>
              <label className="label-premium">
                Shipping Address
              </label>
              <textarea
                rows="2"
                placeholder="Shipping destination (Leave empty if same as billing)"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="input-premium resize-none"
              />
            </div>

            <div className="md:col-span-2 flex items-center justify-end gap-2 pt-3 border-t border-white/5">
              <button
                type="button"
                onClick={cancelEdit}
                className="btn-cyber-outline px-4 py-2 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isSaving}
                className="w-full btn-premium-gradient py-3 text-xs uppercase font-extrabold tracking-wider mt-2 flex items-center justify-center gap-2"
              >
                <Save size={16} />
                {isSaving ? "Saving..." : (editingId ? "Update Customer" : "Save New Customer")}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Customer List Card */}
      <div className="card-glass overflow-hidden bg-slate-950/20">
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-slate-950/35">
          <div className="relative w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-premium pl-9 py-2 text-xs"
            />
          </div>
          <span className="text-xs text-slate-450 font-bold">Registered: {filteredCustomers.length}</span>
        </div>

        <div className="divide-y divide-white/5">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map(cust => (
              <div key={cust.id} className="p-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 hover:bg-white/2 transition">
                <div className="flex items-start gap-3.5">
                  <div className="bg-brand-primary/10 text-brand-secondary p-3 rounded-xl shrink-0 border border-brand-primary/20">
                    <User size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-white text-base leading-tight">{cust.name}</h4>
                    {cust.gstin && (
                      <p className="text-xs text-slate-300 font-semibold font-mono">
                        GSTIN: <span className="text-brand-secondary">{cust.gstin}</span> &nbsp;|&nbsp; PAN: <span className="text-brand-accent">{cust.pan || "N/A"}</span>
                      </p>
                    )}
                    <p className="text-xs text-slate-400 flex items-start gap-1 leading-relaxed">
                      <MapPin size={12} className="shrink-0 mt-0.5 text-slate-500" />
                      <span>{cust.address}</span>
                    </p>
                    {cust.shippingAddress && cust.shippingAddress !== cust.address && (
                      <p className="text-[11px] text-slate-450 italic leading-none">
                        Ships to: {cust.shippingAddress}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-start">
                  <button
                    onClick={() => startEdit(cust)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition cursor-pointer"
                    title="Edit Customer"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(cust.id)}
                    className="p-2 text-slate-400 hover:text-rose-450 hover:bg-rose-500/10 rounded-xl transition cursor-pointer"
                    title="Delete Customer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500 text-sm">
              No clients found. Click "Register New Client" to start adding.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
