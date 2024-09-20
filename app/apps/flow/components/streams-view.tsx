import React from "react";
import { NavButtons } from "@flow/components/nav-buttons";
import { ProfilesDropdown } from "@flow/components/profiles-dropdown";
import { NewStreamButton } from "@flow/components/new-stream-button";
import { FilterBar } from "@flow/components/filter-bar";
import StreamGrid from "@flow/components/streams-grid";

const StreamsView: React.FC = () => {
  return (
    <div className="flex-1 overflow-hidden p-4">
      <div className="flex justify-between items-center mb-4">
        <NavButtons />
        <div className="flex items-center space-x-4">
          <ProfilesDropdown />
          <NewStreamButton />
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4">All Streams</h1>
      <FilterBar />
      <StreamGrid />
    </div>
  );
};

export default StreamsView;
