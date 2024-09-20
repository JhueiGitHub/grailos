"use client";

import React from "react";
import { SearchBar } from "@flow/components/search-bar";
import { ProfilesDropdown } from "@flow/components/profiles-dropdown";
import { StreamsButton } from "@flow/components/streams-button";
import { StellarButton } from "@flow/components/stellar-button";
import { StreamsTree } from "@flow/components/streams-tree";
import { NavButtons } from "@flow/components/nav-buttons";
import { NewStreamButton } from "@flow/components/new-stream-button";
import { FilterBar } from "@flow/components/filter-bar";
import { Separator } from "@flow/components/ui/separator";
import { ScrollArea } from "@flow/components/ui/scoll-area";
import { useFlowStore } from "@/lib/store";

const FlowDashboard: React.FC = () => {
  const { currentStream, streams } = useFlowStore();

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="w-64 h-full border-r p-4 flex flex-col">
        <SearchBar placeholder="Search" className="mb-4" />
        <Separator className="my-4" />
        <ProfilesDropdown />
        <StreamsButton />
        <StellarButton />
        <Separator className="my-4" />
        <ScrollArea className="flex-grow">
          <StreamsTree />
        </ScrollArea>
      </div>
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <NavButtons />
          <div className="flex items-center space-x-4">
            <ProfilesDropdown />
            <NewStreamButton />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-4">
          {currentStream ? currentStream.name : "All Streams"}
        </h1>
        <FilterBar />
        <div className="grid grid-cols-3 gap-4 mt-4">
          {streams.map((stream) => (
            <div key={stream.id} className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold">{stream.name}</h2>
              <p className="text-sm text-muted-foreground">
                {stream.flows.length} flow{stream.flows.length !== 1 ? "s" : ""}
              </p>
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date(stream.updatedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlowDashboard;
