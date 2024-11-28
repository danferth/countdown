import { create } from "zustand";

const useTheme = create((set) => ({
  Light: "retro",
  Dark: "coffee",
  System: false,
  setLight: (newLightState) => set({ Light: newLightState }),
  setDark: (newDarkState) => set({ Dark: newDarkState }),
  setSystem: (newSystemState) => set({ System: newSystemState }),
}));

export default useTheme;
