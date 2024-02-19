import { useGetImageRatio } from "@/hooks/useGetImageRatio";
import { useLazyLoadImage } from "@/hooks/useLazyLoadImage";
import * as React from "react";
import styled from "styled-components";

export enum IMAGE_RATIO {
  SQUARE = "square",
  TALL = "tall",
  VERY_TALL = "very-tall",
  LONG = "long",
  VERY_LONG = "very-long",
}

interface ImageProps {
  src: string;
  height?: string;
  width?: string;
  minHeight?: string;
  minWidth?: string;
  className?: string;
  unmountOnError?: boolean;
  alt?: string;
}

const StyledImage = styled.img<{
  height?: string;
  width?: string;
  minHeight?: string;
  minWidth?: string;
}>`
  display: inline;
  position: relative;
  width: ${({ width }) => (width ? `${width} !important` : "100%")};
  height: ${({ height }) => (height ? `${height} !important` : "100%")};
  min-width: ${({ minWidth }) => minWidth || "auto"};
  min-height: ${({ minHeight }) => minHeight || "auto"};
  object-fit: contain;
`;

export const Image: React.FC<ImageProps> = ({
  src,
  height,
  width,
  minHeight,
  minWidth,
  className,
  unmountOnError = false,
  alt = "",
}): JSX.Element | null => {
  const { loadState } = useLazyLoadImage(src);
  const imageRatio = useGetImageRatio(loadState.width, loadState.height);

  const imageStyle = {
    width: [
      IMAGE_RATIO.LONG,
      IMAGE_RATIO.VERY_LONG,
      IMAGE_RATIO.SQUARE,
    ].includes(imageRatio)
      ? ""
      : "100%",
    height: [
      IMAGE_RATIO.TALL,
      IMAGE_RATIO.VERY_TALL,
      IMAGE_RATIO.SQUARE,
    ].includes(imageRatio)
      ? ""
      : "100%",
  };

  if (loadState.error && unmountOnError) {
    return null;
  }

  return (
    <StyledImage
      style={imageStyle}
      src={loadState.src}
      height={height}
      width={width}
      minHeight={minHeight}
      minWidth={minWidth}
      className={className}
      alt={alt}
    ></StyledImage>
  );
};
