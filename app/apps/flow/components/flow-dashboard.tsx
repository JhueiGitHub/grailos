import React from "react";
import Sidebar from "@flow/components/sidebar";
import StreamsView from "@flow/components/streams-view";

const FlowDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <StreamsView />
    </div>
  );
};

export default FlowDashboard;
