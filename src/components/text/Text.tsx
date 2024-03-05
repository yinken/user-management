"use client";
import * as React from "react";
import styled, { css } from "styled-components";

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  bold?: boolean;
  italic?: boolean;
  uppercase?: boolean;
  ellipsis?: boolean | string;
  size?: "L" | "M" | "S" | "XS" | "XXS";
  width?: string;
  as?: React.ElementType;
  children: React.ReactNode;
}

const sizes = {
  L: css`
    font-size: 1.25rem;
    line-height: 1.5rem;
  `,
  M: css`
    font-size: 1rem;
    line-height: 1.25rem;
  `,
  S: css`
    font-size: 0.875rem;
    line-height: 1.25rem;
  `,
  XS: css`
    font-size: 0.75rem;
    line-height: 1rem;
  `,
  XXS: css`
    font-size: 0.625rem;
    line-height: 0.75rem;
    text-transform: uppercase;
  `,
};

const StyledText = styled.span<{
  $bold?: boolean;
  $italic?: boolean;
  $uppercase?: boolean;
  $ellipsis?: boolean | string;
  $size?: "L" | "M" | "S" | "XS" | "XXS";
  $width?: string;
}>`
  ${({ $size: size = "S" }) => sizes[size]};
  ${({ $ellipsis: ellipsis, $width: width }) =>
    ellipsis &&
    `
    display: inline-block;
    max-width: ${width};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    `};
  font-weight: ${({ $bold: bold }) => bold && 700};
  font-style: ${({ $italic: italic }) => italic && "italic"};
  text-transform: ${({ $uppercase: uppercase }) => uppercase && "uppercase"};
  margin: 0;
  padding: 0;
`;

export const Text: React.FC<TextProps> = ({
  bold,
  italic,
  uppercase,
  ellipsis,
  size,
  as,
  width,
  children,
}) => {
  return (
    <StyledText
      as={as}
      $bold={bold}
      $italic={italic}
      $uppercase={uppercase}
      $ellipsis={ellipsis}
      $size={size}
      $width={width}
    >
      {children}
    </StyledText>
  );
};
