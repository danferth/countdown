import { DateTime, Interval } from "luxon";

// remove entries from destination object with zero values
function removeZeroValues(obj) {
  const asArray = Object.entries(obj);
  const filtered = asArray.filter(([key, value]) => value > 0);
  const justStrings = Object.fromEntries(filtered);
  return justStrings;
}

// get next destination based on repeat duration
function findNextDestination(repeatDuration, currentDestination) {
  if (repeatDuration === "yearly") {
    return currentDestination.plus({ years: 1 });
  }
  if (repeatDuration === "monthly") {
    return currentDestination.plus({ months: 1 });
  }
  if (repeatDuration === "weekly") {
    return currentDestination.plus({ weeks: 1 });
  }
}

// message under countdown
function createDestinationMessage(isRepeat, destination, repeatDuration) {
  return `${
    !isRepeat ? "A one time" : ""
  } countdown to ${destination.toLocaleString(
    DateTime.DATE_HUGE
  )} @ ${destination.toLocaleString(DateTime.TIME_SIMPLE)}${
    isRepeat ? `, repeating ${repeatDuration}` : ""
  }`;
}

// function to take all data and calculate countdown return values
export function calculateCountdown(isRepeat, destination, repeatDuration) {
  const currentTime = DateTime.now();
  let newDestination;
  let countdownComplete = false;
  let difference = {};
  let squares = [];
  let message = "";

  if (currentTime > destination) {
    if (isRepeat) {
      newDestination = findNextDestination(repeatDuration, destination);
      difference = Interval.fromDateTimes(currentTime, newDestination)
        .toDuration(["years", "months", "days", "hours", "minutes", "seconds"])
        .toObject();
      squares = removeZeroValues(difference);
      message = createDestinationMessage(
        isRepeat,
        newDestination,
        repeatDuration
      );
    } else {
      countdownComplete = true;
      message = `Countdown to ${destination.toLocaleString(
        DateTime.DATE_HUGE
      )} @ ${destination.toLocaleString(DateTime.TIME_SIMPLE)} has completed!`;
    }
  } else if (currentTime < destination) {
    if (newDestination !== undefined) {
      newDestination = undefined;
    }
    difference = Interval.fromDateTimes(currentTime, destination)
      .toDuration(["years", "months", "days", "hours", "minutes", "seconds"])
      .toObject();
    squares = removeZeroValues(difference);
    message = createDestinationMessage(isRepeat, destination, repeatDuration);
  }

  return {
    squares: squares,
    message: message,
    newDestination: newDestination,
    countdownComplete: countdownComplete,
  };
}
