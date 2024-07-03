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
        className="overflow-hidden py-4 flex-auto"
      >
        <div className="w-24 mx-auto relative aspect-square rounded-full overflow-hidden ring-4 bg-base-300 ring-accent transition">
          <Image
            priority={true}
            src={kanye}
            alt="Ye"
            className="absolute top-0 left-0 w-full h-auto cover rounded-full"
          />
        </div>
        <div className="text-center w-11/12 mx-auto mt-3 lg:mt-6">
          <p className="font-cursive font-thin text-base-content leading-tight transition max-w-xl mx-auto">
            <span className="text-primary font-black text-base">&ldquo;</span>
            <span className="mx-0.5 text-sm">{quote}</span>
            <span className="text-primary font-black text-base">&rdquo;</span>
          </p>
          <p className="text-center font-cursive font-light text-sm italic text-base-content transition">
            <span className="text-secondary font-black text-xl mr-0.5">
              ...
            </span>
            <span className="opacity-50">{name}</span>
            <span className="hidden text-secondary font-black text-xl ml-0.5">
              ...
            </span>
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Kanye;
