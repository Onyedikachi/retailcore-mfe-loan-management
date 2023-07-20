import { Menu as MuiMenu, MenuProps as MuiMenuProps, styled } from '@mui/material';
import { MenuItem, MenuItemProps } from './MenuItems';

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
   return (
      <StyledMenu open={open} {...restProps}>
         {items.map((item) => (
            <MenuItem {...item} />
         ))}
      </StyledMenu>
   );
};
