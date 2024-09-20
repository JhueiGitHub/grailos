import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: { userId: user.id },
    include: {
      streams: {
        include: {
          flows: { include: { colors: true, fonts: true, assets: true } },
        },
      },
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
      streams: {
        create: {
          name: "Default Stream",
          flows: {
            create: {
              name: "Zenith",
              isActive: true,
              colors: {
                createMany: {
                  data: [
                    {
                      category: "BACKGROUND",
                      key: "base",
                      value: "transparent",
                    },
                    {
                      category: "BACKGROUND",
                      key: "overlay",
                      value: "rgba(128, 128, 128, 0.5)",
                    },
                    { category: "BORDER", key: "default", value: "#808080" },
                    { category: "TEXT", key: "primary", value: "#FFFFFF" },
                    { category: "TEXT", key: "secondary", value: "#CCCCCC" },
                  ],
                },
              },
              fonts: {
                createMany: {
                  data: [
                    {
                      category: "PRIMARY",
                      family: "Inter",
                      url: "https://fonts.googleapis.com/css2?family=Inter&display=swap",
                    },
                    {
                      category: "SECONDARY",
                      family: "Roboto Mono",
                      url: "https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap",
                    },
                  ],
                },
              },
              assets: {
                createMany: {
                  data: [
                    { category: "WALLPAPER", url: null },
                    { category: "DOCK_ICON", url: null },
                  ],
                },
              },
            },
          },
        },
      },
    },
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

  return newProfile;
};
