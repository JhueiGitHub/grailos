import { create } from "zustand";
import { Stream, Flow, Color, Font, Asset, Profile } from "@prisma/client";

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
  openWindows: WindowState[];
  viewMode: "grid" | "list";

  setCurrentProfile: (profile: Profile) => void;
  setStreams: (streams: FullStream[]) => void;
  setCurrentStream: (stream: FullStream | null) => void;
  setCurrentFlow: (flow: FullFlow | null) => void;
  createStream: (name: string) => Promise<void>;
  updateFlow: (id: string, data: Partial<FullFlow>) => void;
  sortStreams: (by: "name" | "updatedAt") => void;
  setViewMode: (mode: "grid" | "list") => void;

  openWindow: (appId: string, title: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

export const useFlowStore = create<FlowState>((set) => ({
  currentProfile: null,
  streams: [],
  currentStream: null,
  currentFlow: null,
  openWindows: [],
  viewMode: "grid",

  setCurrentProfile: (profile) => set({ currentProfile: profile }),
  setStreams: (streams) => set({ streams }),
  setCurrentStream: (stream) => set({ currentStream: stream }),
  setCurrentFlow: (flow) => set({ currentFlow: flow }),

  createStream: async (name) => {
    // TODO: Implement API call to create new stream
    const newStream: FullStream = {
      id: Date.now().toString(),
      name,
      flows: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      profileId: "", // This should be set correctly when implementing the API call
    };
    set((state) => ({ streams: [...state.streams, newStream] }));
  },

  updateFlow: (id, data) =>
    set((state) => ({
      currentFlow:
        state.currentFlow && state.currentFlow.id === id
          ? { ...state.currentFlow, ...data }
          : state.currentFlow,
      streams: state.streams.map((stream) => ({
        ...stream,
        flows: stream.flows.map((flow) =>
          flow.id === id ? { ...flow, ...data } : flow
        ),
      })),
    })),

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
