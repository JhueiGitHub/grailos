import React from "react";
import { SearchBar } from "@flow/components/search-bar";
import { ProfilesDropdown } from "@flow/components/profiles-dropdown";
import { StreamsButton } from "@flow/components/streams-button";
import { StellarButton } from "@flow/components/stellar-button";
import { StreamsTree } from "@flow/components/streams-tree";
import { Separator } from "@flow/components/ui/separator";
import { ScrollArea } from "@flow/components/ui/scoll-area";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-full bg-background border-r">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          <SearchBar />
          <Separator />
          <ProfilesDropdown />
          <StreamsButton />
          <StellarButton />
          <Separator />
          <StreamsTree />
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
