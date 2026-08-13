export type allDataGWOSCContext = {
  allDataGWOSC: allDataGWOSCType[],
}

export type allDataGWOSCType = {
  name: string,
  shortName: string,
  gps: number,
  detectors: string[],
  catalog: string,
  doi: string,
}