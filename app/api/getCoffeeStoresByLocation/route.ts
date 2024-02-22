import { fetchCoffeeStores } from "@/lib/coffee-stores";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const longLat = searchParams.get("longLat") || "";
    const limit = searchParams.get("limit") || "";
    if (longLat) {
      const response = await fetchCoffeeStores(longLat, parseInt(limit));
      return NextResponse.json(response);
    }
  } catch (err) {
    console.error("Error: ", err);
    return NextResponse.json(`Something went wrong. ${err}`, { status: 500 });
  }

  // return Response.json({ data: "Hi There" });
}
