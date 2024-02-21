import { useStore } from "@/store/application";
import * as React from "react";
import { ICON } from "../icon/useIcon";

type Params = {
  componentRef?: React.RefObject<HTMLDivElement> | null;
  sidebarRef?: React.RefObject<HTMLDivElement> | null;
  actions?: SidebarAction[];
  position?: "left" | "right";
};

export type SidebarAction = {
  name: string;
  icon: ICON;
  onClick: () => void;
  title?: string;
  disabled?: boolean;
  isActive?: boolean;
};

export const useSidebar = (params: Params) => {
  const { componentRef, sidebarRef, actions, position = "right" } = params;
  const isSidebarVisible = useStore.use.isSidebarVisible();
  const toggleSidebarVisible = useStore.use.toggleSidebarVisible();
  const isSidebarExpanded = useStore.use.isSidebarExpanded();
  const toggleSidebarExpanded = useStore.use.toggleSidebarExpanded();
  const sidebarWidth = useStore.use.sidebarWidth();

  const handleSidebarResize = React.useCallback(
    (change: number) => {
      const sidebar = sidebarRef?.current;
      const component = componentRef?.current;
      if (!sidebar || !component) {
        return;
      }
      sidebar.style.width = change + "px";

      if (position === "right") {
        component.style.paddingRight = change + "px";
      } else {
        component.style.paddingLeft = change + "px";
      }
    },
    [sidebarRef, componentRef, position]
  );

  React.useEffect(() => {
    const component = componentRef?.current;
    if (!component) {
      return;
    }
    if (!isSidebarVisible) {
      component.style.paddingRight = "0px";
      component.style.paddingLeft = "0px";
    } else {
      if (position === "right") {
        component.style.paddingRight = sidebarWidth + "px";
      } else {
        component.style.paddingLeft = sidebarWidth + "px";
      }
    }
  }, [componentRef, isSidebarVisible, position, sidebarWidth]);

  const closeAction = React.useMemo(() => {
    return [
      {
        name: "close-sidebar",
        icon: ICON.CLOSE,
        onClick: () => {
          toggleSidebarVisible();
        },
      },
    ];
  }, [toggleSidebarVisible]);

  const sidebarActions = React.useMemo(() => {
    const sidebarActions = [...(actions || []), ...closeAction];
    return sidebarActions;
  }, [closeAction, actions]);

  return {
    isSidebarVisible,
    toggleSidebarVisible,
    isSidebarExpanded,
    toggleSidebarExpanded,
    closeAction,
    handleSidebarResize,
    actions: sidebarActions,
    sidebarWidth,
  };
};
