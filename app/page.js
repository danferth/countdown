import { Suspense } from "react";
import Loading from "./loading";
import Kanye from "../components/Kanye";
import Clock from "../components/Clock";
export default function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="grow flex flex-col justify-center">
          <div className="flex flex-col items-center justify-evenly md:justify-center lg:flex-row lg:px-20 h-min">
            <Kanye />
            <Clock />
          </div>
        </div>
      </Suspense>
    </>
  );
}
