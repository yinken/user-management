import { space } from "@/utils/space";
import styled from "styled-components";

interface StyledAvatarProps {
  isClickable?: boolean;
  size: Size;
  background?: string;
  isCircle?: boolean;
  isRounded?: boolean;
}

export enum Size {
  sm = "sm",
  md = "md",
  lg = "lg",
}

export const StyledAvatar = styled.div<StyledAvatarProps>`
  cursor: ${(p) => (p.isClickable ? "pointer" : "auto")};
  position: relative;
  overflow: hidden;
  width: ${(p) => getWidth(p.size)};
  height: ${(p) => getWidth(p.size)};
  &:hover {
    ${(p) =>
      p.isClickable ? "opacity: 0.4; transition: opacity 0.5s ease-out 0s" : ""}
  }
  font-weight: bold;
  border: 1px solid var(--color-base);
  border-radius: ${({ isRounded }) => isRounded && space(0.25)};
  border-radius: ${({ isCircle }) => isCircle && "9999px"};

  flex-shrink: 0;
  ${({ background }) => `background: ${background};`};

  & > img {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

export const StyledDot = styled.div<{ dotSize: Size }>`
  position: absolute;
  left: -${({ dotSize }) => (dotSize === Size.sm ? space(0.25) : space(0.125))};
  top: -${({ dotSize }) => (dotSize === Size.sm ? space(0.25) : space(0.125))};
`;

export const AvatarInitials = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  text-transform: uppercase;
  line-height: 1;
`;

export const AvatarStatusDot = styled.div<{ color: string }>`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2;
  border: 1px solid var(--color-base);
  background: ${({ color }) => color};
  border-radius: 9999px;
  width: ${space(0.75)};
  height: ${space(0.75)};
`;

function getWidth(size: Size) {
  switch (size) {
    case "sm":
      return space(1.5);
    case "md":
      return space(2);
    case "lg":
      return space(2.5);
  }
}
