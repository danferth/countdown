"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Celebration from "../images/celebrate.gif";

const Complete = (props) => {
  const [message, setMessage] = useState(props.message);
  useEffect(() => {
    console.log(`message prop is ${props.message}`);
    setMessage(props.message);
  }, []);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl text-primary font-black -mb-8 text-center animate-pulse -rotate-6 ">
        Hoo Feaking Yah!
      </h1>

      <div className="rounded-md overflow-hidden shadow-lg">
        <Image
          src={Celebration}
          width={220}
          height={220}
          alt="celebration frog"
          unoptimized={true}
        />
      </div>
      <p className="text-xs font-mono text-primary-content animate-bounce mt-5 max-w-64 text-center">
        {message}
      </p>
    </div>
  );
};

export default Complete;
