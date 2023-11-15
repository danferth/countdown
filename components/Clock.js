"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Years,
  Months,
  Days,
  Hours,
  Minutes,
  Seconds,
} from "./ClockComponents";
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
  // zustand state to be set from settings page in future
  const isRepeat = useSettings((state) => state.isRepeat);
  const setIsRepeat = useSettings((state) => state.setIsRepeat);

  const repeatDuration = useSettings((state) => state.repeatDuration);
  const setRepeatDuration = useSettings((state) => state.setRepeatDuration);

  const destination = useSettings((state) => state.destination);
  const setDestination = useSettings((state) => state.setDestination);

  const difference = useSettings((state) => state.difference);
  const setDifference = useSettings((state) => state.setDifference);

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
      console.log(difference);
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
      className="w-full px-8 md:px-12 lg:p-0 lg:w-8/12 lg:ml-auto xl:w-6/12 xl:mx-auto"
    >
      <div className="grid gap-2.5 md:gap-3.5 xl:gap-5 grid-cols-2 sm:grid-cols-4 sm:grid-rows-2 xl:grid-cols-2 xl:grid-rows-1">
        <Years count={difference.years}>{difference.years}</Years>
        <Months count={difference.months} previousSibling={difference.years}>
          {difference.months}
        </Months>
        <Days count={difference.days}>{difference.days}</Days>
        <Hours count={difference.hours}>{difference.hours}</Hours>
        <Minutes count={difference.minutes}>{difference.minutes}</Minutes>
        <Seconds count={Math.floor(difference.seconds)}>
          {Math.floor(difference.seconds)}
        </Seconds>
      </div>
      <p className="text-center mt-6 sm:mt-3 md:mt-10 md:text-md text-base font-medium font-serif text-gray-400 dark:text-gray-400 transition">
        {`daCountdown to ${destination.toLocaleString(DateTime.DATETIME_HUGE)}`}
      </p>
    </motion.div>
  );
};

export default Clock;
