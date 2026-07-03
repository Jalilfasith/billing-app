const fs = require('fs');

const files = [
  'c:/Users/gokhu/OneDrive/Desktop/billing/src/index.css',
  'c:/Users/gokhu/OneDrive/Desktop/billing/src/App.jsx',
  'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/CreateInvoice.jsx',
  'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/CompanyDetails.jsx',
  'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/CustomerDetails.jsx',
  'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/ProductManagement.jsx',
  'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/Dashboard.jsx'
];

files.forEach(path => {
  if (fs.existsSync(path)) {
    let content = fs.readFileSync(path, 'utf8');
    content = content.replace(/\r\n/g, '\n');

    // 1. Specific index.css replacements
    if (path.endsWith('index.css')) {
      content = content.replace(
        'body {\n' +
        '  background-color: #f8fafc;\n' +
        '  background-image: radial-gradient(rgba(2, 6, 23, 0.05) 1px, transparent 1px);\n' +
        '  background-size: 24px 24px;\n' +
        '  color: var(--lux-black);\n' +
        '  min-height: 100vh;\n' +
        '  overflow-x: hidden;\n' +
        '}',
        'body {\n' +
        '  background-color: #ffffff;\n' +
        '  color: var(--lux-black);\n' +
        '  min-height: 100vh;\n' +
        '  overflow-x: hidden;\n' +
        '}'
      );
      content = content.replace('background: #f1f5f9;', 'background: #ffffff;');
    }

    // 2. Specific App.jsx replacements
    if (path.endsWith('App.jsx')) {
      content = content.replace('bg-[#f8fafc]', 'bg-[#ffffff]');
    }

    // 3. Global component class replacements
    // Replace light-grey backgrounds (bg-slate-50, bg-slate-100) with pure white
    content = content.replace(/bg-slate-50\/20/g, 'bg-white');
    content = content.replace(/bg-slate-50\/60/g, 'bg-white');
    content = content.replace(/bg-slate-50/g, 'bg-white');
    content = content.replace(/bg-slate-100\/50/g, 'bg-white');
    content = content.replace(/bg-slate-100/g, 'bg-white');
    content = content.replace(/bg-slate-900\/20/g, 'bg-white');
    
    // Replace other container greys in CreateInvoice.jsx and InvoicePreview.jsx
    content = content.replace('bg-slate-950/20 rounded-2xl border border-slate-800/80 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl', 'bg-white rounded-2xl border border-slate-200 shadow-sm');
    content = content.replace('bg-slate-950/20 p-6 rounded-2xl border border-slate-800/80 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl', 'bg-white p-6 rounded-2xl border border-slate-200 shadow-sm');
    
    content = content.replace(/\n/g, '\r\n');
    fs.writeFileSync(path, content, 'utf8');
    console.log(`Removed grey backgrounds from ${path.split('/').pop()}`);
  }
});
