const fs = require('fs');

const mockDataPath = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/data/mockData.js';
const companyDetailsPath = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/CompanyDetails.jsx';
const createInvoicePath = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/CreateInvoice.jsx';
const invoicePreviewPath = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/InvoicePreview.jsx';

const normalize = (str) => str.replace(/\r\n/g, '\n');
const denormalize = (str) => str.replace(/\n/g, '\r\n');

// 1. Update mockData.js
if (fs.existsSync(mockDataPath)) {
  let content = fs.readFileSync(mockDataPath, 'utf8');
  content = normalize(content);

  // Add qrCodeUrl default property
  content = content.replace(
    '  signatureUrl: "/jamil_signature.jpg",',
    '  signatureUrl: "/jamil_signature.jpg",\n  qrCodeUrl: "/qr_code.png",'
  );

  fs.writeFileSync(mockDataPath, denormalize(content), 'utf8');
  console.log('Updated mockData.js with default qrCodeUrl');
}

// 2. Update CompanyDetails.jsx
if (fs.existsSync(companyDetailsPath)) {
  let content = fs.readFileSync(companyDetailsPath, 'utf8');
  content = normalize(content);

  // Insert handleFileChange function
  content = content.replace(
    '  const handleChange = (e) => {\n' +
    '    const { name, value } = e.target;\n' +
    '    setFormData(prev => ({ ...prev, [name]: value }));\n' +
    '  };',
    '  const handleChange = (e) => {\n' +
    '    const { name, value } = e.target;\n' +
    '    setFormData(prev => ({ ...prev, [name]: value }));\n' +
    '  };\n\n' +
    '  const handleFileChange = (e) => {\n' +
    '    const file = e.target.files[0];\n' +
    '    if (file) {\n' +
    '      const reader = new FileReader();\n' +
    '      reader.onloadend = () => {\n' +
    '        setFormData(prev => ({ ...prev, qrCodeUrl: reader.result }));\n' +
    '      };\n' +
    '      reader.readAsDataURL(file);\n' +
    '    }\n' +
    '  };'
  );

  // Insert Form Input fields for UPI & QR Code
  const formTarget = '                <div className="md:col-span-2">\n' +
    '                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">\n' +
    '                    Authorized Signatory Subtitle\n' +
    '                  </label>\n' +
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="signatureText"\n' +
    '                    value={formData.signatureText}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"\n' +
    '                  />\n' +
    '                </div>';

  const formReplacement = '                <div className="md:col-span-2">\n' +
    '                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">\n' +
    '                    Authorized Signatory Subtitle\n' +
    '                  </label>\n' +
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="signatureText"\n' +
    '                    value={formData.signatureText}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"\n' +
    '                  />\n' +
    '                </div>\n' +
    '                <div>\n' +
    '                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">\n' +
    '                    UPI Address / ID\n' +
    '                  </label>\n' +
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="upiId"\n' +
    '                    value={formData.upiId || ""}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-mono"\n' +
    '                    placeholder="e.g. jamilgroups@sbi"\n' +
    '                  />\n' +
    '                </div>\n' +
    '                <div>\n' +
    '                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">\n' +
    '                    Settlement QR Code (Image Upload)\n' +
    '                  </label>\n' +
    '                  <input\n' +
    '                    type="file"\n' +
    '                    accept="image/*"\n' +
    '                    onChange={handleFileChange}\n' +
    '                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none transition"\n' +
    '                  />\n' +
    '                </div>';

  content = content.replace(formTarget, formReplacement);

  // Preview Summary card block (render QR Code)
  const previewTarget = '                <div className="border-t border-slate-800 pt-3">\n' +
    '                  <span className="block text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-2">Signature Asset Check</span>';

  const previewReplacement = '                <div className="border-t border-slate-800 pt-3">\n' +
    '                  <span className="block text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-2">Settlement QR Check</span>\n' +
    '                  <div className="bg-white/5 border border-white/10 rounded p-2 flex items-center justify-center h-16 mb-3">\n' +
    '                    {formData.qrCodeUrl ? (\n' +
    '                      <img \n' +
    '                        src={formData.qrCodeUrl} \n' +
    '                        alt="QR Code Preview" \n' +
    '                        className="max-h-12 w-auto object-contain"\n' +
    '                        onError={(e) => { e.target.style.display = \'none\'; }}\n' +
    '                      />\n' +
    '                    ) : (\n' +
    '                      <span className="text-slate-500 text-[10px]">No QR Code</span>\n' +
    '                    )}\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '                <div className="border-t border-slate-800 pt-3">\n' +
    '                  <span className="block text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-2">Signature Asset Check</span>';

  content = content.replace(previewTarget, previewReplacement);

  fs.writeFileSync(companyDetailsPath, denormalize(content), 'utf8');
  console.log('Updated CompanyDetails.jsx with UPI/QR inputs and previews');
}

// 3. Update CreateInvoice.jsx
if (fs.existsSync(createInvoicePath)) {
  let content = fs.readFileSync(createInvoicePath, 'utf8');
  content = normalize(content);

  // Find Bank Details inside sheet preview and insert QR Code block
  const bankTarget = '                <div className="text-[9px] text-slate-500 leading-relaxed bg-slate-50 p-2.5 rounded-sm border border-slate-200">\n' +
    '                  <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-0.5">Bank Settlement Details</h4>\n' +
    '                  <p className="leading-tight text-slate-600">\n' +
    '                    Account: <span className="font-semibold text-slate-800 font-mono">{company.bankAccountNo}</span><br />\n' +
    '                    Bank: <span className="font-semibold text-slate-800">{company.bankName}</span> &nbsp;|&nbsp; IFSC: <span className="font-semibold text-slate-800 font-mono">{company.bankIfsc}</span>\n' +
    '                  </p>\n' +
    '                </div>';

  const bankReplacement = '                <div className="text-[9px] text-slate-500 leading-relaxed bg-slate-50 p-2.5 rounded-sm border border-slate-200">\n' +
    '                  <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-0.5">Bank Settlement Details</h4>\n' +
    '                  <p className="leading-tight text-slate-600">\n' +
    '                    Account: <span className="font-semibold text-slate-800 font-mono">{company.bankAccountNo}</span><br />\n' +
    '                    Bank: <span className="font-semibold text-slate-800">{company.bankName}</span> &nbsp;|&nbsp; IFSC: <span className="font-semibold text-slate-800 font-mono">{company.bankIfsc}</span>\n' +
    '                  </p>\n' +
    '                  \n' +
    '                  {/* UPI QR scan block */}\n' +
    '                  {(company.qrCodeUrl || company.upiId) && (\n' +
    '                    <div className="mt-2 pt-2 border-t border-dashed border-slate-200 flex items-center gap-3">\n' +
    '                      {company.qrCodeUrl && (\n' +
    '                        <img \n' +
    '                          src={company.qrCodeUrl} \n' +
    '                          alt="UPI QR" \n' +
    '                          className="w-14 h-14 object-contain border border-slate-200 p-0.5 rounded bg-white"\n' +
    '                          onError={(e) => { e.target.style.display = \'none\'; }}\n' +
    '                        />\n' +
    '                      )}\n' +
    '                      <div>\n' +
    '                        <span className="block text-[7px] font-bold uppercase tracking-wider text-slate-400 leading-none mb-0.5">UPI Settlement Address</span>\n' +
    '                        <span className="font-mono font-bold text-slate-800 text-[8.5px] leading-tight block">{company.upiId || "—"}</span>\n' +
    '                        <span className="block text-[6.5px] text-slate-500 mt-0.5 leading-none">Scan code with any UPI app to settle payment</span>\n' +
    '                      </div>\n' +
    '                    </div>\n' +
    '                  )}\n' +
    '                </div>';

  content = content.replace(bankTarget, bankReplacement);

  fs.writeFileSync(createInvoicePath, denormalize(content), 'utf8');
  console.log('Updated CreateInvoice.jsx with QR code box');
}

// 4. Update InvoicePreview.jsx
if (fs.existsSync(invoicePreviewPath)) {
  let content = fs.readFileSync(invoicePreviewPath, 'utf8');
  content = normalize(content);

  // Settlement block for screen view A4 container
  const screenTarget = '                  <div className="text-[9.5px] text-slate-500 leading-relaxed bg-slate-50 p-3.5 rounded-sm border border-slate-200">\n' +
    '                    <h4 className="font-bold text-slate-850 uppercase tracking-wider mb-0.5">Settlement Bank details</h4>\n' +
    '                    <p className="leading-tight text-slate-600">\n' +
    '                      Account: <span className="font-semibold text-slate-800 font-mono">{company.bankAccountNo}</span><br />\n' +
    '                      Bank Name: <span className="font-semibold text-slate-800">{company.bankName}</span><br />\n' +
    '                      IFSC Code: <span className="font-semibold text-slate-800 font-mono">{company.bankIfsc}</span>\n' +
    '                    </p>\n' +
    '                  </div>';

  const screenReplacement = '                  <div className="text-[9.5px] text-slate-500 leading-relaxed bg-slate-50 p-3.5 rounded-sm border border-slate-200">\n' +
    '                    <h4 className="font-bold text-slate-850 uppercase tracking-wider mb-0.5">Settlement Bank details</h4>\n' +
    '                    <p className="leading-tight text-slate-600">\n' +
    '                      Account: <span className="font-semibold text-slate-800 font-mono">{company.bankAccountNo}</span><br />\n' +
    '                      Bank Name: <span className="font-semibold text-slate-800">{company.bankName}</span><br />\n' +
    '                      IFSC Code: <span className="font-semibold text-slate-800 font-mono">{company.bankIfsc}</span>\n' +
    '                    </p>\n' +
    '                    \n' +
    '                    {/* UPI QR scan block */}\n' +
    '                    {(company.qrCodeUrl || company.upiId) && (\n' +
    '                      <div className="mt-2.5 pt-2.5 border-t border-dashed border-slate-200 flex items-center gap-4">\n' +
    '                        {company.qrCodeUrl && (\n' +
    '                          <img \n' +
    '                            src={company.qrCodeUrl} \n' +
    '                            alt="UPI QR" \n' +
    '                            className="w-16 h-16 object-contain border border-slate-200 p-0.5 rounded bg-white"\n' +
    '                            onError={(e) => { e.target.style.display = \'none\'; }}\n' +
    '                          />\n' +
    '                        )}\n' +
    '                        <div>\n' +
    '                          <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400 leading-none mb-0.5">UPI Settlement Address</span>\n' +
    '                          <span className="font-mono font-bold text-slate-800 text-[9.5px] leading-tight block">{company.upiId || "—"}</span>\n' +
    '                          <span className="block text-[7px] text-slate-500 mt-1 leading-none">Scan code with any UPI app to settle payment</span>\n' +
    '                        </div>\n' +
    '                      </div>\n' +
    '                    )}\n' +
    '                  </div>';

  content = content.replace(screenTarget, screenReplacement);

  // Settlement block for print view A4 container
  const printTarget = '                <div className="text-[9.5px] text-slate-500 leading-relaxed bg-slate-50 p-3.5 rounded-sm border border-slate-200">\n' +
    '                  <h4 className="font-bold text-slate-850 uppercase tracking-wider mb-0.5">Settlement Bank details</h4>\n' +
    '                  <p className="leading-tight text-slate-650">\n' +
    '                    Account: <span className="font-semibold text-slate-800 font-mono">{company.bankAccountNo}</span><br />\n' +
    '                    Bank Name: <span className="font-semibold text-slate-800">{company.bankName}</span><br />\n' +
    '                    IFSC Code: <span className="font-semibold text-slate-800 font-mono">{company.bankIfsc}</span>\n' +
    '                  </p>\n' +
    '                </div>';

  const printReplacement = '                <div className="text-[9.5px] text-slate-500 leading-relaxed bg-slate-50 p-3.5 rounded-sm border border-slate-200">\n' +
    '                  <h4 className="font-bold text-slate-850 uppercase tracking-wider mb-0.5">Settlement Bank details</h4>\n' +
    '                  <p className="leading-tight text-slate-650">\n' +
    '                    Account: <span className="font-semibold text-slate-800 font-mono">{company.bankAccountNo}</span><br />\n' +
    '                    Bank Name: <span className="font-semibold text-slate-800">{company.bankName}</span><br />\n' +
    '                    IFSC Code: <span className="font-semibold text-slate-800 font-mono">{company.bankIfsc}</span>\n' +
    '                  </p>\n' +
    '                  \n' +
    '                  {/* UPI QR scan block */}\n' +
    '                  {(company.qrCodeUrl || company.upiId) && (\n' +
    '                    <div className="mt-2.5 pt-2.5 border-t border-dashed border-slate-200 flex items-center gap-4">\n' +
    '                      {company.qrCodeUrl && (\n' +
    '                        <img \n' +
    '                          src={company.qrCodeUrl} \n' +
    '                          alt="UPI QR" \n' +
    '                          className="w-16 h-16 object-contain border border-slate-200 p-0.5 rounded bg-white"\n' +
    '                          onError={(e) => { e.target.style.display = \'none\'; }}\n' +
    '                        />\n' +
    '                      )}\n' +
    '                      <div>\n' +
    '                        <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400 leading-none mb-0.5">UPI Settlement Address</span>\n' +
    '                        <span className="font-mono font-bold text-slate-800 text-[9.5px] leading-tight block">{company.upiId || "—"}</span>\n' +
    '                        <span className="block text-[7px] text-slate-500 mt-1 leading-none">Scan code with any UPI app to settle payment</span>\n' +
    '                      </div>\n' +
    '                    </div>\n' +
    '                  )}\n' +
    '                </div>';

  content = content.replace(printTarget, printReplacement);

  fs.writeFileSync(invoicePreviewPath, denormalize(content), 'utf8');
  console.log('Updated InvoicePreview.jsx with QR code box (Screen and Print views)');
}
