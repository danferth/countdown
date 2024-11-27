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
