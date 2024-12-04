"use client";
import { Suspense, useState, useEffect } from "react";
import Loading from "./loading";
import Kanye from "../components/Kanye";
import Clock from "../components/Clock";
export default function Home() {
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [name, setName] = useState();
  function getName() {
    const names = ["Pablo", "Yeezy", "Yeezus", "Mr. West", "Ye", "Kanye"];
    const randomName = Math.floor(Math.random() * names.length);
    return names[randomName];
  }
  useEffect(() => {
    setName(getName());
  }, []);
  if (!name) {
    return "...";
  }
  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="w-full h-full flex flex-col px-4 py-2.5">
          <Clock />
          <div
            className={` w-full shrink transition flex flex-col justify-center mb-4
          sm:mb-0 sm:landscape:mt-4
          sm:portrait:mb-14
          md:portrait:mb-12
          ${quoteVisible ? `lg:mb-12` : `lg:mb-24`}`}
          >
            {quoteVisible && <Kanye author={name} />}
            <button
              className="btn btn-accent btn-xs text-accent-content btn-outline mx-auto block"
              onClick={() => setQuoteVisible(!quoteVisible)}
            >
              {quoteVisible ? `Hide ${name}` : `Show ${name}`}
            </button>
          </div>
        </div>
      </Suspense>
    </>
  );
}
