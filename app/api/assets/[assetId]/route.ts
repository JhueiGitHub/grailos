import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { assetId: string } }
) {
  try {
    const profile = await currentProfile();
    const { category, url } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const asset = await db.asset.update({
      where: { id: params.assetId },
      data: { category, url },
    });

    return NextResponse.json(asset);
  } catch (error) {
    console.log("[ASSET_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { assetId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const asset = await db.asset.delete({
      where: { id: params.assetId },
    });

    return NextResponse.json(asset);
  } catch (error) {
    console.log("[ASSET_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Role in the diagram: These endpoints are used for updating and deleting specific assets within a flow.
// They're part of the "Customize Variant" action, allowing for modification of existing assets.
