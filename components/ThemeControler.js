"use client";
import useTheme from "./useTheme";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
export default function ThemeControler() {
  const Dark = useTheme((state) => state.Dark);
  const Light = useTheme((state) => state.Light);
  const System = useTheme((state) => state.System);

  return (
    <label className="swap swap-rotate btn btn-circle btn-sm btn-ghost">
      {/* this hidden checkbox controls the state */}
      <input type="checkbox" className="theme-controller" value={Dark} />

      {/* sun icon */}
      <SunIcon className="swap-off w-7 h-7 text-base-content fill-current" />
      {/* moon icon */}
      <MoonIcon className="swap-on w-7 h-7 text-base-content fill-current" />
    </label>
  );
}
