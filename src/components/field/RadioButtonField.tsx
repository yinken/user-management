import * as React from 'react';
interface RadioButtonFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (key: string, value: string) => void;
  options: { value: string | number; label: string }[];
  disabled?: boolean;
  showLabel?: boolean;
}

export const RadioButtonField = React.forwardRef(
  (props: RadioButtonFieldProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { name, value, onChange, options, disabled = false } = props;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      onChange(name, event.target.value);
    };

    return (
      <div className='radio-options'>
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <label key={option.value}>
              <input
                ref={ref}
                type='radio'
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(event) => handleChange(event)}
                disabled={disabled}
              />
              {option.label}
              <span className='checkmark'></span>
            </label>
          </React.Fragment>
        ))}
      </div>
    );
  }
);
RadioButtonField.displayName = 'RadioButtonField';
