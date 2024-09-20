import React from "react";
import { NavButtons } from "@flow/components/nav-buttons";
import { ProfilesDropdown } from "@flow/components/profiles-dropdown";
import { NewStreamButton } from "@flow/components/new-stream-button";
import { FilterBar } from "@flow/components/filter-bar";
import StreamGrid from "@flow/components/streams-grid";

const StreamsView: React.FC = () => {
  return (
    <div className="flex-1 overflow-hidden">
      <NavButtons />
      <ProfilesDropdown />
      <NewStreamButton />
      <FilterBar />
      <StreamGrid />
    </div>
  );
};

export default StreamsView;
