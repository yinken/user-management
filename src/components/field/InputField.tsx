import * as React from 'react';
import { INPUT_FIELD_TYPES } from './Field';

interface InputFieldProps {
  type: INPUT_FIELD_TYPES;
  name: string;
  label: string;
  value: string;
  onChange: (key: string, value: string) => void;
  disabled?: boolean;
  showLabel?: boolean;
}

export const InputField = React.forwardRef(
  (props: InputFieldProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { type, name, value, onChange, disabled = false } = props;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      onChange(name, event.target.value);
    };

    return (
      <input
        id={name}
        ref={ref}
        type={type}
        name={name}
        value={value}
        checked={value === value}
        onChange={(event) => handleChange(event)}
        disabled={disabled}
      />
    );
  }
);
InputField.displayName = 'InputField';
