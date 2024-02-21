import { create, StoreApi, UseBoundStore } from "zustand";
import { ModalStore, modalStore } from "./modals";
import { TableStore, tableStore } from "./tables";
import { SidebarStore, sidebarStore } from "./sidebar";

// This is the top level store for the application
// We use is to combine the sub-stores
// You can access it from any component using the useApplicationStore hook
export type ApplicationStore = ModalStore & TableStore & SidebarStore;

export const applicationStore = (
  set: StoreApi<ApplicationStore>["setState"],
  get: StoreApi<ApplicationStore>["getState"]
): ApplicationStore => {
  return {
    ...modalStore(set),
    ...tableStore(set, get),
    ...sidebarStore(set),
  };
};
export const useApplicationStore = create<ApplicationStore>()(applicationStore);

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export const useStore = createSelectors(useApplicationStore);
