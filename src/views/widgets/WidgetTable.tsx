import { Button } from "@/components/button/Button";
import { DataTable, DataTableRow } from "@/components/data-table/DataTable2";
import { DataTableColumn } from "@/components/data-table/TH";
import { CheckboxField } from "@/components/field/CheckboxField";
import { FlexGrid, FlexRow } from "@/components/flex-grid/FlexGrid";
import { ICON, useIcon } from "@/components/icon/useIcon";
import * as React from "react";

import { space } from "@/utils/space";
import { UserCard } from "@/components/user-card/UserCard";
import { useStore } from "@/store/application";
import { MODAL_TYPES } from "@/store/modals";
import { SIDEBAR_TYPES } from "@/store/sidebar";
import { Filter } from "@/components/data-table/Filter";
import md5 from "crypto-js/md5";
import { getUUID } from "@/utils/strings";
import { USER_STATUS_TYPES } from "@/types";
import { SelectField } from "@/components/field/SelectField";

interface UserTableProps {
  defaultFilter?: Record<string, Filter>;
  onSelect?: (widgetId: string) => void;
  onSelectAll?: () => void;
  selectedWidgetIds?: string[];
  onChange?: (
    widgetId: string,
    change: {
      key: string;
      value: string;
    }
  ) => void;
  widgets: Widget[];
  actions?: () => React.ReactNode;
}

export type Widget = {
  id: string;
  name: string;
  role: ROLES;
  maxChats: MAX_CHATS;
  tier: TIERS;
};

export enum ROLES {
  ADMIN = "admin",
  USER = "user",
  SUPERVISOR = "supervisor",
  SUPER_ADMIN = "super-admin",
  MANAGER = "manager",
}

export enum TIERS {
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
}

export enum MAX_CHATS {
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FIVE = "5",
  TEN = "10",
  TWENTY = "20",
}

export const WidgetTable: React.FC<UserTableProps> = ({
  defaultFilter,
  selectedWidgetIds,
  onChange,
  onSelect,
  onSelectAll,
  widgets,
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
                selectedWidgetIds?.length === widgets.length &&
                selectedWidgetIds?.length > 0
              }
              label="Select All"
              showLabel={false}
            />
          </div>
        ),
        template: (widget) => {
          const w = widget as Widget;
          return (
            <CheckboxField
              name="isSelected"
              value={Boolean(selectedWidgetIds?.includes(w.id))}
              onChange={() => onSelect?.(w.id)}
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
        template: (widget) => {
          const w = widget as Widget;
          return w.name;
        },
      },
      {
        name: "role",
        label: "Role",
        sortable: true,
        template: (widget) => {
          const w = widget as Widget;
          const handleChange = (key: string, value: string) => {
            onChange?.(w.id, { key, value });
          };
          return (
            <SelectField
              name="role"
              value={w.role as string}
              options={
                Object.values(ROLES).map((role) => {
                  return { value: role, label: role };
                }) as { value: string; label: string }[]
              }
              label="Role"
              showLabel={false}
              onChange={handleChange}
            />
          );
        },
      },
      {
        name: "maxChats",
        label: "Max Chats",
        sortable: true,
        template: (widget) => {
          const w = widget as Widget;
          const handleChange = (key: string, value: string) => {
            onChange?.(w.id, { key, value });
          };
          return (
            <SelectField
              name="maxChats"
              value={w.maxChats}
              options={
                Object.values(MAX_CHATS).map((maxChats) => {
                  return { value: maxChats, label: maxChats };
                }) as { value: string; label: string }[]
              }
              label="Max Chats"
              showLabel={false}
              onChange={handleChange}
            />
          );
        },
      },
      {
        name: "tier",
        label: "Tier",
        sortable: true,
        template: (widget) => {
          const w = widget as Widget;
          const handleChange = (key: string, value: string) => {
            onChange?.(w.id, { key, value });
          };
          return (
            <SelectField
              name="role"
              value={w.role}
              options={
                Object.values(TIERS).map((tier) => {
                  return { value: tier, label: tier };
                }) as { value: string; label: string }[]
              }
              label="Role"
              showLabel={false}
              onChange={handleChange}
            />
          );
        },
      },
      {
        name: "actions",
        label: "Actions",
        template: (_widget) => {
          return actions?.();
        },
      },
    ];

    return columns;
  }, [actions, onChange, onSelect, onSelectAll, selectedWidgetIds, widgets.length]);

  const rows = React.useMemo(() => {
    const rows: DataTableRow[] = [];

    widgets.forEach((widget) => {
      const row = {
        id: widget.id,
        isFavorite: false,
        values: {
          isSelected: {
            displayValue: widget,
            sortValue: widget.id,
          },
          name: {
            displayValue: widget,
            sortValue: widget.name,
          },
          id: {
            displayValue: widget.id,
            sortValue: widget.id,
          },
          role: {
            displayValue: widget,
            sortValue: widget.role,
          },
          maxChats: {
            displayValue: widget,
            sortValue: parseInt(widget.maxChats),
          },
          tier: {
            displayValue: widget,
            sortValue: parseInt(widget.tier),
          },
          actions: {
            displayValue: widget,
            sortValue: 0,
          },
        },
      };

      rows.push(row);
    });

    return rows;
  }, [widgets]);

  return (
    <DataTable
      tableId="widgets"
      defaultFilter={defaultFilter}
      rows={rows}
      columns={columns}
      showColumnControls={false}
      showFilterControls={false}
      onSelect={undefined}
      label={{ singular: "Widget", plural: "Widgets" }}
      defaultSort={{ columnName: "name", direction: "asc" }}
    />
  );
};
