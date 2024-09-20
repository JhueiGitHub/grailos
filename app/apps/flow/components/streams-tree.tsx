"use client";

import * as React from "react";
import { FolderIcon, FileIcon } from "lucide-react";

import { Tree, Folder, File } from "@flow/components/ui/file-tree";
import { useFlowStore } from "@/lib/store";

export function StreamsTree() {
  const { streams, setCurrentStream, setCurrentFlow } = useFlowStore();

  const treeItems = React.useMemo(() => {
    return streams.map((stream) => ({
      id: stream.id,
      name: stream.name,
      children: stream.flows.map((flow) => ({
        id: flow.id,
        name: flow.name,
        isSelectable: true,
      })),
    }));
  }, [streams]);

  const handleStreamSelect = (streamId: string) => {
    const stream = streams.find((s) => s.id === streamId);
    if (stream) {
      setCurrentStream(stream);
    }
  };

  const handleFlowSelect = (flowId: string) => {
    const flow = streams.flatMap((s) => s.flows).find((f) => f.id === flowId);
    if (flow) {
      setCurrentFlow(flow);
    }
  };

  return (
    <Tree elements={treeItems}>
      {treeItems.map((stream) => (
        <Folder key={stream.id} element={stream.name} value={stream.id}>
          {stream.children?.map((flow) => (
            <File
              key={flow.id}
              value={flow.id}
              fileIcon={<FileIcon className="h-4 w-4 mr-2" />}
              handleSelect={() => handleFlowSelect(flow.id)}
            >
              {flow.name}
            </File>
          ))}
        </Folder>
      ))}
    </Tree>
  );
}
