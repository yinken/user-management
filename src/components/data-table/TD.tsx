import * as React from "react";
import styled from "styled-components";
import { Button } from "../button/Button";
import { FlexColumn, FlexGrid } from "../flex-grid/FlexGrid";
import { CellAction } from "./TH";
import { useIcon } from "../icon/useIcon";
import { space } from "@/utils/space";

interface TDProps {
  minWidth?: number;
  actions?: CellAction[];
  children: React.ReactNode;
}

const StyledTD = styled.td`
  &:not(:last-child) {
    border-right: 1px solid var(--bg-base-3);
  }
  vertical-align: top;
  transition: min-width 0.2s ease-in-out;
  > div {
    padding: ${space(0.25)};
  }

  mark {
    background-color: #fee4a8;
    border-bottom: 1px solid #fdb81e;
    color: #000000;
    font-weight: bold;
    &.highlight-active {
      background-color: #fdb81e;
    }
  }
`;

export const TD: React.FC<TDProps> = ({ minWidth, actions, children }) => {
  const { i } = useIcon();
  const renderCellActions = React.useCallback(
    (actions: CellAction[]) => {
      return (
        <FlexGrid gap={space(0.125)}>
          {actions.map((action, index) => (
            <FlexColumn key={index}>
              <Button
                key={action.name}
                variant="tertiary"
                isSquare
                hasBorder={false}
                onClick={(event?: React.MouseEvent) => {
                  event?.stopPropagation();
                  action.onClick(action.name);
                }}
              >
                {i(action.icon)}
              </Button>
            </FlexColumn>
          ))}
        </FlexGrid>
      );
    },
    [i]
  );

  return (
    <StyledTD
      className={"data-table__cell"}
      style={{
        minWidth: `${minWidth || 0}px`,
      }}
    >
      {actions && renderCellActions(actions)}
      <div className="data-table__cell-content">{children}</div>
    </StyledTD>
  );
};
