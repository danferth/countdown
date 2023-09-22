"useClient";

import { useState, useEffect } from "react";
import { createStartTarget, findDifference } from "../util/time";

export const useCountdown = () => {
  function getDiffForState() {
    let currentDateObj = new Date();
    let startSet = createStartTarget(currentDateObj);
    return findDifference(startSet[0], startSet[1]);
  }

  const [count, setCount] = useState(getDiffForState);

  useEffect(() => {
    const intervalId = setInterval(() => setCount(getDiffForState), 1000);
    return () => clearInterval(intervalId);
  }, []);
  return count;
};
