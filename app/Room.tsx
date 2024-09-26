"use client";

import React, { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@/liveblocks.config"; // Update this import path
import { useFlowStore } from "../lib/store";

export function Room({ children }: { children: ReactNode }) {
  const { currentFlow } = useFlowStore();

  if (!currentFlow) {
    return <div>No flow selected</div>;
  }

  const wallpaperAsset = currentFlow.assets.find(
    (asset) => asset.category === "WALLPAPER"
  );

  return (
    <LiveblocksProvider publicApiKey="pk_dev_IoCq-lmSGecFpFCyOC9aEqaFLnmfPaIljKG-WX4jxI2lTAvb1TC2JUWuNmnDBf6g">
      <RoomProvider
        id={currentFlow.id}
        initialPresence={{
          isEditing: false,
          cursorPosition: null,
        }}
        initialStorage={{
          wallpaper: wallpaperAsset?.url || "", // Use the current wallpaper URL if available, otherwise an empty string
        }}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
