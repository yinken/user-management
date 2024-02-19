import { Filters } from 'hubv2/common/data-table/Filter';
import { StoreApi } from 'zustand';
import { ApplicationStore } from './application';

export type TableState = {
  activeCustomFilter: string;
  customFilters: Record<string, Filters>;
  columnOrder: ColumnOrder[];
};

export type ColumnOrder = {
  name: string;
  index: number;
};

export interface TableStore {
  tables: Record<string, TableState>;
  saveCustomFilter: (
    tableId: string,
    filterId: string,
    filter: Filters
  ) => void;
  filterPanelStates: Record<string, boolean>;
  setTable: (tableId: string, tableState: TableState) => void;
  loadCustomFilter: (tableId: string, filterId: string) => Filters | undefined;
  deleteCustomFilter: (tableId: string, filterId: string) => void;
  renameCustomFilter: (
    tableId: string,
    filterId: string,
    newFilterId: string
  ) => void;
  overwriteCustomFilter: (
    tableId: string,
    filterId: string,
    filter: Filters
  ) => void;
  getTableById: (tableId: string) => {
    activeCustomFilter: string;
    customFilters: Record<string, Filters>;
  };
  setActiveCustomFilter: (tableId: string, filterId: string) => void;
  toggleFilterPanelState: (filterName: string) => void;
  setFilterPanelStates: (filterStates: Record<string, boolean>) => void;
  setColumnOrder: (tableId: string, columnOrder: ColumnOrder[]) => void;
}

export const tableStore = (
  set: StoreApi<TableStore>['setState'],
  get: StoreApi<ApplicationStore>['getState']
): TableStore => ({
  tables: {},
  filterPanelStates: {},
  saveCustomFilter: (tableId, filterId, filter) => {
    const { tables, updateProperties, updateRemoteStorage } = get();
    const newTables = {
      ...tables,
      [tableId]: {
        ...tables[tableId],
        customFilters: {
          ...tables[tableId]?.customFilters,
          [filterId]: filter,
        },
      },
    };
    set(() => ({
      tables: newTables,
    }));
    updateProperties((properties) => ({
      ...properties,
      tables: newTables,
    }));

    updateRemoteStorage();
  },
  setTable: (tableId, state) => {
    const { tables } = get();
    const newTables = {
      ...tables,
      [tableId]: state,
    };
    set(() => ({
      tables: newTables,
    }));
  },
  loadCustomFilter: (tableId, filterId) => {
    const { tables } = get();
    set(() => ({
      tables: {
        ...tables,
        [tableId]: {
          ...tables[tableId],
        },
      },
    }));
    return tables[tableId]?.customFilters[filterId];
  },
  deleteCustomFilter: (tableId, filterId) => {
    const { tables, updateProperties, updateRemoteStorage } = get();
    const filtersToDelete = tables[tableId]?.customFilters;
    if (filtersToDelete) {
      const { [filterId]: _, ...customFilters } = filtersToDelete;
      const newTables = {
        ...tables,
        [tableId]: {
          ...tables[tableId],
          customFilters,
        },
      };
      set(() => ({
        tables: newTables,
      }));

      updateProperties((properties) => ({
        ...properties,
        tables: newTables,
      }));

      updateRemoteStorage();
    }
  },
  renameCustomFilter: (tableId, filterId, newFilterId) => {
    const { tables, updateProperties, updateRemoteStorage } = get();
    const filtersToRename = tables[tableId]?.customFilters;
    if (filtersToRename) {
      const { [filterId]: filter, ...customFilters } = filtersToRename;
      const newTables = {
        ...tables,
        [tableId]: {
          ...tables[tableId],
          customFilters: {
            ...customFilters,
            [newFilterId]: filter,
          },
        },
      };
      set(() => ({
        tables: newTables,
      }));

      updateProperties((properties) => ({
        ...properties,
        tables: newTables,
      }));

      updateRemoteStorage();
    }
  },
  overwriteCustomFilter: (tableId, filterId, filter) => {
    const { tables, updateProperties, updateRemoteStorage } = get();

    const newTables = {
      ...tables,
      [tableId]: {
        ...tables[tableId],
        customFilters: {
          ...tables[tableId].customFilters,
          [filterId]: filter,
        },
      },
    };
    set(() => ({
      tables: newTables,
    }));

    updateProperties((properties) => ({
      ...properties,
      tables: newTables,
    }));

    updateRemoteStorage();
  },
  getTableById: (tableId) => {
    const { properties } = get();
    const tables = properties.tables as Record<string, TableState>;
    return tables[tableId] ?? {};
  },
  setActiveCustomFilter: (tableId, filterId) => {
    const { tables } = get();
    set(() => ({
      tables: {
        ...tables,
        [tableId]: {
          ...tables[tableId],
          activeCustomFilter: filterId,
        },
      },
    }));
  },

  toggleFilterPanelState: (detailName: string) => {
    const { filterPanelStates, updateProperties, updateRemoteStorage } = get();

    const newStates = {
      ...filterPanelStates,
      [detailName]: !filterPanelStates[detailName],
    };
    set(() => ({
      filterPanelStates: newStates,
    }));

    updateProperties((properties) => ({
      ...properties,
      filterPanelStates: newStates,
    }));

    updateRemoteStorage();
  },
  setFilterPanelStates: (filterStates: Record<string, boolean>) => {
    set(() => ({
      filterPanelStates: {
        ...filterStates,
      },
    }));
  },

  setColumnOrder: (tableId, columnOrder) => {
    const { tables, updateProperties, updateRemoteStorage } = get();
    const newTables = {
      ...tables,
      [tableId]: {
        ...tables[tableId],
        columnOrder,
      },
    };
    set(() => ({
      tables: newTables,
    }));
    updateProperties((properties) => ({
      ...properties,
      tables: newTables,
    }));

    updateRemoteStorage();
  },
});
