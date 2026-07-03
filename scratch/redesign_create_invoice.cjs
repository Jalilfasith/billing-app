const fs = require('fs');

const path = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/CreateInvoice.jsx';

if (fs.existsSync(path)) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/\r\n/g, '\n');

  // Header Title re-theme
  content = content.replace(
    '            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">\n' +
    '              <Sparkles className="text-amber-500" size={20} /> Real-time Billing Desk\n' +
    '            </h2>\n' +
    '            <p className="text-slate-500 text-xs mt-0.5">Customize your products, prices, and GST instantly.</p>',
    '            <h2 className="text-lg font-black text-white flex items-center gap-2 uppercase tracking-wider">\n' +
    '              <Sparkles className="text-cyan-400" size={18} /> Real-time Billing Desk\n' +
    '            </h2>\n' +
    '            <p className="text-slate-400 text-xs mt-0.5">Customize your products, prices, and GST codes instantly.</p>'
  );

  // Replace forms outer wrapper panels globally
  // We double check to apply it to all 5 sections
  content = content.replace(
    /bg-white p-5 rounded-xl border border-slate-200 shadow-sm/g,
    'bg-slate-950/45 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-xl'
  );

  // Re-theme titles inside panels
  content = content.replace(
    /text-slate-800 uppercase tracking-widest/g,
    'text-white font-extrabold uppercase tracking-widest text-[11px]'
  );
  content = content.replace(
    /border-b border-slate-100 pb-2/g,
    'border-b border-slate-800/50 pb-2.5'
  );

  // Customer dropdown select styles
  content = content.replace(
    '            <select\n' +
    '              value={selectedCustomerId}\n' +
    '              onChange={(e) => handleCustomerSelect(e.target.value)}\n' +
    '              className="bg-slate-50 border border-slate-200 text-slate-600 rounded px-2 py-1 text-[11px] font-bold outline-none"\n' +
    '            >',
    '            <select\n' +
    '              value={selectedCustomerId}\n' +
    '              onChange={(e) => handleCustomerSelect(e.target.value)}\n' +
    '              className="bg-slate-900 border border-slate-800 text-slate-300 rounded px-2 py-1 text-[11px] font-bold outline-none focus:border-cyan-500/50 transition"\n' +
    '            >'
  );

  // Shipping copy checkbox button styles
  content = content.replace(
    '            <button\n' +
    '              onClick={() => setSameAsBilling(!sameAsBilling)}\n' +
    '              type="button"\n' +
    '              className={`text-[10px] font-bold px-2 py-1 rounded border transition ${sameAsBilling \n' +
    '                ? "bg-amber-50 text-amber-800 border-amber-200" \n' +
    '                : "bg-slate-50 text-slate-600 border-slate-250 hover:border-slate-350"}`}',
    '            <button\n' +
    '              onClick={() => setSameAsBilling(!sameAsBilling)}\n' +
    '              type="button"\n' +
    '              className={`text-[9px] uppercase tracking-wider font-extrabold px-3 py-1.5 rounded-lg border transition duration-300 ${sameAsBilling \n' +
    '                ? "bg-cyan-950/40 text-cyan-400 border-cyan-800/40" \n' +
    '                : "bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700"}`}'
  );

  // Shipping details fallback text block
  content = content.replace(
    '            <div className="text-xs text-slate-400 bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center gap-2">',
    '            <div className="text-xs text-slate-400 bg-slate-900/20 p-3.5 rounded-xl border border-slate-800/60 flex items-center gap-2">'
  );

  // Item list dropdown catalog selector styles
  content = content.replace(
    '                    <select\n' +
    '                      onChange={(e) => handleProductSelect(idx, e.target.value)}\n' +
    '                      className="bg-slate-50 border border-slate-200 text-slate-500 rounded px-1.5 py-0.5 text-[10px] outline-none font-semibold"\n' +
    '                      defaultValue=""\n' +
    '                    >',
    '                    <select\n' +
    '                      onChange={(e) => handleProductSelect(idx, e.target.value)}\n' +
    '                      className="bg-slate-900 border border-slate-800 text-slate-400 rounded px-2 py-1 text-[10px] outline-none font-bold focus:border-cyan-500/50 transition"\n' +
    '                      defaultValue=""\n' +
    '                    >'
  );

  // Divider lines inside items
  content = content.replace(
    '          <div className="space-y-4 divide-y divide-slate-100">',
    '          <div className="space-y-4 divide-y divide-slate-800/60">'
  );

  // Add line item button styles
  content = content.replace(
    '          <button\n' +
    '            type="button"\n' +
    '            onClick={addItemRow}\n' +
    '            className="w-full flex items-center justify-center gap-1.5 text-xs text-amber-700 hover:text-amber-800 font-bold py-2 border border-dashed border-amber-300 rounded-lg bg-amber-50/20 hover:bg-amber-50/50 transition mt-2"\n' +
    '          >',
    '          <button\n' +
    '            type="button"\n' +
    '            onClick={addItemRow}\n' +
    '            className="w-full flex items-center justify-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-bold py-2.5 border border-dashed border-cyan-850 rounded-xl bg-cyan-950/15 hover:bg-cyan-950/30 transition duration-300 mt-2"\n' +
    '          >'
  );

  // Action Panel buttons
  content = content.replace(
    '          <button\n' +
    '            onClick={handleSaveAndPreview}\n' +
    '            className="w-full bg-slate-900 hover:bg-slate-850 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm transition"\n' +
    '          >',
    '          <button\n' +
    '            onClick={handleSaveAndPreview}\n' +
    '            className="w-full btn-neon-cyan py-3 px-4 flex items-center justify-center gap-2 text-xs transition uppercase tracking-wider font-extrabold"\n' +
    '          >'
  );
  content = content.replace(
    '          <button\n' +
    '            onClick={handlePrintDirectly}\n' +
    '            className="w-full border border-amber-500 text-amber-800 hover:bg-amber-50/30 font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm transition"\n' +
    '          >',
    '          <button\n' +
    '            onClick={handlePrintDirectly}\n' +
    '            className="w-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-extrabold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs border border-slate-800 hover:border-slate-700 transition duration-300 uppercase tracking-wider"\n' +
    '          >'
  );

  // Right-side Preview Workspace container
  content = content.replace(
    '      <div className="w-full lg:w-7/12 flex flex-col items-center sticky top-20 overflow-y-auto max-h-[85vh] p-2 bg-slate-100 rounded-2xl border border-slate-200/60 shadow-inner no-print">',
    '      <div className="w-full lg:w-7/12 flex flex-col items-center sticky top-24 overflow-y-auto max-h-[82vh] p-4 bg-slate-950/20 rounded-2xl border border-slate-800/80 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl no-print">'
  );

  content = content.replace(
    '        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-2 flex items-center gap-1">\n' +
    '          <Sparkles size={12} className="text-amber-500" /> Live-updating Invoice Preview\n' +
    '        </span>',
    '        <span className="text-[9px] text-slate-400 uppercase tracking-widest font-extrabold mb-3 flex items-center gap-1.5">\n' +
    '          <Sparkles size={12} className="text-cyan-400" /> Live-updating Invoice Preview\n' +
    '        </span>'
  );

  content = content.replace(
    '        <div className="w-full max-w-[210mm] origin-top scale-[0.9] lg:scale-[0.80] xl:scale-[0.95] bg-white text-slate-800 p-8 border border-slate-350 shadow-md relative rounded-sm font-sans select-none select-text">',
    '        <div className="w-full max-w-[210mm] origin-top scale-[0.9] lg:scale-[0.80] xl:scale-[0.95] bg-white text-slate-800 p-8 border border-slate-200 shadow-2xl relative rounded-sm font-sans select-none select-text">'
  );

  content = content.replace(/\n/g, '\n');
  fs.writeFileSync(path, content, 'utf8');
  console.log('Successfully redesigned CreateInvoice.jsx workspace');
}
