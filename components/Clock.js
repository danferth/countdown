"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ClockSquare } from "./ClockSquare";
import useSettings from "../components/useSettings";
import { DateTime, Interval } from "luxon";

const Clock = () => {
  const defaultDifference = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  const [destinationMessage, setDestinationMessage] = useState();
  // zustand state to be set from settings page in future
  const isRepeat = useSettings((state) => state.isRepeat);
  const repeatDuration = useSettings((state) => state.repeatDuration);
  const destination = useSettings((state) => state.destination);
  const difference = useSettings((state) => state.difference);

  const setDestination = useSettings((state) => state.setDestination);
  const setDifference = useSettings((state) => state.setDifference);

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

  useEffect(() => {
    const currentTime = DateTime.now();
    setDestinationMessage(
      `${destination.toLocaleString(
        DateTime.DATE_HUGE
      )} @ ${destination.toLocaleString(DateTime.TIME_SIMPLE)}`
    );

    if (currentTime > destination) {
      if (isRepeat) {
        setDestination(findNextDestination(repeatDuration, destination));
      } else {
        setDifference(defaultDifference);
      }
    } else if (currentTime < destination) {
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
      className="px-4 pb-12 w-full mx-auto flex-grow flex flex-col items-center justify-top
      sm:px-0 sm:flex-grow-0 
      md:pb-0 md:pt-6 md:w-11/12
      xl:w-2/3"
    >
      <div
        className="w-full grid gap-2.5 md:gap-3 xl:gap-4 grid-cols-2 
      sm:grid-cols-4 
      md:grid-cols-2 
      lg:grid-cols-4
      lg:w-3/4"
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
      <p className="text-center mt-2.5 text-sm font-light font-mono text-base-content transition space-x-2">
        <span className="inline">base</span>
        <span className="hidden sm:inline">SM</span>
        <span className="hidden md:inline">MD</span>
        <span className="hidden lg:inline">LG</span>
        <span className="hidden xl:inline">XL</span>
        <span className="hidden 2xl:inline">2XL</span>
      </p>
    </motion.div>
  );
};

export default Clock;
