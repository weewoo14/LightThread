export type allDataIceCubeContext = {
  allDataIceCube: iceCubeDataType[],
}

export type iceCubeDataType = {
  NAME: string,
  RUNID: number,
  EVENTID: number,
  START: string,
  EVENTMJD: number,
  I3TYPE: string,
  RA: number,
  DEC: number,
  RA_ERR_PLUS: number,
  RA_ERR_MINUS: number,
  DEC_ERR_PLUS: number,
  DEC_ERR_MINUS: number,
  FAR: number,
  SIGNAL: number,
}