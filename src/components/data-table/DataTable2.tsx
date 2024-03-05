"use client";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../button/Button";
import { FlexColumn, FlexRow, FlexGrid } from "../flex-grid/FlexGrid";
import { useIcon, ICON } from "../icon/useIcon";
import Resizer from "../resizer/Resizer";
import { StatusMessage } from "../status-message/StatusMessage";
import { StyledDataTable } from "./DataTable2.css";
import { Filters } from "./Filter";
import { TD } from "./TD";
import { DataTableColumn, TH } from "./TH";
import { TableControl } from "./TableControl";
import { TableFooter } from "./TableFooter";
import { useDataTable } from "./useDataTable";
import { space } from "@/utils/space";

export type DataTableRow = {
  id: string;
  values: Record<
    string,
    { displayValue: unknown; sortValue: string | number | boolean }
  >;
};

interface DataTableProps {
  label?: {
    singular: string;
    plural: string;
  };
  selectedRowId?: string;
  onSelect?: (id: string) => void;
  rows: DataTableRow[];
  columns: DataTableColumn[];
  defaultFilter?: Filters;
  defaultSort?: Sort;
  searchTerm?: string;
  contractBy?: number;
  showColumnControls?: boolean;
  showFilterControls?: boolean;
  showFooter?: boolean;
  tableId: string;
  isLoading?: boolean;
}

export type Sort = {
  columnName: string;
  direction: "asc" | "desc";
};

export const DataTable: React.FC<DataTableProps> = ({
  rows,
  columns,
  onSelect,
  selectedRowId,
  defaultFilter,
  defaultSort,
  label,
  searchTerm = "",
  contractBy = 0,
  showColumnControls = true,
  showFilterControls = true,
  showFooter = true,
  tableId,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const { i } = useIcon();
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const tableRef = React.useRef<HTMLTableElement>(null);
  const controlPanelRef = React.useRef<HTMLDivElement>(null);

  const {
    filters,
    sort,
    rowsPerPage,
    currentPageIndex,
    toggleSort,
    setFilters,
    applyFilter,
    resetFilters,
    handleSelect,
    handlePageSelect,
    handleRowsPerPageChange,
    freeColumns,
    fixedColumns,
    hiddenColumns,
    toggleFilter,
    toggleColumnFreeze,
    toggleColumnVisibility,
    parsedRows,
    totalPages,
  } = useDataTable({
    tableId,
    onSelect,
    defaultFilter,
    defaultSort,
    selectedRowId,
    tableRef: tableRef,
    paginate: showFooter,
    tableContainerRef: tableContainerRef,
    columns: columns,
    rows: rows,
  });

  React.useEffect(() => {
    if (searchTerm?.length > 2) {
      const rows = document.querySelectorAll(".data-table__row");
      rows.forEach((row) => {
        const cells = row.querySelectorAll(".data-table__cell-content");

        cells.forEach((cell) => {
          if (
            cell.textContent?.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            const cellText = cell.textContent || "";
            const regex = new RegExp(searchTerm, "gi");
            const replacement = cellText.replace(
              regex,
              `<mark>${searchTerm}</mark>`,
            );
            cell.innerHTML = replacement;
          } else {
            cell.innerHTML = cell.textContent || "";
          }
        });
      });
    } else {
      const rows = document.querySelectorAll(".data-table__row");
      rows.forEach((row) => {
        const cells = row.querySelectorAll(".data-table__cell-content");

        cells.forEach((cell) => {
          cell.innerHTML = cell.textContent || "";
        });
      });
    }
  }, [searchTerm]);

  const handleControlPanelResize = (change: number) => {
    const column = controlPanelRef.current;
    if (column) {
      column.style.flexBasis = change + "px";
    }
  };

  return (
    <StyledDataTable
      $isSelectable={Boolean(onSelect)}
      $contractBy={contractBy}
      direction="row"
      ref={tableRef}
    >
      {isLoading && (
        <StatusMessage
          isVisible={true}
          message={t("Loading...") as string}
          icons={[
            i(ICON.LOADING, {
              isSpinning: true,
              size: "2x",
            }),
          ]}
        />
      )}
      {(showColumnControls || showFilterControls) && (
        <FlexColumn
          ref={controlPanelRef}
          grow={0}
          style={{
            overflowY: "auto",
            width: "300px",
            borderRight: `1px solid var(--color-border-2)`,
            background: "var(--bg-base-2)",
            position: "relative",
          }}
        >
          <TableControl
            columns={columns}
            rows={rows}
            filters={filters}
            hiddenColumns={hiddenColumns}
            fixedColumns={fixedColumns}
            toggleFilter={toggleFilter}
            toggleColumnFreeze={toggleColumnFreeze}
            toggleColumnVisibility={toggleColumnVisibility}
            applyFilter={applyFilter}
            setFilters={setFilters}
            showColumnControls={showColumnControls}
            showFilterControls={showFilterControls}
            tableId={tableId}
          />
          <Resizer
            axis="y"
            position={{ x: "right", y: "top" }}
            onChange={(change) => {
              handleControlPanelResize(change);
            }}
            size={{
              base: 300,
              min: 200,
              max: 400,
            }}
          />
        </FlexColumn>
      )}
      <FlexColumn>
        <FlexRow
          grow={1}
          ref={tableContainerRef}
          style={{
            overflow: "auto",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", position: "absolute", width: "100%" }}>
            <table className="is-frozen">
              <thead>
                {fixedColumns.length > 0 && (
                  <tr>
                    {fixedColumns.map((column, index) => {
                      return (
                        <TH
                          key={index}
                          index={index}
                          column={column}
                          filters={filters}
                          sort={sort}
                          applyFilter={applyFilter}
                          toggleSort={toggleSort}
                        />
                      );
                    })}
                  </tr>
                )}
              </thead>
              <tbody>
                {parsedRows.paginated.map((row, index) => {
                  const classNames = ["data-table__frozen-row"];
                  if (selectedRowId === row.id) {
                    classNames.push("is-selected");
                  }
                  return (
                    <tr
                      key={index}
                      id={`frozen-row_${row.id}`}
                      className={classNames.join(" ")}
                      onClick={() => {
                        if (onSelect) {
                          onSelect(row.id);
                        }
                      }}
                    >
                      {fixedColumns.map((column, index) => {
                        let cell = row.values[column.name]?.displayValue;
                        if (column.template && cell) {
                          cell = column.template(cell);
                        }
                        const c = cell as React.ReactNode;

                        return (
                          <TD key={index} actions={column.actions}>
                            {c}
                          </TD>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr
                  style={{
                    position: "sticky",
                    bottom: 0,
                    backgroundColor: "var(--bg-base-3)",
                    zIndex: 12,
                    minHeight: "32px",
                  }}
                >
                  {fixedColumns.map((column, index) => {
                    const data = parsedRows.paginated.map((r) => {
                      return r.values[column.name].sortValue;
                    });
                    if (column.footerTemplate && data) {
                      const d = data as number[];
                      const cell = column.footerTemplate(d);
                      const c = cell as React.ReactNode;
                      return (
                        <th
                          key={index}
                          style={{
                            backgroundColor: "var(--bg-base-2)",
                            height: "32px",
                          }}
                        >
                          {c}
                        </th>
                      );
                    }
                    return (
                      <th
                        key={index}
                        style={{
                          backgroundColor: "var(--bg-base-2)",
                          height: "32px",
                        }}
                      />
                    );
                  })}
                </tr>
              </tfoot>
            </table>
            <table>
              <thead>
                <tr>
                  {freeColumns.map((column, index) => {
                    return (
                      <TH
                        key={index}
                        index={index}
                        column={column}
                        filters={filters}
                        sort={sort}
                        applyFilter={applyFilter}
                        toggleSort={toggleSort}
                      />
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {parsedRows.paginated.map((row) => {
                  const classNames = ["data-table__row"];
                  if (selectedRowId === row.id) {
                    classNames.push("is-selected");
                  }
                  return (
                    <tr
                      id={`row_${row.id}`}
                      key={row.id}
                      onClick={(event) => handleSelect(event, row.id)}
                      className={classNames.join(" ")}
                    >
                      {freeColumns.map((column, index) => {
                        let cell = row.values[column.name]?.displayValue;
                        if (column.template && cell) {
                          cell = column.template(cell);
                        }
                        const c = cell as React.ReactNode;

                        return (
                          <TD key={index} actions={column.actions}>
                            {c ? c : null}
                          </TD>
                        );
                      })}
                    </tr>
                  );
                })}
                {parsedRows.paginated.length === 0 && (
                  <tr>
                    <td colSpan={columns.length}>
                      <FlexGrid
                        className="status-message"
                        gap={space(0.25)}
                        alignItems="center"
                      >
                        <FlexColumn grow={0} justifyContent="center">
                          {t("No results found")}
                        </FlexColumn>
                        <FlexColumn grow={0} justifyContent="center">
                          <Button
                            title={t("Remove filters") as string}
                            variant="tertiary"
                            hasBorder={false}
                            isSquare={true}
                            onClick={() => resetFilters()}
                          >
                            {i(ICON.REMOVE_FILTER)}
                          </Button>
                        </FlexColumn>
                      </FlexGrid>
                    </td>
                  </tr>
                )}
              </tbody>
              {columns.some((c) => Boolean(c.footerTemplate)) && (
                <tfoot
                  style={{
                    position: "sticky",
                    bottom: 0,
                    zIndex: 12,
                  }}
                >
                  <tr
                    style={{
                      backgroundColor: "var(--bg-base-2)",
                      borderRight: "1px solid var(--bg-base-3)",
                    }}
                  >
                    {freeColumns.map((column, index) => {
                      const data = parsedRows.paginated.map((r) => {
                        return r.values[column.name].sortValue;
                      });
                      if (column.footerTemplate && data) {
                        const d = data as number[];
                        const cell = column.footerTemplate(d);
                        const c = cell as React.ReactNode;
                        return (
                          <th
                            key={index}
                            style={{
                              backgroundColor: "var(--bg-base-2)",
                              borderRight: "1px solid var(--bg-base-3)",
                              height: "32px",
                            }}
                          >
                            {c}
                          </th>
                        );
                      }
                      return (
                        <th
                          style={{
                            backgroundColor: "var(--bg-base-2)",
                            borderRight: "1px solid var(--bg-base-3)",
                            height: "32px",
                          }}
                          key={index}
                        />
                      );
                    })}
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </FlexRow>
        {showFooter && (
          <FlexRow grow={0}>
            <TableFooter
              currentRows={parsedRows.filteredAndSorted.length}
              totalRows={rows.length}
              label={label}
              currentPageIndex={currentPageIndex}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              handlePageSelect={handlePageSelect}
              handleRowsPerPageChange={handleRowsPerPageChange}
            />
          </FlexRow>
        )}
      </FlexColumn>
    </StyledDataTable>
  );
};
