import { useStore } from "@/store/application";
import { MODAL_TYPES } from "@/store/modals";
import { SIDEBAR_TYPES } from "@/store/sidebar";
import * as React from "react";
import { User } from "./UserTable";
import { ICON, useIcon } from "@/components/icon/useIcon";
import { Button, Variant } from "@/components/button/Button";

type Params = {
  users: User[];
};

export const useUserView = (params: Params) => {
  const { i } = useIcon();
  const openModal = useStore.use.setOpen();
  const setActiveModal = useStore.use.setActiveModal();
  const setActiveSidebar = useStore.use.setActiveSidebar();
  const setSidebarVisible = useStore.use.setSidebarVisible();
  const [selectedUserIds, setSelectedUserIds] = React.useState<string[]>([]);

  const { users } = params;

  const handleAddUser = React.useCallback(() => {
    setActiveModal(MODAL_TYPES.ADD_USER);
    openModal();
  }, [openModal, setActiveModal]);

  const openBulkEdit = React.useCallback(() => {
    setActiveModal(MODAL_TYPES.BULK_EDIT_USER);
    openModal();
  }, [openModal, setActiveModal]);

  const handleEditUser = React.useCallback(
    (user: User) => {
      setActiveSidebar(SIDEBAR_TYPES.USER, { user });
      setSidebarVisible(true);
    },
    [setActiveSidebar, setSidebarVisible]
  );

  const handleSelectAll = React.useCallback(() => {
    console.log("select all");
    if (selectedUserIds.length === users.length) {
      setSelectedUserIds([]);
      return;
    }
    setSelectedUserIds(users.map((user) => user.id));
  }, [selectedUserIds.length, users]);

  const handleSelect = React.useCallback((userId: string) => {
    console.log("select one");
    setSelectedUserIds((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      }
      return [...prev, userId];
    });
  }, []);

  const actions = React.useCallback(
    (user: User) => {
      const actions = [
        {
          name: "edit",
          label: "Edit",
          onClick: () => handleEditUser(user),
          icon: ICON.EDIT,
        },
        {
          name: "delete",
          label: "Delete",
          onClick: console.log,
          icon: ICON.DELETE,
          variant: "danger",
        },
      ];

      return actions.map((action) => {
        return (
          <Button
            key={action.name}
            onClick={action.onClick}
            title={action.label}
            variant={action.variant as Variant}
          >
            {i(action.icon)}
          </Button>
        );
      });
    },
    [handleEditUser, i]
  );

  return {
    handleAddUser,
    openBulkEdit,
    handleSelect,
    handleSelectAll,
    selectedUserIds,
    actions,
  };
};
