import { TableHeaderData } from '@app/components/table';

export type HeaderRowType = Pick<TableHeaderData, 'element' | 'key'> & {
   title?: string;
   formatter?: (value: unknown) => number | boolean | string;
};

export type ExportConfiguration = {
   skipColumn?: Array<string>;
};

export const retrieveTableData = (
   headerRow: Array<HeaderRowType>,
   body: Array<Record<string, unknown>>,
   config?: ExportConfiguration
) => {
   const displayedColumn = headerRow.filter((row) => !config?.skipColumn?.includes(row.key));

   const bodyContents = body.map((bodyRow, bodyIndex) =>
      displayedColumn.map(({ formatter, key }) => {
         return key === 'sn' ? bodyIndex + 1 : formatter?.(bodyRow[key]) ?? bodyRow[key] ?? '';
      })
   );

   const headerContents = displayedColumn.map((row) => row.title ?? row.element ?? '');

   return { headerContents, bodyContents };
};

export const retrieveTableDataByID = (id: string) => {
   const tableElement = document.querySelector(`#${id}`);

   const headerContents = Array.from(
      tableElement?.querySelectorAll('.MuiTableRow-head .MuiTableCell-head .MuiTypography-root') ?? []
   ).map((cell) => cell.textContent ?? '');

   const bodyContents = Array.from(
      tableElement?.querySelectorAll('.MuiTableBody-root .MuiTableRow-root') ?? []
   ).map((tableRow) =>
      Array.from(tableRow.querySelectorAll('.MuiTableCell-root') ?? []).map((cell) => cell.textContent ?? '')
   );

   return { headerContents, bodyContents };
};
