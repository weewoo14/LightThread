export type allDataGRBContext = {
  allDataGRB: grbDataType[],
}

export type grbDataType = {
  name: string,
  Time: string,
  Trigger_Number: string | number,
  BAT_RA: number,
  BAT_Dec: number,
  BAT_Error_Radius: number,
  BAT_T90: number,
  BAT_Fluence: number,
  XRT_RA: string,
  XRT_Dec: string,
  XRT_Error_Radius: number,
  XRT_First_Observation: number
}