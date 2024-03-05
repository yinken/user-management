import styled from 'styled-components';
import { FlexGrid } from '../flex-grid/FlexGrid';
import { colors, hexToRgba } from '@/utils/colors';
import { space } from '@/utils/space';

export const StyledDataTable = styled(FlexGrid)<{
  $isSelectable?: boolean;
  $contractBy?: number;
}>`
  position: relative;
  table {
    border-collapse: collapse;
    border-spacing: 0;
    flex-grow: 1;
    &.is-frozen {
      flex-grow: 0;
      z-index: 100;
      position: sticky;
      left: 0px;
      background: var(--bg-base-1);
      &:not(.is-left) {
        box-shadow: 0 0 4px 0 ${hexToRgba(colors.black, 0.35)};
      }
    }
  }
  a {
    text-decoration: underline;
  }
  
  tr {
    border-bottom: 1px solid var(--bg-base-3);
    ${({ $isSelectable: isSelectable }) =>
      isSelectable &&
      `&:hover {
    cursor: pointer;
    background-color: var(--color-accent-4);
  }
`}

    &:hover {
      cursor: pointer;
      background-color: var(--color-accent-4);
    }
    &.is-selected {
      background-color: var(--color-accent-5);
      position: sticky;
      z-index: 11;
      top: ${space(2)};
    }
  }

  .table-footer {
    padding: 0 0 0 ${space(0.5)};
    border-top: 1px solid var(--color-border-2);
    background-color: var(--bg-base-2);
    z-index: 20;
  }
  .column-filter {
    position: absolute;
    top: 100%;
  }
  .status-message {
    padding: ${space(0.5)};
    border: 0;
    position: relative;
  }
  .column-control {
    &.is-hidden {
      opacity: 0.5;
    }
  }
`;
