import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const gwoscResponse = await fetch("https://gwosc.org/api/v2/catalogs/GWTC-1-confident/events");
  if (!gwoscResponse.ok) {
    return NextResponse.json({
      message: `GWOSC API ran into the issue: ${gwoscResponse.status}`,
    }, {
      status: gwoscResponse.status,
    })
  }

  const gwoscData = await gwoscResponse.json();
  return NextResponse.json(gwoscData);
}