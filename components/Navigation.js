import Link from "next/link";
import {
  SunIcon,
  MoonIcon,
  ClockIcon,
  AdjustmentsHorizontalIcon,
  AdjustmentsVerticalIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

export default async function Navigation() {
  const iconStyles = "w-5 h-5 text-base-content stroke-current";
  return (
    <div className="navbar transition">
      <div className="navbar-start"></div>
      <div className="navbar-center space-x-4">
        <Link href="/" className="btn btn-circle btn-sm btn-ghost">
          <ClockIcon className={iconStyles} />
        </Link>
        <Link href="/settings" className="btn btn-circle btn-sm btn-ghost">
          <AdjustmentsVerticalIcon
            className={`${iconStyles} landscape:hidden`}
          />
          <AdjustmentsHorizontalIcon
            className={`${iconStyles} portrait:hidden`}
          />
        </Link>
        <Link href="/about" className="btn btn-circle btn-sm btn-ghost">
          <QuestionMarkCircleIcon className={iconStyles} />
        </Link>
        <ThemeControler />
      </div>
      <div className="navbar-end">{/* theme switcher button thingy */}</div>
    </div>
  );
}

const ThemeControler = () => {
  return (
    <label className="swap swap-rotate btn btn-circle btn-sm btn-ghost">
      {/* this hidden checkbox controls the state */}
      <input type="checkbox" className="theme-controller" value="coffee" />

      {/* sun icon */}
      <SunIcon className="swap-off w-5 h-5 text-base-content stroke-current" />
      {/* moon icon */}
      <MoonIcon className="swap-on w-5 h-5 text-base-content stroke-current" />
    </label>
  );
};
