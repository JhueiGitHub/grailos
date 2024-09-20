"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function NavButtons() {
  const handleBackClick = () => {
    // TODO: Implement back navigation
    console.log("Back button clicked");
  };

  const handleForwardClick = () => {
    // TODO: Implement forward navigation
    console.log("Forward button clicked");
  };

  return (
    <div className="flex space-x-2">
      <Button variant="ghost" size="icon" onClick={handleBackClick}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={handleForwardClick}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
