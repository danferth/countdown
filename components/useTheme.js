import { create } from "zustand";

const useTheme = create((set) => ({
  Light: "retro",
  Dark: "coffee",
  setLight: (newLightState) => set({ Light: newLightState }),
  setDark: (newDarkState) => set({ Dark: newDarkState }),
}));

export default useTheme;
