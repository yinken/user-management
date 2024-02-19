import * as React from "react";
import styled from "styled-components";
import { CheckboxField } from "./CheckboxField";
import { InputField } from "./InputField";
import { RadioButtonField } from "./RadioButtonField";
import { SelectField } from "./SelectField";
import { EditableField } from "./EditableField";
import { RangeField } from "./RangeField";
import { DateRangeField } from "./DateRangeField";
import { TextAreaField } from "./TextAreaField";
import { FileField } from "./FileField";
import { ImageField } from "./ImageField";
import { FlexColumn, FlexGrid } from "../flex-grid/FlexGrid";
import { SwitchField } from "./SwitchField";
import { space } from "@/utils/space";
import { colors } from "@/utils/colors";
import { ICON, useIcon } from "../icon/useIcon";
import { useHighlightSearchTerm } from "@/hooks/useHighlightSearchTerm";

export enum INPUT_FIELD_TYPES {
  TEXT = "text",
  NUMBER = "number",
  PASSWORD = "password",
  EMAIL = "email",
  TEL = "tel",
  URL = "url",
  DATE = "date",
}

export enum SPECIAL_FIELD_TYPES {
  RADIO = "radio",
  SELECT = "select",
  CHECKBOX = "checkbox",
  AUDIO = "audio",
  EDITABLE = "editable",
  RANGE = "range",
  DATERANGE = "daterange",
  TEXTAREA = "textarea",
  FILE = "file",
  IMAGE = "image",
  SWITCH = "switch",
}

const COLOR_VAR = "var(--color-base)";

export type FIELD_TYPES = INPUT_FIELD_TYPES & SPECIAL_FIELD_TYPES;

export interface FieldProps {
  name: string;
  label: string;
  type: INPUT_FIELD_TYPES | SPECIAL_FIELD_TYPES;
  fieldLayout?: "stacked" | "inline";
  value: string[] | string | boolean;
  options?: { value: string | number; label: string }[];
  defaultValue?: string | number | boolean;
  disabled?: boolean;
  showLabel?: boolean;
  spaceEvenly?: boolean;
  onChange: (key: string, value: string) => void;
  min?: string;
  max?: string;
  info?: string;
  searchTerm?: string;
  alternateColumns?: boolean;
}

const StyledField = styled(FlexGrid)<{
  spaceEvenly: boolean;
  fieldLayout?: "stacked" | "inline";
  hasInfo?: boolean;
  disabled?: boolean;
  alternateColumns?: boolean;
}>`
  min-height: ${space(2)};
  position: relative;
  height: auto;
  color: ${COLOR_VAR};
  padding: 0 ${space(0.125)};
  pointer-events: ${({ disabled }) => (disabled ? "none !important" : "auto")};
  flex-direction: ${({ fieldLayout }) =>
    fieldLayout === "stacked" ? "column" : "row"} !important;

  ${({ alternateColumns }) =>
    alternateColumns &&
    `&:nth-child(odd) {
      background: var(--bg-base-2);
      input,
      select,
      textarea {
        background: var(--bg-base-2);
      }
    }
    &:nth-child(even) {
      background: var(--bg-base-3);
      input,
      select,
      textarea {
        background: var(--bg-base-3);
      }
    }`}
  .custom-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
    flex-shrink: 0;
    flex-grow: 0;
    ${({ spaceEvenly, hasInfo }) =>
      spaceEvenly
        ? `flex-basis: calc(50% + ${hasInfo ? space(0.75) : `0px`});`
        : `flex-basis: auto; flex-grow: 0;`}
    ${({ fieldLayout }) =>
      fieldLayout === "stacked" ? `flex-basis: 100%;` : ``}
      > * {
      flex-grow: 0;
    }
    ${({ disabled }) => disabled && `opacity: 0.5;`}
  }
  .custom-field {
    flex-shrink: 1;
    ${({ spaceEvenly }) => (spaceEvenly ? `flex-grow: 1;` : `flex-grow: 1;`)}
    ${({ fieldLayout }) => (fieldLayout === "stacked" ? `width: 100%;` : ``)}
  }

  label {
    min-height: ${space(2)};
    font-weight: normal;
    margin-bottom: 0;
    text-overflow: ellipsis;
    max-width: 100%;
    overflow: hidden;
    padding: ${space(0.25)} 0 0 ${space(0.25)};
  }
  .radio-options,
  .checkbox {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: ${space(0.25)} 0;
    gap: ${space(0.25)};
    margin: 0;
    label {
      display: flex;
      position: relative;
      align-items: center;
      padding: 0 0 0 ${space(1.5)};
      min-height: 0;
      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        &:checked {
          & ~ .checkmark {
            background-color: var(--color-accent-5);
            &:after {
              display: block;
            }
          }
        }
      }
      .checkmark {
        position: absolute;
        top: ${space(0.125)};
        left: ${space(0.125)};
        height: ${space(1)};
        width: ${space(1)};
        background-color: var(--bg-base);
        &:after {
          content: '';
          position: absolute;
          display: none;
          top: ${space(0.25)};
          left: ${space(0.25)};
          width: ${space(0.5)};
          height: ${space(0.5)};
          border-radius: 9999px;
          background: ${COLOR_VAR};
        }
      }
    }
  }
  .radio-options {
    label {
      .checkmark {
        border-radius: 9999px;
        &:after {
         
        }
      }
    }
  }
}
.checkbox {
  label {
    min-height: ${space(1.5)};
    .checkmark {
      border-radius: ${space(0.25)};
      &:after {
       
      }
    }
  }
}

  input,
  select,
  textarea {
    margin: 0;
    border: 0;
    background: var(--bg-base-1);
    color: ${COLOR_VAR};
    height: ${space(2)};
  }
  input[type='text'],
  input[type='file'],
  textarea {
    resize: none;
  }
  input[type='text'],
  input[type='file'],
  textarea {
    width: 100%;
  }
  textarea {
    height: auto;
  }
  select {
    flex-grow: 1;
    min-width: 80px;
  }
  input[type='checkbox'],
  input[type='radio'] {
    height: ${space(1)};
  }
  input[type='range'] {
    margin: 0;
    appearance: none;
    width: 100%;
    background: ${colors.transparent};
    border: 0;
  }
  .dual-range {
    position: relative;
    flex-grow: 1;
    input[type='range'] {
      appearance: none;
      pointer-events: none;
      position: absolute;
      width: 100%;
      height: 2px;
      margin: 0;
      padding: 0;
      border-radius: 0;
      background: ${COLOR_VAR};
      &::-webkit-slider-thumb {
        appearance: none;
        border: 0;
        height: 8px;
        width: 16px;
        border-radius: 2px;
        cursor: pointer;
        margin-top: -3px;
        z-index: 1;
        background: ${COLOR_VAR};
        pointer-events: all;
        &:hover {
          background: ${COLOR_VAR};
        }
        &:focus {
          outline: none;
        }
      }
      &::-moz-range-thumb {
        appearance: none;
        border: 0;
        height: 8px;
        width: 16px;
        border-radius: 2px;
        cursor: pointer;
        margin-top: -3px;
        z-index: 1;
        background: ${COLOR_VAR};
        pointer-events: all;
        &:hover {
          background: ${COLOR_VAR};
        }
        &:focus {
          outline: none;
        }
      }

      &::-webkit-slider-runnable-track {
        width: 100%;
        height: 2px;
        cursor: pointer;
        background: ${COLOR_VAR};
        border-radius: 2px;
        appearance: none;
      }
      &::-moz-range-track {
        width: 100%;
        height: 2px;
        cursor: pointer;
        background: ${COLOR_VAR};
        border-radius: 2px;
        appearance: none;
      }
    }
  }
  .info {
    opacity: 0.5;
  }
  mark {
    background: ${colors.yellow40};
    border-bottom: 2px solid ${colors.yellow60};
    color: ${colors.black};
    padding: 0;
    margin: 0;
  }
`;

export const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  (props, ref) => {
    const { i } = useIcon();
    const {
      type,
      spaceEvenly = true,
      fieldLayout,
      info,
      disabled,
      showLabel = true,
      name,
      label,
      searchTerm,
      alternateColumns,
    } = props;

    const { highlightSearchTerm } = useHighlightSearchTerm(searchTerm, false);

    const getFieldComponent = React.useCallback<
      (
        type: INPUT_FIELD_TYPES | SPECIAL_FIELD_TYPES
      ) => () => React.ReactElement
    >(
      (type) => {
        const inputFieldTypes = Object.values(INPUT_FIELD_TYPES);
        const { value, defaultValue, options, onChange } = props;
        const r = ref as React.MutableRefObject<HTMLInputElement>;

        if (inputFieldTypes.includes(type as INPUT_FIELD_TYPES)) {
          const field = () => (
            <InputField
              {...props}
              ref={r}
              value={value.toString()}
              type={type as INPUT_FIELD_TYPES}
              onChange={onChange}
            />
          );
          return field;
        }
        const fields = {
          checkbox: () => (
            <CheckboxField
              ref={r}
              {...props}
              value={Boolean(value)}
              onChange={
                onChange as unknown as (key: string, value: boolean) => void
              }
            />
          ),
          radio: () => (
            <RadioButtonField
              ref={r}
              {...props}
              value={value.toString()}
              options={options ?? []}
            />
          ),
          select: () => {
            const r =
              ref as unknown as React.MutableRefObject<HTMLSelectElement>;
            return (
              <SelectField
                ref={r}
                {...props}
                value={value.toString()}
                options={options ?? []}
              />
            );
          },
          editable: () => {
            const r = ref as React.MutableRefObject<HTMLInputElement>;
            return (
              <EditableField ref={r} {...props} onSave={onChange}>
                {value}
              </EditableField>
            );
          },
          audio: () => {
            console.log("audio not implemented");
            return <></>;
          },
          range: () => {
            const { min, max } = props;
            return (
              <RangeField
                {...props}
                value={value.toString()}
                min={min || "0"}
                max={max || "100"}
              />
            );
          },
          daterange: () => {
            return <DateRangeField {...props} value={value.toString()} />;
          },
          textarea: () => {
            return <TextAreaField {...props} value={value.toString()} />;
          },
          file: () => {
            return <FileField {...props} value={value.toString()} />;
          },
          image: () => {
            const r = ref as React.MutableRefObject<HTMLDivElement>;
            return (
              <ImageField ref={r} onSave={onChange} {...props}>
                {value.toString()}
              </ImageField>
            );
          },
          switch: () => {
            const r = ref as React.MutableRefObject<HTMLDivElement>;
            return (
              <SwitchField
                {...props}
                ref={r}
                value={Boolean(value)}
                onClick={
                  onChange as unknown as (key: string, value: boolean) => void
                }
              />
            );
          },
        };
        return fields[type as SPECIAL_FIELD_TYPES];
      },
      [props, ref]
    );

    const renderField = getFieldComponent(type);

    return (
      <StyledField
        spaceEvenly={spaceEvenly}
        fieldLayout={fieldLayout}
        hasInfo={Boolean(info)}
        disabled={disabled}
        alternateColumns={alternateColumns}
        gap={spaceEvenly ? 0 : space(0.5)}
      >
        {showLabel && (
          <FlexColumn className="custom-label" direction="row">
            <label htmlFor={name}>{highlightSearchTerm(label)}</label>
            {info && (
              <div className="info">{i(ICON.INFO, { library: "fas" })} </div>
            )}
          </FlexColumn>
        )}
        {/* {info && (
          <FlexColumn
            title={info}
            className='info'
          >
           
          </FlexColumn>
        )} */}

        <FlexColumn className="custom-field" justifyContent="center">
          {renderField()}
        </FlexColumn>
      </StyledField>
    );
  }
);

Field.displayName = "Field";
