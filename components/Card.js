import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useCountdown } from "./useCountdown";

const Card = () => {
  const theCount = useRef();
  theCount.current = useCountdown();
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
        <Days count={theCount.current.days}>{theCount.current.days}</Days>
        <Hours count={theCount.current.hours}>{theCount.current.hours}</Hours>
        <Minutes count={theCount.current.minutes}>
          {theCount.current.minutes}
        </Minutes>
        <Seconds count={theCount.current.seconds}>
          {theCount.current.seconds}
        </Seconds>
      </div>
      <p className="cursive text-center mt-6 sm:mt-3 md:mt-10 md:text-lg text-base font-medium font-serif text-gray-400 dark:text-gray-400 transition">
        Until Friday 5:00 pm
      </p>
    </motion.div>
  );
};

const Days = (props) => {
  return (
    <Wrap grid="col-span-2 sm:row-span-2 xl:row-span-1">
      <div className="flex items-center justify-center py-3 h-full">
        <span className="text-9xl">{props.children}</span>
        <span className="-ml-5 leading-none text-4xl text-center font-thin font-sans tracking-widest inline-block uppercase transform -rotate-90">
          {props.count === "01" ? `day` : `days`}
        </span>
      </div>
    </Wrap>
  );
};

const Hours = (props) => {
  return (
    <Wrap grid="col-span-2 sm:col-start-3 sm:col-span-2 xl:col-start-1">
      <div className="text-center leading-none flex items-center justify-center py-2 h-full">
        <span className="text-4xl">{props.children}</span>
        <span className="text-4xl uppercase font-sans font-black tracking-wide">
          {props.count === "01" ? `hour` : `hours`}
        </span>
      </div>
    </Wrap>
  );
};

const Minutes = (props) => {
  return (
    <Wrap grid="col-span-1 sm:col-start-3 sm:col-span-1 xl:col-start-1">
      <div className="flex justify-center flex-col items-center py-2.5 h-full">
        <span className="text-3xl">{props.children}</span>
        <span className="text-sm uppercase font-sans font-light leading-none tracking-wide">
          {props.count === "01" ? `minute` : `minutes`}
        </span>
      </div>
    </Wrap>
  );
};

const Seconds = (props) => {
  return (
    <Wrap grid="col-span-1 sm:col-start-4 sm:col-span-1 xl:col-start-2">
      <div className="flex justify-center flex-col items-center py-2.5 h-full">
        <span className="text-3xl">{props.children}</span>
        <span className="text-sm uppercase font-sans font-light leading-none tracking-wide">
          {props.count === "01" ? `second` : `seconds`}
        </span>
      </div>
    </Wrap>
  );
};

const Wrap = (props) => {
  return (
    <div className={`${props.grid} rounded-md shadow-md xl:shadow-lg`}>
      <div
        className={`h-full overflow-hidden rounded-md shadow-sm font-mono text-gray-300 bg-gray-100 dark:text-gray-800  dark:bg-gray-700 transition`}
      >
        {props.children}
      </div>
    </div>
  );
};
export default Card;
