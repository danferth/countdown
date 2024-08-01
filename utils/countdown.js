import { createStartTarget, findDifference } from "./time";

function countdown() {
  const currentDateObj = new Date();
  const countdownTimes = createStartTarget(currentDateObj);
  const clockData = findDifference(countdownTimes[0], countdownTimes[1]);
  return clockData;
}

export { countdown };
