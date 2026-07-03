const fs = require('fs');

const path = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/InvoicePreview.jsx';

if (fs.existsSync(path)) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/\r\n/g, '\n');

  // Replace bg-slate-50 with bg-white globally in InvoicePreview
  content = content.replace(/bg-slate-50/g, 'bg-white');

  content = content.replace(/\n/g, '\r\n');
  fs.writeFileSync(path, content, 'utf8');
  console.log('Successfully removed grey backgrounds from InvoicePreview.jsx');
}
