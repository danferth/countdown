"use client";
import { Suspense, useState } from "react";
import Loading from "./loading";
import Kanye from "../components/Kanye";
import Clock from "../components/Clock";
export default function Home() {
  const [quoteVisible, setQuoteVisible] = useState(false);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="w-full h-full flex flex-col px-4 py-2.5">
          <Clock />
          <div
            className={` w-full shrink transition flex flex-col justify-center mb-4
          sm:mb-0
          sm:portrait:mb-14
          md:portrait:mb-12
          ${quoteVisible ? `lg:mb-12` : `lg:mb-24`}`}
          >
            {quoteVisible && <Kanye />}
            <button
              className="btn btn-neutral btn-xs text-neutral-content btn-outline mx-auto block"
              onClick={() => setQuoteVisible(!quoteVisible)}
            >
              {quoteVisible ? "Hide Yeezy" : "Show Yeezy"}
            </button>
          </div>
        </div>
      </Suspense>
    </>
  );
}
