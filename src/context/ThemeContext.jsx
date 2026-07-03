// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Premium palette (white based)
const theme = {
  colors: {
    primary: '#ffffff', // white background
    secondary: '#f0f4f8', // light gray
    accent: '#06b6d4', // cyan accent
    silver: '#c0c0c0',
    lightBlue: '#a6c8ff',
    purple: '#b89bff',
    gold: '#ffd700',
  },
  // future dark mode flag – keep false for now
  darkMode: false,
};

const ThemeContext = createContext(theme);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDark = () => setDarkMode((prev) => !prev);
  const value = { ...theme, darkMode, toggleDark };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
