import Link from "next/link";
import ClockIcon from "../components/ClockIcon";
import AboutIcon from "../components/AboutIcon";
import SettingsIcon from "../components/SettingsIcon";
import getSession from "./getSession";
import ProfileDrowdown from "./ProfileDropdown";

export default async function Navigation() {
  const session = await getSession();
  const iconStyles = "w-5 h-5 text-base-content stroke-current";
  return (
    <div className="navbar transition">
      <div className="navbar-start space-x-4">
        <Link href="/" className="btn btn-circle btn-sm btn-ghost">
          <ClockIcon className={iconStyles} />
        </Link>
        <Link
          href={session?.user ? "/account" : "/settings"}
          className="btn btn-circle btn-sm btn-ghost"
        >
          <SettingsIcon className={iconStyles} />
        </Link>
        <Link href="/about" className="btn btn-circle btn-sm btn-ghost">
          <AboutIcon className={iconStyles} />
        </Link>
      </div>
      <div className="navbar-end">
        <ProfileDrowdown session={session} />
      </div>
    </div>
  );
}
