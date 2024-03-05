"use client";
import { Button } from "@/components/button/Button";
import { DataTable, DataTableRow } from "@/components/data-table/DataTable2";
import { DataTableColumn } from "@/components/data-table/TH";
import { CheckboxField } from "@/components/field/CheckboxField";
import { FlexColumn, FlexGrid, FlexRow } from "@/components/flex-grid/FlexGrid";
import { ICON, useIcon } from "@/components/icon/useIcon";
import * as React from "react";
import { space } from "@/utils/space";
import { UserCard } from "@/components/user-card/UserCard";
import { useStore } from "@/store/application";
import { MODAL_TYPES } from "@/store/modals";
import { SIDEBAR_TYPES } from "@/store/sidebar";
import { SearchBar } from "@/components/search-bar/SearchBar";
import { Form } from "@/components/form/Form";
import { SPECIAL_FIELD_TYPES } from "@/components/field/Field";
import { Widget, WidgetTable } from "./WidgetTable";
import { useWidgetView } from "./useWidgetView";
import { User } from "../users/UserTable";

export interface WidgetViewProps {
  user: User;
}

export const WidgetView: React.FC<WidgetViewProps> = ({ user }) => {
  const { i } = useIcon();
  const searchbarRef = React.useRef<HTMLInputElement>(null);

  const {
    searchTerm,
    setSearchTerm,
    handleChange,
    currentWidgets,
    openBulkEdit,
    handleSelect,
    selectedWidgetIds,
    handleSelectAll,
    handleAddWidgets,
    actions,
  } = useWidgetView({
    user,
  });

  return (
    <FlexGrid direction="column">
      <FlexRow grow={0} gap={space(0.25)}>
        <FlexColumn>
          <SearchBar
            ref={searchbarRef}
            onChange={setSearchTerm}
            placeholder="Look for a widget..."
          />
        </FlexColumn>
        <FlexColumn />
        <FlexColumn grow={0} direction="row">
          <Button
            onClick={() => openBulkEdit(user)}
            isRounded={false}
            hasBorder={false}
            disabled={selectedWidgetIds.length < 2}
          >
            {selectedWidgetIds.length > 1
              ? `Bulk Actions (${selectedWidgetIds.length})`
              : `Bulk Actions`}
          </Button>
          <Button
            onClick={() => handleAddWidgets(user)}
            isRounded={false}
            hasBorder={false}
          >
            Assign Widgets
          </Button>
          {selectedWidgetIds.length > 1 && (
            <Button
              onClick={console.log}
              isRounded={false}
              hasBorder={false}
              variant="danger"
              disabled={selectedWidgetIds.length < 2}
            >
              {`Remove Widgets`}
            </Button>
          )}
        </FlexColumn>
      </FlexRow>
      <FlexRow
        style={{
          borderTop: `1px solid var(--color-border-2)`,
        }}
      >
        <WidgetTable
          actions={actions}
          widgets={currentWidgets}
          onChange={handleChange}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
          selectedWidgetIds={selectedWidgetIds}
          defaultFilter={{
            name: {
              type: "search",
              values: [searchTerm],
            },
          }}
        />
      </FlexRow>
    </FlexGrid>
  );
};
