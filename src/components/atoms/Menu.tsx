import { Menu as MuiMenu, MenuProps as MuiMenuProps, styled } from '@mui/material';
import { MenuItem, MenuItemProps } from './MenuItems';
import { useState } from 'react';

const StyledMenu = styled(MuiMenu)({
   'MuiPaper-root': {
      boxShadow: '0 1px 5px rgb(0 0 0 / 0.2)',
      borderRadius: '0 0 10px 10px',
   },
});

export interface MenuProps extends MuiMenuProps {
   items: Array<MenuItemProps>;
}

export const Menu = ({ open = false, items, ...restProps }: MenuProps) => {
   const [activeItem, setActiveItem] = useState(0);

   return (
      <StyledMenu open={open} {...restProps}>
         {items.map((item, index) => (
            <MenuItem
               className={`${item.className ?? ''} ${activeItem === index ? 'activeList' : ''}`}
               {...item}
               onClick={(...args) => {
                  item?.onClick?.(...args);
                  setActiveItem(index);
               }}
               key={item.label}
            />
         ))}
      </StyledMenu>
   );
};
