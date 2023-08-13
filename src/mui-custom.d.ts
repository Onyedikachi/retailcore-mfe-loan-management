import { Palette, PaletteOptions } from '@mui/material/styles';

// Extend the Palette interface to include your custom colors
declare module '@mui/material/styles' {
   interface Palette {
      gray: Palette['primary'];
   }

   interface PaletteOptions {
      gray: PaletteOptions['primary'];
   }
}

declare module '@mui/material/Button' {
   // Extend the ButtonPropsColorOverrides type to include your custom color
   interface ButtonPropsColorOverrides {
      gray: true;
   }
}
