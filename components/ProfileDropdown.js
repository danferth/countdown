"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import getProfile from "./getProfile";
import getAvatar from "./getAvatar";
import Image from "next/image";
import Kanye from "../images/kanye.webp";
const ProfileDrowdown = ({ session }) => {
  const user = session?.user;

  const [avatarUrl, setAvatarUrl] = useState(Kanye);
  const dropdown = useRef();
  const router = useRouter();
  function onChangeDropdown(link) {
    dropdown.current.removeAttribute("open");
    router.push(link);
  }

  useEffect(() => {
    async function setAvatar(user) {
      try {
        const profile = await getProfile(user);
        if (profile.avatar_url) {
          const avatar = await getAvatar(profile.avatar_url);
          setAvatarUrl(avatar);
        } else {
          return;
        }
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    setAvatar(user);
  }, [user]);

  return (
    <details ref={dropdown} className="dropdown dropdown-end mr-8">
      <summary className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <Image
            width="40"
            height="40"
            alt="Login/out button"
            src={avatarUrl}
          />
        </div>
      </summary>
      <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        {user && (
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
          {user ? (
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
  );
};

export default ProfileDrowdown;
