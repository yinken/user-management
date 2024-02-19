import React from 'react';
import { Button } from '../button/Button';
import { FlexColumn, FlexGrid } from '../flex-grid/FlexGrid';
import { ICON, useIcon } from '../icon/useIcon';
import { Text } from '../text/Text';

interface EditableFieldProps {
  children: React.ReactNode;
  onClick?: () => void;
  onSave: (key: string, value: string) => void;
  name: string;
  label: string;
  showLabel?: boolean;
}

export const EditableField = React.forwardRef(
  (props: EditableFieldProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { children, onSave, name } = props;
    const { i } = useIcon();
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const [currentValue, setCurrentValue] = React.useState<string>(
      String(children)
    );
    const [tempValue, setTempValue] = React.useState<string>(String(children));

    React.useEffect(() => {
      setCurrentValue(String(children));
      setTempValue(String(children));
    }, [children]);

    const handleEdit = () => {
      setIsEditing(true);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      setTempValue(event.target.value);
    };

    const handleSave = React.useCallback(() => {
      if (tempValue.trim().length > 0) {
        setCurrentValue(tempValue);
        setIsEditing(false);
        onSave(name, tempValue);
      }
    }, [name, onSave, tempValue]);

    const handleCancel = React.useCallback(() => {
      setTempValue(currentValue);
      setIsEditing(false);
    }, [currentValue]);

    const keyboardListener = React.useCallback(
      (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === 'Tab') {
          onSave(name, tempValue);
        } else if (event.key === 'Escape') {
          handleCancel();
        }
      },
      [handleCancel, name, onSave, tempValue]
    );

    React.useEffect(() => {
      const r = ref as React.MutableRefObject<HTMLInputElement>;
      const input = r?.current;

      if (input && isEditing) {
        input.focus();
        input.addEventListener('keydown', keyboardListener);

        return () => {
          input.removeEventListener('keydown', keyboardListener);
        };
      }
    }, [isEditing, ref, keyboardListener]);

    const fieldComponents = React.useMemo(() => {
      const components = [];
      if (isEditing) {
        components.push(
          <FlexGrid alignItems='center'>
            <FlexColumn alignItems='center'>
              <input
                ref={ref}
                type='text'
                name={name}
                value={tempValue}
                onChange={(event) => handleChange(event)}
              />
            </FlexColumn>
            <FlexColumn
              grow={0}
              shrink={0}
              direction='row'
            >
              <Button
                onClick={handleCancel}
                variant='tertiary'
                hasBorder={false}
                isSquare={true}
                isRounded={false}
              >
                {i(ICON.CANCEL)}
              </Button>
              <Button
                onClick={handleSave}
                variant='tertiary'
                hasBorder={false}
                isSquare={true}
                isRounded={false}
              >
                {i(ICON.CHECKED)}
              </Button>
            </FlexColumn>
          </FlexGrid>
        );
      } else {
        components.push(
          <FlexGrid alignItems='center'>
            <FlexColumn justifyContent='center'>
              <Text ellipsis>{currentValue}</Text>
            </FlexColumn>
            <FlexColumn
              grow={0}
              shrink={0}
            >
              <Button
                variant='tertiary'
                hasBorder={false}
                isSquare={true}
                onClick={handleEdit}
                isRounded={false}
              >
                {i(ICON.EDIT)}
              </Button>
            </FlexColumn>
          </FlexGrid>
        );
      }
      return components;
    }, [
      currentValue,
      handleCancel,
      handleSave,
      i,
      isEditing,
      name,
      ref,
      tempValue,
    ]);

    return (
      <FlexGrid onDoubleClick={!isEditing ? handleEdit : undefined}>
        {fieldComponents.map((component, index) => (
          <React.Fragment key={index}>{component}</React.Fragment>
        ))}
      </FlexGrid>
    );
  }
);

EditableField.displayName = 'EditableField';
