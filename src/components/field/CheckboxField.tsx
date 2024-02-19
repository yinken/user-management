import * as React from 'react';
interface CheckboxFieldProps {
  name: string;
  label: string;
  value: boolean;
  onChange: (key: string, value: boolean) => void;
  disabled?: boolean;
  showLabel?: boolean;
  searchTerm?: string;
}

export const CheckboxField = React.forwardRef(
  (props: CheckboxFieldProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { name, value, onChange, disabled = false } = props;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      onChange(name, event.target.checked);
    };

    return (
      <div className='checkbox'>
        <>
          <label>
            <input
              ref={ref}
              id={name}
              type='checkbox'
              name={name}
              checked={value}
              onChange={(event) => handleChange(event)}
              disabled={disabled}
            />
            <span className='checkmark'></span>
          </label>
        </>
      </div>
    );
  }
);
CheckboxField.displayName = 'CheckboxField';
