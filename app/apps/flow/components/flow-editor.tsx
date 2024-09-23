"use client";

import React, { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  NodeTypes,
  EdgeTypes,
  Node,
  Edge,
  Connection,
  NodeChange,
  EdgeChange,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { useFlowStore } from "@/lib/store";
import EditorNavBar from "./editor-nav-bar";
import { EditorLeftSidebar } from "./editor-left-sidebar";
import EditorRightSidebar from "./editor-right-sidebar";
import WallpaperNode from "../nodes/wallpaper-node";
import { motion } from "framer-motion";

// Define custom node types
const nodeTypes: NodeTypes = {
  wallpaperNode: WallpaperNode,
};

// Define custom edge types if needed
const edgeTypes: EdgeTypes = {};

const FlowEditor: React.FC = () => {
  const {
    flowEditor,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    toggleLeftSidebar,
    toggleRightSidebar,
  } = useFlowStore();

  const [nodes, setNodesInternal, onNodesChangeInternal] = useNodesState(
    flowEditor.nodes
  );
  const [edges, setEdgesInternal, onEdgesChangeInternal] = useEdgesState(
    flowEditor.edges
  );

  // Sync internal state with Zustand store
  React.useEffect(() => {
    setNodes(nodes);
  }, [nodes, setNodes]);

  React.useEffect(() => {
    setEdges(edges);
  }, [edges, setEdges]);

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChangeInternal(changes);
      onNodesChange(changes);
    },
    [onNodesChangeInternal, onNodesChange]
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      onEdgesChangeInternal(changes);
      onEdgesChange(changes);
    },
    [onEdgesChangeInternal, onEdgesChange]
  );

  const handleConnect = useCallback(
    (connection: Connection) => {
      const newEdge = addEdge(connection, edges);
      setEdgesInternal(newEdge);
      onConnect(connection);
    },
    [edges, setEdgesInternal, onConnect]
  );

  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
      <EditorNavBar />
      <div className="flex h-full">
        <motion.div
          initial={{ x: -265 }}
          animate={{ x: flowEditor.showLeftSidebar ? 0 : -265 }}
          transition={{ duration: 0.3 }}
          className="w-64 bg-gray-900"
        >
          <EditorLeftSidebar />
        </motion.div>
        <div className="flex-grow">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={handleNodesChange}
            onEdgesChange={handleEdgesChange}
            onConnect={handleConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
        <motion.div
          initial={{ x: 265 }}
          animate={{ x: flowEditor.showRightSidebar ? 0 : 265 }}
          transition={{ duration: 0.3 }}
          className="w-64 bg-gray-900"
        >
          <EditorRightSidebar />
        </motion.div>
      </div>
    </div>
  );
};

export default FlowEditor;
