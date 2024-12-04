"use client";
import { useState, useEffect } from "react";
import useTheme from "./useTheme";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useThemeDetector } from "./useThemeDetector";
export default function ThemeControler() {
  const Dark = useTheme((state) => state.Dark);
  const Light = useTheme((state) => state.Light);
  const System = useTheme((state) => state.System);
  const isSystemDark = useThemeDetector();
  const [systemDark, setSystemDark] = useState(useThemeDetector());
  console.log(`systemDark: ${systemDark}`);
  console.log(`isSystemDark: ${isSystemDark}`);
  useEffect(() => {
    setSystemDark(isSystemDark);
  }, [isSystemDark]);
  return (
    <label className="swap swap-rotate btn btn-circle btn-sm btn-ghost text-base-content text-opacity-25 hover:text-opacity-100">
      {/* this hidden checkbox controls the state */}
      <input
        type="checkbox"
        className="theme-controller"
        value={Dark}
        checked={systemDark}
        onChange={() => setSystemDark(!systemDark)}
      />

      {/* sun icon */}
      <SunIcon className="swap-off w-7 h-7 fill-current" />
      {/* moon icon */}
      <MoonIcon className="swap-on w-7 h-7 fill-current" />
    </label>
  );
}
