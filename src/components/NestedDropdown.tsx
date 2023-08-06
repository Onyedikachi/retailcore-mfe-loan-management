import React from 'react';
import { Box, ListItemText, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Button, Menu, MenuItemProps } from './atoms';
import { ProductTypesMenuOptions } from '@app/constants/configurations';
import { MenuItemContentsProps } from '@app/@types';

type StepLevel = 1 | 2 | 3;

export const NestedDropdown: React.FC = () => {
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

   const handleMenuItemClick = (level: StepLevel) => {
      const clickEvent: MenuItemProps['onClick'] = (event) => {
         if (level === 1) {
            setAnchorEl(event.currentTarget);
         }
      };

      return clickEvent;
   };

   const handleClose = (level: StepLevel) => {
      if (level === 1) setAnchorEl(null);
   };

   return (
      <Box alignItems="center" gap={5} display="flex">
         <Typography variant="h2">Loan Management</Typography>
         <Button
            sx={{ paddingY: 0.7 }}
            variant="contained"
            startIcon={<AddIcon />}
            onClick={(event) => handleMenuItemClick(1)(event as any, { label: '' })}
         >
            Book Loan
         </Button>
         <Menu
            open={!!anchorEl}
            anchorEl={anchorEl}
            slotProps={{ paper: { style: { width: anchorEl ? `${anchorEl.clientWidth}px` : undefined } } }}
            items={getMenuItemsProps(ProductTypesMenuOptions, (event, option) =>
               handleMenuItemClick(2)(event, option)
            )}
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'left',
            }}
            onClose={() => handleClose(1)}
         />
      </Box>
   );
};

const getMenuItemsProps = (
   items: Array<MenuItemContentsProps>,
   onClick?: MenuItemProps['onClick']
): Array<MenuItemProps> => {
   return items.map(({ href, label }) => ({
      href: href,
      children: MenuItemContents({ href, label }),
      onClick: !href ? onClick : undefined,
      label,
   }));
};

export default NestedDropdown;

const MenuItemContents = ({ label, href }: MenuItemContentsProps) => {
   return (
      <>
         <ListItemText>{label}</ListItemText>
         {!href && <ArrowRightIcon />}
      </>
   );
};
