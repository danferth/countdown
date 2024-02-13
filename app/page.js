import { Suspense } from "react";
import Loading from "./loading";
import Kanye from "../components/Kanye";
import Clock from "../components/Clock";
export default function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <div
          className="w-full flex flex-col space-y-8
        sm:items-center sm:justify-center  
        md:space-y-0
        xl:flex-row xl:space-y-0 xl:space-x-8"
        >
          <Kanye />
          <Clock />
        </div>
      </Suspense>
    </>
  );
}
