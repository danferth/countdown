import { Suspense } from "react";
import Loading from "./loading";
// import Cooper from "../components/Cooper";
import Card from "../components/Card";
export default function Home() {
  return (
    <>
      {/* <Cooper /> */}
      <Suspense fallback={<Loading />}>
        <Card />
      </Suspense>
    </>
  );
}
