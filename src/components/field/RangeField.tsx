import { noop } from "lodash";
import * as React from "react";
import { FlexGrid } from "../flex-grid/FlexGrid";
import { space } from "@/utils/space";
import { Text } from "../text/Text";

interface RangeFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (key: string, value: string) => void;
  disabled?: boolean;
  showLabel?: boolean;
  min: string;
  max: string;
}

export const RangeField = React.forwardRef(
  (props: RangeFieldProps, _ref: React.ForwardedRef<HTMLInputElement>) => {
    const { name, value, onChange, disabled = false, min, max } = props;

    const toSliderRef = React.useRef<HTMLInputElement>(null);
    const fromSliderRef = React.useRef<HTMLInputElement>(null);

    const parsedValue = React.useMemo(() => {
      return value.split(",");
    }, [value]);

    const setToggleAccessible = (currentTarget?: HTMLInputElement) => {
      const toSlider = toSliderRef.current;
      if (!toSlider) {
        return;
      }
      if (Number(currentTarget?.value) <= 0) {
        toSlider.style.zIndex = "2";
      } else {
        toSlider.style.zIndex = "0";
      }
    };

    const updateFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
      let fromValue = event.target.value;
      const toValue = toSliderRef?.current?.value || "0";

      if (Number(fromValue) > Number(toValue)) {
        fromValue = toValue;
      }
      onChange(name, `${fromValue},${toValue}`);
    };

    const updateTo = (event: React.ChangeEvent<HTMLInputElement>) => {
      const fromValue = fromSliderRef?.current?.value || "0";
      let toValue = event.target.value;

      if (Number(fromValue) <= Number(toValue)) {
        noop();
      } else {
        toValue = fromValue;
      }
      onChange(name, `${fromValue},${toValue}`);
    };

    const fillSlider = React.useCallback(
      (sliderColor: string, rangeColor: string) => {
        const toSlider = toSliderRef.current;
        const fromSlider = fromSliderRef.current;
        if (!toSlider || !fromSlider) {
          return;
        }

        const rangeDistance = Number(max) - Number(min);
        const fromPosition = Number(fromSlider.value) - Number(min);
        const toPosition = Number(toSlider.value) - Number(min);
        toSlider.style.background = `linear-gradient(
        to right,
        ${sliderColor} 0%,
        ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
        ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
        ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
        ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
        ${sliderColor} 100%)`;
      },
      [max, min]
    );

    React.useEffect(() => {
      const toSlider = toSliderRef.current;
      if (!toSlider) {
        return;
      }
      fillSlider("red", "green");
      // onChange(name, `${fromValue},${toValue}`);
      setToggleAccessible(toSlider);
    }, [fillSlider]);

    return (
      <FlexGrid
        alignItems="center"
        justifyContent="center"
        direction="row"
        gap={space(0.25)}
      >
        <Text
          style={{
            flexShrink: 0,
            minWidth: space(1.5),
            textAlign: "left",
          }}
        >
          {parsedValue[0]}
        </Text>
        <div className="dual-range" style={{ position: "relative" }}>
          <input
            ref={fromSliderRef}
            onInput={updateFrom}
            type={"range"}
            min={min}
            max={max}
            value={parsedValue[0]}
            id="range1"
            step={1}
            disabled={disabled}
            style={{
              height: 0,
              zIndex: 1,
            }}
          />
          <input
            ref={toSliderRef}
            onInput={updateTo}
            type={"range"}
            min={min}
            max={max}
            step={1}
            value={parsedValue[1]}
            id="range2"
            disabled={disabled}
          />
        </div>

        <Text
          style={{
            flexShrink: 0,
            minWidth: space(1.5),
            textAlign: "right",
          }}
        >
          {parsedValue[1]}
        </Text>
      </FlexGrid>
    );
  }
);

RangeField.displayName = "RangeField";
