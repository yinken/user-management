import * as React from 'react';
import { Switch } from '../switch/Switch';
interface SwitchFieldProps {
  name: string;
  label: string;
  value: boolean;
  onClick: (key: string, value: boolean) => void;
  disabled?: boolean;
  showLabel?: boolean;
  searchTerm?: string;
}

export const SwitchField = React.forwardRef(
  (props: SwitchFieldProps, _ref: React.ForwardedRef<HTMLDivElement>) => {
    const { name, value, onClick } = props;

    const handleChange = (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      onClick(name, !value);
    };

    return (
      <Switch
        onClick={handleChange}
        toggle={value}
      />
    );
  }
);
SwitchField.displayName = 'SwitchField';
