// src/components/ui/FrostedNavBar.jsx
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

/**
 * Premium frosted navigation bar with theme toggle.
 * Uses Tailwind utilities for backdrop blur and gradient accent.
 */
export default function FrostedNavBar({ onToggleSidebar, isSidebarOpen }) {
  const { darkMode, toggleDark } = useTheme();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/30 backdrop-blur-xl border-b border-white/20 shadow-sm"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      <button
        onClick={onToggleSidebar}
        className="text-gray-700 hover:text-gray-900 transition"
      >
        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </button>
      <h1 className="text-2xl font-semibold text-gray-800 select-none">
        Premium Billing SaaS
      </h1>
      <button
        onClick={toggleDark}
        className="p-2 rounded-full bg-white/50 hover:bg-white/70 transition"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </motion.header>
  );
}

// Simple icons for sidebar toggle (replace with proper SVGs if needed)
function MenuIcon() {
  return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
}
function CloseIcon() {
  return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
}
