"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useFlowStore } from "../../../../../lib/store";
import { FlowEditor } from "../../components/flow-editor";
import { Room } from "../../../../Room";

export default function FlowEditorPage() {
  const params = useParams();
  const editorId = params.editorId as string;
  const { setCurrentFlow, currentFlow, streams } = useFlowStore();

  useEffect(() => {
    if (editorId) {
      // Find the flow in the streams
      const flow = streams
        .flatMap((stream) => stream.flows)
        .find((flow) => flow.id === editorId);
      if (flow) {
        setCurrentFlow(flow);
      }
    }
  }, [editorId, setCurrentFlow, streams]);

  if (!currentFlow) {
    return <div>Loading...</div>;
  }

  return (
    <Room>
      <FlowEditor />
    </Room>
  );
}
