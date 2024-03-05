import * as React from "react";
import { Container, FlexGridProps } from "./FlexGrid.css";

export const FlexGrid = React.forwardRef(
  (props: FlexGridProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const {
      className,
      alignItems,
      gap,
      direction,
      justifyContent,
      shrink,
      grow,
      height,
      width,
      children,
      style,
    } = props;
    return (
      <Container
        ref={ref}
        className={`flex-grid ${className ?? ""}`}
        $alignItems={alignItems}
        $gap={gap}
        $direction={direction}
        $justifyContent={justifyContent}
        $shrink={shrink}
        $grow={grow}
        $height={height}
        $width={width}
        style={style}
      >
        {children}
      </Container>
    );
  },
);
FlexGrid.displayName = "FlexGrid";

export const FlexRow = React.forwardRef(
  (props: FlexGridProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const {
      className,
      alignItems,
      gap,
      direction,
      justifyContent,
      shrink,
      grow,
      height,
      width,
      children,
      style,
    } = props;
    return (
      <Container
        ref={ref}
        className={`flex-grid ${className ?? ""}`}
        $height={height || "auto"}
        $width={width || "100%"}
        $direction={direction || "row"}
        $alignItems={alignItems}
        $gap={gap}
        $justifyContent={justifyContent}
        $shrink={shrink}
        $grow={grow}
        style={style}
      >
        {children}
      </Container>
    );
  },
);
FlexRow.displayName = "FlexRow";

export const FlexColumn = React.forwardRef(
  (props: FlexGridProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const {
      className,
      alignItems,
      gap,
      direction,
      justifyContent,
      shrink,
      grow,
      height,
      width,
      children,
      style
    } = props;
    return (
      <Container
        ref={ref}
        $height={height || "100%"}
        $width={width || "auto"}
        $direction={direction || "column"}
        className={`flex-grid ${className ?? ""}`}
        $alignItems={alignItems}
        $gap={gap}
        $justifyContent={justifyContent}
        $shrink={shrink}
        $grow={grow}
        style={style}
      >
        {children}
      </Container>
    );
  },
);
FlexColumn.displayName = "FlexRow";
