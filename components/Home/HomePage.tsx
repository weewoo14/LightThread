"use client";
import { useLightThreadState } from "../LightThreadContext";
import DropdownList from "../utils/DropdownList";

export default function HomePage() {
  const {allDataGRB, allDataGWOSC, allDataIceCube} = useLightThreadState();

  return (
    <div className="flex flex-col">
      LightThread
      <DropdownList eventType="GRB" allData={allDataGRB}/>
      <DropdownList eventType="GWOSC" allData={allDataGWOSC}/>
      <DropdownList eventType="IceCube" allData={allDataIceCube}/>
    </div>
  );
}