import * as React from "react";
import styled from "styled-components";
import { Button } from "../button/Button";
import { colors, hexToRgba } from "@/utils/colors";
import { ICON, useIcon } from "../icon/useIcon";
import { FlexColumn, FlexGrid } from "../flex-grid/FlexGrid";
import { space } from "@/utils/space";

interface SearchBarProps {
  onChange: (value: string) => void;
  placeholder?: string;
  value?: string;
}

const StyledSearchBar = styled(FlexGrid)`
  background: ${hexToRgba(colors.black, 0.1)};
  width: 100%;
  min-width: 150px;
  max-width: 300px;
  outline: none;
  min-width: 150px;
  max-width: 300px;
  outline: none;

  input {
    width: 100%;
    border: 0;
    background: ${colors.transparent};
    color: var(--color-base-0);
  }
  button {
    flex-shrink: 0;
  }
`;

export const SearchBar = React.forwardRef(
  (props: SearchBarProps, ref?: React.ForwardedRef<HTMLInputElement>) => {
    const { onChange, placeholder, value } = props;
    const { i } = useIcon();
    const [hasValue, setHasValue] = React.useState(Boolean(value));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
      setHasValue(e.target.value.length > 0);
    };

    const deleteSearch = () => {
      onChange("");
      setHasValue(false);
    };

    return (
      <StyledSearchBar justifyContent="center" alignItems="center">
        <FlexColumn
          grow={0}
          shrink={0}
          justifyContent="center"
          alignItems="center"
        >
          {i(ICON.SEARCH)}
        </FlexColumn>
        <FlexColumn
          grow={1}
          shrink={1}
          direction="row"
          gap={space(0.25)}
          alignItems="center"
        >
          <input
            ref={ref}
            type="text"
            placeholder={placeholder ?? undefined}
            onChange={(event) => handleChange(event)}
            value={value}
          />
        </FlexColumn>
        <FlexColumn
          grow={0}
          shrink={0}
          justifyContent="center"
          alignItems="center"
          style={{
            opacity: hasValue ? 1 : 0,
          }}
        >
          <Button
            variant="tertiary"
            isSquare={true}
            hasBorder={false}
            isRounded={false}
            onClick={deleteSearch}
            disabled={!hasValue}
          >
            {i(ICON.DELETE)}
          </Button>
        </FlexColumn>
      </StyledSearchBar>
    );
  }
);
SearchBar.displayName = "SearchBar";
