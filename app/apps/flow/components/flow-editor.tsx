import React from "react";
import { Widget } from "@uploadcare/react-widget";
import { useFlowStore } from "@/lib/store";

const FlowEditor: React.FC = () => {
  const { currentFlow, updateFlowAsset } = useFlowStore();

  const handleBackgroundUpload = async (fileInfo: any) => {
    if (fileInfo && currentFlow) {
      await updateFlowAsset(currentFlow.id, "WALLPAPER", fileInfo.cdnUrl);
    }
  };

  const backgroundAsset = currentFlow?.assets.find(
    (asset) => asset.category === "WALLPAPER"
  );

  if (!currentFlow) return <div>No flow selected</div>;

  return (
    <div>
      <h2>Edit Flow: {currentFlow.name}</h2>
      <div>
        <h3>Background Image</h3>
        <Widget
          publicKey="9d6e7b5640a3414f4ca8"
          onChange={handleBackgroundUpload}
          imagesOnly
        />
        {backgroundAsset && (
          <img
            src={backgroundAsset.url ?? undefined}
            alt="Background"
            style={{ maxWidth: "200px" }}
          />
        )}
      </div>
      {/* Add other flow editing fields here */}
    </div>
  );
};

export default FlowEditor;
