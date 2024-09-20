"use client";

import * as React from "react";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";

export function StellarButton() {
  const handleClick = () => {
    // TODO: Implement Stellar functionality
    console.log("Stellar button clicked");
  };

  return (
    <Button
      variant="ghost"
      className="w-full justify-start"
      onClick={handleClick}
    >
      <Star className="mr-2 h-4 w-4" />
      Stellar
    </Button>
  );
}
