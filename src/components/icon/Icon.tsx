"use client";
import React from "react";
import styled from "styled-components";
import {
  library,
  IconName,
  IconPrefix,
} from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import { space } from "@/utils/space";

library.add(fal, far, fab, fas);

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name?: string;
  size?:
    | "xs"
    | "lg"
    | "sm"
    | "1x"
    | "2x"
    | "3x"
    | "4x"
    | "5x"
    | "6x"
    | "7x"
    | "8x"
    | "9x"
    | "10x";
  isSpinning?: boolean;
  className?: string;
  color?: string;
  library?: IconPrefix | "custom" | "weather";
  icon: IconName;
  use16pxAsset?: boolean;
  inline?: boolean;
}

export const StyledIcon = styled.span<{
  $library: IconPrefix | "custom" | "weather";
  $color?: string;
  $size?: IconProps["size"];
  $inline?: boolean;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  ${({ $library: library, $size: size }) =>
    ["fas", "fal", "fab", "far", "custom", "weather"].includes(library) &&
    `min-width: ${size === "xs" ? space(1.5) : space(2)}`};
  min-height: ${({ $size: size }) => (size === "xs" ? space(1) : space(2))}};
  position: relative;
  flex-shrink: 0;

  ${({ $inline: inline }) =>
    inline &&
    `min-height: ${space(1)};
     min-width: ${space(1)};
  `}
  svg {
    color: ${({ $color: color }) => (color ? `${color} !important;` : "inherit")};
    overflow: visible;
    box-sizing: content-box;
    inset: 0;
  }
`;

export const Icon: React.FC<IconProps> = (props): JSX.Element => {
  const {
    library = "fal",
    icon = "music",
    isSpinning = false,
    size,
    className = "",
    color = "inherit",
    inline = false,
  } = props;

  return (
    <StyledIcon
      $library={library}
      className={`${className} icon`}
      $color={color}
      $size={size}
      $inline={inline}
    >
      {["fas", "fal", "fab", "far"].includes(library) && (
        <FontAwesomeIcon
          color={color}
          spin={isSpinning}
          icon={[library as IconPrefix, icon as IconName]}
          size={size}
        />
      )}
    </StyledIcon>
  );
};

export default Icon;
