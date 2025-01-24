"use client";
import Image from "next/image";
import Celebration from "../images/celebrate.gif";

const Complete = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="rounded-md overflow-hidden shadow-lg">
        <Image
          src={Celebration}
          width={220}
          height={220}
          alt="celebration frog"
          unoptimized={true}
        />
      </div>
    </div>
  );
};

export default Complete;
