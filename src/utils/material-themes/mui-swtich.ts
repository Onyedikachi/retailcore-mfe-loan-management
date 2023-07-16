import { Colors } from '@app/constants';

export const SwitchTheme = {
   styleOverrides: {
      root: {
         width: 36,
         height: 21,
         padding: 0,
      },
      switchBase: {
         padding: 0,
         margin: 2,
         transitionDuration: '300ms',
         '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
               background: Colors.LinearGradient,
               opacity: 1,
            },
         },
      },
      thumb: {
         width: 17,
         height: 17,
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         position: 'relative',
         '&::after': {
            width: 'calc(100% + 1px)',
            height: 'calc(100% + 1px)',
            zIndex: -1,
            background: Colors.LinearGradient,
            position: 'absolute',
            content: '""',
            borderRadius: '100%',
         },
      },
      track: {
         borderRadius: 21 / 2,
         backgroundColor: 'white',
         border: '1px solid brown',
      },
   },
};
