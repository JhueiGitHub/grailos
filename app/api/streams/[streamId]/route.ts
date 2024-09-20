import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { streamId: string } }
) {
  try {
    const profile = await currentProfile();
    const { name } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const stream = await db.stream.update({
      where: {
        id: params.streamId,
        profileId: profile.id,
      },
      data: { name },
    });

    return NextResponse.json(stream);
  } catch (error) {
    console.log("[STREAM_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { streamId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const stream = await db.stream.delete({
      where: {
        id: params.streamId,
        profileId: profile.id,
      },
    });

    return NextResponse.json(stream);
  } catch (error) {
    console.log("[STREAM_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Role in the diagram: These endpoints are used for updating and deleting specific streams.
// They would be part of the stream management functionality, though not explicitly shown in the high-level diagram.
