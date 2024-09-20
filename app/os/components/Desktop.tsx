"use client";

import React, { useState, useEffect } from "react";
import DockManager from "./DockManager";
import AppWindow from "./AppWindow";
import HiddenNavbar from "./HiddenNavbar";
import { Stream, Flow, Color, Font, Asset } from "@prisma/client";
import { getDesignTokens } from "@/lib/get-design-tokens";

interface OpenWindow {
  id: string;
  title: string;
  appName: string;
  initialPosition: { x: number; y: number };
}

interface WindowProps {
  id: string;
  title: string;
  appName: string;
  onClose: () => void;
}

interface DesktopProps {
  stream: Stream & {
    flows: (Flow & {
      colors: Color[];
      fonts: Font[];
      assets: Asset[];
    })[];
  };
}

const Desktop: React.FC<DesktopProps> = ({ stream }) => {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [activeFlow, setActiveFlow] = useState(stream.flows[0]);

  const toggleApp = (appName: string, x: number, y: number) => {
    setOpenWindows((prev) => {
      const isOpen = prev.some((window) => window.appName === appName);
      if (isOpen) {
        return prev.filter((window) => window.appName !== appName);
      } else {
        const newWindow: OpenWindow = {
          id: `window-${Date.now()}`,
          title: appName,
          appName: appName,
          initialPosition: { x, y },
        };
        return [...prev, newWindow];
      }
    });
  };

  const handleCloseWindow = (id: string) => {
    console.log(`Closing window ${id}`);
    setOpenWindows((prev) => prev.filter((window) => window.id !== id));
  };

  const applyDesignTokens = (
    flow: Flow & { colors: Color[]; fonts: Font[]; assets: Asset[] }
  ) => {
    const tokens = getDesignTokens(flow);
    document.documentElement.style.setProperty(
      "--background-color",
      tokens.colors.background.base
    );
    document.documentElement.style.setProperty(
      "--text-color",
      tokens.colors.text.primary
    );
    // Apply other tokens as needed
  };

  useEffect(() => {
    applyDesignTokens(activeFlow);
  }, [activeFlow]);

  const wallpaperAsset = activeFlow.assets.find(
    (a) => a.category === "WALLPAPER"
  );

  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      style={{ backgroundColor: "black" }} // Set default background to black
    >
      {wallpaperAsset &&
        wallpaperAsset.url &&
        (wallpaperAsset.url.endsWith(".mp4") ? (
          <video
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={wallpaperAsset.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={wallpaperAsset.url}
            alt="Wallpaper"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ))}
      <HiddenNavbar />
      {openWindows.map((window) => (
        <AppWindow
          key={window.id}
          id={window.id}
          title={window.title}
          appName={window.appName}
          onClose={() => handleCloseWindow(window.id)}
          initialPosition={window.initialPosition}
        />
      ))}
      <DockManager toggleApp={toggleApp} activeFlow={activeFlow} />
    </div>
  );
};

export default Desktop;
