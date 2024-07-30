"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import Image from "next/image";
import Kanye from "../images/kanye.webp";
const ProfileDrowdown = () => {
  const dropdown = useRef();
  const router = useRouter();
  const avatarUrl = Kanye;
  function onChangeDropdown(link) {
    dropdown.current.removeAttribute("open");
    router.push(link);
  }

  return (
    <details ref={dropdown} className="dropdown dropdown-end mr-8">
      <summary className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full ring ring-accent hover:ring-0 transition">
          <Image
            width="40"
            height="40"
            alt="Login/out button"
            src={avatarUrl}
          />
        </div>
      </summary>
      <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <button onClick={() => onChangeDropdown("/login")} className="">
            Login
          </button>
        </li>
      </ul>
    </details>
  );
};

export default ProfileDrowdown;
