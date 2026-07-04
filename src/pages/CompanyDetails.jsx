import React, { useState } from "react";
import { Save, Building, Landmark } from "lucide-react";
import { motion } from "framer-motion";
import * as api from "../lib/api";

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

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.saveCompany(formData);
      setCompany(formData);
      alert("Company details saved successfully to database!");
      setView("dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to save to database. Will use local cache.");
      setCompany(formData);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-4xl mx-auto pb-12 relative z-10"
    >
      <div>
        <h2 className="text-2xl font-extrabold text-white font-heading">Company & GST Registration Profile</h2>
        <p className="text-slate-400 text-sm mt-0.5">Edit billing address details, bank information, and defaults.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Info */}
            <div className="card-glass p-6 space-y-4 bg-slate-950/20">
              <h3 className="font-extrabold text-white flex items-center gap-2 pb-2 border-b border-white/5 text-base">
                <Building size={18} className="text-brand-secondary" /> Business Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label-premium">
                    Trade Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-premium font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="label-premium">
                    Legal Name (Proprietor)
                  </label>
                  <input
                    type="text"
                    name="legalName"
                    value={formData.legalName}
                    onChange={handleChange}
                    className="input-premium"
                  />
                </div>

                <div>
                  <label className="label-premium">
                    Subtitle / Description
                  </label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    className="input-premium"
                  />
                </div>

                <div>
                  <label className="label-premium">
                    GSTIN
                  </label>
                  <input
                    type="text"
                    name="gstin"
                    value={formData.gstin}
                    onChange={handleChange}
                    className="input-premium font-mono font-bold"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="label-premium">
                    Principal Place of Business (Billing Address)
                  </label>
                  <textarea
                    rows="3"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="input-premium resize-none leading-relaxed"
                    required
                  />
                </div>

                <div>
                  <label className="label-premium">
                    Phone Contact
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-premium"
                  />
                </div>

                <div>
                  <label className="label-premium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-premium"
                  />
                </div>
              </div>
            </div>

            {/* Bank details & Defaults */}
            <div className="card-glass p-6 space-y-4 bg-slate-950/20">
              <h3 className="font-extrabold text-white flex items-center gap-2 pb-2 border-b border-white/5 text-base">
                <Landmark size={18} className="text-brand-secondary" /> Bank & Signature Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label-premium">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    className="input-premium"
                  />
                </div>
                <div>
                  <label className="label-premium">
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    name="bankAccountNo"
                    value={formData.bankAccountNo}
                    onChange={handleChange}
                    className="input-premium font-mono"
                  />
                </div>
                <div>
                  <label className="label-premium">
                    Bank Branch
                  </label>
                  <input
                    type="text"
                    name="bankBranch"
                    value={formData.bankBranch}
                    onChange={handleChange}
                    className="input-premium"
                  />
                </div>
                <div>
                  <label className="label-premium">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    name="bankIfsc"
                    value={formData.bankIfsc}
                    onChange={handleChange}
                    className="input-premium font-mono"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="label-premium">
                    Authorized Signatory Subtitle
                  </label>
                  <input
                    type="text"
                    name="signatureText"
                    value={formData.signatureText}
                    onChange={handleChange}
                    className="input-premium"
                  />
                </div>
                <div>
                  <label className="label-premium">
                    UPI Address / ID
                  </label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId || ""}
                    onChange={handleChange}
                    className="input-premium font-mono"
                    placeholder="e.g. jamilgroups@sbi"
                  />
                </div>
                <div>
                  <label className="label-premium">
                    Settlement QR Code
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-3.5 py-2 text-xs outline-none transition cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Preview Side */}
          <div className="space-y-6">
            <div className="card-glass p-6 shadow-2xl bg-slate-950/20 border border-brand-primary/20">
              <h4 className="font-extrabold text-brand-secondary mb-4 text-sm uppercase tracking-wider">Active Profile Summary</h4>
              <div className="space-y-3.5 text-xs text-slate-300">
                <div>
                  <span className="block text-slate-500 font-bold uppercase tracking-wider text-[9px]">Company Name</span>
                  <span className="text-white text-sm font-extrabold">{formData.name || "—"}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-bold uppercase tracking-wider text-[9px]">Seller GSTIN</span>
                  <span className="text-brand-secondary font-bold font-mono text-sm">{formData.gstin || "—"}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-bold uppercase tracking-wider text-[9px]">Seller State</span>
                  <span>Tamil Nadu (State Code: 33)</span>
                </div>
                <div className="border-t border-white/5 pt-3">
                  <span className="block text-slate-500 font-bold uppercase tracking-wider text-[9px] mb-2">Settlement QR Check</span>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-center justify-center h-16 mb-3">
                    {formData.qrCodeUrl ? (
                      <img 
                        src={formData.qrCodeUrl} 
                        alt="QR Code Preview" 
                        className="max-h-12 w-auto object-contain"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <span className="text-slate-550 text-[10px]">No QR Code</span>
                    )}
                  </div>
                </div>
                <div className="border-t border-white/5 pt-3">
                  <span className="block text-slate-500 font-bold uppercase tracking-wider text-[9px] mb-2">Signature Asset Check</span>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-center justify-center h-16">
                    {formData.signatureUrl ? (
                      <img 
                        src={formData.signatureUrl} 
                        alt="Signature Preview" 
                        className="max-h-12 w-auto object-contain invert opacity-70"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <span className="text-slate-550 text-[10px]">No signature</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSaving}
              className="w-full btn-premium-gradient py-3 text-xs uppercase font-extrabold tracking-wider mt-4 flex items-center justify-center gap-2"
            >
              <Save size={16} />
              {isSaving ? "Saving..." : "Save Configuration"}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
