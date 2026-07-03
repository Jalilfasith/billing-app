const fs = require('fs');

const mockDataPath = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/data/mockData.js';
const productMgmtPath = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/ProductManagement.jsx';
const createInvoicePath = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/CreateInvoice.jsx';
const invoicePreviewPath = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/InvoicePreview.jsx';

// Helper to normalize line endings
const normalize = (str) => str.replace(/\r\n/g, '\n');
const denormalize = (str) => str.replace(/\n/g, '\r\n');

// 1. Update mockData.js
if (fs.existsSync(mockDataPath)) {
  let content = fs.readFileSync(mockDataPath, 'utf8');
  content = normalize(content);

  // Add HSN to products
  content = content.replace(
    '    name: "Day cream 50gms",\n    unitPrice: 205,\n    gstRate: 18',
    '    name: "Day cream 50gms",\n    unitPrice: 200,\n    gstRate: 18,\n    hsnSac: "33049910"'
  );
  content = content.replace(
    '    name: "Day cream 50gms",\n    unitPrice: 200,\n    gstRate: 18',
    '    name: "Day cream 50gms",\n    unitPrice: 200,\n    gstRate: 18,\n    hsnSac: "33049910"'
  );
  content = content.replace(
    '    name: "Face cream 30gm",\n    unitPrice: 450,\n    gstRate: 18',
    '    name: "Face cream 30gm",\n    unitPrice: 450,\n    gstRate: 18,\n    hsnSac: "33049910"'
  );
  content = content.replace(
    '    name: "Hair oil 100ml",\n    unitPrice: 250,\n    gstRate: 18',
    '    name: "Hair oil 100ml",\n    unitPrice: 250,\n    gstRate: 18,\n    hsnSac: "33059011"'
  );

  // Add HSN to initial invoice items
  content = content.replace(
    '{ productName: "Day cream 50gms", qty: 25, rate: 200, gstRate: 18 }',
    '{ productName: "Day cream 50gms", hsnSac: "33049910", qty: 25, rate: 200, gstRate: 18 }'
  );
  content = content.replace(
    '{ productName: "Face cream 30gm", qty: 50, rate: 450, gstRate: 18 }',
    '{ productName: "Face cream 30gm", hsnSac: "33049910", qty: 50, rate: 450, gstRate: 18 }'
  );
  content = content.replace(
    '{ productName: "Hair oil 100ml", qty: 30, rate: 250, gstRate: 18 }',
    '{ productName: "Hair oil 100ml", hsnSac: "33059011", qty: 30, rate: 250, gstRate: 18 }'
  );

  fs.writeFileSync(mockDataPath, denormalize(content), 'utf8');
  console.log('Updated mockData.js with HSN codes');
}

// 2. Update ProductManagement.jsx
if (fs.existsSync(productMgmtPath)) {
  let content = fs.readFileSync(productMgmtPath, 'utf8');
  content = normalize(content);

  // Insert form state for hsnSac
  content = content.replace(
    '  const [gstRate, setGstRate] = useState(18);',
    '  const [gstRate, setGstRate] = useState(18);\n  const [hsnSac, setHsnSac] = useState("");'
  );

  // Insert editing resets
  content = content.replace(
    '    setGstRate(prod.gstRate || 18);',
    '    setGstRate(prod.gstRate || 18);\n    setHsnSac(prod.hsnSac || "");'
  );
  content = content.replace(
    '    setGstRate(18);',
    '    setGstRate(18);\n    setHsnSac("");'
  );

  // Save product details
  content = content.replace(
    '...p, name, unitPrice: Number(unitPrice), gstRate: Number(gstRate)',
    '...p, name, unitPrice: Number(unitPrice), gstRate: Number(gstRate), hsnSac'
  );
  content = content.replace(
    '        unitPrice: Number(unitPrice),\n        gstRate: Number(gstRate)',
    '        unitPrice: Number(unitPrice),\n        gstRate: Number(gstRate),\n        hsnSac'
  );

  // Form input field for HSN/SAC
  const formTarget = '            <div>\n' +
    '              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">\n' +
    '                Default GST Rate (%)\n' +
    '              </label>';
  const formReplacement = '            <div>\n' +
    '              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">\n' +
    '                HSN / SAC Code\n' +
    '              </label>\n' +
    '              <input\n' +
    '                type="text"\n' +
    '                placeholder="e.g. 33049910"\n' +
    '                value={hsnSac}\n' +
    '                onChange={(e) => setHsnSac(e.target.value)}\n' +
    '                className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-mono font-semibold"\n' +
    '              />\n' +
    '            </div>\n' +
    '            <div>\n' +
    '              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">\n' +
    '                Default GST Rate (%)\n' +
    '              </label>';

  content = content.replace(formTarget, formReplacement);

  // Form column layout grids (from cols-3 to cols-4)
  content = content.replace(
    '<form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-4">',
    '<form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-4 gap-4">'
  );
  content = content.replace(
    '<div className="flex items-end justify-end gap-2 pt-2 md:col-span-1">',
    '<div className="flex items-end justify-end gap-2 pt-2 md:col-span-1 md:col-start-4">'
  );

  // Catalogue List item rendering
  content = content.replace(
    '&nbsp;•&nbsp; GST Bracket: <span className="font-semibold text-emerald-600">{prod.gstRate}%</span>',
    '&nbsp;•&nbsp; GST Bracket: <span className="font-semibold text-emerald-600">{prod.gstRate}%</span>\n' +
    '                      {prod.hsnSac && <span>&nbsp;•&nbsp; HSN/SAC: <span className="font-semibold text-slate-700 font-mono">{prod.hsnSac}</span></span>}'
  );

  fs.writeFileSync(productMgmtPath, denormalize(content), 'utf8');
  console.log('Updated ProductManagement.jsx with HSN inputs and display');
}

// 3. Update CreateInvoice.jsx
if (fs.existsSync(createInvoicePath)) {
  let content = fs.readFileSync(createInvoicePath, 'utf8');
  content = normalize(content);

  // Setup default state line items with HSN
  content = content.replace(
    '{ productName: "Day cream 50gms", qty: 25, rate: 200, gstRate: 18 }',
    '{ productName: "Day cream 50gms", hsnSac: "33049910", qty: 25, rate: 200, gstRate: 18 }'
  );
  content = content.replace(
    '{ productName: "Face cream 30gm", qty: 50, rate: 450, gstRate: 18 }',
    '{ productName: "Face cream 30gm", hsnSac: "33049910", qty: 50, rate: 450, gstRate: 18 }'
  );
  content = content.replace(
    '{ productName: "Hair oil 100ml", qty: 30, rate: 250, gstRate: 18 }',
    '{ productName: "Hair oil 100ml", hsnSac: "33059011", qty: 30, rate: 250, gstRate: 18 }'
  );

  // Add line product reset rows
  content = content.replace(
    'addItemRow = () => {\n    setItems([...items, { productName: "", qty: 1, rate: 0, gstRate: 18 }]);\n  };',
    'addItemRow = () => {\n    setItems([...items, { productName: "", hsnSac: "", qty: 1, rate: 0, gstRate: 18 }]);\n  };'
  );

  // Auto load product details with HSN
  content = content.replace(
    'handleItemChange(index, "rate", prod.unitPrice);\n      handleItemChange(index, "gstRate", prod.gstRate);',
    'handleItemChange(index, "rate", prod.unitPrice);\n      handleItemChange(index, "gstRate", prod.gstRate);\n      handleItemChange(index, "hsnSac", prod.hsnSac || "");'
  );

  // Form line item grids: Add HSN input
  const gridTarget = '                <div className="grid grid-cols-12 gap-2">\n' +
    '                  <div className="col-span-12">\n' +
    '                    <input \n' +
    '                      type="text"\n' +
    '                      placeholder="Product Description / Name"\n' +
    '                      value={item.productName}\n' +
    '                      onChange={(e) => handleItemChange(idx, "productName", e.target.value)}\n' +
    '                      className="input-premium font-medium"\n' +
    '                    />\n' +
    '                  </div>';

  const gridReplacement = '                <div className="grid grid-cols-12 gap-2">\n' +
    '                  <div className="col-span-8">\n' +
    '                    <input \n' +
    '                      type="text"\n' +
    '                      placeholder="Product Description / Name"\n' +
    '                      value={item.productName}\n' +
    '                      onChange={(e) => handleItemChange(idx, "productName", e.target.value)}\n' +
    '                      className="input-premium font-medium"\n' +
    '                    />\n' +
    '                  </div>\n' +
    '                  <div className="col-span-4">\n' +
    '                    <input \n' +
    '                      type="text"\n' +
    '                      placeholder="HSN/SAC"\n' +
    '                      value={item.hsnSac || ""}\n' +
    '                      onChange={(e) => handleItemChange(idx, "hsnSac", e.target.value)}\n' +
    '                      className="input-premium font-mono font-semibold text-center"\n' +
    '                    />\n' +
    '                  </div>';

  content = content.replace(gridTarget, gridReplacement);

  // A4 Live preview: Table column headers (Add HSN/SAC column)
  const headerTarget = '                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold">\n' +
    '                    <th className="px-3 py-2 w-8 text-center border-r border-slate-200 font-bold">No</th>\n' +
    '                    <th className="px-3 py-2 border-r border-slate-200 font-bold">Items</th>\n' +
    '                    <th className="px-3 py-2 w-16 text-center border-r border-slate-200 font-bold">Qty</th>\n' +
    '                    <th className="px-3 py-2 w-20 text-right border-r border-slate-200 font-mono font-bold">Rate</th>\n' +
    '                    <th className="px-3 py-2 w-20 text-center border-r border-slate-200 font-bold">Tax</th>\n' +
    '                    <th className="px-3 py-2 w-24 text-right font-mono font-bold">Total</th>\n' +
    '                  </tr>';

  const headerReplacement = '                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold">\n' +
    '                    <th className="px-3 py-2 w-8 text-center border-r border-slate-200 font-bold">No</th>\n' +
    '                    <th className="px-3 py-2 border-r border-slate-200 font-bold">Items</th>\n' +
    '                    <th className="px-3 py-2 w-20 text-center border-r border-slate-200 font-bold">HSN/SAC</th>\n' +
    '                    <th className="px-3 py-2 w-16 text-center border-r border-slate-200 font-bold">Qty</th>\n' +
    '                    <th className="px-3 py-2 w-20 text-right border-r border-slate-200 font-mono font-bold">Rate</th>\n' +
    '                    <th className="px-3 py-2 w-20 text-center border-r border-slate-200 font-bold">Tax</th>\n' +
    '                    <th className="px-3 py-2 w-24 text-right font-mono font-bold">Total</th>\n' +
    '                  </tr>';

  content = content.replace(headerTarget, headerReplacement);

  // A4 Live preview: Table rows (Add HSN/SAC cell)
  const rowTarget = '                    <tr key={idx}>\n' +
    '                      <td className="px-3 py-2 text-center border-r border-slate-200 text-slate-400 font-medium">{idx + 1}</td>\n' +
    '                      <td className="px-3 py-2 border-r border-slate-200 text-slate-900 font-semibold">{item.productName || "Custom Product"}</td>\n' +
    '                      <td className="px-3 py-2 text-center border-r border-slate-200 font-bold">{item.qty} PCS</td>';

  const rowReplacement = '                    <tr key={idx}>\n' +
    '                      <td className="px-3 py-2 text-center border-r border-slate-200 text-slate-400 font-medium">{idx + 1}</td>\n' +
    '                      <td className="px-3 py-2 border-r border-slate-200 text-slate-900 font-semibold">{item.productName || "Custom Product"}</td>\n' +
    '                      <td className="px-3 py-2 text-center border-r border-slate-200 font-mono font-medium">{item.hsnSac || "—"}</td>\n' +
    '                      <td className="px-3 py-2 text-center border-r border-slate-200 font-bold">{item.qty} PCS</td>';

  content = content.replace(rowTarget, rowReplacement);

  // Subtotal row colspan adjustments (from 2 to 3)
  content = content.replace(
    '                  <tr className="bg-slate-150/40 font-black text-slate-900 border-t border-slate-300">\n' +
    '                    <td colSpan="2" className="px-3 py-2 text-right uppercase border-r border-slate-200 tracking-wider">',
    '                  <tr className="bg-slate-150/40 font-black text-slate-900 border-t border-slate-300">\n' +
    '                    <td colSpan="3" className="px-3 py-2 text-right uppercase border-r border-slate-200 tracking-wider">'
  );

  fs.writeFileSync(createInvoicePath, denormalize(content), 'utf8');
  console.log('Updated CreateInvoice.jsx with HSN table columns and inputs');
}

// 4. Update InvoicePreview.jsx
if (fs.existsSync(invoicePreviewPath)) {
  let content = fs.readFileSync(invoicePreviewPath, 'utf8');
  content = normalize(content);

  // Screen preview table header
  const screenHeaderTarget = '                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold">\n' +
    '                      <th className="px-3 py-2 w-8 text-center border-r border-slate-200 font-bold">No</th>\n' +
    '                      <th className="px-3 py-2 border-r border-slate-200 font-bold">Items</th>\n' +
    '                      <th className="px-3 py-2 w-16 text-center border-r border-slate-200 font-bold">Qty</th>\n' +
    '                      <th className="px-3 py-2 w-24 text-right border-r border-slate-200 font-mono font-bold">Rate</th>\n' +
    '                      <th className="px-3 py-2 w-24 text-center border-r border-slate-200 font-bold">Tax</th>\n' +
    '                      <th className="px-3 py-2 w-28 text-right font-mono font-bold">Total</th>\n' +
    '                    </tr>';

  const screenHeaderReplacement = '                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold">\n' +
    '                      <th className="px-3 py-2 w-8 text-center border-r border-slate-200 font-bold">No</th>\n' +
    '                      <th className="px-3 py-2 border-r border-slate-200 font-bold">Items</th>\n' +
    '                      <th className="px-3 py-2 w-20 text-center border-r border-slate-200 font-bold">HSN/SAC</th>\n' +
    '                      <th className="px-3 py-2 w-16 text-center border-r border-slate-200 font-bold">Qty</th>\n' +
    '                      <th className="px-3 py-2 w-24 text-right border-r border-slate-200 font-mono font-bold">Rate</th>\n' +
    '                      <th className="px-3 py-2 w-24 text-center border-r border-slate-200 font-bold">Tax</th>\n' +
    '                      <th className="px-3 py-2 w-28 text-right font-mono font-bold">Total</th>\n' +
    '                    </tr>';

  content = content.replace(screenHeaderTarget, screenHeaderReplacement);

  // Screen preview table rows
  const screenRowTarget = '                      <tr key={idx}>\n' +
    '                        <td className="px-3 py-2 text-center border-r border-slate-200 text-slate-400 font-medium">{idx + 1}</td>\n' +
    '                        <td className="px-3 py-2 border-r border-slate-200 text-slate-900 font-semibold">{item.productName}</td>\n' +
    '                        <td className="px-3 py-2 text-center border-r border-slate-200 font-bold">{item.qty} PCS</td>';

  const screenRowReplacement = '                      <tr key={idx}>\n' +
    '                        <td className="px-3 py-2 text-center border-r border-slate-200 text-slate-400 font-medium">{idx + 1}</td>\n' +
    '                        <td className="px-3 py-2 border-r border-slate-200 text-slate-900 font-semibold">{item.productName}</td>\n' +
    '                        <td className="px-3 py-2 text-center border-r border-slate-200 font-mono font-medium">{item.hsnSac || "—"}</td>\n' +
    '                        <td className="px-3 py-2 text-center border-r border-slate-200 font-bold">{item.qty} PCS</td>';

  content = content.replace(screenRowTarget, screenRowReplacement);

  // Screen subtotal row colspan
  content = content.replace(
    '                    <tr className="bg-slate-150/40 font-black text-slate-900 border-t border-slate-300">\n' +
    '                      <td colSpan="2" className="px-3 py-2 text-right uppercase border-r border-slate-200 tracking-wider">',
    '                    <tr className="bg-slate-150/40 font-black text-slate-900 border-t border-slate-300">\n' +
    '                      <td colSpan="3" className="px-3 py-2 text-right uppercase border-r border-slate-200 tracking-wider">'
  );

  // Print preview table header
  const printHeaderTarget = '                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold">\n' +
    '                    <th className="px-3 py-2 w-8 text-center border-r border-slate-200">No</th>\n' +
    '                    <th className="px-3 py-2 border-r border-slate-200">Items</th>\n' +
    '                    <th className="px-3 py-2 w-16 text-center border-r border-slate-200">Qty</th>\n' +
    '                    <th className="px-3 py-2 w-24 text-right border-r border-slate-200 font-mono">Rate</th>\n' +
    '                    <th className="px-3 py-2 w-24 text-center border-r border-slate-200">Tax</th>\n' +
    '                    <th className="px-3 py-2 w-28 text-right font-mono">Total</th>\n' +
    '                  </tr>';

  const printHeaderReplacement = '                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold">\n' +
    '                    <th className="px-3 py-2 w-8 text-center border-r border-slate-200">No</th>\n' +
    '                    <th className="px-3 py-2 border-r border-slate-200">Items</th>\n' +
    '                    <th className="px-3 py-2 w-20 text-center border-r border-slate-200">HSN/SAC</th>\n' +
    '                    <th className="px-3 py-2 w-16 text-center border-r border-slate-200">Qty</th>\n' +
    '                    <th className="px-3 py-2 w-24 text-right border-r border-slate-200 font-mono">Rate</th>\n' +
    '                    <th className="px-3 py-2 w-24 text-center border-r border-slate-200">Tax</th>\n' +
    '                    <th className="px-3 py-2 w-28 text-right font-mono">Total</th>\n' +
    '                  </tr>';

  content = content.replace(printHeaderTarget, printHeaderReplacement);

  // Print preview table rows
  const printRowTarget = '                    <tr key={idx}>\n' +
    '                      <td className="px-3 py-2 text-center border-r border-slate-200 text-slate-400 font-medium">{idx + 1}</td>\n' +
    '                      <td className="px-3 py-2 border-r border-slate-200 text-slate-900 font-semibold">{item.productName}</td>\n' +
    '                      <td className="px-3 py-2 text-center border-r border-slate-200 font-bold">{item.qty} PCS</td>';

  const printRowReplacement = '                    <tr key={idx}>\n' +
    '                      <td className="px-3 py-2 text-center border-r border-slate-200 text-slate-400 font-medium">{idx + 1}</td>\n' +
    '                      <td className="px-3 py-2 border-r border-slate-200 text-slate-900 font-semibold">{item.productName}</td>\n' +
    '                      <td className="px-3 py-2 text-center border-r border-slate-200 font-mono font-medium">{item.hsnSac || "—"}</td>\n' +
    '                      <td className="px-3 py-2 text-center border-r border-slate-200 font-bold">{item.qty} PCS</td>';

  content = content.replace(printRowTarget, printRowReplacement);

  // Print subtotal row colspan
  content = content.replace(
    '                  <tr className="bg-slate-150/40 font-black text-slate-900 border-t border-slate-300">\n' +
    '                    <td colSpan="2" className="px-3 py-2 text-right uppercase border-r border-slate-200 tracking-wider">',
    '                  <tr className="bg-slate-150/40 font-black text-slate-900 border-t border-slate-300">\n' +
    '                    <td colSpan="3" className="px-3 py-2 text-right uppercase border-r border-slate-200 tracking-wider">'
  );

  fs.writeFileSync(invoicePreviewPath, denormalize(content), 'utf8');
  console.log('Updated InvoicePreview.jsx with HSN table columns (Screen and Print views)');
}
