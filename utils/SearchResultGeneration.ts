import { grbDataType } from "@/types/GRB";
import { allDataGWOSCType } from "@/types/GWOSC";
import { iceCubeDataType } from "@/types/IceCube";

type allDataType = grbDataType[] | allDataGWOSCType[] | iceCubeDataType[];

export function getSearchResults(searchResult: string, allData: allDataType, limit: number) {
  const searchResults: string[] = [];

  for (const data of allData) {
    if (data.name.toLowerCase().includes(searchResult) && searchResults.length < limit) {
      searchResults.push(data.name);
    }
  }

  return searchResults;
}