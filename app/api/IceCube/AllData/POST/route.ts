import { NextRequest, NextResponse } from "next/server";

import { iceCubeDataType } from "@/types/IceCube";
import { mongoConnect } from "@/database/monogdb";
import Models from "@/database/models";

export async function POST(request: NextRequest) {
  const iceCubeDataResponse = await request.json();
  if (!iceCubeDataResponse) {
    return NextResponse.json({
      message: "IceCube API received nothing to enter into the MongoDB."
    }, {
      status: 404
    })
  }

    await mongoConnect();
    const iceCubeData: iceCubeDataType = {
      NAME: iceCubeDataResponse.NAME,
      RUNID: iceCubeDataResponse.RUNID,
      EVENTID: iceCubeDataResponse.EVENTID,
      START: iceCubeDataResponse.START,
      EVENTMJD: iceCubeDataResponse.EVENTMJD,
      I3TYPE: iceCubeDataResponse.I3TYPE,
      RA: iceCubeDataResponse.RA,
      DEC: iceCubeDataResponse.DEC,
      RA_ERR_PLUS: iceCubeDataResponse.RA_ERR_PLUS,
      RA_ERR_MINUS: iceCubeDataResponse.RA_ERR_MINUS,
      DEC_ERR_PLUS: iceCubeDataResponse.DEC_ERR_PLUS,
      DEC_ERR_MINUS: iceCubeDataResponse.DEC_ERR_MINUS,
      FAR: iceCubeDataResponse.FAR,
      SIGNAL: iceCubeDataResponse.SIGNAL,
    }

    await Models.ICECUBEDATAMODEL.create(iceCubeData);
    return NextResponse.json({success: true})


}