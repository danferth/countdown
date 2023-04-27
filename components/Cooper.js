import React, { useRef } from "react";
import cooper from "../images/cooper.jpg";
import { motion, AnimatePresence } from "framer-motion";
import useQuote from "./useQuote";
const Cooper = () => {
  const dailyQuote = useRef();
  dailyQuote.current = useQuote();

  const variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        type: "tween",
        delay: 0.25,
        duration: 0.25,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {dailyQuote.current && (
        <motion.div
          layout="true"
          variants={variants}
          initial="initial"
          animate="animate"
          className="lg:w-3/12 xl:5/12 md:ml-0 lg:self-center xl:mx-auto xl:-mt-20 flex items-center md:flex-col py-4 px-8 lg:p-0 mb-5 sm:mb-3 md:mb-20 lg:mb-0"
        >
          <div className="flex-shrink-0 relative md:shadow-md h-0 w-14 pt-14 md:w-24 md:pt-24 xl:w-36 xl:pt-36 md:mb-3 rounded-full overflow-hidden ring-2 xl:ring-4 ring-gray-200 dark:ring-gray-600 transition">
            <img
              src={cooper}
              alt="cooper"
              className="absolute top-0 left-0 w-full h-full cover rounded-full"
            />
          </div>
          <div className="ml-4 md:ml-0 text-left md:text-center">
            <p className="serif mt-1 mb-2 text-sm md:text-base font-medium text-gray-700 dark:text-gray-400 leading-tight tracking-tight md:tracking-normal transition">
              &ldquo;<span className="mx-0.5">{dailyQuote.current.text}</span>
              &rdquo;
            </p>
            <p className="text-right cursive text-xs md:text-sm font-serif italic tracking-tight md:tracking-normal text-gray-400 dark:text-gray-500 transition">
              ... {dailyQuote.current.author}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cooper;
