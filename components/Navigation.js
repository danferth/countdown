"use client";
import { useRef, useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Image from "next/image";
import Cooper from "../images/cooper.jpg";
import ThemeSetter from "./ThemeSetter";
import ClockIcon from "../components/ClockIcon";
import AboutIcon from "../components/AboutIcon";
import SettingsIcon from "../components/SettingsIcon";
import { useRouter } from "next/navigation";
export default function Navigation() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [signedIn, setSignedIn] = useState(false);
  async function session() {
    const { data, error } = await supabase.auth.getSession();
    if (data) {
      if (data.session !== null) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
    }
    if (error) {
      console.log("getSesstion error", error);
    }
  }

  useEffect(() => {
    session();
  });

  const dropdown = useRef();
  function onChangeDropdown(link) {
    dropdown.current.removeAttribute("open");
    router.push(link);
  }
  const iconStyles = "w-6 h-6 text-gray-500 dark:text-gray-200";
  return (
    <div className="navbar bg-gray-50 dark:bg-gray-700 mt-8 mb-4 rounded-lg shadow-md shadow-gray-300 dark:shadow-gray-900 transition">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          <ClockIcon className={iconStyles} />
        </Link>
        <Link href="/about" className="btn btn-ghost normal-case text-xl">
          <AboutIcon className={iconStyles} />
        </Link>
        <Link
          href={signedIn ? "/account" : "/settings"}
          className="btn btn-ghost normal-case text-xl"
        >
          <SettingsIcon className={iconStyles} />
        </Link>
      </div>
      <div className="navbar-end">
        <details ref={dropdown} className="dropdown dropdown-end">
          <summary className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                width="40"
                height="40"
                alt="Tailwind CSS Navbar component"
                src={Cooper}
              />
            </div>
          </summary>
          <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            {signedIn && (
              <li>
                <button
                  className="justify-between"
                  onClick={() => onChangeDropdown("/account")}
                >
                  Clock Settings
                  <span className="badge">Profile</span>
                </button>
              </li>
            )}
            <li>
              {signedIn ? (
                <form action="/auth/signout" method="post">
                  <button className="" type="submit">
                    Sign out
                  </button>
                </form>
              ) : (
                <button onClick={() => onChangeDropdown("/login")} className="">
                  Login
                </button>
              )}
            </li>
          </ul>
        </details>
        <ThemeSetter />
      </div>
    </div>
  );
}
