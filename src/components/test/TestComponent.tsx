import * as React from "react";

interface TestProps {
  testProp: string;
  align: string;
  children: React.ReactNode;
}

const StyledTestComponent: React.FC<TestProps> = () => {
  const className = `text-center mt-2 text-center md:text-left lg:text-right`;

  return (
    <div
      className={[
        "mt-2",
        "text-center",
        "mt-4",
        "md:text-left",
        "lg:text-right",
      ].join(" ")}
    ></div>
  );
};

export const TestComponent: React.FC<TestProps> = ({
  testProp,
  align,
  children,
}) => {
  return (
    <StyledTestComponent align={align} testProp={testProp}>
      {children}
    </StyledTestComponent>
  );
};
