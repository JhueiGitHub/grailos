import React, { useCallback } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { uploadToUploadCare } from "@/lib/uploadcare";
import { useFlowStore } from "@/lib/store";

export const AssetNode: React.FC<NodeProps> = ({ id, data }) => {
  const { updateNodeData } = useFlowStore();

  const handleUpload = useCallback(async (file: File) => {
    try {
      const uploadedUrl = await uploadToUploadCare(file);
      updateNodeData(id, { image: uploadedUrl });
    } catch (error) {
      console.error("Upload error:", error);
    }
  }, [id, updateNodeData]);

  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <div className="font-bold mb-2">{typeof data.label === 'string' ? data.label : ''}</div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
      />
      {typeof data.image === 'string' && <img src={data.image} alt="Uploaded asset" className="mt-2 max-w-full h-auto" />}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};