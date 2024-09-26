import { create } from "zustand";
import { Stream, Flow, Color, Font, Asset, Profile } from "@prisma/client";
import { Node, Edge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";

type FullFlow = Flow & {
  colors: Color[];
  fonts: Font[];
  assets: Asset[];
};

type FullStream = Stream & {
  flows: FullFlow[];
};

interface WindowState {
  id: string;
  appId: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface FlowState {
  currentProfile: Profile | null;
  streams: FullStream[];
  currentStream: FullStream | null;
  currentFlow: FullFlow | null;
  selectedStreamId: string | null;
  openWindows: WindowState[];
  viewMode: "grid" | "list";

  setCurrentProfile: (profile: Profile) => void;
  setStreams: (streams: FullStream[]) => void;
  setCurrentStream: (stream: FullStream | null) => void;
  setCurrentFlow: (flow: FullFlow | null) => void;
  setSelectedStreamId: (streamId: string | null) => void;
  createStream: (name: string) => Promise<void>;
  updateStream: (streamId: string, data: Partial<Stream>) => Promise<void>;
  deleteStream: (streamId: string) => Promise<void>;
  createFlow: (streamId: string, name: string) => Promise<void>;
  updateFlow: (flowId: string, data: Partial<FullFlow>) => Promise<void>;
  deleteFlow: (flowId: string) => Promise<void>;
  sortStreams: (by: "name" | "updatedAt") => void;
  setViewMode: (mode: "grid" | "list") => void;
  renameStream: (streamId: string, newName: string) => Promise<void>;
  updateFlowAsset: (
    flowId: string,
    category: string,
    url: string
  ) => Promise<void>;

  nodes: Node[];
  edges: Edge[];

  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodes: (changes: any) => void;
  updateEdges: (changes: any) => void;
  updateNodeData: (nodeId: string, data: any) => void;

  openWindow: (appId: string, title: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

export const useFlowStore = create<FlowState>((set, get) => ({
  currentProfile: null,
  streams: [],
  currentStream: null,
  currentFlow: null,
  selectedStreamId: null,
  openWindows: [],
  viewMode: "grid",
  nodes: [],
  edges: [],

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  updateNodes: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),

  updateEdges: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),

  updateNodeData: (nodeId, newData) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
      ),
    })),

  setCurrentProfile: (profile) => set({ currentProfile: profile }),

  setStreams: (streams) => set({ streams }),

  setCurrentStream: (stream) => set({ currentStream: stream }),

  setCurrentFlow: (flow) => set({ currentFlow: flow }),

  setSelectedStreamId: (streamId) => set({ selectedStreamId: streamId }),

  createStream: async (name) => {
    const { currentProfile } = get();
    if (!currentProfile) throw new Error("No current profile");

    const response = await fetch("/api/streams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, profileId: currentProfile.id }),
    });

    if (!response.ok) throw new Error("Failed to create stream");

    const newStream: FullStream = await response.json();
    set((state) => ({ streams: [...state.streams, newStream] }));
  },

  updateStream: async (streamId, data) => {
    const response = await fetch(`/api/streams/${streamId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to update stream");

    const updatedStream: FullStream = await response.json();
    set((state) => ({
      streams: state.streams.map((stream) =>
        stream.id === streamId ? { ...stream, ...updatedStream } : stream
      ),
      currentStream:
        state.currentStream?.id === streamId
          ? { ...state.currentStream, ...updatedStream }
          : state.currentStream,
    }));
  },

  deleteStream: async (streamId) => {
    const response = await fetch(`/api/streams/${streamId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete stream");

    set((state) => ({
      streams: state.streams.filter((stream) => stream.id !== streamId),
      currentStream:
        state.currentStream?.id === streamId ? null : state.currentStream,
      selectedStreamId:
        state.selectedStreamId === streamId ? null : state.selectedStreamId,
    }));
  },

  renameStream: async (streamId, newName) => {
    const response = await fetch(`/api/streams/${streamId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });

    if (!response.ok) throw new Error("Failed to rename stream");

    const updatedStream: Stream = await response.json();
    set((state) => ({
      streams: state.streams.map((stream) =>
        stream.id === streamId
          ? { ...stream, name: updatedStream.name }
          : stream
      ),
      currentStream:
        state.currentStream?.id === streamId
          ? { ...state.currentStream, name: updatedStream.name }
          : state.currentStream,
    }));
  },

  createFlow: async (streamId, name) => {
    const response = await fetch("/api/flows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ streamId, name }),
    });

    if (!response.ok) throw new Error("Failed to create flow");

    const newFlow: FullFlow = await response.json();
    set((state) => ({
      streams: state.streams.map((stream) =>
        stream.id === streamId
          ? { ...stream, flows: [...stream.flows, newFlow] }
          : stream
      ),
      currentStream:
        state.currentStream?.id === streamId
          ? {
              ...state.currentStream,
              flows: [...state.currentStream.flows, newFlow],
            }
          : state.currentStream,
    }));
  },

  updateFlow: async (flowId, data) => {
    const response = await fetch(`/api/flows/${flowId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to update flow");

    const updatedFlow: FullFlow = await response.json();
    set((state) => ({
      streams: state.streams.map((stream) => ({
        ...stream,
        flows: stream.flows.map((flow) =>
          flow.id === flowId ? { ...flow, ...updatedFlow } : flow
        ),
      })),
      currentFlow:
        state.currentFlow?.id === flowId
          ? { ...state.currentFlow, ...updatedFlow }
          : state.currentFlow,
    }));
  },

  deleteFlow: async (flowId) => {
    const response = await fetch(`/api/flows/${flowId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete flow");

    set((state) => ({
      streams: state.streams.map((stream) => ({
        ...stream,
        flows: stream.flows.filter((flow) => flow.id !== flowId),
      })),
      currentFlow: state.currentFlow?.id === flowId ? null : state.currentFlow,
    }));
  },

  sortStreams: (by) => {
    set((state) => ({
      streams: [...state.streams].sort((a, b) => {
        if (by === "name") return a.name.localeCompare(b.name);
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      }),
    }));
  },

  updateFlowAsset: async (flowId: string, category: string, url: string) => {
    const response = await fetch(`/api/assets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ flowId, category, url }),
    });

    if (!response.ok) throw new Error("Failed to update flow asset");

    const updatedAsset: Asset = await response.json();
    set((state) => ({
      streams: state.streams.map((stream) => ({
        ...stream,
        flows: stream.flows.map((flow) =>
          flow.id === flowId
            ? {
                ...flow,
                assets: [
                  ...flow.assets.filter((asset) => asset.category !== category),
                  updatedAsset,
                ],
              }
            : flow
        ),
      })),
      currentFlow:
        state.currentFlow?.id === flowId
          ? {
              ...state.currentFlow,
              assets: [
                ...state.currentFlow.assets.filter(
                  (asset) => asset.category !== category
                ),
                updatedAsset,
              ],
            }
          : state.currentFlow,
    }));
  },

  setViewMode: (mode) => set({ viewMode: mode }),

  openWindow: (appId, title) =>
    set((state) => ({
      openWindows: [
        ...state.openWindows,
        {
          id: Date.now().toString(),
          appId,
          title,
          isMinimized: false,
          isMaximized: false,
          zIndex: state.openWindows.length,
        },
      ],
    })),

  closeWindow: (id) =>
    set((state) => ({
      openWindows: state.openWindows.filter((window) => window.id !== id),
    })),

  minimizeWindow: (id) =>
    set((state) => ({
      openWindows: state.openWindows.map((window) =>
        window.id === id
          ? { ...window, isMinimized: !window.isMinimized }
          : window
      ),
    })),

  maximizeWindow: (id) =>
    set((state) => ({
      openWindows: state.openWindows.map((window) =>
        window.id === id
          ? { ...window, isMaximized: !window.isMaximized }
          : window
      ),
    })),

  focusWindow: (id) =>
    set((state) => ({
      openWindows: state.openWindows.map((window, index) =>
        window.id === id
          ? { ...window, zIndex: state.openWindows.length }
          : { ...window, zIndex: index }
      ),
    })),
}));
