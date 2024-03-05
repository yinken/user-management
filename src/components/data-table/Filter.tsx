import * as React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Button } from "../button/Button";
import { SPECIAL_FIELD_TYPES } from "../field/Field";
import { FlexColumn, FlexGrid, FlexRow } from "../flex-grid/FlexGrid";
import { convertTimestampToDateString } from "@/utils/date";
import { determineSingularOrPlural } from "@/utils/translation";
import { useIcon, ICON } from "../icon/useIcon";
import { space } from "@/utils/space";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

export type Filter = {
  type: string;
  values: string[];
};

export type Filters = Record<string, Filter>;
interface FilterProps {
  filterName: string;
  type: string;
  currentFilters: Record<
    string,
    {
      type: string;
      values: string[];
    }
  >;
  isVisible: boolean;
  values: unknown[];
  onChange: (key: string, value: string, type: string) => void;
  onVisibilityChange?: (key: string) => void;
  align?: "left" | "right";
}

const StyledFilter = styled.div<{ align: "left" | "right" }>`
  top: 100%;
  ${({ align }) => align}: 0;
  width: 100%;
  z-index: 20;
  display: block;
  overflow: hidden;
  input {
    background: var(--bg-base-3);
    border: 0;
    padding: ${space(0.25)} ${space(0.5)};
    border: 1px solid var(--color-border-1);
    color: var(--color-base-1);
    width: 100%;
    &:focus {
      outline: none;
      border: 1px solid var(--color-border-1);
    }
  }
`;

export const Filter: React.FC<FilterProps> = ({
  isVisible,
  filterName,
  values = [],
  onChange,
  currentFilters,
  onVisibilityChange,
  align = "left",
  type,
}) => {
  const { t } = useTranslation();
  const { i } = useIcon();
  const filterRef = React.useRef(null);

  const handleClickOutside = () => {
    if (onVisibilityChange) {
      onVisibilityChange(filterName);
    }
  };

  useOnClickOutside(filterRef, handleClickOutside);

  const handleChange = React.useCallback(
    (value: string) => {
      onChange(filterName, value, type);
    },
    [filterName, onChange, type]
  );

  const filterComponent = React.useMemo(() => {
    if (!values.length || !isVisible) {
      return null;
    }

    const component = [];

    switch (type) {
      case "search":
        {
          component.push(
            <FlexRow
              key={filterName}
              style={{
                overflowY: "auto",
              }}
            >
              <input
                type="text"
                placeholder={t("Search") as string}
                onChange={(e) => {
                  handleChange(e.target.value);
                }}
              />
            </FlexRow>
          );
        }
        break;

      case "select": {
        const v = values as string[];
        const sortedValues = v.sort((a, b) => {
          if (a.toLowerCase() < b.toLowerCase()) {
            return -1;
          }
          if (a.toLowerCase() > b.toLowerCase()) {
            return 1;
          }
          return 0;
        });

        component.push(
          <FlexRow
            key={filterName}
            style={{
              overflowY: "auto",
            }}
          >
            <Form
              hasSpacing={false}
              fields={sortedValues.map((value) => {
                return {
                  name: value,
                  label: value,
                  type: SPECIAL_FIELD_TYPES.CHECKBOX,
                  value: !currentFilters[filterName]?.values.includes(value),
                  onChange: (key: string, _value: string) => {
                    handleChange(key);
                  },
                  spaceEvenly: true,
                };
              })}
            />
          </FlexRow>
        );
        break;
      }
      case "number": {
        const v = values as number[];
        const sortedValues = v.sort((a, b) => a - b);
        const value = currentFilters[filterName]?.values || [
          sortedValues[0],
          sortedValues[sortedValues.length - 1],
        ];

        component.push(
          <FlexRow
            key={filterName}
            style={{
              overflowY: "auto",
            }}
          >
            <Form
              hasSpacing={false}
              fields={[
                {
                  name: "minutes",
                  label: "Minutes",
                  type: SPECIAL_FIELD_TYPES.RANGE,
                  value: value,
                  onChange: (_key: string, value: string) => {
                    handleChange(value);
                  },
                  showLabel: false,
                  spaceEvenly: false,
                  min: sortedValues[0]?.toString(),
                  max: sortedValues[sortedValues.length - 1]?.toString(),
                },
              ]}
            />
          </FlexRow>
        );
        break;
      }
      case "date": {
        const v = values as number[];
        const sortedValues = v.sort((a, b) => a - b);
        const value = currentFilters[filterName]?.values || [
          sortedValues[0],
          sortedValues[sortedValues.length - 1],
        ];

        const startDate = convertTimestampToDateString(value[0]);
        const endDate = convertTimestampToDateString(value[1]);
        const dateString = `${startDate},${endDate}`;

        component.push(
          <FlexRow
            key={filterName}
            style={{
              overflowY: "auto",
              padding: space(0.25),
            }}
          >
            <Form
              hasSpacing={false}
              fields={[
                {
                  name: "daterange",
                  label: "Date range",
                  type: SPECIAL_FIELD_TYPES.DATERANGE,
                  value: dateString,
                  onChange: (_key: string, value: string) => {
                    handleChange(value);
                  },
                  showLabel: false,
                  spaceEvenly: false,
                },
              ]}
            />
          </FlexRow>
        );
        break;
      }
    }

    return component;
  }, [currentFilters, filterName, handleChange, isVisible, t, type, values]);

  if (!isVisible) {
    return null;
  }

  return (
    <StyledFilter ref={filterRef} align={align}>
      <FlexGrid
        direction="column"
        style={{
          maxHeight: "300px",
        }}
      >
        {filterComponent}

        <FlexRow grow={0} alignItems="center">
          <FlexColumn justifyContent="center">
            <Text>
              {determineSingularOrPlural({
                singular: t("X active filter", {
                  count: currentFilters[filterName]?.values.length || 0,
                }),
                plural: t("X active filters", {
                  count: currentFilters[filterName]?.values.length || 0,
                }),
                count: currentFilters[filterName]?.values.length || 0,
              })}
            </Text>
          </FlexColumn>
          <FlexColumn grow={0} justifyContent="center">
            <Button
              variant="tertiary"
              hasBorder={false}
              isSquare={true}
              disabled={currentFilters[filterName]?.values.length === 0}
              onClick={() => {
                handleChange("removeAll");
              }}
            >
              {i(ICON.REMOVE_FILTER)}
            </Button>
          </FlexColumn>
        </FlexRow>
      </FlexGrid>
    </StyledFilter>
  );
};
