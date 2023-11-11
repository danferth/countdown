import { Suspense } from "react";
import Loading from "./loading";
import Kanye from "../components/Kanye";
import Clock from "../components/Clock";
export default function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="flex flex-col items-center justify-evenly md:justify-center lg:flex-row lg:px-20 min-w-full h-full">
          <Kanye />
          <Clock />
        </div>
      </Suspense>
    </>
  );
}
