import * as React from "react";
import styled from "styled-components";
import { Button } from "../button/Button";
import { FlexColumn, FlexGrid } from "../flex-grid/FlexGrid";
import { Sort } from "./DataTable2";
import { Filters } from "./Filter";
import { space } from "@/utils/space";
import { ICON, useIcon } from "../icon/useIcon";
import { Text } from "../text/Text";
import { colors } from "@/utils/colors";

const StyledTH = styled.th<{ minWidth?: number; fixed?: boolean }>`
  font-weight: normal;
  z-index: 20;
  margin: 0;
  position: sticky;
  top: 0;
  ${({ fixed }) => (fixed ? "left: 0" : "")};
  background-color: var(--bg-base-2);
  border-right: 1px solid var(--bg-base-3);
  transition: min-width 0.2s ease-in-out;
  min-width: ${({ minWidth }) => (minWidth ? `${minWidth}px` : "auto")};
  vertical-align: middle;
  .column-label {
    &:first-child {
      padding-left: ${space(0.25)};
    }
  }
  .is-sorted {
    text-decoration: underline;
  }
`;

interface THProps {
  column: DataTableColumn;
  index: number;
  filters: Filters;
  sort: Sort;
  toggleSort: (key: string) => void;
  applyFilter: (key: string, value: string, type: string) => void;
  actions?: CellAction[];
}

export type CellAction = {
  name: string;
  label: string;
  icon: ICON;
  onClick: (id: string) => void;
};

export type DataTableColumn = {
  name: string;
  label: string;
  template?: (value: unknown) => React.ReactNode;
  headerTemplate?: React.ReactNode;
  footerTemplate?: (data: string[] | number[]) => React.ReactNode;
  sortable?: boolean;
  fixed?: boolean;
  filter?: string;
  minWidth?: number;
  actions?: CellAction[];
};

export const TH: React.FC<THProps> = ({
  column,
  index,
  filters,
  sort,
  toggleSort,
  applyFilter,
  actions,
}) => {
  const { i } = useIcon();
  const { name, label, sortable, fixed, filter, minWidth, headerTemplate } =
    column;

  const sortIcon = React.useMemo(() => {
    if (!sortable) {
      return null;
    }
    if (sort.columnName === name) {
      return i(sort.direction === "asc" ? ICON.SORT_ASC : ICON.SORT_DESC, {
        library: "fas",
      });
    }
    if (sort.columnName !== name) {
      return i(ICON.SORT);
    }
  }, [sortable, sort.columnName, sort.direction, name, i]);

  return (
    <StyledTH key={index} id={name} minWidth={minWidth} fixed={fixed}>
      <FlexGrid gap={space(0.125)} alignItems="center">
        <FlexColumn grow={1}>
          {headerTemplate ? (
            headerTemplate
          ) : (
            <Button
              onClick={sortable ? () => toggleSort(name) : undefined}
              variant="tertiary"
              hasBorder={false}
              isRounded={false}
              expand={true}
              align={"left"}
            >
              {sortIcon}
              <Text
                bold
                ellipsis
                className={sort.columnName === name ? "is-sorted" : ""}
              >
                {label}
              </Text>
            </Button>
          )}
        </FlexColumn>

        {actions?.map((action, index) => (
          <FlexColumn grow={0} key={index}>
            <Button
              variant="tertiary"
              hasBorder={false}
              onClick={() => action.onClick(name)}
              isRounded={false}
            >
              {i(action.icon)}
            </Button>
          </FlexColumn>
        ))}

        {filter && filters[column.name]?.values.length ? (
          <FlexColumn grow={0}>
            <Button
              variant="tertiary"
              hasBorder={false}
              onClick={() => applyFilter(name, "removeAll", filter)}
              isRounded={false}
            >
              {i(ICON.FILTER, {
                library: filters[column.name]?.values.length ? "fas" : "fal",
                color: filters[column.name]?.values.length
                  ? colors.red
                  : undefined,
              })}
            </Button>
          </FlexColumn>
        ) : null}
      </FlexGrid>
    </StyledTH>
  );
};
