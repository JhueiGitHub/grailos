"use client";

import * as React from "react";
import { Layers } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useFlowStore } from "@/lib/store";

export function StreamsButton() {
  const { setCurrentStream } = useFlowStore();

  const handleClick = () => {
    setCurrentStream(null); // Reset to show all streams
  };

  return (
    <Button
      variant="ghost"
      className="w-full justify-start"
      onClick={handleClick}
    >
      <Layers className="mr-2 h-4 w-4" />
      All Streams
    </Button>
  );
}
