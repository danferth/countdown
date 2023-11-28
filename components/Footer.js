import React from "react";
import Akio from "../components/Akio";
const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="mt-auto flex items-center justify-between lg:justify-center xl:justify-end py-2 xl:py-3.5 px-5 md:px-8 w-full bg-white dark:bg-gray-800 transition">
      <div className="flex flex-row justify-center items-center sans text-xs font-extralight text-gray-400 dark:text-gray-500 tracking-wider transition">
        <span className="mr-2.5">&copy; {year}</span>
        <a className="mr-8" href="https://danferth.dev">
          <Akio className="h-5 w-auto text-red-700 dark:text-red-600 fill-current self-end transition" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
