import { isEmpty } from "lodash";
import * as React from "react";
import { DataTableRow, Sort } from "./DataTable2";
import { DataTableColumn } from "./TH";
import { useStore } from "@/store/application";
import { useScrolling } from "@/hooks/useScrolling";

type Params = {
  tableRef?: React.RefObject<HTMLElement>;
  tableContainerRef?: React.RefObject<HTMLElement>;
  onSelect?: (id: string) => void;
  defaultFilter?: Record<
    string,
    {
      type: string;
      values: string[];
    }
  >;
  defaultSort?: Sort;
  selectedRowId?: string;
  columns: DataTableColumn[];
  rows: DataTableRow[];
  tableId: string;
};

export const useDataTable = (params: Params) => {
  const {
    onSelect,
    defaultFilter,
    defaultSort,
    selectedRowId,
    tableRef,
    columns,
    rows,
    tableId,
    tableContainerRef,
  } = params;
  const tables = useStore.use.tables();
  const [openFilter, setOpenFilter] = React.useState("");
  const [filters, setFilters] = React.useState<
    Record<
      string,
      {
        type: string;
        values: string[];
      }
    >
  >({});

  const [organizedColumns, setOrganizedColumns] = React.useState<{
    fixed: DataTableColumn[];
    free: DataTableColumn[];
  }>({ fixed: [], free: [] });

  const [sort, setSort] = React.useState<Sort>(
    defaultSort || {
      columnName: columns[0].name,
      direction: "asc",
    }
  );
  const [rowsPerPage, setRowsPerPage] = React.useState<25 | 50 | 100 | 500>(25);
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);
  const [hiddenColumns, setHiddenColumns] = React.useState<DataTableColumn[]>(
    []
  );

  const currentTableOrder = React.useMemo(() => {
    const table = tables[tableId];
    if (!table) return [];
    return table.columnOrder;
  }, [tables, tableId]);

  const { scrollPosition } = useScrolling({
    element: tableContainerRef?.current,
  });

  React.useEffect(() => {
    const container = tableContainerRef?.current;
    const frozenTable = container?.querySelector(".is-frozen");
    if (!frozenTable) {
      return;
    }
    if (scrollPosition.isLeft) {
      frozenTable.classList.add("is-left");
    } else {
      frozenTable.classList.remove("is-left");
    }
  }, [scrollPosition.isLeft, tableContainerRef]);

  React.useEffect(() => {
    const organizedColumns = columns.reduce(
      (acc, column) => {
        if (
          column.fixed &&
          !hiddenColumns.map((c) => c.name).includes(column.name)
        ) {
          acc.fixed.push(column);
        } else if (!hiddenColumns.map((c) => c.name).includes(column.name)) {
          acc.free.push(column);
        }

        return {
          fixed: acc.fixed.sort((a, b) => {
            const aIndex = currentTableOrder.findIndex(
              (column) => column.name === a.name
            );
            const bIndex = currentTableOrder.findIndex(
              (column) => column.name === b.name
            );
            return aIndex - bIndex;
          }),
          free: acc.free.sort((a, b) => {
            const aIndex = currentTableOrder.findIndex(
              (column) => column.name === a.name
            );
            const bIndex = currentTableOrder.findIndex(
              (column) => column.name === b.name
            );
            return aIndex - bIndex;
          }),
        };
      },
      { fixed: [], free: [] } as {
        fixed: DataTableColumn[];
        free: DataTableColumn[];
      }
    );

    setOrganizedColumns(organizedColumns);
  }, [columns, currentTableOrder, hiddenColumns]);

  const toggleColumnFreeze = (columnName: string) => {
    const combinedColumns = [
      ...organizedColumns.fixed,
      ...organizedColumns.free,
    ];
    const column = combinedColumns.find((column) => column.name === columnName);
    if (!column) return;
    const updatedColumns = combinedColumns.map((column) => {
      if (column.name === columnName) {
        return {
          ...column,
          fixed: !column.fixed,
        };
      }
      return column;
    });
    setOrganizedColumns({
      fixed: updatedColumns.filter((column) => column.fixed),
      free: updatedColumns.filter((column) => !column.fixed),
    });
  };

  React.useEffect(() => {
    if (defaultFilter && !isEmpty(defaultFilter)) {
      setFilters(defaultFilter);
    } else {
      setFilters({});
    }
  }, [defaultFilter, setFilters]);

  const scrollToRow = (id: string) => {
    const row = document.getElementById(`row_${id}`);

    if (row) {
      row.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  };

  React.useEffect(() => {
    if (selectedRowId) {
      scrollToRow(selectedRowId);
    }
  }, [selectedRowId]);

  const resizeFrozenRows = React.useCallback(() => {
    const frozenRows = document.querySelectorAll<HTMLElement>(
      ".data-table__frozen-row"
    );
    frozenRows.forEach((row) => {
      const unfrozenRow = document.getElementById(
        `row_${row.id.split("_")[1]}`
      );
      const cellHeight = unfrozenRow?.getBoundingClientRect().height;
      row.style.height = `${cellHeight}px`;
    });
  }, []);

  React.useEffect(() => {
    if (!tableRef?.current) return;
    const observer = new ResizeObserver(resizeFrozenRows);
    observer.observe(tableRef.current as HTMLElement);

    return () => {
      observer.disconnect();
    };
  });

  const parsedRows = React.useMemo(() => {
    const sorted = rows.sort((a, b) => {
      const aValue = a.values[sort.columnName].sortValue;
      const bValue = b.values[sort.columnName].sortValue;

      if (aValue < bValue) {
        return sort.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sort.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    const filteredAndSorted = sorted.filter((row) => {
      return Object.entries(filters).every(([columnName, filter]) => {
        const { type, values } = filter;
        if (type === "search") {
          const value = row.values[columnName].sortValue as string;
          const rowValue = value.toLowerCase();
          return rowValue.includes(values[0].toLowerCase());
        }
        if (type === "select") {
          const value = row.values[columnName].sortValue as string;
          const rowValue = value.toLowerCase();
          const compareValues = values.map((value) => value.toLowerCase());
          return !compareValues.includes(rowValue);
        }
        if (type === "number") {
          const rowValue = Number(row.values[columnName].sortValue);
          const compareValues = values.map((value) => Number(value));

          return rowValue >= compareValues[0] && rowValue <= compareValues[1];
        }
        if (type === "date") {
          const rowValue = row.values[columnName].sortValue as number;
          const compareValues = values.map((value) => Number(value));

          return rowValue >= compareValues[0] && rowValue <= compareValues[1];
        }
      });
    });

    const paginated = filteredAndSorted.slice(
      currentPageIndex * rowsPerPage,
      (currentPageIndex + 1) * rowsPerPage
    );

    return {
      sorted,
      filteredAndSorted,
      paginated,
    };
  }, [
    currentPageIndex,
    rows,
    filters,
    rowsPerPage,
    sort.columnName,
    sort.direction,
  ]);

  const totalPages = Math.ceil(
    parsedRows.filteredAndSorted.length / rowsPerPage
  );

  const toggleSort = (columnName: string) => {
    if (sort.columnName === columnName) {
      setSort({
        columnName,
        direction: sort.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSort({
        columnName,
        direction: "asc",
      });
    }
  };

  const toggleFilter = (columnName: string) => {
    if (openFilter === columnName) {
      setOpenFilter("");
    } else {
      setOpenFilter(columnName);
    }
  };

  const applyFilter = (columnName: string, value: string, type: string) => {
    const currentColumnFilters = filters[columnName] || {};
    if (value === "removeAll") {
      const currentFilters = { ...filters };
      delete currentFilters[columnName];
      setFilters(currentFilters);
      return;
    }
    if (type === "search") {
      setFilters({
        ...filters,
        [columnName]: {
          type,
          values: [value],
        },
      });
    }
    if (type === "select") {
      const currentValues = currentColumnFilters.values || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      setFilters({
        ...filters,
        [columnName]: {
          type,
          values: newValues,
        },
      });
    }
    if (type === "number") {
      const parsedValues = value.split(",");
      setFilters({
        ...filters,
        [columnName]: {
          type,
          values: parsedValues,
        },
      });
    }
    if (type === "date") {
      const parsedValues = value.split(",");
      setFilters({
        ...filters,
        [columnName]: {
          type,
          values: parsedValues,
        },
      });
    }
  };

  const resetFilters = () => {
    setFilters({});
  };

  const handleSelect = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    onSelect?.(id);
  };

  const handlePageSelect = (index: number) => {
    setCurrentPageIndex(index);
  };

  const handleRowsPerPageChange = (rowsPerPage: 25 | 50 | 100 | 500) => {
    setCurrentPageIndex(0);
    setRowsPerPage(rowsPerPage);
  };

  const toggleColumnVisibility = (name: string) => {
    const currentColumn = columns.find((column) => column.name === name);
    if (hiddenColumns.map((c) => c.name).includes(name)) {
      setHiddenColumns(hiddenColumns.filter((column) => column.name !== name));
    } else if (currentColumn) {
      setHiddenColumns([...hiddenColumns, currentColumn]);
    }
  };

  return {
    openFilter,
    filters,
    sort,
    rowsPerPage,
    currentPageIndex,
    toggleSort,
    applyFilter,
    setFilters,
    resetFilters,
    toggleFilter,
    handleSelect,
    handlePageSelect,
    handleRowsPerPageChange,
    fixedColumns: organizedColumns.fixed,
    freeColumns: organizedColumns.free,
    toggleColumnFreeze,
    parsedRows,
    totalPages,
    hiddenColumns,
    toggleColumnVisibility,
  };
};
