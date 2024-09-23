import React from "react";
import { useFlowStore } from "@/lib/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@flow/components/ui/dropdown-menu";
import { Button } from "@flow/components/ui/button";
import { ChevronDown, Pencil, Trash } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@flow/components/ui/card";
import FlowEditor from "./flow-editor";
import {
  Flow,
  ColorCategory,
  FontCategory,
  AssetCategory,
} from "@prisma/client";

// Define the FullFlow type with correct enum types
interface FullFlow extends Flow {
  colors: {
    id: string;
    category: ColorCategory;
    key: string;
    value: string;
    flowId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  fonts: {
    id: string;
    category: FontCategory;
    family: string;
    url: string;
    flowId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  assets: {
    id: string;
    category: AssetCategory;
    url: string | null;
    flowId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export const StreamView: React.FC = () => {
  const {
    streams,
    selectedStreamId,
    renameStream,
    deleteStream,
    setSelectedStreamId,
    setCurrentFlow,
    currentFlow,
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

  const handleFlowClick = (flow: FullFlow) => {
    setCurrentFlow(flow);
  };

  if (currentFlow) {
    return <FlowEditor />;
  }

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
      <div className="grid grid-cols-3 gap-4 mt-6">
        {selectedStream.flows.map((flow: FullFlow) => (
          <Card
            key={flow.id}
            className="cursor-pointer hover:bg-gray-900 hover:bg-opacity-45 bg-gray-900 bg-opacity-30 border-gray-700 border-opacity-60 border-spacing-3"
            onClick={() => handleFlowClick(flow)}
          >
            <CardHeader>
              <CardTitle>{flow.name}</CardTitle>
              <CardDescription>
                Last updated: {new Date(flow.updatedAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
