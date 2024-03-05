import * as React from "react";
import styled from "styled-components";
import { Button } from "../button/Button";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { space } from "@/utils/space";
import { colors } from "@/utils/colors";
import { ICON, useIcon } from "../icon/useIcon";
import { FlexColumn, FlexGrid } from "../flex-grid/FlexGrid";
import { Text } from "../text/Text";

interface TitleBarProps {
  title?: string;
  icon?: ICON | IconName;
  onClick?: () => void;
  onDoubleClick?: () => void;
  actions?: TitleBarAction[];
  color?: string;
  variant?: "default" | "danger";
  inlineComponent?: React.ReactNode;
}

export type TitleBarAction = {
  name: string;
  icon: ICON | IconName;
  title?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  disabled?: boolean;
  isActive?: boolean;
};

const StyledTitleBar = styled.div<{
  $color?: string;
  $variant: "default" | "danger";
}>`
  width: 100%;
  position: relative;
  color: ${({ $variant: variant, $color: color }) =>
    color ? color : variantColors[variant].color};
  background: ${({ $variant: variant }) => variantColors[variant].background}; 

  .title-bar {
    .title {
      margin-right ${space(1)};
      &:first-child {
        margin-left: ${space(0.25)};
      }
    }
  }
  .inline {
    padding: 0 ${space(0.25)};
  }
`;

const variantColors = {
  default: {
    color: "inherit",
    background: "transparent",
  },
  danger: {
    color: colors.black,
    background: colors.yellow60,
  },
};

export const TitleBar: React.FC<TitleBarProps> = ({
  icon,
  title,
  actions,
  onClick,
  onDoubleClick,
  color,
  variant = "default",
  inlineComponent,
}) => {
  const { i } = useIcon();
  return (
    <StyledTitleBar
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      $color={color}
      $variant={variant}
    >
      <FlexGrid
        alignItems="center"
        className="title-bar"
        justifyContent="flex-start"
      >
        {icon && (
          <FlexColumn
            alignItems="flex-start"
            className="icon"
            grow={0}
            shrink={0}
            height={"auto"}
          >
            {i(icon)}
          </FlexColumn>
        )}

        {title && (
          <FlexColumn className="title" height={"auto"} grow={1} shrink={1}>
            <Text ellipsis bold size="S" title={title}>
              {title}
            </Text>
          </FlexColumn>
        )}
        {inlineComponent && (
          <FlexColumn className="inline">{inlineComponent}</FlexColumn>
        )}
        {actions && (
          <FlexColumn
            grow={0}
            shrink={0}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            className="title-bar-actions"
          >
            {actions.map((action) => {
              return (
                <Button
                  key={action.name}
                  onClick={action.onClick}
                  title={action.title}
                  hasBorder={false}
                  isSquare={true}
                  isRounded={false}
                  disabled={action.disabled}
                  isActive={action.isActive}
                  variant={action.variant || "tertiary"}
                >
                  {i(action.icon)}
                </Button>
              );
            })}
          </FlexColumn>
        )}
      </FlexGrid>
    </StyledTitleBar>
  );
};
