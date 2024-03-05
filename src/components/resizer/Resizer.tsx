import { colors, hexToRgba } from "@/utils/colors";
import * as React from "react";
import styled from "styled-components";

interface ResizerProps {
  onChange: (widthChange: number) => void;
  axis?: "x" | "y";
  position?: { x: "left" | "right"; y: "top" | "bottom" };
  defaultSize?: number;
  size?: {
    base: number;
    min: number;
    max: number;
  };
  element?: React.ReactNode;
}

const resizerSize = 3;

const StyledResizer = styled.div<{
  $axis?: "x" | "y";
  $position: { x: "left" | "right"; y: "top" | "bottom" };
}>`
  position: absolute;
  padding: 3px 0;
  background: ${colors.transparent};
  &:hover {
    background: ${hexToRgba(colors.skyblue60, 0.75)};
  }
  ${({ $axis: axis }) =>
    axis === "x" ? `height: ${resizerSize}px;` : "height: 100%;"}
  ${({ $axis: axis }) => (axis === "x" ? "width: 100%;" : `width: ${resizerSize}px;`)}

  ${({ $axis: axis, $position: position }) =>
    axis === "x" ? `${position.x}: 0;` : `${position.y}: 0;`}
  ${({ $axis: axis, $position: position }) =>
    axis === "x" ? `${position.y}: 0;` : `${position.x}: 0;`}

  ${({ $axis: axis }) =>
    axis === "x" ? "cursor: row-resize;" : "cursor: col-resize;"}


  z-index: 1000;
  .grabber {
    ${({ $axis: axis }) =>
      axis === "x" ? `height: ${resizerSize}px;` : "height: 30px;"}
    ${({ $axis: axis }) => (axis === "x" ? "width: 30px;" : `width:${resizerSize}px;`)}
    background: ${hexToRgba(colors.skyblue60, 0.75)};
    background: ${colors.transparent};
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Resizer: React.FC<ResizerProps> = ({
  onChange,
  axis = "y",
  position = { x: "left", y: "top" },
  size = {
    base: 200,
    min: 100,
    max: 400,
  },
}) => {
  const resizerRef = React.useRef<HTMLDivElement>(null);
  const startPosition = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const endPosition = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentSize = React.useRef<number>(size.base);

  const mouseDownListener = (event: React.MouseEvent) => {
    window.addEventListener("mousemove", mouseMoveListener);
    window.addEventListener("mouseup", mouseUpListener);
    startPosition.current = { x: event.clientX, y: event.clientY };
  };

  const mouseUpListener = (event: MouseEvent) => {
    endPosition.current = { x: event.clientX, y: event.clientY };

    switch (axis) {
      case "x": {
        const sizeChange =
          position.y === "bottom"
            ? event.clientY - startPosition.current.y
            : startPosition.current.y - event.clientY;
        let newSize = currentSize.current + sizeChange;
        if (newSize < size.min) {
          newSize = size.min;
        } else if (newSize > size.max) {
          newSize = size.max;
        }
        currentSize.current = newSize;
        break;
      }
      default: {
        const sizeChange =
          position.x === "right"
            ? event.clientX - startPosition.current.x
            : startPosition.current.x - event.clientX;

        let newSize = currentSize.current + sizeChange;
        if (newSize < size.min) {
          newSize = size.min;
        } else if (newSize > size.max) {
          newSize = size.max;
        }
        currentSize.current = newSize;
      }
    }

    window.removeEventListener("mousemove", mouseMoveListener);
    window.removeEventListener("mouseup", mouseUpListener);
  };

  const mouseMoveListener = (event: MouseEvent) => {
    event.preventDefault();
    switch (axis) {
      case "x": {
        const sizeChange =
          position.y === "bottom"
            ? event.clientY - startPosition.current.y
            : startPosition.current.y - event.clientY;
        const newSize = currentSize.current + sizeChange;
        if (newSize > size.min && newSize < size.max) {
          onChange(newSize);
        }
        break;
      }

      default: {
        const sizeChange =
          position.x === "right"
            ? event.clientX - startPosition.current.x
            : startPosition.current.x - event.clientX;

        const newSize = currentSize.current + sizeChange;

        if (newSize > size.min && newSize < size.max) {
          onChange(newSize);
        }
      }
    }
  };

  const handleDoubleClick = () => {
    if (currentSize.current === size.min) {
      currentSize.current = size.max;
      onChange(size.base);
    } else {
      onChange(size.min);
      currentSize.current = size.min;
    }
  };

  return (
    <StyledResizer
      ref={resizerRef}
      onMouseDown={(event) => mouseDownListener(event)}
      $axis={axis}
      $position={position}
    >
      <div className="grabber" onDoubleClick={() => handleDoubleClick()}></div>
    </StyledResizer>
  );
};

export default Resizer;
