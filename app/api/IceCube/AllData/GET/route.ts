import { NextRequest, NextResponse } from "next/server";

import { mongoConnect } from "@/database/monogdb";
import Models from "@/database/models";

export async function GET(request: NextRequest) {
  await mongoConnect();

  const allDataIceCube = await Models.ICECUBEDATAMODEL.find({}, {_id: 0});
  if (!allDataIceCube) {
    return NextResponse.json({
      message: "AllDataIceCube could not be fetched from MongoDB",
    }, {
      status: 404
    })
  }

  return NextResponse.json(allDataIceCube);
}