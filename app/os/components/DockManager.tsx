"use client";

import React, { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { appDefinitions, AppDefinition } from "@/types/AppTypes";
import DockIcon from "./DockIcon";
import { Flow, Color, Font, Asset } from "@prisma/client";
import { getDesignTokens } from "@/lib/get-design-tokens";

const DOCK_SIZE = 64;
const DOCK_PADDING = 8;
const MAGNIFICATION = 1.4;
const MAGNIFICATION_RANGE = 150;
const PROXIMITY_THRESHOLD = 150;

interface DockManagerProps {
  toggleApp: (appId: string, x: number, y: number) => void;
  activeFlow: Flow & {
    colors: Color[];
    fonts: Font[];
    assets: Asset[];
  };
}

const DockManager: React.FC<DockManagerProps> = ({ toggleApp, activeFlow }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 30 };
  const dockY = useSpring(100, springConfig);
  const dockScale = useSpring(0.5, springConfig);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const updateMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const shouldShow = window.innerHeight - e.clientY < PROXIMITY_THRESHOLD;
      dockY.set(shouldShow ? 0 : 100);
      dockScale.set(shouldShow ? 1 : 0.5);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("mousemove", updateMouse);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mousemove", updateMouse);
      window.removeEventListener("resize", handleResize);
    };
  }, [mouseX, mouseY, dockY, dockScale]);

  const tokens = getDesignTokens(activeFlow);
  const dockStyle = {
    backgroundColor: tokens.colors.background.overlay,
    borderColor: tokens.colors.border.default,
  };

  const handleAppClick = (appId: string, event: React.MouseEvent) => {
    console.log(`Clicked ${appId}`);
    toggleApp(appId, event.clientX, event.clientY);
  };

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 flex justify-center"
      style={{ y: dockY, scale: dockScale, transformOrigin: "bottom" }}
    >
      <div
        className="flex items-end rounded-t-[19px] px-2 py-2 backdrop-blur-md"
        style={dockStyle}
      >
        {appDefinitions.map((app, index) => {
          const iconCenter =
            windowWidth / 2 +
            (index - appDefinitions.length / 2 + 0.5) *
              (DOCK_SIZE + DOCK_PADDING);

          const customIconAsset = activeFlow.assets.find(
            (asset) => asset.category === "DOCK_ICON" && asset.id === app.id
          );

          const customIconUrl = customIconAsset?.url || undefined;

          return (
            <DockIcon
              key={app.id}
              app={app}
              onClick={(event) => handleAppClick(app.id, event)}
              mouseX={mouseX}
              iconCenter={iconCenter}
              magnification={MAGNIFICATION}
              magnificationRange={MAGNIFICATION_RANGE}
              customIconUrl={customIconUrl}
              defaultFillColor={tokens.colors.background.base}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default DockManager;
