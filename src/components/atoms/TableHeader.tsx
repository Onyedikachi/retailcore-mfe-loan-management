import { IconType } from '@app/@types';
import {
   Box,
   TableHead as MuiTableHead,
   TableCell,
   TableHeadProps,
   TableRow,
   Typography,
   styled,
} from '@mui/material';
import React from 'react';
import { Icon as IconSVG } from './Icon';
import { Colors } from '@app/constants/colors';
import { StatusIndicator } from './StatusIndicator';

const StyledTableHeader = styled(MuiTableHead)({
   '& th': { position: 'relative', color: Colors.LightGray },
   '& th::after': {
      content: '""',
      position: 'absolute',
      top: '40%',
      right: 0,
      width: '1px',
      height: '16px',
      background: Colors.LightGray,
   },
});
export interface TableHeaderData {
   key: string;
   isEmpty?: string;
   leftIcon?: React.ReactNode | IconType;
   rightIcon?: React.ReactNode | IconType;
   element?: React.ReactNode;
   leftIconKey?: string;
   rightIconKey?: string;
   iconKey?: string;
   recentlyUpdated?: boolean;
}

export interface TableHeaderProps extends TableHeadProps {
   data: Array<TableHeaderData>;
   onIconClick?: (columnKey?: string, iconkey?: string) => void;
}

export const TableHeader = ({ data, onIconClick, ...restProps }: TableHeaderProps) => {
   return (
      <StyledTableHeader {...restProps}>
         <TableRow>
            {data.map(
               ({
                  key,
                  isEmpty,
                  leftIcon: LeftIcon,
                  rightIcon: RightIcon,
                  element,
                  leftIconKey,
                  rightIconKey,
                  iconKey,
                  recentlyUpdated,
               }) => {
                  const rightIcon = tableIcon(RightIcon, key, rightIconKey ?? iconKey, onIconClick);
                  const leftIcon = tableIcon(LeftIcon, key, leftIconKey ?? iconKey, onIconClick);
                  return (
                     <TableCell key={key}>
                        {!isEmpty && (
                           <Box
                              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                           >
                              {leftIcon}
                              <Typography component="span" fontSize={14} display="flex">
                                 {element} {recentlyUpdated && <StatusIndicator />}
                              </Typography>
                              {rightIcon}
                           </Box>
                        )}
                     </TableCell>
                  );
               }
            )}
         </TableRow>
      </StyledTableHeader>
   );
};

const tableIcon = (
   Icon?: TableHeaderData['leftIcon'],
   key?: string,
   iconKey?: string,
   onClick?: TableHeaderProps['onIconClick']
) => {
   return (
      Icon &&
      (typeof Icon === 'string' ? (
         <IconSVG sx={{ fontSize: 14 }} type={Icon as IconType} onClick={() => onClick?.(key, iconKey)} />
      ) : (
         Icon
      ))
   );
};
