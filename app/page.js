import { Suspense } from "react";
import Loading from "./loading";
import Kanye from "../components/Kanye";
import Clock from "../components/Clock";
export default function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="my-auto w-full flex flex-col items-center justify-evenly md:justify-center lg:flex-row lg:px-20 h-min">
          {/* <Kanye /> */}
          <Clock />
        </div>
      </Suspense>
    </>
  );
}
