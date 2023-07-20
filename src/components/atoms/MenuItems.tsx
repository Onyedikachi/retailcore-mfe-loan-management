import { MenuItemContentsProps } from '@app/@types';
import { Colors } from '@app/constants';
import { MenuItem as MuiMenuItem, MenuItemProps as MuiMenuItemProps, styled } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const StyledMenuItem = styled(MuiMenuItem)(() => ({
   '&:hover:not(.Mui-disabled):not(.Mui-selected)': {
      backgroundColor: '#f6f6f6',
   },
   '&.Mui-selected': {
      backgroundColor: Colors.LightPrimary,
   },
   '&.Mui-focusVisible': {
      backgroundColor: Colors.LightPrimary,
   },
}));

export interface MenuItemProps extends Omit<MuiMenuItemProps, 'onClick'> {
   label?: string;
   href?: string;
   children?: React.ReactNode;
   onClick?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>, props: MenuItemContentsProps) => void;
}

export const MenuItem = ({ label, href, children, onClick, ...restProps }: MenuItemProps) => {
   const Anchor = href ? Link : React.Fragment;
   return (
      <StyledMenuItem onClick={(event) => onClick?.(event, { label: label ?? '', href })} {...restProps}>
         <Anchor style={{ textDecoration: 'none' }} to={href ?? ''}>
            {children ?? label}
         </Anchor>
      </StyledMenuItem>
   );
};
