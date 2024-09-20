import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { flowId: string } }
) {
  try {
    const profile = await currentProfile();
    const { name, isActive } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const flow = await db.flow.update({
      where: {
        id: params.flowId,
      },
      data: {
        name,
        isActive,
      },
    });

    return NextResponse.json(flow);
  } catch (error) {
    console.log("[FLOW_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { flowId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const flow = await db.flow.delete({
      where: {
        id: params.flowId,
      },
    });

    return NextResponse.json(flow);
  } catch (error) {
    console.log("[FLOW_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
