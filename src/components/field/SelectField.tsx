import * as React from 'react';
interface SelectFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (key: string, value: string) => void;
  options: { value: string | number; label: string }[];
  disabled?: boolean;
  showLabel?: boolean;
}

export const SelectField = React.forwardRef(
  (props: SelectFieldProps, ref: React.ForwardedRef<HTMLSelectElement>) => {
    const { name, value, onChange, options, disabled = false } = props;
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      event.stopPropagation();
      onChange(name, event.target.value);
    };

    return (
      <select
        id={name}
        ref={ref}
        disabled={disabled}
        name={name}
        value={value}
        onChange={(event) => handleChange(event)}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

SelectField.displayName = 'SelectField';
