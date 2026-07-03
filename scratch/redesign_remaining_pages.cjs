const fs = require('fs');

const pages = [
  'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/ProductManagement.jsx',
  'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/CustomerDetails.jsx',
  'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/CompanyDetails.jsx',
  'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/InvoiceHistory.jsx',
  'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/Settings.jsx'
];

pages.forEach(path => {
  if (fs.existsSync(path)) {
    let content = fs.readFileSync(path, 'utf8');
    content = content.replace(/\r\n/g, '\n');

    // 1. Swap main white cards to dark-glass containers
    content = content.replace(
      /bg-white p-6 rounded-xl border border-slate-200 shadow-sm/g,
      'bg-slate-950/45 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl'
    );
    content = content.replace(
      /bg-white p-5 rounded-xl border border-slate-200 shadow-sm/g,
      'bg-slate-950/45 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-xl'
    );
    content = content.replace(
      /bg-white p-4 rounded-xl border border-slate-200 shadow-sm/g,
      'bg-slate-950/45 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 shadow-xl'
    );

    // 2. Swap listing card backgrounds
    content = content.replace(
      /bg-white border border-slate-200 rounded-xl/g,
      'bg-slate-950/30 border border-slate-800/70 hover:border-cyan-500/30 transition duration-300 rounded-xl'
    );
    content = content.replace(
      /bg-white border border-slate-200 rounded-2xl/g,
      'bg-slate-950/30 border border-slate-800/70 hover:border-cyan-500/30 transition duration-300 rounded-xl'
    );

    // 3. Swap text colors in headings and descriptions
    content = content.replace(/text-slate-900 font-bold/g, 'text-white font-extrabold');
    content = content.replace(/text-slate-900 font-extrabold/g, 'text-white font-black');
    content = content.replace(/text-slate-850/g, 'text-slate-200');
    content = content.replace(/text-slate-800/g, 'text-slate-200');
    content = content.replace(/text-slate-650/g, 'text-slate-300');
    content = content.replace(/text-slate-600/g, 'text-slate-300');
    content = content.replace(/text-slate-500/g, 'text-slate-400');
    content = content.replace(/text-slate-400/g, 'text-slate-500');

    // 4. Border separator lines
    content = content.replace(/border-slate-100/g, 'border-slate-800/50');
    content = content.replace(/border-slate-200/g, 'border-slate-850');
    content = content.replace(/border-slate-250/g, 'border-slate-800');

    // 5. Form buttons & Primary highlights
    content = content.replace(
      '          <button\n' +
      '            type="submit"\n' +
      '            className="bg-slate-900 hover:bg-slate-850 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 text-xs transition"',
      '          <button\n' +
      '            type="submit"\n' +
      '            className="btn-neon-cyan font-extrabold py-2 px-4 flex items-center justify-center gap-1.5 text-xs transition uppercase tracking-wider"'
    );
    content = content.replace(
      '            <button\n' +
      '              type="submit"\n' +
      '              className="bg-slate-900 hover:bg-slate-850 text-white hover:text-amber-400 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition"',
      '            <button\n' +
      '              type="submit"\n' +
      '              className="btn-neon-cyan py-3 px-4 flex items-center justify-center gap-2 text-xs transition uppercase tracking-wider font-extrabold"'
    );

    // Save/Backup buttons in settings
    content = content.replace(
      '          <button\n' +
      '            onClick={handleExport}\n' +
      '            className="w-full bg-slate-900 hover:bg-slate-850 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm transition"',
      '          <button\n' +
      '            onClick={handleExport}\n' +
      '            className="w-full btn-neon-cyan py-3 px-4 flex items-center justify-center gap-2 text-xs transition uppercase tracking-wider font-extrabold"'
    );

    // Cancel / Back buttons
    content = content.replace(
      '          <button\n' +
      '            type="button"\n' +
      '            onClick={resetForm}\n' +
      '            className="border border-slate-250 text-slate-650 hover:bg-slate-50 font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 text-xs transition"',
      '          <button\n' +
      '            type="button"\n' +
      '            onClick={resetForm}\n' +
      '            className="bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-1.5 text-xs transition duration-300 uppercase tracking-wider"'
    );

    // Specific Table elements in History log
    content = content.replace(
      '    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">',
      '    <div className="bg-slate-950/20 rounded-2xl border border-slate-800/80 shadow-2xl backdrop-blur-md overflow-hidden">'
    );
    content = content.replace(/bg-slate-50/g, 'bg-slate-950/40');
    content = content.replace(/hover:bg-slate-50/g, 'hover:bg-slate-900/30');

    // Specific settings reset options
    content = content.replace(
      '          <button\n' +
      '            onClick={handleReset}\n' +
      '            className="w-full bg-rose-650 hover:bg-rose-700 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm transition"',
      '          <button\n' +
      '            onClick={handleReset}\n' +
      '            className="w-full bg-rose-950/40 text-rose-400 border border-rose-800 hover:bg-rose-900/35 font-extrabold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition uppercase tracking-wider shadow-lg"'
    );

    // Specific profile preview settings column card
    content = content.replace(
      '            <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 shadow-md">',
      '            <div className="bg-slate-950/65 text-white p-6 rounded-2xl border border-cyan-800/50 shadow-2xl backdrop-blur-xl">'
    );

    content = content.replace(/\n/g, '\r\n');
    fs.writeFileSync(path, content, 'utf8');
    console.log(`Successfully redesigned ${path.split('/').pop()}`);
  }
});
