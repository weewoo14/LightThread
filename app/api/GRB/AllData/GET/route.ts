import { NextRequest, NextResponse } from "next/server";

import { mongoConnect } from "@/database/monogdb";
import Models from "@/database/models";

export async function GET(request: NextRequest) {
  await mongoConnect();

  const allDataGRB = await Models.GRBDATAMODEL.find({}, {_id: 0});
  if (!allDataGRB || allDataGRB.length === 0) {
    return NextResponse.json({
      message: "MongoDB GRB did not return anything"
    }, {
      status: 404
    })
  }

  return NextResponse.json(allDataGRB);
}