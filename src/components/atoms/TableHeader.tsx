import { IconType } from '@app/@types';
import { TableHead as MuiTableHead, TableCell, TableHeadProps, TableRow } from '@mui/material';
import React from 'react';
import { Icon as IconSVG } from './Icon';

export interface TableHeaderData {
   key: string;
   isEmpty?: string;
   leftIcon?: ((props: any) => JSX.Element) | IconType;
   rightIcon?: ((props: any) => JSX.Element) | IconType;
   element?: React.ReactNode;
   leftIconKey?: string;
   rightIconKey?: string;
   iconKey: string;
}

export interface TableHeaderProps extends TableHeadProps {
   data: Array<TableHeaderData>;
   onIconClick?: (columnKey?: string, iconkey?: string) => void;
}

export const TableHeader = ({ data, onIconClick, ...restProps }: TableHeaderProps) => {
   return (
      <MuiTableHead {...restProps}>
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
               }) => {
                  const rightIcon = tableIcon(RightIcon, key, rightIconKey ?? iconKey, onIconClick);
                  const leftIcon = tableIcon(LeftIcon, key, leftIconKey ?? iconKey, onIconClick);
                  return (
                     <TableCell>
                        {!isEmpty && (
                           <>
                              {leftIcon}
                              {element}
                              {rightIcon}
                           </>
                        )}
                     </TableCell>
                  );
               }
            )}
         </TableRow>
      </MuiTableHead>
   );
};

const tableIcon = (
   Icon?: TableHeaderData['leftIcon'],
   key?: string,
   iconKey?: string,
   onClick?: TableHeaderProps['onIconClick']
) => {
   return (
      (Icon &&
         (typeof Icon === 'string' ? (
            <IconSVG type={Icon} onClick={() => onClick?.(key, iconKey)} />
         ) : (
            <Icon onClick={() => onClick?.(key, iconKey)} />
         ))) ||
      Icon
   );
};
