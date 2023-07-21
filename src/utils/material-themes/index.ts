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
         fontFamily: 'Inter, Roboto, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
         fontSize: 16,
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
            fontWeight: 700,
            fontSize: materialTheme.typography.pxToRem(28),
            lineHeight: materialTheme.typography.pxToRem(38),
         },
         h4: {
            fontWeight: 700,
            fontSize: materialTheme.typography.pxToRem(24),
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
         MuiInput: InputTheme,
         MuiMenuItem: MenuItemThem,
         MuiMenu: MenuTheme,
         MuiTooltip: TooltipTheme,
         MuiCheckbox: CheckBoxTheme,
         MuiRadio: RadioTheme,
         MuiInputBase: InputBaseTheme,
         MuiCssBaseline: {
            styleOverrides: () => ({
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
