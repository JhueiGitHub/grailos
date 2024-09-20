import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export const currentProfile = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: { userId },
    include: {
      streams: {
        include: {
          flows: {
            include: {
              colors: true,
              fonts: true,
              assets: true,
            },
          },
        },
      },
    },
  });

  return profile;
};
