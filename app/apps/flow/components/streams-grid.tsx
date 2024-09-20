import React from "react";
import { useFlowStore } from "@/lib/store";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@flow/components/ui/card";

const StreamGrid: React.FC = () => {
  const { streams, setSelectedStreamId } = useFlowStore();

  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      {streams.map((stream) => (
        <Card
          key={stream.id}
          className="cursor-pointer hover:bg-gray-900 hover:bg-opacity-45 bg-gray-900 bg-opacity-30 border-gray-700 border-opacity-60 border-spacing-3"
          onClick={() => setSelectedStreamId(stream.id)}
        >
          <CardHeader>
            <CardTitle>{stream.name}</CardTitle>
            <CardDescription>
              {stream.flows.length} flow{stream.flows.length !== 1 ? "s" : ""}
              <br />
              Last updated: {new Date(stream.updatedAt).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default StreamGrid;
