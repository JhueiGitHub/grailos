import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";

export async function GET() {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Return the profile data, excluding sensitive information
    const { id, name, imageUrl, email } = profile;
    return NextResponse.json({ id, name, imageUrl, email });
  } catch (error) {
    console.log("[PROFILE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Role in the diagram: This endpoint is used when the UI needs to fetch the current user's profile data.
// It's typically called when the Flow app is first loaded or when profile information needs to be displayed or updated.
