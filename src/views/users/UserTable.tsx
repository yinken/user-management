import { Button } from "@/components/button/Button";
import { DataTable, DataTableRow } from "@/components/data-table/DataTable2";
import { DataTableColumn } from "@/components/data-table/TH";
import { CheckboxField } from "@/components/field/CheckboxField";
import { FlexGrid, FlexRow } from "@/components/flex-grid/FlexGrid";
import { ICON, useIcon } from "@/components/icon/useIcon";
import * as React from "react";
import { useUserTable } from "./useUserTable";
import { space } from "@/utils/space";
import { UserCard } from "@/components/user-card/UserCard";
import { useStore } from "@/store/application";
import { MODAL_TYPES } from "@/store/modals";
import { SIDEBAR_TYPES } from "@/store/sidebar";
import { Filter } from "@/components/data-table/Filter";
import { getUUID } from "@/utils/strings";
import { USER_STATUS_TYPES } from "@/types";
import { MAX_CHATS, ROLES, TIERS, Widget } from "../widgets/WidgetTable";
import { useDummyData } from "@/app/dev/useDummyData";

interface UserTableProps {
  defaultFilter?: Record<string, Filter>;
  onSelect?: (userId: string) => void;
  onSelectAll?: () => void;
  selectedUserIds?: string[];
  onChange?: (
    userId: string,
    change: {
      key: string;
      value: string;
    }
  ) => void;
  users: User[];
  actions?: (user: User) => React.ReactNode;
}

export type User = {
  id: string;
  name: string;
  email: string;
  createdDate?: number;
  widgets?: Widget[];
  status?: "online" | "offline" | "pause";
  avatar?: string;
};

export const UserTable: React.FC<UserTableProps> = ({
  defaultFilter,
  selectedUserIds,
  onSelect,
  onSelectAll,
  users,
  actions,
}) => {
  const columns = React.useMemo(() => {
    const columns: DataTableColumn[] = [
      {
        name: "isSelected",
        label: "Select",
        sortable: true,
        headerTemplate: (
          <div
            style={{
              padding: `0 ${space(0.25)}`,
            }}
          >
            <CheckboxField
              onChange={(_key, _value) => onSelectAll?.()}
              name="selectAll"
              value={
                selectedUserIds?.length === users.length &&
                selectedUserIds?.length > 0
              }
              label="Select All"
              showLabel={false}
            />
          </div>
        ),
        template: (user) => {
          const u = user as User;
          return (
            <CheckboxField
              name="isSelected"
              value={Boolean(selectedUserIds?.includes(u.id))}
              onChange={() => onSelect?.(u.id)}
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
          const u = user as User;
          return (
            <UserCard
              user={{
                name: u.name,
                avatar: u.avatar,
                status: u.status as USER_STATUS_TYPES,
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
        template: (user) => {
          const u = user as User;
          return actions?.(u);
        },
      },
    ];

    return columns;
  }, [actions, onSelect, onSelectAll, selectedUserIds, users.length]);

  const rows = React.useMemo(() => {
    const rows: DataTableRow[] = [];

    users.forEach((user) => {
      const row = {
        id: user.id,
        isFavorite: false,
        values: {
          isSelected: {
            displayValue: user.id,
            sortValue: user.id,
          },
          name: {
            displayValue: user,
            sortValue: user.name,
          },
          email: {
            displayValue: user.email,
            sortValue: user.email,
          },
          widgets: {
            displayValue: user.widgets?.length || 0,
            sortValue: user.widgets?.length || 0,
          },
          status: {
            displayValue: user.status || "offline",
            sortValue: user.status || "offline",
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
  }, [users]);

  return (
    <DataTable
      tableId="users"
      defaultFilter={defaultFilter}
      rows={rows}
      columns={columns}
      showColumnControls={false}
      showFilterControls={false}
      onSelect={undefined}
      label={{ singular: "User", plural: "Users" }}
      defaultSort={{ columnName: "name", direction: "asc" }}
    />
  );
};
