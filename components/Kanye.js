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
        className="overflow-hidden
        sm:flex sm:items-center sm:justify-around sm:pt-8 sm:pb-1
        md:flex-col-reverse md:justify-start md:pt-1 md:order-last md:flex-grow
        lg:order-first lg:block lg:flex-grow-0 lg:w-2/3 lg:mx-auto lg:pt-2
        xl:flex-col xl:flex-grow xl:w-1/3
        2xl:w-1/4"
      >
        <div
          className="relative aspect-square rounded-full overflow-hidden ring-4 bg-base-300 ring-accent transition
        w-60 -ml-32 -mt-20
        sm:w-28 sm:ml-0 sm:mt-0
        md:w-3/4 md:-mb-72
        lg:w-48 lg:mb-3.5 lg:ml-5 lg:ring-8
        xl:mx-auto
        xl:w-32 xl:ring-4"
        >
          <Image
            priority={true}
            src={kanye}
            alt="Ye"
            className="absolute top-0 left-0 w-full h-auto cover rounded-full"
          />
        </div>
        <div
          className="text-center w-2/3 mx-auto
        sm:mx-0 
        md:py-12 md:flex-grow md:flex md:flex-col md:justify-center
        lg:block lg:w-full lg:py-0 lg:text-left
        xl:text-center"
        >
          <p className="font-cursive font-thin text-base-content leading-tight transition">
            <span className="text-primary font-black text-xl">&ldquo;</span>
            <span className="mx-0.5 text-xl xl:text-lg">{quote}</span>
            <span className="text-primary font-black text-xl">&rdquo;</span>
          </p>
          <p
            className="text-center font-cursive font-light text-base italic text-base-content transition
          lg:text-right lg:pr-12
          xl:text-center xl:pr-0"
          >
            <span className="text-secondary font-black text-xl mr-0.5">
              ...
            </span>
            <span className="opacity-50">{name}</span>
            <span
              className="hidden text-secondary font-black text-xl ml-0.5
            xl:inline"
            >
              ...
            </span>
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Kanye;
