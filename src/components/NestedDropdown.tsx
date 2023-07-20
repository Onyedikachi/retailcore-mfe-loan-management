import React, { useState } from 'react';
import { Box, ListItemText, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Button, Menu, MenuItemProps } from './atoms';
import {
   CreateProductRouteMenuItems,
   CreateProductSubMenuItems,
   ProductTypesMenuOptions,
} from '@app/constants/configurations';
import { MenuItemContentsProps } from '@app/@types';

type StepLevel = 1 | 2 | 3;

const anchorOrigin = {
   vertical: 'top',
   horizontal: 'right',
} as const;

const paperProps = { paper: { style: { minWidth: '200px' } } };

export const NestedDropdown: React.FC = () => {
   const [menuOptions, setMenuOptions] = useState<Array<MenuItemContentsProps>>([]);
   const [subMenuOptions, setSubMenuOptions] = useState<Array<MenuItemContentsProps>>([]);
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
   const [subMenuAnchorEl, setSubMenuAnchorEl] = React.useState<null | HTMLElement>(null);

   const handleMenuItemClick = (level: StepLevel) => {
      const clickEvent: MenuItemProps['onClick'] = (event, option) => {
         if (level === 1) {
            setAnchorEl(event.currentTarget);
         } else if (level === 2) {
            setMenuOptions(CreateProductRouteMenuItems[option.label] ?? []);
            setMenuAnchorEl(event.currentTarget);
         } else {
            setSubMenuOptions(CreateProductSubMenuItems[option.label] ?? []);
            setSubMenuAnchorEl(event.currentTarget);
         }
      };

      return clickEvent;
   };

   const handleClose = (level: StepLevel) => {
      if (level === 1) setAnchorEl(null);
      else if (level === 2) setMenuAnchorEl(null);
      else if (level === 3) setSubMenuAnchorEl(null);
   };

   return (
      <Box alignItems="center" gap={5} display="flex">
         <Typography variant="h1">Product Factory</Typography>
         <Button
            sx={{ paddingY: 0.7 }}
            variant="contained"
            startIcon={<AddIcon />}
            onClick={(event) => handleMenuItemClick(1)(event as any, { label: '' })}
         >
            Create New Product
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
         <Menu
            open={!!menuAnchorEl}
            anchorEl={menuAnchorEl}
            slotProps={paperProps}
            items={getMenuItemsProps(menuOptions, (event, option) => handleMenuItemClick(3)(event, option))}
            anchorOrigin={anchorOrigin}
            onClose={() => handleClose(2)}
         />
         <Menu
            anchorEl={subMenuAnchorEl}
            open={!!subMenuAnchorEl}
            items={getMenuItemsProps(subMenuOptions)}
            anchorOrigin={anchorOrigin}
            slotProps={paperProps}
            onClose={() => handleClose(3)}
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
