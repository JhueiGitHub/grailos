"use client";

import * as React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/apps/flow/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/app/apps/flow/components/ui/label";
import { useFlowStore } from "@/lib/store";

export function NewStreamButton() {
  const [open, setOpen] = React.useState(false);
  const [streamName, setStreamName] = React.useState("");
  const { createStream } = useFlowStore();

  const handleCreateStream = async (e: React.FormEvent) => {
    e.preventDefault();
    if (streamName.trim()) {
      await createStream(streamName);
      setStreamName("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          New Stream
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Stream</DialogTitle>
          <DialogDescription>
            Enter a name for your new stream. Click create when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateStream}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={streamName}
                onChange={(e) => setStreamName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Stream</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
