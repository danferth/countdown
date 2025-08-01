import Link from "next/link";
import {
  ClockIcon,
  AdjustmentsHorizontalIcon,
  AdjustmentsVerticalIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import ThemeControler from "./ThemeControler";
import useSettings from "./useSettings";

export default function Navigation() {
  const countdownComplete = useSettings((state) => state.countdownComplete);
  const setCountdownComplete = useSettings(
    (state) => state.setCountdownComplete
  );
  const iconStyles =
    "w-7 h-7 text-base-content text-opacity-25 hover:text-opacity-100 fill-current";
  return (
    <div className="navbar transition">
      <div className="navbar-start"></div>
      <div className="navbar-center space-x-8 border border-base-300 rounded-full px-10 py-0.5 bg-base-200 shadow-xs hover:shadow-inner">
        <div
          className="tooltip tooltip-bottom flex align-center"
          data-tip="The Countdown"
        >
          <Link href="/" className="btn btn-circle btn-sm btn-ghost">
            <ClockIcon className={iconStyles} />
          </Link>
        </div>
        <div
          className="tooltip tooltip-bottom flex align-center"
          data-tip="Change the countdown"
        >
          <Link href="/settings" className="btn btn-circle btn-sm btn-ghost">
            <AdjustmentsVerticalIcon
              className={`${iconStyles} landscape:hidden`}
            />
            <AdjustmentsHorizontalIcon
              className={`${iconStyles} portrait:hidden`}
            />
          </Link>
        </div>
        <div
          className="tooltip tooltip-bottom flex align-center"
          data-tip="Why does this exist?"
        >
          <Link href="/about" className="btn btn-circle btn-sm btn-ghost">
            <QuestionMarkCircleIcon className={iconStyles} />
          </Link>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Light or Dark">
          <ThemeControler />
        </div>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
}
