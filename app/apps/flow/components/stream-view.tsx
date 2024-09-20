import React from "react";
import { useFlowStore } from "@/lib/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@flow/components/ui/dropdown-menu";
import { Button } from "@flow/components/ui/button";
import { Input } from "@flow/components/ui/input";
import { ChevronDown, Pencil, Trash } from "lucide-react";

export const StreamView: React.FC = () => {
  const {
    streams,
    selectedStreamId,
    renameStream,
    deleteStream,
    setSelectedStreamId,
  } = useFlowStore();
  const selectedStream = streams.find(
    (stream) => stream.id === selectedStreamId
  );

  if (!selectedStream) return null;

  const handleRename = async () => {
    const newName = prompt(
      "Enter new name for the stream:",
      selectedStream.name
    );
    if (newName && newName !== selectedStream.name) {
      await renameStream(selectedStream.id, newName);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this stream?")) {
      await deleteStream(selectedStream.id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedStream.name}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleRename}>
              <Pencil className="mr-2 h-4 w-4" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={() => setSelectedStreamId(null)}>
          Back to All Streams
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {selectedStream.flows.map((flow) => (
          <div key={flow.id} className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold">{flow.name}</h3>
            {/* Add more flow details here */}
          </div>
        ))}
      </div>
    </div>
  );
};
