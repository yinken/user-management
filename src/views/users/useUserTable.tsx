import { useStore } from "@/store/application";
import { SIDEBAR_TYPES } from "@/store/sidebar";
import * as React from "react";
import { User } from "./UserTable";

type Params = {
  users: User[];
};

export const useUserTable = (params: Params) => {
  const [highlightedUser, setHighlightedUser] = React.useState<string>();
  const setActiveSidebar = useStore.use.setActiveSidebar();
  const setSidebarVisible = useStore.use.setSidebarVisible();
  const [selectedUserIds, setSelectedUserIds] = React.useState<string[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const { users } = params;

  const handleSelectAll = React.useCallback(() => {
    if (selectedUserIds.length === users.length) {
      setSelectedUserIds([]);
      return;
    }
    setSelectedUserIds(users.map((user) => user.id));
  }, [selectedUserIds.length, users]);

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
    searchTerm,
    setSearchTerm,
    handleSelectAll,
    handleSelect,
    selectedUserIds,
    highlightedUser,
    handleHighlightUser,
  };
};
