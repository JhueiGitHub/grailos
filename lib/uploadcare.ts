import { uploadFile } from "@uploadcare/upload-client";

export const uploadToUploadCare = async (file: File): Promise<string> => {
  try {
    const result = await uploadFile(file, {
      publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY as string,
      store: "auto",
      metadata: {
        subsystem: "uploader",
        orion: "os",
      },
    });

    if (result.cdnUrl) {
      return result.cdnUrl;
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
