"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ClockSquare } from "./ClockSquare";
import { calculateCountdown } from "./calculateCountdown";
import useSettings from "./useSettings";
const Clock = () => {
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

  useEffect(() => {
    function setup(isRepeat, destination, repeatDuration) {
      console.log(`destination`, destination);
      let newCountdown = calculateCountdown(
        isRepeat,
        destination,
        repeatDuration
      );
      console.log(`newDestination`, newCountdown.newDestination);
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

    const timeoutId = setInterval(
      () => setup(isRepeat, destination, repeatDuration),
      1000
    );
    return () => clearInterval(timeoutId);
  }, [
    countdown,
    destination,
    isRepeat,
    repeatDuration,
    message,
    setDestination,
    setCountdownComplete,
  ]);

  // useEffect(() => {
  //   if (!countdown) {
  //     setup();
  //     console.log(`countdown no`, countdown);
  //   } else {
  //     console.log(`countdown yes`, countdown);
  //     setTimeout(setup, 3000);
  //   }
  // }, [countdown]);

  // motion
  const variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { type: "tween", delay: 1, duration: 0.5, ease: "easeIn" },
    },
  };

  return (
    <motion.div
      layout="true"
      variants={variants}
      initial="initial"
      animate="animate"
      className="w-full mx-auto grow flex flex-col items-center justify-center"
    >
      <div className="w-full">
        <div
          className=" w-full mx-auto grid gap-2.5 md:gap-3 xl:gap-4 grid-cols-2 
      sm:grid-cols-4 
      md:grid-cols-2 
      lg:grid-cols-4 lg:w-9/12"
        >
          {countdown &&
            Object.entries(countdown).map(([key, value], index) => {
              const alphabet = ["A", "B", "C", "D", "E", "F"];
              const squaresCount = Object.keys(countdown).length;
              const position = `${squaresCount}${alphabet[index]}`;
              return (
                <ClockSquare
                  key={key}
                  tag={key}
                  value={Math.floor(value)}
                  position={position}
                />
              );
            })}
        </div>
        <p className="text-center mt-2.5 sm:mt-3 md:mt-5 text-sm font-light font-mono text-base-content transition">
          {countdown && message}
        </p>
      </div>
    </motion.div>
  );
};

export default Clock;
