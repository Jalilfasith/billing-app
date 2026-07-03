import React, { useState } from "react";
import { Plus, Edit2, Trash2, Search, User, MapPin, Save, X } from "lucide-react";

export default function CustomerDetails({ customers, setCustomers, setView }) {
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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingId) {
      // Edit
      setCustomers(customers.map(c => c.id === editingId ? {
        ...c, name, address, shippingAddress, phone, gstin, pan, placeOfSupply
      } : c));
      setEditingId(null);
    } else {
      // Add
      const newCust = {
        id: `cust-${Date.now()}`,
        name, address, shippingAddress, phone, gstin, pan, placeOfSupply
      };
      setCustomers([...customers, newCust]);
      setIsAdding(false);
    }
    clearForm();
    alert("Customer details saved!");
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.gstin && c.gstin.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Customers Catalog</h2>
          <p className="text-slate-500 text-sm mt-0.5">Manage registered clients, default billing and shipping addresses.</p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={() => { setIsAdding(true); clearForm(); }}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition"
          >
            + Register New Client
          </button>
        )}
      </div>

      {/* Editor Panel (Add / Edit) */}
      {(isAdding || editingId) && (
        <div className="bg-white p-6 rounded-xl border border-slate-850 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/50 pb-3">
            <h3 className="font-bold text-slate-900">
              {editingId ? "Edit Customer Registry" : "Register New Business Client"}
            </h3>
            <button onClick={cancelEdit} className="text-slate-500 hover:text-slate-300">
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Client / Business Name
              </label>
              <input
                type="text"
                placeholder="e.g. JEHIS ONLINE MARKETING"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                GSTIN
              </label>
              <input
                type="text"
                placeholder="33XXXXXXXXXXXXX"
                value={gstin}
                onChange={(e) => setGstin(e.target.value.toUpperCase())}
                className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                PAN Number
              </label>
              <input
                type="text"
                placeholder="ABCDE1234F"
                value={pan}
                onChange={(e) => setPan(e.target.value.toUpperCase())}
                className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Mobile / Phone
              </label>
              <input
                type="text"
                placeholder="9442551622"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Place of Supply (State)
              </label>
              <input
                type="text"
                placeholder="Tamil Nadu"
                value={placeOfSupply}
                onChange={(e) => setPlaceOfSupply(e.target.value)}
                className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Billing Address
              </label>
              <textarea
                rows="2"
                placeholder="Street address, City, PIN"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Shipping Address
              </label>
              <textarea
                rows="2"
                placeholder="Shipping destination (Leave empty if same as billing)"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition resize-none"
              />
            </div>

            <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2 border-t border-slate-800/50">
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
                <Save size={14} /> Save Customer
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Customer List Card */}
      <div className="bg-white rounded-xl border border-slate-850 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-850 flex items-center justify-between">
          <div className="relative w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg pl-9 pr-3 py-1.5 text-xs outline-none transition"
            />
          </div>
          <span className="text-xs text-slate-500">Registered: {filteredCustomers.length}</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map(cust => (
              <div key={cust.id} className="p-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 hover:bg-slate-950/40/30 transition">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 text-amber-800 p-2.5 rounded-xl shrink-0">
                    <User size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-base">{cust.name}</h4>
                    {cust.gstin && (
                      <p className="text-xs text-slate-700 font-semibold font-mono">
                        GSTIN: {cust.gstin} &nbsp;|&nbsp; PAN: {cust.pan || "N/A"}
                      </p>
                    )}
                    <p className="text-xs text-slate-500 flex items-start gap-1">
                      <MapPin size={12} className="shrink-0 mt-0.5" />
                      <span>{cust.address}</span>
                    </p>
                    {cust.shippingAddress && cust.shippingAddress !== cust.address && (
                      <p className="text-[11px] text-slate-500 italic">
                        Ships to: {cust.shippingAddress}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-start">
                  <button
                    onClick={() => startEdit(cust)}
                    className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                    title="Edit Customer"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(cust.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
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
    </div>
  );
}
