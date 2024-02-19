import * as React from "react";

type Params = {};

export const useUserView = (params: Params) => {
  const [selectedUserIds, setSelectedUserIds] = React.useState<string[]>([]);
  const [highlightedUser, setHighlightedUser] = React.useState<string>();

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

  return {
    handleSelectAll,
    handleSelect,
    selectedUserIds,
    highlightedUser,
    setHighlightedUser,
  };
};
