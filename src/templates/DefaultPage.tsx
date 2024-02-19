"use client";
import * as React from "react";
import styled from "styled-components";
import { FlexGrid, FlexRow } from "@/components/flex-grid/FlexGrid";
import { space } from "@/utils/space";
import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";

interface DefaultPageProps {
  title?: string;
  transparent?: boolean;
  children: React.ReactNode;
}

const StyledDefaultPage = styled(FlexGrid)<{ transparent?: boolean }>`
  ${({ transparent }) =>
    transparent
      ? `
    background: transparent;
    `
      : `
    background: transparent;
  `};
  z-index: 1;
  .content {
    transition: padding-right 0s ease-in-out, padding-left 0s ease-in-out;
  }
`;

export const DefaultPage: React.FC<DefaultPageProps> = ({
  title,
  children,
  transparent,
}) => {
  const componentRef = React.useRef<HTMLDivElement>(null);

  const breadcrumbs = React.useMemo(() => {
    const crumbs = [];
    if (title) {
      crumbs.push(title);
    }

    return crumbs;
  }, [title]);

  return (
    <StyledDefaultPage transparent={transparent}>
      <FlexGrid direction="column" ref={componentRef} className="content">
        {title && (
          <FlexRow
            grow={0}
            gap={space(1)}
            alignItems="center"
            style={{
              padding: `0 ${space(0.5)} 0 ${space(0.5)}`,
              height: space(2),
            }}
          >
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </FlexRow>
        )}
        <FlexRow>{children}</FlexRow>
      </FlexGrid>
    </StyledDefaultPage>
  );
};
