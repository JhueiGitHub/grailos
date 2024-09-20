import { create } from "zustand";
import { Stream, Flow, Color, Font, Asset } from "@prisma/client";

interface WindowState {
  id: string;
  appId: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface FlowState {
  currentStream:
    | (Stream & {
        flows: (Flow & {
          colors: Color[];
          fonts: Font[];
          assets: Asset[];
        })[];
      })
    | null;
  currentFlow:
    | (Flow & {
        colors: Color[];
        fonts: Font[];
        assets: Asset[];
      })
    | null;
  setCurrentStream: (stream: FlowState["currentStream"]) => void;
  setCurrentFlow: (flow: FlowState["currentFlow"]) => void;
  openWindows: WindowState[];
  openWindow: (appId: string, title: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateFlow: (id: string, data: Partial<Flow>) => void;
}

export const useFlowStore = create<FlowState>((set) => ({
  currentStream: null,
  currentFlow: null,
  openWindows: [],
  setCurrentStream: (stream) => set({ currentStream: stream }),
  setCurrentFlow: (flow) => set({ currentFlow: flow }),
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
  updateFlow: (id, data) =>
    set((state) => ({
      currentFlow:
        state.currentFlow && state.currentFlow.id === id
          ? { ...state.currentFlow, ...data }
          : state.currentFlow,
    })),
}));
