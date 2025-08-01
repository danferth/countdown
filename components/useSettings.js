import { create } from "zustand";
import { DateTime } from "luxon";

const now = DateTime.local();

// Get the current day of the week (1 for Monday, 7 for Sunday)
const currentDay = now.weekday;

// Calculate the number of days to add to reach the next Friday (Friday is weekday 5)
let daysToAdd;
if (currentDay < 5) {
  // If today is before Friday, add the difference
  daysToAdd = 5 - currentDay;
} else if (currentDay > 5) {
  // If today is after Friday, add days to reach next week's Friday
  daysToAdd = 7 - currentDay + 5;
} else {
  // If today is Friday, the "upcoming" Friday is one week from now
  daysToAdd = 0;
}

// Add the calculated days to the current date
const upcomingFriday = now
  .plus({ days: daysToAdd })
  .set({ hour: 17, minute: 30 });
const useSettings = create((set) => ({
  isRepeat: true,
  setIsRepeat: (newRepeat) => set({ isRepeat: newRepeat }),

  repeatDuration: "weekly",
  setRepeatDuration: (newRepeatDuration) =>
    set({ repeatDuration: newRepeatDuration }),

  destination: upcomingFriday,
  setDestination: (newDestination) => set({ destination: newDestination }),

  countdownComplete: false,
  setCountdownComplete: (newCountdownComplete) =>
    set({ countdownComplete: newCountdownComplete }),
}));

export default useSettings;
