import { FlexColumn, FlexGrid, FlexRow } from "@/components/flex-grid/FlexGrid";
import * as React from "react";
import styled from "styled-components";
import { space } from "@/utils/space";
import { Button } from "@/components/button/Button";
import { ICON, useIcon } from "@/components/icon/useIcon";
import { SearchBar } from "@/components/search-bar/SearchBar";
import { useAssigner } from "./useAssigner";

type T = {
  id: string;
  name: string;
  [key: string]: any;
};

type AssignerProps<T> = {
  assigned: T[];
  total: T[];
  placeholder?: string;
};

const StyledAssigner = styled(FlexGrid)`
  .widget {
    cursor: pointer;
    height: ${space(2)};
    border-bottom: 1px solid var(--color-border-2);
    .assign-icon {
      opacity: 0;
    }
    &:hover {
      .assign-icon {
        opacity: 1;
      }
    }
  }
`;

export const Assigner: React.FC<AssignerProps<T>> = ({
  assigned,
  total,
  placeholder,
}) => {
  const { i } = useIcon();

  const {
    searchbarRef,
    setSearchTerm,
    assignItem,
    unassignItem,
    assignAll,
    unassignAll,
    assignRemaining,
    currentlyAssigned,
    remaining,
  } = useAssigner({
    total,
    assigned,
  });

  return (
    <StyledAssigner direction="column">
      <FlexRow grow={0}>
        <SearchBar
          ref={searchbarRef}
          onChange={setSearchTerm}
          placeholder={placeholder}
        />
      </FlexRow>
      <FlexRow
        style={{
          borderTop: `1px solid var(--color-border-2)`,
        }}
      >
        <FlexColumn
          grow={0}
          style={{
            flexBasis: "50%",
            position: "relative",
            overflowY: "auto",
            borderRight: `1px solid var(--color-border-2)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
            }}
          >
            {currentlyAssigned
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((widget) => {
                return (
                  <FlexRow
                    grow={0}
                    key={widget.id}
                    className="widget left"
                    alignItems="justify-content"
                  >
                    <FlexColumn>
                      <Button
                        expand={true}
                        hasBorder={false}
                        isRounded={false}
                        onClick={() => unassignItem(widget.id)}
                      >
                        {widget.name}
                        {i(ICON.MOVE_RIGHT, { className: "assign-icon" })}
                      </Button>
                    </FlexColumn>
                    <FlexColumn grow={0}></FlexColumn>
                  </FlexRow>
                );
              })}
          </div>
        </FlexColumn>
        <FlexColumn
          grow={1}
          style={{
            position: "relative",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
            }}
          >
            {remaining
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((item) => {
                return (
                  <FlexRow
                    grow={0}
                    key={item.id}
                    className="widget right"
                    alignItems="justify-content"
                  >
                    <FlexColumn grow={0}></FlexColumn>
                    <FlexColumn>
                      <Button
                        expand={true}
                        hasBorder={false}
                        isRounded={false}
                        onClick={() => assignItem(item.id)}
                      >
                        {i(ICON.MOVE_LEFT, { className: "assign-icon" })}
                        {item.name}
                      </Button>
                    </FlexColumn>
                  </FlexRow>
                );
              })}
          </div>
        </FlexColumn>
      </FlexRow>
      <FlexRow
        grow={0}
        style={{
          borderTop: `1px solid var(--color-border-2)`,
        }}
      >
        <FlexColumn
          grow={0}
          style={{
            flexBasis: "50%",
            borderRight: `1px solid var(--color-border-2)`,
          }}
        >
          <Button
            expand={true}
            onClick={unassignAll}
            hasBorder={false}
            isRounded={false}
            variant={"danger"}
          >
            {i(ICON.DELETE)}
            {`Remove all`}
          </Button>
        </FlexColumn>
        <FlexColumn direction="row" grow={1} justifyContent="flex-end">
          <Button
            expand={true}
            onClick={assignAll}
            hasBorder={false}
            isRounded={false}
            disabled={remaining.length === 0}
          >{`Assign all (${total.length})`}</Button>
          <Button
            expand={true}
            onClick={assignRemaining}
            hasBorder={false}
            isRounded={false}
            disabled={remaining.length === 0 || remaining.length === 1}
          >{`Assign remaining (${remaining.length})`}</Button>
        </FlexColumn>
      </FlexRow>
    </StyledAssigner>
  );
};
