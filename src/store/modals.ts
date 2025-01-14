import { StoreApi } from "zustand";


export enum MODAL_TYPES {
  ADD_USER = "ADD_USER",
  USER = "USER",
  BULK_EDIT_WIDGET = "BULK_EDIT_WIDGET",
  BULK_EDIT_USER = "BULK_EDIT_USER",
  ADD_WIDGETS = "ADD_WIDGETS",
}

export interface ModalStore {
  isOpen: boolean;
  setClosed: () => void;
  setOpen: () => void;
  toggleOpen: () => void;
  activeModal: MODAL_TYPES | null;
  setActiveModal: (
    modal: MODAL_TYPES | null,
    payload?: Record<string, unknown>
  ) => void;
  modalPayload: Record<string, unknown>;
}

export const modalStore = (
  set: StoreApi<ModalStore>["setState"]
): ModalStore => ({
  activeModal: null,
  isOpen: false,
  modalPayload: {},
  setActiveModal: (
    modal: MODAL_TYPES | null,
    payload?: Record<string, unknown>
  ) => {
    set(() => ({
      activeModal: modal,
      modalPayload: payload,
    }));
  },
  setClosed: () => {
    set(() => ({
      isOpen: false,
      activeModal: null,
      modalPayload: {},
    }));
  },
  setOpen: () => {
    set(() => ({
      isOpen: true,
    }));
  },
  toggleOpen: () => {
    set((state) => ({
      isOpen: !state.isOpen,
    }));
  },
});
