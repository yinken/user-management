"use client";
import * as React from "react";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import styled from "styled-components";

import { Modal, ModalAction } from "./Modal";
import { useTranslation } from "react-i18next";
import { colors, hexToRgba } from "@/utils/colors";
import { useStore } from "@/store/application";
import { MODAL_TYPES } from "@/store/modals";
import { ICON } from "../icon/useIcon";
import { User } from "@/views/users/UserTable";
import { useDummyData } from "@/app/dev/useDummyData";
import { WidgetAssigner } from "@/views/widgets/WidgetAssigner";
import { UserCreator } from "@/views/users/UserCreator";

const StyledModals = styled.div<{
  $isOpen: boolean;
  $dismissable: boolean;
  $blur: boolean;
}>`
  position: fixed;
  inset: 0;
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  justify-content: center;
  align-items: center;
  z-index: ${({ $dismissable }) => ($dismissable ? 2000 : 4000)};
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

  const { widgets } = useDummyData();

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
    let payload;

    if (activeModal) {
      switch (activeModal) {
        case MODAL_TYPES.ADD_USER:
          payload = modalPayload as { id: string };
          modal.modalComponent = <UserCreator />;
          modal.title = t("Add User");
          modal.icon = ICON.USER;
          break;
        case MODAL_TYPES.BULK_EDIT_USER:
          modal.modalComponent = <div>Bulk edit user</div>;
          modal.title = t("Edit Users");
          modal.icon = ICON.USER_ONLINE;
          break;
        case MODAL_TYPES.BULK_EDIT_WIDGET:
          payload = modalPayload as { ids: string; user: User };
          modal.modalComponent = (
            <div>{`Editing ${payload.ids.length} widgets for ${payload.user.name}`}</div>
          );
          modal.title = t("Edit Widget");
          modal.icon = ICON.COMMENTS;
          break;
        case MODAL_TYPES.ADD_WIDGETS:
          payload = modalPayload as { user: User };

          modal.modalComponent = (
            <WidgetAssigner
              assignedWidgets={payload.user.widgets}
              availableWidgets={widgets}
            />
          );
          modal.title = `Assign Widgets to ${payload.user.name}`;
          modal.icon = ICON.COMMENTS;
          break;
      }
    }

    return modal;
  }, [activeModal, modalPayload, setClosed, t, widgets]);

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
      $isOpen={isOpen}
      $dismissable={modal.dismissable}
      $blur={modal.blur}
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
