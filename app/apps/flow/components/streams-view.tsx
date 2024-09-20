import React from "react";
import TopBar from "@flow/components/top-bar";
import FilterBar from "@flow/components/filter-bar";
import StreamGrid from "@flow/components/streams-grid";

const StreamsView: React.FC = () => {
  return (
    <div className="flex-1 overflow-hidden">
      <TopBar />
      <FilterBar />
      <StreamGrid />
    </div>
  );
};

export default StreamsView;
