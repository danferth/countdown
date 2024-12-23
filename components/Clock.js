"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ClockSquare } from "./ClockSquare";
import useSettings from "../components/useSettings";
import { DateTime, Interval } from "luxon";

const Clock = () => {
  const defaultDifference = {
    years: 10,
    months: 10,
    days: 10,
    hours: 10,
    minutes: 10,
    seconds: 10,
  };
  const [destinationMessage, setDestinationMessage] = useState();
  // zustand state to be set from settings page in future
  const isRepeat = useSettings((state) => state.isRepeat);
  const setIsRepeat = useSettings((state) => state.setIsRepeat);
  const repeatDuration = useSettings((state) => state.repeatDuration);
  const setRepeatDuration = useSettings((state) => state.setRepeatDuration);
  const destination = useSettings((state) => state.destination);
  const difference = useSettings((state) => state.difference);
  const countdownComplete = useSettings((state) => state.countdownComplete);
  const setDestination = useSettings((state) => state.setDestination);
  const setDifference = useSettings((state) => state.setDifference);
  const setCountdownComplete = useSettings(
    (state) => state.setCountdownComplete
  );
  const alphabet = ["A", "B", "C", "D", "E", "F"];

  function removeZeroValues(obj) {
    // Convert `obj` to a key/value array
    // `[['name', 'Luke Skywalker'], ['title', 'Jedi Knight'], ...]`
    const asArray = Object.entries(obj);

    const filtered = asArray.filter(([key, value]) => value > 0);

    // Convert the key/value array back to an object:
    // `{ name: 'Luke Skywalker', title: 'Jedi Knight' }`
    const justStrings = Object.fromEntries(filtered);
    return justStrings;
  }
  const squares = removeZeroValues(difference);
  const squaresCount = Object.keys(squares).length;
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
  // reset countdown after 30 seconds
  function resetCountdown() {
    setIsRepeat(true);
    setRepeatDuration("yearly");
    setCountdownComplete(false);
  }
  useEffect(() => {
    const currentTime = DateTime.now();
    setDestinationMessage(
      `${!isRepeat ? "One Time" : ""} Countdown to ${destination.toLocaleString(
        DateTime.DATE_HUGE
      )} @ ${destination.toLocaleString(DateTime.TIME_SIMPLE)}${
        isRepeat
          ? `, Repeating ${repeatDuration
              .charAt(0)
              .toUpperCase()}${repeatDuration.slice(1)}`
          : ""
      }`
    );

    if (currentTime > destination) {
      if (isRepeat) {
        setDestination(findNextDestination(repeatDuration, destination));
      } else {
        setCountdownComplete(true);
        // setTimeout(resetCountdown, 30000);
      }
    } else if (currentTime < destination) {
      countdownComplete && setCountdownComplete(false);
      setTimeout(
        () =>
          setDifference(
            Interval.fromDateTimes(currentTime, destination)
              .toDuration([
                "years",
                "months",
                "days",
                "hours",
                "minutes",
                "seconds",
              ])
              .toObject()
          ),
        1000
      );
    }
  });

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
          {Object.entries(squares).map(([key, value], index) => {
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
          {destinationMessage}
        </p>
      </div>
    </motion.div>
  );
};

export default Clock;
