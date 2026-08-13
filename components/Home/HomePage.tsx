"use client";
import { useLightThreadState } from "../LightThreadContext";

export default function HomePage() {
  const {allDataGWOSC} = useLightThreadState();

  console.log(allDataGWOSC);
  return (
    <div className="flex flex-col">
      Hello!
    </div>
  );
}