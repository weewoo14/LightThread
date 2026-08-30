"use client";

import { useState } from "react";

import { useLightThreadState } from "../LightThreadContext";
import DropdownList from "../utils/DropdownList";

let grbSelection: string = "";
let gwoscSelection: string = "";
let iceCubeSelection: string = "";

export default function HomePage() {
  const {allDataGRB, allDataGWOSC, allDataIceCube} = useLightThreadState();

  const handleGRBSelection: (dataName: string) => void = (dataName) => {
    grbSelection = dataName;
    console.log(grbSelection);
    console.log(gwoscSelection);
    console.log(iceCubeSelection);
  }

  const handleGWOSCSelection: (dataName: string) => void = (dataName) => {
    gwoscSelection = dataName;
    console.log(grbSelection);
    console.log(gwoscSelection);
    console.log(iceCubeSelection);
  }

  const handleIceCubeSelection: (dataName: string) => void = (dataName) => {
    iceCubeSelection = dataName;
    console.log(grbSelection);
    console.log(gwoscSelection);
    console.log(iceCubeSelection);
  }

  return (
    <div className="flex flex-row">
      <p>LIghtThread</p>
      <DropdownList eventType="GRB" allData={allDataGRB} handleSelection={handleGRBSelection}/>
      <DropdownList eventType="GWOSC" allData={allDataGWOSC} handleSelection={handleGWOSCSelection}/>
      <DropdownList eventType="IceCube" allData={allDataIceCube} handleSelection={handleIceCubeSelection}/>

      <p>{grbSelection}</p>
      <p>{gwoscSelection}</p>
      <p>{iceCubeSelection}</p>
    </div>
  );
}