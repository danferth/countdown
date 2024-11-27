"use client";
import useTheme from "./useTheme";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
export default function ThemeControler() {
  const Dark = useTheme((state) => state.Dark);
  const Light = useTheme((state) => state.Light);

  return (
    <label className="swap swap-rotate btn btn-circle btn-sm btn-ghost">
      {/* this hidden checkbox controls the state */}
      <input type="checkbox" className="theme-controller" value={Dark} />

      {/* sun icon */}
      <SunIcon className="swap-off w-5 h-5 text-base-content stroke-current" />
      {/* moon icon */}
      <MoonIcon className="swap-on w-5 h-5 text-base-content stroke-current" />
    </label>
  );
}
