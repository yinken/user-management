import * as React from "react";
import styled from "styled-components";
import { FieldProps as FieldType, Field } from "../field/Field";
import { FlexGrid } from "../flex-grid/FlexGrid";
import { space } from "@/utils/space";

interface FormProps {
  fields: FieldType[];
  direction?: "row" | "column";
  fieldLayout?: "stacked" | "inline";
  hasSpacing?: boolean;
  disabled?: boolean;
  alternateColumns?: boolean;
}

const StyledForm = styled.form`
  width: 100%;
`;

export const Form: React.FC<FormProps> = ({
  fields,
  direction = "column",
  fieldLayout = "inline",
  hasSpacing = false,
  disabled,
  alternateColumns = true,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <StyledForm onSubmit={handleSubmit}>
      <FlexGrid direction={direction} gap={hasSpacing ? space(0.5) : "0"}>
        {fields.map((field) => {
          if (!field.type) {
            return null;
          }
          return (
            <Field
              {...field}
              key={field.name}
              fieldLayout={fieldLayout}
              disabled={field.disabled || disabled}
              alternateColumns={alternateColumns}
            />
          );
        })}
      </FlexGrid>
    </StyledForm>
  );
};
