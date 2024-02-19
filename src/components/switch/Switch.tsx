import { colors } from "@/utils/colors";
import { space } from "@/utils/space";
import * as React from "react";
import styled from "styled-components";

export interface SwitchProps {
  toggle: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  ["data-testid"]?: string;
}

export const StyledSwitch = styled.div<SwitchProps>`
  cursor: pointer;
  position: relative;
  display: inline-block;
  width: ${space(2)};
  height: ${space(1)};

  input {
    display: none;
  }

  .slider {
    border-radius: ${space(0.5)};
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ toggle }) =>
      toggle ? colors.green : `var(--bg-base)`};
    transition: 0.4s;

    &:before {
      border-radius: 50%;
      position: absolute;
      content: "";
      height: ${space(0.75)};
      width: ${space(0.75)};
      left: ${space(0.125)};
      bottom: ${space(0.125)};
      background-color: var(--color-base);
      transition: 0.4s;
      transform: ${({ toggle }) =>
        toggle ? `translateX(${space(1)})` : "initial"};
    }
  }
`;

export const Switch: React.FC<SwitchProps> = (props) => {
  return (
    <StyledSwitch
      toggle={props.toggle}
      className="switch"
      onClick={props.onClick}
      data-testid={props["data-testid"]}
    >
      <input type="checkbox" />
      <span className="slider" />
    </StyledSwitch>
  );
};
