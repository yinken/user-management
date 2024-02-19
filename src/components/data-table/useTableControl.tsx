import * as React from "react";
import { Filters } from "./Filter";
import { useStore } from "@/store/application";
import { ColumnOrder } from "@/store/tables";

export const useTableControl = (
  tableId: string,
  filters: Filters,
  setFilters: (filters: Filters) => void
) => {
  const saveCustomFilter = useStore.use.saveCustomFilter();
  const deleteCustomFilter = useStore.use.deleteCustomFilter();
  const loadCustomFilter = useStore.use.loadCustomFilter();
  const renameCustomFilter = useStore.use.renameCustomFilter();
  const setTable = useStore.use.setTable();
  const overwriteCustomFilter = useStore.use.overwriteCustomFilter();
  const [showFilters, setShowFilters] = React.useState(true);
  const [showEditColumns, setShowEditColumns] = React.useState(true);
  const [activeCustomFilter, setActiveCustomFilter] = React.useState("");
  const filterPanelStates = useStore.use.filterPanelStates();
  const toggleFilterPanelState = useStore.use.toggleFilterPanelState();

  const currentTable = React.useMemo(() => {
    let table = {
      customFilters: {},
      activeCustomFilter: "",
      columnOrder: [] as ColumnOrder[],
    };
    setTable(tableId, table);
    return table;
  }, [tableId, setTable]);

  const { customFilters: savedFilters } = currentTable;

  const hasActiveCustomFilterChanged = React.useMemo(() => {
    const f = activeCustomFilter as keyof typeof savedFilters;
    if (!f) {
      return false;
    }
    const activeSavedFilter = savedFilters[f];

    if (!activeSavedFilter) {
      return false;
    }

    return JSON.stringify(activeSavedFilter) !== JSON.stringify(filters);
  }, [activeCustomFilter, filters, savedFilters]);

  const saveFilter = React.useCallback(
    (filters: Filters, name: string) => {
      saveCustomFilter(tableId, name, filters);
    },
    [saveCustomFilter, tableId]
  );

  const deleteFilter = React.useCallback(
    (name: string) => {
      deleteCustomFilter(tableId, name);
    },
    [deleteCustomFilter, tableId]
  );

  const loadFilter = React.useCallback(
    (name: string) => {
      const n = name as keyof typeof savedFilters;
      loadCustomFilter(tableId, name);
      setFilters(savedFilters[n]);
    },
    [loadCustomFilter, savedFilters, setFilters, tableId]
  );

  const renameSavedFilter = React.useCallback(
    (oldName: string, newName: string) => {
      renameCustomFilter(tableId, oldName, newName);
    },
    [renameCustomFilter, tableId]
  );

  const overwriteFilter = React.useCallback(
    (name: string) => {
      overwriteCustomFilter(tableId, name, filters);
    },
    [filters, overwriteCustomFilter, tableId]
  );

  return {
    showFilters,
    setShowFilters,
    showEditColumns,
    setShowEditColumns,
    filters,
    setFilters,
    saveFilter,
    deleteFilter,
    loadFilter,
    renameSavedFilter,
    overwriteFilter,
    hasActiveCustomFilterChanged,
    setActiveCustomFilter,
    activeCustomFilter,
    savedFilters,
    filterPanelStates,
    toggleFilterPanelState,
  };
};
