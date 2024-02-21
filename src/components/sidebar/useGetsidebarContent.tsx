import { useStore } from "@/store/application";
import * as React from "react";
import { ICON } from "../icon/useIcon";
import { SidebarAction } from "./useSidebar";
import { SIDEBAR_TYPES } from "@/store/sidebar";
export const useGetSidebarContent = () => {
  const toggleSidebarExpanded = useStore.use.toggleSidebarExpanded();
  const isSidebarExpanded = useStore.use.isSidebarExpanded();
  const sidebarPayload = useStore.use.sidebarPayload();

  let sidebarComponent: React.ReactNode;
  let title = "Sidebar";
  let icon: ICON | undefined = undefined;
  const actions: SidebarAction[] = [];

  switch (useStore.use.activeSidebar()) {
    case SIDEBAR_TYPES.USER:
      sidebarComponent = <div>{JSON.stringify(sidebarPayload)}</div>;
      title = "User Details";
      icon = ICON.USER;

      break;

    default:
      break;
  }

  return {
    sidebarComponent,
    title,
    icon,
    actions,
  };
};
