import { create } from "zustand";

const useTheme = create((set) => ({
  // theme settings are 0 = darkMode, 1 = lightMode, 2 = system
  isLight: true,
  onSystem: false,
  setIsLight: () => set((state) => ({ isLight: !state.isLight })),
  setOnSystem: () => set((state) => ({ onSystem: state.onSystem })),
}));

export default useTheme;
