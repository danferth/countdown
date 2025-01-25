"use client";
import { useState, useEffect } from "react";
import useSettings from "../components/useSettings";
import Kanye from "../components/Kanye";
import Clock from "../components/Clock";
// import CompleteCountdown from "../components/CompleteCountdown";
import Complete from "../components/complete";
import { calculateCountdown } from "../components/calculateCountdown";

export default function Home() {
  const [countdown, setCountdown] = useState();
  const [message, setMessage] = useState("");
  // zustand state to be set from settings page in future
  const isRepeat = useSettings((state) => state.isRepeat);
  const repeatDuration = useSettings((state) => state.repeatDuration);

  const destination = useSettings((state) => state.destination);
  const setDestination = useSettings((state) => state.setDestination);

  const countdownComplete = useSettings((state) => state.countdownComplete);
  const setCountdownComplete = useSettings(
    (state) => state.setCountdownComplete
  );
  const setIsRepeat = useSettings((state) => state.setIsRepeat);
  const setRepeatDuration = useSettings((state) => state.setRepeatDuration);

  useEffect(() => {
    function resetCountdown() {
      setCountdownComplete(false);
      setIsRepeat(true);
      setRepeatDuration("yearly");
    }
    function setup(isRepeat, destination, repeatDuration) {
      let newCountdown = calculateCountdown(
        isRepeat,
        destination,
        repeatDuration
      );
      if (newCountdown.newDestination) {
        setDestination(newCountdown.newDestination);
      }
      if (newCountdown.countdownComplete) {
        setCountdownComplete(newCountdown.countdownComplete);
      }
      if (newCountdown.message !== message) {
        setMessage(newCountdown.message);
      }
      setCountdown(newCountdown.squares);
    }
    if (countdownComplete) {
      // setTimeout(() => resetCountdown(), 5000);
      return;
    } else {
      const timeoutId = setTimeout(
        () => setup(isRepeat, destination, repeatDuration),
        1000
      );
      return () => clearTimeout(timeoutId);
    }
  }, [
    countdown,
    destination,
    isRepeat,
    repeatDuration,
    message,
    setDestination,
    countdownComplete,
    setCountdownComplete,
    setIsRepeat,
    setRepeatDuration,
  ]);

  return (
    <div className="w-full h-full flex flex-col px-4 py-2.5">
      {countdownComplete ? (
        <Complete message={message} />
      ) : (
        <Clock countdown={countdown} message={message} />
      )}
      <Kanye />
    </div>
  );
}
