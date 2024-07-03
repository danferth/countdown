import { create } from "zustand";
import { DateTime } from "luxon";
const useSettings = create((set) => ({
  isRepeat: true,
  setIsRepeat: (newRepeat) => set({ isRepeat: newRepeat }),

  repeatDuration: "weekly",
  setRepeatDuration: (newRepeatDuration) =>
    set({ repeatDuration: newRepeatDuration }),

  destination: DateTime.fromObject({
    years: 2025,
    months: 8,
    days: 26,
    hours: 6,
    minutes: 30,
    seconds: 0,
  }),
  setDestination: (newDestination) => set({ destination: newDestination }),

  difference: {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
  setDifference: (newDifference) => set({ difference: newDifference }),
}));

export default useSettings;
