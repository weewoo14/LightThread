"use client";
import { allDataGWOSCContext, allDataGWOSCType } from "@/types/GWOSC";
import { allDataIceCubeContext, iceCubeDataType } from "@/types/IceCube";
import { createContext, useState, useEffect, useContext } from "react";

type lightThreadContext = allDataGWOSCContext & allDataIceCubeContext;

const AppStateContext = createContext<lightThreadContext>({
  allDataGWOSC: [],
  allDataIceCube: [],
})

export function LightThreadProvider({children} : {children: React.ReactNode}) {
  const [allDataGWOSC, setAllDataGWOSC] = useState<allDataGWOSCType[]>([]);
  const [allDataIceCube, setAllDataIceCube] = useState<iceCubeDataType[]>([]);

  useEffect(() => {

    // Getting all of the GWOSC 
    async function getAllDataGWOSC() {

      const allDataGWOSCResponse = await fetch("/api/GWOSC/AllData/GET");

      if (!allDataGWOSCResponse.ok) {
        const allDataGWOSCResponseText = await allDataGWOSCResponse.text();
        throw new Error(`GWSOC request failed (${allDataGWOSCResponse.status}) : ${allDataGWOSCResponseText.slice(0, 200)}`);
      }

      const allDataGWOSCParseData = await allDataGWOSCResponse.json();
      const allDataGWOSCArray: allDataGWOSCType[] = [];
      for (const gwsocEvent of allDataGWOSCParseData.results) {
        allDataGWOSCArray.push(gwsocEvent);
      }

      setAllDataGWOSC(allDataGWOSCArray);

    }
    if (allDataGWOSC.length === 0) {
      getAllDataGWOSC();
    }

    async function getAllDataIceCube() {
      const allDataIceCubeResponse = await fetch("/api/IceCube/AllData/GET");

      if (!allDataIceCubeResponse.ok) {
        const allDataIceCubeText = await allDataIceCubeResponse.text();
        throw new Error(`GWSOC request failed (${allDataIceCubeResponse.status}) : ${allDataIceCubeText.slice(0, 200)}`);
      }

      const allDataIceCubeParseData = await allDataIceCubeResponse.json();
      setAllDataIceCube(allDataIceCubeParseData);
    }
    if (allDataIceCube.length === 0) {
      getAllDataIceCube();
    }


  }, [])

  return (
    <AppStateContext.Provider value={{allDataGWOSC, allDataIceCube}}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useLightThreadState() {
  return useContext(AppStateContext);
}