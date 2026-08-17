"use client";
import { allDataGRBContext, grbDataType } from "@/types/GRB";
import { allDataGWOSCContext, allDataGWOSCType } from "@/types/GWOSC";
import { allDataIceCubeContext, iceCubeDataType } from "@/types/IceCube";
import { createContext, useState, useEffect, useContext } from "react";

type lightThreadContext = allDataGRBContext & allDataGWOSCContext & allDataIceCubeContext;

const AppStateContext = createContext<lightThreadContext>({
  allDataGRB: [],
  allDataGWOSC: [],
  allDataIceCube: [],
})

export function LightThreadProvider({children} : {children: React.ReactNode}) {
  const [allDataGRB, setAllDataGRB] = useState<grbDataType[]>([]);
  const [allDataGWOSC, setAllDataGWOSC] = useState<allDataGWOSCType[]>([]);
  const [allDataIceCube, setAllDataIceCube] = useState<iceCubeDataType[]>([]);

  useEffect(() => {

    async function getAllDataGRB() {
      const allDataGRBResponse = await fetch("/api/GRB/AllData/GET");

      if (!allDataGRBResponse.ok) {
        const allDataGRBText = await allDataGRBResponse.text();
        throw new Error(`GWSOC request failed (${allDataGRBResponse.status}) : ${allDataGRBText.slice(0, 200)}`);
      }

      const allDataGRBParseData = await allDataGRBResponse.json();
      setAllDataGRB(allDataGRBParseData);
    }
    if (allDataGRB.length === 0) {
      getAllDataGRB();
    }

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
    <AppStateContext.Provider value={{allDataGRB, allDataGWOSC, allDataIceCube}}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useLightThreadState() {
  return useContext(AppStateContext);
}