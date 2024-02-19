import { Dataset } from 'hubv2/types/data';
import * as React from 'react';
import styled from 'styled-components';

interface DataTableProps {
  dataset: Dataset;
  labels: string[];
}

const StyledDataTable = styled.div``;

export const DataTable: React.FC<DataTableProps> = ({ dataset, labels }) => {
  return (
    <StyledDataTable>
      <table>
        <tbody>
          {dataset.data.map((row, index) => {
            return (
              <tr key={index}>
                <td>{labels[index]}</td>
                <td>{row}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </StyledDataTable>
  );
};
