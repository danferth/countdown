import Link from "next/link";
import ClockIcon from "../components/ClockIcon";
import AboutIcon from "../components/AboutIcon";
import SettingsIcon from "../components/SettingsIcon";
import getSession from "./getSession";
import ProfileDrowdown from "./ProfileDropdown";

export default async function Navigation() {
  const session = await getSession();
  const iconStyles = "w-6 h-6 text-gray-500 ";
  return (
    <div className="navbar bg-gray-50  mt-8 mb-4 rounded-lg shadow-md shadow-gray-300  transition">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          <ClockIcon className={iconStyles} />
        </Link>
        <Link href="/about" className="btn btn-ghost normal-case text-xl">
          <AboutIcon className={iconStyles} />
        </Link>
        <Link
          href={session?.user ? "/account" : "/settings"}
          className="btn btn-ghost normal-case text-xl"
        >
          <SettingsIcon className={iconStyles} />
        </Link>
        <Link href="/test" className="btn btn-ghost normal-case text-xl">
          Test
        </Link>
      </div>
      <div className="navbar-end">
        <ProfileDrowdown session={session} />
      </div>
    </div>
  );
}
