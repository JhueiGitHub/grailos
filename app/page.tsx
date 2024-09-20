import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { getOrCreateStream } from "@/lib/get-or-create-stream";
import Desktop from "./os/components/Desktop";

const HomePage = async () => {
  const profile = await initialProfile();

  const stream = await db.stream.findFirst({
    where: {
      profileId: profile.id,
    },
    include: {
      flows: {
        include: {
          colors: true,
          fonts: true,
          assets: true,
        },
      },
    },
  });

  if (!stream) {
    // Handle the case when no stream is found
    return <div>No stream found</div>;
  }

  return <Desktop stream={stream} />;
};

export default HomePage;
