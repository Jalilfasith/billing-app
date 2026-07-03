const fs = require('fs');

const appPath = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/App.jsx';

if (fs.existsSync(appPath)) {
  let content = fs.readFileSync(appPath, 'utf8');
  content = content.replace(/\r\n/g, '\n');

  const target = '  return (\n' +
    '    <div className="min-h-screen bg-slate-50 flex text-slate-800 antialiased font-sans">\n' +
    '      {/* Sidebar: Navigation Panel */}';

  const replacement = '  return (\n' +
    '    <div className="min-h-screen bg-[#020617] flex text-slate-100 antialiased font-sans relative overflow-hidden select-none select-text">\n' +
    '      {/* 3D background animated blobs */}\n' +
    '      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-blob-cyan pointer-events-none blur-[120px] z-0 no-print"></div>\n' +
    '      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blob-purple pointer-events-none blur-[120px] z-0 no-print"></div>\n\n' +
    '      {/* Sidebar: Navigation Panel */}';

  content = content.replace(target, replacement);

  // Update sidebar container classes
  content = content.replace(
    '      <aside \n' +
    '        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-slate-100 flex flex-col border-r border-slate-800 transition-transform duration-300 no-print\n' +
    '          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}\n' +
    '      >',
    '      <aside \n' +
    '        className={`fixed top-4 bottom-4 left-4 z-40 w-64 bg-slate-950/45 backdrop-blur-xl border border-slate-800/80 rounded-2xl flex flex-col transition-all duration-300 no-print shadow-[0_10px_30px_rgba(0,0,0,0.5)]\n' +
    '          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}\n' +
    '      >'
  );

  // Update sidebar header classes
  content = content.replace(
    '        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-950/60 backdrop-blur-md">',
    '        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800/50 bg-slate-950/30 rounded-t-2xl">'
  );

  // Update brand initials badge
  content = content.replace(
    '            <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black p-1.5 rounded-xl text-sm tracking-wider flex items-center justify-center w-9 h-9 shadow-md shadow-amber-500/20">',
    '            <div className="bg-gradient-to-br from-cyan-400 to-indigo-650 text-white font-extrabold p-1.5 rounded-xl text-xs tracking-wider flex items-center justify-center w-8 h-8 shadow-lg shadow-cyan-500/25">'
  );

  // Update brand subtitle
  content = content.replace(
    '              <span className="text-[10px] text-amber-500 font-bold tracking-widest uppercase mt-0.5 block">BILLING PORTAL</span>',
    '              <span className="text-[9px] text-cyan-400 font-bold tracking-widest uppercase mt-0.5 block">BILLING PORTAL</span>'
  );

  // Update sidebar navigation mapping button
  content = content.replace(
    '                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 group\n' +
    '                  ${isActive \n' +
    '                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/25" \n' +
    '                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}`}',
    '                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 border border-transparent group\n' +
    '                  ${isActive \n' +
    '                    ? "bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/30 text-cyan-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_15px_rgba(6,182,212,0.15)]" \n' +
    '                    : "text-slate-400 hover:bg-slate-900/30 hover:border-slate-800/50 hover:text-slate-200"}`}'
  );

  // Update sidebar icon highlights
  content = content.replace(
    '                <Icon size={18} className={isActive ? "text-slate-950" : "text-slate-400 group-hover:text-amber-400 transition-colors"} />',
    '                <Icon size={16} className={isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-cyan-400 transition-colors duration-300"} />'
  );

  // Update sidebar footer
  content = content.replace(
    '        <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-xs text-slate-500 flex flex-col gap-1.5">',
    '        <div className="p-4 border-t border-slate-800/50 bg-slate-950/20 rounded-b-2xl text-[10px] text-slate-500 flex flex-col gap-1">'
  );

  // Update main wrapper layout padding
  content = content.replace(
    '      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? "lg:pl-64" : ""}`}>',
    '      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 relative z-10 ${isSidebarOpen ? "lg:pl-72 lg:pr-4 lg:py-4" : "lg:px-4 lg:py-4"}`}'
  );

  // Update header navbar classes
  content = content.replace(
    '        <header className="h-16 bg-white/85 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 no-print shadow-sm">',
    '        <header className="h-16 bg-slate-950/35 backdrop-blur-xl border border-slate-800/80 lg:rounded-2xl px-6 flex items-center justify-between sticky top-4 z-30 no-print shadow-[0_4px_30px_rgba(0,0,0,0.3)]">'
  );

  // Header texts and profile
  content = content.replace(
    '              <h2 className="text-lg font-black text-slate-900 leading-tight">{getCurrentTitle()}</h2>',
    '              <h2 className="text-sm font-black text-white uppercase tracking-wider">{getCurrentTitle()}</h2>'
  );
  content = content.replace(
    '              <span className="text-xs font-extrabold text-slate-900">{company?.name || ""}</span>',
    '              <span className="text-xs font-bold text-slate-200">{company?.name || ""}</span>'
  );
  content = content.replace(
    '              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 justify-end">\n' +
    '                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>\n' +
    '                Active GST: {company?.gstin || ""}\n' +
    '              </span>',
    '              <span className="text-[9px] text-cyan-400 font-extrabold flex items-center gap-1 justify-end uppercase tracking-wider">\n' +
    '                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-ping"></span>\n' +
    '                GST: {company?.gstin || ""}\n' +
    '              </span>'
  );
  content = content.replace(
    '            <div className="h-9 w-9 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center font-bold text-amber-800 text-sm shadow-inner">',
    '            <div className="h-8 w-8 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300 flex items-center justify-center font-black text-xs shadow-md shadow-cyan-500/10">'
  );

  // Content main container
  content = content.replace(
    '        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto print:p-0 print:max-w-none">',
    '        <main className="flex-1 pt-6 max-w-7xl w-full mx-auto print:p-0 print:max-w-none">'
  );

  content = content.replace(/\n/g, '\r\n');
  fs.writeFileSync(appPath, content, 'utf8');
  console.log('Successfully redesigned global App.jsx shell layout');
}
