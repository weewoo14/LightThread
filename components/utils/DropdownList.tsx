import { useState } from "react";

import { grbDataType } from "@/types/GRB";
import { allDataGWOSCType } from "@/types/GWOSC";
import { iceCubeDataType } from "@/types/IceCube";
import { getSearchResults } from "@/utils/SearchResultGeneration";

type dropdownListAllDataType = grbDataType[] | allDataGWOSCType[] | iceCubeDataType[];

export default function DropdownList({eventType, allData, handleSelection} : {eventType: string, allData: dropdownListAllDataType, handleSelection: (data: string) => void}) {
  const [searchBarText, setSearchBarText] = useState<string>("");
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const dropdownSearchResults: string[] = getSearchResults(searchBarText, allData, 20);

  function searchBarChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchBarText(event.target.value);
  }

  return (
    <div className="flex flex-col ">

      <input
        className="h-[5vh] w-[20vw] border-2 border-white rounded-[4px] p-2"
        placeholder={`Enter an event from ${eventType}`}
        onChange={searchBarChange}
        onClick={() => {setIsDropdownVisible(!isDropdownVisible)}}
      />

      {isDropdownVisible && (
        <ul className="w-[20vw]">
          {dropdownSearchResults.map((dataName, idx) => {
            return (
              <li
                key={idx}
                className="h-[32px] border-1 border-white hover:bg-[gray] cursor-pointer"
                onClick={() => {handleSelection(dataName)}}
              >
                <p> {dataName} </p>
              </li>
            );
          })}
        </ul>
      )}

    </div>
  );
}