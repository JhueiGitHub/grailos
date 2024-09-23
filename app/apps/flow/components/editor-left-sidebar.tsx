"use client";

import React from "react";
import { EditorFileTree } from "./editor-file-tree";
import { useFlowStore } from "@/lib/store";

export function EditorLeftSidebar() {
  const { currentFlow } = useFlowStore();

  return (
    <div className="w-64 bg-gray-900 h-full overflow-y-auto">
      <h2 className="text-white p-4 text-xl font-bold">
        {currentFlow ? currentFlow.name : "No Flow Selected"}
      </h2>
      <EditorFileTree />
    </div>
  );
}
