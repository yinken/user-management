import { noop } from 'lodash';
import * as React from 'react';
import { FlexGrid } from '../flex-grid/FlexGrid';
import { convertTimestampToDateString } from '@/utils/date';
import { space } from '@/utils/space';

interface DateRangeFieldProps {
  name: string;
  label: string;
  value?: string;
  onChange: (key: string, value: string) => void;
  disabled?: boolean;
  showLabel?: boolean;
}

export const DateRangeField = React.forwardRef(
  (props: DateRangeFieldProps, _ref: React.ForwardedRef<HTMLInputElement>) => {
    const { name, value, onChange, disabled = false } = props;

    const toSliderRef = React.useRef<HTMLInputElement>(null);
    const fromSliderRef = React.useRef<HTMLInputElement>(null);

    const today = convertTimestampToDateString(new Date().getTime());
    const tomorrow = convertTimestampToDateString(
      new Date().getTime() + 86400000
    );

    const parsedValue = React.useMemo(() => {
      return value?.split(',') || [today, tomorrow];
    }, [value, today, tomorrow]);

    const updateFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
      const fromValue = event.target.value;
      const toValue = toSliderRef?.current?.value || today;

      let fromDate = new Date(fromValue);
      const toDate = new Date(toValue);

      if (fromDate > toDate) {
        fromDate = toDate;
      }
      onChange(name, `${fromDate.getTime()},${toDate.getTime()}`);
    };

    const updateTo = (event: React.ChangeEvent<HTMLInputElement>) => {
      const fromValue = fromSliderRef?.current?.value || tomorrow;
      const toValue = event.target.value;

      const fromDate = new Date(fromValue);
      let toDate = new Date(toValue);

      if (fromDate <= toDate) {
        noop();
      } else {
        toDate = fromDate;
      }
      onChange(name, `${fromDate.getTime()},${toDate.getTime()}`);
    };

    React.useEffect(() => {
      const toSlider = toSliderRef.current;
      if (!toSlider) {
        return;
      }
    }, []);

    return (
      <FlexGrid
        alignItems='center'
        justifyContent='center'
        direction='row'
        gap={space(0.25)}
        className={'dual-range'}
      >
        <input
          ref={fromSliderRef}
          onInput={updateFrom}
          type={'date'}
          id='range1'
          disabled={disabled}
          value={parsedValue[0]}
        />
        <input
          ref={toSliderRef}
          onInput={updateTo}
          type={'date'}
          id='range2'
          disabled={disabled}
          value={parsedValue[1]}
        />
      </FlexGrid>
    );
  }
);

DateRangeField.displayName = 'DateRangeField';
