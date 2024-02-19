"use client";
import * as React from "react";
import styled from "styled-components";

interface TestProps {
  testProp: string;
  align: string;
}

const StyledTestProps = styled.div<{ $xyz: string }>`
  display: flex;
  align-items: ${({ $xyz }) => $xyz};
  justify-content: center;
  width: 100%;
  height: 100%;
  background: red;
  color: white;
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  transition: background 0.3s ease-in-out;
  &:hover {
    background: blue;
  }
`;

export const TestComponent: React.FC<TestProps> = ({ testProp, align }) => {
  return <StyledTestProps $xyz={align}>{testProp}</StyledTestProps>;
};
