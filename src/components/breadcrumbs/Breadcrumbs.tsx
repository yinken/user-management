"use client";
import * as React from "react";
import { Text } from "@/components/text/Text";

interface BreadcrumbsProps {
  breadcrumbs: string[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <div>
      {breadcrumbs.map((breadcrumb, index) => (
        <Text key={index} bold={index === 0} size={index === 0 ? "M" : "S"}>
          {breadcrumb}
          {index < breadcrumbs.length - 1 && " / "}
        </Text>
      ))}
    </div>
  );
};
