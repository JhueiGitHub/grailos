"use client";

import React from "react";
import Sidebar from "@flow/components/sidebar";
import StreamsView from "@flow/components/streams-view";
import { StreamView } from "@flow/components/stream-view";
import { useFlowStore } from "@/lib/store";
import FlowEditor from "./flow-editor";

const FlowDashboard: React.FC = () => {
  const { selectedStreamId, currentFlow } = useFlowStore();

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        {selectedStreamId ? (
          currentFlow ? (
            <FlowEditor />
          ) : (
            <StreamView />
          )
        ) : (
          <StreamsView />
        )}
      </main>
    </div>
  );
};

export default FlowDashboard;
