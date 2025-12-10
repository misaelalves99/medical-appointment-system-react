// src/app/providers/ThemeProvider.tsx

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  /**
   * Tema inicial. Por padrão, "dark" para manter o visual de dashboard premium.
   */
  initialTheme?: Theme;
}

export function ThemeProvider({
  children,
  initialTheme = 'dark',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  // Se quiser guardar preferência no localStorage
  useEffect(() => {
    const stored = window.localStorage.getItem('app-theme');
    if (stored === 'dark' || stored === 'light') {
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('app-theme', theme);
  }, [theme]);

  const setTheme = (value: Theme) => {
    setThemeState(value);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      isDark: theme === 'dark',
      toggleTheme,
      setTheme,
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
