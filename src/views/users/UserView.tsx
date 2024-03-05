"use client";
import { Button } from "@/components/button/Button";
import { FlexColumn, FlexGrid, FlexRow } from "@/components/flex-grid/FlexGrid";
import { useIcon } from "@/components/icon/useIcon";
import * as React from "react";
import { User, UserTable } from "./UserTable";
import { SearchBar } from "@/components/search-bar/SearchBar";
import { useUserView } from "./useUserView";

interface UserViewProps {
  users: User[];
}

export const UserView: React.FC<UserViewProps> = ({ users }) => {
  const { i } = useIcon();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const searchbarRef = React.useRef<HTMLInputElement>(null);

  console.log(users);

  const {
    handleAddUser,
    openBulkEdit,
    selectedUserIds,
    handleSelect,
    handleSelectAll,
    actions,
  } = useUserView({ users });

  return (
    <FlexGrid direction="column">
      <FlexRow grow={0}>
        <FlexColumn grow={0}>
          <SearchBar
            ref={searchbarRef}
            onChange={setSearchTerm}
            placeholder="Look for a user..."
          />
        </FlexColumn>
        <FlexColumn />
        <FlexColumn grow={0} direction="row">
          <Button
            disabled={selectedUserIds.length < 2}
            onClick={openBulkEdit}
            hasBorder={false}
            isRounded={false}
          >
            Bulk actions
          </Button>
          <Button onClick={handleAddUser} hasBorder={false} isRounded={false}>
            Add User
          </Button>
        </FlexColumn>
      </FlexRow>
      <FlexRow
        style={{
          borderTop: `1px solid var(--color-border-2)`,
        }}
      >
        <UserTable
          actions={actions}
          users={users}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
          selectedUserIds={selectedUserIds}
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
