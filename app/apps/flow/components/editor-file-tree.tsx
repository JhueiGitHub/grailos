"use client";

import * as React from "react";
import { FolderIcon, FileIcon } from "lucide-react";

import { Tree, Folder, File } from "@flow/components/ui/file-tree";
import { useFlowStore } from "@/lib/store";

export function EditorFileTree() {
  const { currentFlow, setCurrentFlow, updateFlow } = useFlowStore();

  const treeItems = React.useMemo(() => {
    if (!currentFlow) return [];

    return [
      {
        id: "root",
        name: "Flow Elements",
        children: currentFlow.assets.map((asset) => ({
          id: asset.id,
          name: asset.category,
          isSelectable: true,
        })),
      },
    ];
  }, [currentFlow]);

  const handleElementSelect = (elementId: string) => {
    if (!currentFlow) return;

    const selectedAsset = currentFlow.assets.find(
      (asset) => asset.id === elementId
    );
    if (selectedAsset) {
      // Update the current flow to mark this asset as selected
      const updatedFlow = {
        ...currentFlow,
        assets: currentFlow.assets.map((asset) => ({
          ...asset,
          selected: asset.id === elementId,
        })),
      };
      setCurrentFlow(updatedFlow);
      updateFlow(currentFlow.id, updatedFlow);
    }
  };

  if (!currentFlow) {
    return <div>No flow selected</div>;
  }

  return (
    <Tree elements={treeItems}>
      {treeItems.map((root) => (
        <Folder key={root.id} element={root.name} value={root.id}>
          {root.children?.map((element) => (
            <File
              key={element.id}
              value={element.id}
              fileIcon={<FileIcon className="h-4 w-4 mr-2" />}
              handleSelect={() => handleElementSelect(element.id)}
            >
              {element.name}
            </File>
          ))}
        </Folder>
      ))}
    </Tree>
  );
}
