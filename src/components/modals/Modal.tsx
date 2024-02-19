import * as React from "react";
import styled from "styled-components";
import { Button, Variant } from "../button/Button";
import { TitleBar } from "../title-bar/TitleBar";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { t } from "i18next";
import { space } from "@/utils/space";
import { respondTo } from "@/utils/breakpoints";
import { colors, hexToRgba } from "@/utils/colors";
import { FlexColumn, FlexGrid, FlexRow } from "../flex-grid/FlexGrid";

export type ModalAction = {
  label: string;
  action?: () => void | Promise<never>;
  emphasis: boolean;
  disabled?: boolean;
  variant?: Variant;
};
interface ModalProps {
  title?: string;
  size?: string;
  icon?: IconName;
  closeAction?: () => void;
  actions?: ModalAction[];
  dismissable?: boolean;
  children: React.ReactNode;
}
interface StyledModalProps {
  size?: string;
}

const StyledModal = styled.div<StyledModalProps>`
  background: var(--bg-base-2);
  position: relative;
  z-index: 2001;
  overflow: hidden;
  border-radius: ${space(0.25)};
  ${({ size }) => {
    if (size === "S") {
      return `
        width: 350px;
        height: 250px;
      `;
    }
    if (size === "M") {
      return `
        width: 500px;
        height: 400px;
      `;
    }
    if (size === "L") {
      return `
        width: 800px;
        height: 600px;
      `;
    }
  }}

  /* ${respondTo("md", {
    width: "50vw",
    // height: ${({ height }) => height || '75vh'},
    [`min-width`]: `480px`,
    [`max-width`]: `900px`,
    [`min-height`]: `400px`,
    [`max-height`]: `900px`,
  })} */

  box-shadow: 0 0 10px 0 ${hexToRgba(colors.black, 0.25)};
  .ui-modal-container,
  .ui-modal-header,
  .ui-modal-content,
  .ui-modal-footer {
    box-shadow: none;
    border: 0;
    margin: 0;
    padding: 0;
  }
  .ui-modal-container {
    width: 100%;
    height: 100%;
  }
  .ui-modal-header {
    padding: ${space(0.25)} ${space(0.25)} ${space(0.25)} ${space(0.5)};
  }
  .ui-modal-content {
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
  }
  .ui-modal-footer {
    padding: ${space(0.25)};
  }
`;

export const Modal: React.FC<ModalProps> = ({
  title = "Lorem",
  size,
  icon,
  closeAction,
  children,
  dismissable = true,
  actions = [
    {
      label: t("Cancel"),
      action: () => console.log,
      emphasis: false,
      disabled: false,
      variant: "primary" as Variant,
    },
    {
      label: t("Save"),
      action: () => console.log,
      emphasis: true,
      disabled: false,
      variant: "primary" as Variant,
    },
  ],
}) => {
  const keyboardListener = React.useCallback(
    (e: KeyboardEvent) => {
      if (!dismissable) return;
      if (e.key === "Escape" && closeAction) {
        closeAction();
      }
    },
    [closeAction, dismissable]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", keyboardListener);
    return () => {
      document.removeEventListener("keydown", keyboardListener);
    };
  }, [keyboardListener]);
  return (
    <StyledModal size={size}>
      <div className="ui-modal-container">
        <FlexGrid direction="column">
          <FlexRow grow={0}>
            <TitleBar
              icon={icon}
              title={title}
              actions={
                dismissable
                  ? [
                      {
                        name: "close",
                        icon: "close",
                        onClick: closeAction ? closeAction : console.log,
                        variant: "danger",
                      },
                    ]
                  : []
              }
            />
          </FlexRow>
          <FlexRow className="ui-modal-content" grow={1}>
            {children}
          </FlexRow>
          <FlexRow
            grow={0}
            className="ui-modal-footer"
            gap={space(0.25)}
            justifyContent="flex-end"
            alignItems="center"
          >
            {actions.map((action) => {
              return (
                <FlexColumn
                  justifyContent="center"
                  alignItems="center"
                  grow={0}
                  key={action.label}
                >
                  <Button
                    onClick={action.action}
                    variant={action.variant ? action.variant : "primary"}
                    isActive={action.emphasis}
                    title={action.label}
                    disabled={action.disabled}
                  >
                    {action.label}
                  </Button>
                </FlexColumn>
              );
            })}
          </FlexRow>
        </FlexGrid>
      </div>
    </StyledModal>
  );
};
