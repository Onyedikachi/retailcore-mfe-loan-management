import { Colors } from '@app/constants';
import { createTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { InputBaseTheme, InputTheme } from './mui-input';
import { MenuItemThem } from './mui-menu-item';
import { MenuTheme } from './mui-menu';
import { TooltipTheme } from './mui-tooltip';
import { CheckBoxTheme } from './mui-checkbox';
import { RadioTheme } from './mui-radio';

const materialTheme = createTheme();

export const GlobalTheme = createTheme(
   deepmerge(materialTheme, {
      typography: {
         fontSize: 16,
         h1: {
            fontWeight: 700,
            fontSize: materialTheme.typography.pxToRem(38),
            lineHeight: materialTheme.typography.pxToRem(48),
            fontFamily: 'Inter',
         },
         h2: {
            fontWeight: 700,
            fontSize: materialTheme.typography.pxToRem(34),
            lineHeight: materialTheme.typography.pxToRem(43),
            fontFamily: 'Inter',
         },
         h3: {
            fontWeight: 700,
            fontSize: materialTheme.typography.pxToRem(28),
            lineHeight: materialTheme.typography.pxToRem(38),
            fontFamily: 'Inter',
         },
         h4: {
            fontWeight: 700,
            fontSize: materialTheme.typography.pxToRem(24),
            lineHeight: materialTheme.typography.pxToRem(28),
            fontFamily: 'Inter',
         },
         h5: {
            fontWeight: 700,
            fontSize: materialTheme.typography.pxToRem(20),
            lineHeight: materialTheme.typography.pxToRem(24),
            fontFamily: 'Inter',
         },
         body1: {
            fontWeight: 500,
            fontSize: materialTheme.typography.pxToRem(16),
            fontFamily: 'Inter',
         },
         body2: {
            fontWeight: 400,
            fontSize: materialTheme.typography.pxToRem(14),
            fontFamily: 'Inter',
         },
         caption: {
            fontWeight: 400,
            fontSize: materialTheme.typography.pxToRem(12),
            fontFamily: 'Inter',
         },
         fontFamily: ['Inter', 'Roboto', '"Segoe UI"', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
      },
      palette: {
         primary: {
            main: Colors.Primary,
         },
         secondary: {
            main: Colors.LinearGradient,
         },
         text: { primary: Colors.TextGray },
         success: {
            main: Colors.Success,
         },
         gray: {
            main: Colors.LightGray5,
         },
         info: {
            main: Colors.Info,
         },
      },
      components: {
         MuiTypography: {
            styleOverrides: {
               root: { fontFamily: 'Inter' },
            },
         },
         MuiInput: InputTheme,
         MuiMenuItem: MenuItemThem,
         MuiMenu: MenuTheme,
         MuiTooltip: TooltipTheme,
         MuiCheckbox: CheckBoxTheme,
         MuiRadio: RadioTheme,
         MuiInputBase: InputBaseTheme,
         MuiCssBaseline: {
            styleOverrides: () => ({
               body: {
                  fontFamily: 'Inter',
               },
               '.fancy-scrollbar': {
                  '&::-webkit-scrollbar-thumb': {
                     background: Colors.LinearGradient,
                     borderRadius: 10,
                  },
                  '::-webkit-scrollbar': {
                     width: 5,
                  },
               },
            }),
         },
      },
   })
);
