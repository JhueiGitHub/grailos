"use client";

import * as React from "react";
import { Grid, List } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/apps/flow/components/ui/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/app/apps/flow/components/ui/toggle-group";
import { useFlowStore } from "@/lib/store";

export function FilterBar() {
  const { sortStreams, setViewMode, viewMode } = useFlowStore();

  const handleSortChange = (value: string) => {
    sortStreams(value as "name" | "updatedAt");
  };

  return (
    <div className="flex justify-between items-center">
      <Select onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="updatedAt">Last modified</SelectItem>
        </SelectContent>
      </Select>
      <ToggleGroup type="single" value={viewMode} onValueChange={setViewMode}>
        <ToggleGroupItem value="grid" aria-label="Grid view">
          <Grid className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="list" aria-label="List view">
          <List className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
