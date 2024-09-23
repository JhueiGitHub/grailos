import React, { memo, useCallback, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { useDropzone } from "react-dropzone";
import { debounce } from "lodash";
import { uploadToUploadCare } from "@/lib/uploadcare";
import { useFlowStore } from "@/lib/store";

const WallpaperNode: React.FC<NodeProps> = ({ data, id }) => {
  const [imageUrl, setImageUrl] = useState(data.imageUrl);
  const { updateNodeData, updateDesktopBackground } = useFlowStore();

  const debouncedUpdateBackground = useCallback(
    debounce((url: string) => {
      updateDesktopBackground(url);
    }, 300),
    []
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        try {
          const uploadedUrl = await uploadToUploadCare(file);
          setImageUrl(uploadedUrl);
          updateNodeData(id, { imageUrl: uploadedUrl });
          debouncedUpdateBackground(uploadedUrl);
        } catch (error) {
          console.error("Upload failed:", error);
        }
      }
    },
    [id, updateNodeData, debouncedUpdateBackground]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="bg-white rounded-lg p-3 shadow-md">
      <Handle type="target" position={Position.Top} />
      <div className="font-bold text-lg mb-2">{data.label}</div>
      <div {...getRootProps()} className="cursor-pointer">
        <input {...getInputProps()} />
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Wallpaper"
            className="w-full h-32 object-cover rounded"
          />
        ) : (
          <div className="w-full h-32 bg-gray-200 flex items-center justify-center rounded">
            {isDragActive
              ? "Drop the image here"
              : "Drag 'n' drop or click to upload wallpaper"}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(WallpaperNode);
