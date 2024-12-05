import { create } from "zustand";
const useTheme = create((set) => ({
  Light: "retro",
  Dark: "coffee",
  SystemIsDark: false,
  ThemeChanged: false,
  setLight: (newLightState) => set({ Light: newLightState }),
  setDark: (newDarkState) => set({ Dark: newDarkState }),
  setSystemIsDark: (newSystemIsDarkState) =>
    set({ SystemIsDark: newSystemIsDarkState }),
  setThemeChanged: (newThemeChanged) => set({ ThemeChanged: newThemeChanged }),
}));

export default useTheme;
