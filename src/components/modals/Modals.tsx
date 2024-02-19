import * as React from "react";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import styled from "styled-components";

import { Modal, ModalAction } from "./Modal";
import { useTranslation } from "react-i18next";
import { colors, hexToRgba } from "@/utils/colors";
import { useStore } from "@/store/application";
import { MODAL_TYPES } from "@/store/modals";
import { ICON } from "../icon/useIcon";

const StyledModals = styled.div<{
  isOpen: boolean;
  dismissable: boolean;
  blur: boolean;
}>`
  position: fixed;
  inset: 0;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  justify-content: center;
  align-items: center;
  z-index: ${({ dismissable }) => (dismissable ? 2000 : 4000)};
  padding-top: 47px;
  .modal-backdrop {
    position: absolute;
    inset: 0;
    background: ${hexToRgba(colors.black, 0.45)};
  }
`;

export const Modals: React.FC = () => {
  const { t } = useTranslation();
  const isOpen = useStore.use.isOpen();
  const setClosed = useStore.use.setClosed();
  const activeModal = useStore.use.activeModal();
  const modalPayload = useStore.use.modalPayload();

  const modal = React.useMemo(() => {
    const modal = {
      modalComponent: <div />,
      title: "",
      blur: true,
      size: "L",
      dismissable: true,
      icon: undefined as IconName | undefined,
      actions: [
        {
          label: t("Cancel"),
          action: setClosed,
          emphasis: false,
        },
      ] as ModalAction[],
    };

    if (activeModal) {
      switch (activeModal) {
        case MODAL_TYPES.EDIT_USER:
          const payload = modalPayload as { id: string };
          modal.modalComponent = <div>{payload.id}</div>;
          modal.title = t("Edit User");
          modal.icon = ICON.USER;
          break;
      }
    }

    return modal;
  }, [activeModal, modalPayload, setClosed, t]);

  const handleModalClose = (event: React.MouseEvent) => {
    if (!modal || !modal.dismissable) {
      return;
    }
    event.stopPropagation();
    setClosed();
  };

  if (!modal) {
    return null;
  }

  return (
    <StyledModals
      isOpen={isOpen}
      dismissable={modal.dismissable}
      blur={modal.blur}
    >
      <div
        className={"modal-backdrop"}
        onClick={(event) => handleModalClose(event)}
      ></div>
      {modal.modalComponent && (
        <Modal
          title={modal.title}
          size={modal.size}
          icon={modal.icon}
          closeAction={setClosed}
          actions={modal.actions}
          dismissable={modal.dismissable}
        >
          {modal.modalComponent}
        </Modal>
      )}
    </StyledModals>
  );
};
