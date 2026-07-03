const fs = require('fs');

const path = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/Dashboard.jsx';

if (fs.existsSync(path)) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/\r\n/g, '\n');

  // Welcome Banner re-skin
  content = content.replace(
    '  return (\n' +
    '    <div className="space-y-6 pb-12">\n' +
    '      {/* Welcome Banner */}\n' +
    '      <div className="bg-slate-950/40 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-800/80 relative overflow-hidden">',
    '  return (\n' +
    '    <div className="space-y-6 pb-12">\n' +
    '      {/* Welcome Banner */}\n' +
    '      <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-200/80 relative overflow-hidden">'
  );

  content = content.replace(
    '        <div className="absolute right-0 top-0 opacity-5 pointer-events-none transform translate-x-12 -translate-y-6">\n' +
    '          <Building size={280} className="text-cyan-500" />\n' +
    '        </div>\n' +
    '        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>\n' +
    '        <div className="absolute -right-12 -top-12 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>',
    '        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none transform translate-x-12 -translate-y-6">\n' +
    '          <Building size={280} className="text-slate-900" />\n' +
    '        </div>'
  );

  content = content.replace(
    '          <h2 className="text-3xl font-black text-white font-serif-invoice tracking-tight">',
    '          <h2 className="text-3xl font-black text-[#020617] font-serif-invoice tracking-tight">'
  );

  content = content.replace(
    '          <p className="text-slate-300 text-sm leading-relaxed max-w-2xl font-medium">',
    '          <p className="text-slate-655 text-sm leading-relaxed max-w-2xl font-medium">'
  );

  content = content.replace(
    '            <button \n' +
    '              onClick={() => setView("company")} \n' +
    '              className="bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 hover:text-white font-extrabold px-5 py-2.5 rounded-xl flex items-center gap-2 text-xs border border-slate-800 transition"\n' +
    '            >',
    '            <button \n' +
    '              onClick={() => setView("company")} \n' +
    '              className="bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 font-extrabold px-5 py-2.5 rounded-xl flex items-center gap-2 text-xs border border-slate-250 transition"\n' +
    '            >'
  );

  // KPI card hover border modifications
  content = content.replace('hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.12)]', 'hover:border-emerald-500/40 hover:shadow-[0_4px_20px_rgba(4,120,87,0.05)]');
  content = content.replace('hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.12)]', 'hover:border-emerald-500/30 hover:shadow-[0_4px_20px_rgba(4,120,87,0.04)]');
  content = content.replace('hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.12)]', 'hover:border-orange-500/35 hover:shadow-[0_4px_20px_rgba(234,88,12,0.04)]');
  content = content.replace('hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.12)]', 'hover:border-emerald-500/30 hover:shadow-[0_4px_20px_rgba(4,120,87,0.04)]');
  content = content.replace('hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.12)]', 'hover:border-orange-500/40 hover:shadow-[0_4px_20px_rgba(234,88,12,0.05)]');

  // KPI icon badges re-skin
  content = content.replace(
    '          <div className="bg-cyan-950/50 border border-cyan-800/45 text-cyan-400 p-2.5 rounded-xl shadow-lg shadow-cyan-500/10">',
    '          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-2.5 rounded-xl">'
  );
  content = content.replace(
    '          <div className="bg-blue-950/50 border border-blue-800/45 text-blue-400 p-2.5 rounded-xl shadow-lg shadow-blue-500/10">',
    '          <div className="bg-slate-50 border border-slate-200 text-slate-700 p-2.5 rounded-xl">'
  );
  content = content.replace(
    '          <div className="bg-purple-950/50 border border-purple-800/45 text-purple-400 p-2.5 rounded-xl shadow-lg shadow-purple-500/10">',
    '          <div className="bg-orange-50 border border-orange-200 text-orange-700 p-2.5 rounded-xl">'
  );
  content = content.replace(
    '          <div className="bg-emerald-950/50 border border-emerald-800/45 text-emerald-400 p-2.5 rounded-xl shadow-lg shadow-emerald-500/10">',
    '          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-2.5 rounded-xl">'
  );
  content = content.replace(
    '          <div className="bg-amber-950/50 border border-amber-800/45 text-amber-400 p-2.5 rounded-xl shadow-lg shadow-amber-500/10">',
    '          <div className="bg-orange-50 border border-orange-200 text-orange-700 p-2.5 rounded-xl">'
  );

  content = content.replace('text-amber-550', 'text-orange-600');

  // SVG chart re-skin to Emerald Green polyline, white dots, slate labels, light grid lines
  content = content.replace(
    '          <div className="flex items-center justify-between mb-6">\n' +
    '            <h3 className="font-extrabold text-white text-base">Monthly Sales Performance</h3>\n' +
    '            <span className="text-[9px] bg-slate-900 border border-slate-800 text-cyan-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider">Metrics</span>\n' +
    '          </div>',
    '          <div className="flex items-center justify-between mb-6">\n' +
    '            <h3 className="font-extrabold text-[#020617] text-base">Monthly Sales Performance</h3>\n' +
    '            <span className="text-[9px] bg-slate-50 border border-slate-200 text-emerald-700 px-3 py-1 rounded-full font-bold uppercase tracking-wider">Metrics</span>\n' +
    '          </div>'
  );

  content = content.replace(
    '              <defs>\n' +
    '                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">\n' +
    '                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />\n' +
    '                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />\n' +
    '                </linearGradient>\n' +
    '              </defs>',
    '              <defs>\n' +
    '                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">\n' +
    '                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />\n' +
    '                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />\n' +
    '                </linearGradient>\n' +
    '              </defs>'
  );

  content = content.replace(/#1e293b/g, '#cbd5e1'); // light grid lines
  content = content.replace('stroke="#06b6d4"', 'stroke="#047857"'); // polyline stroke
  content = content.replace('stroke="#06b6d4" strokeWidth="3.5"', 'stroke="#047857" strokeWidth="3.5"'); // circle stroke

  // Quick navigation blocks re-skin
  content = content.replace(
    /p-3.5 rounded-xl border border-slate-800 bg-slate-900\/20 hover:border-cyan-500\/35 hover:bg-cyan-500\/5/g,
    'p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-500/35 hover:bg-emerald-50/20'
  );
  content = content.replace('group-hover:text-cyan-400', 'group-hover:text-emerald-700');
  
  content = content.replace(
    '                  <div className="bg-emerald-950 text-emerald-400 p-2.5 rounded-xl border border-emerald-800/40">',
    '                  <div className="bg-emerald-50 text-emerald-700 p-2.5 rounded-xl border border-emerald-100">'
  );
  content = content.replace(
    '                  <div className="bg-blue-950 text-blue-400 p-2.5 rounded-xl border border-blue-800/40">',
    '                  <div className="bg-slate-50 text-slate-700 p-2.5 rounded-xl border border-slate-200">'
  );
  content = content.replace(
    '                  <div className="bg-purple-950 text-purple-400 p-2.5 rounded-xl border border-purple-800/40">',
    '                  <div className="bg-orange-50 text-orange-700 p-2.5 rounded-xl border border-orange-100">'
  );

  // Recent Tax Invoices Table header and rows
  content = content.replace(
    '      <div className="bg-slate-950/20 rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden backdrop-blur-md">',
    '      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">'
  );

  content = content.replace(
    '        <div className="p-5 border-b border-slate-800/85 flex items-center justify-between bg-slate-950/35">',
    '        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/60">'
  );

  content = content.replace('text-cyan-400 hover:text-cyan-300', 'text-emerald-700 hover:text-emerald-800');
  content = content.replace('bg-slate-950/40 border-b border-slate-800 text-slate-400', 'bg-slate-50 border-b border-slate-200 text-slate-600');
  content = content.replace('divide-y divide-slate-800/60 text-slate-300', 'divide-y divide-slate-200 text-slate-700');
  content = content.replace('hover:bg-slate-900/25', 'hover:bg-slate-50');

  // Paid, Partial, Unpaid capsules re-skin
  content = content.replace(
    'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shadow-[0_0_12px_rgba(16,185,129,0.08)]',
    'bg-emerald-50 text-emerald-700 border border-emerald-200'
  );
  content = content.replace(
    'bg-amber-500/10 text-amber-400 border border-amber-500/25 shadow-[0_0_12px_rgba(245,158,11,0.08)]',
    'bg-orange-50 text-orange-700 border border-orange-200'
  );
  content = content.replace(
    'bg-rose-500/10 text-rose-400 border border-rose-500/25 shadow-[0_0_12px_rgba(244,63,94,0.08)]',
    'bg-rose-50 text-rose-700 border border-rose-200'
  );

  // View Bill button re-skin
  content = content.replace(
    'className="bg-slate-900 border border-slate-800 hover:border-cyan-500/60 hover:bg-cyan-500/5 hover:text-cyan-400 text-slate-300 font-extrabold px-4.5 py-2 rounded-xl text-[10px] transition duration-300 uppercase tracking-wider"',
    'className="bg-slate-50 border border-slate-250 hover:border-emerald-500 hover:text-emerald-700 text-slate-700 font-bold px-4.5 py-2 rounded-xl text-[10px] transition duration-300 uppercase tracking-wider"'
  );

  content = content.replace(/\n/g, '\r\n');
  fs.writeFileSync(path, content, 'utf8');
  console.log('Successfully completed luxury light theme restructuring inside Dashboard.jsx');
}
