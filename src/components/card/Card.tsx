import { IconName } from "@fortawesome/fontawesome-svg-core";

import * as React from "react";
import styled from "styled-components";
import { FlexGrid, FlexRow } from "../flex-grid/FlexGrid";
import { TitleBar } from "../title-bar/TitleBar";
import { colors, hexToRgba } from "@/utils/colors";
import { space } from "@/utils/space";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  headerIcon?: IconName;
  headerActions?: {
    name: string;
    icon: IconName;
    onClick: () => void;
  }[];
  footerContent?: React.ReactNode;
  width?: string;
  height?: string;
}

const StyledCard = styled.div.attrs({
  className: "card",
})<{ width?: string; height?: string }>`
  width: ${({ width }) => (width ? `${width}` : "100%")};
  height: ${({ height }) => (height ? `${height}` : "auto")};
  min-width: ${({ width }) => (width ? `0px` : "150px")};
  min-height: ${({ height }) => (height ? `0px` : "150px")};
  background-color: var(--bg-base-2);
  box-shadow: 0 0 0 1px ${hexToRgba(colors.black, 0.1)},
    0 2px 4px 0 ${hexToRgba(colors.black, 0.1)};
  .card-header {
    padding-left: ${space(0.25)};
    .card-title {
      padding: ${space(0.25)} ${space(0.5)} 0 0;
    }
    .card-header-icon {
      padding: ${space(0.25)} 0 0 0;
    }
    .card-header-action {
      padding: 0;
    }
  }
  .card-footer {
    padding: 0 ${space(0.5)} ${space(0.25)} ${space(0.5)};
  }
  .card-content {
    overflow-y: auto;
    &:last-child {
      padding-bottom: ${space(0.5)};
    }
    &:only-child {
      padding-bottom: 0;
    }
  }
`;

export const Card: React.FC<CardProps> = ({
  children,
  title,
  headerIcon,
  headerActions,
  footerContent,
  height,
  width,
}) => {
  return (
    <StyledCard height={height} width={width}>
      <FlexGrid direction="column">
        {(headerIcon || title || headerActions) && (
          <TitleBar title={title} icon={headerIcon} actions={headerActions} />
        )}
        <FlexRow
          className="card-content"
          justifyContent="center"
          direction="column"
        >
          {children}
        </FlexRow>
        {footerContent && (
          <FlexRow className="card-footer">{footerContent}</FlexRow>
        )}
      </FlexGrid>
    </StyledCard>
  );
};
