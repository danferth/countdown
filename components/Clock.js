"use client";
import { motion } from "framer-motion";
import { ClockSquare } from "./ClockSquare";
const Clock = (props) => {
  // const [countdown, setCountdown] = useState(props.countdown);
  // const [message, setMessage] = useState("");

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
          {props.countdown &&
            Object.entries(props.countdown).map(([key, value], index) => {
              const alphabet = ["A", "B", "C", "D", "E", "F"];
              const squaresCount = Object.keys(props.countdown).length;
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
          {props.message}
        </p>
      </div>
    </motion.div>
  );
};

export default Clock;
