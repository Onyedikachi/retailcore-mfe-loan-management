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
export const InputBaseTheme = {
   styleOverrides: {
      root: {
         '&.MuiOutlinedInput-root': {
            padding: '10px',
            '& fieldset': {
               borderColor: Colors.LightGray3,
            },
            '&:hover fieldset': {
               borderColor: Colors.LightGray3,
            },
            '&.Mui-focused fieldset': {
               borderColor: Colors.LightGray3,
            },
            '&:before': {
               borderColor: Colors.LightGray3,
            },
            '&:after': {
               borderColor: Colors.LightGray3,
            },
            '&.Mui-error:after': {
               borderColor: Colors.Danger,
            },
         },
      },
   },
};
