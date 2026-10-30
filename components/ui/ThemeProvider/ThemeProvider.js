'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Light scheme set as default; dark mode disabled for now
    setTheme('light');
    document.documentElement.setAttribute('data-theme', 'light');
    try {
      localStorage.setItem('theme', 'light');
    } catch (e) {}
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    // Disabled for now: maintains light theme
    setTheme('light');
    document.documentElement.setAttribute('data-theme', 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
