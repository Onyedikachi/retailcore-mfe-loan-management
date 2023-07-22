import { PaletteOptions } from '@mui/material/styles';

declare module '*.html' {
   const rawHtmlFile: string;
   export = rawHtmlFile;
}

declare module '*.bmp' {
   const src: string;
   export default src;
}

declare module '*.ttf' {
   const src: string;
   export default src;
}

declare module '*.gif' {
   const src: string;
   export default src;
}

declare module '*.jpg' {
   const src: string;
   export default src;
}

declare module '*.jpeg' {
   const src: string;
   export default src;
}

declare module '*.png' {
   const src: string;
   export default src;
}

declare module '*.webp' {
   const src: string;
   export default src;
}

declare module '*.svg' {
   const src: string;
   export default src;
}

declare module '@mui/material/styles' {
   interface CustomPalette {
      grey: PaletteOptions['primary'];
   }
   interface Palette extends CustomPalette {}
   interface CustomColor {
      color: string;
   }
   interface PaletteOptions extends CustomPalette {}
}
