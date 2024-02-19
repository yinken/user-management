import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Button } from "../button/Button";
import { FlexColumn, FlexGrid, FlexRow } from "../flex-grid/FlexGrid";
import { space } from "@/utils/space";
import { ICON, useIcon } from "../icon/useIcon";
import { Text } from "../text/Text";
import { useHighlightSearchTerm } from "@/hooks/useHighlightSearchTerm";

interface AccordionProps {
  title?: string | null;
  icon?: ICON;
  inlineContent?: React.ReactNode;
  children?: React.ReactNode;
  toggleOpen?: () => void;
  isOpen: boolean;
  searchTerm?: string;
  index?: number;
  isGrabbable?: boolean;
}

const StyledAccordion = styled(FlexGrid)<{
  isOpen: boolean;
  isGrabbable?: boolean;
}>`
  overflow: hidden;
  height: auto;
  width: 100%;
  .accordion-header {
  }
  .accordion-content {
    padding-bottom: ${({ isOpen }) => (isOpen ? space(0.25) : "0px")};
    padding-left: ${({ isGrabbable }) => (isGrabbable ? space(1) : "0px")};
    position: relative;

    height: ${({ isOpen }) => (isOpen ? `auto` : "0px")};
    overflow-y: auto;
  }
  &:hover {
    .grip {
      opacity: 1;
    }
  }
  .grip {
    opacity: 0;
    margin-left: -${space(0.5)};
    margin-right: -${space(0.5)};
  }
`;

export const Accordion: React.FC<AccordionProps> = ({
  title,
  icon,
  inlineContent,
  children,
  isOpen,
  toggleOpen,
  searchTerm,
  isGrabbable,
}) => {
  const { t } = useTranslation();
  const { i } = useIcon();

  const { highlightSearchTerm } = useHighlightSearchTerm(searchTerm);

  return (
    <StyledAccordion
      isOpen={isOpen}
      isGrabbable={isGrabbable}
      direction="column"
      grow={isOpen ? 1 : 0}
      shrink={0}
      className="accordion"
    >
      <FlexRow
        className="accordion-header"
        gap={space(0.25)}
        alignItems="center"
        grow={0}
      >
        {isGrabbable && (
          <FlexColumn grow={0} className="grip">
            {i(ICON.GRIP)}
          </FlexColumn>
        )}
        <FlexColumn>
          <FlexRow
            direction="row"
            alignItems="center"
            style={{ flexWrap: "nowrap" }}
            gap={space(0.25)}
          >
            {(title || icon) && (
              <FlexColumn
                shrink={1}
                grow={1}
                style={{
                  flexBasis: title ? "120px" : "auto",
                }}
                direction="row"
                alignItems="center"
                gap={space(0.25)}
                onClick={toggleOpen ? () => toggleOpen() : () => null}
              >
                {icon && i(icon)}
                {title && (
                  <Text
                    size="S"
                    bold
                    style={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      alignSelf: "center",
                      overflow: "hidden",
                    }}
                  >
                    {highlightSearchTerm(title)}
                  </Text>
                )}
              </FlexColumn>
            )}

            {inlineContent && (
              <FlexColumn
                grow={0}
                shrink={0}
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {inlineContent}
              </FlexColumn>
            )}
          </FlexRow>
        </FlexColumn>

        <>
          {children && (
            <FlexColumn
              alignItems="flex-end"
              justifyContent="center"
              grow={0}
              shrink={0}
              direction="row"
              style={{ height: "auto", alignSelf: "center" }}
            >
              <Button
                disabled={!toggleOpen}
                title={
                  toggleOpen
                    ? !isOpen
                      ? t("Expand this panel") ?? undefined
                      : t("Collapse this panel") ?? undefined
                    : undefined
                }
                variant={"tertiary"}
                onClick={toggleOpen ? () => toggleOpen() : () => null}
                hasBorder={false}
                isSquare={true}
                isRounded={false}
              >
                {i(isOpen ? ICON.EXPAND_DOWN : ICON.EXPAND_RIGHT)}
              </Button>
            </FlexColumn>
          )}
        </>
      </FlexRow>
      <FlexRow grow={1} className="accordion-content">
        {children}
      </FlexRow>
    </StyledAccordion>
  );
};
