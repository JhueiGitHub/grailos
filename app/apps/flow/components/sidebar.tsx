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
  );
};

export default Sidebar;
