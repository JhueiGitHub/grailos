"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useFlowStore } from "@/lib/store";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

const EditorNavBar: React.FC = () => {
  const router = useRouter();
  const {
    toggleLeftSidebar,
    toggleRightSidebar,
    updateFlow,
    currentFlow,
    openWindow,
  } = useFlowStore();
  const [isHovered, setIsHovered] = useState(false);

  // Hover reveal functionality
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Home button redirect
  const handleHomeClick = () => {
    router.push("/flow"); // Redirects to the dashboard
  };

  // Function to open a new tab
  const handleOpenTab = (appName: string) => {
    openWindow(appName, appName); // Opens a new window/tab for the app
  };

  // Save flow function
  const handleSaveFlow = () => {
    if (currentFlow) {
      updateFlow(currentFlow.id, currentFlow);
    }
  };

  return (
    <HoverCard open={isHovered}>
      <HoverCardTrigger asChild>
        {/* Hover reveal functionality */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-2 bg-transparent z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={{ height: isHovered ? "auto" : "8px" }}
        />
      </HoverCardTrigger>
      <HoverCardContent className="w-full p-0">
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <div className="flex space-x-4">
            {/* Home button with dynamic redirection */}
            <Button variant="ghost" onClick={handleHomeClick}>
              Home
            </Button>
            {/* Tabs */}
            <Button variant="ghost" onClick={() => handleOpenTab("Colors")}>
              Colors
            </Button>
            <Button variant="ghost" onClick={() => handleOpenTab("Typography")}>
              Typography
            </Button>
            <Button variant="ghost" onClick={() => handleOpenTab("Assets")}>
              Assets
            </Button>
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={toggleLeftSidebar}>
              Toggle Left Sidebar
            </Button>
            <Button variant="outline" onClick={toggleRightSidebar}>
              Toggle Right Sidebar
            </Button>
            <Button variant="default" onClick={handleSaveFlow}>
              Save
            </Button>
          </div>
        </nav>
      </HoverCardContent>
    </HoverCard>
  );
};

export default EditorNavBar;
