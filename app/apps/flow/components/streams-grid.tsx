import React, { useEffect, useState } from "react";
import { useFlowStore } from "@/lib/store";
import { Stream } from "@prisma/client";
import { Card } from "@flow/components/ui/card";

const StreamGrid: React.FC = () => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const { currentProfile } = useFlowStore();

  useEffect(() => {
    const fetchStreams = async () => {
      if (currentProfile) {
        const response = await fetch(
          `/api/streams?profileId=${currentProfile.id}`
        );
        const data = await response.json();
        setStreams(data);
      }
    };

    fetchStreams();
  }, [currentProfile]);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {streams.map((stream) => (
        <Card key={stream.id} className="p-4">
          <h3 className="font-bold">{stream.name}</h3>
          <p className="text-sm text-gray-500">
            Edited {new Date(stream.updatedAt).toLocaleDateString()}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default StreamGrid;
