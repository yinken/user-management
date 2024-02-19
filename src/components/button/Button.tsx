import { hexToRgba } from "@/utils/colors";
import { space } from "@/utils/space";
import * as React from "react";
import styled from "styled-components";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  onClick?: (event?: React.MouseEvent) => void;
  variant?: Variant;
  hasBorder?: boolean;
  isRounded?: boolean;
  isActive?: boolean;
  isSquare?: boolean;
  isCircle?: boolean;
  disabled?: boolean;
  expand?: boolean;
  align?: "left" | "center" | "right";
  style?: React.CSSProperties;
  className?: string;
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
  title?: string;
  direction?: "row" | "column";
  progress?: number;
  size?: "sm" | "md" | "lg";
  confirmation?: string;
}

const getHeight = (size: "sm" | "md" | "lg") => {
  switch (size) {
    case "sm":
      return space(1);
    case "md":
      return space(2);
    case "lg":
      return space(2.5);
  }
};

const getPadding = (size: "sm" | "md" | "lg", isSquare: boolean) => {
  switch (size) {
    case "sm":
      return isSquare ? space(0.125) : `${space(0.25)} ${space(0.5)}`;
    case "md":
      return isSquare ? space(0.25) : `${space(0.25)} ${space(0.5)}`;
    case "lg":
      return isSquare ? space(0.5) : `${space(1)} ${space(2)}`;
  }
};

export type Variant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "tertiaryInverted"
  | "danger";

const variantColors = {
  primary: {
    color: `var(--bg-base-1)`,
    background: "#0075DB",
  },
  secondary: {
    color: `var(--bg-base-3)`,
    background: "#fffffff",
  },
  tertiary: {
    color: `var(--bg-base-1)`,
    background: `var(--color-base)`,
  },
  tertiaryInverted: {
    color: `var(--color-base)`,
    background: `var(--bg-base-1)`,
  },
  danger: {
    color: "#ffffff",
    background: "#E22828",
  },
};

const alignment = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

const StyledButton = styled.button.attrs({ className: "ui-button" })<{
  variant: Variant;
  hasBorder: boolean;
  isRounded: boolean;
  isActive: boolean;
  isSquare: boolean;
  disabled: boolean;
  expand: boolean;
  align: "left" | "center" | "right";
  isCircle: boolean;
  direction: "row" | "column";
  progress: number;
  size: "sm" | "md" | "lg";
}>`
  position: relative;
  margin: 0;
  border-style: solid;
  padding: ${({ isSquare, size }) => getPadding(size, isSquare)};

  background-color: ${({ isActive, variant }) =>
    isActive ? variantColors[variant].background : "transparent"};
  border-color: ${({ hasBorder, variant }) =>
    hasBorder ? variantColors[variant].background : "transparent"};

  color: ${({ isActive, variant }) =>
    isActive
      ? variantColors[variant].color
      : variantColors[variant].background};

  border-width: 1px 1px 1px 0;
  display: inline-flex;
  flex-direction: ${({ direction }) => direction};
  gap: ${space(0.25)};
  align-items: center;
  justify-content: ${({ align }) => alignment[align]};
  white-space: nowrap;
  z-index: 1;
  pointer-events: all;

  .button-content {
    display: flex;
    white-space: nowrap;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: ${({ isSquare }) => (isSquare ? "auto" : "100%")};
    align-items: center;
    gap: ${space(0.25)};
    .icon {
      min-width: ${space(0.5)} !important;
      min-height: ${space(0.5)} !important;
    }
  }

  &:first-of-type {
    border-top-left-radius: ${({ isRounded }) =>
      isRounded ? space(0.125) : "0"};
    border-bottom-left-radius: ${({ isRounded }) =>
      isRounded ? space(0.125) : "0"};
    border-right-width: 1px;
    border-left-width: 1px;
  }
  &:last-of-type {
    border-top-right-radius: ${({ isRounded }) =>
      isRounded ? space(0.125) : "0"};
    border-bottom-right-radius: ${({ isRounded }) =>
      isRounded ? space(0.125) : "0"};
    border-right-width: 1px;
  }
  &:only-of-type {
    border-radius: ${({ isRounded }) => (isRounded ? space(0.125) : "0")};
    border-right-width: 1px;
    border-width: 1px;
  }

  ${({ disabled }) =>
    disabled &&
    `opacity: 0.5;
    cursor: not-allowed;`}

  min-height: ${({
    isSquare,
    size,
  }: {
    isSquare: boolean;
    size: "sm" | "md" | "lg";
  }) => (isSquare ? "auto" : getHeight(size))};
  height: ${({ isSquare, size }) => (isSquare ? getHeight(size) : "auto")};
  width: ${({ isSquare, expand, size }) =>
    isSquare ? getHeight(size) : expand ? "100%" : "auto"};

  ${({ isCircle }) => isCircle && "border-radius: 9999px !important;"}

  &:hover {
    background-color: ${({ isActive, variant }) =>
      isActive
        ? variantColors[variant].background
        : hexToRgba(variantColors[variant].background, 0.25)};
  }

  .progress {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ progress }) => progress}%;
    background-color: ${({ variant }) =>
      hexToRgba(variantColors[variant].background, 0.5)};
    border-radius: 0;
    mix-blend-mode: multiply;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  hasBorder = true,
  onClick,
  children,
  isRounded = true,
  isActive = false,
  isSquare = false,
  isCircle = false,
  disabled = false,
  expand = false,
  align = "center",
  title,
  style,
  className,
  as = "button",
  href,
  target,
  rel,
  progress,
  size = "md",
  confirmation,
}) => {
  const handleClick = (event: React.MouseEvent) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.stopPropagation();
      onClick && onClick(event);
      if (confirmation) {
        console.log(confirmation);
      }
    }
  };
  return (
    <StyledButton
      className={className}
      style={style}
      title={title}
      hasBorder={hasBorder}
      variant={variant}
      onClick={(event: React.MouseEvent) => handleClick(event)}
      isRounded={isRounded}
      isCircle={isCircle}
      isActive={isActive}
      isSquare={isSquare}
      disabled={disabled}
      expand={expand}
      align={align}
      as={as}
      href={href}
      target={target}
      rel={rel}
      htmlRole="button"
      progress={progress || 0}
      size={size}
    >
      {progress && <div className="progress" />}
      <div className="button-content">{children}</div>
    </StyledButton>
  );
};
