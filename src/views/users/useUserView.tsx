import { useStore } from "@/store/application";
import { SIDEBAR_TYPES } from "@/store/sidebar";
import * as React from "react";

type Params = {};

export const useUserView = (params: Params) => {
  const [selectedUserIds, setSelectedUserIds] = React.useState<string[]>([]);
  const [highlightedUser, setHighlightedUser] = React.useState<string>();
  const setActiveSidebar = useStore.use.setActiveSidebar();
  const setSidebarVisible = useStore.use.setSidebarVisible();

  const handleSelectAll = (users: string[]) => {
    setSelectedUserIds(users);
  };

  const handleSelect = (user: string) => {
    setSelectedUserIds((prev) => {
      if (prev.includes(user)) {
        return prev.filter((id) => id !== user);
      }
      return [...prev, user];
    });
  };

  const handleHighlightUser = (user: string) => {
    setHighlightedUser(user);
    setActiveSidebar(SIDEBAR_TYPES.USER);
    setSidebarVisible(true);
  };

  return {
    handleSelectAll,
    handleSelect,
    selectedUserIds,
    highlightedUser,
    handleHighlightUser,
  };
};
