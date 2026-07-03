const fs = require('fs');

const path = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/InvoicePreview.jsx';

if (fs.existsSync(path)) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/\r\n/g, '\n');

  // Back to history button
  content = content.replace(
    '        <button \n' +
    '          onClick={() => setView("history")}\n' +
    '          className="text-slate-500 hover:text-slate-800 text-xs font-bold flex items-center gap-1 transition duration-200"',
    '        <button \n' +
    '          onClick={() => setView("history")}\n' +
    '          className="text-slate-400 hover:text-cyan-400 text-xs font-bold flex items-center gap-1.5 transition duration-300"'
  );

  // Edit Data button
  content = content.replace(
    '          <button \n' +
    '            onClick={() => setView("create-invoice")} \n' +
    '            className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold px-4 py-2 rounded-lg text-xs border border-slate-700 transition"\n' +
    '          >',
    '          <button \n' +
    '            onClick={() => setView("create-invoice")} \n' +
    '            className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-extrabold hover:text-white px-4 py-2 rounded-xl text-xs transition duration-300 uppercase tracking-wider"\n' +
    '          >'
  );

  // Print button
  content = content.replace(
    '          <button \n' +
    '            onClick={handlePrint}\n' +
    '            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-5 py-2.5 rounded-lg text-xs flex items-center gap-2 shadow-sm transition"\n' +
    '          >',
    '          <button \n' +
    '            onClick={handlePrint}\n' +
    '            className="btn-neon-cyan px-5 py-2.5 text-xs flex items-center gap-2 tracking-wider font-extrabold uppercase"\n' +
    '          >'
  );

  // Outer A4 Sheet Container
  content = content.replace(
    '      <div className="flex justify-center bg-slate-100/50 p-4 rounded-2xl border border-slate-200/60 shadow-inner no-print overflow-x-auto">',
    '      <div className="flex justify-center bg-slate-950/20 p-6 rounded-2xl border border-slate-800/80 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl no-print overflow-x-auto">'
  );

  content = content.replace(/\n/g, '\r\n');
  fs.writeFileSync(path, content, 'utf8');
  console.log('Successfully redesigned InvoicePreview.jsx workspace');
}
