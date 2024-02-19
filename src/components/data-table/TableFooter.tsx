import * as React from "react";
import { SPECIAL_FIELD_TYPES } from "../field/Field";
import { FlexColumn, FlexGrid } from "../flex-grid/FlexGrid";
import { Form } from "../form/Form";
import { space } from "@/utils/space";
import { Text } from "../text/Text";
import { determineSingularOrPlural } from "@/utils/translation";
import { useTranslation } from "react-i18next";
import { Pagination } from "../pagination/Pagination";

interface TableFooterProps {
  currentRows: number;
  totalRows: number;
  label?: {
    singular: string;
    plural: string;
  };
  currentPageIndex: number;
  totalPages: number;
  rowsPerPage: number;
  handlePageSelect: (pageIndex: number) => void;
  handleRowsPerPageChange: (rowsPerPage: 25 | 50 | 100 | 500) => void;
}

export const TableFooter: React.FC<TableFooterProps> = ({
  currentRows,
  totalRows,
  label,
  currentPageIndex,
  totalPages,
  rowsPerPage,
  handlePageSelect,
  handleRowsPerPageChange,
}) => {
  const { t } = useTranslation();
  return (
    <FlexGrid
      justifyContent="space-between"
      alignItems="center"
      gap={space(0.5)}
      className="table-footer"
    >
      <FlexColumn grow={0} alignItems="center" justifyContent="center">
        <Pagination
          onClick={handlePageSelect}
          currentPageIndex={currentPageIndex}
          totalPageCount={totalPages}
        />
      </FlexColumn>
      <FlexColumn alignItems="center" justifyContent="center">
        <Text ellipsis>
          {t("Showing X of Y {{something}}", {
            count: currentRows,
            total: totalRows,
            something: determineSingularOrPlural({
              singular: label ? label.singular : t("Row"),
              plural: label ? label.plural : t("Rows"),
              count: currentRows,
            }),
          })}
        </Text>
      </FlexColumn>
      <FlexColumn grow={0} alignItems="center" justifyContent="center">
        <Form
          fields={[
            {
              name: "rowsPerPage",
              label: t("Rows per page"),
              type: SPECIAL_FIELD_TYPES.SELECT,
              options: [25, 50, 100, 500].map((value) => ({
                label: value.toString(),
                value: value.toString(),
              })),
              value: rowsPerPage.toString(),
              onChange: (_key: string, value) => {
                const s = value as string;
                const v = parseInt(s, 10) as 25 | 50 | 100 | 500;
                handleRowsPerPageChange(v);
              },
              spaceEvenly: false,
            },
          ]}
        />
      </FlexColumn>
    </FlexGrid>
  );
};
