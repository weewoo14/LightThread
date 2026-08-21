import { useState } from "react";

import { grbDataType } from "@/types/GRB";
import { allDataGWOSCType } from "@/types/GWOSC";
import { iceCubeDataType } from "@/types/IceCube";

type dropdownListDataType = grbDataType[] | allDataGWOSCType[] | iceCubeDataType[];

export default function DropdownList({eventType, data} : {eventType: string, data: dropdownListDataType}) {

  return (
    <div className="flex flex-col justify-center items-center h-[5vh] w-[20vw] border-2 border-white">
      <input
        className="h-[5vh] w-[20vw] p-2"
        placeholder={`Enter an event from ${eventType}`}
        defaultValue={testValue}
      />

    </div>
  );
}