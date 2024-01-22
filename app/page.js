import { Suspense } from "react";
import Loading from "./loading";
import Kanye from "../components/Kanye";
import Clock from "../components/Clock";
export default function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="bg-base-200 w-full">
          <Kanye />
          <Clock />
        </div>
      </Suspense>
    </>
  );
}
