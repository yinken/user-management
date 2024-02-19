import styled from "styled-components";

export interface FlexGridProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number | string;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  justifyContent?: string;
  alignItems?: string;
  shrink?: number;
  grow?: number;
  height?: string;
  width?: string;
}

export const Container = styled.div<FlexGridProps>`
  display: flex;
  gap: ${({ gap = 0 }) => `${gap}`};
  flex-direction: ${({ direction = "row !important" }) =>
    `${direction} !important`};
  justify-content: ${({ justifyContent = "flex-start" }) =>
    `${justifyContent}`};
  align-items: ${({ alignItems = "flex-start" }) => `${alignItems}`};
  flex-grow: ${({ grow = 1 }) => `${grow}`};
  flex-shrink: ${({ shrink = 1 }) => `${shrink}`};
  height: ${({ height = "100%" }) => `${height}`};
  width: ${({ width = "100%" }) => `${width}`};
`;
