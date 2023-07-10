import { Colors } from '@app/constants';
import { createTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';

let materialTheme = createTheme();

materialTheme = createTheme(
   deepmerge(materialTheme, {
      typography: {
         fontFamily: 'Inter, Roboto, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
         fontSize: materialTheme.typography.pxToRem(16),
         h1: {
            fontWeight: 700,
            fontSize: materialTheme.typography.pxToRem(38),
            lineHeight: materialTheme.typography.pxToRem(48),
         },
         h2: {
            fontWeight: 700,
            fontSize: materialTheme.typography.pxToRem(34),
            lineHeight: materialTheme.typography.pxToRem(43),
         },
         h3: {
            fontWeight: 600,
            fontSize: materialTheme.typography.pxToRem(30),
            lineHeight: materialTheme.typography.pxToRem(38),
         },
         h4: {
            fontWeight: 600,
            fontSize: materialTheme.typography.pxToRem(26),
            lineHeight: materialTheme.typography.pxToRem(33),
         },
         h5: {
            fontWeight: 500,
            fontSize: materialTheme.typography.pxToRem(22),
            lineHeight: materialTheme.typography.pxToRem(28),
         },
         body1: {
            fontWeight: 500,
            fontSize: materialTheme.typography.pxToRem(16),
         },
         body2: {
            fontWeight: 400,
            fontSize: materialTheme.typography.pxToRem(14),
         },
         caption: {
            fontWeight: 400,
            fontSize: materialTheme.typography.pxToRem(12),
         },
      },
      palette: {
         success: {
            main: Colors.Success,
         },
         info: {
            main: Colors.Info,
         },
      },
      components: {
         MuiButton: {
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
         },
      },
   })
);

export { materialTheme };
