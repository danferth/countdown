import { useState, useEffect } from "react";
import { countdown } from "../util/time";

export const useCountdown = () => {
  const [count, setCount] = useState(countdown());

  useEffect(() => {
    setInterval(() => setCount(countdown()), 1000);
  }, []);

  return {
    days: count.days,
    hours: count.hours,
    minutes: count.minutes,
    seconds: count.seconds,
  };
};
