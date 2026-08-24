"use client";

import { useState } from "react";

import { useLightThreadState } from "../LightThreadContext";
import DropdownList from "../utils/DropdownList";

export default function HomePage() {
  const [grbSelection, setGRBSelection] = useState<string>("");
  const [gwoscSelection, setGWOSCSelection] = useState<string>("");
  const [iceCubeSelection, setIceCubeSelection] = useState<string>("");
  const {allDataGRB, allDataGWOSC, allDataIceCube} = useLightThreadState();

  const handleGRBSelection: (dataName: string) => void = (dataName) => {
    setGRBSelection(dataName);
  }

  const handleGWOSCSelection: (dataName: string) => void = (dataName) => {
    setGWOSCSelection(dataName);
  }

  const handleIceCubeSelection: (dataName: string) => void = (dataName) => {
    setIceCubeSelection(dataName);
  }

  return (
    <div className="flex flex-row">
      LightThread
      <DropdownList eventType="GRB" allData={allDataGRB} handleSelection={handleGRBSelection}/>
      <DropdownList eventType="GWOSC" allData={allDataGWOSC} handleSelection={handleGWOSCSelection}/>
      <DropdownList eventType="IceCube" allData={allDataIceCube} handleSelection={handleIceCubeSelection}/>

      <p>{grbSelection}</p>
      <p>{gwoscSelection}</p>
      <p>{iceCubeSelection}</p>
    </div>
  );
}