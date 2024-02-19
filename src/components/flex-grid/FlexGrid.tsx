"use client";
import * as React from "react";
import { Container, FlexGridProps } from "./FlexGrid.css";



export const FlexGrid = React.forwardRef(
  (props: FlexGridProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { className, alignItems, ...rest } = props;
    return (
      <Container
        ref={ref}
        className={`flex-grid ${className ?? ""}`}
        alignItems={alignItems}
        {...rest}
      />
    );
  }
);
FlexGrid.displayName = "FlexGrid";

export const FlexRow = React.forwardRef(
  (props: FlexGridProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { className, height, width, direction, alignItems, ...rest } = props;
    return (
      <Container
        ref={ref}
        height={height || "auto"}
        width={width || "100%"}
        direction={direction || "row"}
        className={`flex-grid ${className ?? ""}`}
        alignItems={alignItems}
        {...rest}
      />
    );
  }
);
FlexRow.displayName = "FlexRow";

export const FlexColumn = React.forwardRef(
  (props: FlexGridProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { className, height, width, direction, alignItems, ...rest } = props;
    return (
      <Container
        ref={ref}
        height={height || "100%"}
        width={width || "auto"}
        direction={direction || "column"}
        className={`flex-grid ${className ?? ""}`}
        alignItems={alignItems}
        {...rest}
      />
    );
  }
);
FlexColumn.displayName = "FlexRow";
