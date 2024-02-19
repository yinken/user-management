import styled from "styled-components";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Accordion } from "../accordion/Accordion";
import { Button } from "../button/Button";
import { FlexColumn, FlexGrid, FlexRow } from "../flex-grid/FlexGrid";
import { DataTableRow } from "./DataTable2";
import { Filter, Filters } from "./Filter";
import { DataTableColumn } from "./TH";
import { useTableControl } from "./useTableControl";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { ICON, useIcon } from "../icon/useIcon";
import { useStore } from "@/store/application";
import { space } from "@/utils/space";
import { Text } from "../text/Text";

interface TableControlProps {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  filters: Filters;
  applyFilter: (columnName: string, value: string, type: string) => void;
  setFilters: (filters: Filters) => void;
  toggleFilter: (key: string) => void;
  toggleColumnFreeze: (key: string) => void;
  hiddenColumns: DataTableColumn[];
  fixedColumns: DataTableColumn[];
  toggleColumnVisibility: (key: string) => void;
  showColumnControls?: boolean;
  showFilterControls?: boolean;
  tableId: string;
}

const StyledTableControl = styled(FlexGrid)`
  position: relative;
  .is-active {
    font-weight: bold;
  }
  .has-changed {
    font-style: italic;
  }
`;

export const TableControl: React.FC<TableControlProps> = ({
  columns,
  rows,
  filters,
  toggleFilter,
  toggleColumnFreeze,
  hiddenColumns,
  fixedColumns,
  toggleColumnVisibility,
  applyFilter,
  setFilters,
  showColumnControls = true,
  showFilterControls = true,
  tableId,
}) => {
  const { t } = useTranslation();
  const { i } = useIcon();
  const setColumnOrder = useStore.use.setColumnOrder();
  const [filterOrder, setFilterOrder] = React.useState<
    { name: string; index: number }[]
  >([]);

  const filtersMap = React.useMemo(() => {
    if (!columns) {
      return [];
    }
    const filters = columns.map((c, index) => {
      const filter = c;
      if (!filter) {
        return;
      }
      return {
        name: filter.name,
        index,
      };
    });
    return filters.filter((f) => f !== undefined) as {
      name: string;
      index: number;
    }[];
  }, [columns]);

  const {
    showFilters,
    showEditColumns,
    setShowEditColumns,
    saveFilter,
    savedFilters,
    filterPanelStates,
    toggleFilterPanelState,
  } = useTableControl(tableId, filters, setFilters);

  const filterComponents = React.useMemo(() => {
    if (!columns) {
      return [];
    }
    const items = filtersMap.map((_i, index) => {
      const column = columns[index];
      const isHidden = hiddenColumns
        .map((column) => column.name)
        .includes(column.name);

      const isFixed = fixedColumns
        .map((column) => column.name)
        .includes(column.name);

      const isFilterable = column.filter !== undefined;
      return {
        name: column.name,
        component: (
          <Accordion
            isOpen={filterPanelStates[column.name]}
            title={column.label}
            isGrabbable={true}
            toggleOpen={
              isFilterable
                ? () => toggleFilterPanelState(column.name)
                : undefined
            }
            inlineContent={
              <>
                <Button
                  variant="tertiary"
                  hasBorder={false}
                  isSquare={true}
                  onClick={() => toggleColumnVisibility(column.name)}
                >
                  {i(isHidden ? ICON.INVISIBLE : ICON.VISIBLE)}
                </Button>
                <Button
                  variant="tertiary"
                  hasBorder={false}
                  isSquare={true}
                  onClick={() => toggleColumnFreeze(column.name)}
                >
                  {i(isFixed ? ICON.LOCKED : ICON.UNLOCKED, {
                    library: isFixed ? "fas" : "fal",
                  })}
                </Button>
              </>
            }
          >
            <Filter
              align={"left"}
              type={column.filter || "text"}
              filterName={column.name}
              onChange={applyFilter}
              onVisibilityChange={toggleFilter}
              isVisible={true}
              currentFilters={filters}
              values={rows
                .map((row) => row.values[column.name].sortValue)
                .filter((value, index, self) => self.indexOf(value) === index)}
            />
          </Accordion>
        ),
      };
    });

    if (!filterOrder.length) {
      return items;
    }
    const sortedDetails = filterOrder.map((detail) => {
      const foundItem = items.find((d) => d?.name === detail.name);
      return foundItem;
    });
    return sortedDetails;
  }, [
    applyFilter,
    columns,
    filterOrder,
    filterPanelStates,
    filters,
    filtersMap,
    fixedColumns,
    hiddenColumns,
    i,
    rows,
    toggleColumnFreeze,
    toggleColumnVisibility,
    toggleFilter,
    toggleFilterPanelState,
  ]);

  React.useEffect(() => {
    if (!filtersMap.length) {
      return;
    }
    if (filterOrder.length) {
      return;
    }
    setFilterOrder(filtersMap);
  }, [filterOrder.length, filtersMap]);

  const handleDragEnd = React.useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }

      const items = Array.from(filterOrder ?? []);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setFilterOrder(items);
      setColumnOrder(tableId, items);
    },
    [filterOrder, setColumnOrder, tableId]
  );

  return (
    <StyledTableControl direction="column">
      {showFilterControls && (
        <FlexGrid direction="column" gap={space(0.25)}>
          <FlexRow
            style={{
              overflowY: "auto",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", inset: 0 }}>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="archive-filters">
                  {(provided, _snapshot) => {
                    return (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {filterComponents?.map((detail, index) => {
                          if (!detail) {
                            return null;
                          }
                          const { name, component } = detail;
                          return (
                            <Draggable
                              key={name}
                              draggableId={name}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                const transform =
                                  provided.draggableProps?.style?.transform;
                                if (
                                  transform &&
                                  provided.draggableProps.style
                                ) {
                                  const t = transform.split(",")[1];
                                  provided.draggableProps.style.transform =
                                    "translate(0px," + t;
                                }
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      ...provided.draggableProps.style,
                                      position: "static",
                                      zIndex: snapshot.isDragging ? 1000 : 0,
                                      cursor: "pointer",
                                      background: snapshot.isDragging
                                        ? "var(--bg-base-3)"
                                        : "transparent",
                                      borderBottom:
                                        "1px solid var(--color-border-2)",
                                    }}
                                  >
                                    {component}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </DragDropContext>
            </div>
          </FlexRow>

          {showFilters && (
            <FlexRow grow={0} alignItems="center">
              <FlexGrid direction="column">
                <FlexRow>
                  <FlexColumn>{t("Save filter")}</FlexColumn>
                  <FlexColumn shrink={0} grow={0}>
                    <Button
                      variant="tertiary"
                      hasBorder={false}
                      isSquare={true}
                      onClick={() => {
                        saveFilter(
                          filters,
                          `new_filter_${Object.keys(savedFilters).length + 1}`
                        );
                      }}
                    >
                      {i(ICON.NEW)}
                    </Button>
                  </FlexColumn>
                </FlexRow>
              </FlexGrid>
            </FlexRow>
          )}
        </FlexGrid>
      )}
      {showColumnControls && (
        <Accordion
          title={t("Columns")}
          icon={ICON.TABLE}
          isOpen={showEditColumns}
          toggleOpen={() => setShowEditColumns(!showEditColumns)}
        >
          <FlexGrid direction="column" gap={space(0.25)}>
            {showEditColumns &&
              columns.map((column, index) => {
                const isHidden = hiddenColumns
                  .map((column) => column.name)
                  .includes(column.name);

                const isFixed = fixedColumns
                  .map((column) => column.name)
                  .includes(column.name);

                const classNames = ["column-control"];
                if (isHidden) {
                  classNames.push("is-hidden");
                }
                if (isFixed) {
                  classNames.push("is-fixed");
                }
                return (
                  <FlexRow
                    grow={0}
                    key={index}
                    gap={space(0.25)}
                    alignItems="center"
                    style={{ padding: `0 ${space(0.5)}` }}
                    className={classNames.join(" ")}
                  >
                    <FlexColumn justifyContent="center">
                      <Text ellipsis> {column.label}</Text>
                    </FlexColumn>
                    <FlexColumn grow={0}>
                      <Button
                        variant="tertiary"
                        hasBorder={false}
                        isSquare={true}
                        onClick={() => toggleColumnFreeze(column.name)}
                      >
                        {i(isFixed ? ICON.LOCKED : ICON.UNLOCKED, {
                          library: isFixed ? "fas" : "fal",
                        })}
                      </Button>
                    </FlexColumn>
                    <FlexColumn grow={0} shrink={0}>
                      <Button
                        variant="tertiary"
                        hasBorder={false}
                        isSquare={true}
                        onClick={() => toggleColumnVisibility(column.name)}
                      >
                        {i(isHidden ? ICON.INVISIBLE : ICON.VISIBLE)}
                      </Button>
                    </FlexColumn>
                  </FlexRow>
                );
              })}
          </FlexGrid>
        </Accordion>
      )}
    </StyledTableControl>
  );
};
