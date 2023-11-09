import { Suspense } from "react";
import Loading from "./loading";
import Cooper from "../components/Cooper";
import Card from "../components/Card";
export default function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="flex flex-col items-center justify-evenly md:justify-center lg:flex-row lg:px-20 min-w-full h-full">
          <Cooper />
          <Card />
        </div>
      </Suspense>
    </>
  );
}
