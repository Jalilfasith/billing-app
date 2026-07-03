import React, { useState } from "react";
import { Save, Building, Phone, Mail, Globe, MapPin, Landmark } from "lucide-react";

export default function CompanyDetails({ company, setCompany, setView }) {
  const [formData, setFormData] = useState({ ...company });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, qrCodeUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCompany(formData);
    alert("Company details saved successfully!");
    setView("dashboard");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Company & GST Registration Profile</h2>
        <p className="text-slate-500 text-sm mt-0.5">Edit billing address details, bank information, and defaults.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Info */}
            <div className="bg-slate-950/45 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-800/50">
                <Building size={18} className="text-amber-500" /> Business Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Trade Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Legal Name (Proprietor)
                  </label>
                  <input
                    type="text"
                    name="legalName"
                    value={formData.legalName}
                    onChange={handleChange}
                    className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Subtitle / Description
                  </label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    GSTIN
                  </label>
                  <input
                    type="text"
                    name="gstin"
                    value={formData.gstin}
                    onChange={handleChange}
                    className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-mono font-bold"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Principal Place of Business (Billing Address)
                  </label>
                  <textarea
                    rows="3"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition resize-none leading-relaxed"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Phone Contact
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Bank details & Defaults */}
            <div className="bg-slate-950/45 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-800/50">
                <Landmark size={18} className="text-amber-500" /> Bank & Signature Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    name="bankAccountNo"
                    value={formData.bankAccountNo}
                    onChange={handleChange}
                    className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Bank Branch
                  </label>
                  <input
                    type="text"
                    name="bankBranch"
                    value={formData.bankBranch}
                    onChange={handleChange}
                    className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    name="bankIfsc"
                    value={formData.bankIfsc}
                    onChange={handleChange}
                    className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-mono"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Authorized Signatory Subtitle
                  </label>
                  <input
                    type="text"
                    name="signatureText"
                    value={formData.signatureText}
                    onChange={handleChange}
                    className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    UPI Address / ID
                  </label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId || ""}
                    onChange={handleChange}
                    className="w-full bg-slate-950/40 focus:bg-white border border-slate-850 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-mono"
                    placeholder="e.g. jamilgroups@sbi"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Settlement QR Code
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full bg-slate-950/40 border border-slate-850 rounded-lg px-3 py-1.5 text-xs outline-none transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Preview Side */}
          <div className="space-y-6">
            <div className="bg-slate-950/65 text-white p-6 rounded-2xl border border-cyan-800/50 shadow-2xl backdrop-blur-xl">
              <h4 className="font-bold text-amber-400 mb-3 text-sm uppercase tracking-wider">Active Profile Summary</h4>
              <div className="space-y-3.5 text-xs text-slate-300">
                <div>
                  <span className="block text-slate-500 font-bold uppercase tracking-wider text-[10px]">Company Name</span>
                  <span className="text-white text-sm font-bold">{formData.name}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-bold uppercase tracking-wider text-[10px]">Seller GSTIN</span>
                  <span className="text-emerald-400 font-bold font-mono text-sm">{formData.gstin}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-bold uppercase tracking-wider text-[10px]">Seller State</span>
                  <span>Tamil Nadu (State Code: 33)</span>
                </div>
                <div className="border-t border-slate-800 pt-3">
                  <span className="block text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-2">Settlement QR Check</span>
                  <div className="bg-white/5 border border-white/10 rounded p-2 flex items-center justify-center h-16 mb-3">
                    {formData.qrCodeUrl ? (
                      <img 
                        src={formData.qrCodeUrl} 
                        alt="QR Code Preview" 
                        className="max-h-12 w-auto object-contain"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <span className="text-slate-500 text-[10px]">No QR Code</span>
                    )}
                  </div>
                </div>
                <div className="border-t border-slate-800 pt-3">
                  <span className="block text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-2">Signature Asset Check</span>
                  <div className="bg-white/5 border border-white/10 rounded p-2 flex items-center justify-center h-16">
                    {formData.signatureUrl ? (
                      <img 
                        src={formData.signatureUrl} 
                        alt="Signature Preview" 
                        className="max-h-12 w-auto object-contain invert brightness-200"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <span className="text-slate-500 text-[10px]">No signature</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-850 text-white hover:text-amber-400 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition"
            >
              <Save size={18} /> Save Settings & Apply
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
