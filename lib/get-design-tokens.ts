import { Flow, Color, Font, Asset } from "@prisma/client";

type DesignTokens = {
  colors: {
    background: { base: string; overlay: string };
    border: { default: string };
    text: { primary: string; secondary: string };
  };
  fonts: {
    primary: { family: string; url: string };
    secondary: { family: string; url: string };
  };
  assets: {
    wallpaper: { default: string; custom: string | null };
    dockIcons: { default: string; custom: string[] };
  };
};

export const getDesignTokens = (
  flow: Flow & { colors: Color[]; fonts: Font[]; assets: Asset[] }
): DesignTokens => {
  return {
    colors: {
      background: {
        base:
          flow.colors.find(
            (c) => c.category === "BACKGROUND" && c.key === "base"
          )?.value || "transparent",
        overlay:
          flow.colors.find(
            (c) => c.category === "BACKGROUND" && c.key === "overlay"
          )?.value || "rgba(128, 128, 128, 0.5)",
      },
      border: {
        default:
          flow.colors.find(
            (c) => c.category === "BORDER" && c.key === "default"
          )?.value || "#808080",
      },
      text: {
        primary:
          flow.colors.find((c) => c.category === "TEXT" && c.key === "primary")
            ?.value || "#FFFFFF",
        secondary:
          flow.colors.find(
            (c) => c.category === "TEXT" && c.key === "secondary"
          )?.value || "#CCCCCC",
      },
    },
    fonts: {
      primary: {
        family:
          flow.fonts.find((f) => f.category === "PRIMARY")?.family || "Inter",
        url:
          flow.fonts.find((f) => f.category === "PRIMARY")?.url ||
          "https://fonts.googleapis.com/css2?family=Inter&display=swap",
      },
      secondary: {
        family:
          flow.fonts.find((f) => f.category === "SECONDARY")?.family ||
          "Roboto Mono",
        url:
          flow.fonts.find((f) => f.category === "SECONDARY")?.url ||
          "https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap",
      },
    },
    assets: {
      wallpaper: {
        default: "#000000",
        custom:
          flow.assets.find((a) => a.category === "WALLPAPER")?.url || null,
      },
      dockIcons: {
        default: "rgba(128, 128, 128, 0.5)",
        custom: flow.assets
          .filter((a) => a.category === "DOCK_ICON")
          .map((a) => a.url!)
          .filter(Boolean),
      },
    },
  };
};
