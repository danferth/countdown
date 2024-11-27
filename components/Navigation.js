import Link from "next/link";
import {
  ClockIcon,
  AdjustmentsHorizontalIcon,
  AdjustmentsVerticalIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import ThemeControler from "./ThemeControler";

export default function Navigation() {
  const iconStyles = "w-5 h-5 text-base-content stroke-current";
  return (
    <div className="navbar transition">
      <div className="navbar-start"></div>
      <div className="navbar-center space-x-4">
        <div className="tooltip tooltip-bottom" data-tip="The Countdown">
          <Link href="/" className="btn btn-circle btn-sm btn-ghost">
            <ClockIcon className={iconStyles} />
          </Link>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Change the countdown">
          <Link href="/settings" className="btn btn-circle btn-sm btn-ghost">
            <AdjustmentsVerticalIcon
              className={`${iconStyles} landscape:hidden`}
            />
            <AdjustmentsHorizontalIcon
              className={`${iconStyles} portrait:hidden`}
            />
          </Link>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Why does this exist?">
          <Link href="/about" className="btn btn-circle btn-sm btn-ghost">
            <QuestionMarkCircleIcon className={iconStyles} />
          </Link>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Light or Dark">
          <ThemeControler />
        </div>
      </div>
      <div className="navbar-end">{/* theme switcher button thingy */}</div>
    </div>
  );
}
