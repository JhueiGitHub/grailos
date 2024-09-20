import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const streams = await db.stream.findMany({
      where: { profileId: profile.id },
      include: {
        flows: {
          include: { colors: true, fonts: true, assets: true },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(streams);
  } catch (error) {
    console.log("[STREAMS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { name } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const stream = await db.stream.create({
      data: {
        profileId: profile.id,
        name,
      },
    });

    return NextResponse.json(stream);
  } catch (error) {
    console.log("[STREAMS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Role in the diagram: These endpoints are used when fetching all streams for display in the UI,
// and when creating a new stream. They correspond to the "Fetch streams" and "Create New Stream" actions in the diagram.
