import { useEffect, useState } from "react";

export const useThemeDetector = () => {
  const getCurrentTheme = () => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  };

  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());
  const mqListener = (e) => {
    setIsDarkTheme(e.matches);
  };

  useEffect(() => {
    let darkThemeMq;
    if (typeof window !== "undefined") {
      darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    }
    darkThemeMq.addEventListener("change", mqListener);
    return () => darkThemeMq.removeEventListener("change", mqListener);
  }, []);

  return isDarkTheme;
};
