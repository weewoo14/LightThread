"use client";
import { allDataGWOSCContext, allDataGWOSCType } from "@/types/GWSOC";
import { createContext, useState, useEffect, useContext } from "react";

const AppStateContext = createContext<allDataGWOSCContext>({
  allDataGWOSC: [],
})

export function LightThreadProvider({children} : {children: React.ReactNode}) {
  const [allDataGWOSC, setAllDataGWOSC] = useState<allDataGWOSCType[]>([]);

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


  }, [])

  return (
    <AppStateContext.Provider value={{allDataGWOSC}}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useLightThreadState() {
  return useContext(AppStateContext);
}