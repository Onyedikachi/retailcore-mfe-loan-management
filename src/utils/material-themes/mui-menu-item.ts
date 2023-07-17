import { Colors } from '@app/constants';

export const MenuItemThem = {
   styleOverrides: {
      root: {
         '&:hover:not(.Mui-disabled):not(.Mui-selected)': {
            backgroundColor: '#f6f6f6',
         },
         '&.Mui-selected': {
            backgroundColor: Colors.LightPrimary,
         },
         '&.Mui-focusVisible': {
            backgroundColor: Colors.LightPrimary,
         },
      },
   },
};
