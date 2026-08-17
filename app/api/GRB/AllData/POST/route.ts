import { NextRequest, NextResponse } from "next/server";
import { mongoConnect } from "@/database/monogdb";
import { grbDataType } from "@/types/GRB";
import Models from "@/database/models";

export async function POST(request: NextRequest) {
  const grbDataResponse = await request.json();
  if (!grbDataResponse) {
    return NextResponse.json({
      message: "GRB API received nothing to enter into the MongoDB."
    }, {
      status: 404
    })
  }

  await mongoConnect();
  const grbData: grbDataType = {
    GRB: grbDataResponse.GRB,
    Time: grbDataResponse.Time,
    Trigger_Number: grbDataResponse.Trigger_Number,
    BAT_RA: grbDataResponse.BAT_RA,
    BAT_Dec: grbDataResponse.BAT_Dec,
    BAT_Error_Radius: grbDataResponse.BAT_Error_Radius,
    BAT_T90: grbDataResponse.BAT_T90,
    BAT_Fluence: grbDataResponse.BAT_Fluence,
    XRT_RA: grbDataResponse.XRT_RA,
    XRT_Dec: grbDataResponse.XRT_Dec,
    XRT_Error_Radius: grbDataResponse.XRT_Error_Radius,
    XRT_First_Observation: grbDataResponse.XRT_First_Observation,
  }

  await Models.GRBDATAMODEL.create(grbData);

  return NextResponse.json({success: true});
}