import { colors } from "@/utils/colors";
import React from "react";
import styled from "styled-components";
import { FlexGrid, FlexRow } from "../flex-grid/FlexGrid";
import { space } from "@/utils/space";
import { Text } from "../text/Text";

interface StatusMessageProps {
  isVisible: boolean;
  icons?: React.ReactNode[] | React.ReactNode;
  message?: string;
  blur?: boolean;
  transparent?: boolean;
  inline?: boolean;
}

const StyledStatusMessage = styled.div<{
  isVisible: boolean;
  blur: boolean;
  transparent: boolean;
  inline?: boolean;
}>`
  position: ${({ inline }) => (inline ? "static" : "absolute")};
  inset: 0;
  background-color: ${({ transparent }) =>
    transparent ? colors.transparent : "var(--bg-base-2)"};
  ${({ blur }) => blur && "backdrop-filter: blur(4px)"};
  z-index: 500;
  height: 100%;
  min-width: 24px;
  pointer-events: none;
  opacity: ${({ isVisible }) => (isVisible ? "1" : "0")};
  transition: opacity 0.25s ease-in-out;
  .icons {
    position: relative;
    > * {
      position: absolute;
      inset: 0;
    }
  }
`;

export const StatusMessage: React.FC<StatusMessageProps> = ({
  icons,
  message,
  isVisible = false,
  blur = true,
  transparent = false,
  inline = false,
}) => {
  return (
    <StyledStatusMessage
      isVisible={isVisible}
      blur={blur}
      transparent={transparent}
      inline={inline}
    >
      <FlexGrid
        direction="column"
        gap={space(1)}
        grow={1}
        justifyContent="center"
        alignItems="center"
      >
        <FlexRow
          grow={0}
          justifyContent="center"
          alignItems="center"
          style={{ flexBasis: "24px" }}
          className="icons"
        >
          {icons && Array.isArray(icons)
            ? icons.map((icon, index) => {
                return <React.Fragment key={index}>{icon}</React.Fragment>;
              })
            : icons}
        </FlexRow>
        {message && (
          <FlexRow
            grow={0}
            justifyContent="center"
            alignItems="center"
            style={{ textAlign: "center" }}
          >
            <Text size="S">{message}</Text>
          </FlexRow>
        )}
      </FlexGrid>
    </StyledStatusMessage>
  );
};
