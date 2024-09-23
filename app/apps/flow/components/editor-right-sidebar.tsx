import React from "react";
import { useFlowStore } from "@/lib/store";

const RightSidebar: React.FC = () => {
  const { currentFlow } = useFlowStore();

  return (
    <div className="w-64 bg-gray-900 h-full overflow-y-auto">
      <h2 className="text-white p-4">Properties</h2>
      {/* Add property editors here */}
    </div>
  );
};

export default RightSidebar;
