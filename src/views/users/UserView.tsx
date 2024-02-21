import { Button } from "@/components/button/Button";
import { DataTable, DataTableRow } from "@/components/data-table/DataTable2";
import { DataTableColumn } from "@/components/data-table/TH";
import { CheckboxField } from "@/components/field/CheckboxField";
import { FlexGrid, FlexRow } from "@/components/flex-grid/FlexGrid";
import { ICON, useIcon } from "@/components/icon/useIcon";
import * as React from "react";
import { useUserView } from "./useUserView";
import { space } from "@/utils/space";
import { UserCard } from "@/components/user-card/UserCard";
import { useStore } from "@/store/application";
import { MODAL_TYPES } from "@/store/modals";
import { SIDEBAR_TYPES } from "@/store/sidebar";

interface UserViewProps {
  users: User[];
}

export type User = {
  id: string;
  name: string;
  email: string;
  widgets: number;
  status: "online" | "offline" | "pause";
};

export const UserView: React.FC<UserViewProps> = ({ users }) => {
  const { i } = useIcon();
  const openModal = useStore.use.setOpen();
  const setActiveModal = useStore.use.setActiveModal();
  const setSidebarVisible = useStore.use.setSidebarVisible();
  const setActiveSidebar = useStore.use.setActiveSidebar();

  const userIds = users.map((user) => user.id);

  const handleEditUser = React.useCallback(
    (user: User) => {
      setSidebarVisible(true);
      setActiveSidebar(SIDEBAR_TYPES.USER, user);
    },
    [setActiveSidebar, setSidebarVisible]
  );

  const { handleSelectAll, handleSelect, selectedUserIds, highlightedUser } =
    useUserView({});

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
        },
      ];

      return actions.map((action) => {
        return (
          <Button
            key={action.name}
            onClick={action.onClick}
            title={action.label}
          >
            {i(action.icon)}
          </Button>
        );
      });
    },
    [handleEditUser, i]
  );
  const columns = React.useMemo(() => {
    const columns: DataTableColumn[] = [
      {
        name: "isSelected",
        label: "Select",
        sortable: true,
        headerTemplate: (
          <CheckboxField
            onChange={() =>
              selectedUserIds.length === users.length
                ? handleSelectAll([])
                : handleSelectAll(userIds)
            }
            name="selectAll"
            value={Boolean(selectedUserIds.length === users.length)}
            label="Select All"
            showLabel={false}
          />
        ),
        template: (item) => {
          const i = item as string;
          return (
            <CheckboxField
              name="isSelected"
              value={selectedUserIds.includes(i)}
              onChange={() => handleSelect(i)}
              label={"isSelected"}
              showLabel={false}
            />
          );
        },
      },
      {
        name: "name",
        label: "Name",
        sortable: true,
        template: (user) => {
          const u = user as {
            name: string;
            avatar: string;
          };
          return (
            <UserCard
              user={{
                name: u.name,
                avatar: "",
              }}
            />
          );
        },
      },
      {
        name: "email",
        label: "Email",
        sortable: true,
        filter: "select",
      },
      {
        name: "widgets",
        label: "Widgets",
        sortable: true,
        filter: "select",
      },
      {
        name: "status",
        label: "Status",
        sortable: true,
        filter: "select",
      },
      {
        name: "actions",
        label: "Actions",
        template: (item) => {
          const user = item as User;
          return actions(user);
        },
      },
    ];

    return columns;
  }, [
    actions,
    handleSelect,
    handleSelectAll,
    selectedUserIds,
    userIds,
    users.length,
  ]);

  const rows = React.useMemo(() => {
    const rows: DataTableRow[] = [];

    users.forEach((user) => {
      const row = {
        id: user.id,
        isFavorite: false,
        values: {
          isSelected: {
            displayValue: user.id,
            sortValue: String(selectedUserIds.includes(user.id)),
          },
          name: {
            displayValue: { name: user.name, avatar: "" },
            sortValue: user.name,
          },
          email: {
            displayValue: user.email,
            sortValue: user.email,
          },
          widgets: {
            displayValue: user.widgets,
            sortValue: user.widgets,
          },
          status: {
            displayValue: user.status,
            sortValue: user.status,
          },
          actions: {
            displayValue: user,
            sortValue: 0,
          },
        },
      };

      rows.push(row);
    });

    return rows;
  }, [selectedUserIds, users]);

  return (
    <FlexGrid direction="column">
      <FlexRow grow={0}></FlexRow>
      <FlexRow>
        <DataTable
          tableId="users"
          rows={rows}
          selectedRowId={highlightedUser}
          columns={columns}
          showColumnControls={false}
          showFilterControls={false}
          onSelect={undefined}
          label={{ singular: "User", plural: "Users" }}
          defaultSort={{ columnName: "name", direction: "asc" }}
        />
      </FlexRow>
    </FlexGrid>
  );
};
