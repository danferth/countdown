import { createStartTarget, findDifference } from "./time";

function countdown() {
  const currentDateObj = new Date();
  const countdownTimes = createStartTarget(currentDateObj);
  const clockData = findDifference(countdownTimes[0], countdownTimes[1]);
  // console.log("countdown run", clockData);
  return clockData;
}

// function intervalCountdown() {
//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve(countdown()), 1000);
//   });
//   return promise;
// }

export { countdown };
