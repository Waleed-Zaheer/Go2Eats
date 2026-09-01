import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
);

function getPreferredTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({
  children,
  defaultTheme,
  storageKey = "theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () =>
      (localStorage.getItem(storageKey) as Theme | null) ??
      defaultTheme ??
      getPreferredTheme()
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const value: ThemeProviderState = {
    theme,
    setTheme: (nextTheme) => {
      localStorage.setItem(storageKey, nextTheme);
      setTheme(nextTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
