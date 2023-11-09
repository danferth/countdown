import { create } from "zustand";

const useSettings = create((set) => ({
  isRepeat: true,
  countdownDestination: "this friday @ 5pm",
  timeZone: "PST",
  setIsRepeat: () => set((state) => ({ isRepeat: state.isRepeat })),
  setCountdownDestination: () =>
    set((state) => ({ countdownDestination: state.countdownDestination })),
  setTimeZone: () => set((state) => ({ timeZone: state.timeZone })),
}));

export default useSettings;
