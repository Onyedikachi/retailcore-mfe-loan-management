import { Colors } from '@app/constants';
import {
   TableBody as MuiTableBody,
   TableCell,
   TableRow,
   TableBodyProps as MuiTableBodyProps,
   styled,
} from '@mui/material';
import { TableHeaderData } from './TableHeader';

const StyledTableRow = styled(TableRow)(() => ({
   backgroundColor: `${Colors.TableBgRed}`,
   borderBottom: `1px solid ${Colors.LightGray1}`,
}));

export interface TableBodyProps extends MuiTableBodyProps {
   rows: Array<Record<string, React.ReactNode>>;
   tableHeaderData?: Array<TableHeaderData>;
}

export const TableBody = ({ rows, tableHeaderData, ...otherProps }: TableBodyProps) => {
   const rowskeys = tableHeaderData?.map((data) => data.key) ?? Object.keys(rows[0]);

   return (
      <MuiTableBody {...otherProps}>
         {rows.map((row, index) => (
            <StyledTableRow
               key={String(index)}
               sx={{ '&:last-child td, &:last-child th': { border: 0, borderBottom: 0 } }}
            >
               {rowskeys.map((key, contentIndex) => (
                  <TableCell
                     sx={{ paddingY: 0.4 }}
                     key={`key ${String(row)}`}
                     scope="row"
                     {...(!contentIndex && { component: 'th' })}
                  >
                     {key === 'sn' ? index + 1 : row[key]}
                  </TableCell>
               ))}
            </StyledTableRow>
         ))}
      </MuiTableBody>
   );
};
