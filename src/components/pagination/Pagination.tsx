import * as React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Button } from "../button/Button";
import { FlexColumn, FlexGrid } from "../flex-grid/FlexGrid";
import { Text } from "../text/Text";
import { space } from "@/utils/space";

interface PaginationProps {
  currentPageIndex: number;
  onClick: (pageIndex: number) => void;
  totalPageCount: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPageIndex,
  totalPageCount,
  onClick,
}) => {
  const { t } = useTranslation();

  const handlePageClick = (pageIndex: number) => {
    onClick(pageIndex);
  };

  if (!totalPageCount) {
    return null;
  }

  return (
    <FlexGrid
      gap={space(0.25)}
      alignItems="center"
      className="Pagination"
      grow={0}
    >
      <FlexColumn grow={0} justifyContent="center">
        <Text ellipsis>{t("Page")}</Text>
      </FlexColumn>
      <FlexColumn grow={0} justifyContent="center" direction="row">
        {Array.from(Array(totalPageCount).keys()).map((index) => {
          return (
            <Button
              key={index}
              variant="tertiary"
              isSquare={true}
              isRounded={false}
              hasBorder={false}
              onClick={() => handlePageClick(index)}
              isActive={currentPageIndex === index}
            >
              {index + 1}
            </Button>
          );
        })}
      </FlexColumn>
    </FlexGrid>
  );
};
