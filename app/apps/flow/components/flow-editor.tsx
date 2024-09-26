import React, { useEffect } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useFlowStore } from "@/lib/store";
import { AssetNode } from "./AssetNode";

const nodeTypes = {
  assetNode: AssetNode,
};

const FlowEditor: React.FC = () => {
  const {
    currentFlow,
    nodes,
    edges,
    setNodes,
    setEdges,
    updateNodes,
    updateEdges,
  } = useFlowStore();

  const [reactFlowNodes, setReactFlowNodes, onNodesChange] =
    useNodesState(nodes);
  const [reactFlowEdges, setReactFlowEdges, onEdgesChange] =
    useEdgesState(edges);

  useEffect(() => {
    if (currentFlow) {
      // Initialize nodes based on currentFlow data
      const initialNodes = currentFlow.assets.map((asset, index) => ({
        id: asset.id,
        type: "assetNode",
        position: { x: 100 * index, y: 100 },
        data: { label: asset.category, image: asset.url },
      }));

      setNodes(initialNodes);
      setEdges([]); // Initialize edges as needed
    }
  }, [currentFlow, setNodes, setEdges]);

  useEffect(() => {
    setReactFlowNodes(nodes);
    setReactFlowEdges(edges);
  }, [nodes, edges, setReactFlowNodes, setReactFlowEdges]);

  const onNodesChangeHandler = (changes: any) => {
    onNodesChange(changes);
    updateNodes(changes);
  };

  const onEdgesChangeHandler = (changes: any) => {
    onEdgesChange(changes);
    updateEdges(changes);
  };

  if (!currentFlow) return null;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={reactFlowNodes}
        edges={reactFlowEdges}
        onNodesChange={onNodesChangeHandler}
        onEdgesChange={onEdgesChangeHandler}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default FlowEditor;
