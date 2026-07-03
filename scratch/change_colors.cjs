const fs = require('fs');

const createInvoicePath = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/CreateInvoice.jsx';
const invoicePreviewPath = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/InvoicePreview.jsx';

const normalize = (str) => str.replace(/\r\n/g, '\n');
const denormalize = (str) => str.replace(/\n/g, '\r\n');

// 1. Update CreateInvoice.jsx
if (fs.existsSync(createInvoicePath)) {
  let content = fs.readFileSync(createInvoicePath, 'utf8');
  content = normalize(content);

  // Name from Gold to Black
  content = content.replace(
    '<h1 className="text-xl font-extrabold text-amber-600 tracking-tight leading-tight font-serif-invoice uppercase">',
    '<h1 className="text-xl font-extrabold text-slate-950 tracking-tight leading-tight font-serif-invoice uppercase">'
  );

  // Borders from orange/amber to metallic gold (#d4af37)
  content = content.replace('border-amber-600/40', 'border-[#d4af37]/60');
  content = content.replace('border-amber-600/20', 'border-[#d4af37]/40');
  content = content.replace('border-amber-600/10', 'border-[#d4af37]/25');
  content = content.replace('text-amber-650', 'text-slate-950');

  // Text title highlights
  content = content.replace('text-amber-700 font-bold uppercase tracking-widest', 'text-[#b48d2d] font-bold uppercase tracking-widest');
  content = content.replace('text-amber-700 border-b border-slate-100 pb-0.5', 'text-[#b48d2d] border-b border-slate-100 pb-0.5');

  // Corner ornaments and Grand Total
  content = content.replace('text-amber-650 font-black', 'text-[#a37e2c] font-black');
  content = content.replace('text-amber-600 font-black', 'text-[#a37e2c] font-black');
  content = content.replace('text-amber-600/50', 'text-[#d4af37]/75');

  // Signature box
  content = content.replace(
    'border-amber-600/20 bg-amber-50/5',
    'border-[#d4af37]/30 bg-[#fefdfa]'
  );

  fs.writeFileSync(createInvoicePath, denormalize(content), 'utf8');
  console.log('Successfully updated CreateInvoice.jsx colors');
}

// 2. Update InvoicePreview.jsx
if (fs.existsSync(invoicePreviewPath)) {
  let content = fs.readFileSync(invoicePreviewPath, 'utf8');
  content = normalize(content);

  // Name from Gold to Black (both screen and print layouts)
  content = content.replace(
    '<h1 className="text-2xl font-extrabold text-amber-600 tracking-tight leading-none font-serif-invoice uppercase">',
    '<h1 className="text-2xl font-extrabold text-slate-950 tracking-tight leading-none font-serif-invoice uppercase">'
  );
  content = content.replace(
    '<h1 className="text-2xl font-extrabold text-amber-600 tracking-tight leading-none font-serif-invoice uppercase">',
    '<h1 className="text-2xl font-extrabold text-slate-950 tracking-tight leading-none font-serif-invoice uppercase">'
  );

  // Borders from orange/amber to metallic gold (#d4af37)
  // Double replace to catch both screen and print containers
  content = content.replace(/border-amber-600\/40/g, 'border-[#d4af37]/60');
  content = content.replace(/border-amber-600\/20/g, 'border-[#d4af37]/40');
  content = content.replace(/border-amber-600\/10/g, 'border-[#d4af37]/25');
  content = content.replace(/border-b-2 border-amber-600\/20/g, 'border-b-2 border-[#d4af37]/35');

  // Text title highlights
  content = content.replace(/text-amber-700 font-bold uppercase tracking-widest/g, 'text-[#b48d2d] font-bold uppercase tracking-widest');
  content = content.replace(/text-amber-700 border-b border-slate-100 pb-0.5/g, 'text-[#b48d2d] border-b border-slate-100 pb-0.5');

  // Grand totals and corner ornaments
  content = content.replace(/text-amber-600 font-black/g, 'text-[#a37e2c] font-black');
  content = content.replace(/text-amber-600\/60/g, 'text-[#d4af37]/80');

  // Signature box
  content = content.replace(
    /border-amber-600\/20 bg-amber-50\/5/g,
    'border-[#d4af37]/30 bg-[#fefdfa]'
  );

  fs.writeFileSync(invoicePreviewPath, denormalize(content), 'utf8');
  console.log('Successfully updated InvoicePreview.jsx colors');
}
