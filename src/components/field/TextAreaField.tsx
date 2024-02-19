import * as React from 'react';

interface TextAreaFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (key: string, value: string) => void;
  disabled?: boolean;
  showLabel?: boolean;
}

export const TextAreaField = React.forwardRef(
  (props: TextAreaFieldProps, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
    const { name, value, onChange, disabled = false } = props;
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      event.stopPropagation();
      onChange(name, event.target.value);
    };

    return (
      <textarea
        id={name}
        ref={ref}
        name={name}
        value={value}
        onChange={(event) => handleChange(event)}
        disabled={disabled}
        rows={5}
      />
    );
  }
);
TextAreaField.displayName = 'TextAreaField';
