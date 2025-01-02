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
    months: 1,
    days: 3,
    hours: 17,
    minutes: 0,
    seconds: 0,
  }),
  setDestination: (newDestination) => set({ destination: newDestination }),

  difference: {
    years: 10,
    months: 10,
    days: 10,
    hours: 10,
    minutes: 10,
    seconds: 10,
  },
  setDifference: (newDifference) => set({ difference: newDifference }),

  countdownComplete: false,
  setCountdownComplete: (newCountdownComplete) =>
    set({ countdownComplete: newCountdownComplete }),
}));

export default useSettings;
