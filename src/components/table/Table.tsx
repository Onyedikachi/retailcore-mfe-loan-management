import { TableContainer, Table as MuiTable, TableProps as MuiTableProps } from '@mui/material';
import { TableHeader, TableHeaderProps } from './TableHeader';
import { TableBody, TableBodyProps } from './TableBody';

export interface TableProps extends MuiTableProps {
   tableName?: string;
   minWidth?: number;
   headerProps?: TableHeaderProps;
   bodyProps: TableBodyProps;
}

export const Table = ({ minWidth, headerProps, bodyProps, tableName, ...restProp }: TableProps) => {
   const { data, onIconClick, ...restHeaderProps } = headerProps ?? {};
   const { rows, ...restBodyProps } = bodyProps;

   return (
      <TableContainer>
         <MuiTable sx={{ minWidth: minWidth ?? 650 }} aria-label={tableName} {...restProp}>
            {headerProps && <TableHeader onIconClick={onIconClick} data={data ?? []} {...restHeaderProps} />}
            <TableBody rows={rows} tableHeaderData={data} {...restBodyProps} />
         </MuiTable>
      </TableContainer>
   );
};
