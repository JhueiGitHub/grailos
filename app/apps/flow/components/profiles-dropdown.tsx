"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@flow/components/ui/avatar";
import { Button } from "@flow/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/apps/flow/components/ui/dropdown-menu";
import { useFlowStore } from "@/lib/store";

export function ProfilesDropdown() {
  const { currentProfile } = useFlowStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage
              src={currentProfile?.imageUrl}
              alt={currentProfile?.name}
            />
            <AvatarFallback>{currentProfile?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {currentProfile?.name}
          <ChevronDown className="ml-auto h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {currentProfile?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {currentProfile?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
