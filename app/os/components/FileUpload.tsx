import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadToUploadCare } from "@/lib/uploadcare";

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  acceptedFileTypes?: string[];
  maxSize?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUploadComplete,
  acceptedFileTypes = ["image/*", "video/*"],
  maxSize = 10 * 1024 * 1024, // 10MB
}) => {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        try {
          const url = await uploadToUploadCare(file);
          onUploadComplete(url);
        } catch (error) {
          console.error("Upload failed:", error);
          // Handle error (e.g., show error message to user)
        }
      }
    },
    [onUploadComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce(
      (acc, type) => ({ ...acc, [type]: [] }),
      {}
    ),
    maxSize,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the file here ...</p>
      ) : (
        <p>Drag 'n' drop a file here, or click to select a file</p>
      )}
    </div>
  );
};

export default FileUpload;
