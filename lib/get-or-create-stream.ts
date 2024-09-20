import { db } from "@/lib/db";

export const getOrCreateStream = async (profileId: string) => {
  let stream = await db.stream.findFirst({
    where: { profileId },
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
    stream = await db.stream.create({
      data: {
        name: "Default Stream",
        profileId,
        flows: {
          create: {
            name: "Zenith",
            isActive: true,
            colors: {
              createMany: {
                data: [
                  { category: "BACKGROUND", key: "base", value: "transparent" },
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
  }

  return stream;
};
