import { Colors } from '@app/constants';

export const ButtonTheme = {
   styleOverrides: {
      root: ({ ownerState }: any) => ({
         ...(ownerState.variant === 'contained' &&
            ownerState.color === 'primary' && {
               backgroundColor: Colors.LinearGradient,
               color: Colors.LightGray2,
            }),
         ...(ownerState.variant === 'contained' &&
            ownerState.color === 'primary' &&
            ownerState.disabled && {
               backgroundColor: Colors.LightGray,
               color: Colors.White,
               border: `1px solid ${Colors.LightGray1}`,
            }),
         ...(ownerState.variant === 'outlined' &&
            ownerState.color === 'grey' &&
            ownerState.disabled && {
               color: Colors.TextGray,
               border: `1px solid ${Colors.LightGray1}`,
            }),
      }),
   },
};
