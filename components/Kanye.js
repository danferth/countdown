"use client";

import React, { useState, useEffect } from "react";
import kanye from "../images/kanye.png";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import getQuote from "./getQuote";

const Kanye = () => {
  const [quote, setQuote] = useState();
  const [name, setName] = useState();

  function getName() {
    const names = ["Pablo", "Yeezy", "Yeezus", "Mr. West", "Ye", "Kanye"];
    const randomName = Math.floor(Math.random() * names.length);
    return names[randomName];
  }
  useEffect(() => {
    setName(getName());
    getQuote().then((res) => {
      setQuote(res.quote);
    });
  }, []);

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
      <motion.div
        layout="true"
        variants={variants}
        initial="initial"
        animate="animate"
        className="outline outline-accent"
      >
        <div className="flex-shrink-0 relative md:shadow-md h-0 w-14 pt-14 md:w-24 md:pt-24 xl:w-36 xl:pt-36 md:mb-3 rounded-full overflow-hidden ring-2 xl:ring-4 bg-base-300 ring-accent transition">
          <Image
            priority={true}
            src={kanye}
            alt="Ye"
            className="absolute top-0 left-0 w-full h-full cover rounded-full"
          />
        </div>
        <div className="ml-4 md:ml-0 text-left md:text-center">
          <p className="font-cursive font-thin mt-1 text-base  text-base-content leading-tight transition">
            <span className="text-primary font-black text-xl">&ldquo;</span>
            <span className="mx-0.5">{quote}</span>
            <span className="text-primary font-black text-xl">&rdquo;</span>
          </p>
          <p className="pr-5 text-right font-cursive font-light text-sm italic text-base-content transition">
            <span className="text-secondary font-black text-xl mr-0.5">
              ...
            </span>
            <span className="opacity-50">{name}</span>
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Kanye;
