const fs = require('fs');

const path = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/App.jsx';

if (fs.existsSync(path)) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/\r\n/g, '\n');

  // 1. Add ArrowUp, Sun, Moon to imports
  content = content.replace(
    '  Menu,\n  X\n} from "lucide-react";',
    '  Menu,\n  X,\n  ArrowUp,\n  Sun,\n  Moon\n} from "lucide-react";'
  );

  // 2. Insert hooks right after isSidebarOpen state definition
  const targetState = '  const [isSidebarOpen, setIsSidebarOpen] = useState(true);';
  const insertionState = '  const [isSidebarOpen, setIsSidebarOpen] = useState(true);\n\n' +
    '  // Theme state\n' +
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

  content = content.replace(targetState, insertionState);

  // 3. Update return container class to bind current theme variable class
  content = content.replace(
    '  return (\n' +
    '    <div className="min-h-screen bg-[#020617] flex text-slate-100 antialiased font-sans relative overflow-hidden select-none select-text">',
    '  return (\n' +
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
    '      ></div>'
  );

  // 4. Update header navbar right column (insert Theme Toggle Button)
  const headerTarget = '            <div className="hidden sm:flex flex-col text-right">\n' +
    '              <span className="text-xs font-bold text-slate-200">{company?.name || ""}</span>\n' +
    '              <span className="text-[9px] text-cyan-400 font-extrabold flex items-center gap-1 justify-end uppercase tracking-wider">\n' +
    '                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-ping"></span>\n' +
    '                GST: {company?.gstin || ""}\n' +
    '              </span>\n' +
    '            </div>';

  const headerReplacement = '            <div className="hidden sm:flex flex-col text-right">\n' +
    '              <span className="text-xs font-bold text-slate-200">{company?.name || ""}</span>\n' +
    '              <span className="text-[9px] text-cyan-400 font-extrabold flex items-center gap-1 justify-end uppercase tracking-wider">\n' +
    '                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-ping"></span>\n' +
    '                GST: {company?.gstin || ""}\n' +
    '              </span>\n' +
    '            </div>\n' +
    '            \n' +
    '            {/* Premium Theme Switcher toggle */}\n' +
    '            <button\n' +
    '              onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}\n' +
    '              className="p-2 rounded-xl border border-slate-800/80 bg-slate-950/20 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition duration-300 cursor-pointer flex items-center justify-center"\n' +
    '              title="Switch Themes"\n' +
    '            >\n' +
    '              {theme === "dark" ? <Sun size={14} className="text-yellow-400 animate-spin-slow" /> : <Moon size={14} className="text-indigo-500" />}\n' +
    '            </button>';

  content = content.replace(headerTarget, headerReplacement);

  // 5. Append Back-to-Top button right before closing return statement
  const closingTarget = '    </div>\n' +
    '  );\n' +
    '}';

  const closingReplacement = '      {/* Floating Back to Top Button */}\n' +
    '      {showScrollTop && (\n' +
    '        <button\n' +
    '          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}\n' +
    '          className="fixed bottom-6 right-6 z-40 p-3 rounded-full card-glass-dark border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 hover:scale-110 shadow-lg shadow-cyan-500/10 transition cursor-pointer flex items-center justify-center"\n' +
    '        >\n' +
    '          <ArrowUp size={16} />\n' +
    '        </button>\n' +
    '      )}\n' +
    '    </div>\n' +
    '  );\n' +
    '}';

  content = content.replace(closingTarget, closingReplacement);

  content = content.replace(/\n/g, '\r\n');
  fs.writeFileSync(path, content, 'utf8');
  console.log('Successfully added theme switcher logic, cursors, and back-to-top handler to App.jsx');
}
