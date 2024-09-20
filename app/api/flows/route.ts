import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const streamId = searchParams.get("streamId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!streamId) {
      return new NextResponse("Stream ID is required", { status: 400 });
    }

    const flows = await db.flow.findMany({
      where: { streamId },
      include: {
        colors: true,
        fonts: true,
        assets: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(flows);
  } catch (error) {
    console.log("[FLOWS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { name, streamId } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!streamId) {
      return new NextResponse("Stream ID is required", { status: 400 });
    }

    const flow = await db.flow.create({
      data: {
        name,
        streamId,
      },
    });

    return NextResponse.json(flow);
  } catch (error) {
    console.log("[FLOWS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Role in the diagram: These endpoints correspond to "Fetch flows for stream" and "Create New Flow in Stream" actions.
// They're used when displaying flows within a stream and when creating a new flow.
