import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { flowId, category, url } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!flowId || !category || !url) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const asset = await db.asset.create({
      data: {
        flowId,
        category,
        url,
      },
    });

    return NextResponse.json(asset);
  } catch (error) {
    console.log("[ASSETS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
