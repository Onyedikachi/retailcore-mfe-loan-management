import React, { useState } from 'react';
import { ListItemText, Popover, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Button, Menu, MenuItemProps } from './atoms';
import {
   CreateProductRouteMenuItems,
   CreateProductSubMenuItems,
   ProductTypesMenuOptions,
} from '@app/constants/configurations';
import { MenuItemContentsProps } from '@app/@types';

type StepLevel = 0 | 1 | 2 | 3;

const NestedDropdown: React.FC = () => {
   const [menuOptions, setMenuOptions] = useState<Array<MenuItemContentsProps>>([]);
   const [subMenuOptions, setSubMenuOptions] = useState<Array<MenuItemContentsProps>>([]);
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
   const [subMenuAnchorEl, setSubMenuAnchorEl] = React.useState<null | HTMLElement>(null);

   const handleMenuItemClick = (level: StepLevel) => {
      const clickEvent: MenuItemProps['onClick'] = (event, option) => {
         if (level === 1 && anchorEl) setAnchorEl(null);
         else if (level === 1) {
            setAnchorEl(event.currentTarget);
            [setMenuAnchorEl, setSubMenuAnchorEl].forEach((setState) => setState(null));
         } else if (level === 2) {
            setMenuOptions(CreateProductRouteMenuItems[option.label]);
            setMenuAnchorEl(event.currentTarget);
            setSubMenuAnchorEl(null);
         } else {
            setSubMenuOptions(CreateProductSubMenuItems[option.label]);
            setSubMenuAnchorEl(event.currentTarget);
         }
      };

      return clickEvent;
   };

   return (
      <div style={{ display: 'flex' }}>
         <Typography variant="inherit">Product Factory</Typography>
         <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={(event) => handleMenuItemClick(1)(event as any, { label: '' })}
         >
            Create New Product
         </Button>
         <Menu
            open={!!anchorEl}
            anchorEl={anchorEl}
            items={getMenuItemsProps(ProductTypesMenuOptions, handleMenuItemClick(2))}
         />
         <Popover anchorEl={menuAnchorEl} open={!!menuAnchorEl}>
            <Menu open={true} items={getMenuItemsProps(menuOptions, handleMenuItemClick(3))} />
         </Popover>
         <Popover anchorEl={menuAnchorEl} open={!!subMenuAnchorEl}>
            <Menu open={true} items={getMenuItemsProps(subMenuOptions)} />
         </Popover>
      </div>
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
