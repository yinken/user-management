import { ICON } from "@/components/icon/useIcon";
import { StoreApi } from "zustand";

export type Sidebar = {
  title: string;
  component: React.ReactNode;
  actions: {
    name: string;
    onClick: () => void;
    icon: ICON;
  }[];
  width?: number;
};

const SIDEBAR_WIDTH = window.innerWidth / 2;

export enum SIDEBAR_TYPES {
  CONVERSATION = "conversation",
  SUPERVISOR = "supervisor",
  TICKET = "ticket",
  LIVECHAT = "livechat",
  USER = "user",
}

export interface SidebarStore {
  isSidebarVisible: boolean;
  isSidebarExpanded: boolean;
  toggleSidebarExpanded: () => void;
  toggleSidebarVisible: () => void;
  setSidebarExpanded: (isExpanded: boolean) => void;
  setSidebarVisible: (isVisible: boolean) => void;
  sidebar: {
    title: string;
    component: React.ReactNode;
    actions: {
      name: string;
      onClick: () => void;
      icon: ICON;
    }[];

    expandedWidth?: number;
  };
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
  setSidebar: (sidebar: Sidebar) => void;
  activeSidebar: SIDEBAR_TYPES | null;
  sidebarPayload: Record<string, unknown>;
  setActiveSidebar: (
    modal: SIDEBAR_TYPES | null,
    payload?: Record<string, unknown>
  ) => void;
  sidebarRef: React.RefObject<HTMLDivElement> | null;
  setSidebarRef: (element: React.RefObject<HTMLDivElement>) => void;
}

export const sidebarStore = (
  set: StoreApi<SidebarStore>["setState"]
): SidebarStore => ({
  isSidebarExpanded: true,
  isSidebarVisible: false,
  activeSidebar: null,
  sidebarPayload: {},
  sidebarWidth: SIDEBAR_WIDTH,
  sidebarRef: null,
  toggleSidebarExpanded: () => {
    set((state) => ({
      isSidebarExpanded: !state.isSidebarExpanded,
    }));
  },
  toggleSidebarVisible: () => {
    set((state) => ({
      isSidebarVisible: !state.isSidebarVisible,
    }));
  },
  setSidebarExpanded: (isExpanded: boolean) => {
    set(() => ({
      isSidebarExpanded: isExpanded,
    }));
  },
  setSidebarVisible: (isVisible: boolean) => {
    set(() => ({
      isSidebarVisible: isVisible,
    }));
  },
  sidebar: {
    title: "Sidebar",
    component: "Lorem",
    actions: [],
    expandedWidth: 1200,
  },
  setSidebar: (sidebar: Sidebar) => {
    set(() => ({
      sidebar,
    }));
  },
  setActiveSidebar: (
    type: SIDEBAR_TYPES | null,
    payload?: Record<string, unknown>
  ) => {
    set(() => ({
      activeSidebar: type,
      sidebarPayload: payload,
    }));
  },
  setSidebarWidth: (width: number) => {
    set(() => ({
      sidebarWidth: width,
    }));
  },
  setSidebarRef: (ref: React.RefObject<HTMLDivElement>) => {
    set(() => ({
      sidebarRef: ref,
    }));
  },
});
