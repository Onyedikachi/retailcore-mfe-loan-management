import { Colors } from '@app/constants';

export const InputTheme = {
   styleOverrides: {
      underline: {
         '& ::placeholder': { color: Colors.LightGray4 },
         '&:hover:not(.Mui-disabled):before': {
            borderBottomColor: Colors.LightGray3,
         },
         '&:before': {
            borderBottomColor: Colors.LightGray3,
         },
         '&:after': {
            borderBottomColor: Colors.LightGray3,
         },
         '&.Mui-error:after': {
            borderBottomColor: Colors.Danger,
         },
      },
   },
};
