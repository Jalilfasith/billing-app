const fs = require('fs');

const path = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/App.jsx';

if (fs.existsSync(path)) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/\r\n/g, '\n');

  // 1. Remove cursor hooks and theme hooks
  // Locate state variables block and replace with clean code
  const targetHooks = '  // Theme state\n' +
    '  const [theme, setTheme] = useState(() => localStorage.getItem("gst_theme") || "dark");\n' +
    '  \n' +
    '  // Cursor state\n' +
    '  const [coords, setCoords] = useState({ x: 0, y: 0 });\n' +
    '  const [isCursorMoving, setIsCursorMoving] = useState(false);\n' +
    '  \n' +
    '  // Scroll indicators\n' +
    '  const [scrollProgress, setScrollProgress] = useState(0);\n' +
    '  const [showScrollTop, setShowScrollTop] = useState(false);\n\n' +
    '  // Sync theme with local storage\n' +
    '  useEffect(() => {\n' +
    '    localStorage.setItem("gst_theme", theme);\n' +
    '  }, [theme]);\n\n' +
    '  // Track cursor movement\n' +
    '  useEffect(() => {\n' +
    '    let timeout;\n' +
    '    const handleMouseMove = (e) => {\n' +
    '      setCoords({ x: e.clientX, y: e.clientY });\n' +
    '      setIsCursorMoving(true);\n' +
    '      clearTimeout(timeout);\n' +
    '      timeout = setTimeout(() => setIsCursorMoving(false), 800);\n' +
    '    };\n' +
    '    window.addEventListener("mousemove", handleMouseMove);\n' +
    '    return () => {\n' +
    '      window.removeEventListener("mousemove", handleMouseMove);\n' +
    '      clearTimeout(timeout);\n' +
    '    };\n' +
    '  }, []);\n\n' +
    '  // Track page scroll position\n' +
    '  useEffect(() => {\n' +
    '    const handleScroll = () => {\n' +
    '      const total = document.documentElement.scrollHeight - window.innerHeight;\n' +
    '      if (total > 0) {\n' +
    '        setScrollProgress((window.scrollY / total) * 100);\n' +
    '      }\n' +
    '      setShowScrollTop(window.scrollY > 300);\n' +
    '    };\n' +
    '    window.addEventListener("scroll", handleScroll);\n' +
    '    return () => window.removeEventListener("scroll", handleScroll);\n' +
    '  }, []);';

  const replacementHooks = '  // Scroll indicators\n' +
    '  const [scrollProgress, setScrollProgress] = useState(0);\n' +
    '  const [showScrollTop, setShowScrollTop] = useState(false);\n\n' +
    '  // Track page scroll position\n' +
    '  useEffect(() => {\n' +
    '    const handleScroll = () => {\n' +
    '      const total = document.documentElement.scrollHeight - window.innerHeight;\n' +
    '      if (total > 0) {\n' +
    '        setScrollProgress((window.scrollY / total) * 100);\n' +
    '      }\n' +
    '      setShowScrollTop(window.scrollY > 300);\n' +
    '    };\n' +
    '    window.addEventListener("scroll", handleScroll);\n' +
    '    return () => window.removeEventListener("scroll", handleScroll);\n' +
    '  }, []);';

  content = content.replace(targetHooks, replacementHooks);

  // 2. Rewrite return statement to use light-theme and remove blobs/cursor divs
  const targetReturn = '  return (\n' +
    '    <div className={`min-h-screen flex antialiased font-sans relative overflow-hidden select-none select-text transition-colors duration-500 ${theme === "dark" ? "dark-theme bg-[#020617] text-slate-100" : "light-theme bg-[#f8fafc] text-slate-800"}`}>\n' +
    '      {/* Sticky Scroll Progress bar */}\n' +
    '      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 z-50 transition-all duration-100" style={{ width: `${scrollProgress}%` }}></div>\n\n' +
    '      {/* Custom Cursor trailer */}\n' +
    '      <div \n' +
    '        className="hidden lg:block fixed w-8 h-8 rounded-full border border-cyan-500/50 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out" \n' +
    '        style={{ left: `${coords.x}px`, top: `${coords.y}px`, opacity: isCursorMoving ? 1 : 0, transition: "opacity 0.3s ease" }}\n' +
    '      ></div>\n' +
    '      <div \n' +
    '        className="hidden lg:block fixed w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2" \n' +
    '        style={{ left: `${coords.x}px`, top: `${coords.y}px`, opacity: isCursorMoving ? 1 : 0, transition: "opacity 0.3s ease" }}\n' +
    '      ></div>\n' +
    '      {/* 3D background animated blobs */}\n' +
    '      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-blob-cyan pointer-events-none blur-[120px] z-0 no-print"></div>\n' +
    '      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blob-purple pointer-events-none blur-[120px] z-0 no-print"></div>';

  const replacementReturn = '  return (\n' +
    '    <div className="min-h-screen flex antialiased font-sans relative overflow-hidden select-none select-text bg-[#f8fafc] text-[#020617] light-theme">\n' +
    '      {/* Sticky Scroll Progress bar */}\n' +
    '      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-orange-500 z-50 transition-all duration-100" style={{ width: `${scrollProgress}%` }}></div>';

  content = content.replace(targetReturn, replacementReturn);

  // 3. Update Sidebar layout to be elegant deep black/dark-green
  content = content.replace(
    '      <aside \n' +
    '        className={`fixed top-4 bottom-4 left-4 z-40 w-64 bg-slate-950/45 backdrop-blur-xl border border-slate-800/80 rounded-2xl flex flex-col transition-all duration-300 no-print shadow-[0_10px_30px_rgba(0,0,0,0.5)]\n' +
    '          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}\n' +
    '      >',
    '      <aside \n' +
    '        className={`fixed top-4 bottom-4 left-4 z-40 w-64 bg-[#020617] text-white border border-slate-800 rounded-2xl flex flex-col transition-all duration-300 no-print shadow-xl\n' +
    '          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}\n' +
    '      >'
  );

  // Sidebar header initials badge and subtitle re-skin (orange / green gradient)
  content = content.replace(
    '            <div className="bg-gradient-to-br from-cyan-400 to-indigo-650 text-white font-extrabold p-1.5 rounded-xl text-xs tracking-wider flex items-center justify-center w-8 h-8 shadow-lg shadow-cyan-500/25">',
    '            <div className="bg-gradient-to-br from-emerald-400 to-orange-550 text-white font-extrabold p-1.5 rounded-xl text-xs tracking-wider flex items-center justify-center w-8 h-8 shadow-md">'
  );
  content = content.replace(
    '              <span className="text-[9px] text-cyan-400 font-bold tracking-widest uppercase mt-0.5 block">BILLING PORTAL</span>',
    '              <span className="text-[9px] text-orange-500 font-bold tracking-widest uppercase mt-0.5 block">BILLING PORTAL</span>'
  );

  // Sidebar mapping button re-skin to Emerald green
  content = content.replace(
    '                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 border border-transparent group\n' +
    '                  ${isActive \n' +
    '                    ? "bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/30 text-cyan-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_15px_rgba(6,182,212,0.15)]" \n' +
    '                    : "text-slate-400 hover:bg-slate-900/30 hover:border-slate-800/50 hover:text-slate-200"}`}',
    '                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 border border-transparent group\n' +
    '                  ${isActive \n' +
    '                    ? "bg-gradient-to-r from-emerald-500/10 to-emerald-500/20 border border-emerald-500/30 text-emerald-450 shadow-[0_0_15px_rgba(16,185,129,0.12)]" \n' +
    '                    : "text-slate-400 hover:bg-slate-900/30 hover:border-slate-850 hover:text-slate-200"}`}'
  );

  content = content.replace(
    '                <Icon size={16} className={isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-cyan-400 transition-colors duration-300"} />',
    '                <Icon size={16} className={isActive ? "text-emerald-450" : "text-slate-400 group-hover:text-emerald-400 transition-colors duration-300"} />'
  );

  // 4. Update Header Top-bar elements (White header, Green/Orange badges, remove theme toggle button)
  content = content.replace(
    '        <header className="h-16 bg-slate-950/35 backdrop-blur-xl border border-slate-800/80 lg:rounded-2xl px-6 flex items-center justify-between sticky top-4 z-30 no-print shadow-[0_4px_30px_rgba(0,0,0,0.3)]">',
    '        <header className="h-16 bg-white border border-slate-200/80 lg:rounded-2xl px-6 flex items-center justify-between sticky top-4 z-30 no-print shadow-sm">'
  );

  content = content.replace(
    '              <h2 className="text-sm font-black text-white uppercase tracking-wider">{getCurrentTitle()}</h2>',
    '              <h2 className="text-sm font-black text-[#020617] uppercase tracking-wider">{getCurrentTitle()}</h2>'
  );

  content = content.replace(
    '              <span className="text-xs font-bold text-slate-200">{company?.name || ""}</span>',
    '              <span className="text-xs font-bold text-slate-850">{company?.name || ""}</span>'
  );

  content = content.replace(
    '              <span className="text-[9px] text-cyan-400 font-extrabold flex items-center gap-1 justify-end uppercase tracking-wider">\n' +
    '                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-ping"></span>\n' +
    '                GST: {company?.gstin || ""}\n' +
    '              </span>',
    '              <span className="text-[9px] text-emerald-700 font-extrabold flex items-center gap-1 justify-end uppercase tracking-wider">\n' +
    '                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>\n' +
    '                GST: {company?.gstin || ""}\n' +
    '              </span>'
  );

  // Remove theme switch button from layout
  const toggleSearchStr = '            {/* Premium Theme Switcher toggle */}\n' +
    '            <button\n' +
    '              onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}\n' +
    '              className="p-2 rounded-xl border border-slate-800/80 bg-slate-950/20 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition duration-300 cursor-pointer flex items-center justify-center"\n' +
    '              title="Switch Themes"\n' +
    '            >\n' +
    '              {theme === "dark" ? <Sun size={14} className="text-yellow-400 animate-spin-slow" /> : <Moon size={14} className="text-indigo-500" />}\n' +
    '            </button>';

  content = content.replace(toggleSearchStr, '');

  // User icon badge re-skin
  content = content.replace(
    '            <div className="h-8 w-8 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300 flex items-center justify-center font-black text-xs shadow-md shadow-cyan-500/10">',
    '            <div className="h-8 w-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center font-black text-xs shadow-sm">'
  );

  // 5. Back to top button re-skin to Emerald Green
  content = content.replace(
    '          className="fixed bottom-6 right-6 z-40 p-3 rounded-full card-glass-dark border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 hover:scale-110 shadow-lg shadow-cyan-500/10 transition cursor-pointer flex items-center justify-center"',
    '          className="fixed bottom-6 right-6 z-40 p-3 rounded-full card-glass-dark border border-emerald-500/30 text-emerald-600 hover:text-emerald-700 hover:scale-105 shadow-md transition cursor-pointer flex items-center justify-center"'
  );

  content = content.replace(/\n/g, '\r\n');
  fs.writeFileSync(path, content, 'utf8');
  console.log('Successfully completed luxury light theme restructuring inside App.jsx');
}
