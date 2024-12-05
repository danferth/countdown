"use client";
import { useState, useEffect } from "react";
import useTheme from "./useTheme";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
export default function ThemeControler() {
  const Dark = useTheme((state) => state.Dark);
  const Light = useTheme((state) => state.Light);
  const SystemIsDark = useTheme((state) => state.SystemIsDark);
  const setSystemIsDark = useTheme((state) => state.setSystemIsDark);
  const setThemeChanged = useTheme((state) => state.setThemeChanged);
  console.log(`SystemIsDark: ${SystemIsDark}`);
  const onThemeChange = () => {
    setThemeChanged(true);
    setSystemIsDark(!SystemIsDark);
  };
  return (
    <label className="swap swap-rotate btn btn-circle btn-sm btn-ghost text-base-content text-opacity-25 hover:text-opacity-100">
      {/* this hidden checkbox controls the state */}
      <input
        type="checkbox"
        className="theme-controller"
        value={Dark}
        checked={SystemIsDark}
        onChange={() => onThemeChange()}
      />

      {/* sun icon */}
      <SunIcon className="swap-off w-7 h-7 fill-current" />
      {/* moon icon */}
      <MoonIcon className="swap-on w-7 h-7 fill-current" />
    </label>
  );
}
