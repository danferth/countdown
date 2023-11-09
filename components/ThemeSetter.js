"use client";
import { useEffect } from "react";
import useTheme from "./useTheme";
export default function ThemeSetter() {
  const isLight = useTheme((state) => state.isLight);
  const onSystem = useTheme((state) => state.onSystem);
  const setIsLight = useTheme((state) => state.setIsLight);
  const setOnSystem = useTheme((state) => state.setOnSystem);

  useEffect(() => {
    // if (onSystem) {
    //   setIsLight(window.matchMedia("(prefers-color-scheme: light)").matches);
    // }
    console.log("on component", isLight);
  }, [isLight]);

  return (
    <div className="absolute right-0 top-20 z-50 bg-gray-100 ring-2 ring-blue-200 dark:bg-gray-600 dark:ring-orange-500 pr-8 py-1.5 pl-1.5 rounded-l-full">
      <button
        className="p-1.5 rounded-full bg-gray-800 dark:bg-yellow-50"
        onClick={() => setIsLight()}
      >
        {isLight ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 text-blue-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 text-orange-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
